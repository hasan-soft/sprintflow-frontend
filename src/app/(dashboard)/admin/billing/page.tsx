"use client";

import { useEffect, useState } from "react";
import CheckoutButton from "@/components/modules/admin/CheckoutButton";
import { useProjects } from "@/hooks";

export default function AdminBillingPage() {
  const projectsQuery = useProjects();
  const [organizationId, setOrganizationId] = useState("");
  const [plan, setPlan] = useState<"PRO" | "ENTERPRISE">("PRO");
  const organizations = Array.from(
    new Map(
      (projectsQuery.data?.data ?? []).map((project) => [
        project.organizationId,
        project.organization?.name ?? project.organizationId,
      ]),
    ).entries(),
  );

  useEffect(() => {
    if (!organizationId && organizations[0])
      setOrganizationId(organizations[0][0]);
  }, [organizationId, organizations]);

  return (
    <div className="mx-auto max-w-5xl space-y-7">
      <header>
        <p className="text-sm font-semibold text-primary">Administration</p>
        <h1 className="mt-1 font-heading text-3xl font-semibold">Billing</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Plan and payment settings for your workspace.
        </p>
      </header>
      <section className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="border bg-card p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Current plan</p>
              <h2 className="mt-1 text-xl font-semibold">Starter workspace</h2>
            </div>
            <span className="border border-emerald-600/30 bg-emerald-600/10 px-2.5 py-1 text-xs font-medium text-emerald-700">
              Active
            </span>
          </div>
          <dl className="mt-7 grid gap-4 border-t pt-5 sm:grid-cols-3">
            <div>
              <dt className="text-xs text-muted-foreground">Billing cycle</dt>
              <dd className="mt-1 text-sm font-medium">Monthly</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Seats in use</dt>
              <dd className="mt-1 text-sm font-medium">18 of 25</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Next invoice</dt>
              <dd className="mt-1 text-sm font-medium">Nov 1, 2026</dd>
            </div>
          </dl>
        </div>
        <div className="flex flex-col items-start justify-between gap-5 border bg-card p-6">
          <div>
            <label className="text-xs font-medium text-muted-foreground">
              Billing organization
              <select
                className="mt-2 h-10 w-full border bg-background px-3 text-sm text-foreground"
                onChange={(event) => setOrganizationId(event.target.value)}
                value={organizationId}
              >
                <option value="">Select an organization</option>
                {organizations.map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            <p className="mt-5 text-sm font-semibold">
              {plan === "PRO" ? "Pro plan" : "Enterprise plan"}
            </p>
            <p className="mt-3 font-heading text-3xl font-semibold">
              {plan === "PRO" ? "$29" : "$99"}
              <span className="font-sans text-sm font-normal text-muted-foreground">
                {" "}
                / month
              </span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {plan === "PRO"
                ? "Project planning and delivery analytics."
                : "Advanced capacity and workspace analytics."}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label className="sr-only" htmlFor="billing-plan">
              Plan
            </label>
            <select
              id="billing-plan"
              className="h-10 border bg-background px-3 text-sm"
              onChange={(event) =>
                setPlan(event.target.value as "PRO" | "ENTERPRISE")
              }
              value={plan}
            >
              <option value="PRO">Pro · $29/mo</option>
              <option value="ENTERPRISE">Enterprise · $99/mo</option>
            </select>
            <CheckoutButton organizationId={organizationId} plan={plan} />
          </div>
          {projectsQuery.isError && (
            <p className="text-sm text-destructive">
              Could not load organizations from the API.
            </p>
          )}
        </div>
      </section>
      <section className="border bg-card p-6">
        <h2 className="font-semibold">Payment method</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          No payment method has been saved to this demo workspace.
        </p>
      </section>
    </div>
  );
}
