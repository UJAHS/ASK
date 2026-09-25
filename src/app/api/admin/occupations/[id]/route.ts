import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

function isAdmin(session: any) {
  const role = String(session?.user?.role || "");

  return (
    role === "ADMIN" ||
    role === "SUPER_ADMIN"
  );
}

export async function PUT(
  req: Request,
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

    const name = String(
      body.name || ""
    ).trim();

    if (!name) {
      return NextResponse.json(
        {
          error:
            "Occupation name is required.",
        },
        { status: 400 }
      );
    }

    if (name.length > 100) {
      return NextResponse.json(
        {
          error:
            "Occupation name must not exceed 100 characters.",
        },
        { status: 400 }
      );
    }

    const occupation =
      await prisma.occupation.findUnique({
        where: { id },
      });

    if (!occupation) {
      return NextResponse.json(
        {
          error:
            "Occupation not found.",
        },
        { status: 404 }
      );
    }

    const existing =
      await prisma.occupation.findFirst({
        where: {
          name,
          NOT: {
            id,
          },
        },
      });

    if (existing) {
      return NextResponse.json(
        {
          error:
            "Occupation already exists.",
        },
        { status: 409 }
      );
    }

    const rawTranslations =
      body.translations &&
      typeof body.translations === "object"
        ? body.translations
        : {};

    const translationValues = {
      en: String(
        rawTranslations.en || ""
      ).trim(),

      hi: String(
        rawTranslations.hi || ""
      ).trim(),

      gu: String(
        rawTranslations.gu || ""
      ).trim(),
    };

    const item =
      await prisma.$transaction(
        async (tx) => {
          await tx.occupation.update({
            where: { id },

            data: {
              name,

              ...(typeof body.isActive ===
              "boolean"
                ? {
                    isActive:
                      body.isActive,
                  }
                : {}),
            },
          });

          const locales = [
            "en",
            "hi",
            "gu",
          ] as const;

          for (const locale of locales) {
            const translationName =
              translationValues[locale];

            if (translationName) {
              await tx.occupationTranslation.upsert(
                {
                  where: {
                    occupationId_locale: {
                      occupationId: id,
                      locale,
                    },
                  },

                  update: {
                    name:
                      translationName,
                  },

                  create: {
                    occupationId: id,
                    locale,
                    name:
                      translationName,
                  },
                }
              );
            } else {
              await tx.occupationTranslation.deleteMany(
                {
                  where: {
                    occupationId: id,
                    locale,
                  },
                }
              );
            }
          }

          return tx.occupation.findUnique({
            where: { id },

            include: {
              translations: {
                orderBy: {
                  locale: "asc",
                },
              },
            },
          });
        }
      );

    return NextResponse.json(item);
  } catch (error) {
    console.error(
      "Occupation PUT error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to update occupation.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
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

    const existing =
      await prisma.occupation.findUnique({
        where: { id },
      });

    if (!existing) {
      return NextResponse.json(
        {
          error:
            "Occupation not found.",
        },
        { status: 404 }
      );
    }

    await prisma.occupation.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Occupation DELETE error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to delete occupation.",
      },
      { status: 500 }
    );
  }
}
