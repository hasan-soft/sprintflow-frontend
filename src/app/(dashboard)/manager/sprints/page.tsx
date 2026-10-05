"use client";

import SprintsWorkspace from "@/components/modules/manager/SprintsWorkspace";

export default function ManagerSprintsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <header>
        <p className="text-sm font-semibold text-primary">Delivery</p>
        <h1 className="mt-1 font-heading text-3xl font-semibold">
          Sprint planning
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Create sprints and track progress from live task data.
        </p>
      </header>
      <SprintsWorkspace />
    </div>
  );
}
