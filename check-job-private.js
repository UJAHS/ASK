const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.occupation.findUnique({
    where: {
      name: "JOB - PRIVATE"
    },
    include: {
      translations: true
    }
  });

  console.log(JSON.stringify(result, null, 2));
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
