import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const educationRecords =
    await prisma.education.findMany({
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

  for (const education of educationRecords) {
    if (!education.name) {
      skipped++;
      continue;
    }

    const existing =
      await prisma.educationTranslation.findUnique({
        where: {
          educationId_locale: {
            educationId: education.id,
            locale: "en",
          },
        },
      });

    if (existing) {
      skipped++;
      continue;
    }

    await prisma.educationTranslation.create({
      data: {
        educationId: education.id,
        locale: "en",
        name: education.name,
      },
    });

    created++;
  }

  console.log(
    `Existing Education records: ${educationRecords.length}`
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