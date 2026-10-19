"use client";

import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  GitPullRequest,
  RotateCcw,
  Search,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useMemberActivities } from "@/hooks";

interface MemberActivity {
  id: string;
  title: string;
  type:
    | "Task Completed"
    | "Code Review"
    | "Sprint Planning"
    | "Blocker Resolved";
  project: string;
  ticketId: string;
  status: "Verified" | "Pending Review" | "Completed";
  timestamp: string;
}

const MEMBER_ACTIVITIES: MemberActivity[] = [
  {
    id: "ACT-501",
    title: "Merged PR #142: Qdrant vector indexing microservice",
    type: "Code Review",
    project: "SprintFlow AI Core",
    ticketId: "SF-284",
    status: "Verified",
    timestamp: "Today, 09:14 AM",
  },
  {
    id: "ACT-502",
    title: "Completed sprint task: Redis idempotency lock in checkout handler",
    type: "Task Completed",
    project: "FinTech Settlement",
    ticketId: "FT-319",
    status: "Completed",
    timestamp: "Today, 08:30 AM",
  },
  {
    id: "ACT-503",
    title: "Resolved blocking CORS policy on Stripe Webhook API routes",
    type: "Blocker Resolved",
    project: "Billing Engine",
    ticketId: "BL-102",
    status: "Verified",
    timestamp: "Yesterday, 04:45 PM",
  },
  {
    id: "ACT-504",
    title: "Participated in Sprint 25 retrospective and capacity estimation",
    type: "Sprint Planning",
    project: "Enterprise Workspace",
    ticketId: "SP-25",
    status: "Completed",
    timestamp: "Yesterday, 02:15 PM",
  },
  {
    id: "ACT-505",
    title: "Submitted PR #89: Mapbox GL dynamic routing polyline cache",
    type: "Code Review",
    project: "Fleet Dispatch",
    ticketId: "FD-401",
    status: "Pending Review",
    timestamp: "Oct 16, 2026 05:20 PM",
  },
  {
    id: "ACT-506",
    title:
      "Finished task: Foundry test suite for timelock governance smart contract",
    type: "Task Completed",
    project: "DeFi Staking Vault",
    ticketId: "DF-772",
    status: "Completed",
    timestamp: "Oct 16, 2026 11:30 AM",
  },
];

const ITEMS_PER_PAGE = 4;

