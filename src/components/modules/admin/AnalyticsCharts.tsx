"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar } from "recharts";

const velocity = [
  { sprint: "S-18", points: 42, completed: 37 },
  { sprint: "S-19", points: 48, completed: 44 },
  { sprint: "S-20", points: 45, completed: 39 },
  { sprint: "S-21", points: 52, completed: 49 },
  { sprint: "S-22", points: 50, completed: 46 },
  { sprint: "S-23", points: 58, completed: 54 },
];

const capacity = [
  { team: "Platform", planned: 82, used: 69 },
  { team: "Product", planned: 74, used: 71 },
  { team: "Mobile", planned: 66, used: 52 },
  { team: "Design", planned: 57, used: 48 },
];

export default function AnalyticsCharts() {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <section className="border bg-card p-5">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div><h2 className="font-semibold">Sprint velocity</h2><p className="mt-1 text-sm text-muted-foreground">Committed vs. completed story points</p></div>
          <span className="text-xs text-muted-foreground">Last 6 sprints</span>
        </div>
        <div className="h-64" role="img" aria-label="Line chart comparing committed and completed points across six sprints">
          <ResponsiveContainer height="100%" width="100%">
            <LineChart data={velocity} margin={{ left: -20, right: 10, top: 10 }}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis axisLine={false} dataKey="sprint" tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
              <Tooltip />
              <Line dataKey="points" name="Committed" stroke="var(--color-chart-3)" strokeWidth={2} dot={false} />
              <Line dataKey="completed" name="Completed" stroke="var(--color-primary)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 flex gap-5 text-xs text-muted-foreground"><span>Committed</span><span>Completed</span></div>
      </section>
      <section className="border bg-card p-5">
        <div className="mb-5"><h2 className="font-semibold">Team capacity</h2><p className="mt-1 text-sm text-muted-foreground">Planned capacity against hours used</p></div>
        <div className="h-64" role="img" aria-label="Bar chart comparing planned capacity and used hours by team">
          <ResponsiveContainer height="100%" width="100%">
            <BarChart data={capacity} margin={{ left: -20, right: 10, top: 10 }}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis axisLine={false} dataKey="team" tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="planned" name="Planned" fill="var(--color-chart-3)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="used" name="Used" fill="var(--color-primary)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}