import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const occupation = await prisma.occupation.findFirst({
    where: {
      name: "JOB - PRIVATE",
    },
  });

  if (!occupation) {
    console.log("JOB - PRIVATE occupation not found.");
    return;
  }

  await prisma.occupationTranslation.upsert({
    where: {
      occupationId_locale: {
        occupationId: occupation.id,
        locale: "hi",
      },
    },
    update: {
      name: "निजी नौकरी",
    },
    create: {
      occupationId: occupation.id,
      locale: "hi",
      name: "निजी नौकरी",
    },
  });

  await prisma.occupationTranslation.upsert({
    where: {
      occupationId_locale: {
        occupationId: occupation.id,
        locale: "gu",
      },
    },
    update: {
      name: "ખાનગી નોકરી",
    },
    create: {
      occupationId: occupation.id,
      locale: "gu",
      name: "ખાનગી નોકરી",
    },
  });

  console.log(
    "JOB - PRIVATE translations corrected successfully."
  );
  console.log(
    "Hindi: निजी नौकरी"
  );
  console.log(
    "Gujarati: ખાનગી નોકરી"
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