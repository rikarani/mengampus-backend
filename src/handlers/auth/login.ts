import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { z } from "zod";
import { prisma } from "@/prisma/prisma";
import { loginSchema } from "@/schemas/auth/login";

import type { Request, Response } from "express";

export async function login(request: Request, response: Response) {
  try {
    const { nim, password, role } = loginSchema.parse(request.body);

    const user = await prisma.user.findUnique({
      where: { nim, AND: [{ role }] },
    });

    if (!user) {
      return response.status(400).json({
        success: false,
        data: {
          message: "Username atau Password Salah",
        },
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return response.status(400).json({
        success: false,
        data: {
          message: "Username atau Password Salah",
        },
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
      algorithm: "HS256",
      expiresIn: "1d",
    });

    return response.json({
      success: true,
      data: {
        message: "Login berhasil",
        token,
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
