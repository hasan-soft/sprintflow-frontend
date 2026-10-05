"use client";

import { type CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useGoogleOAuth } from "@/hooks";

export default function GoogleLoginButton() {
  const router = useRouter();
  const googleMutation = useGoogleOAuth();

  async function signIn(response: CredentialResponse) {
    if (!response.credential) {
      toast.error("Google did not return an identity token.");
      return;
    }
    try {
      const payload = await googleMutation.mutateAsync(response.credential);
      toast.success("Signed in with Google");
      router.push(`/${String(payload.role).toLowerCase()}`);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Google sign-in failed.",
      );
    }
  }

  return (
    <GoogleLogin
      onError={() => toast.error("Google sign-in failed.")}
      onSuccess={signIn}
    />
  );
}
