import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[75vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">
        404 Not Found
      </p>
      <h1 className="mt-3 font-heading text-4xl font-semibold sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
        The page you are looking for does not exist, has been removed, or is
        temporarily unavailable. Check the URL or return to your workspace.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link className={cn(buttonVariants({ variant: "default" }))} href="/">
          Return to home
        </Link>
        <Link
          className={cn(buttonVariants({ variant: "outline" }))}
          href="/login"
        >
          Sign in to workspace
        </Link>
      </div>
    </main>
  );
}
