import Link from "next/link";

export default function PaymentCancelPage() {
  return <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 text-center"><p className="text-sm font-semibold text-muted-foreground">Checkout canceled</p><h1 className="mt-3 font-heading text-3xl font-semibold">No changes were made.</h1><p className="mt-3 text-sm text-muted-foreground">Your current workspace plan is unchanged. You can return to billing whenever you are ready.</p><Link className="mt-6 border px-4 py-2 text-sm font-medium hover:bg-accent" href="/admin/billing">Return to billing</Link></main>;
}