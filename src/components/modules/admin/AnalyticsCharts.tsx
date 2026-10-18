"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const PIE_COLORS = ["#6366f1", "#3b82f6", "#10b981", "#f59e0b", "#ec4899"];

export default function AnalyticsCharts({
  overview,
}: {
  overview: Record<string, number>;
}) {
  const delivery = [
    { category: "Projects", count: overview.projects ?? 0 },
    { category: "Sprints", count: overview.sprints ?? 0 },
    { category: "Tasks", count: overview.tasks ?? 0 },
    { category: "Subtasks", count: overview.subtasks ?? 0 },
  ];

  const workspace = [
    { category: "Users", count: overview.users ?? 0 },
    { category: "Comments", count: overview.comments ?? 0 },
    { category: "Activity", count: overview.activityLogs ?? 0 },
    { category: "Plans", count: overview.subscriptions ?? 0 },
  ];

  const distribution = [
    { name: "Projects", value: Math.max(overview.projects ?? 0, 1) },
    { name: "Sprints", value: Math.max(overview.sprints ?? 0, 1) },
    { name: "Tasks", value: Math.max(overview.tasks ?? 0, 1) },
    { name: "Users", value: Math.max(overview.users ?? 0, 1) },
  ];

  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-2">
        {/* Delivery Inventory Bar Chart */}
        <section className="rounded-2xl border border-border/80 bg-card p-6 shadow-2xs">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <h2 className="font-heading text-base font-bold text-foreground">
                Delivery Inventory
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Current active project, sprint, and task work-item totals
              </p>
            </div>
            <span className="rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
              Live DB
            </span>
          </div>
          <div
            className="h-64"
            role="img"
            aria-label="Bar chart of project, sprint, task, and subtask totals"
          >
            <ResponsiveContainer height="100%" width="100%">
              <BarChart
                data={delivery}
                margin={{ left: -20, right: 10, top: 10 }}
              >
                <CartesianGrid
                  stroke="var(--border)"
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  axisLine={false}
                  dataKey="category"
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
                <Bar
                  dataKey="count"
                  name="Count"
                  fill="var(--color-primary)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Workspace Activity Bar Chart */}
        <section className="rounded-2xl border border-border/80 bg-card p-6 shadow-2xs">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <h2 className="font-heading text-base font-bold text-foreground">
                Workspace Activity
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Current membership, subscription plans, and collaboration
                activity
              </p>
            </div>
            <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Active
            </span>
          </div>
          <div
            className="h-64"
            role="img"
            aria-label="Bar chart of users, comments, activities, and subscriptions"
          >
            <ResponsiveContainer height="100%" width="100%">
              <BarChart
                data={workspace}
                margin={{ left: -20, right: 10, top: 10 }}
              >
                <CartesianGrid
                  stroke="var(--border)"
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  axisLine={false}
                  dataKey="category"
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
                <Bar
                  dataKey="count"
                  name="Count"
                  fill="#3b82f6"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      {/* Resource Allocation Pie / Donut Chart */}
      <section className="rounded-2xl border border-border/80 bg-card p-6 shadow-2xs">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 className="font-heading text-base font-bold text-foreground">
              Enterprise Resource Distribution
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Dynamic ratio of projects, sprints, tasks, and users in this
              workspace
            </p>
          </div>
          <span className="text-xs font-semibold text-muted-foreground">
            Donut Overview
          </span>
        </div>
        <div
          className="h-64 w-full"
          role="img"
          aria-label="Pie chart of enterprise resource distribution"
        >
          <ResponsiveContainer height="100%" width="100%">
            <PieChart>
              <Pie
                data={distribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {distribution.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
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
              <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
