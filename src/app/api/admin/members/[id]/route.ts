import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { UserStatus } from "@prisma/client";
import { NextResponse } from "next/server";

async function checkAdmin() {
  const session = await auth();

  const role = session?.user
    ? String(
        (session.user as { role?: string }).role || ""
      )
    : "";

  return (
    role === "ADMIN" ||
    role === "SUPER_ADMIN"
  );
}

function isUserStatus(
  value: unknown
): value is UserStatus {
  return (
    typeof value === "string" &&
    Object.values(UserStatus).includes(
      value as UserStatus
    )
  );
}

export async function GET(
  _req: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    if (!(await checkAdmin())) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    const member = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        memberProfile: true,
      },
    });

    if (!member || member.role !== "MEMBER") {
      return NextResponse.json(
        { error: "Member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(member);
  } catch (error) {
    console.error(
      "GET MEMBER ERROR:",
      error
    );

    return NextResponse.json(
      { error: "Failed to fetch member" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    if (!(await checkAdmin())) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    const body = await req.json();

    const status = body?.status;

    if (!isUserStatus(status)) {
      return NextResponse.json(
        { error: "Invalid member status" },
        { status: 400 }
      );
    }

    const existingMember =
      await prisma.user.findUnique({
        where: {
          id,
        },
      });

    if (
      !existingMember ||
      existingMember.role !== "MEMBER"
    ) {
      return NextResponse.json(
        { error: "Member not found" },
        { status: 404 }
      );
    }

    const updatedMember =
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          status,
        },
        include: {
          memberProfile: true,
        },
      });

    return NextResponse.json(updatedMember);
  } catch (error) {
    console.error(
      "UPDATE MEMBER ERROR:",
      error
    );

    return NextResponse.json(
      { error: "Failed to update member" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    if (!(await checkAdmin())) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    const existingMember =
      await prisma.user.findUnique({
        where: {
          id,
        },
      });

    if (
      !existingMember ||
      existingMember.role !== "MEMBER"
    ) {
      return NextResponse.json(
        { error: "Member not found" },
        { status: 404 }
      );
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "DELETE MEMBER ERROR:",
      error
    );

    return NextResponse.json(
      { error: "Failed to delete member" },
      { status: 500 }
    );
  }
}