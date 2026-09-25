import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const countries = await prisma.country.findMany({
    where: {
      name: {
        not: null,
      },
    },
    select: {
      id: true,
      name: true,
    },
  });

  let created = 0;
  let skipped = 0;

  for (const country of countries) {
    if (!country.name) {
      skipped++;
      continue;
    }

    const existing =
      await prisma.countryTranslation.findUnique({
        where: {
          countryId_locale: {
            countryId: country.id,
            locale: "en",
          },
        },
      });

    if (existing) {
      skipped++;
      continue;
    }

    await prisma.countryTranslation.create({
      data: {
        countryId: country.id,
        locale: "en",
        name: country.name,
      },
    });

    created++;
  }

  console.log(`Existing Country records: ${countries.length}`);
  console.log(`English translations created: ${created}`);
  console.log(`Already existing/skipped: ${skipped}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });