"use client";

import { useForm } from "@tanstack/react-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Field, FieldLabel } from "../ui/field";
import {loginSchema} from "@/validation"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators : {
      onSubmit: loginSchema,
    },

    onSubmit: async ({ value }) => {
      setError("");
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(value),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error ?? "Unable to sign in.");
        toast.success("Signed in successfully");
        router.push(`/${String(result.role).toLowerCase()}`);
        router.refresh();
      } catch (submitError) {
        const message = submitError instanceof Error ? submitError.message : "Unable to sign in.";
        setError(message);
        toast.error(message);
      }
    },
  });

  return (
    <div>
      <p>Login</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();

          void form.handleSubmit();
        }}
      >
        {/* Email */}
        <form.Field name="email">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
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
            <Field>
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
              <Input
                type="password"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                autoComplete="current-password"
              />
            </Field>
          )}
        </form.Field>

        {error && <p aria-live="polite" className="text-sm text-destructive">{error}</p>}
        <Button className="w-full" type="submit">Sign in</Button>
      </form>
    </div>
  );
}
