import "dotenv/config";
import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import bcrypt from "bcrypt";

import { prisma } from "@/prisma/prisma";

const app = express();
const port = 4000;

app.use(cors());

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.get("/", (request, response) => {
  return response.json({ message: "Halo Mengampus API v1" });
});

// app.post("/", async (request, response) => {
//   const user = await prisma.user.create({
//     data: {
//       name: "Phasya Ananta",
//       email: "d1041211015@student.untan.ac.id",
//       nim: "D1041211015",
//       prodi: "Informatika",
//       password: await bcrypt.hash("123456", 12),
//     },
//   });

//   if (!user) {
//     return response.json({ success: false, message: "Gagal Registrasi" }).status(400);
//   }

//   return response.json({ success: true, data: user }).status(200);
// });

app.listen(port, () => {
  console.log(`Server Ready di Port ${port}`);
});
