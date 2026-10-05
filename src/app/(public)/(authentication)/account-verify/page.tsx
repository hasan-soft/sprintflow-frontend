import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Verify Account",
  description:
    "Check your inbox to verify your email address and activate your SprintFlow workspace.",
  openGraph: {
    title: "Verify Account | SprintFlow",
    description:
      "Check your inbox to verify your email address and activate your SprintFlow workspace.",
    url: "/account-verify",
  },
};

export default function AccountVerifyPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">
        Account verification
      </p>
      <h1 className="text-3xl font-semibold">Check your inbox</h1>
      <p className="text-muted-foreground">
        If you just registered, follow the verification link sent to your email
        address.
      </p>
      <Link
        className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        href="/login"
      >
        Return to login
      </Link>
    </main>
  );
}
