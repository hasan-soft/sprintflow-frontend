"use client";

import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  CreditCard,
  FolderGit2,
  KanbanSquare,
  Lock,
  PlusCircle,
  Shield,
  SlidersHorizontal,
  UserCheck,
  Users2,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function RoleShowcase() {
  const [selectedRole, setSelectedRole] = useState<"ADMIN" | "MANAGER" | "MEMBER">("ADMIN");

  const roles = {
    ADMIN: {
      role: "ADMIN",
      title: "Workspace Administration & Org Oversight",
      pill: "For Founders & DevOps Admins",
      color: "emerald",
      badge: "Owner Authority",
      tagline: "Total governance over security, users, and monetization.",
      quickStats: [
        { label: "Active Seats", value: "24 / 30" },
        { label: "Stripe Tier", value: "PRO ($29/mo)" },
        { label: "Total Projects", value: "14 Active" },
      ],
      features: [
        "Manage member permissions (Admin, Manager, Member roles)",
        "Stripe test mode invoices, checkout sessions & payment status",
        "System-wide immutable audit logs for compliance tracking",
        "Resource allocation and organizational billing controls",
      ],
      destination: "/admin",
      loginEmail: "admin@gmail.com",
      mockup: (
        <div className="space-y-4 font-sans text-xs">
          <div className="flex items-center justify-between border-b border-border/70 pb-3">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-foreground">Admin Control Hub · Stripe Test Mode</span>
            </div>
            <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              Active Tier
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div className="rounded-lg border bg-card p-3 shadow-2xs">
              <p className="text-[10px] text-muted-foreground uppercase font-medium">Monthly Invoicing</p>
              <p className="mt-1 font-heading text-lg font-bold text-foreground">$29.00</p>
              <span className="text-[10px] text-emerald-600 font-medium">Auto-renewing</span>
            </div>
            <div className="rounded-lg border bg-card p-3 shadow-2xs">
              <p className="text-[10px] text-muted-foreground uppercase font-medium">Team Members</p>
              <p className="mt-1 font-heading text-lg font-bold text-foreground">18 Users</p>
              <span className="text-[10px] text-muted-foreground">Across 3 squads</span>
            </div>
            <div className="rounded-lg border bg-card p-3 shadow-2xs">
              <p className="text-[10px] text-muted-foreground uppercase font-medium">Audit Events</p>
              <p className="mt-1 font-heading text-lg font-bold text-foreground">412 Logs</p>
              <span className="text-[10px] text-sky-600 font-medium">Zero errors</span>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-3.5 space-y-2">
            <p className="font-medium text-foreground">Recent Organization Audit Trail</p>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] py-1 border-b border-border/40">
                <span className="font-mono text-muted-foreground">08:42 AM</span>
                <span className="text-foreground">Role updated: member@gmail.com → MEMBER</span>
                <span className="text-emerald-600 font-medium">Verified</span>
              </div>
              <div className="flex items-center justify-between text-[11px] py-1">
                <span className="font-mono text-muted-foreground">07:15 AM</span>
                <span className="text-foreground">Stripe checkout session initialized (#cs_test_84)</span>
                <span className="text-sky-600 font-medium">Paid</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    MANAGER: {
      role: "MANAGER",
      title: "Sprint Orchestration & Project Health",
      pill: "For Engineering Leads & PMs",
      color: "sky",
      badge: "Delivery Command",
      tagline: "Keep teams shipping on time with granular sprint metrics.",
      quickStats: [
        { label: "Active Sprints", value: "Sprint 24" },
        { label: "Planned Tasks", value: "48 Tickets" },
        { label: "Sprint Velocity", value: "92% On-Time" },
      ],
      features: [
        "Multi-step Project Creation Wizard with full validation",
        "Filter projects by status and keyword with URL sync (?status=ACTIVE)",
        "Track sprint capacity, deadlines, and project health indicators",
        "Real-time task distribution across team members",
      ],
      destination: "/manager",
      loginEmail: "manager@gmail.com",
      mockup: (
        <div className="space-y-4 font-sans text-xs">
          <div className="flex items-center justify-between border-b border-border/70 pb-3">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-sky-500 animate-pulse" />
              <span className="font-semibold text-foreground">Manager View · Sprint 24 Delivery Pulse</span>
            </div>
            <span className="rounded-md border border-sky-500/30 bg-sky-500/10 px-2 py-0.5 text-[11px] font-semibold text-sky-600 dark:text-sky-400">
              5 Days Left
            </span>
          </div>

          <div className="rounded-lg border bg-card p-3.5 space-y-2.5">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-foreground">Project: Core Web Platform v2</p>
                <p className="text-[11px] text-muted-foreground">Budget: $14,000 / $20,000 allocated</p>
              </div>
              <span className="text-xs font-bold text-sky-600">70% Burndown</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-sky-500 rounded-full w-[70%]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-lg border bg-card p-3">
              <p className="text-[10px] text-muted-foreground uppercase">URL Filter Sync</p>
              <p className="mt-1 font-mono text-[11px] text-foreground bg-muted p-1 rounded">
                ?q=auth&status=ACTIVE
              </p>
            </div>
            <div className="rounded-lg border bg-card p-3">
              <p className="text-[10px] text-muted-foreground uppercase">Project Creation</p>
              <p className="mt-1 font-semibold text-foreground flex items-center gap-1">
                <PlusCircle className="size-3 text-sky-600" /> Multi-Step Wizard
              </p>
            </div>
          </div>
        </div>
      ),
    },
    MEMBER: {
      role: "MEMBER",
      title: "Interactive Kanban Execution",
      pill: "For Engineers & Designers",
      color: "amber",
      badge: "Focus Flow",
      tagline: "Move tickets, update subtasks, and crush deadlines smoothly.",
      quickStats: [
        { label: "My Tasks", value: "7 Assigned" },
        { label: "In Review", value: "2 Tickets" },
        { label: "Completed", value: "14 This Sprint" },
      ],
      features: [
        "Drag & Drop Kanban Board powered by @dnd-kit/core",
        "Subtasks checklists & instant status progression",
        "Personal activity history and milestone timelines",
        "Optimistic UI updates for immediate user feedback",
      ],
      destination: "/member",
      loginEmail: "member@gmail.com",
      mockup: (
        <div className="space-y-4 font-sans text-xs">
          <div className="flex items-center justify-between border-b border-border/70 pb-3">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-amber-500" />
              <span className="font-semibold text-foreground">Member Workspace · Kanban Board</span>
            </div>
            <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
              Drag-and-Drop
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-lg border border-border/60 bg-muted/40 p-2.5 space-y-2">
              <p className="text-[11px] font-semibold text-muted-foreground">TODO (3)</p>
              <div className="rounded border bg-card p-2 shadow-2xs space-y-1">
                <p className="font-medium text-foreground text-[11px]">SF-401 Fix Navbar gap</p>
                <span className="text-[10px] text-amber-600 font-semibold">High</span>
              </div>
            </div>

            <div className="rounded-lg border border-border/60 bg-muted/40 p-2.5 space-y-2">
              <p className="text-[11px] font-semibold text-muted-foreground">IN PROGRESS (2)</p>
              <div className="rounded border border-primary/40 bg-card p-2 shadow-2xs space-y-1">
                <p className="font-medium text-foreground text-[11px]">SF-402 Stripe Webhook</p>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-primary font-medium">3/4 Subtasks</span>
                  <span className="size-2 rounded-full bg-primary" />
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border/60 bg-muted/40 p-2.5 space-y-2">
              <p className="text-[11px] font-semibold text-muted-foreground">DONE (5)</p>
              <div className="rounded border bg-card p-2 shadow-2xs space-y-1 opacity-75">
                <p className="font-medium line-through text-muted-foreground text-[11px]">SF-398 Zod validation</p>
                <span className="text-[10px] text-emerald-600 font-semibold">Closed</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  };

  const active = roles[selectedRole];

  return (
    <section className="border-b bg-card/40 py-24">
      <div className="mx-auto max-w-7xl px-5">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <Lock className="size-3.5" />
            <span>Role-Based Access Control (RBAC)</span>
          </div>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight sm:text-5xl">
            One platform. Three purpose-built workflows.
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            SprintFlow adapts to whoever is sitting in the driver’s seat. Select a role below to explore live dashboard capabilities.
          </p>
        </div>

        {/* Interactive Role Switcher Tabs */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex rounded-2xl border border-border/80 bg-background/80 p-1.5 shadow-xs backdrop-blur-md">
            {(["ADMIN", "MANAGER", "MEMBER"] as const).map((r) => {
              const isSelected = selectedRole === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setSelectedRole(r)}
                  className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all sm:px-7 sm:text-sm ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-sm scale-100"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {r === "ADMIN" && <Shield className="size-4" />}
                  {r === "MANAGER" && <SlidersHorizontal className="size-4" />}
                  {r === "MEMBER" && <KanbanSquare className="size-4" />}
                  <span>{r.charAt(0) + r.slice(1).toLowerCase()}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Interactive Showcase Panel */}
        <div className="mt-12 grid gap-10 rounded-3xl border border-border/80 bg-background p-6 shadow-sm sm:p-10 lg:grid-cols-[1.1fr_1.3fr] lg:items-center">
          {/* Left: Role Info & Features */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {active.pill}
              </span>
              <h3 className="font-heading text-2xl font-bold sm:text-3xl text-foreground">
                {active.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {active.tagline}
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 border-y border-border/60 py-4">
              {active.quickStats.map((st) => (
                <div key={st.label}>
                  <p className="text-[11px] text-muted-foreground">{st.label}</p>
                  <p className="mt-1 font-heading text-sm font-bold text-foreground">
                    {st.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Feature Bullets */}
            <ul className="space-y-2.5 pt-1">
              {active.features.map((feat) => (
                <li key={feat} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground">
                  <CheckCircle2 className="size-4 shrink-0 text-primary mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            {/* Action CTA with 1-click test link */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 transition-all"
              >
                <span>Launch {active.role} Demo Account</span>
                <ArrowRight className="size-3.5" />
              </Link>
              <span className="text-xs text-muted-foreground">
                Credentials: <code className="font-mono text-foreground font-semibold">{active.loginEmail}</code>
              </span>
            </div>
          </div>

          {/* Right: Realistic In-App Interface Simulator */}
          <div className="relative rounded-2xl border border-border/80 bg-card/60 p-5 shadow-inner">
            <div className="absolute -top-3 right-6 rounded-full border border-border/80 bg-background px-3 py-0.5 text-[10px] font-mono font-medium text-muted-foreground shadow-2xs">
              Live Mockup Preview
            </div>
            {active.mockup}
          </div>
        </div>
      </div>
    </section>
  );
}

