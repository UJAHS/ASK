import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const countries = [
  {
    english: "United Kingdom (UK)",
    hi: "\u092f\u0941\u0928\u093e\u0907\u091f\u0947\u0921 \u0915\u093f\u0902\u0917\u0921\u092e (\u092f\u0942\u0915\u0947)",
    gu: "\u092f\u0941\u0928\u093e\u0907\u091f\u0947\u0921 \u0915\u093f\u0902\u0917\u0921\u092e (\u092f\u0941\u0915\u0947)",
  },
  {
    english: "INDIA",
    hi: "\u092d\u093e\u0930\u0924",
    gu: "\u092d\u093e\u0930\u0924",
  },
];

async function main() {
  console.log("=== REPAIRING COUNTRY TRANSLATIONS ===");

  for (const item of countries) {
    const country = await prisma.country.findUnique({
      where: { name: item.english },
      select: { id: true, name: true },
    });

    if (!country) {
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
          INSERT INTO "CountryTranslation"
            ("id", "countryId", "locale", "name")
          VALUES
            (${crypto.randomUUID()}, ${country.id}, ${locale}, ${name})
          ON CONFLICT ("countryId", "locale")
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
      country: string;
      locale: string;
      name: string;
    }>
  >`
    SELECT
      c."name" AS country,
      ct."locale" AS locale,
      ct."name" AS name
    FROM "Country" c
    JOIN "CountryTranslation" ct
      ON ct."countryId" = c."id"
    ORDER BY c."name", ct."locale"
  `;

  for (const row of result) {
    console.log(
      `${row.country} | ${row.locale} | ${row.name}`
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
