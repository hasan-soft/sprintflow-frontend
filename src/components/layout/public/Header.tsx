"use client";

import { useQueryClient } from "@tanstack/react-query";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import {
  BookOpen,
  Briefcase,
  CheckSquare,
  ChevronDown,
  FolderGit2,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  type Shield,
  ShieldCheck,
  User,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import ThemeToggle from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { useAuthMe, useLogout } from "@/hooks/auth.hook";
import type { UserRole } from "@/types";
import { getInitials } from "@/utils";

export default function Header() {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  // Reference for dropdown menus to handle outside clicks
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const resourcesDropdownRef = useRef<HTMLDivElement>(null);

  // Scroll detection for sticky elevated visual state
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    setIsScrolled(latest > 10);
  });

  // Handle outside clicks and ESC key for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(target)
      ) {
        setUserDropdownOpen(false);
      }
      if (
        resourcesDropdownRef.current &&
        !resourcesDropdownRef.current.contains(target)
      ) {
        setResourcesOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setUserDropdownOpen(false);
        setResourcesOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    if (pathname) {
      setMobileMenuOpen(false);
      setUserDropdownOpen(false);
      setResourcesOpen(false);
    }
  }, [pathname]);

  const { data: userResponse, isLoading } = useAuthMe();
  const { mutate: logout, isPending: logoutLoading } = useLogout();

  const user = userResponse
    ? "data" in userResponse
      ? userResponse.data
      : userResponse
    : null;

  const role: UserRole | undefined = user?.role;

  const dashboardRoute: Record<UserRole, string> = {
    ADMIN: "/admin",
    MANAGER: "/manager",
    MEMBER: "/member",
  };

  const roleLabels: Record<
    UserRole,
    { label: string; icon: typeof Shield; color: string }
  > = {
    ADMIN: {
      label: "Admin",
      icon: ShieldCheck,
      color:
        "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    MANAGER: {
      label: "Manager",
      icon: Briefcase,
      color: "border-primary/30 bg-primary/10 text-primary",
    },
    MEMBER: {
      label: "Member",
      icon: UserCheck,
      color:
        "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
  };

  // Role-specific workspace quick links
  const roleWorkspaceLinks: Record<
    UserRole,
    { name: string; url: string; icon: typeof CheckSquare }
  > = {
    ADMIN: { name: "Users", url: "/admin/users", icon: Users },
    MANAGER: { name: "Projects", url: "/manager/projects", icon: FolderGit2 },
    MEMBER: { name: "Tasks", url: "/member/tasks", icon: CheckSquare },
  };

  interface NavRouteItem {
    name: string;
    url: string;
    icon?: typeof CheckSquare;
  }

  // Base public routes (>= 4 routes when logged out: 5 routes total)
  const loggedOutRoutes: NavRouteItem[] = [
    { name: "Home", url: "/" },
    { name: "Features", url: "/features" },
    { name: "Pricing", url: "/pricing" },
    { name: "About", url: "/about-us" },
    { name: "Contact", url: "/contact" },
  ];

  // Dynamic routes when logged in (>= 6 routes: 7 routes total)
  const loggedInRoutes: NavRouteItem[] = [
    { name: "Home", url: "/" },
    { name: "Features", url: "/features" },
    { name: "Pricing", url: "/pricing" },
    { name: "About", url: "/about-us" },
    { name: "Contact", url: "/contact" },
    {
      name: "Dashboard",
      url: role ? dashboardRoute[role] : "/member",
      icon: LayoutDashboard,
    },
    ...(role && roleWorkspaceLinks[role]
      ? [
          {
            name: roleWorkspaceLinks[role].name,
            url: roleWorkspaceLinks[role].url,
            icon: roleWorkspaceLinks[role].icon,
          },
        ]
      : [
          {
            name: "Tasks",
            url: "/member/tasks",
            icon: CheckSquare,
          },
        ]),
  ];

  const activeRoutes: NavRouteItem[] = user ? loggedInRoutes : loggedOutRoutes;

  // Advanced Resources dropdown items
  const resourceItems = [
    {
      title: "Help Center & FAQ",
      description: "Guides, tutorials, and common questions answered.",
      url: "/help",
      icon: HelpCircle,
    },
    {
      title: "Enterprise & Privacy",
      description: "Read our strict data compliance and security terms.",
      url: "/privacy",
      icon: BookOpen,
    },
    {
      title: "Contact Sales & Support",
      description: "Reach our dedicated team for custom workspace needs.",
      url: "/contact",
      icon: Users,
    },
  ];

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
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 border-b ${
        isScrolled
          ? "border-border/80 bg-background/90 shadow-sm backdrop-blur-md backdrop-saturate-150"
          : "border-border/40 bg-background/80 shadow-2xs backdrop-blur-md backdrop-saturate-150"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-heading text-lg font-bold tracking-tight transition-transform active:scale-95 shrink-0"
        >
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold shadow-xs">
            SF
          </span>
          <span className="text-foreground">SprintFlow</span>
        </Link>

        {/* Center Nav Links - Desktop (lg+) */}
        <nav className="hidden items-center gap-1 rounded-full border border-border/60 bg-muted/40 p-1 shadow-xs lg:flex">
          {activeRoutes.map((route) => {
            const isActive =
              route.url === "/"
                ? pathname === "/"
                : pathname === route.url ||
                  pathname.startsWith(`${route.url}/`);
            const RouteIcon = route.icon;

            return (
              <Link
                key={route.url}
                href={route.url}
                className={`relative flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-background font-semibold text-primary shadow-xs"
                    : "text-muted-foreground hover:bg-background/60 hover:text-foreground"
                }`}
              >
                {RouteIcon && <RouteIcon className="size-3 text-primary" />}
                <span>{route.name}</span>
              </Link>
            );
          })}

          {/* Advanced Resources Dropdown Menu in Nav */}
          <div className="relative" ref={resourcesDropdownRef}>
            <button
              type="button"
              onClick={() => setResourcesOpen(!resourcesOpen)}
              className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-all cursor-pointer ${
                resourcesOpen || pathname === "/help" || pathname === "/privacy"
                  ? "bg-background font-semibold text-primary shadow-xs"
                  : "text-muted-foreground hover:bg-background/60 hover:text-foreground"
              }`}
              aria-expanded={resourcesOpen}
              aria-haspopup="true"
            >
              <span>Resources</span>
              <ChevronDown
                className={`size-3 transition-transform duration-200 ${
                  resourcesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {resourcesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-1/2 -translate-x-1/2 top-10 w-72 rounded-2xl border border-border/80 bg-popover p-2 text-popover-foreground shadow-lg backdrop-blur-xl z-50 space-y-1"
                >
                  <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Explore & Learn
                  </div>
                  {resourceItems.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <Link
                        key={item.url}
                        href={item.url}
                        onClick={() => setResourcesOpen(false)}
                        className="flex items-start gap-2.5 rounded-xl p-2.5 text-xs transition-colors hover:bg-muted group"
                      >
                        <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <ItemIcon className="size-3.5" />
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {item.title}
                          </span>
                          <span className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                            {item.description}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Right CTA / Auth Status */}
        <div className="hidden items-center gap-2.5 sm:flex">
          <ThemeToggle />

          {isLoading ? (
            <div className="h-8 w-28 animate-pulse rounded-full bg-muted/60" />
          ) : user ? (
            /* Logged In State: Advanced User Profile Menu */
            <div className="relative" ref={profileDropdownRef}>
              {(() => {
                const avatar =
                  user.avatarUrl || user.picture || user.image || user.avatar;
                return (
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    aria-expanded={userDropdownOpen}
                    aria-haspopup="true"
                    className="flex items-center gap-2 rounded-full border border-border/80 bg-card/80 py-1 pl-1.5 pr-2.5 shadow-2xs hover:border-primary/40 hover:bg-muted/50 transition-all cursor-pointer"
                  >
                    {avatar ? (
                      <Image
                        src={avatar}
                        alt={user.name || "User Avatar"}
                        width={28}
                        height={28}
                        className="size-7 rounded-full object-cover ring-1 ring-primary/20 shrink-0"
                        unoptimized
                      />
                    ) : (
                      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 font-semibold text-primary text-xs font-heading">
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
                    <ChevronDown
                      className={`size-3.5 text-muted-foreground transition-transform duration-200 ${
                        userDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                );
              })()}

              {/* Advanced Profile Dropdown Menu */}
              <AnimatePresence>
                {userDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-11 w-64 rounded-2xl border border-border/80 bg-popover p-2 text-popover-foreground shadow-xl backdrop-blur-xl z-50 space-y-1.5"
                  >
                    {/* User Summary Card */}
                    {(() => {
                      const avatar =
                        user.avatarUrl ||
                        user.picture ||
                        user.image ||
                        user.avatar;
                      return (
                        <div className="border-b border-border/60 p-2.5 flex items-center gap-3">
                          {avatar ? (
                            <Image
                              src={avatar}
                              alt={user.name || "User Avatar"}
                              width={38}
                              height={38}
                              className="size-9.5 rounded-full object-cover ring-1 ring-primary/20 shrink-0"
                              unoptimized
                            />
                          ) : (
                            <div className="flex size-9.5 shrink-0 items-center justify-center rounded-full bg-primary/15 font-semibold text-primary text-xs">
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
                                className={`mt-1 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-semibold ${roleLabels[role]?.color}`}
                              >
                                {RoleIcon && <RoleIcon className="size-2.5" />}
                                <span>{roleLabels[role]?.label} Role</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Quick Navigation Section */}
                    <div className="space-y-0.5 px-1">
                      <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Workspace
                      </div>

                      {role && (
                        <Link
                          href={dashboardRoute[role]}
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                        >
                          <LayoutDashboard className="size-3.5 text-primary" />
                          <span>Go to {roleLabels[role]?.label} Dashboard</span>
                        </Link>
                      )}

                      {role && roleWorkspaceLinks[role] && (
                        <Link
                          href={roleWorkspaceLinks[role].url}
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                        >
                          {(() => {
                            const IconComponent = roleWorkspaceLinks[role].icon;
                            return (
                              <IconComponent className="size-3.5 text-muted-foreground" />
                            );
                          })()}
                          <span>{roleWorkspaceLinks[role].name} Hub</span>
                        </Link>
                      )}
                    </div>

                    {/* Account & Help Section */}
                    <div className="border-t border-border/60 pt-1 space-y-0.5 px-1">
                      <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Account
                      </div>

                      <Link
                        href="/member/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                      >
                        <User className="size-3.5 text-muted-foreground" />
                        <span>Profile & Settings</span>
                      </Link>

                      <Link
                        href="/help"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                      >
                        <HelpCircle className="size-3.5 text-muted-foreground" />
                        <span>Help & Support</span>
                      </Link>
                    </div>

                    {/* Destructive Action */}
                    <div className="border-t border-border/60 pt-1">
                      <button
                        type="button"
                        onClick={handleLogout}
                        disabled={logoutLoading}
                        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                      >
                        <LogOut className="size-3.5" />
                        <span>
                          {logoutLoading ? "Logging out..." : "Log out"}
                        </span>
                      </button>
                    </div>
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

        {/* Mobile Hamburger Button (lg:hidden) */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex size-9 items-center justify-center rounded-xl border border-border/70 bg-background/80 text-foreground shadow-xs cursor-pointer hover:bg-muted transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="size-4" />
            ) : (
              <Menu className="size-4" />
            )}
          </button>
        </div>
      </div>

      {/* Responsive Mobile / Tablet Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="space-y-4 border-t border-border/50 bg-background/95 px-5 py-4 shadow-lg backdrop-blur-xl lg:hidden overflow-hidden"
          >
            {/* User card in mobile drawer if logged in */}
            {user &&
              (() => {
                const avatar =
                  user.avatarUrl || user.picture || user.image || user.avatar;
                return (
                  <div className="flex items-center gap-3 rounded-xl border border-border/70 bg-muted/40 p-3">
                    {avatar ? (
                      <Image
                        src={avatar}
                        alt={user.name || "User Avatar"}
                        width={40}
                        height={40}
                        className="size-10 rounded-full object-cover ring-1 ring-primary/20 shrink-0"
                        unoptimized
                      />
                    ) : (
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 font-semibold text-primary text-xs">
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
                        className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold shrink-0 ${roleLabels[role]?.color}`}
                      >
                        {roleLabels[role]?.label}
                      </span>
                    )}
                  </div>
                );
              })()}

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col gap-1">
              <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Navigation
              </div>
              {activeRoutes.map((route) => {
                const isActive =
                  route.url === "/"
                    ? pathname === "/"
                    : pathname === route.url ||
                      pathname.startsWith(`${route.url}/`);
                const RouteIcon = route.icon;

                return (
                  <Link
                    key={route.url}
                    href={route.url}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 font-bold text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {RouteIcon && <RouteIcon className="size-4 text-primary" />}
                    <span>{route.name}</span>
                  </Link>
                );
              })}

              {/* Resources Submenu in Mobile Drawer */}
              <div className="pt-2">
                <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Resources & Support
                </div>
                {resourceItems.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <Link
                      key={item.url}
                      href={item.url}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    >
                      <ItemIcon className="size-4 text-primary" />
                      <span>{item.title}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Extra Account Links for Logged-In User in Mobile */}
              {user && (
                <div className="pt-2">
                  <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Preferences
                  </div>
                  <Link
                    href="/member/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <User className="size-4 text-primary" />
                    <span>Profile & Account Settings</span>
                  </Link>
                </div>
              )}
            </nav>

            {/* Mobile Auth Actions */}
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
                  className="w-full justify-center rounded-xl text-xs gap-1.5 cursor-pointer"
                  onClick={handleLogout}
                  disabled={logoutLoading}
                >
                  <LogOut className="size-3.5" />
                  <span>{logoutLoading ? "Logging out..." : "Logout"}</span>
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
