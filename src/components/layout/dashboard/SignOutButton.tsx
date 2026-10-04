"use client";

import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      className="mt-2 flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
      onClick={signOut}
      type="button"
    >
      Sign out
    </button>
  );
}