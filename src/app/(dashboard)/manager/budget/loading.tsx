export default function ManagerBudgetLoading() {
  return (
    <output aria-label="Loading budget" className="mx-auto max-w-5xl animate-pulse space-y-6">
      <div className="h-10 w-36 bg-muted" />
      <div className="grid gap-px border bg-border sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div className="h-28 bg-card" key={i} />
        ))}
      </div>
      <div className="h-64 border bg-muted" />
    </output>
  );
}
