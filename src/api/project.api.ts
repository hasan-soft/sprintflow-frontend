import apiClient from "@/lib/apiClient";
import type {
  ApiEnvelope,
  CreateProjectPayload,
  ProjectQuery,
  WorkspaceProject,
} from "@/types";

export function getProjects(query: ProjectQuery = {}) {
  const params = new URLSearchParams({
    page: query.page ?? "1",
    limit: query.limit ?? "10",
  });
  if (query.searchTerm) params.set("searchTerm", query.searchTerm);
  if (query.status) params.set("status", query.status);
  return apiClient<ApiEnvelope<WorkspaceProject[]>>(
    `/projects?${params.toString()}`,
  );
}

export function createProject(payload: CreateProjectPayload) {
  return apiClient<ApiEnvelope<WorkspaceProject>>("/projects", {
    method: "POST",
    body: payload,
  });
}

export function getProject(id: string) {
  return apiClient<ApiEnvelope<WorkspaceProject>>(
    `/projects/${encodeURIComponent(id)}`,
  );
}

export function updateProject(
  id: string,
  payload: Partial<CreateProjectPayload>,
) {
  return apiClient<ApiEnvelope<WorkspaceProject>>(
    `/projects/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      body: payload,
    },
  );
}

export function deleteProject(id: string) {
  return apiClient<ApiEnvelope<WorkspaceProject>>(
    `/projects/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
    },
  );
}
