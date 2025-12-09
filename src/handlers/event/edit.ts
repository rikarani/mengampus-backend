import type { API } from "@/types";
import type { Request, Response } from "express";
import type { AddEventSchema } from "@/schemas/event/add";
import type { Event } from "../../../prisma/generated/client";

import { z } from "zod";

import { Prisma, prisma } from "@/prisma/prisma";
import { addEventSchema } from "@/schemas/event/add";

type Params = {
  id: string;
};

export async function edit(request: Request<Params, any, AddEventSchema>, response: Response<API<Event>>) {
  const { id } = request.params;
  const forms = addEventSchema.parse(request.body);

  try {
    const event = await prisma.event.findUniqueOrThrow({
      where: { id },
    });

    await prisma.event.update({
      data: {
        ...forms,
      },
      where: {
        id: event.id,
      },
    });

    return response.json({
      success: true,
      message: "Berhasil Memperbarui Event",
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
