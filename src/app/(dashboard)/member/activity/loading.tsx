export default function MemberActivityLoading() {
  return (
    <output aria-label="Loading activity" className="mx-auto max-w-4xl animate-pulse space-y-6">
      <div className="h-10 w-36 bg-muted" />
      <div className="space-y-px border bg-card">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div className="flex gap-4 px-4 py-3" key={i}>
            <div className="mt-1 h-4 w-4 rounded-full bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-64 bg-muted" />
              <div className="h-3 w-32 bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </output>
  );
}
