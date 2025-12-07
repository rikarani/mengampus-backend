import type { Request, Response } from "express";

import { prisma } from "@/prisma/prisma";
import type { EventModel } from "../../../prisma/generated/models";

import type { API } from "@/types";

export async function index(request: Request, response: Response<API<EventModel[]>>) {
  const events = await prisma.event.findMany({
    include: {
      category: true,
    },
  });

  return response.status(200).json({
    success: true,
    data: events,
  });
}
