import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/client";

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST!,
  user: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  port: process.env.DB_PORT as unknown as number,
  database: process.env.DB_DATABASE!,
  connectionLimit: 5,
});

export const prisma = new PrismaClient({ adapter });
