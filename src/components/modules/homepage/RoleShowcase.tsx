import { Briefcase, Shield, UserCheck } from "lucide-react";
import Link from "next/link";

export default function RoleShowcase() {
  const roles = [
    {
      role: "ADMIN",
      badge: "Workspace Owner",
      title: "Executive Oversight & Governance",
      icon: Shield,
      color: "border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400",
      buttonColor: "bg-emerald-600 hover:bg-emerald-700 text-white",
      description:
        "Full control over team organizations, user roles, Stripe subscriptions, billing cycles, and complete workspace audit logs.",
      features: [
        "Organization-wide Analytics & Charts",
        "User Role Management (Admin, Manager, Member)",
        "Stripe Test Mode Invoicing & Subscriptions",
        "System-wide Audit Activity Log Inspection",
      ],
      link: "/admin",
    },
    {
      role: "MANAGER",
      badge: "Project Lead",
      title: "Sprint Planning & Resource Health",
      icon: Briefcase,
      color: "border-sky-500/30 bg-sky-500/5 text-sky-600 dark:text-sky-400",
      buttonColor: "bg-sky-600 hover:bg-sky-700 text-white",
      description:
        "Designed for Engineering Leads and Product Managers to define project timelines, manage budgets, and launch sprints.",
      features: [
        "Multi-step Project Creation Wizard",
        "Live Sprint Backlog & Iteration Launching",
        "Project Budget & Resource Allocation Tracking",
        "Status Filtering & URL State Synchronized Search",
      ],
      link: "/manager",
    },
    {
      role: "MEMBER",
      badge: "Contributor",
      title: "Focused Execution & Task Flow",
      icon: UserCheck,
      color: "border-amber-500/30 bg-amber-500/5 text-amber-600 dark:text-amber-400",
      buttonColor: "bg-amber-600 hover:bg-amber-700 text-white",
      description:
        "A distraction-free environment for developers, designers, and contributors to move tickets and document progress.",
      features: [
        "Drag & Drop Kanban Task Board (dnd-kit)",
        "Subtasks Checklists & Task Modal Updates",
        "Personal Activity Log & Milestone Feed",
        "Profile & Workspace Availability Settings",
      ],
      link: "/member",
    },
  ];

  return (
    <section className="border-b bg-card py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            3 Distinct Workflows
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">
            Tailored specifically for every seat at the table
          </h2>
          <p className="mt-3 text-muted-foreground">
            No one-size-fits-all clutter. SprintFlow renders distinct, role-based interfaces with server-side security.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {roles.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.role}
                className="flex flex-col justify-between rounded-2xl border border-border/80 bg-background p-6 shadow-xs hover:border-primary/50 hover:shadow-md transition-all"
              >
                <div>
                  <div className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${r.color}`}>
                    <Icon className="size-3.5" />
                    <span>{r.badge}</span>
                  </div>
                  <h3 className="mt-4 font-heading text-xl font-bold">{r.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {r.description}
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t pt-5">
                    {r.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-xs text-foreground/90">
                        <span className="size-1.5 rounded-full bg-primary shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 border-t pt-5">
                  <Link
                    href="/login"
                    className={`block w-full text-center rounded-lg py-2.5 text-xs font-semibold shadow-xs transition ${r.buttonColor}`}
                  >
                    Demo Login as {r.badge}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
