import ProfileSettingsForm from "@/components/modules/member/ProfileSettingsForm";

export default function ManagerProfilePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-7">
      <header>
        <p className="text-sm font-semibold text-primary">Team Management</p>
        <h1 className="mt-1 font-heading text-3xl font-semibold">
          Manager Profile Settings
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage your project manager profile and workspace account preferences.
        </p>
      </header>
      <ProfileSettingsForm />
    </div>
  );
}
