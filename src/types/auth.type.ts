export type UserRole = "ADMIN" | "MANAGER" | "MEMBER";
export type BoardTaskStatus =
  | "To do"
  | "In progress"
  | "Review"
  | "Blocked"
  | "Done";
export type BackendTaskStatus =
  | "TODO"
  | "IN_PROGRESS"
  | "IN_REVIEW"
  | "BLOCKED"
  | "DONE";

export type BoardTask = {
  id: string;
  title: string;
  project: string;
  priority: "High" | "Normal";
  status: BoardTaskStatus;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegistrationPayload = LoginPayload & {
  name: string;
  organizationName?: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationId?: string | null;
  avatarUrl?: string | null;
  picture?: string | null;
  image?: string | null;
  avatar?: string | null;
};

export type AuthSessionResponse = {
  success: boolean;
  role: UserRole;
  user?: AuthUser;
};

export type ApiEnvelope<T> = {
  success: boolean;
  statusCode?: number;
  message?: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type WorkspaceUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: string;
  avatarUrl?: string | null;
  picture?: string | null;
  image?: string | null;
  avatar?: string | null;
};

export type UserQuery = {
  page?: string;
  limit?: string;
  role?: UserRole;
  searchTerm?: string;
};

export type WorkspaceProject = {
  id: string;
  name: string;
  description?: string | null;
  status: string;
  organizationId: string;
  organization?: { id: string; name: string };
  _count?: { tasks: number; sprints: number };
};

export type WorkspaceTask = {
  id: string;
  title: string;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
  dueDate?: string | null;
  status: BackendTaskStatus;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  project?: { id: string; name: string };
  assignee?: { id: string; name: string; email: string } | null;
};

export type CreateProjectPayload = {
  name: string;
  description?: string;
  organizationId: string;
  status?: "PLANNED" | "ACTIVE" | "ON_HOLD" | "COMPLETED" | "ARCHIVED";
};

export type ProjectQuery = {
  searchTerm?: string;
  status?: "PLANNED" | "ACTIVE" | "ON_HOLD" | "COMPLETED" | "ARCHIVED";
  page?: string;
  limit?: string;
};

export type CreateTaskPayload = {
  title: string;
  description?: string;
  projectId: string;
  sprintId?: string;
  assigneeId?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  dueDate?: string;
};

export type TaskQuery = {
  page?: string;
  limit?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  status?: BackendTaskStatus;
  assigneeId?: string;
  projectId?: string;
  sprintId?: string;
  searchTerm?: string;
};

export type UpdateTaskPayload = {
  title?: string;
  description?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  sprintId?: string | null;
};

export type CreateSubtaskPayload = {
  taskId: string;
  title: string;
};

export type WorkspaceSubtask = {
  id: string;
  taskId: string;
  title: string;
  isDone: boolean;
  createdAt?: string;
};

export type CreateCommentPayload = {
  taskId: string;
  content: string;
};

export type WorkspaceComment = {
  id: string;
  taskId: string;
  content: string;
  createdAt: string;
  user?: { id: string; name: string };
};

export type PaymentPlan = "PRO" | "ENTERPRISE";

export type PaymentRecord = {
  id: string;
  status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED" | "CANCELLED";
  amount: number;
  plan: PaymentPlan;
  createdAt?: string;
};

export type CreateSprintPayload = {
  name: string;
  projectId: string;
  startDate: string;
  endDate: string;
  status?: "UPCOMING" | "ACTIVE" | "COMPLETED";
};

export type WorkspaceSprint = {
  id: string;
  name: string;
  status: "UPCOMING" | "ACTIVE" | "COMPLETED";
  startDate: string;
  endDate: string;
  tasks?: WorkspaceTask[];
};
