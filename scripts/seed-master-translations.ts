import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Translation = {
  en: string;
  hi: string;
  gu: string;
};

/*
|--------------------------------------------------------------------------
| PROFESSION TRANSLATIONS
|--------------------------------------------------------------------------
| Add/update entries here using the exact English value stored in
| the Profession.name column.
*/
const professionTranslations: Translation[] = [
  {
    en: "AGENT",
    hi: "à¤à¤œà¥‡à¤‚à¤Ÿ",
    gu: "àªàªœàª¨à«àªŸ",
  },
  {
    en: "ARCHITECH",
    hi: "à¤†à¤°à¥à¤•à¤¿à¤Ÿà¥‡à¤•à¥à¤Ÿ",
    gu: "àª†àª°à«àª•àª¿àªŸà«‡àª•à«àªŸ",
  },
  {
    en: "ARTIST",
    hi: "à¤•à¤²à¤¾à¤•à¤¾à¤°",
    gu: "àª•àª²àª¾àª•àª¾àª°",
  },
  {
    en: "CONSULTANT",
    hi: "à¤¸à¤²à¤¾à¤¹à¤•à¤¾à¤°",
    gu: "àª¸àª²àª¾àª¹àª•àª¾àª°",
  },
  {
    en: "COOK",
    hi: "à¤°à¤¸à¥‹à¤‡à¤¯à¤¾",
    gu: "àª°àª¸à«‹àªˆàª¯àª¾",
  },
  {
    en: "DOCTOR",
    hi: "à¤¡à¥‰à¤•à¥à¤Ÿà¤°",
    gu: "àª¡à«‰àª•à«àªŸàª°",
  },
  {
    en: "LAWYER",
    hi: "à¤µà¤•à¥€à¤²",
    gu: "àªµàª•à«€àª²",
  },
];

/*
|--------------------------------------------------------------------------
| BLOOD GROUP TRANSLATIONS
|--------------------------------------------------------------------------
| Blood-group names are generally retained in their standard notation.
*/
const bloodGroupTranslations: Translation[] = [
  {
    en: "A+",
    hi: "A+",
    gu: "A+",
  },
  {
    en: "A-",
    hi: "A-",
    gu: "A-",
  },
  {
    en: "B+",
    hi: "B+",
    gu: "B+",
  },
  {
    en: "B-",
    hi: "B-",
    gu: "B-",
  },
  {
    en: "AB+",
    hi: "AB+",
    gu: "AB+",
  },
  {
    en: "AB-",
    hi: "AB-",
    gu: "AB-",
  },
  {
    en: "O+",
    hi: "O+",
    gu: "O+",
  },
  {
    en: "O-",
    hi: "O-",
    gu: "O-",
  },
];

/*
|--------------------------------------------------------------------------
| BUSINESS CATEGORY TRANSLATIONS
|--------------------------------------------------------------------------
| Add entries using the exact English value stored in the database.
*/
const businessCategoryTranslations: Translation[] = [
  {
    en: "AGRICULTURE",
    hi: "à¤•à¥ƒà¤·à¤¿",
    gu: "àª•à«ƒàª·àª¿",
  },
  {
    en: "BANKING",
    hi: "à¤¬à¥ˆà¤‚à¤•à¤¿à¤‚à¤—",
    gu: "àª¬à«‡àª‚àª•àª¿àª‚àª—",
  },
  {
    en: "CONSTRUCTION",
    hi: "à¤¨à¤¿à¤°à¥à¤®à¤¾à¤£",
    gu: "àª¬àª¾àª‚àª§àª•àª¾àª®",
  },
  {
    en: "EDUCATION",
    hi: "à¤¶à¤¿à¤•à¥à¤·à¤¾",
    gu: "àª¶àª¿àª•à«àª·àª£",
  },
  {
    en: "FINANCE",
    hi: "à¤µà¤¿à¤¤à¥à¤¤",
    gu: "àª¨àª¾àª£àª¾àª•à«€àª¯ àª¸à«‡àªµàª¾",
  },
  {
    en: "HEALTHCARE",
    hi: "à¤¸à¥à¤µà¤¾à¤¸à¥à¤¥à¥à¤¯ à¤¸à¥‡à¤µà¤¾",
    gu: "àª†àª°à«‹àª—à«àª¯ àª¸à«‡àªµàª¾",
  },
  {
    en: "IT",
    hi: "à¤†à¤ˆà¤Ÿà¥€",
    gu: "àª†àªˆàªŸà«€",
  },
  {
    en: "MANUFACTURING",
    hi: "à¤µà¤¿à¤¨à¤¿à¤°à¥à¤®à¤¾à¤£",
    gu: "àª‰àª¤à«àªªàª¾àª¦àª¨",
  },
  {
    en: "REAL ESTATE",
    hi: "à¤°à¤¿à¤¯à¤² à¤à¤¸à¥à¤Ÿà¥‡à¤Ÿ",
    gu: "àª°àª¿àª¯àª² àªàª¸à«àªŸà«‡àªŸ",
  },
  {
    en: "RETAIL",
    hi: "à¤–à¥à¤¦à¤°à¤¾ à¤µà¥à¤¯à¤¾à¤ªà¤¾à¤°",
    gu: "àª°àª¿àªŸà«‡àª²",
  },
  {
    en: "SERVICES",
    hi: "à¤¸à¥‡à¤µà¤¾à¤à¤",
    gu: "àª¸à«‡àªµàª¾àª“",
  },
  {
    en: "TRADING",
    hi: "à¤µà¥à¤¯à¤¾à¤ªà¤¾à¤°",
    gu: "àªµà«‡àªªàª¾àª°",
  },
];

