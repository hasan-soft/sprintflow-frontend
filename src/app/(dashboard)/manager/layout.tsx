import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import WorkspaceShell from "@/components/layout/dashboard/WorkspaceShell";

export default async function ManagerLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const role = cookieStore.get("sprintflow-role")?.value?.toUpperCase();

  if (role !== "MANAGER") {
    redirect(role === "ADMIN" ? "/admin" : "/member");
  }

  return <WorkspaceShell workspaceRole="MANAGER">{children}</WorkspaceShell>;
}
