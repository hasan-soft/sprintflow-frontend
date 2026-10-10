import type { BoardTask, WorkspaceTask } from "@/types";

export const DEMO_BOARD_TASKS: BoardTask[] = [
  {
    id: "TASK-101",
    title: "Payment Gateway & Webhook Signature Verification",
    project: "Billing Engine & Checkout",
    priority: "High",
    status: "To do",
    description:
      "Implement automated webhook signatures, idempotency keys, and instant subscription upgrades for SSLCommerz & Stripe.",
    dueDate: "Oct 24, 2026",
    assignee: "Hasan (Fullstack)",
    attachments: [
      "https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=800&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "TASK-102",
    title: "Kanban Board Drag-and-Drop Interaction with State Sync",
    project: "Core Workflow",
    priority: "High",
    status: "In progress",
    description:
      "Setup @dnd-kit sensors, column drop zones, optimistic UI state, and toast feedback for seamless task management.",
    dueDate: "Oct 22, 2026",
    assignee: "Hasan (Frontend)",
    attachments: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "TASK-103",
    title: "Role-based Team Member Invitation & Access Control",
    project: "Workspace Management",
    priority: "Normal",
    status: "In progress",
    description:
      "Validate invitation tokens, role permissions (Admin vs Member vs Manager), and workspace membership checks.",
    dueDate: "Oct 26, 2026",
    assignee: "Hasan (Lead)",
    attachments: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "TASK-104",
    title: "Dark Mode Contrast & shadcn/ui Design Tokens Audit",
    project: "Design System (Tailwind)",
    priority: "Normal",
    status: "Review",
    description:
      "Ensure WCAG 2.1 AA accessibility guidelines are met across all card components, modals, and badge states.",
    dueDate: "Oct 28, 2026",
    assignee: "UI/UX Reviewer",
    attachments: [
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "TASK-105",
    title: "Sprint Velocity & Burndown Analytics Engine",
    project: "Sprint Analytics",
    priority: "Normal",
    status: "Done",
    description:
      "Aggregate completed story points per sprint cycle and generate visual burndown metrics for team leads.",
    dueDate: "Oct 18, 2026",
    assignee: "Backend Worker",
    attachments: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    ],
  },
];

export const DEMO_BACKEND_TASKS: WorkspaceTask[] = [
  {
    id: "TASK-101",
    title: "Payment Gateway & Webhook Signature Verification",
    description:
      "Implement automated webhook signatures, idempotency keys, and instant subscription upgrades.",
    status: "TODO",
    priority: "HIGH",
    dueDate: "2026-10-24T00:00:00.000Z",
    project: { id: "p1", name: "Billing Engine & Checkout" },
    assignee: { id: "u1", name: "Hasan", email: "hasan@sprintflow.dev" },
  },
  {
    id: "TASK-102",
    title: "Kanban Board Drag-and-Drop Interaction with State Sync",
    description:
      "Setup @dnd-kit sensors, column drop zones, optimistic UI state, and toast feedback.",
    status: "IN_PROGRESS",
    priority: "HIGH",
    dueDate: "2026-10-22T00:00:00.000Z",
    project: { id: "p2", name: "Core Workflow" },
    assignee: { id: "u1", name: "Hasan", email: "hasan@sprintflow.dev" },
  },
  {
    id: "TASK-103",
    title: "Role-based Team Member Invitation & Access Control",
    description:
      "Validate invitation tokens, role permissions, and workspace membership checks.",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    dueDate: "2026-10-26T00:00:00.000Z",
    project: { id: "p3", name: "Workspace Management" },
    assignee: { id: "u1", name: "Hasan", email: "hasan@sprintflow.dev" },
  },
  {
    id: "TASK-104",
    title: "Dark Mode Contrast & shadcn/ui Design Tokens Audit",
    description:
      "Ensure WCAG 2.1 AA accessibility guidelines are met across all components.",
    status: "IN_REVIEW",
    priority: "LOW",
    dueDate: "2026-10-28T00:00:00.000Z",
    project: { id: "p4", name: "Design System" },
    assignee: { id: "u2", name: "Design Team", email: "design@sprintflow.dev" },
  },
  {
    id: "TASK-105",
    title: "Sprint Velocity & Burndown Analytics Engine",
    description:
      "Aggregate completed story points per sprint cycle and generate visual burndown metrics.",
    status: "DONE",
    priority: "MEDIUM",
    dueDate: "2026-10-18T00:00:00.000Z",
    project: { id: "p5", name: "Sprint Analytics" },
    assignee: { id: "u1", name: "Hasan", email: "hasan@sprintflow.dev" },
  },
];
