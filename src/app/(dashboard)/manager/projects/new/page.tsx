"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const projectSchema = z.object({
  name: z.string().min(3, "Use at least 3 characters for the project name."),
  objective: z.string().min(10, "Add a little more detail to the objective."),
  team: z.string().min(1, "Choose a team."),
  budget: z.string().regex(/^\d+(\.\d{1,2})?$/, "Enter a valid budget amount."),
});

type ProjectValues = z.infer<typeof projectSchema>;

export default function NewProjectPage() {
  const [step, setStep] = useState(1);
  const form = useForm<ProjectValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: { name: "", objective: "", team: "", budget: "" },
  });

  async function nextStep() {
    const valid = await form.trigger(step === 1 ? ["name", "objective"] : ["team", "budget"]);
    if (valid) setStep(2);
  }

  function createProject(values: ProjectValues) {
    toast.success(`${values.name} is ready to plan`, { description: `${values.team} team · $${values.budget} budget` });
    form.reset();
    setStep(1);
  }

  return <div className="mx-auto max-w-3xl space-y-7"><header><p className="text-sm font-semibold text-primary">Project setup</p><h1 className="mt-1 font-heading text-3xl font-semibold">Create a project</h1><p className="mt-2 text-sm text-muted-foreground">Set the outcome, team, and initial budget.</p></header><div className="flex items-center gap-3 text-sm"><span className={step === 1 ? "font-semibold text-primary" : "text-muted-foreground"}>01 · Scope</span><span className="h-px flex-1 bg-border" /><span className={step === 2 ? "font-semibold text-primary" : "text-muted-foreground"}>02 · Resources</span></div><form className="space-y-6 border bg-card p-6" onSubmit={form.handleSubmit(createProject)}>{step === 1 ? <><label className="block text-sm font-medium">Project name<input className="mt-2 h-11 w-full border bg-background px-3 font-normal" placeholder="e.g. Mobile app refresh" {...form.register("name")} />{form.formState.errors.name && <span className="mt-1 block text-xs text-destructive">{form.formState.errors.name.message}</span>}</label><label className="block text-sm font-medium">Outcome and objective<textarea className="mt-2 min-h-32 w-full border bg-background p-3 font-normal" placeholder="What should this project make possible?" {...form.register("objective")} />{form.formState.errors.objective && <span className="mt-1 block text-xs text-destructive">{form.formState.errors.objective.message}</span>}</label><button className="bg-primary px-4 py-2 text-sm font-medium text-primary-foreground" onClick={nextStep} type="button">Continue to resources</button></> : <><label className="block text-sm font-medium">Owning team<select className="mt-2 h-11 w-full border bg-background px-3 font-normal" {...form.register("team")}><option value="">Select a team</option><option value="Platform">Platform</option><option value="Product">Product</option><option value="Mobile">Mobile</option><option value="Design">Design</option></select>{form.formState.errors.team && <span className="mt-1 block text-xs text-destructive">{form.formState.errors.team.message}</span>}</label><label className="block text-sm font-medium">Initial budget<input className="mt-2 h-11 w-full border bg-background px-3 font-normal" inputMode="decimal" placeholder="25000" {...form.register("budget")} />{form.formState.errors.budget && <span className="mt-1 block text-xs text-destructive">{form.formState.errors.budget.message}</span>}</label><div className="flex gap-3"><button className="border px-4 py-2 text-sm" onClick={() => setStep(1)} type="button">Back</button><button className="bg-primary px-4 py-2 text-sm font-medium text-primary-foreground" type="submit">Create project</button></div></>}</form></div>;
}