export default function MemberActivityPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const activitiesQuery = useMemberActivities();

  const allActivities: MemberActivity[] = useMemo(() => {
    const raw = activitiesQuery.data?.data;
    if (Array.isArray(raw) && raw.length > 0) {
      return raw.map(
        (item: {
          id: string;
          action: string;
          details?: string | null;
          createdAt: string;
          task?: { id: string; title: string } | null;
        }) => {
          let actType: MemberActivity["type"] = "Task Completed";
          const actionLower = item.action.toLowerCase();
          if (actionLower.includes("pr") || actionLower.includes("review")) {
            actType = "Code Review";
          } else if (
            actionLower.includes("sprint") ||
            actionLower.includes("planning")
          ) {
            actType = "Sprint Planning";
          } else if (
            actionLower.includes("blocker") ||
            actionLower.includes("fix")
          ) {
            actType = "Blocker Resolved";
          }

          const project = item.task?.title || "SprintFlow AI Core";
          const ticketId = item.task?.id
            ? `SF-${item.task.id.slice(-3).toUpperCase()}`
            : `SF-${item.id.slice(-3).toUpperCase()}`;

          return {
            id: item.id,
            title: item.action,
            type: actType,
            project,
            ticketId,
            status: "Completed",
            timestamp: new Date(item.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
        },
      );
    }
    return MEMBER_ACTIVITIES;
  }, [activitiesQuery.data]);

  const filteredActivities = useMemo(() => {
    return allActivities.filter((act) => {
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesTitle = act.title.toLowerCase().includes(q);
        const matchesProject = act.project.toLowerCase().includes(q);
        const matchesTicket = act.ticketId.toLowerCase().includes(q);
        if (!matchesTitle && !matchesProject && !matchesTicket) return false;
      }
      if (selectedType !== "All" && act.type !== selectedType) return false;
      if (selectedStatus !== "All" && act.status !== selectedStatus)
        return false;
      return true;
    });
  }, [allActivities, searchTerm, selectedType, selectedStatus]);

  const totalPages = Math.ceil(filteredActivities.length / ITEMS_PER_PAGE) || 1;
  const paginatedActivities = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredActivities.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredActivities, currentPage]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedType("All");
    setSelectedStatus("All");
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary">My Workspace</p>
          <h1 className="mt-1 font-heading text-3xl font-semibold">
            Activity & Contribution History
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Track your completed tasks, pull requests reviewed, and sprint
            milestones.
          </p>
        </div>
      </header>

      {/* Metrics Highlights */}
      <section className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Total Contributions
          </p>
          <p className="mt-2 font-heading text-2xl font-bold text-foreground">
            {allActivities.length}
          </p>
        </div>
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Tasks Completed
          </p>
          <p className="mt-2 font-heading text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {allActivities.filter((a) => a.type === "Task Completed").length}
          </p>
        </div>
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Code Reviews
          </p>
          <p className="mt-2 font-heading text-2xl font-bold text-primary">
            {allActivities.filter((a) => a.type === "Code Review").length}
          </p>
        </div>
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Blockers Cleared
          </p>
          <p className="mt-2 font-heading text-2xl font-bold text-foreground">
            {allActivities.filter((a) => a.type === "Blocker Resolved").length}
          </p>
        </div>
      </section>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            aria-label="Search activities"
            className="h-10 w-full rounded-xl border border-border/80 bg-background pl-9 pr-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search activities by description, project, or ticket ID..."
            value={searchTerm}
          />
        </div>

        <select
          aria-label="Filter by activity type"
          className="h-10 rounded-xl border border-border/80 bg-background px-3 text-xs sm:text-sm font-medium text-foreground focus:border-primary focus:outline-none cursor-pointer"
          onChange={(e) => {
            setSelectedType(e.target.value);
            setCurrentPage(1);
          }}
          value={selectedType}
        >
          <option value="All">All Types</option>
          <option value="Task Completed">Tasks Completed</option>
          <option value="Code Review">Code Reviews</option>
          <option value="Sprint Planning">Sprint Planning</option>
          <option value="Blocker Resolved">Blockers Resolved</option>
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
          <option value="Verified">Verified</option>
          <option value="Completed">Completed</option>
          <option value="Pending Review">Pending Review</option>
        </select>

        {(searchTerm || selectedType !== "All" || selectedStatus !== "All") && (
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
              <th className="px-5 py-3.5">Activity & Ticket</th>
              <th className="px-5 py-3.5">Type</th>
              <th className="px-5 py-3.5">Project</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {paginatedActivities.map((act) => (
              <tr key={act.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-start gap-2.5">
                    {act.type === "Code Review" ? (
                      <GitPullRequest className="size-4 text-primary shrink-0 mt-0.5" />
                    ) : act.type === "Blocker Resolved" ? (
                      <Zap className="size-4 text-amber-500 shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-semibold text-foreground">
                        {act.title}
                      </p>
                      <span className="font-mono text-[11px] font-bold text-primary">
                        {act.ticketId}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="rounded-md border border-border/80 bg-background px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                    {act.type}
                  </span>
                </td>
                <td className="px-5 py-4 text-foreground font-medium">
                  {act.project}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      act.status === "Verified" || act.status === "Completed"
                        ? "border border-emerald-600/30 bg-emerald-600/10 text-emerald-600 dark:text-emerald-400"
                        : "border border-amber-600/30 bg-amber-600/10 text-amber-600 dark:text-amber-400"
                    }`}
                  >
                    {act.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-xs text-muted-foreground whitespace-nowrap">
                  {act.timestamp}
                </td>
              </tr>
            ))}

            {paginatedActivities.length === 0 && (
              <tr>
                <td
                  className="px-5 py-14 text-center text-muted-foreground"
                  colSpan={5}
                >
                  No activities match your current search and filter settings.
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
          <strong className="text-foreground">
            {filteredActivities.length}
          </strong>{" "}
          activities · Page{" "}
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
                key={`act-page-${pageNum}`}
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
