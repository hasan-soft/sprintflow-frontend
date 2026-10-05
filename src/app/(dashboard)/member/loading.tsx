export default function MemberLoading() {
  return (
    <output
      aria-label="Loading your workspace"
      className="mx-auto max-w-7xl animate-pulse space-y-6"
    >
      <div className="h-12 w-72 bg-muted" />
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="h-28 bg-muted" />
        <div className="h-28 bg-muted" />
        <div className="h-28 bg-muted" />
      </div>
      <div className="h-72 bg-muted" />
    </output>
  );
}
