import { BarChart3, LayoutDashboard, ListTodo, Workflow } from "lucide-react";
import type { WorkspaceNavItem } from "./admin.routes";

export const managerRoutes: WorkspaceNavItem[] = [
  { href: "/manager", label: "Overview", icon: LayoutDashboard },
  { href: "/manager/projects", label: "Projects", icon: Workflow },
  { href: "/manager/sprints", label: "Sprints", icon: ListTodo },
  { href: "/manager/budget", label: "Budget", icon: BarChart3 },
];
