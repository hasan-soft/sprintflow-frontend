"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUpdateUserRole, useUsers } from "@/hooks";
import type { UserRole } from "@/types";

type Role = UserRole;
type User = {
  id: number | string;
  name: string;
  email: string;
  role: Role;
  status: "Active" | "Invited";
};

const pageSize = 5;

function readUsers(payload: unknown): User[] | undefined {
  if (!payload || typeof payload !== "object") return undefined;
  const record = payload as Record<string, unknown>;
  const rows = Array.isArray(record.data)
    ? record.data
    : Array.isArray(record.users)
      ? record.users
      : Array.isArray(record.items)
        ? record.items
        : Array.isArray(payload)
          ? payload
          : undefined;
  if (!rows) return undefined;

  return rows.flatMap((row, index) => {
    if (!row || typeof row !== "object") return [];
    const item = row as Record<string, unknown>;
    if (typeof item.email !== "string") return [];
    const rawRole = String(item.role ?? "MEMBER").toUpperCase();
    const role: Role =
      rawRole === "ADMIN" || rawRole === "MANAGER" ? rawRole : "MEMBER";
    const status = String(item.status ?? "ACTIVE").toUpperCase();
    return [
      {
        id:
          typeof item.id === "string" || typeof item.id === "number"
            ? item.id
            : `user-${index}`,
        name: typeof item.name === "string" ? item.name : item.email,
        email: item.email,
        role,
        status:
          status === "INVITED" || status === "PENDING" ? "Invited" : "Active",
      },
    ];
  });
}

export default function UserDirectory() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const roleParam = searchParams.get("role") ?? "all";
  const selectedRole =
    roleParam === "ADMIN" || roleParam === "MANAGER" || roleParam === "MEMBER"
      ? roleParam
      : "all";
  const currentPage = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
  const usersQuery = useUsers({
    searchTerm: query,
    role: selectedRole === "all" ? undefined : selectedRole,
    page: String(currentPage),
    limit: String(pageSize),
  });
  const updateRole = useUpdateUserRole();
  const [users, setUsers] = useState<User[]>([]);
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [editRole, setEditRole] = useState<Role>("MEMBER");

  useEffect(() => {
    const fetchedUsers = readUsers(usersQuery.data);
    if (fetchedUsers) setUsers(fetchedUsers);
  }, [usersQuery.data]);

  function updateParams(changes: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(changes).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const visibleUsers = users;
  const totalUsers = usersQuery.data?.meta?.total ?? 0;
  const pageCount = Math.max(1, usersQuery.data?.meta?.totalPages ?? 1);

  function beginEdit(user: User) {
    setEditingId(user.id);
    setEditRole(user.role);
  }

  async function saveRole(userId: number | string) {
    try {
      await updateRole.mutateAsync({ id: String(userId), role: editRole });
      setUsers((existing) =>
        existing.map((user) =>
          user.id === userId ? { ...user, role: editRole } : user,
        ),
      );
      setEditingId(null);
      toast.success("Workspace role updated");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not update the user's role.",
      );
    }
  }

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold">Workspace members</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {totalUsers} people match these filters
          </p>
        </div>
      </div>

      {usersQuery.isError && (
        <output className="block border border-rose-700/30 bg-rose-700/5 px-4 py-3 text-sm text-rose-800">
          The live user list could not be loaded. Sign in again or retry the
          request.
        </output>
      )}

      {usersQuery.isPending && (
        <output
          aria-label="Loading members"
          className="block h-72 animate-pulse bg-muted"
        />
      )}

      <div className="flex flex-wrap gap-3">
        <input
          aria-label="Search members"
          className="h-10 min-w-56 flex-1 border bg-background px-3 text-sm"
          onChange={(event) =>
            updateParams({ q: event.target.value, page: "1" })
          }
          placeholder="Search name or email"
          value={query}
        />
        <select
          aria-label="Filter by role"
          className="h-10 border bg-background px-3 text-sm"
          onChange={(event) =>
            updateParams({
              role: event.target.value === "all" ? "" : event.target.value,
              page: "1",
            })
          }
          value={selectedRole}
        >
          <option value="all">All roles</option>
          <option value="ADMIN">Admin</option>
          <option value="MANAGER">Manager</option>
          <option value="MEMBER">Member</option>
        </select>
      </div>

      <div className="overflow-x-auto border bg-card">
        <table className="w-full min-w-190 border-collapse text-left text-sm">
          <thead className="border-b bg-muted/40 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {visibleUsers.map((user) => (
              <tr key={user.id}>
                {editingId === user.id ? (
                  <>
                    <td className="px-4 py-3">
                      {user.name}
                      <p className="mt-1 text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        aria-label="Edit role"
                        className="h-9 border bg-background px-2"
                        onChange={(event) =>
                          setEditRole(event.target.value as Role)
                        }
                        value={editRole}
                      >
                        <option value="ADMIN">Admin</option>
                        <option value="MANAGER">Manager</option>
                        <option value="MEMBER">Member</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">{user.status}</td>
                    <td className="space-x-3 px-4 py-3 text-right">
                      <button
                        className="font-medium text-primary"
                        disabled={updateRole.isPending}
                        onClick={() => saveRole(user.id)}
                        type="button"
                      >
                        Save
                      </button>
                      <button
                        className="text-muted-foreground"
                        onClick={() => setEditingId(null)}
                        type="button"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-3">
                      <p className="font-medium">{user.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </td>
                    <td className="px-4 py-3">{user.role}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-2">
                        <span
                          className={`size-2 rounded-full ${user.status === "Active" ? "bg-emerald-500" : "bg-amber-500"}`}
                        />
                        {user.status}
                      </span>
                    </td>
                    <td className="space-x-4 px-4 py-3 text-right">
                      <button
                        className="font-medium hover:underline"
                        onClick={() => beginEdit(user)}
                        type="button"
                      >
                        Edit role
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
            {visibleUsers.length === 0 && (
              <tr>
                <td
                  className="px-4 py-14 text-center text-muted-foreground"
                  colSpan={4}
                >
                  No members match this search. Try another filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm">
        <p className="text-muted-foreground">
          Page {Math.min(currentPage, pageCount)} of {pageCount}
        </p>
        <div className="flex gap-2">
          <button
            className="border px-3 py-2 disabled:opacity-40"
            disabled={currentPage <= 1}
            onClick={() => updateParams({ page: String(currentPage - 1) })}
            type="button"
          >
            Previous
          </button>
          <button
            className="border px-3 py-2 disabled:opacity-40"
            disabled={currentPage >= pageCount}
            onClick={() => updateParams({ page: String(currentPage + 1) })}
            type="button"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
