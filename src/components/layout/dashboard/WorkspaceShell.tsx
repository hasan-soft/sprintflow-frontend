"use client";

import { CircleHelp, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useState } from "react";
import DashboardNavbar from "@/components/layout/dashboard/DashboardNavbar";
import SignOutButton from "@/components/layout/dashboard/SignOutButton";
import ThemeToggle from "@/components/shared/theme-toggle";
import { workspaceRoutes } from "@/routes";

export default function WorkspaceShell({
  workspaceRole,
  children,
}: {
  workspaceRole: keyof typeof workspaceRoutes;
  children: ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const links = workspaceRoutes[workspaceRole];

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[250px_minmax(0,1fr)]">
      {/* Desktop Sidebar */}
      <aside className="hidden flex-col border-r border-border/80 bg-card px-5 py-6 lg:flex lg:min-h-screen">
        <div className="flex items-center justify-between">
          <Link
            className="flex items-center gap-2.5 font-heading text-lg font-bold tracking-tight text-foreground"
            href={`/${workspaceRole.toLowerCase()}`}
          >
            <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-xs font-bold text-primary-foreground shadow-2xs">
              SF
            </span>
            <span>SprintFlow</span>
            <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
              {workspaceRole}
            </span>
          </Link>
        </div>

        {/* Back to Home Link */}
        <div className="mt-5">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl border border-border/70 bg-background/60 px-3 py-2 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:bg-accent hover:text-foreground"
          >
            <Home className="size-3.5 text-primary" />
            <span>Back to Public Site</span>
          </Link>
        </div>

        {/* Workspace Navigation Links */}
        <nav
          aria-label="Workspace navigation"
          className="mt-6 flex flex-col gap-1.5 flex-1"
        >
          {links.map(({ href, label, icon: Icon }) => {
            const isActive =
              pathname === href ||
              (href !== `/${workspaceRole.toLowerCase()}` &&
                pathname.startsWith(href));
            return (
              <Link
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
                href={href}
                key={href}
              >
                <Icon aria-hidden="true" size={17} strokeWidth={1.8} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer Controls */}
        <div className="border-t border-border/80 pt-4 space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-medium text-muted-foreground">
              Appearance
            </span>
            <ThemeToggle />
          </div>
          <Link
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            href="/help"
          >
            <CircleHelp aria-hidden="true" size={17} />
            <span>Help Center</span>
          </Link>
          <SignOutButton />
        </div>
      </aside>

      {/* Main Right Column (Navbar + Content + Mobile Drawer) */}
      <div className="flex flex-col min-w-0">
        {/* Unified Dashboard Navbar with Profile Icon & Dropdown */}
        <DashboardNavbar
          workspaceRole={workspaceRole}
          mobileMenuOpen={mobileMenuOpen}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        {/* Mobile Collapsible Navigation Drawer */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile workspace navigation"
            className="border-b border-border/80 bg-card px-5 py-4 space-y-3 lg:hidden shadow-lg animate-in fade-in duration-150"
          >
            <div className="space-y-1">
              {links.map(({ href, label, icon: Icon }) => {
                const isActive =
                  pathname === href ||
                  (href !== `/${workspaceRole.toLowerCase()}` &&
                    pathname.startsWith(href));
                return (
                  <Link
                    className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                    href={href}
                    key={href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon aria-hidden="true" size={17} strokeWidth={1.8} />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="border-t border-border/70 pt-3 space-y-1">
              <Link
                className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                href="/"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home aria-hidden="true" size={17} />
                <span>Public Website</span>
              </Link>
              <Link
                className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                href="/help"
                onClick={() => setMobileMenuOpen(false)}
              >
                <CircleHelp aria-hidden="true" size={17} />
                <span>Help Center</span>
              </Link>
              <div className="pt-1">
                <SignOutButton />
              </div>
            </div>
          </nav>
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
          {children}
        </main>
      </div>
    </div>
  );
}
