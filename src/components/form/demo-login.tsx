"use client";

import {
  BriefcaseBusiness,
  Loader2,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { demoLogin } from "@/api";

const demoRoles = [
  {
    role: "ADMIN",
    label: "Admin",
    subtitle: "Workspace Owner",
    email: "admin@gmail.com",
    destination: "/admin",
    icon: ShieldCheck,
    badgeColor:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    btnColor: "bg-emerald-700 hover:bg-emerald-800 text-white",
  },
  {
    role: "MANAGER",
    label: "Manager",
    subtitle: "Project Lead",
    email: "manager@gmail.com",
    destination: "/manager",
    icon: BriefcaseBusiness,
    badgeColor:
      "bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-400 border-sky-200 dark:border-sky-800",
    btnColor: "bg-sky-700 hover:bg-sky-800 text-white",
  },
  {
    role: "MEMBER",
    label: "Member",
    subtitle: "Team Contributor",
    email: "member@gmail.com",
    destination: "/member",
    icon: UserRound,
    badgeColor:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    btnColor: "bg-amber-700 hover:bg-amber-800 text-white",
  },
] as const;

export default function DemoLogin() {
  const router = useRouter();
  const [pendingRole, setPendingRole] = useState<string | null>(null);

  async function signIn(
    role: Pick<(typeof demoRoles)[number], "role" | "destination" | "label">,
  ) {
    setPendingRole(role.role);
    try {
      await demoLogin(role.role);
      toast.success(`Logged in as Demo ${role.label}`);
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Demo sign-in is currently unavailable.",
      );
      setPendingRole(null);
    }
  }

  return (
    <section className="space-y-3">
      <div className="text-center">
        <h3 className="flex items-center justify-center gap-1.5 text-sm font-semibold text-foreground">
          <span>Quick Demo Login</span>
        </h3>
        <p className="mt-0.5 text-xs text-muted-foreground">
          One-click evaluation access for all 3 workspace roles
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {demoRoles.map((demo) => {
          const isLoading = pendingRole === demo.role;
          const isAnyLoading = pendingRole !== null;
          return (
            <div
              className="flex flex-col justify-between rounded-lg border border-border/70 bg-card p-3.5 shadow-xs transition hover:border-primary/40 hover:shadow-sm"
              key={demo.role}
            >
              <div>
                
                <div className="mt-2">
                  <h4 className="text-sm font-semibold text-foreground">
                    {demo.label}
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    {demo.subtitle}
                  </p>
                  <p className="mt-1 font-mono text-[10px] text-muted-foreground/80 truncate">
                    {demo.email}
                  </p>
                </div>
              </div>

              <button
                className={`mt-3.5 flex h-8.5 w-full items-center justify-center gap-1.5 rounded-md text-xs font-semibold tracking-wide transition disabled:cursor-not-allowed disabled:opacity-50 ${demo.btnColor}`}
                disabled={isAnyLoading}
                onClick={() => signIn(demo)}
                type="button"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={13} />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Demo Login</span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
