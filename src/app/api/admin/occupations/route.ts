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

export async function GET() {
  try {
    const session = await auth();

    if (!isAdmin(session)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const items = await prisma.occupation.findMany({
      include: {
        translations: {
          orderBy: {
            locale: "asc",
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("Occupation GET error:", error);

    return NextResponse.json(
      {
        error: "Failed to load occupation records.",
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

    const name = String(
      body.name || ""
    ).trim();

    if (!name) {
      return NextResponse.json(
        {
          error: "Occupation name is required.",
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

    const existing =
      await prisma.occupation.findUnique({
        where: {
          name,
        },
      });

    if (existing) {
      return NextResponse.json(
        {
          error: "Occupation already exists.",
        },
        { status: 409 }
      );
    }

    const rawTranslations =
      body.translations &&
      typeof body.translations === "object"
        ? body.translations
        : {};

    const translations = [
      "en",
      "hi",
      "gu",
    ]
      .map((locale) => ({
        locale,
        name: String(
          rawTranslations[locale] || ""
        ).trim(),
      }))
      .filter(
        (translation) =>
          translation.name.length > 0
      );

    const item =
      await prisma.occupation.create({
        data: {
          name,

          isActive:
            typeof body.isActive === "boolean"
              ? body.isActive
              : true,

          translations: {
            create: translations,
          },
        },

        include: {
          translations: true,
        },
      });

    return NextResponse.json(
      item,
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Occupation POST error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to create occupation.",
      },
      { status: 500 }
    );
  }
}
