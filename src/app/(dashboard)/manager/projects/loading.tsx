export default function ManagerProjectsLoading() {
  return (
    <output aria-label="Loading projects" className="mx-auto max-w-7xl animate-pulse space-y-7">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="h-3 w-20 bg-muted" />
          <div className="h-8 w-40 bg-muted" />
        </div>
        <div className="h-10 w-32 bg-muted" />
      </div>
      <div className="flex gap-3">
        <div className="h-10 flex-1 bg-muted" />
        <div className="h-10 w-40 bg-muted" />
      </div>
      <div className="border bg-card">
        <div className="h-10 bg-muted/40" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div className="flex gap-4 border-t px-4 py-4" key={i}>
            <div className="h-4 flex-1 bg-muted" />
            <div className="h-4 w-32 bg-muted" />
            <div className="h-4 w-20 bg-muted" />
            <div className="h-4 w-16 bg-muted" />
            <div className="h-4 w-16 bg-muted" />
          </div>
        ))}
      </div>
    </output>
  );
}
