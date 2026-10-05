import type { Metadata } from "next";
import {
  EB_Garamond,
  Geist,
  Geist_Mono,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/providers";

const jetbrainsMonoHeading = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-heading",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://sprintflow.vercel.app",
  ),
  title: {
    default: "SprintFlow | Project work, in rhythm",
    template: "%s | SprintFlow",
  },
  description:
    "Plan projects, run focused sprints, and keep team delivery moving.",
  openGraph: {
    title: "SprintFlow | Project work, in rhythm",
    description:
      "Plan projects, run focused sprints, and keep team delivery moving.",
    siteName: "SprintFlow",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SprintFlow | Project work, in rhythm",
    description:
      "Plan projects, run focused sprints, and keep team delivery moving.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-serif",
        ebGaramond.variable,
        jetbrainsMonoHeading.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
