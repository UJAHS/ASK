import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const gotras = await prisma.gotra.findMany({
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

  for (const gotra of gotras) {
    if (!gotra.name) {
      skipped++;
      continue;
    }

    const existing = await prisma.gotraTranslation.findUnique({
      where: {
        gotraId_locale: {
          gotraId: gotra.id,
          locale: "en",
        },
      },
    });

    if (existing) {
      skipped++;
      continue;
    }

    await prisma.gotraTranslation.create({
      data: {
        gotraId: gotra.id,
        locale: "en",
        name: gotra.name,
      },
    });

    created++;
  }

  console.log(`Existing Gotra records: ${gotras.length}`);
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