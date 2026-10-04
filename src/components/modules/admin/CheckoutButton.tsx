"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function CheckoutButton() {
  const [pending, setPending] = useState(false);

  async function startCheckout() {
    setPending(true);
    try {
      const response = await fetch("/api/checkout", { method: "POST" });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error ?? "Could not start checkout.");
      if (typeof result.url !== "string")
        throw new Error("Stripe did not return a checkout URL.");
      window.location.assign(result.url);
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
      disabled={pending}
      onClick={startCheckout}
      type="button"
    >
      {pending ? "Connecting to Stripe..." : "Upgrade plan"}
    </button>
  );
}
