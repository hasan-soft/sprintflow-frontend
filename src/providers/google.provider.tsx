"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import type { ReactNode } from "react";

const FALLBACK_CLIENT_ID =
  "507319110127-9d8b8dtpqso3f5k314oeqj3u43u21go9.apps.googleusercontent.com";

export default function GoogleProvider({ children }: { children: ReactNode }) {
  const clientId =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || FALLBACK_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
  );
}
