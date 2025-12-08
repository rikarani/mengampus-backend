import type { API } from "@/types";
import type { Request, Response } from "express";

import { Prisma, prisma } from "@/prisma/prisma";

type Params = {
  id: string;
};

export async function deleteCategory(request: Request<Params>, response: Response<API>) {
  try {
    await prisma.category.delete({
      where: {
        id: request.params.id,
      },
    });

    return response.status(200).json({
      success: true,
      message: "Berhasil Menghapus Kategori",
      data: null,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
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
