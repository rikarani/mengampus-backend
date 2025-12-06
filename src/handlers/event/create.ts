import type { Request, Response } from "express";

import { prisma } from "@/prisma/prisma";
import type { EventModel } from "../../../prisma/generated/models";

import type { API } from "@/types";

export async function create(request: Request, response: Response<API>) {
  const events = await prisma.event.createMany({
    data: [
      {
        id: "1",
        name: "Seminar Pendidikan",
        category_id: "Pendidikan",
        description: "Seminar tentang pendidikan terbaru",
        location: "Auditorium A",
        date: new Date("2024-07-01T09:00:00Z"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "2",
        name: "Workshop Teknologi",
        category_id: "Teknologi",
        description: "Workshop tentang teknologi terbaru",
        location: "Lab Komputer B",
        date: new Date("2024-07-15T10:00:00Z"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "3",
        name: "Festival Seni",
        category_id: "Seni",
        description: "Festival seni tahunan",
        location: "Taman Kota",
        date: new Date("2024-08-05T12:00:00Z"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "4",
        name: "Konferensi Bisnis",
        category_id: "Bisnis",
        description: "Konferensi tentang tren bisnis terbaru",
        location: "Hotel Grand",
        date: new Date("2024-08-20T09:30:00Z"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "5",
        name: "Pameran Buku",
        category_id: "Literatur",
        description: "Pameran buku tahunan",
        location: "Perpustakaan Kota",
        date: new Date("2024-09-10T10:00:00Z"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "6",
        name: "Lomba Olahraga",
        category_id: "Olahraga",
        description: "Lomba olahraga antar sekolah",
        location: "Stadion Utama",
        date: new Date("2024-09-25T08:00:00Z"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "7",
        name: "Konser Musik",
        category_id: "Musik",
        description: "Konser musik dari band lokal",
        location: "Gedung Serbaguna",
        date: new Date("2024-10-05T19:00:00Z"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "8",
        name: "Pentas Teater",
        category_id: "Teater",
        description: "Pentas teater dari komunitas seni lokal",
        location: "Teater Kota",
        date: new Date("2024-10-20T18:00:00Z"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "9",
        name: "Seminar Kesehatan",
        category_id: "Kesehatan",
        description: "Seminar tentang gaya hidup sehat",
        location: "Balai Kesehatan",
        date: new Date("2024-11-10T09:00:00Z"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "10",
        name: "Festival Kuliner",
        category_id: "Kuliner",
        description: "Festival kuliner dari berbagai daerah",
        location: "Alun-Alun Kota",
        date: new Date("2024-11-25T11:00:00Z"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "11",
        name: "Pameran Fotografi",
        category_id: "Fotografi",
        description: "Pameran fotografi dari fotografer lokal",
        location: "Galeri Seni",
        date: new Date("2024-12-05T10:00:00Z"),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
  });

  return response.json({
    success: true,
    data: {
      message: "Events created successfully",
    },
  });
}
