"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.email("Enter a valid work email address."),
  message: z.string().min(12, "Please provide at least 12 characters explaining your inquiry."),
});

type ContactValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function submit(values: ContactValues) {
    setLoading(true);
    // Simulate network submission
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setSubmitted(true);
    toast.success(`Thanks, ${values.name}. Your message has been received.`);
    form.reset();
  }

  return (
    <form
      className="space-y-5 rounded-xl border border-border/80 bg-card p-6 shadow-xs"
      onSubmit={form.handleSubmit(submit)}
    >
      <div>
        <label className="text-xs font-semibold tracking-wide text-foreground" htmlFor="contact-name">
          Full Name
        </label>
        <input
          className="mt-1.5 h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:opacity-60"
          id="contact-name"
          placeholder="Alex Morgan"
          disabled={loading}
          {...form.register("name")}
        />
        {form.formState.errors.name && (
          <p className="mt-1 text-xs text-destructive">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-xs font-semibold tracking-wide text-foreground" htmlFor="contact-email">
          Work Email
        </label>
        <input
          className="mt-1.5 h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:opacity-60"
          id="contact-email"
          type="email"
          placeholder="alex@company.com"
          disabled={loading}
          {...form.register("email")}
        />
        {form.formState.errors.email && (
          <p className="mt-1 text-xs text-destructive">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-xs font-semibold tracking-wide text-foreground" htmlFor="contact-message">
          How can we help your team?
        </label>
        <textarea
          className="mt-1.5 min-h-36 w-full rounded-xl border border-input bg-background p-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:opacity-60"
          id="contact-message"
          placeholder="Tell us about your team size, agile workflow requirements, or questions..."
          disabled={loading}
          {...form.register("message")}
        />
        {form.formState.errors.message && (
          <p className="mt-1 text-xs text-destructive">
            {form.formState.errors.message.message}
          </p>
        )}
      </div>

      <button
        className="flex h-10.5 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-xs transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={15} />
            <span>Sending message...</span>
          </>
        ) : (
          <>
            <Send size={15} />
            <span>Send message</span>
          </>
        )}
      </button>

      {submitted && (
        <div
          aria-live="polite"
          className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs font-medium text-emerald-700 dark:text-emerald-400"
        >
          <CheckCircle2 className="size-4 shrink-0" />
          <span>Your message has been received! Our team will get back to you shortly.</span>
        </div>
      )}
    </form>
  );
}
