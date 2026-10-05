"use client";

import type { ReactNode } from "react";
import { Toaster } from "sonner";
import GoogleProvider from "./google.provider";
import QueryProvider from "./query.provider";

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
