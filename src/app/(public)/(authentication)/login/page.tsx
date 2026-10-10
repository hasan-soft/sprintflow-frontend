import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DemoLogin from "@/components/form/demo-login";
import GoogleLoginButton from "@/components/form/google-login";
import LoginForm from "@/components/form/login-form";
import Header from "@/components/layout/public/Header";

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
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navbar */}
      <Header />

      <main className="flex flex-1 items-center justify-center p-4 pt-20 sm:p-6 sm:pt-24 lg:p-8 lg:pt-24">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-border/60 bg-card shadow-lg lg:grid-cols-2">
          <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
            <div className="mx-auto w-full max-w-md space-y-4">
              {/* Card Header */}
              <div className="space-y-1 text-center lg:text-left">
                <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Welcome Back
                </h1>
                <p className="text-sm text-muted-foreground sm:text-sm">
                  Login to your workspace to keep your team sprints on track.
                </p>
              </div>

              {/* Main Form */}
              <LoginForm />

              {/* Divider */}
              <div className="relative flex items-center justify-center my-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/80" />
                </div>
                <span className="relative bg-card px-2 text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                  Or continue with
                </span>
              </div>

              {/* Social Login Button */}
              <div className="flex justify-center">
                <GoogleLoginButton />
              </div>

              {/* Demo Credential */}
              <div className="rounded-lg border border-border/80 bg-muted/30 p-3">
                <DemoLogin />
              </div>

              {/* Registration Link */}
              <p className="text-center text-xs text-muted-foreground pt-1">
                Don&apos;t have an account?{" "}
                <Link
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                  href="/register"
                >
                  Create an account
                </Link>
              </p>
            </div>

            {/* Footer Notice */}
            <p className="mt-4 text-center text-[11px] text-muted-foreground">
              © 2026 SprintFlow · All rights reserved
            </p>
          </div>

          {/* Right Column */}
          <div className="relative hidden h-full min-h-[520px] w-full overflow-hidden bg-muted lg:block">
            <Image
              src="/login.png"
              alt="SprintFlow — Better planning. Greater results."
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-full w-full object-cover object-center"
              priority
            />
          </div>
        </div>
      </main>
    </div>
  );
}
