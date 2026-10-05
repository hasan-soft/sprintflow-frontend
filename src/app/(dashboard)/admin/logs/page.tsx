export default function AdminLogsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <header>
        <p className="text-sm font-semibold text-primary">Administration</p>
        <h1 className="mt-1 font-heading text-3xl font-semibold">
          Activity logs
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Recent changes made across this workspace.
        </p>
      </header>
      <section className="border border-dashed bg-card px-6 py-16 text-center">
        <h2 className="font-semibold">No event feed is available</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
          The deployed backend provides aggregate activity counts but no
          activity-log listing endpoint, so there are no records to display
          here.
        </p>
      </section>
    </div>
  );
}
