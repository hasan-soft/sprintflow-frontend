"use client";

import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  KanbanSquare,
  Milestone,
  RefreshCw,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ProjectCategories() {
  const [activeCategory, setActiveCategory] = useState("scrum");

  const categories = [
    {
      id: "scrum",
      name: "Scrum Sprints",
      icon: RefreshCw,
      badge: "Most Popular",
      cadence: "2-Week Iterations",
      storyPoints: "Story Point Estimation",
      description:
        "Structured timeboxes for high-velocity feature delivery. Ideal for cross-functional product and engineering teams.",
      columns: [
        "Backlog",
        "Sprint Committed",
        "In Progress",
        "Code Review",
        "Done",
      ],
      stats: {
        velocity: "42 SP / sprint",
        cycleTime: "3.2 days avg",
        releaseFrequency: "Bi-weekly",
      },
      highlight:
        "Includes automated velocity estimation and sprint retrospective summaries.",
    },
    {
      id: "kanban",
      name: "Continuous Kanban",
      icon: KanbanSquare,
      badge: "Lean Flow",
      cadence: "Continuous Flow",
      storyPoints: "WIP Limit Control",
      description:
        "Uncapped continuous delivery with explicit Work-In-Progress limits to eliminate bottlenecks and optimize throughput.",
      columns: ["Inbox", "Up Next", "Doing (Max 4)", "Testing", "Shipped"],
      stats: {
        velocity: "Continuous",
        cycleTime: "1.8 days avg",
        releaseFrequency: "On Demand",
      },
      highlight:
        "Visual WIP alarms prevent developers from taking on too many tasks at once.",
    },
    {
      id: "bugfix",
      name: "Bug Triage & Hotfix",
      icon: AlertCircle,
      badge: "Critical Response",
      cadence: "SLA-Driven",
      storyPoints: "Severity Matrices (P0-P3)",
      description:
        "Rapid response queue for customer bugs and production incidents with automated SLA escalation alerts.",
      columns: [
        "Reported",
        "Triaged",
        "Hotfix Staging",
        "Verifying",
        "Resolved",
      ],
      stats: {
        velocity: "Instant",
        cycleTime: "4.2 hrs avg",
        releaseFrequency: "Immediate",
      },
      highlight:
        "Guaranteed SLA timers and direct link with GitHub issue trackers.",
    },
    {
      id: "roadmap",
      name: "Product Roadmap",
      icon: Milestone,
      badge: "Strategic Vision",
      cadence: "Quarterly OKRs",
      storyPoints: "Epics & Initiatives",
      description:
        "High-level strategic alignment connecting daily sprint tasks directly with organizational quarterly milestones.",
      columns: [
        "Q1 Ideation",
        "Q2 Scheduled",
        "Engineering MVP",
        "Beta Rollout",
        "GA",
      ],
      stats: {
        velocity: "Executive",
        cycleTime: "Quarterly",
        releaseFrequency: "Milestone-based",
      },
      highlight:
        "Direct parent-child link between company OKRs and individual Kanban tickets.",
    },
    {
      id: "devops",
      name: "DevOps & CI/CD",
      icon: Terminal,
      badge: "Infrastructure",
      cadence: "Pipeline Triggered",
      storyPoints: "Change Failure Rate",
      description:
        "Infrastructure as code, migrations, and deployment checklist coordination for DevOps and platform teams.",
      columns: [
        "RFC Proposal",
        "Terraform Plan",
        "Staging Deploy",
        "Canary",
        "Production",
      ],
      stats: {
        velocity: "Automated",
        cycleTime: "45 mins",
        releaseFrequency: "Continuous",
      },
      highlight:
        "Full webhook integration with GitHub Actions, Vercel, and Docker registry.",
    },
  ];

  const current =
    categories.find((c) => c.id === activeCategory) || categories[0];
  const IconComponent = current.icon;

  return (
    <section className="border-b bg-card/30 py-20">
      <div className="mx-auto max-w-7xl px-5">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Agile Frameworks & Categories
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl text-foreground">
            Pre-configured templates for every engineering squad
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Whether your team runs strict 2-week Scrum sprints or continuous
            Kanban flows, SprintFlow has the right workflow pre-built.
          </p>
        </div>

        {/* Category Pills Navigation */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-sm scale-102"
                    : "border border-border/80 bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <CatIcon className="size-4" />
                <span>{cat.name}</span>
                {cat.badge && (
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[9px] font-medium ${
                      isSelected
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {cat.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Interactive Template Preview Box */}
        <div className="mt-10 rounded-2xl border border-border/80 bg-background p-6 shadow-sm sm:p-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            {/* Left: Template info */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <IconComponent className="size-5" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-foreground">
                    {current.name} Template
                  </h3>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{current.cadence}</span>
                    <span>•</span>
                    <span className="font-mono text-primary font-medium">
                      {current.storyPoints}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {current.description}
              </p>

              <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
                <p className="text-xs font-semibold text-foreground">
                  Template Benchmark:
                </p>
                <p className="mt-1 text-xs text-muted-foreground leading-normal">
                  {current.highlight}
                </p>
              </div>

              {/* Stat badges */}
              <div className="grid grid-cols-3 gap-3 pt-1 border-t border-border/60">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-medium">
                    Avg Throughput
                  </p>
                  <p className="font-heading text-sm font-bold text-foreground mt-0.5">
                    {current.stats.velocity}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-medium">
                    Cycle Time
                  </p>
                  <p className="font-heading text-sm font-bold text-primary mt-0.5">
                    {current.stats.cycleTime}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-medium">
                    Deploy Rate
                  </p>
                  <p className="font-heading text-sm font-bold text-foreground mt-0.5">
                    {current.stats.releaseFrequency}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground transition hover:bg-primary/90"
                >
                  <span>Launch With {current.name}</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>

            {/* Right: Realistic Pipeline Board Preview */}
            <div className="rounded-xl border border-border/80 bg-muted/40 p-5 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground">
                  Board Column Pipeline
                </span>
                <span className="text-[11px] font-mono text-muted-foreground">
                  5 Stage Flow
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {current.columns.map((col, idx) => (
                  <div
                    key={col}
                    className="flex flex-col rounded-lg border border-border/60 bg-card p-2 text-center"
                  >
                    <span className="text-[9px] font-mono text-muted-foreground">
                      0{idx + 1}
                    </span>
                    <span className="mt-1 text-[11px] font-semibold text-foreground truncate">
                      {col}
                    </span>
                    <div className="mt-2.5 h-1 w-full rounded-full bg-primary/20">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${Math.min(100, (idx + 1) * 20)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="size-4 shrink-0" />
                <span>
                  Ready to use out-of-the-box. Customizable columns, tags, and
                  story weights.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
