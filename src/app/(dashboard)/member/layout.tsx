import type { ReactNode } from "react";
import WorkspaceShell from "@/components/layout/dashboard/WorkspaceShell";

export default function MemberLayout({ children }: { children: ReactNode }) {
  return <WorkspaceShell workspaceRole="MEMBER">{children}</WorkspaceShell>;
}
