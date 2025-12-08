import slugify from "slugify";

import type { API } from "@/types";
import type { Request, Response } from "express";
import type { Category } from "../../../prisma/generated/client";

import { z } from "zod";

import { Prisma, prisma } from "@/prisma/prisma";
import { categorySchema } from "@/schemas/category";

export async function create(request: Request, response: Response<API<Category>>) {
  try {
    const { name } = categorySchema.parse(request.body);

    const category = await prisma.category.create({
      data: {
        name,
        slug: slugify(name, { lower: true, strict: true }),
      },
    });

    return response.status(201).json({
      success: true,
      message: "Berhasil Menambahkan Kategori",
      data: category,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return response.status(400).json({
        success: false,
        message: "Validasi Gagal",
        errors: z.flattenError(error).fieldErrors,
      });
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return response.status(409).json({
          success: false,
          message: "Kategori sudah ada",
          errorCode: error.code,
        });
      }
    }
  }
}
