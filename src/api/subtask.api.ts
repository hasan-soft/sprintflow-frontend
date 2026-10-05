import apiClient from "@/lib/apiClient";
import type {
  ApiEnvelope,
  CreateSubtaskPayload,
  WorkspaceSubtask,
} from "@/types";

export function createSubtask(payload: CreateSubtaskPayload) {
  return apiClient<ApiEnvelope<WorkspaceSubtask>>("/subtasks", {
    method: "POST",
    body: payload,
  });
}

export function getSubtasksByTask(taskId: string) {
  return apiClient<ApiEnvelope<WorkspaceSubtask[]>>(
    `/subtasks/task/${encodeURIComponent(taskId)}`,
  );
}

export function toggleSubtask(id: string) {
  return apiClient<ApiEnvelope<WorkspaceSubtask>>(
    `/subtasks/${encodeURIComponent(id)}/toggle`,
    { method: "PATCH" },
  );
}

export function deleteSubtask(id: string) {
  return apiClient<ApiEnvelope<WorkspaceSubtask>>(
    `/subtasks/${encodeURIComponent(id)}`,
    { method: "DELETE" },
  );
}
