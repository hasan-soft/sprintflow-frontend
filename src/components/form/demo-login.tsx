"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const demoRoles = [
  { role: "ADMIN", label: "Continue as Admin", destination: "/admin" },
  { role: "MANAGER", label: "Continue as Manager", destination: "/manager" },
  { role: "MEMBER", label: "Continue as Member", destination: "/member" },
] as const;

export default function DemoLogin() {
  const router = useRouter();
  const [pendingRole, setPendingRole] = useState<string | null>(null);

  function signIn(role: (typeof demoRoles)[number]) {
    setPendingRole(role.role);
    document.cookie = `sprintflow-role=${role.role}; Path=/; Max-Age=28800; SameSite=Lax`;
    router.push(role.destination);
  }

  return (
    <div className="mt-6 border-t pt-5">
      <p className="mb-3 text-sm font-medium">Try a demo workspace</p>
      <div className="grid gap-2">
        {demoRoles.map((demoRole) => (
          <button
            className="h-10 rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-accent disabled:opacity-60"
            disabled={pendingRole !== null}
            key={demoRole.role}
            onClick={() => signIn(demoRole)}
            type="button"
          >
            {pendingRole === demoRole.role ? "Opening workspace..." : demoRole.label}
          </button>
        ))}
      </div>
    </div>
  );
}