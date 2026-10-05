"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Root application error:", error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-destructive">
        Application error
      </p>
      <h1 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
        An unexpected error occurred while rendering this view. Your workspace
        data is safe. Try recovering below or return to the home page.
      </p>
      {error.digest && (
        <p className="mt-2 font-mono text-xs text-muted-foreground">
          Error digest: {error.digest}
        </p>
      )}
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <Button onClick={reset} type="button">
          Try again
        </Button>
        <Link className={cn(buttonVariants({ variant: "outline" }))} href="/">
          Return home
        </Link>
      </div>
    </main>
  );
}
