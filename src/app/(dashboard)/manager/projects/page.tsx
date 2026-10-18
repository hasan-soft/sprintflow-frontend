"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useProjects } from "@/hooks";

const projectStatuses = [
  "PLANNED",
  "ACTIVE",
  "ON_HOLD",
  "COMPLETED",
  "ARCHIVED",
] as const;

export default function ManagerProjectsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q") ?? "";
  const statusParam = searchParams.get("status") ?? "";
  const status = projectStatuses.includes(
    statusParam as (typeof projectStatuses)[number],
  )
    ? (statusParam as (typeof projectStatuses)[number])
    : "";
  const page = searchParams.get("page") ?? "1";
  const projectsQuery = useProjects({
    searchTerm,
    status: status || undefined,
    page,
    limit: "10",
  });
  const result = projectsQuery.data;
  const projects = result?.data ?? [];
  const meta = result?.meta;

  function updateParams(changes: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(changes)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary">Delivery</p>
          <h1 className="mt-1 font-heading text-3xl font-semibold">Projects</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Live projects, organization ownership, and delivery status.
          </p>
        </div>
        <Link
          className="bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          href="/manager/projects/new"
        >
          Create project
        </Link>
      </header>
      <div className="flex flex-wrap gap-3">
        <input
          aria-label="Search projects"
          className="h-10 min-w-56 flex-1 border bg-background px-3 text-sm"
          onChange={(event) =>
            updateParams({ q: event.target.value, page: "1" })
          }
          placeholder="Search projects"
          value={searchTerm}
        />
        <select
          aria-label="Filter by status"
          className="h-10 border bg-background px-3 text-sm"
          onChange={(event) =>
            updateParams({ status: event.target.value, page: "1" })
          }
          value={status}
        >
          <option value="">All statuses</option>
          <option value="PLANNED">Planned</option>
          <option value="ACTIVE">Active</option>
          <option value="ON_HOLD">On hold</option>
          <option value="COMPLETED">Completed</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </div>
      {projectsQuery.isError && (
        <output className="block border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Could not load projects from the SprintFlow API.
        </output>
      )}
      <div className="overflow-x-auto border bg-card">
        <table className="w-full min-w-190 text-left text-sm">
          <thead className="border-b bg-muted/40 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Project</th>
              <th className="px-4 py-3 font-medium">Organization</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Tasks</th>
              <th className="px-4 py-3 font-medium">Sprints</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="px-4 py-4 font-medium">{project.name}</td>
                <td className="px-4 py-4">
                  {project.organization?.name ?? "—"}
                </td>
                <td className="px-4 py-4">
                  <span className="text-muted-foreground">
                    {project.status.replaceAll("_", " ")}
                  </span>
                </td>
                <td className="px-4 py-4">{project._count?.tasks ?? 0}</td>
                <td className="px-4 py-4">{project._count?.sprints ?? 0}</td>
              </tr>
            ))}
            {!projectsQuery.isPending && projects.length === 0 && (
              <tr>
                <td
                  className="px-4 py-14 text-center text-muted-foreground"
                  colSpan={5}
                >
                  No projects match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <p className="text-muted-foreground">
          Showing{" "}
          <strong className="text-foreground">
            {meta ? meta.total : projects.length}
          </strong>{" "}
          projects · Page <strong className="text-foreground">{page}</strong> of{" "}
          <strong className="text-foreground">
            {Math.max(1, meta?.totalPages ?? 1)}
          </strong>
        </p>
        <div className="flex items-center gap-1.5">
          <button
            className="flex size-8 items-center justify-center rounded-xl border border-border/80 bg-card text-foreground hover:bg-muted disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer"
            disabled={!meta || Number(page) <= 1}
            onClick={() => updateParams({ page: String(Number(page) - 1) })}
            type="button"
            aria-label="Previous page"
          >
            <ChevronLeft className="size-4" />
          </button>

          {Array.from({ length: Math.max(1, meta?.totalPages ?? 1) }).map(
            (_, idx) => {
              const pageNum = idx + 1;
              const isActive = Number(page) === pageNum;
              return (
                <button
                  key={`proj-page-${pageNum}`}
                  type="button"
                  onClick={() => updateParams({ page: String(pageNum) })}
                  className={`size-8 rounded-xl text-xs font-bold transition cursor-pointer ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-2xs"
                      : "border border-border/80 bg-card text-foreground hover:bg-muted"
                  }`}
                >
                  {pageNum}
                </button>
              );
            },
          )}

          <button
            className="flex size-8 items-center justify-center rounded-xl border border-border/80 bg-card text-foreground hover:bg-muted disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer"
            disabled={!meta || Number(page) >= meta.totalPages}
            onClick={() => updateParams({ page: String(Number(page) + 1) })}
            type="button"
            aria-label="Next page"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
