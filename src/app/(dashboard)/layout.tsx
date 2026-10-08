"use client";

import { useAuthMe } from "@/hooks/auth.hook";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: response, isLoading } = useAuthMe();
  const router = useRouter();
  const pathname = usePathname();

  const user = response && "data" in response ? response.data : response;

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
      return;
    }

    if (user) {
      if (pathname.startsWith("/admin") && user.role !== "ADMIN") {
        router.push("/member");
      } else if (pathname.startsWith("/manager") && user.role !== "MANAGER") {
        router.push("/member");
      }
    }
  }, [user, isLoading, pathname, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-xs text-muted-foreground">
            Authenticating session...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}
