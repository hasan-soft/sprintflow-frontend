export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">
        Utility
      </p>
      <h1 className="mt-4 font-heading text-4xl font-semibold">
        Privacy overview
      </h1>
      <p className="mt-5 text-sm leading-7 text-muted-foreground">
        This assignment build uses sample workspace data stored in the browser
        session and static demo records. Do not enter real personal, customer,
        or payment information. Payment handling is delegated to Stripe Checkout
        when a test-mode key is configured.
      </p>
      <h2 className="mt-10 text-xl font-semibold">Demo data</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Changes made in the demo workspace are not connected to a production
        database and may reset when you reload the application.
      </p>
    </main>
  );
}
