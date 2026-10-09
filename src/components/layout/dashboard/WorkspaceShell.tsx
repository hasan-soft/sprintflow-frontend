import { CircleHelp, Home } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import SignOutButton from "@/components/layout/dashboard/SignOutButton";
import { workspaceRoutes } from "@/routes";

export default function WorkspaceShell({
  workspaceRole,
  children,
}: {
  workspaceRole: keyof typeof workspaceRoutes;
  children: ReactNode;
}) {
  const links = workspaceRoutes[workspaceRole];

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[236px_minmax(0,1fr)]">
      <aside className="flex flex-col border-b bg-card px-5 py-5 lg:min-h-screen lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between">
          <Link
            className="font-heading text-lg font-bold tracking-tight"
            href={`/${workspaceRole.toLowerCase()}`}
          >
            SprintFlow
            <span className="ml-2 text-xs font-medium text-muted-foreground">
              {workspaceRole}
            </span>
          </Link>
        </div>

        {/* Back to Home Link */}
        <div className="mt-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg border border-border/70 bg-background/60 px-3 py-2 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:bg-accent hover:text-foreground"
          >
            <Home className="size-3.5 text-primary" />
            <span>Back to Home</span>
          </Link>
        </div>

        <nav
          aria-label="Workspace"
          className="mt-6 flex gap-1 overflow-x-auto lg:flex-col"
        >
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              className="flex shrink-0 items-center gap-3 rounded-md px-3 py-2.5 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground"
              href={href}
              key={href}
            >
              <Icon aria-hidden="true" size={17} strokeWidth={1.8} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto hidden border-t pt-4 lg:block space-y-1">
          <Link
            className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
            href="/"
          >
            <Home aria-hidden="true" size={17} /> Home website
          </Link>
          <Link
            className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
            href="/help"
          >
            <CircleHelp aria-hidden="true" size={17} /> Help center
          </Link>
          <SignOutButton />
        </div>
      </aside>
      <main className="min-w-0 px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
        {children}
      </main>
    </div>
  );
}
