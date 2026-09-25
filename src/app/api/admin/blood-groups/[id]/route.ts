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
          error: "English blood group name is required.",
        },
        { status: 400 }
      );
    }

    for (const locale of LOCALES) {
      if (translations[locale].length > 50) {
        return NextResponse.json(
          {
            error: `${locale.toUpperCase()} blood group name cannot exceed 50 characters.`,
          },
          { status: 400 }
        );
      }
    }

    const existing = await prisma.bloodGroup.findFirst({
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
            "Another blood group already uses this English name.",
        },
        { status: 409 }
      );
    }

    const bloodGroup = await prisma.$transaction(
      async (tx) => {
        await tx.bloodGroup.update({
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
            await tx.bloodGroupTranslation.upsert({
              where: {
                bloodGroupId_locale: {
                  bloodGroupId: id,
                  locale,
                },
              },

              create: {
                id: crypto.randomUUID(),
                bloodGroupId: id,
                locale,
                name: translations[locale],
              },

              update: {
                name: translations[locale],
              },
            });
          } else {
            await tx.bloodGroupTranslation.deleteMany({
              where: {
                bloodGroupId: id,
                locale,
              },
            });
          }
        }

        return tx.bloodGroup.findUnique({
          where: { id },

          include: {
            BloodGroupTranslation: true,
          },
        });
      }
    );

    return NextResponse.json(bloodGroup);
  } catch (error) {
    console.error("Blood Group PUT error:", error);

    return NextResponse.json(
      {
        error: "Failed to update blood group.",
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

    await prisma.bloodGroup.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Blood Group DELETE error:", error);

    return NextResponse.json(
      {
        error: "Failed to delete blood group.",
      },
      { status: 500 }
    );
  }
}