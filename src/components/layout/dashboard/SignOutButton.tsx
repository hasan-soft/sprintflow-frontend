"use client";

import { useRouter } from "next/navigation";
import { useLogout } from "@/hooks";

export default function SignOutButton() {
  const router = useRouter();
  const logout = useLogout();

  async function signOut() {
    try {
      await logout.mutateAsync();
      router.push("/login");
      router.refresh();
    } catch {
      router.push("/login");
      router.refresh();
    }
  }

  return (
    <button
      className="mt-2 flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
      disabled={logout.isPending}
      onClick={signOut}
      type="button"
    >
      {logout.isPending ? "Signing out..." : "Sign out"}
    </button>
  );
}
