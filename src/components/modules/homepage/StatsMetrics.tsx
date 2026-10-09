export default function StatsMetrics() {
  const stats = [
    { label: "Active Project Workspaces", value: "2,400+" },
    { label: "Sprints Shipped Monthly", value: "18,500+" },
    { label: "Sprint Completion Rate", value: "99.4%" },
    { label: "Average Hours Saved / Team", value: "14 hrs" },
  ];

  return (
    <section className="border-b bg-primary text-primary-foreground py-16">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <p className="font-heading text-4xl font-extrabold sm:text-5xl tracking-tight">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm font-medium text-primary-foreground/80">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
