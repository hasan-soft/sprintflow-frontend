import type { ReactNode } from "react";
import WorkspaceShell from "@/components/layout/dashboard/WorkspaceShell";

export default function AdminLayout({ children }: { children: ReactNode }) {
	return <WorkspaceShell role="ADMIN">{children}</WorkspaceShell>;
}
