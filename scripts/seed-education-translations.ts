import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const translations = [
  {
    english: "GRADUATE",
    hi: "स्नातक",
    gu: "સ્નાતક",
  },
  {
    english: "HIGH SCHOOL (8 to 12)",
    hi: "उच्च विद्यालय (कक्षा 8 से 12)",
    gu: "ઉચ્ચતર માધ્યમિક (ધોરણ 8 થી 12)",
  },
  {
    english: "PHD",
    hi: "पीएचडी",
    gu: "પીએચડી",
  },
  {
    english: "POST GRADUATE",
    hi: "स्नातकोत्तर",
    gu: "અનુસ્નાતક",
  },
  {
    english: "SCHOOL (1 to 7)",
    hi: "विद्यालय (कक्षा 1 से 7)",
    gu: "શાળા (ધોરણ 1 થી 7)",
  },
];

async function main() {
  for (const item of translations) {
    const education =
      await prisma.education.findFirst({
        where: {
          name: item.english,
        },
      });

    if (!education) {
      console.log(
        `Education record not found: ${item.english}`
      );
      continue;
    }

    await prisma.educationTranslation.upsert({
      where: {
        educationId_locale: {
          educationId: education.id,
          locale: "hi",
        },
      },
      update: {
        name: item.hi,
      },
      create: {
        educationId: education.id,
        locale: "hi",
        name: item.hi,
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
        name: item.gu,
      },
      create: {
        educationId: education.id,
        locale: "gu",
        name: item.gu,
      },
    });

    console.log(
      `Updated: ${item.english} -> ${item.hi} -> ${item.gu}`
    );
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });