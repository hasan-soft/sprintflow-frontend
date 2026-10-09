import { z } from "zod";

export const createSprintSchema = z.object({
  name: z
    .string({ message: "Sprint name is required" })
    .min(2, "Sprint name must be at least 2 characters")
    .max(80, "Sprint name must be less than 80 characters"),
  goal: z
    .string()
    .max(500, "Sprint goal must be less than 500 characters")
    .optional(),
  startDate: z.string({ message: "Start date is required" }),
  endDate: z.string({ message: "End date is required" }),
  projectId: z.string({ message: "Project is required" }),
});

export const updateSprintSchema = createSprintSchema.partial().omit({ projectId: true });

export type CreateSprintInput = z.infer<typeof createSprintSchema>;
export type UpdateSprintInput = z.infer<typeof updateSprintSchema>;
