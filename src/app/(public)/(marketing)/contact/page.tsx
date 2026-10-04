"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.email("Enter a valid email address."),
  message: z.string().min(12, "Tell us a little more about what you need."),
});
type ContactValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });
  function submit(values: ContactValues) {
    setSubmitted(true);
    toast.success(
      `Thanks, ${values.name}. Your message is ready for our team.`,
    );
    form.reset();
  }
  return (
    <main className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[0.8fr_1.2fr]">
      <header className="max-w-md">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Contact
        </p>
        <h1 className="mt-4 font-heading text-4xl font-semibold">
          Let’s make your workflow clearer.
        </h1>
        <p className="mt-5 text-sm leading-7 text-muted-foreground">
          Tell us what your team is trying to improve. We will help you find a
          sensible place to start.
        </p>
      </header>
      <form
        className="space-y-5 border bg-card p-6"
        onSubmit={form.handleSubmit(submit)}
      >
        <div>
          <label className="text-sm font-medium" htmlFor="contact-name">
            Name
          </label>
          <input
            className="mt-2 h-11 w-full border bg-background px-3 text-sm"
            id="contact-name"
            {...form.register("name")}
          />
          {form.formState.errors.name && (
            <p className="mt-1 text-xs text-destructive">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="contact-email">
            Work email
          </label>
          <input
            className="mt-2 h-11 w-full border bg-background px-3 text-sm"
            id="contact-email"
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
          <label className="text-sm font-medium" htmlFor="contact-message">
            How can we help?
          </label>
          <textarea
            className="mt-2 min-h-36 w-full border bg-background p-3 text-sm"
            id="contact-message"
            {...form.register("message")}
          />
          {form.formState.errors.message && (
            <p className="mt-1 text-xs text-destructive">
              {form.formState.errors.message.message}
            </p>
          )}
        </div>
        <button
          className="bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          type="submit"
        >
          Send message
        </button>
        {submitted && (
          <p aria-live="polite" className="text-sm text-emerald-700">
            Your message has been recorded in this demo.
          </p>
        )}
      </form>
    </main>
  );
}
