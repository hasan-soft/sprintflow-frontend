import type { Metadata } from "next";
import ContactForm from "@/components/form/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the SprintFlow team. We will help you find a sensible place to start improving your workflow.",
  openGraph: {
    title: "Contact | SprintFlow",
    description:
      "Get in touch with the SprintFlow team. We will help you find a sensible place to start improving your workflow.",
    url: "/contact",
  },
};

export default function ContactPage() {
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
      <ContactForm />
    </main>
  );
}
