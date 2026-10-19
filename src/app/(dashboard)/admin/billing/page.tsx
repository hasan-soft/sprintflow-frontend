"use client";

import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Receipt,
  RotateCcw,
  Search,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import CheckoutButton from "@/components/modules/admin/CheckoutButton";
import { useProjects, useSubscriptionsHistory } from "@/hooks";

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  plan: string;
  amount: string;
  status: "Paid" | "Processing";
}

const INVOICE_HISTORY: Invoice[] = [
  {
    id: "inv-1",
    invoiceNumber: "INV-2026-009",
    date: "Oct 01, 2026",
    plan: "Enterprise Workspace",
    amount: "$99.00 USD",
    status: "Paid",
  },
  {
    id: "inv-2",
    invoiceNumber: "INV-2026-008",
    date: "Sep 01, 2026",
    plan: "Enterprise Workspace",
    amount: "$99.00 USD",
    status: "Paid",
  },
  {
    id: "inv-3",
    invoiceNumber: "INV-2026-007",
    date: "Aug 01, 2026",
    plan: "Pro Workspace",
    amount: "$29.00 USD",
    status: "Paid",
  },
  {
    id: "inv-4",
    invoiceNumber: "INV-2026-006",
    date: "Jul 01, 2026",
    plan: "Pro Workspace",
    amount: "$29.00 USD",
    status: "Paid",
  },
  {
    id: "inv-5",
    invoiceNumber: "INV-2026-005",
    date: "Jun 01, 2026",
    plan: "Pro Workspace",
    amount: "$29.00 USD",
    status: "Paid",
  },
  {
    id: "inv-6",
    invoiceNumber: "INV-2026-010",
    date: "Nov 01, 2026",
    plan: "Enterprise Workspace",
    amount: "$99.00 USD",
    status: "Processing",
  },
];

const ITEMS_PER_PAGE = 3;

