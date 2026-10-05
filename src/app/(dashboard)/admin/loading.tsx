export default function AdminLoading() {
  return (
    <output
      aria-label="Loading workspace overview"
      className="mx-auto max-w-7xl animate-pulse space-y-6"
    >
      <div className="h-12 w-72 bg-muted" />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div className="h-28 bg-muted" key={item} />
        ))}
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <div className="h-80 bg-muted" />
        <div className="h-80 bg-muted" />
      </div>
    </output>
  );
}
