export default function SocialProof() {
  const logos = [
    "Vercel",
    "Supabase",
    "Linear",
    "Stripe",
    "GitHub",
    "Raycast",
  ];

  return (
    <section className="border-b bg-card/40 py-10">
      <div className="mx-auto max-w-7xl px-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Powering agile momentum for modern product teams worldwide
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70 grayscale transition-all hover:grayscale-0">
          {logos.map((logo) => (
            <span
              key={logo}
              className="font-heading text-lg font-bold tracking-tight text-foreground/80 hover:text-primary transition-colors cursor-default"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