export default function AdminBillingPage() {
  const projectsQuery = useProjects();
  const subscriptionsQuery = useSubscriptionsHistory();
  const [organizationId, setOrganizationId] = useState("");
  const [plan, setPlan] = useState<"PRO" | "ENTERPRISE">("PRO");

  // Invoices table filter & pagination state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);

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

  const allInvoices = useMemo(() => {
    const subs = subscriptionsQuery.data?.data;
    if (subs && subs.length > 0) {
      return subs.map((s, idx) => ({
        id: s.id,
        invoiceNumber: `INV-${new Date(s.createdAt).getFullYear()}-${String(
          subs.length - idx,
        ).padStart(3, "0")}`,
        date: new Date(s.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        plan: `${s.plan.charAt(0) + s.plan.slice(1).toLowerCase()} Workspace`,
        amount: `$${s.amount.toFixed(2)} ${s.currency}`,
        status: (s.status === "COMPLETED" ? "Paid" : "Processing") as
          | "Paid"
          | "Processing",
      }));
    }
    return INVOICE_HISTORY;
  }, [subscriptionsQuery.data]);

  const filteredInvoices = useMemo(() => {
    return allInvoices.filter((inv) => {
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesNum = inv.invoiceNumber.toLowerCase().includes(q);
        const matchesPlan = inv.plan.toLowerCase().includes(q);
        if (!matchesNum && !matchesPlan) return false;
      }
      if (selectedStatus !== "All" && inv.status !== selectedStatus)
        return false;
      return true;
    });
  }, [allInvoices, searchTerm, selectedStatus]);

  const totalPages = Math.ceil(filteredInvoices.length / ITEMS_PER_PAGE) || 1;
  const paginatedInvoices = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredInvoices.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredInvoices, currentPage]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedStatus("All");
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-7">
      <header>
        <p className="text-sm font-semibold text-primary">Administration</p>
        <h1 className="mt-1 font-heading text-3xl font-semibold">
          Billing & Subscription
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Plan, payment gateways, and enterprise billing history for your
          workspace.
        </p>
      </header>

      {/* Plan Details & Upgrade Section */}
      <section className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-2xs">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Current Plan
              </p>
              <h2 className="mt-1 font-heading text-xl font-bold text-foreground">
                Enterprise Workspace
              </h2>
            </div>
            <span className="rounded-md border border-emerald-600/30 bg-emerald-600/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Active Tier
            </span>
          </div>
          <dl className="mt-7 grid gap-4 border-t border-border/60 pt-5 sm:grid-cols-3">
            <div>
              <dt className="text-xs text-muted-foreground font-semibold">
                Billing Cycle
              </dt>
              <dd className="mt-1 text-sm font-bold text-foreground">
                Monthly
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground font-semibold">
                Seats in Use
              </dt>
              <dd className="mt-1 text-sm font-bold text-foreground">
                18 of 25
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground font-semibold">
                Next Invoice
              </dt>
              <dd className="mt-1 text-sm font-bold text-foreground">
                Nov 1, 2026
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-border/80 bg-card p-6 shadow-2xs">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Billing Organization
              <select
                className="mt-2 h-10 w-full rounded-xl border border-border/80 bg-background px-3 text-xs sm:text-sm font-medium text-foreground focus:border-primary focus:outline-none cursor-pointer"
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
            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-foreground">
              {plan === "PRO" ? "Pro Plan" : "Enterprise Plan"}
            </p>
            <p className="mt-2 font-heading text-3xl font-extrabold text-foreground">
              {plan === "PRO" ? "$29" : "$99"}
              <span className="font-sans text-xs font-normal text-muted-foreground">
                {" "}
                / month
              </span>
            </p>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              {plan === "PRO"
                ? "Full agile project planning and delivery analytics."
                : "Advanced enterprise capacity and workspace analytics."}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label className="sr-only" htmlFor="billing-plan">
              Plan
            </label>
            <select
              id="billing-plan"
              className="h-10 rounded-xl border border-border/80 bg-background px-3 text-xs sm:text-sm font-medium text-foreground focus:border-primary focus:outline-none cursor-pointer"
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
            <p className="text-xs text-destructive">
              Could not load organizations from the API.
            </p>
          )}
        </div>
      </section>

      {/* Invoices & Transaction History Data Table */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
              <Receipt className="size-4 text-primary" />
              <span>Invoices & Billing History</span>
            </h2>
            <p className="text-xs text-muted-foreground">
              Past payment receipts and active subscriptions
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <input
                aria-label="Search invoices"
                className="h-9 w-44 sm:w-56 rounded-xl border border-border/80 bg-background pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                placeholder="Search invoice #..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <select
              aria-label="Filter invoice status"
              className="h-9 rounded-xl border border-border/80 bg-background px-2.5 text-xs font-medium text-foreground focus:border-primary focus:outline-none cursor-pointer"
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All Invoices</option>
              <option value="Paid">Paid</option>
              <option value="Processing">Processing</option>
            </select>

            {(searchTerm || selectedStatus !== "All") && (
              <button
                type="button"
                onClick={resetFilters}
                className="flex items-center gap-1 rounded-xl border border-border/80 bg-card px-2.5 py-1.5 text-xs text-muted-foreground hover:bg-muted cursor-pointer"
              >
                <RotateCcw className="size-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-border/80 bg-card shadow-2xs">
          <table className="w-full min-w-[600px] text-left text-xs sm:text-sm">
            <thead className="border-b border-border/80 bg-muted/40 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3.5">Invoice #</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5">Subscription Plan</th>
                <th className="px-5 py-3.5">Amount</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {paginatedInvoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-5 py-4 font-mono font-bold text-foreground">
                    {inv.invoiceNumber}
                  </td>
                  <td className="px-5 py-4 text-muted-foreground text-xs">
                    {inv.date}
                  </td>
                  <td className="px-5 py-4 font-medium text-foreground">
                    {inv.plan}
                  </td>
                  <td className="px-5 py-4 font-mono font-bold text-foreground">
                    {inv.amount}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        inv.status === "Paid"
                          ? "border border-emerald-600/30 bg-emerald-600/10 text-emerald-600 dark:text-emerald-400"
                          : "border border-amber-600/30 bg-amber-600/10 text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {inv.status === "Paid" ? (
                        <CheckCircle2 className="size-3" />
                      ) : (
                        <Clock className="size-3" />
                      )}
                      <span>{inv.status}</span>
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline cursor-pointer"
                    >
                      <Download className="size-3" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}

              {paginatedInvoices.length === 0 && (
                <tr>
                  <td
                    className="px-5 py-10 text-center text-muted-foreground"
                    colSpan={6}
                  >
                    No invoices match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p className="text-muted-foreground">
            Showing{" "}
            <strong className="text-foreground">
              {filteredInvoices.length}
            </strong>{" "}
            invoices · Page{" "}
            <strong className="text-foreground">{currentPage}</strong> of{" "}
            <strong className="text-foreground">{totalPages}</strong>
          </p>

          <div className="flex items-center gap-1.5">
            <button
              className="flex size-8 items-center justify-center rounded-xl border border-border/80 bg-card text-foreground hover:bg-muted disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => p - 1)}
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
                  key={`inv-page-${pageNum}`}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
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
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              type="button"
              aria-label="Next page"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Payment Method Section */}
      <section className="rounded-2xl border border-border/80 bg-card p-6 shadow-2xs">
        <h2 className="font-heading text-base font-bold text-foreground">
          Payment Method
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Default credit card on file: •••• •••• •••• 4242 (Stripe Test Vault)
        </p>
      </section>
    </div>
  );
}
