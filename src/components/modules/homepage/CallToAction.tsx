import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="bg-linear-to-b from-card to-muted/40 py-24">
      <div className="mx-auto max-w-5xl px-5 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
          <ShieldCheck className="size-4" />
          <span>Evaluation Ready · 1-Click Demo Logins</span>
        </div>
        <h2 className="mt-6 font-heading text-4xl font-extrabold sm:text-5xl tracking-tight text-foreground">
          Ready to experience frictionless sprint delivery?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed">
          Join thousands of high-velocity engineering teams. Set up your
          workspace in under 60 seconds or evaluate immediately with demo
          accounts.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all"
          >
            <span>Create Free Workspace</span>
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground hover:bg-accent transition-all"
          >
            <span>Try 1-Click Demo Login</span>
          </Link>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          No credit card required · Free tier available · Stripe Test mode
          supported
        </p>
      </div>
    </section>
  );
}
