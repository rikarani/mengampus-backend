import bcrypt from "bcrypt";

import { z } from "zod";
import { prisma } from "@/prisma/prisma";
import { registerSchema } from "@/schemas/auth/register";

import type { Request, Response } from "express";

export async function register(request: Request, response: Response) {
  try {
    const { password_confirmation, ...data } = registerSchema.parse(request.body);

    const existingUser = await prisma.user.findUnique({
      where: {
        OR: [{ email: data.email }, { nim: data.nim }],
      },
    });

    if (existingUser) {
      return response.status(409).json({
        success: false,
        data: {
          message: "Email atau NIM Sudah Terdaftar",
        },
      });
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);
    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return response.json({
      success: true,
      data: {
        message: "Berhasil Registrasi",
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return response.status(422).json({
        success: false,
        data: {
          message: "Invalid request data",
          errors: z.prettifyError(error),
        },
      });
    }
  }
}
