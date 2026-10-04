"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.email("Enter a valid email address."),
  role: z.string(),
  timezone: z.string().min(1, "Choose a timezone."),
});

type ProfileValues = z.infer<typeof profileSchema>;

export default function ProfileSettingsForm() {
  const form = useForm<ProfileValues>({ resolver: zodResolver(profileSchema), defaultValues: { name: "Jordan Lee", email: "jordan@sprintflow.dev", role: "Member", timezone: "America/Los_Angeles" } });
  function saveProfile(values: ProfileValues) {
    toast.success("Profile settings saved", { description: `Updates for ${values.name} are ready.` });
  }
  return <form className="max-w-2xl space-y-5 border bg-card p-6" onSubmit={form.handleSubmit(saveProfile)}><div><label className="text-sm font-medium" htmlFor="profile-name">Full name</label><input className="mt-2 h-11 w-full border bg-background px-3 text-sm" id="profile-name" {...form.register("name")} />{form.formState.errors.name && <p className="mt-1 text-xs text-destructive">{form.formState.errors.name.message}</p>}</div><div><label className="text-sm font-medium" htmlFor="profile-email">Email address</label><input className="mt-2 h-11 w-full border bg-background px-3 text-sm" id="profile-email" type="email" {...form.register("email")} />{form.formState.errors.email && <p className="mt-1 text-xs text-destructive">{form.formState.errors.email.message}</p>}</div><div><label className="text-sm font-medium" htmlFor="profile-role">Workspace role</label><input className="mt-2 h-11 w-full border bg-muted px-3 text-sm" id="profile-role" readOnly {...form.register("role")} /></div><div><label className="text-sm font-medium" htmlFor="profile-timezone">Time zone</label><select className="mt-2 h-11 w-full border bg-background px-3 text-sm" id="profile-timezone" {...form.register("timezone")}><option value="America/Los_Angeles">Pacific Time</option><option value="America/Chicago">Central Time</option><option value="America/New_York">Eastern Time</option><option value="Europe/London">London</option></select></div><button className="bg-primary px-4 py-2 text-sm font-medium text-primary-foreground" type="submit">Save profile</button></form>;
}