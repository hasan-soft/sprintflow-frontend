import type { Metadata } from "next";
import { Suspense } from "react";
import PaymentConfirmation from "@/components/modules/admin/PaymentConfirmation";

export const metadata: Metadata = {
  title: "Payment Successful",
  description: "Your SprintFlow workspace subscription payment was successful.",
};

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center text-sm text-muted-foreground">
          Loading payment status...
        </main>
      }
    >
      <PaymentConfirmation />
    </Suspense>
  );
}
