import "dotenv/config";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";

import { prisma } from "@/prisma/prisma";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  return response.json({ message: "Halo Mengampus API v1" });
});

app.post("/", async (request, response) => {
  const user = await prisma.user.create({
    data: {
      name: "Phasya Ananta",
      email: "d1041211015@student.untan.ac.id",
      nim: "D1041211015",
      password: await bcrypt.hash("123456", 12),
    },
  });

  if (!user) {
    return response
      .json({ success: false, message: "Gagal Registrasi" })
      .status(400);
  }

  return response.json({ success: true, data: user }).status(200);
});

app.listen(4000, () => {
  console.log("Server Ready di Port 4000");
});
