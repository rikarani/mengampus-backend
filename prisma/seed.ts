import slug from "slugify";
import { prisma } from "../src/prisma/prisma";

async function main() {
  const categories = [
    { name: "Seminar" },
    { name: "Siraman Rohani" },
    { name: "Kunjungan Orang Penting" },
    { name: "Workshop" },
    { name: "Pelatihan" },
    { name: "Konferensi" },
  ];

  // Delete all existing categories to avoid duplicates
  await prisma.category.deleteMany();

  // Create new categories
  for (const category of categories) {
    await prisma.category.create({
      data: {
        name: category.name,
        slug: slug(category.name, { lower: true }),
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
