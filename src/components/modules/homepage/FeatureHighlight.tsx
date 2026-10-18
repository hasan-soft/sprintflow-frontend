"use client";

import { ArrowRight, Bot, CheckCircle, Lightbulb, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function FeatureHighlight() {
  const [simulationRisk, setSimulationRisk] = useState<
    "low" | "medium" | "critical"
  >("low");

  const riskLevels = {
    low: {
      label: "Optimal Cadence",
      color: "emerald",
      confidence: "99.2%",
      blockers: 0,
      forecast: "Sprint finish estimated 1.5 days ahead of schedule.",
      aiAction: "No action required. Engineering momentum is ideal.",
      prHealth: "100% clean reviews",
      burnRate: "Balanced burndown curve",
    },
    medium: {
      label: "Caution: PR Latency",
      color: "amber",
      confidence: "84.5%",
      blockers: 2,
      forecast: "Sprint finish at risk of missing Friday 5 PM release cutoff.",
      aiAction: "Auto-ping assigned reviewers for SF-298 and SF-304.",
      prHealth: "2 PRs pending > 24 hours",
      burnRate: "Slight burndown flattening",
    },
    critical: {
      label: "Critical Blocker Alert",
      color: "destructive",
      confidence: "61.8%",
      blockers: 4,
      forecast:
        "Stalled upstream database migration blocking 3 client tickets.",
      aiAction:
        "Emergency reallocation: Shift 2 senior engineers to backend unblock.",
      prHealth: "Merge conflict blocking deployment",
      burnRate: "Burndown stalled for 48 hrs",
    },
  };

  const current = riskLevels[simulationRisk];

  return (
    <section className="border-b bg-muted/15 py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: Text & Value proposition */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
              <Bot className="size-4" />
              <span>SprintFlow Intelligence Spotlight</span>
            </div>

            <h2 className="font-heading text-3xl font-bold sm:text-4xl lg:text-5xl text-foreground leading-[1.15]">
              Predict blockers before they derail your sprint demo.
            </h2>

            <p className="text-base text-muted-foreground leading-relaxed">
              SprintFlow continuously audits git commit intervals, PR review
              turnarounds, and subtask checklists. When velocity slows down, you
              get actionable recommendations—not just panic in Friday standup.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-sm">
                <CheckCircle className="size-5 shrink-0 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">
                    Continuous Burndown Projection
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Real-time linear progression vs actual completed story
                    points.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <CheckCircle className="size-5 shrink-0 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">
                    Automated PR Latency Warnings
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Notifies team leads when code reviews sit idle for more than
                    18 hours.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <CheckCircle className="size-5 shrink-0 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">
                    Capacity Rebalance Suggestions
                  </p>
                  <p className="text-xs text-muted-foreground">
                    1-click reassignment when an engineer is overloaded beyond
                    100% capacity.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <Link
                href="/features"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all"
              >
                <span>Explore AI Features</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/about-us"
                className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                Learn our philosophy →
              </Link>
            </div>
          </div>

          {/* Right: Interactive Simulator Card */}
          <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-md sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Interactive Simulator
                </p>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Sprint Risk Radar Live Test
                </h3>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                <Zap className="size-3" />
                <span>Simulate Scenario</span>
              </div>
            </div>

            {/* Scenario Toggles */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-foreground">
                Select simulated squad condition:
              </p>
              <div className="grid grid-cols-3 gap-2">
                {(["low", "medium", "critical"] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSimulationRisk(lvl)}
                    className={`rounded-xl border p-2 text-center text-xs font-bold transition-all cursor-pointer ${
                      simulationRisk === lvl
                        ? lvl === "low"
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-2xs"
                          : lvl === "medium"
                            ? "border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 shadow-2xs"
                            : "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400 shadow-2xs"
                        : "border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {lvl.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Status Output Box */}
            <div className="rounded-xl border border-border/70 bg-background p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`size-3 rounded-full ${
                      simulationRisk === "low"
                        ? "bg-emerald-500"
                        : simulationRisk === "medium"
                          ? "bg-amber-500 animate-pulse"
                          : "bg-red-500 animate-ping"
                    }`}
                  />
                  <span className="font-semibold text-sm text-foreground">
                    {current.label}
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-primary">
                  {current.confidence} Confidence
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg bg-muted/50 p-2.5">
                  <p className="text-[10px] text-muted-foreground">
                    Active Blockers
                  </p>
                  <p className="font-heading text-lg font-bold text-foreground">
                    {current.blockers} Tickets
                  </p>
                </div>
                <div className="rounded-lg bg-muted/50 p-2.5">
                  <p className="text-[10px] text-muted-foreground">
                    PR Review Turnaround
                  </p>
                  <p className="font-heading text-xs font-bold text-foreground mt-1 truncate">
                    {current.prHealth}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                  <Lightbulb className="size-3.5" />
                  <span>AI Recommended Action:</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {current.aiAction}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
              <span>Forecast Engine: v2.4</span>
              <span className="font-medium text-foreground">
                Calibrated on 18,500+ past sprints
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
