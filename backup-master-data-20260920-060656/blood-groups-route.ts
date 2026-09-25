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

    const items = await prisma.bloodGroup.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("Blood Group GET error:", error);
    return NextResponse.json(
      { error: "Failed to load blood groups." },
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

    if (!name) {
      return NextResponse.json(
        { error: "Blood group name is required." },
        { status: 400 }
      );
    }

    if (name.length > 50) {
      return NextResponse.json(
        { error: "Blood group name must not exceed 50 characters." },
        { status: 400 }
      );
    }

    const existing = await prisma.bloodGroup.findUnique({
      where: { name },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Blood group already exists." },
        { status: 409 }
      );
    }

    const item = await prisma.bloodGroup.create({
      data: {
        name,
        isActive:
          typeof body.isActive === "boolean"
            ? body.isActive
            : true,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Blood Group POST error:", error);
    return NextResponse.json(
      { error: "Failed to create blood group." },
      { status: 500 }
    );
  }
}