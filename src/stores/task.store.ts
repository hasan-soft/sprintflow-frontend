import { create } from "zustand";

export type TaskStatus = "To do" | "In progress" | "Review";
export type WorkspaceTask = { id: string; title: string; project: string; priority: "High" | "Normal"; status: TaskStatus };

const initialTasks: WorkspaceTask[] = [
  { id: "SF-284", title: "Update onboarding flow", project: "Customer onboarding", priority: "High", status: "In progress" },
  { id: "SF-291", title: "Review mobile empty states", project: "Mobile app refresh", priority: "Normal", status: "To do" },
  { id: "SF-301", title: "Document analytics events", project: "Usage analytics", priority: "Normal", status: "Review" },
  { id: "SF-309", title: "Audit focus order", project: "Mobile app refresh", priority: "High", status: "To do" },
];

type TaskStore = {
  tasks: WorkspaceTask[];
  moveTask: (taskId: string, status: TaskStatus) => WorkspaceTask | undefined;
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: initialTasks,
  moveTask: (taskId, status) => {
    const task = get().tasks.find((item) => item.id === taskId);
    if (!task || task.status === status) return undefined;
    set((state) => ({ tasks: state.tasks.map((item) => item.id === taskId ? { ...item, status } : item) }));
    return task;
  },
}));