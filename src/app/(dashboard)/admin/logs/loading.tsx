export default function AdminLogsLoading() {
  return (
    <output aria-label="Loading activity logs" className="mx-auto max-w-5xl animate-pulse space-y-6">
      <div className="h-10 w-52 bg-muted" />
      <div className="space-y-px border bg-card">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div className="flex items-start gap-4 px-4 py-3" key={i}>
            <div className="mt-1 h-4 w-4 rounded-full bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-72 bg-muted" />
              <div className="h-3 w-40 bg-muted" />
            </div>
            <div className="h-3 w-24 bg-muted" />
          </div>
        ))}
      </div>
    </output>
  );
}
