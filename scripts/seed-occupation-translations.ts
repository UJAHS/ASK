import { prisma } from "@/lib/prisma";

const translations: Record<
  string,
  { hi: string; gu: string }
> = {
  "BUSINESS": {
    hi: "व्यवसाय",
    gu: "બિઝનેસ",
  },

  "HOUSE WIFE": {
    hi: "गृहिणी",
    gu: "ગૃહિણી",
  },

  "JOB - GOVERNMENT": {
    hi: "सरकारी नौकरी",
    gu: "સરકારી નોકરી",
  },

  "JOB - PRIVATE": {
    hi: "निजी नौकरी",
    gu: "ખાનગી નોકરી",
  },

  "PROFESSION (SELF EMPLOYED)": {
    hi: "स्वरोजगार",
    gu: "સ્વરોજગાર",
  },

  "RETIRED": {
    hi: "सेवानिवृत्त",
    gu: "નિવૃત્ત",
  },

  "UNEMPLOYED": {
    hi: "बेरोज़गार",
    gu: "બેરોજગાર",
  },
};

async function main() {
  for (const [englishName, values] of Object.entries(translations)) {
    const occupation = await prisma.occupation.findUnique({
      where: {
        name: englishName,
      },
    });

    if (!occupation) {
      console.log(`NOT FOUND: ${englishName}`);
      continue;
    }

    await prisma.occupationTranslation.upsert({
      where: {
        occupationId_locale: {
          occupationId: occupation.id,
          locale: "hi",
        },
      },
      update: {
        name: values.hi,
      },
      create: {
        occupationId: occupation.id,
        locale: "hi",
        name: values.hi,
      },
    });

    await prisma.occupationTranslation.upsert({
      where: {
        occupationId_locale: {
          occupationId: occupation.id,
          locale: "gu",
        },
      },
      update: {
        name: values.gu,
      },
      create: {
        occupationId: occupation.id,
        locale: "gu",
        name: values.gu,
      },
    });

    console.log(`UPDATED: ${englishName}`);
    console.log(`  HI: ${values.hi}`);
    console.log(`  GU: ${values.gu}`);
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
