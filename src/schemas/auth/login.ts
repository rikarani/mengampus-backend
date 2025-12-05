import { z } from "zod";

export const loginSchema = z.object({
  nim: z.string().min(11),
  password: z.string().min(8),
  role: z.enum(["admin", "user"]),
});

export type LoginSchema = z.infer<typeof loginSchema>;
