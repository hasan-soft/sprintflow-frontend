import type { Metadata } from "next";
import Link from "next/link";
import RegisterForm from "@/components/form/register-form";

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
    <main className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-5 py-12">
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">
        Create an account
      </p>
      <h1 className="mt-3 font-heading text-3xl font-semibold">
        Start your workspace.
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Set up your profile to start planning with SprintFlow.
      </p>
      <RegisterForm />
      <p className="mt-5 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          className="font-medium text-foreground underline underline-offset-4"
          href="/login"
        >
          Log in
        </Link>
      </p>
    </main>
  );
}
