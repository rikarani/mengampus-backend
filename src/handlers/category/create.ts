import type { Request, Response } from "express";
import slugify from "slugify";

import { prisma } from "@/prisma/prisma";

import type { API } from "@/types";

export async function create(request: Request, response: Response<API>) {
  const categories = await prisma.category.createMany({
    data: [
      {
        name: "Seminar",
        slug: slugify("Seminar", { lower: true }),
      },
      {
        name: "Workshop",
        slug: slugify("Workshop", { lower: true }),
      },
      {
        name: "Kunjungan Orang Penting",
        slug: slugify("Kunjungan Orang Penting", { lower: true }),
      },
      {
        name: "Siraman Rohani",
        slug: slugify("Siraman Rohani", { lower: true }),
      },
      {
        name: "Expo dan Festival",
        slug: slugify("Expo dan Festival", { lower: true }),
      },
    ],
  });

  if (!categories) {
    return response.status(500).json({
      success: false,
      data: {
        message: "Gagal membuat kategori",
      },
    });
  }

  return response.status(201).json({
    success: true,
    data: {
      message: "Kategori berhasil dibuat",
    },
  });
}
