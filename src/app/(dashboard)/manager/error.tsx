"use client";

export default function ManagerError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-start justify-center"><p className="text-sm font-semibold text-destructive">Manager workspace unavailable</p><h1 className="mt-2 text-2xl font-semibold">This view could not be loaded.</h1><p className="mt-2 text-sm text-muted-foreground">Try again to reload your project data.</p><button className="mt-5 border px-4 py-2 text-sm font-medium hover:bg-accent" onClick={reset} type="button">Try again</button></main>;
}