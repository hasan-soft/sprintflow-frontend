import Link from "next/link";

const tasks = [
  { key: "SF-284", title: "Update onboarding flow", status: "In progress", due: "Today" },
  { key: "SF-291", title: "Review mobile empty states", status: "To do", due: "Oct 08" },
  { key: "SF-301", title: "Document analytics events", status: "Review", due: "Oct 10" },
];

export default function MemberOverviewPage() {
  return <div className="mx-auto max-w-7xl space-y-8"><header><p className="text-sm font-semibold text-primary">My workspace</p><h1 className="mt-1 font-heading text-3xl font-semibold">Good morning, Jordan</h1><p className="mt-2 text-sm text-muted-foreground">You have 3 assigned tasks, with one due today.</p></header><section className="grid gap-px border bg-border sm:grid-cols-3">{[{ label: "To do", value: "4" }, { label: "In progress", value: "2" }, { label: "Completed this week", value: "8" }].map((metric) => <div className="bg-card p-5" key={metric.label}><p className="text-sm text-muted-foreground">{metric.label}</p><p className="mt-3 font-heading text-3xl font-semibold">{metric.value}</p></div>)}</section><section className="border bg-card"><div className="flex items-center justify-between border-b px-5 py-4"><div><h2 className="font-semibold">Assigned to me</h2><p className="mt-1 text-sm text-muted-foreground">Your current sprint tasks.</p></div><Link className="text-sm font-medium underline underline-offset-4" href="/member/tasks">Open task board</Link></div><div className="divide-y">{tasks.map((task) => <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4" key={task.key}><div><p className="text-xs font-semibold text-primary">{task.key}</p><p className="mt-1 font-medium">{task.title}</p></div><div className="flex items-center gap-5 text-sm"><span className="text-muted-foreground">{task.status}</span><span>Due {task.due}</span></div></div>)}</div></section></div>;
}