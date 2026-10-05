import apiClient from "@/lib/apiClient";
import type {
  ApiEnvelope,
  BackendTaskStatus,
  CreateTaskPayload,
  TaskQuery,
  UpdateTaskPayload,
  WorkspaceTask,
} from "@/types";

export function getTasks(query: TaskQuery = {}) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value) params.set(key, value);
  }
  const suffix = params.size ? `?${params.toString()}` : "";
  return apiClient<ApiEnvelope<WorkspaceTask[]>>(`/tasks${suffix}`);
}

export function createTask(payload: CreateTaskPayload) {
  return apiClient<ApiEnvelope<WorkspaceTask>>("/tasks", {
    method: "POST",
    body: payload,
  });
}

export function getMyAssignedTasks() {
  return apiClient<ApiEnvelope<WorkspaceTask[]>>("/tasks/my-assigned");
}

export function updateTaskStatus(id: string, status: BackendTaskStatus) {
  return apiClient<ApiEnvelope<WorkspaceTask>>(
    `/tasks/${encodeURIComponent(id)}/status`,
    { method: "PATCH", body: { status } },
  );
}

export function getTask(id: string) {
  return apiClient<ApiEnvelope<WorkspaceTask>>(
    `/tasks/${encodeURIComponent(id)}`,
  );
}

export function updateTask(id: string, payload: UpdateTaskPayload) {
  return apiClient<ApiEnvelope<WorkspaceTask>>(
    `/tasks/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      body: payload,
    },
  );
}

export function assignTask(id: string, assigneeId: string) {
  return apiClient<ApiEnvelope<WorkspaceTask>>(
    `/tasks/${encodeURIComponent(id)}/assign`,
    {
      method: "POST",
      body: { assigneeId },
    },
  );
}

export function unassignTask(id: string) {
  return apiClient<ApiEnvelope<WorkspaceTask>>(
    `/tasks/${encodeURIComponent(id)}/unassign`,
    {
      method: "POST",
    },
  );
}

export function deleteTask(id: string) {
  return apiClient<ApiEnvelope<WorkspaceTask>>(
    `/tasks/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
    },
  );
}
