"use client";

import {
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Search,
  ShieldAlert,
} from "lucide-react";
import { useMemo, useState } from "react";

interface AuditLog {
  id: string;
  action: string;
  module: "Auth" | "Security" | "Billing" | "Deployment" | "Workspace";
  actor: string;
  actorRole: "ADMIN" | "MANAGER" | "SYSTEM";
  ipAddress: string;
  status: "Success" | "Warning" | "Failure";
  timestamp: string;
  details: string;
}

const INITIAL_LOGS: AuditLog[] = [
  {
    id: "LOG-9401",
    action: "User Role Escalation",
    module: "Security",
    actor: "sarah.chen@sprintflow.dev",
    actorRole: "ADMIN",
    ipAddress: "192.168.1.104",
    status: "Success",
    timestamp: "Oct 18, 2026 09:22 AM",
    details: "Granted MANAGER role to member user alex.m@enterprise.io",
  },
  {
    id: "LOG-9402",
    action: "Stripe Webhook Signature Verified",
    module: "Billing",
    actor: "stripe-engine",
    actorRole: "SYSTEM",
    ipAddress: "3.220.14.89",
    status: "Success",
    timestamp: "Oct 18, 2026 08:45 AM",
    details:
      "Processed monthly invoice payment for Enterprise Tier ($99.00 USD)",
  },
  {
    id: "LOG-9403",
    action: "Failed SSO Authorization Attempt",
    module: "Auth",
    actor: "guest-attempt@tempmail.com",
    actorRole: "SYSTEM",
    ipAddress: "45.130.82.12",
    status: "Warning",
    timestamp: "Oct 18, 2026 07:15 AM",
    details:
      "Rejected unverified Google OAuth callback token (invalid state param)",
  },
  {
    id: "LOG-9404",
    action: "Automated Production Build Deployed",
    module: "Deployment",
    actor: "ci-turbopack-runner",
    actorRole: "SYSTEM",
    ipAddress: "10.0.4.18",
    status: "Success",
    timestamp: "Oct 18, 2026 06:30 AM",
    details: "Turbopack static export completed across 51 SSG routes cleanly",
  },
  {
    id: "LOG-9405",
    action: "Workspace Settings Modified",
    module: "Workspace",
    actor: "sarah.chen@sprintflow.dev",
    actorRole: "ADMIN",
    ipAddress: "192.168.1.104",
    status: "Success",
    timestamp: "Oct 17, 2026 11:10 PM",
    details: "Updated default sprint iteration duration from 14 to 10 days",
  },
  {
    id: "LOG-9406",
    action: "API Rate Limit Exceeded",
    module: "Security",
    actor: "external-crawler-bot",
    actorRole: "SYSTEM",
    ipAddress: "185.220.101.5",
    status: "Failure",
    timestamp: "Oct 17, 2026 09:42 PM",
    details:
      "Blocked IP after exceeding 500 requests/minute threshold on /api/backend",
  },
  {
    id: "LOG-9407",
    action: "New Member Invitation Sent",
    module: "Workspace",
    actor: "david.kim@sprintflow.dev",
    actorRole: "MANAGER",
    ipAddress: "172.16.0.44",
    status: "Success",
    timestamp: "Oct 17, 2026 04:18 PM",
    details: "Invited engineer elena.r@fintechsprint.io to Cloud Platform team",
  },
  {
    id: "LOG-9408",
    action: "Database Backup Completed",
    module: "Security",
    actor: "cron-backup-worker",
    actorRole: "SYSTEM",
    ipAddress: "10.0.1.200",
    status: "Success",
    timestamp: "Oct 17, 2026 02:00 AM",
    details:
      "Encrypted PostgreSQL WAL snapshot saved to multi-region cloud vault",
  },
];

const ITEMS_PER_PAGE = 4;

