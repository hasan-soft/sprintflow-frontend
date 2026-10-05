"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useCurrentUser, useUpdateProfile } from "@/hooks";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
});

type ProfileValues = z.infer<typeof profileSchema>;

export default function ProfileSettingsForm() {
  const profileQuery = useCurrentUser();
  const updateProfile = useUpdateProfile();
  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "" },
  });
  const profile = profileQuery.data?.data;

  useEffect(() => {
    if (profile) form.reset({ name: profile.name });
  }, [form, profile]);

  async function saveProfile(values: ProfileValues) {
    try {
      await updateProfile.mutateAsync({ name: values.name });
      toast.success("Profile settings saved");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Profile could not be updated.",
      );
    }
  }

  if (profileQuery.isPending) {
    return (
      <output
        aria-label="Loading profile"
        className="block h-72 max-w-2xl animate-pulse bg-muted"
      />
    );
  }

  if (profileQuery.isError || !profile) {
    return (
      <output className="block max-w-2xl border border-rose-700/30 bg-rose-700/5 px-4 py-3 text-sm text-rose-800">
        Your profile could not be loaded. Sign in again and retry.
      </output>
    );
  }

  return (
    <form
      className="max-w-2xl space-y-5 border bg-card p-6"
      onSubmit={form.handleSubmit(saveProfile)}
    >
      <div>
        <label className="text-sm font-medium" htmlFor="profile-name">
          Full name
        </label>
        <input
          className="mt-2 h-11 w-full border bg-background px-3 text-sm"
          id="profile-name"
          {...form.register("name")}
        />
        {form.formState.errors.name && (
          <p className="mt-1 text-xs text-destructive">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>
      <div>
        <label className="text-sm font-medium" htmlFor="profile-email">
          Email address
        </label>
        <input
          className="mt-2 h-11 w-full border bg-muted px-3 text-sm"
          id="profile-email"
          readOnly
          value={profile.email}
        />
      </div>
      <div>
        <label className="text-sm font-medium" htmlFor="profile-role">
          Workspace role
        </label>
        <input
          className="mt-2 h-11 w-full border bg-muted px-3 text-sm"
          id="profile-role"
          readOnly
          value={profile.role}
        />
      </div>
      <button
        className="bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
        disabled={updateProfile.isPending}
        type="submit"
      >
        {updateProfile.isPending ? "Saving..." : "Save profile"}
      </button>
    </form>
  );
}
