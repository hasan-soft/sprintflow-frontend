import { CircleHelp } from "lucide-react";
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
        <Link
          className="font-heading text-lg font-bold tracking-tight"
          href={`/${workspaceRole.toLowerCase()}`}
        >
          SprintFlow
          <span className="ml-2 text-xs font-medium text-muted-foreground">
            {workspaceRole}
          </span>
        </Link>
        <nav
          aria-label="Workspace"
          className="mt-8 flex gap-1 overflow-x-auto lg:flex-col"
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
        <div className="mt-auto hidden border-t pt-4 lg:block">
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
