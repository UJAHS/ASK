const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const occupation = await prisma.occupation.findUnique({
    where: {
      name: "JOB - PRIVTE"
    }
  });

  if (!occupation) {
    throw new Error("JOB - PRIVTE not found");
  }

  await prisma.occupation.update({
    where: {
      id: occupation.id
    },
    data: {
      name: "JOB - PRIVATE"
    }
  });

  await prisma.occupationTranslation.upsert({
    where: {
      occupationId_locale: {
        occupationId: occupation.id,
        locale: "hi"
      }
    },
    update: {
      name: "निजी नौकरी"
    },
    create: {
      occupationId: occupation.id,
      locale: "hi",
      name: "निजी नौकरी"
    }
  });

  await prisma.occupationTranslation.upsert({
    where: {
      occupationId_locale: {
        occupationId: occupation.id,
        locale: "gu"
      }
    },
    update: {
      name: "ખાનગી નોકરી"
    },
    create: {
      occupationId: occupation.id,
      locale: "gu",
      name: "ખાનગી નોકરી"
    }
  });

  console.log("JOB - PRIVATE fixed successfully");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
