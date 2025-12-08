import type { API } from "@/types";
import type { Request, Response } from "express";
import type { Event } from "../../../prisma/generated/client";

import { z } from "zod";

import { eventSchema } from "@/schemas/event";
import { Prisma, prisma } from "@/prisma/prisma";

export async function create(request: Request, response: Response<API<Event>>) {
  try {
    const forms = eventSchema.parse(request.body);

    const event = await prisma.event.create({
      data: forms,
    });

    return response.status(201).json({
      success: true,
      message: "Berhasil Menambahkan Event",
      data: event,
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
      if (error.code === "P2003") {
        return response.status(409).json({
          success: false,
          message: "Kategori tidak ditemukan",
          errorCode: error.code,
        });
      }

      if (error.code === "P2002") {
        return response.status(409).json({
          success: false,
          message: "Event dengan nama yang sama sudah ada",
          errorCode: error.code,
        });
      }
    }
  }
}
