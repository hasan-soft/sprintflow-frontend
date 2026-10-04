const events = [
  {
    actor: "Alex Morgan",
    action: "Updated workspace billing",
    detail: "Plan settings",
    time: "Today, 10:42 AM",
  },
  {
    actor: "Sam Rivera",
    action: "Created a sprint",
    detail: "Mobile release 24.10",
    time: "Today, 9:18 AM",
  },
  {
    actor: "Jordan Lee",
    action: "Completed a task",
    detail: "SF-284 · Update onboarding flow",
    time: "Yesterday, 4:37 PM",
  },
  {
    actor: "Alex Morgan",
    action: "Invited a member",
    detail: "taylor@sprintflow.dev",
    time: "Yesterday, 2:06 PM",
  },
];

export default function AdminLogsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <header>
        <p className="text-sm font-semibold text-primary">Administration</p>
        <h1 className="mt-1 font-heading text-3xl font-semibold">
          Activity logs
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Recent changes made across this workspace.
        </p>
      </header>
      <div className="overflow-x-auto border bg-card">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="border-b bg-muted/40 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Actor</th>
              <th className="px-4 py-3 font-medium">Event</th>
              <th className="px-4 py-3 font-medium">Details</th>
              <th className="px-4 py-3 font-medium">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {events.map((event) => (
              <tr key={`${event.actor}-${event.action}`}>
                <td className="px-4 py-4 font-medium">{event.actor}</td>
                <td className="px-4 py-4">{event.action}</td>
                <td className="px-4 py-4 text-muted-foreground">
                  {event.detail}
                </td>
                <td className="px-4 py-4 text-muted-foreground">
                  {event.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
