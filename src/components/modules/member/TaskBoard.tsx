"use client";

import {
  DndContext,
  type DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";
import { useMyAssignedTasks, useUpdateTaskStatus } from "@/hooks";
import {
  type TaskStatus,
  useTaskStore,
  type WorkspaceTask,
} from "@/stores/task.store";
import TaskDetailsModal from "./TaskDetailsModal";

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
    const description =
      typeof item.description === "string" ? item.description : undefined;
    const dueDate = typeof item.dueDate === "string" ? item.dueDate : undefined;
    const assignee =
      item.assignee && typeof item.assignee === "object"
        ? String(
            (item.assignee as Record<string, unknown>).name ??
              "Assigned Member",
          )
        : typeof item.assignee === "string"
          ? item.assignee
          : undefined;
    const attachments = Array.isArray(item.attachments)
      ? (item.attachments as string[])
      : undefined;

    return [
      {
        id: String(item.id ?? `task-${index}`),
        title: item.title,
        project,
        priority:
          priority === "HIGH" || priority === "URGENT" ? "High" : "Normal",
        status,
        description,
        dueDate,
        assignee,
        attachments,
      },
    ];
  });
}

function TaskCard({
  task,
  onSelect,
}: {
  task: WorkspaceTask;
  onSelect: (task: WorkspaceTask) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task.id });
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: draggable dnd-kit element handled by pointer and click
    <article
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.45 : 1,
      }}
      {...listeners}
      {...attributes}
      onClick={() => onSelect(task)}
      className="cursor-pointer group relative border border-border/80 bg-card p-4 shadow-2xs transition hover:border-primary/50 hover:shadow-xs active:cursor-grabbing rounded-xl select-none"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-xs font-semibold text-primary">
          {task.id.length > 12
            ? `TASK-${task.id.slice(-4).toUpperCase()}`
            : task.id}
        </span>
        <span
          className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
            task.priority === "High"
              ? "bg-rose-500/10 text-rose-600 border border-rose-500/20"
              : "text-muted-foreground bg-muted"
          }`}
        >
          {task.priority}
        </span>
      </div>
      <h3 className="mt-2.5 text-sm font-semibold leading-5 text-foreground group-hover:text-primary transition-colors">
        {task.title}
      </h3>
      <p className="mt-2 text-xs text-muted-foreground line-clamp-1">
        {task.project}
      </p>

      {/* Attachment / Details pill footer */}
      <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-2 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1 font-mono text-[10px]">
          📎 {task.attachments?.length || 1} image
        </span>
        <span className="text-[10px] text-primary group-hover:underline">
          View details →
        </span>
      </div>
    </article>
  );
}

function TaskColumn({
  status,
  tasks,
  onSelectTask,
}: {
  status: TaskStatus;
  tasks: WorkspaceTask[];
  onSelectTask: (task: WorkspaceTask) => void;
}) {
  const { isOver, setNodeRef } = useDroppable({ id: status });
  return (
    <section
      ref={setNodeRef}
      aria-label={`${status} tasks`}
      className={`min-h-96 rounded-xl border-t-2 p-3 transition-colors ${
        isOver
          ? "border-primary bg-primary/5"
          : "border-transparent bg-muted/40"
      }`}
    >
      <div className="mb-3 flex items-center justify-between px-1">
        <h2 className="text-xs font-bold uppercase tracking-wider text-foreground">
          {status}
        </h2>
        <span className="flex size-5 items-center justify-center rounded-full bg-background border text-[11px] font-bold text-muted-foreground">
          {tasks.length}
        </span>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onSelect={onSelectTask} />
        ))}
        {tasks.length === 0 && (
          <p className="rounded-xl border border-dashed border-border/70 py-10 text-center text-xs text-muted-foreground">
            Drop tasks here
          </p>
        )}
      </div>
    </section>
  );
}

export default function TaskBoard() {
  const [selectedTask, setSelectedTask] = useState<WorkspaceTask | null>(null);
  const tasks = useTaskStore((state) => state.tasks);
  const replaceTasks = useTaskStore((state) => state.replaceTasks);
  const tasksQuery = useMyAssignedTasks();
  const statusMutation = useUpdateTaskStatus();

  useEffect(() => {
    const fetchedTasks = readTasks(tasksQuery.data);
    if (fetchedTasks && fetchedTasks.length > 0) {
      replaceTasks(fetchedTasks);
    }
  }, [replaceTasks, tasksQuery.data]);

  function moveTask(event: DragEndEvent) {
    const taskId = String(event.active.id);
    const destination = event.over?.id;
    if (!destination || !columns.includes(destination as TaskStatus)) return;
    const task = tasks.find((item) => item.id === taskId);
    if (!task || task.status === destination) return;
    statusMutation.mutate({ id: taskId, status: destination as TaskStatus });
  }

  function handleStatusChangeFromModal(newStatus: TaskStatus) {
    if (!selectedTask) return;
    statusMutation.mutate({ id: selectedTask.id, status: newStatus });
    setSelectedTask((prev) => (prev ? { ...prev, status: newStatus } : null));
  }

  return (
    <DndContext onDragEnd={moveTask}>
      <div className="space-y-4">
        {tasksQuery.isError && (
          <output className="block border border-rose-700/30 bg-rose-700/5 px-4 py-3 text-sm text-rose-800">
            Your assigned tasks could not be loaded. Displaying local sprint
            board.
          </output>
        )}

        {/* Board column grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {columns.map((status) => (
            <TaskColumn
              key={status}
              status={status}
              tasks={tasks.filter((task) => task.status === status)}
              onSelectTask={(task) => setSelectedTask(task)}
            />
          ))}
        </div>

        {/* Task Details Modal */}
        {selectedTask && (
          <TaskDetailsModal
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
            onStatusChange={handleStatusChangeFromModal}
          />
        )}
      </div>
    </DndContext>
  );
}
