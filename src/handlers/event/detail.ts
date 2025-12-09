import type { API } from "@/types";
import type { Request, Response } from "express";
import type { Event } from "../../../prisma/generated/client";

import { Prisma, prisma } from "@/prisma/prisma";

type Params = {
  id: string;
};

export async function detail(request: Request<Params>, response: Response<API<Event>>) {
  const { id } = request.params;

  try {
    const event = await prisma.event.findUniqueOrThrow({
      where: { id },
    });

    return response.json({
      success: true,
      message: "Berhasil Mendapatkan Detail Event",
      data: event,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return response.status(404).json({
          success: false,
          message: "Event Tidak Ditemukan",
          errorCode: "404",
        });
      }
    }
  }
}
