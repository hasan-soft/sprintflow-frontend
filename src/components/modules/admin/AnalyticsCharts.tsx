"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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

  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <section className="border bg-card p-5">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <h2 className="font-semibold">Delivery inventory</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Current project and work-item totals
            </p>
          </div>
          <span className="text-xs text-muted-foreground">Live totals</span>
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
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              />
              <Tooltip />
              <Bar
                dataKey="count"
                name="Records"
                fill="var(--color-primary)"
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
      <section className="border bg-card p-5">
        <div className="mb-5">
          <h2 className="font-semibold">Workspace activity</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Current membership and collaboration totals
          </p>
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
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              />
              <Tooltip />
              <Bar
                dataKey="count"
                name="Records"
                fill="var(--color-chart-3)"
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
