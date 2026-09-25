import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const countries = [
  {
    english: "United Kingdom (UK)",
    gu: "\u0aaf\u0ac1\u0aa8\u0abe\u0a87\u0a9f\u0ac7\u0aa1 \u0a95\u0abf\u0a82\u0a97\u0aa1\u0aae (\u0aaf\u0ac1\u0a95\u0ac7)",
  },
  {
    english: "INDIA",
    gu: "\u0aad\u0abe\u0ab0\u0aa4",
  },
];

async function main() {
  console.log("=== FIXING GUJARATI COUNTRY TRANSLATIONS ===");

  for (const item of countries) {
    const country = await prisma.country.findUnique({
      where: { name: item.english },
      select: { id: true, name: true },
    });

    if (!country) {
      console.log(`SKIPPED: ${item.english} not found`);
      continue;
    }

    await prisma.$executeRaw(
      Prisma.sql`
        INSERT INTO "CountryTranslation"
          ("id", "countryId", "locale", "name")
        VALUES
          (${crypto.randomUUID()}, ${country.id}, ${"gu"}, ${item.gu})
        ON CONFLICT ("countryId", "locale")
        DO UPDATE SET
          "name" = EXCLUDED."name"
      `
    );

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
    WHERE ct."locale" IN ('hi', 'gu')
    ORDER BY c."name", ct."locale"
  `;

  for (const row of result) {
    console.log(`${row.country} | ${row.locale} | ${row.name}`);
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
