import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string({ message: "Task title is required" })
    .min(3, "Title must be at least 3 characters")
    .max(150, "Title must be less than 150 characters"),
  description: z
    .string()
    .max(1000, "Description must be less than 1000 characters")
    .optional(),
  priority: z
    .enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"], {
      message: "Invalid priority",
    })
    .default("MEDIUM"),
  status: z
    .enum(["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE", "CANCELLED"], {
      message: "Invalid task status",
    })
    .default("TODO"),
  dueDate: z.string().optional(),
  assigneeId: z.string().optional(),
  sprintId: z.string().optional(),
  estimatedHours: z
    .number()
    .nonnegative("Estimated hours cannot be negative")
    .optional(),
});

export const updateTaskSchema = createTaskSchema.partial();

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
