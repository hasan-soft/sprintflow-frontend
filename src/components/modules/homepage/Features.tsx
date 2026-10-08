export default function Features() {
  const items = [
    {
      title: "Plan with context",
      body: "Keep sprint goals, ownership, and capacity in one view.",
    },
    {
      title: "Move work clearly",
      body: "Spot blockers early with a board everyone can understand.",
    },
    {
      title: "Learn as you go",
      body: "See delivery trends and adjust your next iteration.",
    },
  ];

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:grid-cols-3">
      {items.map((item, index) => (
        <article className="border-t-2 border-primary pt-4" key={item.title}>
          <p className="font-mono text-xs text-muted-foreground">
            0{index + 1}
          </p>
          <h2 className="mt-3 font-semibold text-foreground">{item.title}</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {item.body}
          </p>
        </article>
      ))}
    </section>
  );
}
