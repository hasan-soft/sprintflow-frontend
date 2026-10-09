import type { Metadata } from "next";
import CallToAction from "@/components/modules/homepage/CallToAction";
import FaqSection from "@/components/modules/homepage/FaqSection";
import Features from "@/components/modules/homepage/Features";
import Hero from "@/components/modules/homepage/Hero";
import RoleShowcase from "@/components/modules/homepage/RoleShowcase";
import SocialProof from "@/components/modules/homepage/SocialProof";
import StatsMetrics from "@/components/modules/homepage/StatsMetrics";
import Testimonials from "@/components/modules/homepage/Testimonials";
import WorkflowInteractive from "@/components/modules/homepage/WorkflowInteractive";

export const metadata: Metadata = {
  title: "SprintFlow | Project work, in rhythm",
  description:
    "A calmer place to plan work, see what is moving, and give every team a clear next step. Project Management SaaS for modern engineering teams.",
  openGraph: {
    title: "SprintFlow | Project work, in rhythm",
    description:
      "A calmer place to plan work, see what is moving, and give every team a clear next step.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <Hero />
      <SocialProof />
      <Features />
      <WorkflowInteractive />
      <RoleShowcase />
      <StatsMetrics />
      <Testimonials />
      <FaqSection />
      <CallToAction />
    </main>
  );
}

