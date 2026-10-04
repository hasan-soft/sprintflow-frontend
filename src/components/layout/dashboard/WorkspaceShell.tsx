import Link from "next/link";
import { Activity, BarChart3, CircleHelp, CreditCard, LayoutDashboard, ListTodo, Settings2, Users, Workflow } from "lucide-react";
import type { ReactNode } from "react";

const navigation = {
  ADMIN: [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/users", label: "People", icon: Users },
    { href: "/admin/billing", label: "Billing", icon: CreditCard },
    { href: "/admin/logs", label: "Activity logs", icon: Activity },
  ],
  MANAGER: [
    { href: "/manager", label: "Overview", icon: LayoutDashboard },
    { href: "/manager/projects", label: "Projects", icon: Workflow },
    { href: "/manager/sprints", label: "Sprints", icon: ListTodo },
    { href: "/manager/budget", label: "Budget", icon: BarChart3 },
  ],
  MEMBER: [
    { href: "/member", label: "My work", icon: ListTodo },
    { href: "/member/tasks", label: "Task board", icon: Workflow },
    { href: "/member/activity", label: "Activity", icon: Activity },
    { href: "/member/profile", label: "Profile settings", icon: Settings2 },
  ],
} as const;

export default function WorkspaceShell({ role, children }: { role: keyof typeof navigation; children: ReactNode }) {
  const links = navigation[role];

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[236px_minmax(0,1fr)]">
      <aside className="flex flex-col border-b bg-card px-5 py-5 lg:min-h-screen lg:border-b-0 lg:border-r">
        <Link className="font-heading text-lg font-bold tracking-tight" href={`/${role.toLowerCase()}`}>
          SprintFlow<span className="ml-2 text-xs font-medium text-muted-foreground">{role}</span>
        </Link>
        <nav aria-label="Workspace" className="mt-8 flex gap-1 overflow-x-auto lg:flex-col">
          {links.map(({ href, label, icon: Icon }) => (
            <Link className="flex shrink-0 items-center gap-3 rounded-md px-3 py-2.5 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground" href={href} key={href}>
              <Icon aria-hidden="true" size={17} strokeWidth={1.8} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto hidden border-t pt-4 lg:block">
          <Link className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground" href="/help">
            <CircleHelp aria-hidden="true" size={17} /> Help center
          </Link>
          <Link className="mt-2 flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground" href="/login">
            Sign out
          </Link>
        </div>
      </aside>
      <main className="min-w-0 px-5 py-7 sm:px-8 lg:px-10 lg:py-9">{children}</main>
    </div>
  );
}