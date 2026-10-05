export default function ManagerBudgetPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <header>
        <p className="text-sm font-semibold text-primary">Planning</p>
        <h1 className="mt-1 font-heading text-3xl font-semibold">
          Budget allocation
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Project-level budget data for organizations available to your account.
        </p>
      </header>
      <section className="border border-dashed bg-card px-6 py-16 text-center">
        <h2 className="font-semibold">Project budgets are not available yet</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
          The deployed API supports organization subscription payments, but does
          not expose project budget allocations or spend records. No estimated
          amounts are shown here.
        </p>
      </section>
    </div>
  );
}
