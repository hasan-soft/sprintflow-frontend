import { Globe, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
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
            Agile project planning and execution that genuinely works.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li>
                <Link href="/about-us" className="transition hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/features" className="transition hover:text-primary">
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
                <Link href="/register" className="transition hover:text-primary">
                  Create Workspace
                </Link>
              </li>
              <li>
                <Link href="/help" className="transition hover:text-primary">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/features" className="transition hover:text-primary">
                  Sprint Kanban
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4 lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Contact
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
                <span className="font-mono text-[11px]">+1 (800) 412-8900</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-lg border border-border/80 bg-muted/40 text-primary shrink-0">
                  <MapPin className="size-3.5" />
                </span>
                <span>Silicon Valley, CA, United States</span>
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
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="flex size-8 items-center justify-center rounded-lg border border-border/80 bg-muted/40 text-muted-foreground transition hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                >
                  <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8Z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="flex size-8 items-center justify-center rounded-lg border border-border/80 bg-muted/40 text-muted-foreground transition hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                >
                  <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="flex size-8 items-center justify-center rounded-lg border border-border/80 bg-muted/40 text-muted-foreground transition hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                >
                  <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="flex size-8 items-center justify-center rounded-lg border border-border/80 bg-muted/40 text-muted-foreground transition hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                >
                  <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
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
          </div>
        </div>
      </div>
    </footer>
  );
}

