import apiClient from "@/lib/apiClient";
import type {
  ApiEnvelope,
  CreateSprintPayload,
  WorkspaceSprint,
} from "@/types";

export function getProjectSprints(projectId: string) {
  return apiClient<ApiEnvelope<WorkspaceSprint[]>>(
    `/sprints/project/${encodeURIComponent(projectId)}`,
  );
}

export function createSprint(payload: CreateSprintPayload) {
  return apiClient<ApiEnvelope<WorkspaceSprint>>("/sprints", {
    method: "POST",
    body: payload,
  });
}

export function updateSprintStatus(
  id: string,
  status: "UPCOMING" | "ACTIVE" | "COMPLETED",
) {
  return apiClient<ApiEnvelope<WorkspaceSprint>>(
    `/sprints/${encodeURIComponent(id)}/status`,
    { method: "PATCH", body: { status } },
  );
}
