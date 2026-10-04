import ProfileSettingsForm from "@/components/modules/member/ProfileSettingsForm";

export default function MemberProfilePage() {
  return <div className="mx-auto max-w-4xl space-y-7"><header><p className="text-sm font-semibold text-primary">My workspace</p><h1 className="mt-1 font-heading text-3xl font-semibold">Profile settings</h1><p className="mt-2 text-sm text-muted-foreground">Manage your contributor profile and preferences.</p></header><ProfileSettingsForm /></div>;
}