/*
|--------------------------------------------------------------------------
| HELPERS
|--------------------------------------------------------------------------
*/

async function upsertTranslation(
  model: any,
  relationField: string,
  foreignKey: string,
  recordId: string,
  locale: string,
  name: string
) {
  await model.upsert({
    where: {
      [`${foreignKey}_locale`]: {
        [foreignKey.replace(
          /_locale$/,
          ""
        )]: recordId,
        locale,
      },
    },
    create: {
      id: crypto.randomUUID(),
      [foreignKey.replace(/_locale$/, "")]: recordId,
      locale,
      name,
    },
    update: {
      name,
    },
  });
}

/*
|--------------------------------------------------------------------------
| MAIN
|--------------------------------------------------------------------------
*/

async function seedProfessions() {
  console.log("\n=== PROFESSIONS ===");

  for (const item of professionTranslations) {
    const profession = await prisma.profession.findUnique({
      where: {
        name: item.en,
      },
    });

    if (!profession) {
      console.log(`SKIPPED: Profession not found -> ${item.en}`);
      continue;
    }

    await prisma.professionTranslation.upsert({
      where: {
        professionId_locale: {
          professionId: profession.id,
          locale: "en",
        },
      },
      create: {
        id: crypto.randomUUID(),
        professionId: profession.id,
        locale: "en",
        name: item.en,
      },
      update: {
        name: item.en,
      },
    });

    await prisma.professionTranslation.upsert({
      where: {
        professionId_locale: {
          professionId: profession.id,
          locale: "hi",
        },
      },
      create: {
        id: crypto.randomUUID(),
        professionId: profession.id,
        locale: "hi",
        name: item.hi,
      },
      update: {
        name: item.hi,
      },
    });

    await prisma.professionTranslation.upsert({
      where: {
        professionId_locale: {
          professionId: profession.id,
          locale: "gu",
        },
      },
      create: {
        id: crypto.randomUUID(),
        professionId: profession.id,
        locale: "gu",
        name: item.gu,
      },
      update: {
        name: item.gu,
      },
    });

    console.log(`OK: ${item.en}`);
  }
}

async function seedBloodGroups() {
  console.log("\n=== BLOOD GROUPS ===");

  for (const item of bloodGroupTranslations) {
    const bloodGroup =
      await prisma.bloodGroup.findUnique({
        where: {
          name: item.en,
        },
      });

    if (!bloodGroup) {
      console.log(
        `SKIPPED: Blood group not found -> ${item.en}`
      );
      continue;
    }

    for (const [locale, name] of [
      ["en", item.en],
      ["hi", item.hi],
      ["gu", item.gu],
    ] as const) {
      await prisma.bloodGroupTranslation.upsert({
        where: {
          bloodGroupId_locale: {
            bloodGroupId: bloodGroup.id,
            locale,
          },
        },
        create: {
          id: crypto.randomUUID(),
          bloodGroupId: bloodGroup.id,
          locale,
          name,
        },
        update: {
          name,
        },
      });
    }

    console.log(`OK: ${item.en}`);
  }
}

async function seedBusinessCategories() {
  console.log("\n=== BUSINESS CATEGORIES ===");

  for (const item of businessCategoryTranslations) {
    const category =
      await prisma.businessCategory.findUnique({
        where: {
          name: item.en,
        },
      });

    if (!category) {
      console.log(
        `SKIPPED: Business category not found -> ${item.en}`
      );
      continue;
    }

    for (const [locale, name] of [
      ["en", item.en],
      ["hi", item.hi],
      ["gu", item.gu],
    ] as const) {
      await prisma.businessCategoryTranslation.upsert({
        where: {
          businessCategoryId_locale: {
            businessCategoryId: category.id,
            locale,
          },
        },
        create: {
          id: crypto.randomUUID(),
          businessCategoryId: category.id,
          locale,
          name,
        },
        update: {
          name,
        },
      });
    }

    console.log(`OK: ${item.en}`);
  }
}

async function main() {
  console.log("========================================");
  console.log("MASTER DATA TRANSLATION SEED");
  console.log("========================================");

  await seedProfessions();
  await seedBloodGroups();
  await seedBusinessCategories();

  console.log("\n========================================");
  console.log("TRANSLATION SEED COMPLETED");
  console.log("========================================");
}

main()
  .catch((error) => {
    console.error("\nSEED FAILED:");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });