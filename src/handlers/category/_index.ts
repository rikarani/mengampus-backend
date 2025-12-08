import type { API } from "@/types";
import type { Request, Response } from "express";
import type { Category } from "../../../prisma/generated/client";

import { prisma } from "@/prisma/prisma";

export async function index(_: Request, response: Response<API<Category[]>>) {
  const categories = await prisma.category.findMany();

  return response.status(200).json({
    success: true,
    message: "Berhasil Mengambil Kategori",
    data: categories,
  });
}
