import "dotenv/config";

import cors from "cors";
import express from "express";

import { prisma } from "@/prisma/prisma";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  return response.json({ message: "Halo Mengampus API v1" });
});

app.get("/events", async (request, response) => {
  const data = await prisma.event.findMany();

  return response.json({ success: true, data }).status(200);
});

app.post("/events", async (request, response) => {
  const data = await prisma.event.createMany({
    data: [
      {
        title: "Workshop React Native",
        description: "Belajar membuat aplikasi mobile dengan React Native",
        date: new Date("2024-07-15"),
        location: "Jakarta",
        category: "Workshop",
      },
      {
        title: "Seminar AI dan Machine Learning",
        description: "Mengenal perkembangan terbaru dalam AI dan Machine Learning",
        date: new Date("2024-08-20"),
        location: "Bandung",
        category: "Seminar",
      },
      {
        title: "Hackathon 2024",
        description: "Kompetisi coding selama 48 jam dengan berbagai tantangan menarik",
        date: new Date("2024-09-10"),
        location: "Surabaya",
        category: "Hackathon",
      },
      {
        title: "Pelatihan Data Science",
        description: "Pelatihan intensif tentang analisis data dan visualisasi",
        date: new Date("2024-10-05"),
        location: "Yogyakarta",
        category: "Training",
      },
      {
        title: "Konferensi Teknologi Tahunan",
        description: "Diskusi tentang tren teknologi terbaru dan masa depan",
        date: new Date("2024-11-15"),
        location: "Bali",
        category: "Conference",
      },
    ],
  });

  if (!data) {
    return response.json({ message: "Gagal menambahkan data event" }).status(500);
  }

  return response.json({ message: "Berhasil menambahkan data event" });
});

app.listen(port, () => {
  console.log(`Server Ready di Port ${port}`);
});
