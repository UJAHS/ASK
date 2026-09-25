import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

function admin(role: unknown) {
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

    if (!admin(role)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
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
          NOT: { skillId: id },
        },
      });

    if (duplicate) {
      return NextResponse.json(
        { error: "This skill already exists" },
        { status: 409 }
      );
    }

    const skill = await prisma.skill.update({
      where: { id },
      data: {
        name: englishName,
        ...(typeof body.isActive === "boolean"
          ? { isActive: body.isActive }
          : {}),
        translations: {
          deleteMany: {},
          create: Object.entries(translations)
            .filter(
              ([, value]) =>
                typeof value === "string" &&
                value.trim()
            )
            .map(([locale, value]) => ({
              locale,
              name: String(value).trim(),
            })),
        },
      },
      include: {
        translations: true,
      },
    });

    return NextResponse.json(skill);
  } catch (error) {
    console.error("PUT skill error:", error);

    return NextResponse.json(
      { error: "Failed to update skill" },
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

    if (!admin(role)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    await prisma.skill.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("DELETE skill error:", error);

    return NextResponse.json(
      { error: "Failed to delete skill" },
      { status: 500 }
    );
  }
}
