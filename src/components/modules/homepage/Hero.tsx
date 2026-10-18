"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Flame,
  KanbanSquare,
  PlayCircle,
  ShieldAlert,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [capacity, setCapacity] = useState(42);
  const [tasks, setTasks] = useState([
    {
      id: "SF-284",
      title: "Polish onboarding checklist",
      tag: "Frontend",
      done: true,
    },
    {
      id: "SF-291",
      title: "Review mobile empty states",
      tag: "Design",
      done: false,
    },
    {
      id: "SF-301",
      title: "Document analytics events",
      tag: "Analytics",
      done: false,
    },
  ]);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  };

  const slides = [
    {
      id: "board",
      badge: "Sprint 24 · Active",
      title: "Interactive Kanban Board",
      icon: KanbanSquare,
    },
    {
      id: "velocity",
      badge: "Capacity Predictor",
      title: "Interactive Velocity Slider",
      icon: Flame,
    },
    {
      id: "radar",
      badge: "AI Risk Radar",
      title: "Automated Blocker Shield",
      icon: ShieldAlert,
    },
  ];

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative flex min-h-[60vh] max-h-[75vh] md:h-[68vh] md:min-h-[580px] md:max-h-[70vh] flex-col justify-between border-b border-border/70 bg-[linear-gradient(115deg,oklch(0.97_0.025_190)_0%,var(--background)_52%,oklch(0.96_0.035_80)_100%)] overflow-hidden">
      {/* Decorative subtle backdrop elements */}
      <div className="pointer-events-none absolute -top-24 -left-24 size-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 size-80 rounded-full bg-amber-500/10 blur-3xl" />

      {/* Main Hero Container */}
      <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-8 px-5 py-6 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8">
        {/* Left Column: Headlines & Call to Actions */}
        <div className="max-w-xl space-y-4 sm:space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <span>SprintFlow 2.0 · Real-time Agile Delivery</span>
          </div>

          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl leading-[1.12]">
            Make every sprint your{" "}
            <span className="bg-linear-to-r from-primary via-primary/90 to-amber-600 bg-clip-text text-transparent">
              fastest & calmest one.
            </span>
          </h1>

          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            A unified workspace to plan backlogs, visualize velocity, and guide
            engineering squads to predictable sprint delivery with zero noise.
          </p>

          {/* Interactive CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary/90 active:scale-95 sm:px-6 sm:py-3 sm:text-sm"
            >
              <span>Start Free Workspace</span>
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/features"
              className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-background/80 px-4 py-2.5 text-xs font-semibold text-foreground backdrop-blur-sm transition hover:bg-muted active:scale-95 sm:px-5 sm:py-3 sm:text-sm"
            >
              <PlayCircle className="size-4 text-primary" />
              <span>Explore Workflow</span>
            </Link>
          </div>

          {/* Micro trust indicator */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1 font-medium text-foreground">
              <Zap className="size-3.5 text-amber-500 fill-amber-500" />
              Instant 1-Click Demo Login
            </span>
            <span>·</span>
            <span>No credit card required</span>
          </div>
        </div>

        {/* Right Column: Interactive Sprint Simulator Widget with Slider */}
        <div className="relative rounded-2xl border border-border/80 bg-card/90 p-4 shadow-xl backdrop-blur-md sm:p-5">
          {/* Header Bar of Interactive Widget */}
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div className="flex items-center gap-2">
              {slides.map((s, idx) => {
                const IconComponent = s.icon;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition cursor-pointer ${
                      activeSlide === idx
                        ? "bg-primary text-primary-foreground shadow-2xs font-semibold"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <IconComponent className="size-3.5" />
                    <span className="hidden sm:inline">
                      {s.title.split(" ")[1]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Slider Next / Prev Controls */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrev}
                className="flex size-7 items-center justify-center rounded-md border border-border/60 bg-background text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex size-7 items-center justify-center rounded-md border border-border/60 bg-background text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          </div>

          {/* Slide Content Area with AnimatePresence */}
          <div className="min-h-[220px] sm:min-h-[240px] pt-3">
            <AnimatePresence mode="wait">
              {activeSlide === 0 && (
                <motion.div
                  key="slide-0"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-foreground">
                        Sprint 24 · Core Web Platform
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Click tickets to toggle completion
                      </p>
                    </div>
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      4 days left
                    </span>
                  </div>

                  {/* Dynamic Column Metrics */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-lg bg-muted/60 p-2 text-center">
                      <p className="text-[10px] uppercase text-muted-foreground">
                        To Do
                      </p>
                      <p className="font-heading text-lg font-bold text-foreground">
                        12
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted/60 p-2 text-center">
                      <p className="text-[10px] uppercase text-muted-foreground">
                        In Flight
                      </p>
                      <p className="font-heading text-lg font-bold text-primary">
                        8
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted/60 p-2 text-center">
                      <p className="text-[10px] uppercase text-muted-foreground">
                        Done
                      </p>
                      <p className="font-heading text-lg font-bold text-emerald-600">
                        {14 + tasks.filter((t) => t.done).length}
                      </p>
                    </div>
                  </div>

                  {/* Interactive Tasks Checklist */}
                  <div className="space-y-2">
                    {tasks.map((task) => (
                      <button
                        type="button"
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className={`flex w-full items-center justify-between rounded-lg border p-2 text-left text-xs transition cursor-pointer ${
                          task.done
                            ? "border-emerald-500/40 bg-emerald-500/5 text-muted-foreground line-through"
                            : "border-border/80 bg-background hover:border-primary/50 text-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`size-2 shrink-0 rounded-full ${
                              task.done ? "bg-emerald-500" : "bg-primary"
                            }`}
                          />
                          <span className="font-medium truncate max-w-[200px] sm:max-w-xs">
                            {task.title}
                          </span>
                        </div>
                        <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono">
                          {task.id}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeSlide === 1 && (
                <motion.div
                  key="slide-1"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-foreground">
                        Interactive Capacity Planner
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Drag slider to adjust squad story points
                      </p>
                    </div>
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                      {capacity} Story Points
                    </span>
                  </div>

                  {/* Interactive Range Slider */}
                  <div className="space-y-2 rounded-xl border border-border/70 bg-muted/30 p-3">
                    <div className="flex justify-between text-xs font-medium">
                      <span>Sprint Velocity Target</span>
                      <span className="font-mono text-primary font-bold">
                        {capacity} SP
                      </span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="75"
                      value={capacity}
                      onChange={(e) => setCapacity(Number(e.target.value))}
                      className="w-full accent-primary cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground">
                      <span>15 SP (Light)</span>
                      <span>45 SP (Standard)</span>
                      <span>75 SP (Hyper-speed)</span>
                    </div>
                  </div>

                  {/* Calculated metrics based on slider */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-lg border bg-card p-2.5">
                      <p className="text-[10px] text-muted-foreground uppercase">
                        Estimated Days
                      </p>
                      <p className="mt-1 font-heading text-lg font-bold text-foreground">
                        {Math.max(4, Math.round(capacity / 4.5))} Days
                      </p>
                    </div>
                    <div className="rounded-lg border bg-card p-2.5">
                      <p className="text-[10px] text-muted-foreground uppercase">
                        Delivery Confidence
                      </p>
                      <p className="mt-1 font-heading text-lg font-bold text-emerald-600">
                        {capacity > 60 ? "82% (High Load)" : "98% (Optimal)"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSlide === 2 && (
                <motion.div
                  key="slide-2"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-foreground">
                        AI Blocker Prevention Shield
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Continuous monitoring across PRs & tasks
                      </p>
                    </div>
                    <span className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      <Sparkles className="size-3" />
                      Zero Blockers
                    </span>
                  </div>

                  <div className="rounded-xl border border-border/80 bg-background p-3 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-foreground">
                        Pull Request Health
                      </span>
                      <span className="text-emerald-600 font-semibold text-[11px]">
                        All clear (12 merged)
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full w-full" />
                    </div>
                  </div>

                  <div className="rounded-xl border border-border/80 bg-background p-3 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-foreground">
                        Dependency Risk Analysis
                      </span>
                      <span className="text-primary font-semibold text-[11px]">
                        Low Risk
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary rounded-full w-[85%]" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-muted/40 p-2 text-xs">
                    <span className="text-muted-foreground text-[11px]">
                      AI Recommendations:
                    </span>
                    <span className="font-medium text-foreground text-[11px]">
                      Squad on track for Friday release
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Slider Pagination Dots */}
          <div className="flex items-center justify-center gap-1.5 border-t border-border/60 pt-2.5">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  activeSlide === idx
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Clear Visual Flow to Next Section: Animated Downward Connector */}
      <div className="relative flex w-full items-center justify-center pb-2">
        <a
          href="#social-proof"
          className="group flex flex-col items-center gap-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          aria-label="Scroll to next section"
        >
          <span>Explore sprint flow</span>
          <ChevronDown className="size-4 animate-bounce text-primary group-hover:translate-y-0.5 transition-transform" />
        </a>
      </div>
    </section>
  );
}
