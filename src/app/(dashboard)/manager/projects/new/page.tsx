"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, FolderPlus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useCreateProject, useProjects } from "@/hooks";

const projectSchema = z.object({
  name: z.string().min(2, "Use at least 2 characters for the project name."),
  description: z.string().optional(),
  organizationId: z.string().min(1, "Choose an owning organization."),
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
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Project setup wizard
        </p>
        <h1 className="mt-1 font-heading text-3xl font-semibold text-foreground">
          Create a project
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Define the project scope and assign its owning organization.
        </p>
      </header>

      {/* Wizard Step Progress */}
      <div className="flex items-center gap-3 text-sm">
        <span
          className={`flex items-center gap-2 text-xs font-semibold ${
            step === 1 ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <span className={`flex size-6 items-center justify-center rounded-full text-[11px] font-bold ${
            step === 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}>
            1
          </span>
          <span>Scope & Objective</span>
        </span>
        <span className="h-px flex-1 bg-border" />
        <span
          className={`flex items-center gap-2 text-xs font-semibold ${
            step === 2 ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <span className={`flex size-6 items-center justify-center rounded-full text-[11px] font-bold ${
            step === 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}>
            2
          </span>
          <span>Organization & Resources</span>
        </span>
      </div>

      <form
        className="space-y-6 rounded-xl border border-border/80 bg-card p-6 shadow-xs"
        onSubmit={form.handleSubmit(createProject)}
      >
        {step === 1 ? (
          <>
            <label className="block text-xs font-semibold tracking-wide text-foreground">
              Project Name
              <input
                className="mt-2 h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm font-normal text-foreground placeholder:text-muted-foreground/60 transition focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                placeholder="e.g. Core Web Platform v2"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <span className="mt-1.5 block text-xs text-destructive">
                  {form.formState.errors.name.message}
                </span>
              )}
            </label>

            <label className="block text-xs font-semibold tracking-wide text-foreground">
              Project Description
              <textarea
                className="mt-2 min-h-32 w-full rounded-xl border border-input bg-background p-3.5 text-sm font-normal text-foreground placeholder:text-muted-foreground/60 transition focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                placeholder="Describe project deliverables, business impact, and sprint goals..."
                {...form.register("description")}
              />
              {form.formState.errors.description && (
                <span className="mt-1.5 block text-xs text-destructive">
                  {form.formState.errors.description.message}
                </span>
              )}
            </label>

            <button
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 transition"
              onClick={nextStep}
              type="button"
            >
              <span>Continue to resources</span>
              <ArrowRight className="size-4" />
            </button>
          </>
        ) : (
          <>
            <label className="block text-xs font-semibold tracking-wide text-foreground">
              Owning Organization
              <select
                className="mt-2 h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm font-normal text-foreground transition focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
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
                <span className="mt-1.5 block text-xs text-destructive">
                  {form.formState.errors.organizationId.message}
                </span>
              )}
            </label>

            {projectsQuery.isError && (
              <p className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
                Could not load organizations. Please try again before creating a project.
              </p>
            )}

            {!projectsQuery.isPending && organizations.length === 0 && (
              <p className="rounded-xl border border-border/80 bg-muted/40 p-3 text-xs text-muted-foreground">
                No organizations are available to this account. You can create a demo project once assigned to an organization.
              </p>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition"
                onClick={() => setStep(1)}
                type="button"
              >
                <ArrowLeft className="size-4" />
                <span>Back</span>
              </button>
              <button
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 disabled:opacity-60 transition"
                disabled={
                  createProjectMutation.isPending || organizations.length === 0
                }
                type="submit"
              >
                {createProjectMutation.isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Creating project...</span>
                  </>
                ) : (
                  <>
                    <FolderPlus className="size-4" />
                    <span>Create project</span>
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
