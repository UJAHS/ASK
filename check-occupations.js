const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const occupations = await prisma.occupation.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      isActive: true
    }
  });

  console.log(JSON.stringify(occupations, null, 2));
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
