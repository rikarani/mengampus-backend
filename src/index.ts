import "dotenv/config";

import cors from "cors";
import express from "express";

import { auth } from "@/lib/auth";
import { toNodeHandler } from "better-auth/node";

import { categoryRouter } from "./routes/category";
import { eventRouter } from "./routes/event";

import { authMiddleware } from "./middlewares/auth";

const app = express();
const port = 4000;

app.use(
  cors({
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.get("/", (_, response) => {
  return response.json({ message: "Halo Mengampus API v1" });
});

app.use("/categories", authMiddleware, categoryRouter);
app.use("/events", eventRouter);

app.listen(port, () => {
  console.log(`Server Ready di Port ${port}`);
});
