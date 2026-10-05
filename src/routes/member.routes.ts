import { Activity, ListTodo, Settings2, Workflow } from "lucide-react";
import type { WorkspaceNavItem } from "./admin.routes";

export const memberRoutes: WorkspaceNavItem[] = [
  { href: "/member", label: "My work", icon: ListTodo },
  { href: "/member/tasks", label: "Task board", icon: Workflow },
  { href: "/member/activity", label: "Activity", icon: Activity },
  { href: "/member/profile", label: "Profile settings", icon: Settings2 },
];
