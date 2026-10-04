"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";

type Role = "ADMIN" | "MANAGER" | "MEMBER";
type User = {
  id: number | string;
  name: string;
  email: string;
  role: Role;
  status: "Active" | "Invited";
};

const initialUsers: User[] = [
  {
    id: 1,
    name: "Alex Morgan",
    email: "alex@sprintflow.dev",
    role: "ADMIN",
    status: "Active",
  },
  {
    id: 2,
    name: "Sam Rivera",
    email: "sam@sprintflow.dev",
    role: "MANAGER",
    status: "Active",
  },
  {
    id: 3,
    name: "Jordan Lee",
    email: "jordan@sprintflow.dev",
    role: "MEMBER",
    status: "Active",
  },
  {
    id: 4,
    name: "Taylor Kim",
    email: "taylor@sprintflow.dev",
    role: "MEMBER",
    status: "Invited",
  },
  {
    id: 5,
    name: "Casey Park",
    email: "casey@sprintflow.dev",
    role: "MANAGER",
    status: "Active",
  },
  {
    id: 6,
    name: "Riley Chen",
    email: "riley@sprintflow.dev",
    role: "MEMBER",
    status: "Active",
  },
  {
    id: 7,
    name: "Avery Brooks",
    email: "avery@sprintflow.dev",
    role: "MEMBER",
    status: "Invited",
  },
];

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
    const role: Role = rawRole === "ADMIN" || rawRole === "MANAGER" ? rawRole : "MEMBER";
    const status = String(item.status ?? "ACTIVE").toUpperCase();
    return [{
      id: typeof item.id === "string" || typeof item.id === "number" ? item.id : `user-${index}`,
      name: typeof item.name === "string" ? item.name : item.email,
      email: item.email,
      role,
      status: status === "INVITED" || status === "PENDING" ? "Invited" : "Active",
    }];
  });
}

export default function UserDirectory() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [users, setUsers] = useState(initialUsers);
  const usersQuery = useQuery({
    queryKey: ["admin-users"],
    queryFn: () => apiClient<unknown>("/users"),
    retry: false,
    staleTime: 30_000,
  });
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState({
    name: "",
    email: "",
    role: "MEMBER" as Role,
  });
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [editDraft, setEditDraft] = useState({
    name: "",
    email: "",
    role: "MEMBER" as Role,
  });
  const query = searchParams.get("q") ?? "";
  const selectedRole = searchParams.get("role") ?? "all";
  const currentPage = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);

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

  const filteredUsers = users.filter((user) => {
    const matchesSearch = `${user.name} ${user.email}`
      .toLowerCase()
      .includes(query.toLowerCase());
    return (
      matchesSearch && (selectedRole === "all" || user.role === selectedRole)
    );
  });
  const pageCount = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const visibleUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  function createUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUsers((existing) => [
      { ...draft, id: Date.now(), status: "Invited" },
      ...existing,
    ]);
    setDraft({ name: "", email: "", role: "MEMBER" });
    setCreating(false);
    updateParams({ page: "1" });
    toast.success("Invitation added to the workspace");
  }

  function beginEdit(user: User) {
    setEditingId(user.id);
    setEditDraft({ name: user.name, email: user.email, role: user.role });
  }

  function saveEdit(userId: number | string) {
    setUsers((existing) =>
      existing.map((user) =>
        user.id === userId ? { ...user, ...editDraft } : user,
      ),
    );
    setEditingId(null);
    toast.success("User details updated");
  }

  function removeUser(userId: number | string) {
    setUsers((existing) => existing.filter((user) => user.id !== userId));
    toast.success("User removed from the workspace");
  }

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold">Workspace members</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {filteredUsers.length} people match these filters
          </p>
        </div>
        <button
          className="bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          onClick={() => setCreating((open) => !open)}
          type="button"
        >
          {creating ? "Close form" : "Invite member"}
        </button>
      </div>

      {usersQuery.isError && (
        <p className="border border-amber-600/30 bg-amber-600/5 px-4 py-3 text-sm text-amber-800" role="status">
          The live user list is unavailable. Showing sample workspace records.
        </p>
      )}

      {creating && (
        <form
          className="grid gap-3 border bg-card p-4 sm:grid-cols-[1fr_1fr_150px_auto]"
          onSubmit={createUser}
        >
          <input
            aria-label="Name"
            className="h-10 border bg-background px-3 text-sm"
            onChange={(event) =>
              setDraft({ ...draft, name: event.target.value })
            }
            placeholder="Full name"
            required
            value={draft.name}
          />
          <input
            aria-label="Email"
            className="h-10 border bg-background px-3 text-sm"
            onChange={(event) =>
              setDraft({ ...draft, email: event.target.value })
            }
            placeholder="Email address"
            required
            type="email"
            value={draft.email}
          />
          <select
            aria-label="Role"
            className="h-10 border bg-background px-3 text-sm"
            onChange={(event) =>
              setDraft({ ...draft, role: event.target.value as Role })
            }
            value={draft.role}
          >
            <option value="MEMBER">Member</option>
            <option value="MANAGER">Manager</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button
            className="h-10 bg-primary px-4 text-sm font-medium text-primary-foreground"
            type="submit"
          >
            Send invite
          </button>
        </form>
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
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
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
                      <input
                        aria-label="Edit name"
                        className="h-9 w-48 border bg-background px-2"
                        onChange={(event) =>
                          setEditDraft({
                            ...editDraft,
                            name: event.target.value,
                          })
                        }
                        value={editDraft.name}
                      />
                      <input
                        aria-label="Edit email"
                        className="mt-1 h-9 w-48 border bg-background px-2"
                        onChange={(event) =>
                          setEditDraft({
                            ...editDraft,
                            email: event.target.value,
                          })
                        }
                        value={editDraft.email}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <select
                        aria-label="Edit role"
                        className="h-9 border bg-background px-2"
                        onChange={(event) =>
                          setEditDraft({
                            ...editDraft,
                            role: event.target.value as Role,
                          })
                        }
                        value={editDraft.role}
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
                        onClick={() => saveEdit(user.id)}
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
                        Edit
                      </button>
                      <button
                        className="font-medium text-destructive hover:underline"
                        onClick={() => removeUser(user.id)}
                        type="button"
                      >
                        Remove
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
                  No members match this search. Try another filter or invite
                  someone new.
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
