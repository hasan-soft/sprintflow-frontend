"use client";

import {
  ChevronDown,
  CircleHelp,
  Globe,
  LogOut,
  Menu,
  Shield,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "@/components/shared/theme-toggle";
import { useCurrentUser, useLogout } from "@/hooks";

interface DashboardNavbarProps {
  workspaceRole: "ADMIN" | "MANAGER" | "MEMBER";
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export default function DashboardNavbar({
  workspaceRole,
  mobileMenuOpen,
  onToggleMobileMenu,
}: DashboardNavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const logout = useLogout();
  const userQuery = useCurrentUser();
  const user = userQuery.data?.data;

  // Derive initials for avatar fallback
  const userInitial = user?.name ? user.name[0]?.toUpperCase() : "U";

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setProfileDropdownOpen(false);
      }
    }

    if (profileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [profileDropdownOpen]);

  // Handle logout
  async function handleSignOut() {
    setProfileDropdownOpen(false);
    try {
      await logout.mutateAsync();
      router.push("/login");
      router.refresh();
    } catch {
      router.push("/login");
      router.refresh();
    }
  }

  // Compute breadcrumb / section name based on pathname
  const getSectionTitle = () => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length <= 1) return "Overview";
    const sub = parts[1];
    return sub.charAt(0).toUpperCase() + sub.slice(1);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border/80 bg-card/90 px-5 backdrop-blur-md sm:px-8">
      {/* Left side: Mobile Toggle + Breadcrumb / Workspace title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="flex size-9 items-center justify-center rounded-xl border border-border/80 bg-background text-foreground shadow-2xs hover:border-primary/50 lg:hidden cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? (
            <X className="size-4" />
          ) : (
            <Menu className="size-4" />
          )}
        </button>

        <div className="flex items-center gap-2">
          <Link
            href={`/${workspaceRole.toLowerCase()}`}
            className="flex items-center gap-2 font-heading font-bold text-sm tracking-tight text-foreground hover:text-primary transition-colors"
          >
            <span className="flex size-6 items-center justify-center rounded-lg bg-primary text-[10px] font-bold text-primary-foreground">
              SF
            </span>
            <span className="hidden sm:inline">SprintFlow</span>
          </Link>
          <span className="text-muted-foreground/40 font-mono text-xs">/</span>
          <span className="rounded-md border border-primary/25 bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
            {workspaceRole}
          </span>
          <span className="hidden md:inline text-muted-foreground/40 font-mono text-xs">
            /
          </span>
          <span className="hidden md:inline text-xs font-semibold text-muted-foreground">
            {getSectionTitle()}
          </span>
        </div>
      </div>

      {/* Right side: Public Site, Help, Theme Toggle & Profile Dropdown */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Public Site Link */}
        <Link
          href="/"
          className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-background/80 px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition shadow-2xs"
          title="Go to Public Website"
        >
          <Globe className="size-3.5 text-primary" />
          <span>Public Site</span>
        </Link>

        {/* Help Center Link */}
        <Link
          href="/help"
          className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-background/80 px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition shadow-2xs"
          title="Open Help Center"
        >
          <CircleHelp className="size-3.5 text-muted-foreground" />
          <span>Help</span>
        </Link>

        {/* Theme Toggle */}
        <div className="flex items-center">
          <ThemeToggle />
        </div>

        {/* PROFILE ICON WITH DROPDOWN MENU */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            aria-expanded={profileDropdownOpen}
            aria-haspopup="true"
            className="group flex items-center gap-2 rounded-2xl border border-border/80 bg-background/90 p-1.5 pr-2.5 text-xs font-semibold text-foreground shadow-2xs hover:border-primary/50 transition cursor-pointer"
          >
            {/* Avatar with Online Dot */}
            <div className="relative flex size-8 shrink-0 items-center justify-center rounded-xl bg-linear-to-tr from-primary to-primary/80 font-heading font-extrabold text-xs text-primary-foreground shadow-2xs overflow-hidden">
              {user?.avatarUrl ? (
                <Image
                  src={user.avatarUrl}
                  alt={user.name || "User Avatar"}
                  fill
                  className="object-cover"
                />
              ) : (
                <span>{userInitial}</span>
              )}
              <span
                className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-background bg-emerald-500"
                title="Online"
              />
            </div>

            {/* User First Name (desktop) */}
            <span className="hidden sm:inline-block max-w-[90px] truncate text-xs font-bold text-foreground">
              {user?.name?.split(" ")[0] || "Account"}
            </span>

            <ChevronDown
              className={`size-3 text-muted-foreground transition-transform duration-200 ${
                profileDropdownOpen ? "rotate-180 text-primary" : ""
              }`}
            />
          </button>

          {/* Interactive Dropdown Menu */}
          {profileDropdownOpen && (
            <div
              role="menu"
              aria-orientation="vertical"
              className="absolute right-0 mt-2 w-64 rounded-2xl border border-border/80 bg-card p-2 text-foreground shadow-xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 z-50"
            >
              {/* Header: User Info */}
              <div className="px-3 py-2.5 border-b border-border/60">
                <p className="text-xs font-bold text-foreground truncate">
                  {user?.name || "Demo User"}
                </p>
                <p
                  className="text-[11px] text-muted-foreground truncate"
                  title={user?.email || "user@sprintflow.dev"}
                >
                  {user?.email || "user@sprintflow.dev"}
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                  <Shield className="size-3" />
                  <span>{user?.role || workspaceRole} ROLE</span>
                </div>
              </div>

              {/* Menu Links */}
              <div className="py-1">
                {/* Profile Link */}
                <Link
                  href={`/${workspaceRole.toLowerCase()}/profile`}
                  onClick={() => setProfileDropdownOpen(false)}
                  role="menuitem"
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-foreground hover:bg-muted transition cursor-pointer"
                >
                  <User className="size-3.5 text-primary" />
                  <span>Profile Settings</span>
                </Link>

                {/* Public Website */}
                <Link
                  href="/"
                  onClick={() => setProfileDropdownOpen(false)}
                  role="menuitem"
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-foreground hover:bg-muted transition cursor-pointer"
                >
                  <Globe className="size-3.5 text-muted-foreground" />
                  <span>Public Website</span>
                </Link>

                {/* Help Center */}
                <Link
                  href="/help"
                  onClick={() => setProfileDropdownOpen(false)}
                  role="menuitem"
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-foreground hover:bg-muted transition cursor-pointer"
                >
                  <CircleHelp className="size-3.5 text-muted-foreground" />
                  <span>Help & Support</span>
                </Link>
              </div>

              {/* Footer: Sign Out Action */}
              <div className="border-t border-border/60 pt-1">
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={logout.isPending}
                  role="menuitem"
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10 transition cursor-pointer disabled:opacity-50"
                >
                  <LogOut className="size-3.5" />
                  <span>
                    {logout.isPending ? "Signing out..." : "Sign Out"}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
