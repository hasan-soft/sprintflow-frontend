import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about SprintFlow and our mission to bring project planning, team capacity, and everyday delivery into one focused workspace.",
  openGraph: {
    title: "About Us | SprintFlow",
    description:
      "Learn about SprintFlow and our mission to bring project planning, team capacity, and everyday delivery into one focused workspace.",
    url: "/about-us",
  },
};

export default function AboutUsPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-20">
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">
        About SprintFlow
      </p>
      <h1 className="mt-4 max-w-3xl font-heading text-4xl font-semibold sm:text-5xl">
        Good work deserves a clear path forward.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
        SprintFlow brings project planning, team capacity, and everyday delivery
        into one focused workspace. It is built for teams that want momentum
        without more process.
      </p>
    </main>
  );
}
