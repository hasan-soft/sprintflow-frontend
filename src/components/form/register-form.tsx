"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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

  return (
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
        disabled={form.formState.isSubmitting || registration.isPending}
        type="submit"
      >
        {form.formState.isSubmitting || registration.isPending
          ? "Creating account..."
          : "Create account"}
      </button>
    </form>
  );
}
