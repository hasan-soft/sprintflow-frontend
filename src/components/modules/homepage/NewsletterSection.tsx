"use client";

import { Check, CheckCircle2, Mail, Send } from "lucide-react";
import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid work email address.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
    }, 600);
  };

  return (
    <section className="border-b bg-card/50 py-20">
      <div className="mx-auto max-w-5xl px-5">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-linear-to-br from-primary/10 via-card to-background p-8 sm:p-12 shadow-sm">
          {/* Subtle decoration */}
          <div className="pointer-events-none absolute -right-12 -top-12 size-60 rounded-full bg-primary/15 blur-2xl" />

          <div className="mx-auto max-w-2xl text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
              <Mail className="size-3.5" />
              <span>The Sprint Digest · Published Every Tuesday</span>
            </div>

            <h2 className="font-heading text-3xl font-bold sm:text-4xl text-foreground tracking-tight">
              Actionable agile playbooks delivered to your inbox
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Join over 14,000+ engineering leads, scrum masters, and product
              managers. Receive curated sprint templates, capacity benchmarks,
              and blocker elimination guides.
            </p>

            {/* Interactive Form */}
            {subscribed ? (
              <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-5 text-center space-y-2 animate-in fade-in duration-300">
                <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm sm:text-base">
                  <CheckCircle2 className="size-5" />
                  <span>You are subscribed to The Sprint Digest!</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  We have sent our{" "}
                  <strong className="text-foreground">
                    2026 Agile Velocity Benchmark PDF
                  </strong>{" "}
                  directly to{" "}
                  <code className="font-mono text-primary font-semibold">
                    {email}
                  </code>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubscribed(false);
                    setEmail("");
                  }}
                  className="mt-2 text-xs font-semibold text-primary hover:underline cursor-pointer"
                >
                  Subscribe another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-2">
                <div className="mx-auto flex max-w-md flex-col gap-2 sm:flex-row">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="Enter your work email (e.g. alex@company.com)"
                    className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-xs sm:text-sm text-foreground shadow-2xs placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <span>{loading ? "Subscribing..." : "Subscribe Free"}</span>
                    <Send className="size-3.5" />
                  </button>
                </div>

                {error && (
                  <p className="text-xs font-medium text-destructive pt-1">
                    {error}
                  </p>
                )}
              </form>
            )}

            {/* Perks & Trust Badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-5 pt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Check className="size-3.5 text-primary" />
                No spam ever
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Check className="size-3.5 text-primary" />
                1-Click unsubscribe
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Check className="size-3.5 text-primary" />
                Includes free PDF guide
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
