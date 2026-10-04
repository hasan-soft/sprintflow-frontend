"use client";

import { useState } from "react";
import { toast } from "sonner";

const initialAllocation = [
  { name: "Mobile app refresh", allocated: 24000, spent: 15600 },
  { name: "Customer onboarding", allocated: 32000, spent: 19400 },
  { name: "Usage analytics", allocated: 18000, spent: 12800 },
];

export default function ManagerBudgetPage() {
  const [allocations, setAllocations] = useState(initialAllocation);
  const total = allocations.reduce((sum, item) => sum + item.allocated, 0);
  const spent = allocations.reduce((sum, item) => sum + item.spent, 0);
  function adjustBudget(index: number, value: string) {
    const amount = Number(value);
    if (!Number.isFinite(amount) || amount < 0) return;
    setAllocations((existing) => existing.map((item, itemIndex) => itemIndex === index ? { ...item, allocated: amount } : item));
  }
  return <div className="mx-auto max-w-7xl space-y-7"><header><p className="text-sm font-semibold text-primary">Planning</p><h1 className="mt-1 font-heading text-3xl font-semibold">Budget allocation</h1><p className="mt-2 text-sm text-muted-foreground">Adjust project funding and monitor spend against the workspace pool.</p></header><section className="grid gap-px border bg-border sm:grid-cols-3">{[{ label: "Allocated", value: `$${total.toLocaleString()}` }, { label: "Spent to date", value: `$${spent.toLocaleString()}` }, { label: "Available", value: `$${(total - spent).toLocaleString()}` }].map((item) => <div className="bg-card p-5" key={item.label}><p className="text-sm text-muted-foreground">{item.label}</p><p className="mt-3 font-heading text-2xl font-semibold">{item.value}</p></div>)}</section><section className="divide-y border bg-card">{allocations.map((item, index) => <div className="grid gap-4 p-5 md:grid-cols-[1fr_160px_1fr] md:items-center" key={item.name}><div><h2 className="font-medium">{item.name}</h2><p className="mt-1 text-sm text-muted-foreground">${item.spent.toLocaleString()} spent</p></div><label className="text-xs text-muted-foreground">Allocated budget<input aria-label={`${item.name} allocation`} className="mt-1 h-10 w-full border bg-background px-3 text-sm text-foreground" min="0" onChange={(event) => adjustBudget(index, event.target.value)} type="number" value={item.allocated} /></label><div><div className="mb-2 flex justify-between text-xs"><span className="text-muted-foreground">Budget used</span><span>{Math.min(100, Math.round(item.spent / Math.max(1, item.allocated) * 100))}%</span></div><div className="h-1.5 bg-muted"><div className="h-full bg-primary" style={{ width: `${Math.min(100, item.spent / Math.max(1, item.allocated) * 100)}%` }} /></div></div></div>)}</section><button className="bg-primary px-4 py-2 text-sm font-medium text-primary-foreground" onClick={() => toast.success("Budget allocations saved")} type="button">Save allocations</button></div>;
}