import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const translations = [
  {
    english: "BHARDWAJ",
    hi: "भारद्वाज",
    gu: "ભારદ્વાજ",
  },
  {
    english: "KAUSHIK",
    hi: "कौशिक",
    gu: "કૌશિક",
  },
  {
    english: "PARASHAR",
    hi: "पराशर",
    gu: "પરાશર",
  },
  {
    english: "VACHHAS",
    hi: "वच्छस",
    gu: "વચ્છસ",
  },
  {
    english: "KASHYAP",
    hi: "कश्यप",
    gu: "કશ્યપ",
  },
];

async function main() {
  for (const item of translations) {
    const gotra = await prisma.gotra.findFirst({
      where: {
        name: item.english,
      },
    });

    if (!gotra) {
      console.log(
        `Gotra not found: ${item.english}`
      );
      continue;
    }

    await prisma.gotraTranslation.upsert({
      where: {
        gotraId_locale: {
          gotraId: gotra.id,
          locale: "hi",
        },
      },
      update: {
        name: item.hi,
      },
      create: {
        gotraId: gotra.id,
        locale: "hi",
        name: item.hi,
      },
    });

    await prisma.gotraTranslation.upsert({
      where: {
        gotraId_locale: {
          gotraId: gotra.id,
          locale: "gu",
        },
      },
      update: {
        name: item.gu,
      },
      create: {
        gotraId: gotra.id,
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