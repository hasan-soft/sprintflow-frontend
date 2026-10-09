import { z } from "zod";

export const createProjectSchema = z.object({
  name: z
    .string({ message: "Project name is required" })
    .min(3, "Project name must be at least 3 characters")
    .max(100, "Project name must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  status: z
    .enum(["PLANNED", "ACTIVE", "ON_HOLD", "COMPLETED", "ARCHIVED"], {
      message: "Invalid project status",
    })
    .optional()
    .default("PLANNED"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  budget: z
    .number({ message: "Budget must be a number" })
    .nonnegative("Budget cannot be negative")
    .optional(),
});

export const updateProjectSchema = createProjectSchema.partial();

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
