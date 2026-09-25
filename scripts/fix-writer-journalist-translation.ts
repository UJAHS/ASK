import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const profession = await prisma.profession.findUnique({
    where: { name: "WRITER / JOURNALIST" },
    select: { id: true, name: true },
  });

  if (!profession) {
    console.log("WRITER / JOURNALIST not found.");
    return;
  }

  const translations = {
    en: "WRITER / JOURNALIST",
    hi: "\u0932\u0947\u0916\u0915 / \u092a\u0924\u094d\u0930\u0915\u093e\u0930",
    gu: "\u0ab2\u0ac7\u0a96\u0a95 / \u0aaa\u0aa4\u0acd\u0ab0\u0a95\u0abe\u0ab0",
  };

  for (const [locale, name] of Object.entries(translations)) {
    await prisma.$executeRaw(
      Prisma.sql`
        INSERT INTO "ProfessionTranslation"
          ("id", "professionId", "locale", "name")
        VALUES
          (${crypto.randomUUID()}, ${profession.id}, ${locale}, ${name})
        ON CONFLICT ("professionId", "locale")
        DO UPDATE SET "name" = EXCLUDED."name"
      `
    );
  }

  console.log("WRITER / JOURNALIST translations fixed.");
  console.log("Hindi: लेखक / पत्रकार");
  console.log("Gujarati: લેખક / પત્રકાર");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
