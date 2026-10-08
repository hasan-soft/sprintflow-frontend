import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createProject,
  createSprint,
  getAdminStats,
  getMyAssignedTasks,
  getProjectSprints,
  getProjects,
  getTasks,
  getUsers,
  updateCurrentUser,
  updateSprintStatus,
  updateTaskStatus,
  updateUserRole,
} from "@/api";
import { useTaskStore } from "@/stores/task.store";
import type {
  BackendTaskStatus,
  BoardTaskStatus,
  CreateSprintPayload,
  ProjectQuery,
  TaskQuery,
  UserQuery,
  UserRole,
} from "@/types";

export function useUsers(query: UserQuery = {}) {
  return useQuery({
    queryKey: ["admin-users", query],
    queryFn: () => getUsers(query),
    retry: false,
    staleTime: 30_000,
  });
}

export function useAdminStats() {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: getAdminStats,
    retry: false,
    staleTime: 60_000,
  });
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: UserRole }) =>
      updateUserRole(id, role),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin-users"] }),
  });
}

export function useProjects(query: ProjectQuery = {}) {
  return useQuery({
    queryKey: ["projects", query],
    queryFn: () => getProjects(query),
    retry: false,
    staleTime: 30_000,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useGetTasks(query: TaskQuery = {}) {
  return useQuery({
    queryKey: ["tasks", query],
    queryFn: () => getTasks(query),
    retry: false,
    staleTime: 30_000,
  });
}

export function useMyAssignedTasks() {
  return useQuery({
    queryKey: ["member-tasks"],
    queryFn: getMyAssignedTasks,
    retry: false,
    staleTime: 30_000,
  });
}

export function useUpdateTaskStatus() {
  const queryClient = useQueryClient();
  const moveTask = useTaskStore((state) => state.moveTask);
  const replaceTasks = useTaskStore((state) => state.replaceTasks);
  const backendStatus: Record<BoardTaskStatus, BackendTaskStatus> = {
    "To do": "TODO",
    "In progress": "IN_PROGRESS",
    Review: "IN_REVIEW",
    Blocked: "BLOCKED",
    Done: "DONE",
  };

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: BoardTaskStatus }) =>
      updateTaskStatus(id, backendStatus[status]),
    onMutate: ({ id, status }) => {
      const previousTasks = useTaskStore.getState().tasks;
      moveTask(id, status);
      return previousTasks;
    },
    onError: (error, _variables, previousTasks) => {
      if (previousTasks) replaceTasks(previousTasks);
      toast.error(
        error instanceof Error
          ? error.message
          : "Task status could not be saved.",
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["member-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useProjectSprints(projectId: string) {
  return useQuery({
    queryKey: ["project-sprints", projectId],
    queryFn: () => getProjectSprints(projectId),
    enabled: Boolean(projectId),
    retry: false,
    staleTime: 30_000,
  });
}

export function useCreateSprint() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateSprintPayload) => createSprint(payload),
    onSuccess: (_result, payload) =>
      queryClient.invalidateQueries({
        queryKey: ["project-sprints", payload.projectId],
      }),
  });
}

export function useUpdateSprintStatus(projectId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "UPCOMING" | "ACTIVE" | "COMPLETED";
    }) => updateSprintStatus(id, status),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["project-sprints", projectId],
      }),
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["current-user"] }),
  });
}

// Alias for getTasks
export const useTasks = useGetTasks;
