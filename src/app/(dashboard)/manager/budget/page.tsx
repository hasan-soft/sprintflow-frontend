"use client";

import { ChevronLeft, ChevronRight, RotateCcw, Search } from "lucide-react";
import { useMemo, useState } from "react";

interface ProjectBudget {
  id: string;
  project: string;
  department: "Engineering" | "Mobile" | "Infrastructure" | "AI & Data";
  totalBudget: number;
  spent: number;
  status: "On Track" | "Caution" | "Over Budget";
  lead: string;
}

const BUDGET_DATA: ProjectBudget[] = [
  {
    id: "B-101",
    project: "SprintFlow AI Core & Vector Search",
    department: "AI & Data",
    totalBudget: 48000,
    spent: 32400,
    status: "On Track",
    lead: "Alex Rivera",
  },
  {
    id: "B-102",
    project: "FinTech Automated Settlement Engine",
    department: "Engineering",
    totalBudget: 55000,
    spent: 51200,
    status: "Caution",
    lead: "Elena Rostova",
  },
  {
    id: "B-103",
    project: "Kubernetes Multi-Region Auto-Scaler",
    department: "Infrastructure",
    totalBudget: 38000,
    spent: 24500,
    status: "On Track",
    lead: "Marcus Vance",
  },
  {
    id: "B-104",
    project: "Real-Time Fleet Dispatch System",
    department: "Mobile",
    totalBudget: 44000,
    spent: 45800,
    status: "Over Budget",
    lead: "Kenji Sato",
  },
  {
    id: "B-105",
    project: "DeFi Governance & Staking Vault",
    department: "Engineering",
    totalBudget: 52000,
    spent: 31000,
    status: "On Track",
    lead: "Sophia Taylor",
  },
  {
    id: "B-106",
    project: "Industrial Edge IoT Gateway",
    department: "Infrastructure",
    totalBudget: 34000,
    spent: 28900,
    status: "Caution",
    lead: "Liam O'Connor",
  },
];

const ITEMS_PER_PAGE = 4;

