"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useLogin } from "@/hooks";
import { loginSchema } from "@/validation";
import { Button } from "../ui/button";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
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
        const result = await loginMutation.mutateAsync(value);
        toast.success("Signed in successfully");
        router.push(`/${String(result.role).toLowerCase()}`);
        router.refresh();
      } catch (submitError) {
        const message =
          submitError instanceof Error
            ? submitError.message
            : "Unable to sign in.";
        setError(message);
        toast.error(message);
      }
    },
  });

  return (
    <div>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();

          void form.handleSubmit();
        }}
      >
        {/* Email */}
        <form.Field name="email">
          {(field) => (
            <Field className="gap-1.5">
              <FieldLabel
                className="text-xs font-semibold normal-case tracking-normal text-[#334b50]"
                htmlFor={field.name}
              >
                Email address
              </FieldLabel>
              <Input
                className="h-11 rounded-md border border-[#d5dfdd] bg-white px-3 text-sm text-[#18383e] placeholder:text-[#97a5a6] focus-visible:border-[#28716e] focus-visible:ring-2 focus-visible:ring-[#28716e]/15"
                type="email"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                autoComplete="email"
              />
            </Field>
          )}
        </form.Field>

        {/* Password */}
        <form.Field name="password">
          {(field) => (
            <Field className="gap-1.5">
              <FieldLabel
                className="text-xs font-semibold normal-case tracking-normal text-[#334b50]"
                htmlFor={field.name}
              >
                Password
              </FieldLabel>
              <Input
                className="h-11 rounded-md border border-[#d5dfdd] bg-white px-3 text-sm text-[#18383e] placeholder:text-[#97a5a6] focus-visible:border-[#28716e] focus-visible:ring-2 focus-visible:ring-[#28716e]/15"
                type="password"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                autoComplete="current-password"
              />
            </Field>
          )}
        </form.Field>

        {error && (
          <p
            aria-live="polite"
            className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800"
          >
            {error}
          </p>
        )}
        <Button
          className="h-11 w-full rounded-md bg-[#174d50] text-sm font-semibold tracking-normal text-white normal-case shadow-sm hover:bg-[#103d40]"
          disabled={loginMutation.isPending}
          type="submit"
        >
          {loginMutation.isPending ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
