import type { UserRole } from "@/types";
import { adminRoutes } from "./admin.routes";
import { managerRoutes } from "./manager.routes";
import { memberRoutes } from "./member.routes";

export * from "./admin.routes";
export * from "./manager.routes";
export * from "./member.routes";

export const workspaceRoutes = {
  ADMIN: adminRoutes,
  MANAGER: managerRoutes,
  MEMBER: memberRoutes,
} satisfies Record<UserRole, typeof adminRoutes>;
