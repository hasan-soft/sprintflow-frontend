"use client";

import { ArrowUp, Clock, Globe, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import AIChatbot from "@/components/modules/chatbot/AIChatbot";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border/80 bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-5 pt-14 pb-10 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 border-b border-border/60 pb-10 sm:flex-row sm:items-center">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-heading text-xl font-bold tracking-tight"
          >
            <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-xs">
              SF
            </span>
            <span>SprintFlow</span>
          </Link>
          <p className="text-xs text-muted-foreground sm:text-sm font-medium">
            Agile project planning and execution that genuinely works for
            engineering squads.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li>
                <Link
                  href="/about-us"
                  className="transition hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/features"
                  className="transition hover:text-primary"
                >
                  Features & Tools
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="transition hover:text-primary">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition hover:text-primary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li>
                <Link href="/login" className="transition hover:text-primary">
                  Workspace Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="transition hover:text-primary"
                >
                  Create Workspace
                </Link>
              </li>
              <li>
                <Link href="/help" className="transition hover:text-primary">
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="transition hover:text-primary font-medium text-foreground"
                >
                  Explore Workspaces
                </Link>
              </li>
              <li>
                <Link
                  href="/features"
                  className="transition hover:text-primary"
                >
                  Sprint Kanban
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4 lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Contact & Support
            </h4>
            <ul className="space-y-3 text-xs text-muted-foreground">
              <li className="flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-lg border border-border/80 bg-muted/40 text-primary shrink-0">
                  <Mail className="size-3.5" />
                </span>
                <a
                  href="mailto:support@sprintflow.dev"
                  className="transition hover:text-primary font-mono text-[11px]"
                >
                  support@sprintflow.dev
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-lg border border-border/80 bg-muted/40 text-primary shrink-0">
                  <Phone className="size-3.5" />
                </span>
                <a
                  href="tel:+18004128900"
                  className="transition hover:text-primary font-mono text-[11px]"
                >
                  +1 (800) 412-8900
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-lg border border-border/80 bg-muted/40 text-primary shrink-0">
                  <MapPin className="size-3.5" />
                </span>
                <span>Silicon Valley, CA, United States</span>
              </li>
              <li className="flex items-center gap-3 pt-1 text-[11px]">
                <span className="flex size-7 items-center justify-center rounded-lg border border-border/80 bg-muted/40 text-primary shrink-0">
                  <Clock className="size-3.5" />
                </span>
                <span>
                  Mon – Fri, 9:00 AM – 6:00 PM PST (Live chat support)
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card px-3.5 py-1.5 text-xs font-medium text-foreground shadow-2xs">
                <Globe className="size-3.5 text-muted-foreground" />
                <span>English (US)</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Connect With Us
              </p>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="flex size-8 items-center justify-center rounded-lg border border-border/80 bg-muted/40 text-muted-foreground transition hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                >
                  <svg
                    className="size-3.5 fill-current"
                    viewBox="0 0 24 24"
                    role="img"
                  >
                    <title>GitHub</title>
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="flex size-8 items-center justify-center rounded-lg border border-border/80 bg-muted/40 text-muted-foreground transition hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                >
                  <svg
                    className="size-3.5 fill-current"
                    viewBox="0 0 24 24"
                    role="img"
                  >
                    <title>LinkedIn</title>
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8Z" />
                  </svg>
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X (formerly Twitter)"
                  className="flex size-8 items-center justify-center rounded-lg border border-border/80 bg-muted/40 text-muted-foreground transition hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                >
                  <svg
                    className="size-3.5 fill-current"
                    viewBox="0 0 24 24"
                    role="img"
                  >
                    <title>X (formerly Twitter)</title>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="flex size-8 items-center justify-center rounded-lg border border-border/80 bg-muted/40 text-muted-foreground transition hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                >
                  <svg
                    className="size-3.5 fill-current"
                    viewBox="0 0 24 24"
                    role="img"
                  >
                    <title>YouTube</title>
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-border/60 pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© 2026 SprintFlow SaaS. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/privacy" className="transition hover:text-foreground">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="transition hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/help" className="transition hover:text-foreground">
              Cookies Settings
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-primary hover:underline cursor-pointer ml-auto sm:ml-0"
            >
              <span>Back to top</span>
              <ArrowUp className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
      <AIChatbot />
    </footer>
  );
}
