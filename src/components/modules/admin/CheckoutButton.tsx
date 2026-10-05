"use client";

import { useState } from "react";
import { toast } from "sonner";
import { initiatePayment } from "@/api";

export default function CheckoutButton({
  organizationId,
  plan,
}: {
  organizationId: string;
  plan: "PRO" | "ENTERPRISE";
}) {
  const [pending, setPending] = useState(false);

  async function startCheckout() {
    setPending(true);
    try {
      const result = await initiatePayment({ organizationId, plan });
      if (typeof result.checkoutUrl !== "string")
        throw new Error("Stripe did not return a checkout URL.");
      window.location.assign(result.checkoutUrl);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not start checkout.",
      );
      setPending(false);
    }
  }

  return (
    <button
      className="bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
      disabled={pending || !organizationId}
      onClick={startCheckout}
      type="button"
    >
      {pending
        ? "Connecting to Stripe..."
        : !organizationId
          ? "Organization unavailable"
          : `Upgrade to ${plan}`}
    </button>
  );
}
