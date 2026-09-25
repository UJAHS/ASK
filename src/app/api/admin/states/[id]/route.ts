import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const VALID_LOCALES = ["en", "hi", "gu"] as const;

function isAdmin(session: any) {
  const role = String(session?.user?.role || "");
  return role === "ADMIN" || role === "SUPER_ADMIN";
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

async function getState(id: string) {
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

    const existing = await getState(id);

    if (!existing) {
      return NextResponse.json(
        { error: "State not found." },
        { status: 404 }
      );
    }

    const inputTranslations = getTranslations(body);

    const existingEnglish =
      existing.StateTranslation.find(
        (item) => item.locale === "en"
      )?.name || existing.name;

    const englishName =
      inputTranslations.en || existingEnglish;

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

    const duplicate = await prisma.state.findFirst({
      where: {
        name: englishName,
        NOT: { id },
      },
      select: { id: true },
    });

    if (duplicate) {
      return NextResponse.json(
        { error: "State already exists." },
        { status: 409 }
      );
    }

    const hasCountryId =
      Object.prototype.hasOwnProperty.call(body, "countryId");

    const countryId = hasCountryId
      ? typeof body.countryId === "string" &&
        body.countryId.trim()
        ? body.countryId.trim()
        : null
      : existing.countryId;

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

    const isActive =
      typeof body?.isActive === "boolean"
        ? body.isActive
        : existing.isActive;

    const updated = await prisma.$transaction(async (tx) => {
      await tx.state.update({
        where: { id },
        data: {
          name: englishName,
          countryId,
          isActive,
        },
      });

      for (const locale of VALID_LOCALES) {
        if (
          !Object.prototype.hasOwnProperty.call(
            inputTranslations,
            locale
          )
        ) {
          continue;
        }

        const name = inputTranslations[locale];

        if (!name) {
          continue;
        }

        await tx.stateTranslation.upsert({
          where: {
            stateId_locale: {
              stateId: id,
              locale,
            },
          },
          update: {
            name,
          },
          create: {
            id: crypto.randomUUID(),
            stateId: id,
            locale,
            name,
          },
        });
      }

      return tx.state.findUnique({
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
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(
      "PUT /api/admin/states/[id] error:",
      error
    );

    return NextResponse.json(
      { error: "Failed to update state" },
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

    const state = await prisma.state.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
      },
    });

    if (!state) {
      return NextResponse.json(
        { error: "State not found." },
        { status: 404 }
      );
    }

    const cityCount = await prisma.city.count({
      where: {
        stateId: id,
      },
    });

    if (cityCount > 0) {
      return NextResponse.json(
        {
          error:
            "This state cannot be deleted because cities are linked to it. Deactivate it instead.",
        },
        { status: 409 }
      );
    }

    await prisma.state.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "State deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE /api/admin/states/[id] error:",
      error
    );

    return NextResponse.json(
      { error: "Failed to delete state" },
      { status: 500 }
    );
  }
}