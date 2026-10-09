"use client";

import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff, Loader2, Lock, LogIn, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useLogin } from "@/hooks";
import { loginSchema } from "@/validation";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      setError("");
      try {
        await loginMutation.mutateAsync(value);
        toast.success("Signed in successfully");
        router.push("/");
        router.refresh();
      } catch (submitError) {
        const message =
          submitError instanceof Error
            ? submitError.message
            : "Unable to sign in. Please verify your credentials.";
        setError(message);
        toast.error(message);
      }
    },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
    >
      {/* Email Address */}
      <form.Field name="email">
        {(field) => (
          <div className="space-y-1.5">
            <label
              className="text-xs font-semibold tracking-wide text-foreground"
              htmlFor={field.name}
            >
              Email address
            </label>
            <div className="relative">
              <Mail
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <input
                autoComplete="email"
                className="h-10.5 w-full rounded-md border border-input bg-background pl-9.5 pr-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                id={field.name}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="email here"
                type="email"
                value={field.state.value}
              />
            </div>
            {field.state.meta.errors.length > 0 && (
              <p className="text-xs text-destructive">
                {String(field.state.meta.errors[0]?.message ?? "")}
              </p>
            )}
          </div>
        )}
      </form.Field>

      {/* Password */}
      <form.Field name="password">
        {(field) => (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                className="text-xs font-semibold tracking-wide text-foreground"
                htmlFor={field.name}
              >
                Password
              </label>
              <Link
                className="text-xs font-medium text-primary hover:underline underline-offset-4"
                href="/help"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <input
                autoComplete="current-password"
                className="h-10.5 w-full rounded-md border border-input bg-background pl-9.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground/60 transition focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                id={field.name}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="passwor here"
                type={showPassword ? "text" : "password"}
                value={field.state.value}
              />
              <button
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition p-1"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? (
                  <EyeOff aria-hidden="true" size={16} />
                ) : (
                  <Eye aria-hidden="true" size={16} />
                )}
              </button>
            </div>
            {field.state.meta.errors.length > 0 && (
              <p className="text-xs text-destructive">
                {String(field.state.meta.errors[0]?.message ?? "")}
              </p>
            )}
          </div>
        )}
      </form.Field>

      {error && (
        <div
          aria-live="polite"
          className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive"
        >
          {error}
        </div>
      )}

      {/* Login Button */}
      <button
        className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary text-sm font-semibold tracking-wide text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={loginMutation.isPending}
        type="submit"
      >
        {loginMutation.isPending ? (
          <>
            <Loader2 className="animate-spin" size={16} />
            <span>Signing in...</span>
          </>
        ) : (
          <>
            <LogIn size={16} />
            <span>Login in to account</span>
          </>
        )}
      </button>
    </form>
  );
}
