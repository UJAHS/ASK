import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();

    const role = session?.user
      ? String(
          (session.user as { role?: string }).role || ""
        )
      : "";

    const isAdmin =
      role === "ADMIN" ||
      role === "SUPER_ADMIN";

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const members = await prisma.user.findMany({
      where: {
        role: "MEMBER",
      },
      include: {
        memberProfile: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const result = members.map((member) => ({
      id: member.id,
      memberNumber: member.memberNumber,
      email: member.email,
      role: member.role,
      status: member.status,
      createdAt: member.createdAt,
      emailVerified: member.emailVerified,
      profile: member.memberProfile,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET MEMBERS ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch members" },
      { status: 500 }
    );
  }
}