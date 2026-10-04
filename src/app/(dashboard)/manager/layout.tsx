import type { ReactNode } from "react";
import WorkspaceShell from "@/components/layout/dashboard/WorkspaceShell";

export default function ManagerLayout({ children }: { children: ReactNode }) {
  return <WorkspaceShell role="MANAGER">{children}</WorkspaceShell>;
}