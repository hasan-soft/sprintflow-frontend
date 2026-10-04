"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const registerSchema = z
  .object({
    name: z.string().min(2, "Enter your name."),
    email: z.email("Enter a valid email address."),
    password: z.string().min(8, "Use at least 8 characters."),
    confirmPassword: z.string().min(8, "Confirm your password."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  async function register(values: RegisterValues) {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: values.name, email: values.email, password: values.password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Unable to create the account.");
      toast.success(result.message ?? `Account created for ${values.email}`);
      router.push("/account-verify");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to create the account.");
    }
  }

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
      <form
        className="mt-7 space-y-4 border bg-card p-6"
        onSubmit={form.handleSubmit(register)}
      >
        <div>
          <label className="text-sm font-medium" htmlFor="register-name">
            Full name
          </label>
          <input
            autoComplete="name"
            className="mt-2 h-11 w-full border bg-background px-3 text-sm"
            id="register-name"
            {...form.register("name")}
          />
          {form.formState.errors.name && (
            <p className="mt-1 text-xs text-destructive">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="register-email">
            Email address
          </label>
          <input
            autoComplete="email"
            className="mt-2 h-11 w-full border bg-background px-3 text-sm"
            id="register-email"
            type="email"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="mt-1 text-xs text-destructive">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="register-password">
            Password
          </label>
          <input
            autoComplete="new-password"
            className="mt-2 h-11 w-full border bg-background px-3 text-sm"
            id="register-password"
            type="password"
            {...form.register("password")}
          />
          {form.formState.errors.password && (
            <p className="mt-1 text-xs text-destructive">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>
        <div>
          <label
            className="text-sm font-medium"
            htmlFor="register-confirm-password"
          >
            Confirm password
          </label>
          <input
            autoComplete="new-password"
            className="mt-2 h-11 w-full border bg-background px-3 text-sm"
            id="register-confirm-password"
            type="password"
            {...form.register("confirmPassword")}
          />
          {form.formState.errors.confirmPassword && (
            <p className="mt-1 text-xs text-destructive">
              {form.formState.errors.confirmPassword.message}
            </p>
          )}
        </div>
        <button
          className="h-11 w-full bg-primary text-sm font-medium text-primary-foreground"
          disabled={form.formState.isSubmitting}
          type="submit"
        >
          {form.formState.isSubmitting ? "Creating account..." : "Create account"}
        </button>
      </form>
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
