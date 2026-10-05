import type { LucideIcon } from "lucide-react";
import { Activity, CreditCard, LayoutDashboard, Users } from "lucide-react";

export type WorkspaceNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const adminRoutes: WorkspaceNavItem[] = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/users", label: "People", icon: Users },
  { href: "/admin/billing", label: "Billing", icon: CreditCard },
  { href: "/admin/logs", label: "Activity logs", icon: Activity },
];
