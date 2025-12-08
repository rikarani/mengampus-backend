import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, { error: "Nama Kategori tidak boleh kosong" }),
});

export type CategorySchema = z.infer<typeof categorySchema>;
