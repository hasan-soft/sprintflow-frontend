"use client";

import { useForm } from "@tanstack/react-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Field, FieldLabel } from "../ui/field";
import {loginSchema} from "@/validation"

export default function LoginForm() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators : {
      onSubmit: loginSchema,
    },

    onSubmit: async ({ value }) => {
      console.log("SUBMITTED:", value);
    },
  });

  return (
    <div>
      <p>Login</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();

          console.log("FORM EVENT FIRED");

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

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
