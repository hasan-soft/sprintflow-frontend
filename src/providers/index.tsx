"use client"

import { ReactNode } from "react";
import QueryProvider from "./query.provider";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: ReactNode }) {
  return <QueryProvider>{children}<Toaster position="top-right" richColors /></QueryProvider>;
}
