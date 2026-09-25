import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const occupationRecords =
    await prisma.occupation.findMany({
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

  for (const occupation of occupationRecords) {
    if (!occupation.name) {
      skipped++;
      continue;
    }

    const existing =
      await prisma.occupationTranslation.findUnique({
        where: {
          occupationId_locale: {
            occupationId: occupation.id,
            locale: "en",
          },
        },
      });

    if (existing) {
      skipped++;
      continue;
    }

    await prisma.occupationTranslation.create({
      data: {
        occupationId: occupation.id,
        locale: "en",
        name: occupation.name,
      },
    });

    created++;
  }

  console.log(
    `Existing Occupation records: ${occupationRecords.length}`
  );

  console.log(
    `English translations created: ${created}`
  );

  console.log(
    `Already existing/skipped: ${skipped}`
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });