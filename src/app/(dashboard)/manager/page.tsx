import Link from "next/link";

const projects = [
  { name: "Mobile app refresh", team: "Mobile", progress: 72, due: "Oct 24" },
  {
    name: "Customer onboarding",
    team: "Platform",
    progress: 48,
    due: "Nov 02",
  },
  { name: "Usage analytics", team: "Product", progress: 86, due: "Oct 18" },
];

export default function ManagerOverviewPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary">Team workspace</p>
          <h1 className="mt-1 font-heading text-3xl font-semibold">
            Project pulse
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your teams have 14 active tasks across 3 projects.
          </p>
        </div>
        <Link
          className="bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          href="/manager/projects/new"
        >
          New project
        </Link>
      </header>
      <section className="grid gap-px border bg-border sm:grid-cols-3">
        {[
          { label: "Active projects", value: "3", caption: "All teams" },
          {
            label: "Sprint completion",
            value: "78%",
            caption: "Current sprint",
          },
          {
            label: "Budget remaining",
            value: "$32,600",
            caption: "Across all projects",
          },
        ].map((metric) => (
          <div className="bg-card p-5" key={metric.label}>
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            <p className="mt-3 font-heading text-3xl font-semibold">
              {metric.value}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              {metric.caption}
            </p>
          </div>
        ))}
      </section>
      <section className="border bg-card">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <h2 className="font-semibold">Projects in motion</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Current delivery health by team.
            </p>
          </div>
          <Link
            className="text-sm font-medium underline underline-offset-4"
            href="/manager/projects"
          >
            All projects
          </Link>
        </div>
        <div className="divide-y">
          {projects.map((project) => (
            <div
              className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_110px_1fr_80px] sm:items-center"
              key={project.name}
            >
              <div>
                <p className="font-medium">{project.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {project.team} team
                </p>
              </div>
              <span className="text-sm">{project.progress}%</span>
              <div className="h-1.5 bg-muted">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground">
                {project.due}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
