import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const states = [
  {
    english: "GUJARAT",
    hi: "\u0917\u0941\u091c\u0930\u093e\u0924",
    gu: "\u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0aa4",
  },
  {
    english: "MADHYA PRADESH",
    hi: "\u092e\u0927\u094d\u092f \u092a\u094d\u0930\u0926\u0947\u0936",
    gu: "\u0aae\u0aa7\u0acd\u0aaf \u0aaa\u0acd\u0ab0\u0aa6\u0ac7\u0ab6",
  },
  {
    english: "WEST BENGAL",
    hi: "\u092a\u0936\u094d\u091a\u093f\u092e \u092c\u0902\u0917\u093e\u0932",
    gu: "\u0aaa\u0ab6\u0acd\u0a9a\u0abf\u0aae \u0aac\u0a82\u0a97\u0abe\u0ab3",
  },
];

async function main() {
  console.log("=== SEEDING STATE TRANSLATIONS ===");

  for (const item of states) {
    const state = await prisma.state.findUnique({
      where: { name: item.english },
      select: {
        id: true,
        name: true,
      },
    });

    if (!state) {
      console.log(`SKIPPED: ${item.english} not found`);
      continue;
    }

    const translations = {
      en: item.english,
      hi: item.hi,
      gu: item.gu,
    };

    for (const [locale, name] of Object.entries(translations)) {
      await prisma.$executeRaw(
        Prisma.sql`
          INSERT INTO "StateTranslation"
            ("id", "stateId", "locale", "name")
          VALUES
            (${crypto.randomUUID()}, ${state.id}, ${locale}, ${name})
          ON CONFLICT ("stateId", "locale")
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
      state: string;
      locale: string;
      name: string;
    }>
  >`
    SELECT
      s."name" AS state,
      st."locale" AS locale,
      st."name" AS name
    FROM "State" s
    JOIN "StateTranslation" st
      ON st."stateId" = s."id"
    ORDER BY s."name", st."locale"
  `;

  for (const row of result) {
    console.log(
      `${row.state} | ${row.locale} | ${row.name}`
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