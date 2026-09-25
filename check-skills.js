const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const skills = await prisma.skill.findMany({
    include: {
      translations: true
    }
  });

  console.log(JSON.stringify(skills, null, 2));
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
