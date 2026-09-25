import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const LOCALES = ["en", "hi", "gu"] as const;

function isAdmin(session: any) {
  const role = String(session?.user?.role || "");

  return role === "ADMIN" || role === "SUPER_ADMIN";
}

function normalizeTranslations(value: unknown) {
  const input =
    value && typeof value === "object"
      ? (value as Record<string, unknown>)
      : {};

  return {
    en: String(input.en ?? "").trim(),
    hi: String(input.hi ?? "").trim(),
    gu: String(input.gu ?? "").trim(),
  };
}

function getLocale(value: string | null) {
  return LOCALES.includes(value as any)
    ? (value as (typeof LOCALES)[number])
    : "en";
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!isAdmin(session)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const locale = getLocale(
      req.nextUrl.searchParams.get("locale")
    );

    const items = await prisma.profession.findMany({
      include: {
        ProfessionTranslation: {
          orderBy: {
            locale: "asc",
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    const result = items.map((item) => {
      const localized =
        item.ProfessionTranslation.find(
          (translation) => translation.locale === locale
        )?.name ||
        item.ProfessionTranslation.find(
          (translation) => translation.locale === "en"
        )?.name ||
        item.name;

      return {
        ...item,
        name: localized,
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Profession GET error:", error);

    return NextResponse.json(
      {
        error: "Failed to load profession records.",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!isAdmin(session)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const translations = normalizeTranslations(
      body.translations
    );

    if (!translations.en) {
      return NextResponse.json(
        {
          error: "English profession name is required.",
        },
        { status: 400 }
      );
    }

    for (const locale of LOCALES) {
      if (translations[locale].length > 100) {
        return NextResponse.json(
          {
            error: `${locale.toUpperCase()} profession name cannot exceed 100 characters.`,
          },
          { status: 400 }
        );
      }
    }

    const existing = await prisma.profession.findUnique({
      where: {
        name: translations.en,
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          error:
            "A profession with this English name already exists.",
        },
        { status: 409 }
      );
    }

    const profession = await prisma.profession.create({
      data: {
        name: translations.en,
        isActive: true,

        ProfessionTranslation: {
          create: LOCALES
            .filter((locale) => translations[locale])
            .map((locale) => ({
              id: crypto.randomUUID(),
              locale,
              name: translations[locale],
            })),
        },
      },

      include: {
        ProfessionTranslation: true,
      },
    });

    return NextResponse.json(
      profession,
      { status: 201 }
    );
  } catch (error) {
    console.error("Profession POST error:", error);

    return NextResponse.json(
      {
        error: "Failed to create profession.",
      },
      { status: 500 }
    );
  }
}
