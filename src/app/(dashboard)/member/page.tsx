"use client";

import Link from "next/link";
import { useMyAssignedTasks } from "@/hooks";

export default function MemberOverviewPage() {
  const tasksQuery = useMyAssignedTasks();
  const tasks = tasksQuery.data?.data ?? [];
  const counts = [
    {
      label: "To do",
      value: tasks.filter((task) => task.status === "TODO").length,
    },
    {
      label: "In progress",
      value: tasks.filter((task) => task.status === "IN_PROGRESS").length,
    },
    {
      label: "Completed",
      value: tasks.filter((task) => task.status === "DONE").length,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <header>
        <p className="text-sm font-semibold text-primary">My workspace</p>
        <h1 className="mt-1 font-heading text-3xl font-semibold">My work</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Assigned tasks and status from your current workspace.
        </p>
      </header>
      <section className="grid gap-px border bg-border sm:grid-cols-3">
        {counts.map((metric) => (
          <div className="bg-card p-5" key={metric.label}>
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            <p className="mt-3 font-heading text-3xl font-semibold">
              {tasksQuery.isPending ? "—" : metric.value}
            </p>
          </div>
        ))}
      </section>
      {tasksQuery.isError && (
        <output className="block border border-rose-700/30 bg-rose-700/5 px-4 py-3 text-sm text-rose-800">
          Assigned tasks could not be loaded from the API.
        </output>
      )}
      <section className="border bg-card">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <h2 className="font-semibold">Assigned to me</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Your current sprint tasks.
            </p>
          </div>
          <Link
            className="text-sm font-medium underline underline-offset-4"
            href="/member/tasks"
          >
            Open task board
          </Link>
        </div>
        <div className="divide-y">
          {tasks.slice(0, 5).map((task) => (
            <div
              className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
              key={task.id}
            >
              <div>
                <p className="text-xs font-semibold text-primary">{task.id}</p>
                <p className="mt-1 font-medium">{task.title}</p>
              </div>
              <div className="flex items-center gap-5 text-sm">
                <span className="text-muted-foreground">
                  {task.status.replaceAll("_", " ")}
                </span>
                <span>
                  {task.dueDate
                    ? `Due ${new Date(task.dueDate).toLocaleDateString()}`
                    : "No due date"}
                </span>
              </div>
            </div>
          ))}
          {!tasksQuery.isPending &&
            !tasksQuery.isError &&
            tasks.length === 0 && (
              <p className="px-5 py-12 text-center text-sm text-muted-foreground">
                No tasks are currently assigned to your account.
              </p>
            )}
        </div>
      </section>
    </div>
  );
}
