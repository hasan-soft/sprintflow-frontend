import Link from "next/link";

export default function Hero() {
  return (
    <section className="border-b bg-[linear-gradient(115deg,oklch(0.97_0.025_190)_0%,var(--background)_52%,oklch(0.96_0.035_80)_100%)]">
      <div className="mx-auto grid min-h-135 max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
            Projects, in rhythm
          </p>
          <h1 className="mt-5 font-heading text-5xl font-semibold leading-[1.08] sm:text-6xl">
            Make the next sprint your best one.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground">
            A calmer place to plan work, see what is moving, and give every team
            a clear next step.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              href="/register"
            >
              Start your workspace
            </Link>
            <Link
              className="rounded-md border bg-background px-5 py-3 text-sm font-semibold transition hover:bg-muted"
              href="/features"
            >
              Explore the workflow
            </Link>
          </div>
        </div>

        {/* Dynamic Card Widget */}
        <div className="relative rounded-xl border bg-card p-5 shadow-sm sm:p-7">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <p className="text-xs text-muted-foreground">
                MONDAY · SPRINT 24
              </p>
              <h2 className="mt-1 font-semibold">Product launch</h2>
            </div>
            <span className="rounded-full border px-2.5 py-1 text-xs">
              8 days left
            </span>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { title: "To do", count: "12" },
              { title: "In progress", count: "8" },
              { title: "Review", count: "4" },
            ].map((column) => (
              <div
                className="rounded-lg bg-muted/60 p-3 text-center sm:text-left"
                key={column.title}
              >
                <p className="text-xs text-muted-foreground">{column.title}</p>
                <p className="mt-2 font-heading text-2xl font-semibold">
                  {column.count}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-3">
            {[
              {
                code: "SF-284",
                task: "Polish onboarding checklist",
                color: "bg-emerald-500",
              },
              {
                code: "SF-291",
                task: "Review mobile empty states",
                color: "bg-amber-500",
              },
              {
                code: "SF-301",
                task: "Document analytics events",
                color: "bg-sky-600",
              },
            ].map((task) => (
              <div
                className="flex items-center gap-3 rounded-md border bg-background px-3 py-3"
                key={task.code}
              >
                <span
                  className={`size-2 shrink-0 rounded-full ${task.color}`}
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{task.task}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {task.code} · Product team
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
            <span>Team progress</span>
            <span className="font-medium text-foreground">74%</span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full w-3/4 bg-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}
