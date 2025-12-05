import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(3),
    email: z.email(),
    nim: z.string().min(11).toUpperCase(),
    prodi: z.string(),
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Konfirmasi Password Tidak Sama",
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
