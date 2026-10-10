<div align="center">

# ⚡ SprintFlow — Agile Project Management SaaS

An enterprise-grade B2B Project Management and Workflow Tracking SaaS application built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **@dnd-kit**. Designed for agile engineering teams to plan sprints, track deliverables, and manage tasks across customizable Kanban workflows.

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-State_Management-orange?style=flat-square)](https://zustand.docs.pmnd.rs/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?style=flat-square&logo=react-query)](https://tanstack.com/query)

---

[Live Application](https://sprintflow-frontend.vercel.app) • [Backend Repository](https://github.com/hasan-soft/sprintflow-backend) • [API Documentation](https://sprintflow-backend.vercel.app/api-docs)

</div>

---

## 📌 Project Overview

**SprintFlow** is a modern project orchestration platform engineered to streamline development sprints. It replaces complex, bloated enterprise tools with a fast, intuitive interface that supports role-based access, interactive drag-and-drop Kanban execution, and SaaS subscription billing.

### 🌟 Key Highlights

- **🎯 Interactive Drag-and-Drop Kanban Board:** Built with `@dnd-kit/core` and `@dnd-kit/utilities` supporting smooth card transitions across `To do`, `In progress`, `Review`, `Blocked`, and `Done` with optimistic UI updates and live database synchronization.
- **🔍 Task Details & Media Modal:** Rich task modals featuring image/screenshot attachments galleries, instant image upload simulation, priority badges, assignee tags, and team discussion comment threads.
- **🛡️ Robust Role-Based Access Control (RBAC):** Dedicated views and permissions for **Admin**, **Manager**, and **Member** accounts.
- **💳 Multi-Gateway SaaS Subscriptions:** Integrated billing workflows supporting **Stripe** and **SSLCommerz** for tiered SaaS pricing packages (*Starter*, *Pro*, *Enterprise*).
- **⚡ Optimistic State Synchronization:** Powered by **Zustand** and **TanStack Query** for instant user feedback and resilient error rollback handling.
- **🎨 Modern Design System:** High-contrast, accessible UI styled with **Tailwind CSS**, **shadcn/ui**, and **Lucide Icons**.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 15 (App Router)](https://nextjs.org/) + [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Lucide React](https://lucide.dev/) |
| **Drag & Drop** | [@dnd-kit/core](https://dndkit.com/), [@dnd-kit/utilities](https://dndkit.com/) |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand), [TanStack React Query v5](https://tanstack.com/query/latest) |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) |
| **HTTP Client** | [ofetch](https://github.com/unjs/ofetch) with centralized API client |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) toast system |
| **Backend Integration** | RESTful API built with Node.js, Express, Prisma ORM, and PostgreSQL |

---

## 👥 Demo Access & Credentials

The live deployment comes pre-configured with active user accounts for all three organizational roles:

| Role | Email | Password | Access Capabilities |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@gmail.com` | `admin@1234` | Full workspace settings, billing management, organization control |
| **Manager** | `manager@gmail.com` | `manager@1234` | Project creation, sprint roadmaps, team task assignment |
| **Member** | `member@gmail.com` | `member@1234` | Assigned tasks dashboard, interactive Kanban board drag-and-drop |

---

## 🧩 Core Application Features

### 1. Interactive Kanban Workflow
- Drag and drop cards between status columns: `To do` ➔ `In progress` ➔ `Review` ➔ `Blocked` ➔ `Done`.
- Immediate optimistic UI update with real-time `PATCH /tasks/:id/status` API persistence.
- Automatic error rollback if network connection fails.

### 2. Task Details & Attachment Modal
- Click on any card on the board to view full sprint task context.
- Attachment preview gallery with high-resolution screenshots.
- Direct simulated image file uploader with live thumbnail additions.
- Inline status dropdown selector and live team discussion comments feed.

### 3. Role-Based Dashboards
- **Member Portal (`/member` & `/member/tasks`):** Focused view of sprint deliverables, personal metrics, and board execution.
- **Manager Portal (`/manager`):** Project timeline tracking, sprint lifecycle control, and team progress metrics.
- **Admin Portal (`/admin`):** Workspace subscription tiers, payment audit logs, and account settings.

### 4. SaaS Billing & Subscriptions
- Transparent pricing tiers with feature breakdown.
- Support for international card checkout (**Stripe**) and local currency checkout (**SSLCommerz**).

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.17.0` or later
- **npm** or **pnpm** / **yarn**
- **Git**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hasan-soft/sprintflow-frontend.git
   cd sprintflow-frontend
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file in the root directory and add the following variables:
   ```env
   NEXT_PUBLIC_API_BASE_URL=/api/backend
   NEXT_PUBLIC_API_URL=https://sprintflow-backend.vercel.app/api/v1
   BACKEND_URL=https://sprintflow-backend.vercel.app
   BACKEND_API_PREFIX=/api/v1
   NEXT_PUBLIC_APP_URL=http://localhost:3000

   # Demo Credentials
   ADMIN_EMAIL=admin@gmail.com
   ADMIN_PASSWORD=admin@1234
   MANAGER_EMAIL=manager@gmail.com
   MANAGER_PASSWORD=manager@1234
   MEMBER_EMAIL=member@gmail.com
   MEMBER_PASSWORD=member@1234
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 📂 Project Directory Structure

```text
src/
├── api/                  # Typed REST API service endpoints (auth, task, project, billing)
├── app/                  # Next.js App Router (Pages, Layouts, Route Groups)
│   ├── (auth)/           # Authentication routes (login, register)
│   ├── (dashboard)/      # Protected workspaces (admin, manager, member)
│   ├── (public)/         # Marketing landing, pricing, documentation pages
│   └── api/              # Next.js internal API proxy route handlers
├── components/           # Reusable UI & Domain Components
│   ├── modules/          # Domain-specific modules (Kanban board, Task modal, etc.)
│   ├── shared/           # Shared navigation, footers, breadcrumbs
│   └── ui/               # shadcn/ui primitives (button, dialog, input, etc.)
├── hooks/                # Custom React & TanStack Query hooks
├── lib/                  # Utilities, API client configuration, session management
├── stores/               # Zustand state stores (task store, board state)
├── types/                # TypeScript interfaces and enum definitions
└── validation/           # Zod schemas for form and API input validation
```

---

## 🧪 Available Scripts

| Script | Purpose |
| :--- | :--- |
| `npm run dev` | Runs the Next.js development server on `localhost:3000` |
| `npm run build` | Builds the optimized production application |
| `npm start` | Starts the production server |
| `npm run lint` | Runs Biome and TypeScript checks across the codebase |

---

## 🔗 Links & Resources

- **Frontend Repository:** [github.com/hasan-soft/sprintflow-frontend](https://github.com/hasan-soft/sprintflow-frontend)
- **Backend Repository:** [github.com/hasan-soft/sprintflow-backend](https://github.com/hasan-soft/sprintflow-backend)
- **Live Deployment:** [sprintflow-frontend.vercel.app](https://sprintflow-frontend.vercel.app)
- **Backend API Live Base:** [sprintflow-backend.vercel.app/api/v1](https://sprintflow-backend.vercel.app/api/v1)

---

## 📄 License

This project is licensed under the **MIT License**. Created as part of an Advanced Web Development SaaS assessment.
