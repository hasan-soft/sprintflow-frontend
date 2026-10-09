export default function MemberProfileLoading() {
  return (
    <output aria-label="Loading profile" className="mx-auto max-w-3xl animate-pulse space-y-6">
      <div className="h-10 w-32 bg-muted" />
      <div className="flex items-center gap-4 border bg-card p-6">
        <div className="h-20 w-20 rounded-full bg-muted" />
        <div className="space-y-2">
          <div className="h-5 w-48 bg-muted" />
          <div className="h-4 w-32 bg-muted" />
        </div>
      </div>
      <div className="space-y-4 border bg-card p-6">
        {[1, 2, 3].map((i) => (
          <div className="space-y-2" key={i}>
            <div className="h-3 w-20 bg-muted" />
            <div className="h-10 w-full bg-muted" />
          </div>
        ))}
        <div className="h-10 w-28 bg-muted" />
      </div>
    </output>
  );
}
