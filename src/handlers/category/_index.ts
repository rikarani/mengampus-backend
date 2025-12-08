import type { API } from "@/types";
import type { Request, Response } from "express";
import type { Category } from "../../../prisma/generated/client";

import { fromNodeHeaders } from "better-auth/node";

import { auth } from "@/lib/auth";
import { prisma } from "@/prisma/prisma";

export async function index(request: Request, response: Response<API<Category[]>>) {
  // const session = await auth.api.getSession({
  //   headers: fromNodeHeaders(request.headers),
  // });

  // if (!session) {
  //   return response.status(401).json({
  //     success: false,
  //     message: "Unauthorized",
  //     errorCode: "401",
  //   });
  // }

  const categories = await prisma.category.findMany();

  return response.status(200).json({
    success: true,
    message: "Berhasil Mengambil Kategori",
    data: categories,
  });
}
