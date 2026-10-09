import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name must be less than 80 characters"),
  bio: z
    .string()
    .max(300, "Bio must be less than 300 characters")
    .optional(),
  avatarUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string({ message: "Current password is required" }).min(1),
    newPassword: z
      .string({ message: "New password is required" })
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string({ message: "Please confirm your password" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
