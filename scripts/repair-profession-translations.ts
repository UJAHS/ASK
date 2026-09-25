import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const professions = [
  {
    english: "AGENT",
    hi: "\u090f\u091c\u0947\u0902\u091f",
    gu: "\u0a8f\u0a9c\u0aa8\u0acd\u0a9f",
  },
  {
    english: "ARCHITECH",
    hi: "\u0906\u0930\u094d\u0915\u093f\u091f\u0947\u0915\u094d\u091f",
    gu: "\u0a86\u0ab0\u0acd\u0a95\u0abf\u0a9f\u0ac7\u0a95\u0acd\u0a9f",
  },
  {
    english: "ARTIST",
    hi: "\u0915\u0932\u093e\u0915\u093e\u0930",
    gu: "\u0a95\u0ab2\u0abe\u0a95\u0abe\u0ab0",
  },
  {
    english: "CONSULTANT",
    hi: "\u0938\u0932\u093e\u0939\u0915\u093e\u0930",
    gu: "\u0ab8\u0ab2\u0abe\u0ab9\u0a95\u0abe\u0ab0",
  },
  {
    english: "COOK",
    hi: "\u0930\u0938\u094b\u0907\u092f\u093e",
    gu: "\u0ab0\u0ab8\u0acb\u0a88\u0aaf\u0abe",
  },
  {
    english: "DOCTOR",
    hi: "\u0921\u0949\u0915\u094d\u091f\u0930",
    gu: "\u0aa1\u0ac9\u0a95\u0acd\u0a9f\u0ab0",
  },
  {
    english: "LAWYER",
    hi: "\u0935\u0915\u0940\u0932",
    gu: "\u0ab5\u0a95\u0ac0\u0ab2",
  },
  {
    english: "PHOTOGRAPHER",
    hi: "\u092b\u094b\u091f\u094b\u0917\u094d\u0930\u093e\u092b\u0930",
    gu: "\u0aab\u0acb\u0a9f\u0acb\u0a97\u0acd\u0ab0\u0abe\u0aab\u0ab0",
  },
];

async function main() {
  console.log("=== REPAIRING PROFESSION TRANSLATIONS ===");

  for (const item of professions) {
    const profession = await prisma.profession.findUnique({
      where: { name: item.english },
      select: { id: true, name: true },
    });

    if (!profession) {
      console.log(`SKIPPED: ${item.english} not found`);
      continue;
    }

    for (const [locale, name] of [
      ["en", item.english],
      ["hi", item.hi],
      ["gu", item.gu],
    ] as const) {
      await prisma.$executeRaw(
        Prisma.sql`
          INSERT INTO "ProfessionTranslation"
            ("id", "professionId", "locale", "name")
          VALUES
            (${crypto.randomUUID()}, ${profession.id}, ${locale}, ${name})
          ON CONFLICT ("professionId", "locale")
          DO UPDATE SET
            "name" = EXCLUDED."name"
        `
      );
    }

    console.log(`FIXED: ${item.english}`);
  }

  console.log("");
  console.log("=== VERIFICATION ===");

  const result = await prisma.$queryRaw<
    Array<{
      profession: string;
      locale: string;
      name: string;
    }>
  >`
    SELECT
      p."name" AS profession,
      pt."locale" AS locale,
      pt."name" AS name
    FROM "Profession" p
    JOIN "ProfessionTranslation" pt
      ON pt."professionId" = p."id"
    ORDER BY p."name", pt."locale"
  `;

  for (const row of result) {
    console.log(
      `${row.profession} | ${row.locale} | ${row.name}`
    );
  }
}

main()
  .catch((error) => {
    console.error("ERROR:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