export default function AdminLogsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedModule, setSelectedModule] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered list
  const filteredLogs = useMemo(() => {
    return INITIAL_LOGS.filter((log) => {
      // Search
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesAction = log.action.toLowerCase().includes(query);
        const matchesActor = log.actor.toLowerCase().includes(query);
        const matchesDetails = log.details.toLowerCase().includes(query);
        const matchesIp = log.ipAddress.includes(query);
        if (!matchesAction && !matchesActor && !matchesDetails && !matchesIp) {
          return false;
        }
      }

      // Module
      if (selectedModule !== "All" && log.module !== selectedModule) {
        return false;
      }

      // Status
      if (selectedStatus !== "All" && log.status !== selectedStatus) {
        return false;
      }

      return true;
    });
  }, [searchTerm, selectedModule, selectedStatus]);

  const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE) || 1;
  const paginatedLogs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredLogs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredLogs, currentPage]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedModule("All");
    setSelectedStatus("All");
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary">Administration</p>
          <h1 className="mt-1 font-heading text-3xl font-semibold">
            Activity & Audit Logs
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Complete audit trail of system events, security authorizations, and
            workspace modifications.
          </p>
        </div>
      </header>

      {/* Metrics Highlights */}
      <section className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Total Audits
          </p>
          <p className="mt-2 font-heading text-2xl font-bold text-foreground">
            {INITIAL_LOGS.length}
          </p>
        </div>
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Security Checks
          </p>
          <p className="mt-2 font-heading text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {INITIAL_LOGS.filter((l) => l.module === "Security").length}{" "}
            Verified
          </p>
        </div>
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Warnings / Flags
          </p>
          <p className="mt-2 font-heading text-2xl font-bold text-amber-500">
            {INITIAL_LOGS.filter((l) => l.status === "Warning").length}
          </p>
        </div>
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Blocked Breaches
          </p>
          <p className="mt-2 font-heading text-2xl font-bold text-destructive">
            {INITIAL_LOGS.filter((l) => l.status === "Failure").length}
          </p>
        </div>
      </section>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            aria-label="Search logs"
            className="h-10 w-full rounded-xl border border-border/80 bg-background pl-9 pr-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search logs by action, actor email, details, or IP address..."
            value={searchTerm}
          />
        </div>

        <select
          aria-label="Filter by module"
          className="h-10 rounded-xl border border-border/80 bg-background px-3 text-xs sm:text-sm font-medium text-foreground focus:border-primary focus:outline-none cursor-pointer"
          onChange={(e) => {
            setSelectedModule(e.target.value);
            setCurrentPage(1);
          }}
          value={selectedModule}
        >
          <option value="All">All Modules</option>
          <option value="Security">Security</option>
          <option value="Auth">Auth & OAuth</option>
          <option value="Billing">Billing & Stripe</option>
          <option value="Deployment">Deployment</option>
          <option value="Workspace">Workspace</option>
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
          <option value="All">All Outcomes</option>
          <option value="Success">Success</option>
          <option value="Warning">Warning</option>
          <option value="Failure">Failure</option>
        </select>

        {(searchTerm ||
          selectedModule !== "All" ||
          selectedStatus !== "All") && (
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
              <th className="px-5 py-3.5">Event ID & Action</th>
              <th className="px-5 py-3.5">Module</th>
              <th className="px-5 py-3.5">Actor</th>
              <th className="px-5 py-3.5">IP Address</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {paginatedLogs.map((log) => (
              <tr key={log.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    {log.status === "Success" ? (
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                    ) : log.status === "Warning" ? (
                      <AlertTriangle className="size-4 text-amber-500 shrink-0" />
                    ) : (
                      <ShieldAlert className="size-4 text-destructive shrink-0" />
                    )}
                    <div>
                      <p className="font-semibold text-foreground">
                        {log.action}
                      </p>
                      <p className="text-[11px] text-muted-foreground font-mono">
                        {log.id} · {log.details}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="rounded-md border border-border/80 bg-background px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                    {log.module}
                  </span>
                </td>
                <td className="px-5 py-4 text-foreground font-medium">
                  <div>
                    <p className="truncate max-w-[160px]" title={log.actor}>
                      {log.actor}
                    </p>
                    <span className="text-[10px] font-bold text-primary">
                      {log.actorRole}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4 font-mono text-xs text-muted-foreground">
                  {log.ipAddress}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      log.status === "Success"
                        ? "border border-emerald-600/30 bg-emerald-600/10 text-emerald-600 dark:text-emerald-400"
                        : log.status === "Warning"
                          ? "border border-amber-600/30 bg-amber-600/10 text-amber-600 dark:text-amber-400"
                          : "border border-destructive/30 bg-destructive/10 text-destructive"
                    }`}
                  >
                    {log.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-xs text-muted-foreground whitespace-nowrap">
                  {log.timestamp}
                </td>
              </tr>
            ))}

            {paginatedLogs.length === 0 && (
              <tr>
                <td
                  className="px-5 py-14 text-center text-muted-foreground"
                  colSpan={6}
                >
                  No activity logs match your current filter parameters.
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
          <strong className="text-foreground">{filteredLogs.length}</strong>{" "}
          events · Page{" "}
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
                key={`log-page-${pageNum}`}
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
