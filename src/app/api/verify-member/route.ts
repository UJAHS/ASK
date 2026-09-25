import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const memberNumber = searchParams.get("memberNumber");

    if (!memberNumber) {
      return NextResponse.json(
        { error: "Member number is required" },
        { status: 400 }
      );
    }

    const number = Number(memberNumber);

    if (!Number.isInteger(number) || number <= 0) {
      return NextResponse.json(
        { error: "Invalid member number" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        memberNumber: number,
      },
      select: {
        id: true,
        memberNumber: true,
        status: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          valid: false,
          error: "Member not found",
        },
        { status: 404 }
      );
    }

    const profile = await prisma.memberProfile.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        firstName: true,
        lastName: true,
      },
    });

    const memberName =
      `${profile?.firstName || ""} ${
        profile?.lastName || ""
      }`.trim() || "Community Member";

    return NextResponse.json({
      valid: user.status === "APPROVED",
      memberNumber: user.memberNumber,
      status: user.status,
      memberName,
      memberSince: user.createdAt,
    });
  } catch (error) {
    console.error(
      "MEMBER VERIFICATION ERROR:",
      error
    );

    return NextResponse.json(
      { error: "Unable to verify member" },
      { status: 500 }
    );
  }
}