import TaskBoard from "@/components/modules/member/TaskBoard";

export default function MemberTasksPage() {
  return <div className="mx-auto max-w-7xl space-y-7"><header><p className="text-sm font-semibold text-primary">Current sprint · Oct 07–21</p><h1 className="mt-1 font-heading text-3xl font-semibold">Task board</h1><p className="mt-2 text-sm text-muted-foreground">Four assigned tasks across three workflow stages.</p></header><TaskBoard /></div>;
}