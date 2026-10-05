"use client";

import {
  ArrowRight,
  BriefcaseBusiness,
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
    detail: "Workspace owner",
    destination: "/admin",
    icon: ShieldCheck,
    tone: "bg-[#e5f2ee] text-[#23665b]",
  },
  {
    role: "MANAGER",
    label: "Manager",
    detail: "Project lead",
    destination: "/manager",
    icon: BriefcaseBusiness,
    tone: "bg-[#eaf0f8] text-[#426486]",
  },
  {
    role: "MEMBER",
    label: "Member",
    detail: "Contributor",
    destination: "/member",
    icon: UserRound,
    tone: "bg-[#f3eee5] text-[#83683e]",
  },
] as const;

export default function DemoLogin() {
  const router = useRouter();
  const [pendingRole, setPendingRole] = useState<string | null>(null);

  async function signIn(
    role: Pick<(typeof demoRoles)[number], "role" | "destination">,
  ) {
    setPendingRole(role.role);
    try {
      await demoLogin(role.role);
      router.push(role.destination);
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
    <section className="mt-6 border-t border-[#dbe3e1] pt-5">
      <div className="mb-3 flex items-end justify-between gap-3">
        <h2 className="text-sm font-semibold text-[#18383e]">Demo workspace</h2>
        <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#849195]">
          One-click access
        </span>
      </div>
      <div className="grid gap-2">
        {demoRoles.map(({ icon: Icon, ...demoRole }) => (
          <button
            className="group flex min-h-14 items-center gap-3 rounded-md border border-[#dce4e2] bg-white px-3.5 text-left transition hover:border-[#99bfba] hover:bg-[#f6faf8] disabled:cursor-wait disabled:opacity-60"
            disabled={pendingRole !== null}
            key={demoRole.role}
            onClick={() => signIn(demoRole)}
            type="button"
          >
            <span
              className={`grid size-9 shrink-0 place-items-center rounded-md ${demoRole.tone}`}
            >
              <Icon aria-hidden="true" size={17} strokeWidth={1.8} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-[#18383e]">
                {demoRole.label}
              </span>
              <span className="mt-0.5 block text-xs text-[#78898b]">
                {demoRole.detail}
              </span>
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#28716e]">
              {pendingRole === demoRole.role ? "Opening..." : "Demo login"}
              <ArrowRight
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
                size={14}
              />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
