import { ArrowLeft, Zap } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DemoLogin from "@/components/form/demo-login";
import GoogleLoginButton from "@/components/form/google-login";
import LoginForm from "@/components/form/login-form";

export const metadata: Metadata = {
  title: "Log In",
  description:
    "Sign in to your SprintFlow workspace to keep your projects and sprints moving.",
  openGraph: {
    title: "Log In | SprintFlow",
    description:
      "Sign in to your SprintFlow workspace to keep your projects and sprints moving.",
    url: "/login",
  },
};

export default function LoginPage() {
  return (
    <div className="min-h-svh bg-[#f6f8f7] lg:grid lg:grid-cols-2">
      <section className="flex min-h-svh flex-col px-6 py-6 sm:px-10 sm:py-8 lg:px-12 xl:px-16">
        <header className="flex items-center justify-between">
          <Link className="group inline-flex items-center gap-2.5" href="/">
            <span className="grid size-9 place-items-center bg-[#143c42] text-white transition group-hover:bg-[#0e3035]">
              <Zap aria-hidden="true" size={17} fill="currentColor" />
            </span>
            <span className="font-heading text-lg font-bold tracking-tight text-[#142c31]">
              SprintFlow
            </span>
          </Link>
          <Link
            className="inline-flex items-center gap-1.5 text-sm text-[#607277] transition hover:text-[#143c42]"
            href="/"
          >
            <ArrowLeft aria-hidden="true" size={15} />
            Back to site
          </Link>
        </header>

        <main className="flex flex-1 items-center justify-center py-10 sm:py-12">
          <div className="w-full max-w-105">
            <div className="mb-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#28716e]">
                Workspace access
              </p>
              <h1 className="mt-3 font-heading text-4xl font-semibold leading-tight text-[#142c31]">
                Welcome back.
              </h1>
              <p className="mt-2 text-sm leading-6 text-[#68797c]">
                Sign in to keep your projects moving.
              </p>
            </div>
            <LoginForm />
            <div className="my-5 flex items-center gap-3" aria-hidden="true">
              <span className="h-px flex-1 bg-[#dbe3e1]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#829093]">
                Or continue with
              </span>
              <span className="h-px flex-1 bg-[#dbe3e1]" />
            </div>
            <div className="flex justify-center rounded-md border border-[#dbe3e1] bg-white px-3 py-2.5">
              <GoogleLoginButton />
            </div>
            <DemoLogin />
          </div>
        </main>

        <footer className="flex justify-between gap-4 text-xs text-[#849195]">
          <span>© 2026 SprintFlow</span>
          <Link className="hover:text-[#143c42]" href="/privacy">
            Privacy
          </Link>
        </footer>
      </section>

      <aside
        className="relative hidden min-h-svh overflow-hidden bg-[#d9e7e8] lg:block"
        aria-label="SprintFlow workspace preview"
      >
        <Image
          src="/login.png"
          alt="A team member planning and tracking work in SprintFlow"
          fill
          priority
          sizes="50vw"
          className="object-cover object-[center_15%]"
        />
      </aside>
    </div>
  );
}
