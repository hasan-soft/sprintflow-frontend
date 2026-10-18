"use client";

import Link from "next/link";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useMyAssignedTasks } from "@/hooks";

const STATUS_COLORS = {
  "To do": "#f59e0b",
  "In progress": "#3b82f6",
  Completed: "#10b981",
};

export default function MemberOverviewPage() {
  const tasksQuery = useMyAssignedTasks();
  const tasks = tasksQuery.data?.data ?? [];
  const todoCount = tasks.filter((task) => task.status === "TODO").length;
  const inProgressCount = tasks.filter(
    (task) => task.status === "IN_PROGRESS",
  ).length;
  const doneCount = tasks.filter((task) => task.status === "DONE").length;

  const counts = [
    {
      label: "To do",
      value: todoCount,
    },
    {
      label: "In progress",
      value: inProgressCount,
    },
    {
      label: "Completed",
      value: doneCount,
    },
  ];

  // Dynamic Chart Data derived from assigned tasks
  const chartData = [
    { name: "To do", value: Math.max(todoCount, 0) },
    { name: "In progress", value: Math.max(inProgressCount, 0) },
    { name: "Completed", value: Math.max(doneCount, 0) },
  ].filter((item) => item.value > 0);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <header>
        <p className="text-sm font-semibold text-primary">My workspace</p>
        <h1 className="mt-1 font-heading text-3xl font-semibold">My work</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Assigned tasks, velocity, and delivery status from your current
          workspace.
        </p>
      </header>

      {/* Metric Overview Cards */}
      <section className="grid gap-4 sm:grid-cols-3">
        {counts.map((metric) => (
          <div
            className="rounded-xl border border-border/80 bg-card p-5 shadow-xs transition hover:border-primary/40"
            key={metric.label}
          >
            <p className="text-sm font-medium text-muted-foreground">
              {metric.label}
            </p>
            <p className="mt-3 font-heading text-3xl font-semibold text-foreground">
              {tasksQuery.isPending ? "—" : metric.value}
            </p>
          </div>
        ))}
      </section>

      {tasksQuery.isError && (
        <output className="block rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Assigned tasks could not be loaded from the API.
        </output>
      )}

      {/* Dynamic Task Distribution Donut Chart */}
      {tasks.length > 0 && (
        <section className="rounded-2xl border border-border/80 bg-card p-6 shadow-2xs">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <h2 className="font-heading text-base font-bold text-foreground">
                Task Status Breakdown
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Live distribution of assigned tasks across workflow states
              </p>
            </div>
            <span className="rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
              Real Time
            </span>
          </div>
          <div
            className="h-64 w-full"
            role="img"
            aria-label="Donut chart showing personal task status distribution"
          >
            <ResponsiveContainer height="100%" width="100%">
              <PieChart>
                <Pie
                  data={
                    chartData.length
                      ? chartData
                      : [{ name: "No Tasks", value: 1 }]
                  }
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {chartData.map((entry) => (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={
                        STATUS_COLORS[
                          entry.name as keyof typeof STATUS_COLORS
                        ] || "var(--color-primary)"
                      }
                    />
                  ))}
                </Pie>
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
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}

      {/* Assigned Tasks List */}
      <section className="rounded-xl border border-border/80 bg-card overflow-hidden shadow-xs">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <h2 className="font-semibold">Assigned to me</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Your current sprint tasks.
            </p>
          </div>
          <Link
            className="text-sm font-medium underline underline-offset-4"
            href="/member/tasks"
          >
            Open task board
          </Link>
        </div>
        <div className="divide-y">
          {tasks.slice(0, 5).map((task) => (
            <div
              className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
              key={task.id}
            >
              <div>
                <p className="text-xs font-semibold text-primary">{task.id}</p>
                <p className="mt-1 font-medium">{task.title}</p>
              </div>
              <div className="flex items-center gap-5 text-sm">
                <span className="text-muted-foreground">
                  {task.status.replaceAll("_", " ")}
                </span>
                <span>
                  {task.dueDate
                    ? `Due ${new Date(task.dueDate).toLocaleDateString()}`
                    : "No due date"}
                </span>
              </div>
            </div>
          ))}
          {!tasksQuery.isPending &&
            !tasksQuery.isError &&
            tasks.length === 0 && (
              <p className="px-5 py-12 text-center text-sm text-muted-foreground">
                No tasks are currently assigned to your account.
              </p>
            )}
        </div>
      </section>
    </div>
  );
}
