"use client";

import Link from "next/link";
import { useProjects } from "@/hooks";

export default function ManagerOverviewPage() {
  const projectsQuery = useProjects({ limit: "100" });
  const projects = projectsQuery.data?.data ?? [];
  const metrics = [
    {
      label: "Active projects",
      value: projects.filter((project) => project.status === "ACTIVE").length,
    },
    {
      label: "Tasks in projects",
      value: projects.reduce(
        (total, project) => total + (project._count?.tasks ?? 0),
        0,
      ),
    },
    {
      label: "Sprints planned",
      value: projects.reduce(
        (total, project) => total + (project._count?.sprints ?? 0),
        0,
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary">Team workspace</p>
          <h1 className="mt-1 font-heading text-3xl font-semibold">
            Project pulse
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Live delivery totals for projects available to your account.
          </p>
        </div>
        <Link
          className="bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          href="/manager/projects/new"
        >
          New project
        </Link>
      </header>
      <section className="grid gap-px border bg-border sm:grid-cols-3">
        {metrics.map((metric) => (
          <div className="bg-card p-5" key={metric.label}>
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            <p className="mt-3 font-heading text-3xl font-semibold">
              {projectsQuery.isPending ? "—" : metric.value}
            </p>
          </div>
        ))}
      </section>
      {projectsQuery.isError && (
        <output className="block border border-rose-700/30 bg-rose-700/5 px-4 py-3 text-sm text-rose-800">
          Project data could not be loaded from the API.
        </output>
      )}
      <section className="border bg-card">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <h2 className="font-semibold">Projects in motion</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Project status and live task/sprint counts.
            </p>
          </div>
          <Link
            className="text-sm font-medium underline underline-offset-4"
            href="/manager/projects"
          >
            All projects
          </Link>
        </div>
        <div className="divide-y">
          {projects.slice(0, 5).map((project) => (
            <div
              className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_120px_100px_100px] sm:items-center"
              key={project.id}
            >
              <div>
                <p className="font-medium">{project.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {project.organization?.name ?? "Organization"}
                </p>
              </div>
              <span className="text-sm">
                {project.status.replaceAll("_", " ")}
              </span>
              <span className="text-sm text-muted-foreground">
                {project._count?.tasks ?? 0} tasks
              </span>
              <span className="text-sm text-muted-foreground">
                {project._count?.sprints ?? 0} sprints
              </span>
            </div>
          ))}
          {!projectsQuery.isPending &&
            !projectsQuery.isError &&
            projects.length === 0 && (
              <p className="px-5 py-12 text-center text-sm text-muted-foreground">
                No projects are available to this account.
              </p>
            )}
        </div>
      </section>
    </div>
  );
}
