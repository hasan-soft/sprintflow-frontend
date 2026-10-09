"use client";

import { useState } from "react";
import { CheckCircle2, ChevronRight, Layers, Sparkles, Target, Zap } from "lucide-react";

export default function WorkflowInteractive() {
  const [activeTab, setActiveTab] = useState(0);

  const workflows = [
    {
      title: "1. Backlog Grooming & Sprints",
      icon: Target,
      tag: "Planning",
      headline: "Transform chaotic ideas into structured sprint backlogs",
      description:
        "Score priority, assign story points, estimate engineering capacity, and assemble balanced 2-week iterations in minutes.",
      points: [
        "Kanban & Scrum agile boards with drag-and-drop",
        "Capacity vs velocity visual indicators",
        "Sprint goal tracking and commitment indicators",
      ],
      previewBadge: "Active Sprint 24",
      stat: "94% on-time sprint velocity",
    },
    {
      title: "2. Real-time Task Execution",
      icon: Zap,
      tag: "Execution",
      headline: "Frictionless delivery for engineers and designers",
      description:
        "Custom status columns, subtasks breakdown, real-time activity stream, and instant blocker alerts give total clarity.",
      points: [
        "Granular task breakdown with subtasks checklists",
        "Role-tailored dashboard views for Admins, Managers, and Members",
        "Optimistic status updates with zero lag",
      ],
      previewBadge: "Live Board",
      stat: "3.2x faster task handoffs",
    },
    {
      title: "3. Delivery Health & Financials",
      icon: Layers,
      tag: "Analytics",
      headline: "Know your project health and budget before deadlines hit",
      description:
        "Automated burn-down calculations, project budget tracking, and role-based performance metrics in crisp interactive charts.",
      points: [
        "Interactive Recharts analytics on project completion",
        "Real-time budget utilization vs allocated limits",
        "Exportable audit logs and activity histories",
      ],
      previewBadge: "Analytics Engine",
      stat: "100% budget transparency",
    },
  ];

  const current = workflows[activeTab];
  const Icon = current.icon;

  return (
    <section className="border-b bg-muted/20 py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            How SprintFlow Works
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">
            A continuous loop from backlog to delivery
          </h2>
          <p className="mt-3 text-muted-foreground">
            Eliminate fragmented tools. Bring planning, execution, and visibility into one single platform.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {workflows.map((wf, idx) => (
            <button
              key={wf.title}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                activeTab === idx
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card border border-border/70 text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              <span>{wf.title}</span>
              {activeTab === idx && <ChevronRight className="size-4" />}
            </button>
          ))}
        </div>

        {/* Tab Detail Card */}
        <div className="mt-10 grid gap-8 rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:p-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Icon className="size-3.5" />
              <span>{current.tag} Stage</span>
            </div>
            <h3 className="font-heading text-2xl font-bold sm:text-3xl">
              {current.headline}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {current.description}
            </p>
            <ul className="space-y-3 pt-2">
              {current.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2.5 text-sm text-foreground">
                  <CheckCircle2 className="size-4.5 shrink-0 text-primary mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border/60 bg-muted/30 p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3 text-xs">
              <span className="font-mono text-muted-foreground">{current.previewBadge}</span>
              <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                <Sparkles className="size-3.5" />
                Live Sync
              </span>
            </div>
            <div className="space-y-3">
              <div className="rounded-lg border bg-card p-4">
                <p className="text-xs text-muted-foreground">Measured Impact</p>
                <p className="mt-1 font-heading text-xl font-bold text-primary">
                  {current.stat}
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-medium">Sprint Goal Alignment</span>
                  <span className="text-muted-foreground">100%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary rounded-full w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
