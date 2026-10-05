"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useConfirmPayment } from "@/hooks";

export default function PaymentConfirmation() {
  const sessionId = useSearchParams().get("session_id") ?? "";
  const confirmation = useConfirmPayment(sessionId);

  if (!sessionId || confirmation.isError) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 text-center">
        <p className="text-sm font-semibold text-rose-700">
          Payment confirmation unavailable
        </p>
        <h1 className="mt-3 font-heading text-3xl font-semibold">
          We could not confirm this payment.
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {confirmation.error instanceof Error
            ? confirmation.error.message
            : "The checkout session ID is missing or the payment API is unavailable."}
        </p>
        <Link
          className="mt-6 border px-4 py-2 text-sm font-medium hover:bg-accent"
          href="/admin/billing"
        >
          Return to billing
        </Link>
      </main>
    );
  }

  if (confirmation.isPending) {
    return (
      <main
        aria-label="Confirming payment"
        className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 text-center"
      >
        <div className="size-8 animate-spin rounded-full border-2 border-muted border-t-primary" />
        <p className="mt-4 text-sm text-muted-foreground">
          Confirming your Stripe payment...
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold text-emerald-700">
        Payment confirmed
      </p>
      <h1 className="mt-3 font-heading text-3xl font-semibold">
        Your workspace is upgraded.
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        {confirmation.data?.message ?? "Your subscription has been confirmed."}
      </p>
      <Link
        className="mt-6 bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        href="/admin/billing"
      >
        Back to billing
      </Link>
    </main>
  );
}
