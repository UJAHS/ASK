const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const email = "test@ask.com";
  const plainPassword = "Test@12345";

  const password = await bcrypt.hash(plainPassword, 10);

  let user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    user = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password,
        role: "MEMBER",
        status: "APPROVED",
      },
    });

    console.log("Existing user updated.");
  } else {
    user = await prisma.user.create({
      data: {
        email,
        password,
        role: "MEMBER",
        status: "APPROVED",
      },
    });

    console.log("New user created.");
  }

  const existingProfile = await prisma.memberProfile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (existingProfile) {
    await prisma.memberProfile.update({
      where: {
        userId: user.id,
      },
      data: {
        firstName: "Test",
        lastName: "Member",
        phone: "9999999999",
        gender: "MALE",
        country: "India",
        city: "Ahmedabad",
        state: "Gujarat",
        education: "Test Graduate",
        profession: "Test Professional",
      },
    });

    console.log("Existing MemberProfile updated.");
  } else {
    await prisma.memberProfile.create({
      data: {
        userId: user.id,
        firstName: "Test",
        lastName: "Member",
        phone: "9999999999",
        gender: "MALE",
        country: "India",
        city: "Ahmedabad",
        state: "Gujarat",
        education: "Test Graduate",
        profession: "Test Professional",
      },
    });

    console.log("MemberProfile created.");
  }

  const finalUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      memberProfile: true,
    },
  });

  console.log("");
  console.log("========================================");
  console.log("TEST MEMBER READY");
  console.log("========================================");
  console.log("Email:", finalUser.email);
  console.log("Password:", plainPassword);
  console.log("Member Number:", finalUser.memberNumber);
  console.log("Role:", finalUser.role);
  console.log("Status:", finalUser.status);
  console.log("Name: Test Member");
  console.log("City: Ahmedabad");
  console.log("State: Gujarat");
  console.log("========================================");
  console.log("");
}

main()
  .catch((error) => {
    console.error("");
    console.error("Failed to create/update test user:");
    console.error(error);
    console.error("");
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });