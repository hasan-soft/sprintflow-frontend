import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email("Invalid email address"),

  password: z.string({ message: "Password is required" }),
});


export const registerSchema = z.object({
  name: z
    .string({ message: "Full name is required" })
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name must be less than 80 characters"),
  email: z
    .string({ message: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ message: "Password is required" })
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: z
    .string({ message: "Please confirm your password" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
