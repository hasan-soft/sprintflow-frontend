"use client";

export default function AdminError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-start justify-center">
      <p className="text-sm font-semibold text-destructive">
        Workspace unavailable
      </p>
      <h1 className="mt-2 text-2xl font-semibold">
        We could not load this view.
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Your workspace data is safe. Try loading this page again.
      </p>
      <button
        className="mt-5 border px-4 py-2 text-sm font-medium hover:bg-accent"
        onClick={reset}
        type="button"
      >
        Try again
      </button>
    </main>
  );
}
