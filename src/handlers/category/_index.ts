import type { Request, Response } from "express";

import { prisma } from "@/prisma/prisma";
import type { CategoryModel } from "../../../prisma/generated/models";

import type { API } from "@/types";

export async function index(request: Request, response: Response<API<CategoryModel[]>>) {
  const categories = await prisma.category.findMany();

  return response.status(200).json({
    success: true,
    data: categories,
  });
}
