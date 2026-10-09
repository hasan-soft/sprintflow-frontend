export default function ManagerSprintsLoading() {
  return (
    <output aria-label="Loading sprints" className="mx-auto max-w-7xl animate-pulse space-y-6">
      <div className="h-10 w-36 bg-muted" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div className="h-40 border bg-muted" key={i} />
        ))}
      </div>
    </output>
  );
}
