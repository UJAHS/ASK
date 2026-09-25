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

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!isAdmin(session)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await req.json();

    const translations = normalizeTranslations(
      body.translations
    );

    if (!translations.en) {
      return NextResponse.json(
        {
          error: "English business category name is required.",
        },
        { status: 400 }
      );
    }

    for (const locale of LOCALES) {
      if (translations[locale].length > 100) {
        return NextResponse.json(
          {
            error: `${locale.toUpperCase()} business category name cannot exceed 100 characters.`,
          },
          { status: 400 }
        );
      }
    }

    const existing =
      await prisma.businessCategory.findFirst({
        where: {
          name: translations.en,
          NOT: {
            id,
          },
        },
      });

    if (existing) {
      return NextResponse.json(
        {
          error:
            "Another business category already uses this English name.",
        },
        { status: 409 }
      );
    }

    const businessCategory =
      await prisma.$transaction(async (tx) => {
        await tx.businessCategory.update({
          where: { id },
          data: {
            name: translations.en,

            isActive:
              typeof body.isActive === "boolean"
                ? body.isActive
                : undefined,
          },
        });

        for (const locale of LOCALES) {
          if (translations[locale]) {
            await tx.businessCategoryTranslation.upsert({
              where: {
                businessCategoryId_locale: {
                  businessCategoryId: id,
                  locale,
                },
              },

              create: {
                id: crypto.randomUUID(),
                businessCategoryId: id,
                locale,
                name: translations[locale],
              },

              update: {
                name: translations[locale],
              },
            });
          } else {
            await tx.businessCategoryTranslation.deleteMany({
              where: {
                businessCategoryId: id,
                locale,
              },
            });
          }
        }

        return tx.businessCategory.findUnique({
          where: { id },

          include: {
            BusinessCategoryTranslation: true,
          },
        });
      });

    return NextResponse.json(businessCategory);
  } catch (error) {
    console.error(
      "Business Category PUT error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to update business category.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!isAdmin(session)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    await prisma.businessCategory.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Business Category DELETE error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to delete business category.",
      },
      { status: 500 }
    );
  }
}