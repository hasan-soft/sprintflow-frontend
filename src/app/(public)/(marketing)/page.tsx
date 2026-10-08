import type { Metadata } from "next";
import Features from "@/components/modules/homepage/Features";
import Hero from "@/components/modules/homepage/Hero";

export const metadata: Metadata = {
  title: "SprintFlow | Project work, in rhythm",
  description:
    "A calmer place to plan work, see what is moving, and give every team a clear next step.",
  openGraph: {
    title: "SprintFlow | Project work, in rhythm",
    description:
      "A calmer place to plan work, see what is moving, and give every team a clear next step.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
    </main>
  );
}
