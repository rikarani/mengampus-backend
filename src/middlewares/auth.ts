import type { Request, Response, NextFunction } from "express";

import { auth } from "@/lib/auth";
import { fromNodeHeaders } from "better-auth/node";

export async function authMiddleware(request: Request, response: Response, next: NextFunction) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(request.headers),
  });

  if (!session) {
    return response.status(401).json({
      success: false,
      message: "Unauthorized",
      errorCode: "401",
    });
  }

  return next();
}
