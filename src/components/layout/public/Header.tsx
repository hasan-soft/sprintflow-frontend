"use client";

import { useQueryClient } from "@tanstack/react-query";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import {
  Briefcase,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Shield,
  User,
  UserCheck,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useAuthMe, useLogout } from "@/hooks/auth.hook";
import type { UserRole } from "@/types";
import { getInitials } from "@/utils";

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

  const roleLabels: Record<UserRole, { label: string; icon: typeof Shield; color: string }> = {
    ADMIN: {
      label: "Admin",
      icon: Shield,
      color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    MANAGER: {
      label: "Manager",
      icon: Briefcase,
      color: "border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400",
    },
    MEMBER: {
      label: "Member",
      icon: UserCheck,
      color: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
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
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 120) {
      setHidden(true);
      setMobileMenuOpen(false);
      setUserDropdownOpen(false);
    } else {
      setHidden(false);
    }
  });

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Logged out successfully");
        queryClient.clear();
        setUserDropdownOpen(false);
      },
      onError: (error) => {
        toast.error(error instanceof Error ? error.message : "Logout failed");
      },
    });
  };

  const RoleIcon = role ? roleLabels[role]?.icon : null;

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-110%", opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed inset-x-0 top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md backdrop-saturate-150 supports-backdrop-filter:bg-background/70 shadow-xs"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-lg font-bold tracking-tight transition-transform active:scale-95"
        >
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold shadow-xs">
            SF
          </span>
          <span>SprintFlow</span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden items-center gap-1 rounded-full border border-border/60 bg-muted/40 p-1 shadow-xs md:flex">
          {routes.map((route) => {
            const isActive = pathname === route.url;
            return (
              <Link
                key={route.url}
                href={route.url}
                className={`relative rounded-full px-3.5 py-1 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-background font-semibold text-primary shadow-xs"
                    : "text-muted-foreground hover:bg-background/60 hover:text-foreground"
                }`}
              >
                {route.name}
              </Link>
            );
          })}

          {role && (
            <Link
              href={dashboardRoute[role]}
              className={`flex items-center gap-1 rounded-full px-3.5 py-1 text-xs font-medium transition-all ${
                pathname.startsWith(dashboardRoute[role])
                  ? "bg-background font-semibold text-primary shadow-xs"
                  : "text-muted-foreground hover:bg-background/60 hover:text-foreground"
              }`}
            >
              <LayoutDashboard className="size-3" />
              <span>Dashboard</span>
            </Link>
          )}
        </nav>

        {/* Right CTA / Auth Status */}
        <div className="hidden items-center gap-3 sm:flex">
          {isLoading ? (
            <div className="h-8 w-24 animate-pulse rounded-xl bg-muted/60" />
          ) : user ? (
            /* Logged In State: Profile Badge + Dropdown */
            <div className="relative">
              {(() => {
                const avatar =
                  user.avatarUrl || user.picture || user.image || user.avatar;
                return (
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2.5 rounded-full border border-border/80 bg-card/80 py-1 pl-1.5 pr-3 shadow-2xs hover:border-primary/40 hover:bg-muted/50 transition-all cursor-pointer"
                  >
                    {avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={avatar}
                        alt={user.name || "User Avatar"}
                        className="size-7 rounded-full object-cover ring-1 ring-primary/20"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="flex size-7 items-center justify-center rounded-full bg-primary/15 font-semibold text-primary text-xs font-heading">
                        {getInitials(user.name || user.email || "User")}
                      </div>
                    )}
                    <div className="flex flex-col text-left text-xs leading-none">
                      <span className="font-semibold text-foreground max-w-28 truncate">
                        {user.name || "My Account"}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-mono mt-0.5">
                        {role ? roleLabels[role]?.label : "User"}
                      </span>
                    </div>
                    <ChevronDown className="size-3.5 text-muted-foreground transition-transform" />
                  </button>
                );
              })()}

              {/* User Dropdown */}
              <AnimatePresence>
                {userDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-11 w-60 rounded-2xl border border-border/80 bg-popover p-2 text-popover-foreground shadow-lg backdrop-blur-xl z-50 space-y-1"
                  >
                    {/* User Summary with Avatar */}
                    {(() => {
                      const avatar =
                        user.avatarUrl || user.picture || user.image || user.avatar;
                      return (
                        <div className="border-b border-border/60 px-3 py-2.5 flex items-center gap-2.5">
                          {avatar ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={avatar}
                              alt={user.name || "User Avatar"}
                              className="size-9 rounded-full object-cover ring-1 ring-primary/20 shrink-0"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="flex size-9 items-center justify-center rounded-full bg-primary/15 font-semibold text-primary text-xs shrink-0">
                              {getInitials(user.name || user.email || "User")}
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-foreground truncate">
                              {user.name}
                            </p>
                            <p className="text-[11px] text-muted-foreground truncate font-mono">
                              {user.email}
                            </p>
                            {role && (
                              <div
                                className={`mt-1 inline-flex items-center gap-1 rounded-full border px-2 py-0.2 text-[9px] font-semibold ${roleLabels[role]?.color}`}
                              >
                                {RoleIcon && <RoleIcon className="size-2.5" />}
                                <span>{roleLabels[role]?.label} Role</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Actions */}
                    {role && (
                      <Link
                        href={dashboardRoute[role]}
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-foreground hover:bg-accent transition-colors"
                      >
                        <LayoutDashboard className="size-3.5 text-primary" />
                        <span>Go to {roleLabels[role]?.label} Dashboard</span>
                      </Link>
                    )}

                    <Link
                      href="/member/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-foreground hover:bg-accent transition-colors"
                    >
                      <User className="size-3.5 text-muted-foreground" />
                      <span>Profile & Settings</span>
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={logoutLoading}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut className="size-3.5" />
                      <span>{logoutLoading ? "Logging out..." : "Log out"}</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Logged Out State: Login + Register CTAs */
            <>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-xl px-3.5 text-xs font-semibold hover:bg-muted"
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
                className="rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-xs shadow-primary/20 hover:bg-primary/90"
                render={<Link href="/register">Get Started</Link>}
                nativeButton={false}
              />
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex size-9 items-center justify-center rounded-xl border border-border/70 bg-background/80 text-foreground shadow-xs"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="space-y-4 border-t border-border/50 bg-background/95 px-5 py-4 shadow-lg backdrop-blur-xl sm:hidden"
          >
            {/* User card in mobile drawer if logged in */}
            {user &&
              (() => {
                const avatar =
                  user.avatarUrl || user.picture || user.image || user.avatar;
                return (
                  <div className="flex items-center gap-3 rounded-xl border border-border/70 bg-muted/40 p-3">
                    {avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={avatar}
                        alt={user.name || "User Avatar"}
                        className="size-10 rounded-full object-cover ring-1 ring-primary/20 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="flex size-10 items-center justify-center rounded-full bg-primary/15 font-semibold text-primary text-xs shrink-0">
                        {getInitials(user.name || user.email || "U")}
                      </div>
                    )}
                    <div className="min-w-0 flex-1 text-xs">
                      <p className="font-semibold text-foreground truncate">
                        {user.name}
                      </p>
                      <p className="text-muted-foreground truncate font-mono text-[11px]">
                        {user.email}
                      </p>
                    </div>
                    {role && (
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${roleLabels[role]?.color}`}
                      >
                        {roleLabels[role]?.label}
                      </span>
                    )}
                  </div>
                );
              })()}

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
                  className="rounded-xl px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/10 flex items-center gap-2"
                >
                  <LayoutDashboard className="size-4" />
                  <span>Go to {roleLabels[role]?.label} Dashboard</span>
                </Link>
              )}
            </nav>

            <div className="flex flex-col gap-2 border-t border-border/40 pt-3">
              {!isLoading && !user && (
                <>
                  <Button
                    variant="outline"
                    className="w-full justify-center rounded-xl text-xs"
                    render={<Link href="/login">Login</Link>}
                    nativeButton={false}
                  />
                  <Button
                    className="w-full justify-center rounded-xl text-xs"
                    render={<Link href="/register">Get Started</Link>}
                    nativeButton={false}
                  />
                </>
              )}

              {!isLoading && user && (
                <Button
                  variant="destructive"
                  className="w-full justify-center rounded-xl text-xs gap-1.5"
                  onClick={handleLogout}
                >
                  <LogOut className="size-3.5" />
                  <span>Logout</span>
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

