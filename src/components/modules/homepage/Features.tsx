import { AlertTriangle, BarChart3, CheckSquare, Layers } from "lucide-react";

export default function Features() {
  const items = [
    {
      icon: Layers,
      title: "Plan with context",
      body: "Keep sprint goals, ownership, and engineering capacity unified in one single high-clarity view.",
      tag: "Sprint Backlog",
    },
    {
      icon: CheckSquare,
      title: "Move work clearly",
      body: "Interactive drag-and-drop Kanban boards with subtasks checklists everyone understands.",
      tag: "Execution Flow",
    },
    {
      icon: AlertTriangle,
      title: "Spot blockers early",
      body: "Instant alerts on blocked pull requests, stalled tickets, and critical path dependencies.",
      tag: "Risk Shield",
    },
    {
      icon: BarChart3,
      title: "Learn as you go",
      body: "Interactive burndown analytics and velocity metrics to optimize every future iteration.",
      tag: "Continuous Retro",
    },
  ];

  return (
    <section
      id="features"
      className="border-b bg-background py-20 scroll-mt-16"
    >
      <div className="mx-auto max-w-7xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Engineered for High-Velocity Squads
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl text-foreground">
            Everything your team needs to ship on rhythm
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            Eliminate fragmented spreadsheets and bloated tools. Focus entirely
            on shipping value every 2 weeks.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="group relative rounded-2xl border border-border/80 bg-card p-6 shadow-2xs transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="size-5" />
                  </div>
                  <span className="font-mono text-xs font-semibold text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>

                <div className="mt-5 space-y-2">
                  <span className="rounded-md border border-border/60 bg-muted/50 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                    {item.tag}
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-foreground pt-1">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
