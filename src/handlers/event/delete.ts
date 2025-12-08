import type { API } from "@/types";
import type { Request, Response } from "express";

import { Prisma, prisma } from "@/prisma/prisma";

export async function deleteEvent(request: Request<{ id: string }>, response: Response<API>) {
  const { id } = request.params;

  try {
    await prisma.event.delete({
      where: { id },
    });

    return response.status(200).json({
      success: true,
      message: "Berhasil Menghapus Event",
      data: null,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return response.status(404).json({
          success: false,
          message: "Event tidak ditemukan",
          errorCode: error.code,
        });
      }
    }
  }
}
