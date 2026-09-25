import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

function isAdmin(session: any) {
  const role = String(session?.user?.role || "");
  return role === "ADMIN" || role === "SUPER_ADMIN";
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!isAdmin(session)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const name = String(body.name || "").trim();

    if (!name) {
      return NextResponse.json(
        { error: "Profession name is required." },
        { status: 400 }
      );
    }

    const existing = await prisma.profession.findFirst({
      where: {
        name,
        NOT: { id },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Profession already exists." },
        { status: 409 }
      );
    }

    const item = await prisma.profession.update({
      where: { id },
      data: {
        name,
        ...(typeof body.isActive === "boolean"
          ? { isActive: body.isActive }
          : {}),
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("Profession PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update profession." },
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
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.profession.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Profession DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete profession." },
      { status: 500 }
    );
  }
}