import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

function isAdmin(session: any) {
  const role = String(session?.user?.role || "");
  return role === "ADMIN" || role === "SUPER_ADMIN";
}

export async function GET() {
  try {
    const session = await auth();

    if (!isAdmin(session)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const items = await prisma.city.findMany({
      include: {
        state: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: [
        { name: "asc" },
      ],
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("City GET error:", error);
    return NextResponse.json(
      { error: "Failed to load cities." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!isAdmin(session)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "City already exists for this state." },
        { status: 409 }
      );
    }

    const item = await prisma.city.create({
      data: {
        name,
        stateId,
        isActive:
          typeof body.isActive === "boolean"
            ? body.isActive
            : true,
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

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("City POST error:", error);
    return NextResponse.json(
      { error: "Failed to create city." },
      { status: 500 }
    );
  }
}