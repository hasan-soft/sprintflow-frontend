import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import GoogleLoginButton from "@/components/form/google-login";
import RegisterForm from "@/components/form/register-form";
import Header from "@/components/layout/public/Header";

export const metadata: Metadata = {
  title: "Create an Account",
  description:
    "Set up your profile to start planning projects and running sprints with SprintFlow.",
  openGraph: {
    title: "Create an Account | SprintFlow",
    description:
      "Set up your profile to start planning projects and running sprints with SprintFlow.",
    url: "/register",
  },
};

export default function RegisterPage() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/*  Navbar */}
      <Header />

      <main className="flex flex-1 min-h-0 w-full items-center justify-center p-2 sm:p-4">
        <div className="grid h-full w-full max-w-7xl overflow-hidden rounded-2xl border border-border/60 bg-card shadow-lg lg:grid-cols-2">
          {/* Left Column */}
          <div className="relative hidden h-full w-full overflow-hidden bg-muted lg:block">
            <Image
              src="/register.png"
              alt="SprintFlow — Your ideas. Our tools. A better tomorrow."
              fill
              className="h-full w-full object-cover object-center"
              priority
            />
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-between overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="mx-auto w-full max-w-md space-y-4">
              {/* Card Header */}
              <div className="space-y-1 text-center lg:text-left">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Create an account
                </p>
                <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Start your workspace
                </h1>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  Set up your profile to start planning with SprintFlow.
                </p>
              </div>

              {/* Main Register Form */}
              <RegisterForm />

              {/* Divider */}
              <div className="relative flex items-center justify-center my-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/80" />
                </div>
                <span className="relative bg-card px-2 text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                  Or sign up with
                </span>
              </div>

              {/* Social Login Button */}
              <div className="flex justify-center">
                <GoogleLoginButton />
              </div>

              {/* Login Link */}
              <p className="text-center text-xs text-muted-foreground pt-1">
                Already have an account?{" "}
                <Link
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                  href="/login"
                >
                  Log in
                </Link>
              </p>
            </div>

            {/* Footer Notice */}
            <p className="mt-4 text-center text-[11px] text-muted-foreground">
              © 2026 SprintFlow · All rights reserved
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
