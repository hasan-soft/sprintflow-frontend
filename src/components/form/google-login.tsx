"use client";

import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function GoogleLoginButton() {
  const router = useRouter();

  async function signIn(response: CredentialResponse) {
    if (!response.credential) {
      toast.error("Google did not return an identity token.");
      return;
    }
    try {
      const result = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential }),
      });
      const payload = await result.json();
      if (!result.ok) throw new Error(payload.error ?? "Google sign-in failed.");
      toast.success("Signed in with Google");
      router.push(`/${String(payload.role).toLowerCase()}`);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Google sign-in failed.");
    }
  }

  return <GoogleLogin onError={() => toast.error("Google sign-in failed.")} onSuccess={signIn} />;
}