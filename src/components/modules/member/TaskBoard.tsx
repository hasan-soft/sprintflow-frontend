"use client";

import {
  DndContext,
  type DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useEffect } from "react";
import { useMyAssignedTasks, useUpdateTaskStatus } from "@/hooks";
import {
  type TaskStatus,
  useTaskStore,
  type WorkspaceTask,
} from "@/stores/task.store";

const columns: TaskStatus[] = [
  "To do",
  "In progress",
  "Review",
  "Blocked",
  "Done",
];
function readTasks(payload: unknown): WorkspaceTask[] | undefined {
  if (!payload || typeof payload !== "object") return undefined;
  const record = payload as Record<string, unknown>;
  const rows = Array.isArray(record.data)
    ? record.data
    : Array.isArray(record.tasks)
      ? record.tasks
      : Array.isArray(payload)
        ? payload
        : undefined;
  if (!rows) return undefined;

  return rows.flatMap((row, index) => {
    if (!row || typeof row !== "object") return [];
    const item = row as Record<string, unknown>;
    if (typeof item.title !== "string") return [];
    const rawStatus = String(item.status ?? "TODO")
      .toUpperCase()
      .replaceAll("_", "");
    const status: TaskStatus =
      rawStatus === "DONE" || rawStatus === "COMPLETED"
        ? "Done"
        : rawStatus === "BLOCKED"
          ? "Blocked"
          : rawStatus === "REVIEW" || rawStatus === "INREVIEW"
            ? "Review"
            : rawStatus === "INPROGRESS" || rawStatus === "ACTIVE"
              ? "In progress"
              : "To do";
    const project =
      item.project && typeof item.project === "object"
        ? String((item.project as Record<string, unknown>).name ?? "Project")
        : typeof item.project === "string"
          ? item.project
          : "SprintFlow project";
    const priority = String(item.priority ?? "NORMAL").toUpperCase();
    return [
      {
        id: String(item.id ?? `task-${index}`),
        title: item.title,
        project,
        priority:
          priority === "HIGH" || priority === "URGENT" ? "High" : "Normal",
        status,
      },
    ];
  });
}

function TaskCard({ task }: { task: WorkspaceTask }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task.id });
  return (
    <article
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.45 : 1,
      }}
      {...listeners}
      {...attributes}
      className="cursor-grab border bg-card p-4 shadow-sm active:cursor-grabbing"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-primary">{task.id}</span>
        <span
          className={`text-xs ${task.priority === "High" ? "text-rose-700" : "text-muted-foreground"}`}
        >
          {task.priority}
        </span>
      </div>
      <h3 className="mt-3 text-sm font-medium leading-5">{task.title}</h3>
      <p className="mt-3 text-xs text-muted-foreground">{task.project}</p>
    </article>
  );
}

function TaskColumn({
  status,
  tasks,
}: {
  status: TaskStatus;
  tasks: WorkspaceTask[];
}) {
  const { isOver, setNodeRef } = useDroppable({ id: status });
  return (
    <section
      ref={setNodeRef}
      aria-label={`${status} tasks`}
      className={`min-h-80 border-t-2 p-3 transition-colors ${isOver ? "border-primary bg-primary/5" : "border-transparent bg-muted/50"}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold">{status}</h2>
        <span className="text-xs text-muted-foreground">{tasks.length}</span>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <p className="border border-dashed px-3 py-8 text-center text-xs text-muted-foreground">
            Drop tasks here
          </p>
        )}
      </div>
    </section>
  );
}

export default function TaskBoard() {
  const tasks = useTaskStore((state) => state.tasks);
  const replaceTasks = useTaskStore((state) => state.replaceTasks);
  const tasksQuery = useMyAssignedTasks();
  const statusMutation = useUpdateTaskStatus();

  useEffect(() => {
    const fetchedTasks = readTasks(tasksQuery.data);
    if (fetchedTasks) replaceTasks(fetchedTasks);
  }, [replaceTasks, tasksQuery.data]);

  function moveTask(event: DragEndEvent) {
    const taskId = String(event.active.id);
    const destination = event.over?.id;
    if (!destination || !columns.includes(destination as TaskStatus)) return;
    const task = tasks.find((item) => item.id === taskId);
    if (!task || task.status === destination) return;
    statusMutation.mutate({ id: taskId, status: destination as TaskStatus });
  }
  return (
    <DndContext onDragEnd={moveTask}>
      <div className="space-y-3">
        {tasksQuery.isError && (
          <output className="block border border-rose-700/30 bg-rose-700/5 px-4 py-3 text-sm text-rose-800">
            Your assigned tasks could not be loaded. Retry the request or sign
            in again.
          </output>
        )}
        {tasksQuery.isPending ? (
          <output
            aria-label="Loading assigned tasks"
            className="grid animate-pulse gap-4 lg:grid-cols-3"
          >
            <span className="h-80 bg-muted" />
            <span className="h-80 bg-muted" />
            <span className="h-80 bg-muted" />
          </output>
        ) : tasksQuery.isSuccess && tasks.length === 0 ? (
          <div className="border border-dashed px-6 py-16 text-center">
            <h2 className="font-semibold">You are all caught up.</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              No tasks are currently assigned to your account.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-5">
            {columns.map((status) => (
              <TaskColumn
                key={status}
                status={status}
                tasks={tasks.filter((task) => task.status === status)}
              />
            ))}
          </div>
        )}
      </div>
    </DndContext>
  );
}
