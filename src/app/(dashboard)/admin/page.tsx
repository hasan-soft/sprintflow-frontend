import Link from "next/link";
import AnalyticsCharts from "@/components/modules/admin/AnalyticsCharts";

const metrics = [
  { label: "Active projects", value: "24", change: "+3 this month" },
  { label: "Workspace members", value: "186", change: "+12 this month" },
  { label: "Tasks completed", value: "1,284", change: "92% on schedule" },
  { label: "Monthly spend", value: "$18,420", change: "68% of budget" },
];

export default function AdminOverviewPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="text-sm font-semibold text-primary">Workspace overview</p><h1 className="mt-1 font-heading text-3xl font-semibold">Good morning, Alex</h1><p className="mt-2 text-sm text-muted-foreground">Here is how your teams are moving this week.</p></div>
        <Link className="border px-4 py-2 text-sm font-medium hover:bg-accent" href="/admin/users">Manage people</Link>
      </header>
      <section aria-label="Workspace metrics" className="grid gap-px border bg-border sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => <div className="bg-card p-5" key={metric.label}><p className="text-sm text-muted-foreground">{metric.label}</p><p className="mt-3 font-heading text-3xl font-semibold">{metric.value}</p><p className="mt-2 text-xs text-muted-foreground">{metric.change}</p></div>)}
      </section>
      <AnalyticsCharts />
      <section className="border bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="font-semibold">Workspace administration</h2><p className="mt-1 text-sm text-muted-foreground">People, invoices, and audit history.</p></div></div>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link className="underline underline-offset-4" href="/admin/users">User management</Link>
          <Link className="underline underline-offset-4" href="/admin/billing">Billing settings</Link>
          <Link className="underline underline-offset-4" href="/admin/logs">Activity logs</Link>
        </div>
      </section>
    </div>
  );
}