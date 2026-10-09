export default function AdminUsersLoading() {
  return (
    <output aria-label="Loading users" className="mx-auto max-w-7xl animate-pulse space-y-6">
      <div className="h-10 w-64 bg-muted" />
      <div className="flex gap-3">
        <div className="h-10 flex-1 bg-muted" />
        <div className="h-10 w-36 bg-muted" />
      </div>
      <div className="space-y-px border bg-card">
        {[1, 2, 3, 4, 5].map((i) => (
          <div className="flex items-center gap-4 px-4 py-4" key={i}>
            <div className="h-8 w-8 rounded-full bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-48 bg-muted" />
              <div className="h-3 w-32 bg-muted" />
            </div>
            <div className="h-6 w-20 bg-muted" />
          </div>
        ))}
      </div>
    </output>
  );
}
