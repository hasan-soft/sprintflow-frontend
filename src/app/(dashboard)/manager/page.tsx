"use client";

import Link from "next/link";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
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

  // Dynamic Chart Data derived from real projects
  const chartData = projects.slice(0, 6).map((project) => ({
    name:
      project.name.length > 18
        ? `${project.name.slice(0, 18)}...`
        : project.name,
    tasks: project._count?.tasks ?? 0,
    sprints: project._count?.sprints ?? 0,
  }));

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
          className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 transition"
          href="/manager/projects/new"
        >
          New project
        </Link>
      </header>

      {/* Overview Metric Cards */}
      <section className="grid gap-4 sm:grid-cols-3">
        {metrics.map((metric) => (
          <div
            className="rounded-xl border border-border/80 bg-card p-5 shadow-xs transition hover:border-primary/40"
            key={metric.label}
          >
            <p className="text-sm font-medium text-muted-foreground">
              {metric.label}
            </p>
            <p className="mt-3 font-heading text-3xl font-semibold text-foreground">
              {projectsQuery.isPending ? "—" : metric.value}
            </p>
          </div>
        ))}
      </section>

      {projectsQuery.isError && (
        <output className="block rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Project data could not be loaded from the API.
        </output>
      )}

      {/* Dynamic Project Workload Chart */}
      {chartData.length > 0 && (
        <section className="rounded-2xl border border-border/80 bg-card p-6 shadow-2xs">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <h2 className="font-heading text-base font-bold text-foreground">
                Project Task & Sprint Distribution
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Real-time work item volume and sprint velocity across active
                projects
              </p>
            </div>
            <span className="rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
              Dynamic
            </span>
          </div>
          <div
            className="h-64 w-full"
            role="img"
            aria-label="Bar chart showing tasks and sprints per project"
          >
            <ResponsiveContainer height="100%" width="100%">
              <BarChart
                data={chartData}
                margin={{ left: -15, right: 10, top: 10 }}
              >
                <CartesianGrid
                  stroke="var(--border)"
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  axisLine={false}
                  dataKey="name"
                  tickLine={false}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    borderRadius: "0.75rem",
                    fontSize: "0.75rem",
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
                />
                <Bar
                  dataKey="tasks"
                  name="Tasks"
                  fill="var(--color-primary)"
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="sprints"
                  name="Sprints"
                  fill="#3b82f6"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}

      {/* Projects in Motion List */}
      <section className="rounded-xl border border-border/80 bg-card overflow-hidden shadow-xs">
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
