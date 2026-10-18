import type { Metadata } from "next";
import BlogInsights from "@/components/modules/homepage/BlogInsights";
import CallToAction from "@/components/modules/homepage/CallToAction";
import CoreListingSection from "@/components/modules/homepage/CoreListingSection";
import FaqSection from "@/components/modules/homepage/FaqSection";
import FeatureHighlight from "@/components/modules/homepage/FeatureHighlight";
import Features from "@/components/modules/homepage/Features";
import Hero from "@/components/modules/homepage/Hero";
import NewsletterSection from "@/components/modules/homepage/NewsletterSection";
import ProjectCategories from "@/components/modules/homepage/ProjectCategories";
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
      {/* 1. Hero Section with 60-70% height constraint, interactive slider & visual flow */}
      <Hero />
      {/* 2. Ecosystem / Social Proof */}
      <SocialProof />
      {/* 3. Core Features */}
      <Features />
      {/* 4. Core Listing / Card Section (4 cards per row, image, title, desc, meta, View Details, skeleton loader) */}
      <CoreListingSection />
      {/* 5. Interactive Sprint Lifecycle */}
      <WorkflowInteractive />
      {/* 5. Project Categories & Agile Frameworks */}
      <ProjectCategories />
      {/* 6. Deep-Dive Feature Spotlight & Blocker Radar */}
      <FeatureHighlight />
      {/* 7. Role-Based RBAC Showcase */}
      <RoleShowcase />
      {/* 8. Impact & Velocity Statistics */}
      <StatsMetrics />
      {/* 9. Verified Customer Testimonials */}
      <Testimonials />
      {/* 10. Engineering Insights & Blog Articles */}
      <BlogInsights />
      {/* 11. Frequently Asked Questions */}
      <FaqSection />
      {/* 12. Sprint Digest Newsletter */}
      <NewsletterSection />
      {/* 13. Conversion Call to Action */}
      <CallToAction />
    </main>
  );
}
