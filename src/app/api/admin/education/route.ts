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

    const educationRecords =
      await prisma.education.findMany({
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

    const data = educationRecords.map(
      (education) => {
        const selectedTranslation =
          education.translations.find(
            (translation) =>
              translation.locale === locale
          ) ||
          education.translations.find(
            (translation) =>
              translation.locale === "en"
          );

        return {
          id: education.id,
          name:
            selectedTranslation?.name ||
            education.name ||
            "",
          legacyName: education.name || "",
          isActive: education.isActive,
          createdAt: education.createdAt,
          updatedAt: education.updatedAt,
          translations:
            education.translations.map(
              (translation) => ({
                id: translation.id,
                locale: translation.locale,
                name: translation.name,
              })
            ),
        };
      }
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error(
      "GET /api/admin/education error:",
      error
    );

    return NextResponse.json(
      { error: "Failed to fetch education data" },
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
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    const inputTranslations =
      body.translations &&
      typeof body.translations === "object"
        ? body.translations
        : {};

    const translations: Record<string, string> =
      {};

    for (const locale of VALID_LOCALES) {
      const value =
        typeof inputTranslations[locale] ===
        "string"
          ? inputTranslations[locale].trim()
          : "";

      if (value) {
        translations[locale] = value;
      }
    }

    const englishName =
      translations.en || legacyName;

    if (!englishName) {
      return NextResponse.json(
        {
          error:
            "English education name is required",
        },
        { status: 400 }
      );
    }

    if (englishName.length > 150) {
      return NextResponse.json(
        {
          error:
            "Education name cannot exceed 150 characters",
        },
        { status: 400 }
      );
    }

    const duplicate =
      await prisma.educationTranslation.findFirst(
        {
          where: {
            locale: "en",
            name: englishName,
          },
        }
      );

    if (duplicate) {
      return NextResponse.json(
        {
          error:
            "An education record with this English name already exists",
        },
        { status: 409 }
      );
    }

    const education =
      await prisma.education.create({
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

    return NextResponse.json(
      education,
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "POST /api/admin/education error:",
      error
    );

    return NextResponse.json(
      { error: "Failed to create education record" },
      { status: 500 }
    );
  }
}