export default function ManagerBudgetPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBudgets = useMemo(() => {
    return BUDGET_DATA.filter((item) => {
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesName = item.project.toLowerCase().includes(q);
        const matchesLead = item.lead.toLowerCase().includes(q);
        if (!matchesName && !matchesLead) return false;
      }
      if (selectedDept !== "All" && item.department !== selectedDept)
        return false;
      if (selectedStatus !== "All" && item.status !== selectedStatus)
        return false;
      return true;
    });
  }, [searchTerm, selectedDept, selectedStatus]);

  const totalPages = Math.ceil(filteredBudgets.length / ITEMS_PER_PAGE) || 1;
  const paginatedBudgets = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBudgets.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredBudgets, currentPage]);

  const totalAllocated = BUDGET_DATA.reduce((acc, b) => acc + b.totalBudget, 0);
  const totalSpent = BUDGET_DATA.reduce((acc, b) => acc + b.spent, 0);
  const remainingBudget = totalAllocated - totalSpent;
  const overallPercentage = Math.round((totalSpent / totalAllocated) * 100);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedDept("All");
    setSelectedStatus("All");
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary">Team Management</p>
          <h1 className="mt-1 font-heading text-3xl font-semibold">
            Project Budgets & Allocations
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Monitor sprint expenditures, financial runways, and departmental
            resource allocations.
          </p>
        </div>
      </header>

      {/* Overview Cards */}
      <section className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Total Allocated
          </p>
          <p className="mt-2 font-heading text-2xl font-bold text-foreground">
            ${totalAllocated.toLocaleString()}
          </p>
        </div>
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Total Expended
          </p>
          <p className="mt-2 font-heading text-2xl font-bold text-primary">
            ${totalSpent.toLocaleString()} ({overallPercentage}%)
          </p>
        </div>
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Remaining Runway
          </p>
          <p className="mt-2 font-heading text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            ${remainingBudget.toLocaleString()}
          </p>
        </div>
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Budgets On Track
          </p>
          <p className="mt-2 font-heading text-2xl font-bold text-foreground">
            {BUDGET_DATA.filter((b) => b.status === "On Track").length} of{" "}
            {BUDGET_DATA.length}
          </p>
        </div>
      </section>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            aria-label="Search budgets"
            className="h-10 w-full rounded-xl border border-border/80 bg-background pl-9 pr-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search budgets by project name or team lead..."
            value={searchTerm}
          />
        </div>

        <select
          aria-label="Filter by department"
          className="h-10 rounded-xl border border-border/80 bg-background px-3 text-xs sm:text-sm font-medium text-foreground focus:border-primary focus:outline-none cursor-pointer"
          onChange={(e) => {
            setSelectedDept(e.target.value);
            setCurrentPage(1);
          }}
          value={selectedDept}
        >
          <option value="All">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Mobile">Mobile</option>
          <option value="Infrastructure">Infrastructure</option>
          <option value="AI & Data">AI & Data</option>
        </select>

        <select
          aria-label="Filter by status"
          className="h-10 rounded-xl border border-border/80 bg-background px-3 text-xs sm:text-sm font-medium text-foreground focus:border-primary focus:outline-none cursor-pointer"
          onChange={(e) => {
            setSelectedStatus(e.target.value);
            setCurrentPage(1);
          }}
          value={selectedStatus}
        >
          <option value="All">All Statuses</option>
          <option value="On Track">On Track</option>
          <option value="Caution">Caution</option>
          <option value="Over Budget">Over Budget</option>
        </select>

        {(searchTerm || selectedDept !== "All" || selectedStatus !== "All") && (
          <button
            type="button"
            onClick={resetFilters}
            className="flex items-center gap-1.5 rounded-xl border border-border/80 bg-card px-3 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer"
          >
            <RotateCcw className="size-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto rounded-2xl border border-border/80 bg-card shadow-2xs">
        <table className="w-full min-w-[700px] text-left text-xs sm:text-sm">
          <thead className="border-b border-border/80 bg-muted/40 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-3.5">Project</th>
              <th className="px-5 py-3.5">Department</th>
              <th className="px-5 py-3.5">Allocated</th>
              <th className="px-5 py-3.5">Spent</th>
              <th className="px-5 py-3.5">Utilization</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5">Lead</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {paginatedBudgets.map((b) => {
              const pct = Math.round((b.spent / b.totalBudget) * 100);
              return (
                <tr key={b.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-4 font-semibold text-foreground">
                    {b.project}
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-md border border-border/80 bg-background px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                      {b.department}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-mono font-medium text-foreground">
                    ${b.totalBudget.toLocaleString()}
                  </td>
                  <td className="px-5 py-4 font-mono font-medium text-muted-foreground">
                    ${b.spent.toLocaleString()}
                  </td>
                  <td className="px-5 py-4 min-w-[140px]">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span>{pct}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            b.status === "On Track"
                              ? "bg-primary"
                              : b.status === "Caution"
                                ? "bg-amber-500"
                                : "bg-destructive"
                          }`}
                          style={{ width: `${Math.min(pct, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        b.status === "On Track"
                          ? "border border-emerald-600/30 bg-emerald-600/10 text-emerald-600 dark:text-emerald-400"
                          : b.status === "Caution"
                            ? "border border-amber-600/30 bg-amber-600/10 text-amber-600 dark:text-amber-400"
                            : "border border-destructive/30 bg-destructive/10 text-destructive"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground font-medium">
                    {b.lead}
                  </td>
                </tr>
              );
            })}

            {paginatedBudgets.length === 0 && (
              <tr>
                <td
                  className="px-5 py-14 text-center text-muted-foreground"
                  colSpan={7}
                >
                  No project budgets match your current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <p className="text-muted-foreground">
          Showing{" "}
          <strong className="text-foreground">{filteredBudgets.length}</strong>{" "}
          budgets · Page{" "}
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
                key={`b-page-${pageNum}`}
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
    </div>
  );
}
