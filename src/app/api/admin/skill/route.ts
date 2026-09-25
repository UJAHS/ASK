import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const LOCALES = ["en", "hi", "gu"] as const;

function admin(role: unknown) {
  return role === "ADMIN" || role === "SUPER_ADMIN";
}

export async function GET() {
  try {
    const session = await auth();

    const role = String(
      (session?.user as { role?: string } | undefined)?.role || ""
    );

    if (!admin(role)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const skills = await prisma.skill.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        translations: {
          orderBy: { locale: "asc" },
        },
      },
    });

    return NextResponse.json(skills);
  } catch (error) {
    console.error("GET skill error:", error);

    return NextResponse.json(
      { error: "Failed to fetch skills" },
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

    if (!admin(role)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const translations =
      body.translations &&
      typeof body.translations === "object"
        ? body.translations
        : {};

    const englishName =
      typeof translations.en === "string"
        ? translations.en.trim()
        : "";

    if (!englishName) {
      return NextResponse.json(
        { error: "English skill name is required" },
        { status: 400 }
      );
    }

    const duplicate =
      await prisma.skillTranslation.findFirst({
        where: {
          locale: "en",
          name: englishName,
        },
      });

    if (duplicate) {
      return NextResponse.json(
        { error: "This skill already exists" },
        { status: 409 }
      );
    }

    const data = LOCALES
      .map((locale) => ({
        locale,
        name:
          typeof translations[locale] === "string"
            ? translations[locale].trim()
            : "",
      }))
      .filter((item) => item.name);

    const skill = await prisma.skill.create({
      data: {
        name: englishName,
        isActive:
          typeof body.isActive === "boolean"
            ? body.isActive
            : true,
        translations: {
          create: data,
        },
      },
      include: {
        translations: true,
      },
    });

    return NextResponse.json(skill, {
      status: 201,
    });
  } catch (error) {
    console.error("POST skill error:", error);

    return NextResponse.json(
      { error: "Failed to create skill" },
      { status: 500 }
    );
  }
}
