import "dotenv/config";

import cors from "cors";
import express from "express";

import { login, register } from "@/handlers/auth";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  return response.json({ message: "Halo Mengampus API v1" });
});

app.post("/login", login);
app.post("/register", register);

app.listen(port, () => {
  console.log(`Server Ready di Port ${port}`);
});
