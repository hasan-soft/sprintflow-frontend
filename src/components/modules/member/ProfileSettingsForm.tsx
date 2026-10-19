"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
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
      toast.success("Profile settings saved successfully");
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
        className="block h-72 max-w-2xl rounded-xl animate-pulse bg-muted/60"
      />
    );
  }

  if (profileQuery.isError || !profile) {
    return (
      <output className="block max-w-2xl rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
        Your profile could not be loaded. Sign in again and retry.
      </output>
    );
  }

  return (
    <form
      className="max-w-2xl space-y-5 rounded-xl border border-border/80 bg-card p-6 shadow-xs"
      onSubmit={form.handleSubmit(saveProfile)}
    >
      <div>
        <label
          className="text-xs font-semibold tracking-wide text-foreground"
          htmlFor="profile-name"
        >
          Full Name
        </label>
        <input
          className="mt-1.5 h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
          id="profile-name"
          placeholder="Your full name"
          {...form.register("name")}
        />
        {form.formState.errors.name && (
          <p className="mt-1 text-xs text-destructive">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label
          className="text-xs font-semibold tracking-wide text-foreground"
          htmlFor="profile-email"
        >
          Email Address
        </label>
        <input
          className="mt-1.5 h-11 w-full rounded-xl border border-border/60 bg-muted/60 px-3.5 text-sm font-mono text-muted-foreground cursor-not-allowed"
          id="profile-email"
          readOnly
          value={profile.email}
        />
      </div>

      <div>
        <label
          className="text-xs font-semibold tracking-wide text-foreground"
          htmlFor="profile-role"
        >
          Workspace Role
        </label>
        <input
          className="mt-1.5 h-11 w-full rounded-xl border border-border/60 bg-muted/60 px-3.5 text-sm font-mono text-muted-foreground cursor-not-allowed"
          id="profile-role"
          readOnly
          value={profile.role}
        />
      </div>

      <button
        className="flex h-10.5 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-xs transition hover:bg-primary/90 disabled:opacity-60"
        disabled={updateProfile.isPending}
        type="submit"
      >
        {updateProfile.isPending ? (
          <>
            <Loader2 className="animate-spin" size={15} />
            <span>Saving changes...</span>
          </>
        ) : (
          <>
            <Save size={15} />
            <span>Save Profile</span>
          </>
        )}
      </button>
    </form>
  );
}
