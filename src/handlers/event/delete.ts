import type { Request, Response } from "express";

import { Prisma, prisma } from "@/prisma/prisma";

import type { API } from "@/types";

export async function deleteEvent(request: Request<{ id: string }>, response: Response<API>) {
  const { id } = request.params;

  try {
    await prisma.event.delete({
      where: { id },
    });

    return response.status(200).json({
      success: true,
      data: {
        message: "Berhasil Menghapus Event",
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return response.status(404).json({
          success: false,
          data: {
            message: "Event tidak ditemukan",
          },
        });
      }
    }
  }
}
