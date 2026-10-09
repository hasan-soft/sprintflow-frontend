"use client";

import { useQueryClient } from "@tanstack/react-query";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { LogOut, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useAuthMe, useLogout } from "@/hooks/auth.hook";
import type { UserRole } from "@/types";

export default function Header() {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const routes = [
    { name: "Home", url: "/" },
    { name: "Features", url: "/features" },
    { name: "Pricing", url: "/pricing" },
    { name: "About", url: "/about-us" },
  ];

  const dashboardRoute: Record<UserRole, string> = {
    ADMIN: "/admin",
    MANAGER: "/manager",
    MEMBER: "/member",
  };

  const { data: userResponse, isLoading } = useAuthMe();
  const { mutate: logout, isPending: logoutLoading } = useLogout();

  const user = userResponse
    ? "data" in userResponse
      ? userResponse.data
      : userResponse
    : null;

  const role: UserRole | undefined = user?.role;

  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // latest Parameter Type Explicitly Defined as number
  useMotionValueEvent(scrollY, "change", (latest: number) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 120) {
      setHidden(true);
      setMobileMenuOpen(false);
    } else {
      setHidden(false);
    }
  });

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Logged out successfully");
        queryClient.clear();
      },
      onError: (error) => {
        toast.error(error instanceof Error ? error.message : "Logout failed");
      },
    });
  };

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-110%", opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed inset-x-0 top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-md backdrop-saturate-150 supports-backdrop-filter:bg-background/60 shadow-xs"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-lg font-bold transition-transform active:scale-95"
        >
          SprintFlow
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-border/50 bg-muted/40 px-3 py-1.5 shadow-xs md:flex">
          {routes.map((route) => {
            const isActive = pathname === route.url;
            return (
              <Link
                key={route.url}
                href={route.url}
                className={`relative rounded-full px-3.5 py-1 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-background font-semibold text-primary shadow-xs"
                    : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
                }`}
              >
                {route.name}
              </Link>
            );
          })}

          {role && (
            <Link
              href={dashboardRoute[role]}
              className={`rounded-full px-3.5 py-1 text-sm font-medium transition-all ${
                pathname.startsWith(dashboardRoute[role])
                  ? "bg-background font-semibold text-primary shadow-xs"
                  : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
              }`}
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="hidden items-center gap-2.5 sm:flex">
          {logoutLoading ? (
            <span className="animate-pulse px-3 text-xs font-medium text-muted-foreground">
              Logging out...
            </span>
          ) : (
            <>
              {!isLoading && !user && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl border-border/80 bg-background/80 px-4 text-sm font-semibold backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-muted/70"
                    render={
                      <Link href="/login" className="flex items-center gap-1.5">
                        <User className="size-3.5 text-primary" />
                        <span>Login</span>
                      </Link>
                    }
                    nativeButton={false}
                  />
                  <Button
                    size="sm"
                    className="rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-xs shadow-primary/20 transition-all hover:bg-primary/90"
                    render={<Link href="/register">Get started</Link>}
                    nativeButton={false}
                  />
                </>
              )}

              {!isLoading && user && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="gap-1.5 rounded-xl px-3.5 text-xs font-semibold shadow-xs"
                  onClick={handleLogout}
                >
                  <LogOut className="size-3.5" />
                  <span>Logout</span>
                </Button>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-2 sm:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex size-9 items-center justify-center rounded-xl border border-border/70 bg-background/80 text-foreground shadow-xs"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="size-4.5" />
            ) : (
              <Menu className="size-4.5" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="space-y-4 border-t border-border/50 bg-background/95 px-5 py-4 shadow-lg backdrop-blur-xl sm:hidden"
          >
            <nav className="flex flex-col gap-1.5">
              {routes.map((route) => (
                <Link
                  key={route.url}
                  href={route.url}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                    pathname === route.url
                      ? "bg-primary/10 font-bold text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {route.name}
                </Link>
              ))}

              {role && (
                <Link
                  href={dashboardRoute[role]}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/10"
                >
                  Dashboard
                </Link>
              )}
            </nav>

            <div className="flex flex-col gap-2 border-t border-border/40 pt-2">
              {!isLoading && !user && (
                <>
                  <Button
                    variant="outline"
                    className="w-full justify-center rounded-xl"
                    render={<Link href="/login">Login</Link>}
                    nativeButton={false}
                  />
                  <Button
                    className="w-full justify-center rounded-xl"
                    render={<Link href="/register">Get started</Link>}
                    nativeButton={false}
                  />
                </>
              )}

              {!isLoading && user && (
                <Button
                  variant="destructive"
                  className="w-full justify-center rounded-xl"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
