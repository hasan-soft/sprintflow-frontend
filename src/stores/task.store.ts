import { create } from "zustand";
import { DEMO_BOARD_TASKS } from "@/lib/demo-tasks";
import type { BoardTask, BoardTaskStatus } from "@/types";

export type TaskStatus = BoardTaskStatus;
export type WorkspaceTask = BoardTask;

type TaskStore = {
  tasks: WorkspaceTask[];
  replaceTasks: (tasks: WorkspaceTask[]) => void;
  moveTask: (taskId: string, status: TaskStatus) => WorkspaceTask | undefined;
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: DEMO_BOARD_TASKS,
  replaceTasks: (tasks) =>
    set({ tasks: tasks.length > 0 ? tasks : DEMO_BOARD_TASKS }),
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
