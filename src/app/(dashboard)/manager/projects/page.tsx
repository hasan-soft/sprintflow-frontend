import Link from "next/link";

const projects = [
  { name: "Mobile app refresh", status: "In progress", team: "Mobile", due: "Oct 24, 2026", budget: "$18,400" },
  { name: "Customer onboarding", status: "At risk", team: "Platform", due: "Nov 02, 2026", budget: "$26,000" },
  { name: "Usage analytics", status: "In progress", team: "Product", due: "Oct 18, 2026", budget: "$12,800" },
];

export default function ManagerProjectsPage() {
  return <div className="mx-auto max-w-7xl space-y-7"><header className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold text-primary">Delivery</p><h1 className="mt-1 font-heading text-3xl font-semibold">Projects</h1><p className="mt-2 text-sm text-muted-foreground">Project scope, ownership, due dates, and allocated budget.</p></div><Link className="bg-primary px-4 py-2 text-sm font-medium text-primary-foreground" href="/manager/projects/new">Create project</Link></header><div className="overflow-x-auto border bg-card"><table className="w-full min-w-[760px] text-left text-sm"><thead className="border-b bg-muted/40 text-xs uppercase text-muted-foreground"><tr><th className="px-4 py-3 font-medium">Project</th><th className="px-4 py-3 font-medium">Team</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 font-medium">Due date</th><th className="px-4 py-3 font-medium">Budget</th></tr></thead><tbody className="divide-y">{projects.map((project) => <tr key={project.name}><td className="px-4 py-4 font-medium">{project.name}</td><td className="px-4 py-4">{project.team}</td><td className="px-4 py-4"><span className={project.status === "At risk" ? "text-amber-700" : "text-emerald-700"}>{project.status}</span></td><td className="px-4 py-4 text-muted-foreground">{project.due}</td><td className="px-4 py-4">{project.budget}</td></tr>)}</tbody></table></div><div className="border p-6 text-center text-sm text-muted-foreground">Showing 3 of 3 active projects</div></div>;
}