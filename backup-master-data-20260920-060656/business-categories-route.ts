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

    const items = await prisma.businessCategory.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("Business Category GET error:", error);
    return NextResponse.json(
      { error: "Failed to load business categories." },
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
        { error: "Business category name is required." },
        { status: 400 }
      );
    }

    if (name.length > 100) {
      return NextResponse.json(
        { error: "Business category name must not exceed 100 characters." },
        { status: 400 }
      );
    }

    const existing = await prisma.businessCategory.findUnique({
      where: { name },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Business category already exists." },
        { status: 409 }
      );
    }

    const item = await prisma.businessCategory.create({
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
    console.error("Business Category POST error:", error);
    return NextResponse.json(
      { error: "Failed to create business category." },
      { status: 500 }
    );
  }
}