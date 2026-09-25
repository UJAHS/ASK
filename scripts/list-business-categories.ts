import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.businessCategory.findMany({
    orderBy: {
      name: "asc",
    },
    select: {
      id: true,
      name: true,
      isActive: true,
      BusinessCategoryTranslation: {
        orderBy: {
          locale: "asc",
        },
        select: {
          locale: true,
          name: true,
        },
      },
    },
  });

  console.log("\n========================================");
  console.log("BUSINESS CATEGORY MASTER DATA");
  console.log("========================================\n");

  for (const category of categories) {
    console.log(`ID: ${category.id}`);
    console.log(`EN: ${category.name}`);
    console.log(`Active: ${category.isActive}`);

    if (category.BusinessCategoryTranslation.length === 0) {
      console.log("Translations: NONE");
    } else {
      for (const translation of category.BusinessCategoryTranslation) {
        console.log(
          `${translation.locale.toUpperCase()}: ${translation.name}`
        );
      }
    }

    console.log("----------------------------------------");
  }

  console.log(`\nTOTAL BUSINESS CATEGORIES: ${categories.length}\n`);
}

main()
  .catch((error) => {
    console.error("FAILED:");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });