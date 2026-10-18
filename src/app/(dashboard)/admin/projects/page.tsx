"use client";

import {
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  Plus,
  Search,
} from "lucide-react";
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

export default function AdminProjectsPage() {
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
  const totalPages = Math.max(1, meta?.totalPages ?? 1);
  const currentPage = Number(page) || 1;

  function updateParams(changes: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(changes)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const activeProjectsCount = projects.filter(
    (p) => p.status === "ACTIVE",
  ).length;
  const totalTasks = projects.reduce(
    (acc, p) => acc + (p._count?.tasks ?? 0),
    0,
  );
  const totalSprints = projects.reduce(
    (acc, p) => acc + (p._count?.sprints ?? 0),
    0,
  );

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary">Administration</p>
          <h1 className="mt-1 font-heading text-3xl font-semibold">
            Projects Oversight
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Audit and supervise all active projects, teams, and sprint cycles
            across the enterprise.
          </p>
        </div>
        <Link
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 transition cursor-pointer"
          href="/manager/projects/new"
        >
          <Plus className="size-3.5" />
          <span>New Project</span>
        </Link>
      </header>

      {/* Overview Cards */}
      <section className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Total Projects
          </p>
          <p className="mt-2 font-heading text-2xl font-bold text-foreground">
            {meta?.total ?? projects.length}
          </p>
        </div>
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Active Status
          </p>
          <p className="mt-2 font-heading text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {activeProjectsCount}
          </p>
        </div>
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Total Tasks
          </p>
          <p className="mt-2 font-heading text-2xl font-bold text-foreground">
            {totalTasks}
          </p>
        </div>
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Sprint Cycles
          </p>
          <p className="mt-2 font-heading text-2xl font-bold text-foreground">
            {totalSprints}
          </p>
        </div>
      </section>

      {/* Filtering Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            aria-label="Search projects"
            className="h-10 w-full rounded-xl border border-border/80 bg-background pl-9 pr-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            onChange={(event) =>
              updateParams({ q: event.target.value, page: "1" })
            }
            placeholder="Search projects by title or team..."
            value={searchTerm}
          />
        </div>
        <select
          aria-label="Filter by status"
          className="h-10 rounded-xl border border-border/80 bg-background px-3 text-xs sm:text-sm font-medium text-foreground focus:border-primary focus:outline-none cursor-pointer"
          onChange={(event) =>
            updateParams({ status: event.target.value, page: "1" })
          }
          value={status}
        >
          <option value="">All Statuses</option>
          <option value="PLANNED">Planned</option>
          <option value="ACTIVE">Active</option>
          <option value="ON_HOLD">On Hold</option>
          <option value="COMPLETED">Completed</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </div>

      {projectsQuery.isError && (
        <output className="block rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Could not load projects from the SprintFlow API.
        </output>
      )}

      {/* Data Table */}
      <div className="overflow-x-auto rounded-2xl border border-border/80 bg-card shadow-2xs">
        <table className="w-full min-w-[650px] text-left text-xs sm:text-sm">
          <thead className="border-b border-border/80 bg-muted/40 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-3.5">Project</th>
              <th className="px-5 py-3.5">Organization</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5">Tasks</th>
              <th className="px-5 py-3.5">Sprints</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {projects.map((project) => (
              <tr
                key={project.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <td className="px-5 py-4 font-semibold text-foreground flex items-center gap-2">
                  <FolderKanban className="size-4 text-primary shrink-0" />
                  <span>{project.name}</span>
                </td>
                <td className="px-5 py-4 text-muted-foreground">
                  {project.organization?.name ?? "Enterprise Core"}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      project.status === "ACTIVE"
                        ? "border border-emerald-600/30 bg-emerald-600/10 text-emerald-600 dark:text-emerald-400"
                        : project.status === "COMPLETED"
                          ? "border border-blue-600/30 bg-blue-600/10 text-blue-600 dark:text-blue-400"
                          : "border border-muted-foreground/30 bg-muted text-muted-foreground"
                    }`}
                  >
                    {project.status.replaceAll("_", " ")}
                  </span>
                </td>
                <td className="px-5 py-4 font-mono font-medium text-foreground">
                  {project._count?.tasks ?? 0}
                </td>
                <td className="px-5 py-4 font-mono font-medium text-foreground">
                  {project._count?.sprints ?? 0}
                </td>
              </tr>
            ))}
            {!projectsQuery.isPending && projects.length === 0 && (
              <tr>
                <td
                  className="px-5 py-14 text-center text-muted-foreground"
                  colSpan={5}
                >
                  No projects match your current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <p className="text-muted-foreground">
          Showing{" "}
          <strong className="text-foreground">
            {meta ? meta.total : projects.length}
          </strong>{" "}
          projects · Page{" "}
          <strong className="text-foreground">{currentPage}</strong> of{" "}
          <strong className="text-foreground">{totalPages}</strong>
        </p>

        <div className="flex items-center gap-1.5">
          <button
            className="flex size-8 items-center justify-center rounded-xl border border-border/80 bg-card text-foreground hover:bg-muted disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer"
            disabled={!meta || currentPage <= 1}
            onClick={() => updateParams({ page: String(currentPage - 1) })}
            type="button"
            aria-label="Previous page"
          >
            <ChevronLeft className="size-4" />
          </button>

          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            const isActive = currentPage === pageNum;
            return (
              <button
                key={`p-btn-${pageNum}`}
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
          })}

          <button
            className="flex size-8 items-center justify-center rounded-xl border border-border/80 bg-card text-foreground hover:bg-muted disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer"
            disabled={!meta || currentPage >= totalPages}
            onClick={() => updateParams({ page: String(currentPage + 1) })}
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
