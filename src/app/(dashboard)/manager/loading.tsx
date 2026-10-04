export default function ManagerLoading() {
  return (
    <div
      aria-label="Loading manager workspace"
      className="mx-auto max-w-7xl animate-pulse space-y-6"
      role="status"
    >
      <div className="h-12 w-72 bg-muted" />
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="h-28 bg-muted" />
        <div className="h-28 bg-muted" />
        <div className="h-28 bg-muted" />
      </div>
      <div className="h-80 bg-muted" />
    </div>
  );
}
