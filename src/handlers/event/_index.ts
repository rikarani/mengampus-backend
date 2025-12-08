import type { API } from "@/types";
import type { Request, Response } from "express";
import type { Event, Category } from "../../../prisma/generated/client";

import { prisma } from "@/prisma/prisma";

export async function index(_: Request, response: Response<API<Array<Event & { category: Category }>>>) {
  const events = await prisma.event.findMany({
    include: {
      category: true,
    },
  });

  return response.status(200).json({
    success: true,
    message: "Berhasil Mengambil Data Event",
    data: events,
  });
}
