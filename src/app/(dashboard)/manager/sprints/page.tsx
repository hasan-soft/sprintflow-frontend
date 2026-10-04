"use client";

import { useState } from "react";
import { toast } from "sonner";

const startingSprints = [
  {
    name: "Mobile release 24.10",
    project: "Mobile app refresh",
    dates: "Oct 07 – Oct 21",
    progress: 68,
    status: "Active",
  },
  {
    name: "Onboarding polish",
    project: "Customer onboarding",
    dates: "Oct 14 – Oct 28",
    progress: 42,
    status: "Active",
  },
  {
    name: "Analytics foundations",
    project: "Usage analytics",
    dates: "Sep 23 – Oct 07",
    progress: 100,
    status: "Complete",
  },
];

export default function ManagerSprintsPage() {
  const [sprints, setSprints] = useState(startingSprints);
  function addSprint() {
    setSprints((existing) => [
      {
        name: `Sprint ${existing.length + 1}`,
        project: "Mobile app refresh",
        dates: "Oct 21 – Nov 04",
        progress: 0,
        status: "Planned",
      },
      ...existing,
    ]);
    toast.success("Sprint added to Mobile app refresh");
  }
  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary">Delivery</p>
          <h1 className="mt-1 font-heading text-3xl font-semibold">
            Sprint planning
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Track iteration goals and progress across projects.
          </p>
        </div>
        <button
          className="bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          onClick={addSprint}
          type="button"
        >
          Add sprint
        </button>
      </header>
      <section className="divide-y border bg-card">
        {sprints.map((sprint) => (
          <article
            className="grid gap-4 p-5 md:grid-cols-[1fr_150px_1fr_100px] md:items-center"
            key={`${sprint.name}-${sprint.project}`}
          >
            <div>
              <h2 className="font-medium">{sprint.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {sprint.project} · {sprint.dates}
              </p>
            </div>
            <span
              className={`w-fit border px-2.5 py-1 text-xs ${sprint.status === "Active" ? "border-primary/30 text-primary" : "text-muted-foreground"}`}
            >
              {sprint.status}
            </span>
            <div>
              <div className="mb-2 flex justify-between text-xs">
                <span className="text-muted-foreground">Completion</span>
                <span>{sprint.progress}%</span>
              </div>
              <div className="h-1.5 bg-muted">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${sprint.progress}%` }}
                />
              </div>
            </div>
            <button
              className="text-left text-sm font-medium underline underline-offset-4"
              onClick={() =>
                toast.message(`${sprint.name}: ${sprint.progress}% complete`)
              }
              type="button"
            >
              View sprint
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}
