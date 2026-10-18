import ProfileSettingsForm from "@/components/modules/member/ProfileSettingsForm";

export default function AdminProfilePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-7">
      <header>
        <p className="text-sm font-semibold text-primary">Administration</p>
        <h1 className="mt-1 font-heading text-3xl font-semibold">
          Admin Profile Settings
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage your administrator profile and workspace account preferences.
        </p>
      </header>
      <ProfileSettingsForm />
    </div>
  );
}
