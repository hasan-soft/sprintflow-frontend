import { Suspense } from "react";
import UserDirectory from "@/components/modules/admin/UserDirectory";

export default function AdminUsersPage() {
  return <div className="mx-auto max-w-7xl space-y-7"><header><p className="text-sm font-semibold text-primary">Administration</p><h1 className="mt-1 font-heading text-3xl font-semibold">People</h1><p className="mt-2 text-sm text-muted-foreground">Manage access, workspace roles, and invitations.</p></header><Suspense fallback={<div className="h-80 animate-pulse bg-muted" />}><UserDirectory /></Suspense></div>;
}