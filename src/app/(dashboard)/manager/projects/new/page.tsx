"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useCreateProject, useProjects } from "@/hooks";

const projectSchema = z.object({
  name: z.string().min(2, "Use at least 2 characters for the project name."),
  description: z.string().optional(),
  organizationId: z.string().min(1, "Choose an organization."),
});

type ProjectValues = z.infer<typeof projectSchema>;

export default function NewProjectPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const projectsQuery = useProjects({ limit: "100" });
  const createProjectMutation = useCreateProject();
  const organizations = Array.from(
    new Map(
      (projectsQuery.data?.data ?? []).map((project) => [
        project.organizationId,
        project.organization?.name ?? project.organizationId,
      ]),
    ).entries(),
  );
  const form = useForm<ProjectValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: { name: "", description: "", organizationId: "" },
  });

  async function nextStep() {
    const valid = await form.trigger(
      step === 1 ? ["name", "description"] : ["organizationId"],
    );
    if (valid) setStep(2);
  }

  async function createProject(values: ProjectValues) {
    try {
      const result = await createProjectMutation.mutateAsync(values);
      toast.success(result.message ?? "Project created successfully");
      router.push("/manager/projects");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Project could not be created.",
      );
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-7">
      <header>
        <p className="text-sm font-semibold text-primary">Project setup</p>
        <h1 className="mt-1 font-heading text-3xl font-semibold">
          Create a project
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Set the project scope and its owning organization.
        </p>
      </header>
      <div className="flex items-center gap-3 text-sm">
        <span
          className={
            step === 1 ? "font-semibold text-primary" : "text-muted-foreground"
          }
        >
          01 · Scope
        </span>
        <span className="h-px flex-1 bg-border" />
        <span
          className={
            step === 2 ? "font-semibold text-primary" : "text-muted-foreground"
          }
        >
          02 · Resources
        </span>
      </div>
      <form
        className="space-y-6 border bg-card p-6"
        onSubmit={form.handleSubmit(createProject)}
      >
        {step === 1 ? (
          <>
            <label className="block text-sm font-medium">
              Project name
              <input
                className="mt-2 h-11 w-full border bg-background px-3 font-normal"
                placeholder="e.g. Mobile app refresh"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <span className="mt-1 block text-xs text-destructive">
                  {form.formState.errors.name.message}
                </span>
              )}
            </label>
            <label className="block text-sm font-medium">
              Description
              <textarea
                className="mt-2 min-h-32 w-full border bg-background p-3 font-normal"
                placeholder="What should this project make possible?"
                {...form.register("description")}
              />
              {form.formState.errors.description && (
                <span className="mt-1 block text-xs text-destructive">
                  {form.formState.errors.description.message}
                </span>
              )}
            </label>
            <button
              className="bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              onClick={nextStep}
              type="button"
            >
              Continue to resources
            </button>
          </>
        ) : (
          <>
            <label className="block text-sm font-medium">
              Owning organization
              <select
                className="mt-2 h-11 w-full border bg-background px-3 font-normal"
                {...form.register("organizationId")}
              >
                <option value="">Select an organization</option>
                {organizations.map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
              {form.formState.errors.organizationId && (
                <span className="mt-1 block text-xs text-destructive">
                  {form.formState.errors.organizationId.message}
                </span>
              )}
            </label>
            {projectsQuery.isError && (
              <p className="text-sm text-destructive">
                Could not load organizations. Try again before creating a
                project.
              </p>
            )}
            {!projectsQuery.isPending && organizations.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No organizations are available to this account.
              </p>
            )}
            <div className="flex gap-3">
              <button
                className="border px-4 py-2 text-sm"
                onClick={() => setStep(1)}
                type="button"
              >
                Back
              </button>
              <button
                className="bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
                disabled={
                  createProjectMutation.isPending || organizations.length === 0
                }
                type="submit"
              >
                {createProjectMutation.isPending
                  ? "Creating project..."
                  : "Create project"}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
