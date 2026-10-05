"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  useCreateSprint,
  useProjectSprints,
  useProjects,
  useUpdateSprintStatus,
} from "@/hooks";

const sprintSchema = z
  .object({
    name: z.string().min(2, "Sprint name must be at least 2 characters."),
    startDate: z.string().min(1, "Choose a start date."),
    endDate: z.string().min(1, "Choose an end date."),
  })
  .refine((value) => value.endDate > value.startDate, {
    message: "End date must be after the start date.",
    path: ["endDate"],
  });

type SprintValues = z.infer<typeof sprintSchema>;

export default function SprintsWorkspace() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const projectsQuery = useProjects();
  const projects = projectsQuery.data?.data ?? [];
  const projectId = searchParams.get("project") ?? projects[0]?.id ?? "";
  const sprintsQuery = useProjectSprints(projectId);
  const createMutation = useCreateSprint();
  const updateMutation = useUpdateSprintStatus(projectId);
  const [creating, setCreating] = useState(false);
  const form = useForm<SprintValues>({
    resolver: zodResolver(sprintSchema),
    defaultValues: { name: "", startDate: "", endDate: "" },
  });

  useEffect(() => {
    if (!searchParams.get("project") && projects[0]) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("project", projects[0].id);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [pathname, projects, router, searchParams]);

  async function submitSprint(values: SprintValues) {
    if (!projectId) return;
    try {
      const result = await createMutation.mutateAsync({ ...values, projectId });
      toast.success(result.message ?? "Sprint created successfully");
      form.reset();
      setCreating(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Sprint could not be created.",
      );
    }
  }

  function changeProject(nextProjectId: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("project", nextProjectId);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="text-sm font-medium">
          Project
          <select
            aria-label="Choose project"
            className="ml-3 h-10 max-w-64 border bg-background px-3 text-sm font-normal"
            disabled={projects.length === 0}
            onChange={(event) => changeProject(event.target.value)}
            value={projectId}
          >
            <option value="">Select a project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </label>
        <button
          className="bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
          disabled={!projectId}
          onClick={() => setCreating((value) => !value)}
          type="button"
        >
          {creating ? "Cancel" : "Create sprint"}
        </button>
      </div>

      {projectsQuery.isError && (
        <output className="block border border-rose-700/30 bg-rose-700/5 px-4 py-3 text-sm text-rose-800">
          Projects could not be loaded from the API.
        </output>
      )}
      {creating && (
        <form
          className="grid gap-4 border bg-card p-5 md:grid-cols-3"
          onSubmit={form.handleSubmit(submitSprint)}
        >
          <label className="text-sm font-medium">
            Sprint name
            <input
              className="mt-2 h-10 w-full border bg-background px-3 font-normal"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <span className="mt-1 block text-xs text-destructive">
                {form.formState.errors.name.message}
              </span>
            )}
          </label>
          <label className="text-sm font-medium">
            Start date
            <input
              className="mt-2 h-10 w-full border bg-background px-3 font-normal"
              type="date"
              {...form.register("startDate")}
            />
            {form.formState.errors.startDate && (
              <span className="mt-1 block text-xs text-destructive">
                {form.formState.errors.startDate.message}
              </span>
            )}
          </label>
          <label className="text-sm font-medium">
            End date
            <input
              className="mt-2 h-10 w-full border bg-background px-3 font-normal"
              type="date"
              {...form.register("endDate")}
            />
            {form.formState.errors.endDate && (
              <span className="mt-1 block text-xs text-destructive">
                {form.formState.errors.endDate.message}
              </span>
            )}
          </label>
          <div className="md:col-span-3">
            <button
              className="bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
              disabled={createMutation.isPending || !projectId}
              type="submit"
            >
              {createMutation.isPending ? "Creating..." : "Create sprint"}
            </button>
          </div>
        </form>
      )}

      {sprintsQuery.isError && (
        <output className="block border border-rose-700/30 bg-rose-700/5 px-4 py-3 text-sm text-rose-800">
          Sprints for this project could not be loaded.
        </output>
      )}
      {sprintsQuery.isPending ? (
        <output
          aria-label="Loading sprints"
          className="block h-64 animate-pulse bg-muted"
        />
      ) : (sprintsQuery.data?.data ?? []).length === 0 ? (
        <div className="border border-dashed px-6 py-16 text-center">
          <h2 className="font-semibold">No sprints yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Create the first sprint for this project.
          </p>
        </div>
      ) : (
        <section className="divide-y border bg-card">
          {(sprintsQuery.data?.data ?? []).map((sprint) => {
            const completedTasks =
              sprint.tasks?.filter((task) => task.status === "DONE").length ??
              0;
            const taskCount = sprint.tasks?.length ?? 0;
            const progress = taskCount
              ? Math.round((completedTasks / taskCount) * 100)
              : 0;
            return (
              <article
                className="grid gap-4 p-5 md:grid-cols-[1fr_150px_1fr] md:items-center"
                key={sprint.id}
              >
                <div>
                  <h2 className="font-medium">{sprint.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {new Date(sprint.startDate).toLocaleDateString()} –{" "}
                    {new Date(sprint.endDate).toLocaleDateString()}
                  </p>
                </div>
                <select
                  aria-label={`Update ${sprint.name} status`}
                  className="h-9 w-fit border bg-background px-2 text-xs"
                  disabled={updateMutation.isPending}
                  onChange={(event) =>
                    updateMutation.mutate({
                      id: sprint.id,
                      status: event.target.value as
                        | "UPCOMING"
                        | "ACTIVE"
                        | "COMPLETED",
                    })
                  }
                  value={sprint.status}
                >
                  <option value="UPCOMING">Upcoming</option>
                  <option value="ACTIVE">Active</option>
                  <option value="COMPLETED">Completed</option>
                </select>
                <div>
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="text-muted-foreground">
                      {taskCount} tasks complete
                    </span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-1.5 bg-muted">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </div>
  );
}
