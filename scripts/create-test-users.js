const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      email: "user@ask.com",
      password: "User@12345",
      role: "MEMBER",
      status: "APPROVED",
    },
    {
      email: "admin@ask.com",
      password: "Admin@12345",
      role: "ADMIN",
      status: "APPROVED",
    },
  ];

  for (const data of users) {
    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await prisma.user.upsert({
      where: {
        email: data.email,
      },
      update: {
        password: hashedPassword,
        role: data.role,
        status: data.status,
      },
      create: {
        email: data.email,
        password: hashedPassword,
        role: data.role,
        status: data.status,
      },
    });

    console.log(
      `Created/updated: ${user.email} | Role: ${user.role} | Status: ${user.status}`
    );
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });