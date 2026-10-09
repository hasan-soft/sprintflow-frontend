"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does the 3-role permission system work?",
      a: "SprintFlow provides dedicated dashboards for Admins (billing, user permissions, analytics), Managers (projects, budgets, sprint planning), and Members (Kanban task boards, personal activity). All route transitions are guarded on both Server Components and client state.",
    },
    {
      q: "Can I evaluate the platform without signing up?",
      a: "Yes! On our Login page, we feature 1-Click Demo Login buttons for Admin, Manager, and Member roles so evaluators can inspect each workflow instantly with preloaded mock data.",
    },
    {
      q: "How is Stripe payment integrated?",
      a: "We use Stripe Test Mode with verified checkout sessions. Admins can select an organization, choose Pro ($29/mo) or Enterprise ($99/mo) plans, and trigger full success and cancellation redirects.",
    },
    {
      q: "Does SprintFlow support URL state synchronization?",
      a: "Yes. All task filters, search queries, pagination, and status filters update the browser query parameters (useSearchParams) so views are shareable and bookmarkable.",
    },
    {
      q: "What tech stack powers SprintFlow?",
      a: "SprintFlow is built on Next.js 16 App Router, TypeScript, Tailwind CSS, TanStack Query, Zustand, dnd-kit, Recharts, and Sonner notifications.",
    },
  ];

  return (
    <section className="border-b bg-background py-20">
      <div className="mx-auto max-w-4xl px-5">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Got Questions?
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-muted-foreground">
            Everything you need to know about SprintFlow features, architecture, and billing.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="rounded-xl border border-border/80 bg-card overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-foreground hover:bg-muted/40 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`size-4 text-muted-foreground transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
