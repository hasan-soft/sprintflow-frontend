const topics = [
  { question: "How do I invite a teammate?", answer: "Workspace admins can open People, choose Invite member, and assign a workspace role." },
  { question: "How do sprints work?", answer: "Managers create sprints around a project goal and use the sprint view to follow progress." },
  { question: "Where can I see my tasks?", answer: "Open My work or Task board in the member workspace to review and update assigned work." },
];

export default function HelpPage() {
  return <main className="mx-auto max-w-4xl px-5 py-16"><p className="text-sm font-semibold uppercase tracking-wider text-primary">Support</p><h1 className="mt-4 font-heading text-4xl font-semibold">Help center</h1><p className="mt-4 text-muted-foreground">Quick answers for the most common workspace workflows.</p><dl className="mt-10 divide-y border-y">{topics.map((topic) => <div className="py-5" key={topic.question}><dt className="font-semibold">{topic.question}</dt><dd className="mt-2 text-sm leading-6 text-muted-foreground">{topic.answer}</dd></div>)}</dl></main>;
}