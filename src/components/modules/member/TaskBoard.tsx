"use client";

import { DndContext, type DragEndEvent, useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { toast } from "sonner";
import { useTaskStore, type TaskStatus, type WorkspaceTask } from "@/stores/task.store";

const columns: TaskStatus[] = ["To do", "In progress", "Review"];

function TaskCard({ task }: { task: WorkspaceTask }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: task.id });
  return <article ref={setNodeRef} style={{ transform: CSS.Translate.toString(transform), opacity: isDragging ? 0.45 : 1 }} {...listeners} {...attributes} className="cursor-grab border bg-card p-4 shadow-sm active:cursor-grabbing"><div className="flex items-center justify-between gap-2"><span className="text-xs font-semibold text-primary">{task.id}</span><span className={`text-xs ${task.priority === "High" ? "text-rose-700" : "text-muted-foreground"}`}>{task.priority}</span></div><h3 className="mt-3 text-sm font-medium leading-5">{task.title}</h3><p className="mt-3 text-xs text-muted-foreground">{task.project}</p></article>;
}

function TaskColumn({ status, tasks }: { status: TaskStatus; tasks: WorkspaceTask[] }) {
  const { isOver, setNodeRef } = useDroppable({ id: status });
  return <section ref={setNodeRef} aria-label={`${status} tasks`} className={`min-h-80 border-t-2 p-3 transition-colors ${isOver ? "border-primary bg-primary/5" : "border-transparent bg-muted/50"}`}><div className="mb-3 flex items-center justify-between"><h2 className="text-sm font-semibold">{status}</h2><span className="text-xs text-muted-foreground">{tasks.length}</span></div><div className="space-y-3">{tasks.map((task) => <TaskCard key={task.id} task={task} />)}{tasks.length === 0 && <p className="border border-dashed px-3 py-8 text-center text-xs text-muted-foreground">Drop tasks here</p>}</div></section>;
}

export default function TaskBoard() {
  const tasks = useTaskStore((state) => state.tasks);
  const moveTaskInStore = useTaskStore((state) => state.moveTask);
  function moveTask(event: DragEndEvent) {
    const taskId = String(event.active.id);
    const destination = event.over?.id;
    if (!destination || !columns.includes(destination as TaskStatus)) return;
    const task = moveTaskInStore(taskId, destination as TaskStatus);
    if (task) toast.success(`${taskId} moved to ${destination}`);
  }
  return <DndContext onDragEnd={moveTask}><div className="grid gap-4 lg:grid-cols-3">{columns.map((status) => <TaskColumn key={status} status={status} tasks={tasks.filter((task) => task.status === status)} />)}</div></DndContext>;
}