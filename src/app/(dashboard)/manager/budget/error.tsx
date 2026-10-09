"use client";

import { useEffect } from "react";

export default function PageError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-destructive">
        Error
      </p>
      <h2 className="font-heading text-2xl font-semibold">
        This page could not be loaded
      </h2>
      <p className="max-w-sm text-sm text-muted-foreground">
        There was a problem loading data from the API. Please try again.
      </p>
      <button
        className="border px-5 py-2.5 text-sm font-medium hover:bg-accent"
        onClick={reset}
        type="button"
      >
        Try again
      </button>
    </div>
  );
}
