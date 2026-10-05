import apiClient from "@/lib/apiClient";
import type {
  ApiEnvelope,
  CreateCommentPayload,
  WorkspaceComment,
} from "@/types";

export function addComment(payload: CreateCommentPayload) {
  return apiClient<ApiEnvelope<WorkspaceComment>>("/comments", {
    method: "POST",
    body: payload,
  });
}

export function getTaskComments(taskId: string) {
  return apiClient<ApiEnvelope<WorkspaceComment[]>>(
    `/comments/task/${encodeURIComponent(taskId)}`,
  );
}
