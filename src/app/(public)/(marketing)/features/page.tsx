import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore SprintFlow's toolkit for sprint planning, project health analytics, and team delivery tracking.",
  openGraph: {
    title: "Features | SprintFlow",
    description:
      "Explore SprintFlow's toolkit for sprint planning, project health analytics, and team delivery tracking.",
    url: "/features",
  },
};

const features = [
  {
    number: "01",
    title: "Sprint planning",
    body: "Shape each iteration around a clear objective, realistic capacity, and visible ownership.",
  },
  {
    number: "02",
    title: "Project health",
    body: "Bring delivery progress, budget, and team workload together for a useful status check.",
  },
  {
    number: "03",
    title: "Work that flows",
    body: "Give contributors a focused task board and a simple record of what changed.",
  },
  {
    number: "04",
    title: "Workspace insight",
    body: "Follow velocity and capacity trends without exporting another spreadsheet.",
  },
];

export default function FeaturesPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-16">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          A practical toolkit
        </p>
        <h1 className="mt-4 font-heading text-4xl font-semibold sm:text-5xl">
          The whole team, moving in the same direction.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          From the first project brief to the last task in a sprint, keep the
          work legible and the next decision close.
        </p>
      </header>
      <section className="mt-14 grid gap-x-10 sm:grid-cols-2">
        {features.map((feature) => (
          <article className="border-t py-6" key={feature.number}>
            <p className="font-mono text-xs text-primary">{feature.number}</p>
            <h2 className="mt-3 text-xl font-semibold">{feature.title}</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              {feature.body}
            </p>
          </article>
        ))}
      </section>
      <Link
        className="mt-8 inline-flex bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
        href="/register"
      >
        Create a workspace
      </Link>
    </main>
  );
}
