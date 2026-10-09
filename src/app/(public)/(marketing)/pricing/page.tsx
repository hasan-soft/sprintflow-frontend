import type { Metadata } from "next";
import PricingClient from "./pricing-client";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for teams of any size. Start with SprintFlow and upgrade when you are ready.",
  openGraph: {
    title: "Pricing | SprintFlow",
    description:
      "Simple, transparent pricing for teams of any size. Start with SprintFlow and upgrade when you are ready.",
    url: "/pricing",
  },
};

export default function PricingPage() {
  return <PricingClient />;
}
