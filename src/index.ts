import "dotenv/config";

import cors from "cors";
import express from "express";

import { auth } from "@/lib/auth";
import { toNodeHandler } from "better-auth/node";

const app = express();
const port = 4000;

app.use(cors());

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.get("/", (request, response) => {
  return response.json({ message: "Halo Mengampus API v1" });
});

app.listen(port, () => {
  console.log(`Server Ready di Port ${port}`);
});
