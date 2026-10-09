"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4 text-center">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-destructive">
              Something went wrong
            </p>
            <h1 className="font-heading text-3xl font-semibold">
              Unexpected error
            </h1>
            <p className="max-w-md text-sm text-muted-foreground">
              An unexpected error occurred. Our team has been notified. You can
              try refreshing the page or going back to the home page.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              className="border px-5 py-2.5 text-sm font-medium hover:bg-accent"
              onClick={reset}
              type="button"
            >
              Try again
            </button>
            <a
              className="bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
              href="/"
            >
              Go home
            </a>
          </div>
          {error.digest && (
            <p className="font-mono text-xs text-muted-foreground/60">
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
