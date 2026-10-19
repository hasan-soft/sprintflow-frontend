import apiClient from "@/lib/apiClient";
import type { ApiEnvelope, UserQuery, UserRole, WorkspaceUser } from "@/types";

export function getUsers(query: UserQuery = {}) {
  const params = new URLSearchParams({
    page: query.page ?? "1",
    limit: query.limit ?? "10",
  });
  if (query.role) params.set("role", query.role);
  if (query.searchTerm) params.set("searchTerm", query.searchTerm);
  return apiClient<ApiEnvelope<WorkspaceUser[]>>(`/users?${params.toString()}`);
}

export function getCurrentUser() {
  return apiClient<
    ApiEnvelope<WorkspaceUser & { organizationId?: string | null }>
  >("/users/me");
}

export function getAdminStats() {
  return apiClient<ApiEnvelope<{ overview: Record<string, number> }>>(
    "/users/admin/stats",
  );
}

export function updateUserRole(id: string, role: UserRole) {
  return apiClient(`/users/${encodeURIComponent(id)}/role`, {
    method: "PATCH",
    body: { role },
  });
}

export function updateCurrentUser(payload: { name?: string }) {
  return apiClient("/users/me", { method: "PATCH", body: payload });
}

export function getAuditLogs() {
  return apiClient<
    ApiEnvelope<
      Array<{
        id: string;
        action: string;
        details?: string | null;
        createdAt: string;
        user: { id: string; name: string; email: string; role: string };
        task?: { id: string; title: string } | null;
      }>
    >
  >("/users/admin/logs");
}

export function getMyActivities() {
  return apiClient<
    ApiEnvelope<
      Array<{
        id: string;
        action: string;
        details?: string | null;
        createdAt: string;
        task?: { id: string; title: string } | null;
      }>
    >
  >("/users/me/activities");
}
