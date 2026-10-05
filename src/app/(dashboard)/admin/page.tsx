"use client";

import Link from "next/link";
import AnalyticsCharts from "@/components/modules/admin/AnalyticsCharts";
import { useAdminStats } from "@/hooks";

export default function AdminOverviewPage() {
  const statsQuery = useAdminStats();
  const overview = statsQuery.data?.data.overview;
  const metrics = [
    { label: "Projects", value: overview?.projects },
    { label: "Workspace members", value: overview?.users },
    { label: "Tasks", value: overview?.tasks },
    { label: "Subscriptions", value: overview?.subscriptions },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary">
            Workspace overview
          </p>
          <h1 className="mt-1 font-heading text-3xl font-semibold">
            Workspace analytics
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Live totals across projects, delivery, and collaboration.
          </p>
        </div>
        <Link
          className="border px-4 py-2 text-sm font-medium hover:bg-accent"
          href="/admin/users"
        >
          Manage people
        </Link>
      </header>
      <section
        aria-label="Workspace metrics"
        className="grid gap-px border bg-border sm:grid-cols-2 xl:grid-cols-4"
      >
        {statsQuery.isPending ? (
          <div className="col-span-full grid animate-pulse grid-cols-2 gap-px bg-border xl:grid-cols-4">
            {metrics.map((metric) => (
              <div className="h-28 bg-card" key={metric.label} />
            ))}
          </div>
        ) : statsQuery.isError || !overview ? (
          <div className="col-span-full bg-card p-6 text-sm text-rose-800">
            Workspace analytics could not be loaded from the API.
          </div>
        ) : (
          metrics.map((metric) => (
            <div className="bg-card p-5" key={metric.label}>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <p className="mt-3 font-heading text-3xl font-semibold">
                {metric.value ?? 0}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Current total
              </p>
            </div>
          ))
        )}
      </section>
      {overview && <AnalyticsCharts overview={overview} />}
      <section className="border bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold">Workspace administration</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              People, invoices, and audit history.
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link className="underline underline-offset-4" href="/admin/users">
            User management
          </Link>
          <Link className="underline underline-offset-4" href="/admin/billing">
            Billing settings
          </Link>
          <Link className="underline underline-offset-4" href="/admin/logs">
            Activity logs
          </Link>
        </div>
      </section>
    </div>
  );
}
