export default function MemberTasksLoading() {
  return (
    <output aria-label="Loading tasks" className="mx-auto max-w-7xl animate-pulse space-y-6">
      <div className="h-10 w-36 bg-muted" />
      <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div className="space-y-3 rounded border p-3" key={i}>
            <div className="h-4 w-24 bg-muted" />
            {[1, 2].map((j) => (
              <div className="h-20 border bg-muted" key={j} />
            ))}
          </div>
        ))}
      </div>
    </output>
  );
}
