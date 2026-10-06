"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Lock, Mail, User, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useRegistration } from "@/hooks";

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

export default function RegisterForm() {
  const router = useRouter();
  const registration = useRegistration();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  async function register(values: RegisterValues) {
    try {
      const result = await registration.mutateAsync({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      toast.success(result.message ?? `Account created for ${values.email}`);
      router.push("/account-verify");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to create the account.",
      );
    }
  }

  const isLoading = form.formState.isSubmitting || registration.isPending;

  return (
    <form className="space-y-3.5" onSubmit={form.handleSubmit(register)}>
      {/* Full Name */}
      <div className="space-y-1">
        <label
          className="text-xs font-semibold tracking-wide text-foreground"
          htmlFor="register-name"
        >
          Full name
        </label>
        <div className="relative">
          <User
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            autoComplete="name"
            className="h-10.5 w-full rounded-md border border-input bg-background pl-9.5 pr-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
            id="register-name"
            placeholder="name here"
            type="text"
            {...form.register("name")}
          />
        </div>
        {form.formState.errors.name && (
          <p className="text-xs text-destructive">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      {/* Email Address */}
      <div className="space-y-1">
        <label
          className="text-xs font-semibold tracking-wide text-foreground"
          htmlFor="register-email"
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
            id="register-email"
            placeholder="email here"
            type="email"
            {...form.register("email")}
          />
        </div>
        {form.formState.errors.email && (
          <p className="text-xs text-destructive">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1">
        <label
          className="text-xs font-semibold tracking-wide text-foreground"
          htmlFor="register-password"
        >
          Password
        </label>
        <div className="relative">
          <Lock
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            autoComplete="new-password"
            className="h-10.5 w-full rounded-md border border-input bg-background pl-9.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground/60 transition focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
            id="register-password"
            placeholder="at least 8 characters"
            type={showPassword ? "text" : "password"}
            {...form.register("password")}
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
        {form.formState.errors.password && (
          <p className="text-xs text-destructive">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-1">
        <label
          className="text-xs font-semibold tracking-wide text-foreground"
          htmlFor="register-confirm-password"
        >
          Confirm password
        </label>
        <div className="relative">
          <Lock
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            autoComplete="new-password"
            className="h-10.5 w-full rounded-md border border-input bg-background pl-9.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground/60 transition focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
            id="register-confirm-password"
            placeholder="re-enter password"
            type={showConfirmPassword ? "text" : "password"}
            {...form.register("confirmPassword")}
          />
          <button
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition p-1"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            type="button"
          >
            {showConfirmPassword ? (
              <EyeOff aria-hidden="true" size={16} />
            ) : (
              <Eye aria-hidden="true" size={16} />
            )}
          </button>
        </div>
        {form.formState.errors.confirmPassword && (
          <p className="text-xs text-destructive">
            {form.formState.errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary text-sm font-semibold tracking-wide text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 mt-2"
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" size={16} />
            <span>Creating account...</span>
          </>
        ) : (
          <>
            <UserPlus size={16} />
            <span>Create account</span>
          </>
        )}
      </button>
    </form>
  );
}
