import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const VALID_LOCALES = ["en", "hi", "gu"] as const;
type Locale = (typeof VALID_LOCALES)[number];

function isAdmin(session: any) {
  const role = String(session?.user?.role || "");
  return role === "ADMIN" || role === "SUPER_ADMIN";
}

function getLocale(request: NextRequest): Locale {
  const value = request.nextUrl.searchParams.get("locale") || "en";

  return VALID_LOCALES.includes(value as Locale)
    ? (value as Locale)
    : "en";
}

function getTranslations(body: any) {
  const input =
    body?.translations && typeof body.translations === "object"
      ? body.translations
      : {};

  const translations: Record<string, string> = {};

  for (const locale of VALID_LOCALES) {
    if (typeof input[locale] === "string") {
      const value = input[locale].trim();

      if (value) {
        translations[locale] = value;
      }
    }
  }

  const legacyName =
    typeof body?.name === "string" ? body.name.trim() : "";

  if (!translations.en && legacyName) {
    translations.en = legacyName;
  }

  return translations;
}

function localizedName(
  translations: Array<{ locale: string; name: string }>,
  locale: Locale,
  fallback: string
) {
  return (
    translations.find((item) => item.locale === locale)?.name ||
    translations.find((item) => item.locale === "en")?.name ||
    fallback ||
    ""
  );
}

function serializeState(state: any, locale: Locale) {
  const translations = Array.isArray(state.StateTranslation)
    ? state.StateTranslation.map((item: any) => ({
        id: item.id,
        locale: item.locale,
        name: item.name,
      }))
    : [];

  const countryTranslations = Array.isArray(
    state.country?.translations
  )
    ? state.country.translations.map((item: any) => ({
        id: item.id,
        locale: item.locale,
        name: item.name,
      }))
    : [];

  return {
    id: state.id,
    name: localizedName(translations, locale, state.name),
    isActive: state.isActive,
    createdAt: state.createdAt,
    updatedAt: state.updatedAt,
    translations,
    country: state.country
      ? {
          id: state.country.id,
          name: localizedName(
            countryTranslations,
            locale,
            state.country.name
          ),
          translations: countryTranslations,
        }
      : null,
  };
}

async function getStateWithRelations(id: string) {
  return prisma.state.findUnique({
    where: { id },
    include: {
      StateTranslation: {
        orderBy: { locale: "asc" },
      },
      country: {
        include: {
          translations: {
            orderBy: { locale: "asc" },
          },
        },
      },
    },
  });
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!isAdmin(session)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const locale = getLocale(request);

    const states = await prisma.state.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        StateTranslation: {
          orderBy: {
            locale: "asc",
          },
        },
        country: {
          include: {
            translations: {
              orderBy: {
                locale: "asc",
              },
            },
          },
        },
      },
    });

    return NextResponse.json(
      states.map((state) => serializeState(state, locale))
    );
  } catch (error) {
    console.error("GET /api/admin/states error:", error);

    return NextResponse.json(
      { error: "Failed to load states" },
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

    const translations = getTranslations(body);
    const englishName = translations.en || "";

    if (!englishName) {
      return NextResponse.json(
        { error: "State name in English is required." },
        { status: 400 }
      );
    }

    if (englishName.length > 100) {
      return NextResponse.json(
        { error: "State name must not exceed 100 characters." },
        { status: 400 }
      );
    }

    const countryId =
      typeof body?.countryId === "string" &&
      body.countryId.trim()
        ? body.countryId.trim()
        : null;

    if (countryId) {
      const country = await prisma.country.findUnique({
        where: { id: countryId },
        select: { id: true },
      });

      if (!country) {
        return NextResponse.json(
          { error: "Selected country was not found." },
          { status: 400 }
        );
      }
    }

    const existing = await prisma.state.findUnique({
      where: { name: englishName },
      select: { id: true },
    });

    if (existing) {
      return NextResponse.json(
        { error: "State already exists." },
        { status: 409 }
      );
    }

    const isActive =
      typeof body?.isActive === "boolean"
        ? body.isActive
        : true;

    const state = await prisma.$transaction(async (tx) => {
      const created = await tx.state.create({
        data: {
          name: englishName,
          countryId,
          isActive,
        },
      });

      for (const locale of VALID_LOCALES) {
        const name = translations[locale];

        if (!name) {
          continue;
        }

        await tx.stateTranslation.create({
          data: {
            id: crypto.randomUUID(),
            stateId: created.id,
            locale,
            name,
          },
        });
      }

      return tx.state.findUnique({
        where: { id: created.id },
        include: {
          StateTranslation: {
            orderBy: { locale: "asc" },
          },
          country: {
            include: {
              translations: {
                orderBy: { locale: "asc" },
              },
            },
          },
        },
      });
    });

    return NextResponse.json(
      serializeState(state, "en"),
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/admin/states error:", error);

    return NextResponse.json(
      { error: "Failed to create state" },
      { status: 500 }
    );
  }
}