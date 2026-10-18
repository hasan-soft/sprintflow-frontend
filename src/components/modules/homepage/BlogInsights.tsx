"use client";

import { ArrowUpRight, BookOpen, Clock, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function BlogInsights() {
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  const articles = [
    {
      title:
        "Mastering the 2-Week Sprint Cadence: Why 14 Days Outperforms 30-Day Cycles",
      excerpt:
        "Longer sprints accumulate invisible scope creep and delayed testing. Discover how modern teams structure 14-day iterations for predictable releases.",
      author: "Alex Rivera",
      authorRole: "Head of Engineering",
      readTime: "5 min read",
      date: "Oct 12, 2026",
      tag: "Agile Practices",
      content:
        "The traditional 30-day sprint cycle originated in an era before continuous integration, automated canary deployments, and serverless architectures. Today, the most resilient engineering organizations default to two-week or even one-week sprints. The shorter horizon forces ruthlessly clear story sizing, eliminates monolithic pull requests, and allows project leads to pivot rapidly based on authentic user usage metrics rather than speculative quarterly estimates.",
    },
    {
      title:
        "Preventing Developer Burnout: The Science of Work-In-Progress (WIP) Limits",
      excerpt:
        "Context switching degrades engineering cognitive bandwidth. How capping WIP per developer accelerates throughput by 42%.",
      author: "Maya Chen",
      authorRole: "Agile Coach & Org Psychologist",
      readTime: "7 min read",
      date: "Oct 04, 2026",
      tag: "Team Health",
      content:
        "When developers juggle more than two active tickets, the cognitive cost of context switching increases non-linearly. By establishing hard WIP limits—never allowing an individual engineer to claim more than one In-Progress ticket simultaneously—pull request review turnaround drops from days to hours, merge conflicts vanish, and overall squad satisfaction climbs dramatically.",
    },
    {
      title:
        "Scrum vs Kanban in 2026: Designing the Ultimate Hybrid Agile Workflow",
      excerpt:
        "You don't have to choose between strict timeboxes and fluid backlogs. Learn how top tech companies blend both frameworks.",
      author: "Daniel Vance",
      authorRole: "Principal Systems Architect",
      readTime: "6 min read",
      date: "Sep 28, 2026",
      tag: "Workflow Architecture",
      content:
        "The dogmatic debate between pure Scrum and pure Kanban is outdated. High-velocity engineering teams in 2026 practice Scrumban: two-week committed milestones for cross-functional product initiatives, paired with continuous Kanban swimlanes for immediate bug triage, DevOps hotfixes, and unexpected security patches.",
    },
  ];

  return (
    <section className="border-b bg-background py-20">
      <div className="mx-auto max-w-7xl px-5">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Engineering Leadership & Agile Research
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl text-foreground">
              Latest insights from the sprint trenches
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              Field-tested strategies for sprint velocity, team morale, and
              friction-free delivery.
            </p>
          </div>

          <Link
            href="/features"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline self-start md:self-auto"
          >
            <span>Explore all resources</span>
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        {/* Blog Articles Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {articles.map((art, idx) => (
            <article
              key={art.title}
              className="flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-2xs transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                    {art.tag}
                  </span>
                  <div className="flex items-center gap-1 text-[11px]">
                    <Clock className="size-3" />
                    <span>{art.readTime}</span>
                  </div>
                </div>

                <h3 className="font-heading text-lg font-bold text-foreground leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {art.excerpt}
                </p>
              </div>

              <div className="mt-6 border-t border-border/60 pt-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    {art.author}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {art.authorRole}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedArticle(idx)}
                  className="flex items-center gap-1 rounded-lg border border-border/70 bg-muted/40 px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition cursor-pointer"
                >
                  <BookOpen className="size-3" />
                  <span>Read</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Interactive Article Modal Reader */}
        {selectedArticle !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl sm:p-8">
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-muted text-foreground hover:bg-muted/80 transition"
                aria-label="Close modal"
              >
                <X className="size-4" />
              </button>

              <div className="space-y-4">
                <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {articles[selectedArticle].tag}
                </span>

                <h3 className="font-heading text-2xl font-bold sm:text-3xl text-foreground">
                  {articles[selectedArticle].title}
                </h3>

                <div className="flex items-center gap-3 text-xs text-muted-foreground border-b border-border/60 pb-3">
                  <span className="font-semibold text-foreground">
                    By {articles[selectedArticle].author}
                  </span>
                  <span>·</span>
                  <span>{articles[selectedArticle].readTime}</span>
                  <span>·</span>
                  <span>{articles[selectedArticle].date}</span>
                </div>

                <div className="prose prose-sm dark:prose-invert text-muted-foreground leading-relaxed pt-2">
                  <p>{articles[selectedArticle].content}</p>
                  <p className="mt-4">
                    Ready to implement these agile workflows in your engineering
                    team? SprintFlow gives you out-of-the-box support for strict
                    WIP enforcement, two-week sprint cadences, and continuous
                    retro analytics.
                  </p>
                </div>

                <div className="mt-6 flex justify-end gap-3 border-t border-border/60 pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedArticle(null)}
                    className="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted transition"
                  >
                    Close
                  </button>
                  <Link
                    href="/register"
                    className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition"
                  >
                    Try in SprintFlow Free
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
