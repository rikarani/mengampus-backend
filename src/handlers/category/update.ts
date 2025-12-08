import slugify from "slugify";

import type { API } from "@/types";
import type { Request, Response } from "express";
import type { Category } from "../../../prisma/generated/client";

import { z } from "zod";

import { Prisma, prisma } from "@/prisma/prisma";
import { categorySchema } from "@/schemas/category";

type Params = {
  id: string;
};

export async function update(request: Request<Params>, response: Response<API<Category>>) {
  try {
    const { name } = categorySchema.parse(request.body);

    const category = await prisma.category.update({
      data: {
        name,
        slug: slugify(name, { lower: true, strict: true }),
      },
      where: {
        id: request.params.id,
      },
    });

    return response.status(201).json({
      success: true,
      message: "Berhasil Memperbarui Kategori",
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

      if (error.code === "P2025") {
        return response.status(409).json({
          success: false,
          message: "Kategori tidak ditemukan",
          errorCode: error.code,
        });
      }
    }
  }
}
