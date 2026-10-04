import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-16">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Straightforward pricing
        </p>
        <h1 className="mt-4 font-heading text-4xl font-semibold sm:text-5xl">
          One plan for teams that ship.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Start small, bring the whole team, and upgrade when you are ready.
        </p>
      </header>
      <section className="mt-12 grid gap-8 border-y py-8 md:grid-cols-[1fr_300px]">
        <div>
          <h2 className="text-xl font-semibold">Team</h2>
          <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
            Everything you need to plan projects, run sprints, and follow
            delivery health across your workspace.
          </p>
          <ul className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
            {[
              "Unlimited projects",
              "Sprint planning and task boards",
              "Team capacity analytics",
              "Role-based workspace access",
              "Activity history",
              "Priority support",
            ].map((item) => (
              <li className="border-l-2 border-primary pl-3" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="border bg-card p-5">
          <p className="text-sm text-muted-foreground">Monthly</p>
          <p className="mt-2 font-heading text-4xl font-semibold">
            $49
            <span className="font-sans text-sm font-normal text-muted-foreground">
              {" "}
              / month
            </span>
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            For a team workspace
          </p>
          <Link
            className="mt-6 block bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground"
            href="/register"
          >
            Start with Team
          </Link>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Payment can be completed in test mode from admin billing.
          </p>
        </div>
      </section>
    </main>
  );
}
