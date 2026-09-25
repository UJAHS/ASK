import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const VALID_LOCALES = ["en", "hi", "gu"] as const;

function isAdminRole(role: unknown) {
  return role === "ADMIN" || role === "SUPER_ADMIN";
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.country.findUnique({
      where: { id },
      include: {
        translations: true,
        states: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Country not found" },
        { status: 404 }
      );
    }

    const inputTranslations =
      body.translations &&
      typeof body.translations === "object"
        ? body.translations
        : {};

    const translations: Record<string, string> = {};

    for (const locale of VALID_LOCALES) {
      if (
        typeof inputTranslations[locale] ===
        "string"
      ) {
        const value =
          inputTranslations[locale].trim();

        if (value) {
          translations[locale] = value;
        }
      }
    }

    const legacyName =
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    const englishName =
      translations.en ||
      legacyName ||
      existing.translations.find(
        (translation) =>
          translation.locale === "en"
      )?.name ||
      existing.name ||
      "";

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
          NOT: {
            countryId: id,
          },
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

    const updated = await prisma.$transaction(
      async (tx) => {
        const country = await tx.country.update({
          where: { id },
          data: {
            name: englishName,
            ...(typeof body.isActive ===
            "boolean"
              ? { isActive: body.isActive }
              : {}),
          },
        });

        for (const locale of VALID_LOCALES) {
          if (
            !Object.prototype.hasOwnProperty.call(
              translations,
              locale
            )
          ) {
            continue;
          }

          await tx.countryTranslation.upsert({
            where: {
              countryId_locale: {
                countryId: id,
                locale,
              },
            },
            update: {
              name: translations[locale],
            },
            create: {
              countryId: id,
              locale,
              name: translations[locale],
            },
          });
        }

        return tx.country.findUnique({
          where: { id },
          include: {
            translations: true,
          },
        });
      }
    );

    return NextResponse.json(updated);
  } catch (error) {
    console.error(
      "PUT /api/admin/countries/[id] error:",
      error
    );

    return NextResponse.json(
      { error: "Failed to update country" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;

    const existing = await prisma.country.findUnique({
      where: { id },
      include: {
        states: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Country not found" },
        { status: 404 }
      );
    }

    if (existing.states.length > 0) {
      return NextResponse.json(
        {
          error:
            "This country has states linked to it. Deactivate it instead of deleting it.",
        },
        { status: 409 }
      );
    }

    await prisma.country.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Country deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE /api/admin/countries/[id] error:",
      error
    );

    return NextResponse.json(
      { error: "Failed to delete country" },
      { status: 500 }
    );
  }
}