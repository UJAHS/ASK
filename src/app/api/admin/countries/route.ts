import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const VALID_LOCALES = ["en", "hi", "gu"] as const;

type Locale = (typeof VALID_LOCALES)[number];

function isAdminRole(role: unknown) {
  return role === "ADMIN" || role === "SUPER_ADMIN";
}

function getLocale(request: NextRequest): Locale {
  const value = request.nextUrl.searchParams.get("locale") || "en";

  return VALID_LOCALES.includes(value as Locale)
    ? (value as Locale)
    : "en";
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    const role = String(
      (session?.user as { role?: string } | undefined)?.role || ""
    );

    if (!isAdminRole(role)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const locale = getLocale(request);

    const countries = await prisma.country.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        translations: {
          orderBy: {
            locale: "asc",
          },
        },
      },
    });

    const data = countries.map((country) => {
      const selectedTranslation =
        country.translations.find(
          (translation) => translation.locale === locale
        ) ||
        country.translations.find(
          (translation) => translation.locale === "en"
        );

      return {
        id: country.id,
        name: selectedTranslation?.name || country.name || "",
        legacyName: country.name || "",
        isActive: country.isActive,
        createdAt: country.createdAt,
        updatedAt: country.updatedAt,
        translations: country.translations.map((translation) => ({
          id: translation.id,
          locale: translation.locale,
          name: translation.name,
        })),
      };
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/admin/countries error:", error);

    return NextResponse.json(
      { error: "Failed to fetch country data" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    const role = String(
      (session?.user as { role?: string } | undefined)?.role || ""
    );

    if (!isAdminRole(role)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const legacyName =
      typeof body.name === "string" ? body.name.trim() : "";

    const inputTranslations =
      body.translations &&
      typeof body.translations === "object"
        ? body.translations
        : {};

    const translations: Record<string, string> = {};

    for (const locale of VALID_LOCALES) {
      const value =
        typeof inputTranslations[locale] === "string"
          ? inputTranslations[locale].trim()
          : "";

      if (value) {
        translations[locale] = value;
      }
    }

    const englishName = translations.en || legacyName;

    if (!englishName) {
      return NextResponse.json(
        { error: "English country name is required" },
        { status: 400 }
      );
    }

    if (englishName.length > 100) {
      return NextResponse.json(
        { error: "Country name cannot exceed 100 characters" },
        { status: 400 }
      );
    }

    const duplicate =
      await prisma.countryTranslation.findFirst({
        where: {
          locale: "en",
          name: englishName,
        },
      });

    if (duplicate) {
      return NextResponse.json(
        {
          error:
            "A country with this English name already exists",
        },
        { status: 409 }
      );
    }

    const country = await prisma.country.create({
      data: {
        name: englishName,
        isActive:
          typeof body.isActive === "boolean"
            ? body.isActive
            : true,
        translations: {
          create: Object.entries({
            en: englishName,
            ...translations,
          }).map(([locale, name]) => ({
            locale,
            name,
          })),
        },
      },
      include: {
        translations: true,
      },
    });

    return NextResponse.json(country, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/countries error:", error);

    return NextResponse.json(
      { error: "Failed to create country" },
      { status: 500 }
    );
  }
}