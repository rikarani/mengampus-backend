import type { Request, Response } from "express";

import type { EventModel } from "../../../prisma/generated/models";
import { Prisma, prisma } from "@/prisma/prisma";
import { z } from "zod";

import type { API } from "@/types";

type Params = {
  id: string;
};

export async function detail(request: Request<Params>, response: Response<API<EventModel>>) {
  const { id } = request.params;

  try {
    const event = await prisma.event.findUniqueOrThrow({
      where: { id },
    });

    return response.json({
      success: true,
      data: event,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return response.status(404).json({
          success: false,
          message: "Event Tidak Ditemukan",
        });
      }
    }
  }
}
