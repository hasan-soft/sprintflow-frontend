export default function AdminBillingLoading() {
  return (
    <output aria-label="Loading billing" className="mx-auto max-w-5xl animate-pulse space-y-7">
      <div className="h-10 w-40 bg-muted" />
      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="h-56 border bg-muted" />
        <div className="h-56 border bg-muted" />
      </div>
      <div className="h-32 border bg-muted" />
    </output>
  );
}
