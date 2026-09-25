import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const VALID_LOCALES = ["en", "hi", "gu"] as const;

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    const role = String(
      (session?.user as { role?: string } | undefined)?.role || ""
    );

    if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.gotra.findUnique({
      where: { id },
      include: {
        translations: true,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Gotra not found" },
        { status: 404 }
      );
    }

    const inputTranslations =
      body.translations && typeof body.translations === "object"
        ? body.translations
        : {};

    const translations: Record<string, string> = {};

    for (const locale of VALID_LOCALES) {
      if (typeof inputTranslations[locale] === "string") {
        const value = inputTranslations[locale].trim();

        if (value) {
          translations[locale] = value;
        }
      }
    }

    const legacyName =
      typeof body.name === "string" ? body.name.trim() : "";

    const englishName =
      translations.en ||
      legacyName ||
      existing.translations.find(
        (translation) => translation.locale === "en"
      )?.name ||
      existing.name ||
      "";

    if (!englishName) {
      return NextResponse.json(
        { error: "English Gotra name is required" },
        { status: 400 }
      );
    }

    const duplicate = await prisma.gotraTranslation.findFirst({
      where: {
        locale: "en",
        name: englishName,
        NOT: {
          gotraId: id,
        },
      },
    });

    if (duplicate) {
      return NextResponse.json(
        { error: "A Gotra with this English name already exists" },
        { status: 409 }
      );
    }

    const updated = await prisma.$transaction(async (tx) => {
      const gotra = await tx.gotra.update({
        where: { id },
        data: {
          name: englishName,
          ...(typeof body.isActive === "boolean"
            ? { isActive: body.isActive }
            : {}),
        },
      });

      for (const locale of VALID_LOCALES) {
        if (!Object.prototype.hasOwnProperty.call(translations, locale)) {
          continue;
        }

        await tx.gotraTranslation.upsert({
          where: {
            gotraId_locale: {
              gotraId: id,
              locale,
            },
          },
          update: {
            name: translations[locale],
          },
          create: {
            gotraId: id,
            locale,
            name: translations[locale],
          },
        });
      }

      return tx.gotra.findUnique({
        where: { id },
        include: {
          translations: true,
        },
      });
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/admin/gotra/[id] error:", error);

    return NextResponse.json(
      { error: "Failed to update Gotra" },
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

    if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const existing = await prisma.gotra.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Gotra not found" },
        { status: 404 }
      );
    }

    await prisma.gotra.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Gotra deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/admin/gotra/[id] error:", error);

    return NextResponse.json(
      { error: "Failed to delete Gotra" },
      { status: 500 }
    );
  }
}