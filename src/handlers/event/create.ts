import type { Request, Response } from "express";

import { prisma } from "@/prisma/prisma";

import { z } from "zod";
import { addEventSchema } from "@/schemas/event/add";

import type { API } from "@/types";

export async function create(request: Request, response: Response<API>) {
  try {
    const forms = addEventSchema.parse(request.body);

    await prisma.event.create({
      data: forms,
    });

    return response.status(201).json({
      success: true,
      data: {
        message: "Berhasil Menambahkan Event",
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return response.status(400).json({
        success: false,
        data: {
          message: z.prettifyError(error),
        },
      });
    }
  }
}
