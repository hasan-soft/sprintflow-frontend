const activity = [
  { date: "Today · 10:18 AM", action: "Moved SF-284 to In progress", project: "Customer onboarding" },
  { date: "Today · 9:42 AM", action: "Commented on SF-301", project: "Usage analytics" },
  { date: "Yesterday · 4:05 PM", action: "Completed SF-276", project: "Mobile app refresh" },
  { date: "Yesterday · 11:20 AM", action: "Joined the Mobile app refresh project", project: "Workspace" },
];

export default function MemberActivityPage() {
  return <div className="mx-auto max-w-4xl space-y-7"><header><p className="text-sm font-semibold text-primary">My workspace</p><h1 className="mt-1 font-heading text-3xl font-semibold">Activity history</h1><p className="mt-2 text-sm text-muted-foreground">Recent updates and contributions across your projects.</p></header><ol className="divide-y border bg-card">{activity.map((item) => <li className="grid gap-2 px-5 py-5 sm:grid-cols-[160px_1fr]" key={`${item.date}-${item.action}`}><time className="text-xs text-muted-foreground">{item.date}</time><div><p className="text-sm font-medium">{item.action}</p><p className="mt-1 text-xs text-muted-foreground">{item.project}</p></div></li>)}</ol></div>;
}