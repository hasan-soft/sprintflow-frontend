import { Star } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Tariq Mahmud",
      role: "VP of Engineering at FinScale",
      text: "SprintFlow cut our sprint planning meetings in half. Having the budget, tasks, and sprint goals live in one dashboard saved us from switching between five tools.",
      rating: 5,
    },
    {
      name: "Sabrina Rahman",
      role: "Lead Product Manager at CloudCore",
      text: "The 3-role permission architecture is spot-on. My developers stay focused on their Kanban tickets without getting overwhelmed by invoice and organization configurations.",
      rating: 5,
    },
    {
      name: "Fahim Shahriar",
      role: "CTO at HyperDev Studio",
      text: "URL-state synchronized filters, snappy Next.js Server Components, and seamless Stripe billing make this one of the cleanest SaaS apps our team has ever used.",
      rating: 5,
    },
  ];

  return (
    <section className="border-b bg-card/60 py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Trusted by Builders
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">
            Loved by engineering teams of all sizes
          </h2>
          <p className="mt-3 text-muted-foreground">
            Here is what engineering managers and contributors say about shipping with SprintFlow.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="flex flex-col justify-between rounded-xl border border-border/80 bg-background p-6 shadow-xs"
            >
              <div>
                <div className="flex gap-1 text-amber-500 mb-4">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="size-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed italic">
                  &ldquo;{r.text}&rdquo;
                </p>
              </div>
              <div className="mt-6 border-t pt-4">
                <p className="text-sm font-semibold text-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
