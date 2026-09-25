import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const education = await prisma.education.findFirst({
    where: {
      name: {
        in: [
          "SCHOOL (1 to7)",
          "SCHOOL (1 to 7)",
        ],
      },
    },
  });

  if (!education) {
    console.log("SCHOOL education record not found.");
    return;
  }

  await prisma.educationTranslation.upsert({
    where: {
      educationId_locale: {
        educationId: education.id,
        locale: "hi",
      },
    },
    update: {
      name: "विद्यालय (कक्षा 1 से 7)",
    },
    create: {
      educationId: education.id,
      locale: "hi",
      name: "विद्यालय (कक्षा 1 से 7)",
    },
  });

  await prisma.educationTranslation.upsert({
    where: {
      educationId_locale: {
        educationId: education.id,
        locale: "gu",
      },
    },
    update: {
      name: "શાળા (ધોરણ 1 થી 7)",
    },
    create: {
      educationId: education.id,
      locale: "gu",
      name: "શાળા (ધોરણ 1 થી 7)",
    },
  });

  console.log(
    `Updated: ${education.name} -> विद्यालय (कक्षा 1 से 7) -> શાળા (ધોરણ 1 થી 7)`
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