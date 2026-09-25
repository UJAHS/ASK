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
    const stateId = String(body.stateId || "").trim();

    if (!name) {
      return NextResponse.json(
        { error: "City name is required." },
        { status: 400 }
      );
    }

    if (!stateId) {
      return NextResponse.json(
        { error: "State is required." },
        { status: 400 }
      );
    }

    if (name.length > 100) {
      return NextResponse.json(
        { error: "City name must not exceed 100 characters." },
        { status: 400 }
      );
    }

    const state = await prisma.state.findUnique({
      where: { id: stateId },
    });

    if (!state) {
      return NextResponse.json(
        { error: "Selected state was not found." },
        { status: 400 }
      );
    }

    const existing = await prisma.city.findFirst({
      where: {
        name,
        stateId,
        NOT: { id },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "City already exists for this state." },
        { status: 409 }
      );
    }

    const item = await prisma.city.update({
      where: { id },
      data: {
        name,
        stateId,
        ...(typeof body.isActive === "boolean"
          ? { isActive: body.isActive }
          : {}),
      },
      include: {
        state: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("City PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update city." },
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

    await prisma.city.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("City DELETE error:", error);

    return NextResponse.json(
      { error: "Failed to delete city." },
      { status: 500 }
    );
  }
}