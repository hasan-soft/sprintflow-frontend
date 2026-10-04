import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold text-emerald-700">Payment complete</p>
      <h1 className="mt-3 font-heading text-3xl font-semibold">
        Your workspace is upgraded.
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Stripe has returned a successful checkout result. Your billing status
        will update when payment confirmation is connected.
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
