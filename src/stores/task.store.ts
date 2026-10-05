import { create } from "zustand";
import type { BoardTask, BoardTaskStatus } from "@/types";

export type TaskStatus = BoardTaskStatus;
export type WorkspaceTask = BoardTask;

type TaskStore = {
  tasks: WorkspaceTask[];
  replaceTasks: (tasks: WorkspaceTask[]) => void;
  moveTask: (taskId: string, status: TaskStatus) => WorkspaceTask | undefined;
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  replaceTasks: (tasks) => set({ tasks }),
  moveTask: (taskId, status) => {
    const task = get().tasks.find((item) => item.id === taskId);
    if (!task || task.status === status) return undefined;
    set((state) => ({
      tasks: state.tasks.map((item) =>
        item.id === taskId ? { ...item, status } : item,
      ),
    }));
    return task;
  },
}));
