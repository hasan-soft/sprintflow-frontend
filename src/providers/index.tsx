"use client";

import type { ReactNode } from "react";
import { Toaster } from "sonner";
import QueryProvider from "./query.provider";
import GoogleProvider from "./google.provider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <GoogleProvider>
      <QueryProvider>
        {children}
        <Toaster position="top-right" richColors />
      </QueryProvider>
    </GoogleProvider>
  );
}
