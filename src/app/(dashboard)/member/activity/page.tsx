export default function MemberActivityPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-7">
      <header>
        <p className="text-sm font-semibold text-primary">My workspace</p>
        <h1 className="mt-1 font-heading text-3xl font-semibold">
          Activity history
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Recent updates and contributions across your projects.
        </p>
      </header>
      <section className="border border-dashed bg-card px-6 py-16 text-center">
        <h2 className="font-semibold">Activity history is unavailable</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
          The backend has no member activity-feed endpoint yet. Your current
          assigned tasks remain available from My work.
        </p>
      </section>
    </div>
  );
}
