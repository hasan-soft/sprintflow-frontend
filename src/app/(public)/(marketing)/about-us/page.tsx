import type { Metadata } from "next";
import { CheckCircle2, ShieldCheck, Target, Users, Zap } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about SprintFlow and our mission to bring project planning, team capacity, and everyday delivery into one focused workspace.",
  openGraph: {
    title: "About Us | SprintFlow",
    description:
      "Learn about SprintFlow and our mission to bring project planning, team capacity, and everyday delivery into one focused workspace.",
    url: "/about-us",
  },
};

const pillars = [
  {
    icon: Target,
    title: "Velocity Through Clarity",
    description:
      "Engineering teams execute faster when sprint priorities, dependencies, and owners are unmistakable. We eliminate unnecessary ceremony in favor of immediate visual clarity.",
  },
  {
    icon: Zap,
    title: "Optimistic, Frictionless Execution",
    description:
      "Every drag, drop, comment, and status update reflects instantly on the client while syncing robustly with PostgreSQL in the background. Software should never hold you back.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Governance, Accessible UX",
    description:
      "Granular role-based access control (Admin, Manager, Member) ensures safety, subscription oversight, and auditability without bogging down everyday contributors.",
  },
];

const team = [
  {
    name: "Hasan Bhuiyan",
    role: "Lead Fullstack Architect",
    bio: "Fullstack engineer specializing in Next.js, distributed REST architectures, and high-performance interactive Kanban workflows.",
    badge: "Engineering",
  },
  {
    name: "Elena Rostova",
    role: "Head of Product Experience",
    bio: "Design systems specialist focused on WCAG AAA accessibility, cognitive load reduction, and developer productivity tooling.",
    badge: "Design & UX",
  },
  {
    name: "Marcus Vance",
    role: "DevOps & Cloud Reliability",
    bio: "Infrastructure engineer dedicated to automated CI/CD pipelines, database query optimization, and resilient payment gateway integrations.",
    badge: "Infrastructure",
  },
];

export default function AboutUsPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-16 sm:py-24 space-y-20">
      {/* Hero Section */}
      <section className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Our Mission & Story
        </p>
        <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
          Good work deserves a clear path forward.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          SprintFlow was engineered to solve modern agile friction. While legacy project tools
          accumulated bloated menus and slow page loads, engineering squads struggled to simply understand
          what needed shipping next. We built SprintFlow to unify sprint capacity, interactive task execution,
          and transparent subscription health in one focused workspace.
        </p>
      </section>

      {/* Core Engineering Pillars */}
      <section className="space-y-6">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground">
            What drives our engineering
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Three principles behind every component, API route, and interaction in SprintFlow.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <article
                className="rounded-xl border border-border/80 bg-card p-6 shadow-xs transition hover:border-primary/50 hover:shadow-sm"
                key={pillar.title}
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {pillar.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Team Leadership */}
      <section className="space-y-6">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Leadership & Craft
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            The team continuously refining SprintFlow for high-performance engineering organizations.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {team.map((member) => (
            <article
              className="rounded-xl border border-border/80 bg-card p-6 shadow-xs transition hover:border-primary/50 hover:shadow-sm"
              key={member.name}
            >
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-full bg-primary/15 font-heading text-sm font-bold text-primary">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                  {member.badge}
                </span>
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                {member.name}
              </h3>
              <p className="text-xs font-medium text-primary">
                {member.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {member.bio}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Bottom CTA Card */}
      <section className="rounded-2xl border border-border/80 bg-card p-8 sm:p-12 text-center shadow-xs space-y-5">
        <h2 className="font-heading text-2xl font-bold sm:text-3xl text-foreground">
          Ready to bring rhythm to your development sprints?
        </h2>
        <p className="mx-auto max-w-xl text-sm text-muted-foreground leading-relaxed">
          Test all three organizational roles with one-click evaluation logins or register a new workspace for your engineering squad today.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 transition"
          >
            <span>Get Started Free</span>
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-background px-6 py-3 text-sm font-semibold text-foreground hover:bg-accent transition"
          >
            <span>Launch Demo Account</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
