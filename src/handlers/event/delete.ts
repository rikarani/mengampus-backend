import type { API } from "@/types";
import type { Request, Response } from "express";

import { auth } from "@/lib/auth";
import { Prisma, prisma } from "@/prisma/prisma";

type Params = {
  id: string;
};

export async function deleteEvent(request: Request<Params>, response: Response<API>) {
  const { id } = request.params;

  const hasPermission = await auth.api.userHasPermission({
    body: {
      userId: request.session!.user.id,
      permission: {
        event: ["delete"],
      },
    },
  });

  if (!hasPermission.success) {
    return response.status(403).json({
      success: false,
      message: "Anda tidak memiliki izin untuk menghapus event",
      errorCode: "403",
    });
  }

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
