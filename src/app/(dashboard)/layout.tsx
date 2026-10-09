import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

const SUPPORTED_ROLES = ["ADMIN", "MANAGER", "MEMBER"] as const;
type Role = (typeof SUPPORTED_ROLES)[number];

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("sprintflow-access-token");
  const roleCookie = cookieStore.get("sprintflow-role");

  // No token → send to login
  if (!token?.value) {
    redirect("/login");
  }

  const role = roleCookie?.value?.toUpperCase() as Role | undefined;

  // Token exists but role is unrecognised → clear and send to login
  if (!role || !SUPPORTED_ROLES.includes(role)) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}
