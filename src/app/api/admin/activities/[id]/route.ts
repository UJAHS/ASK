import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ActivityStatus } from "@prisma/client";
import { NextResponse } from "next/server";

function isActivityStatus(
  value: unknown
): value is ActivityStatus {
  return (
    typeof value === "string" &&
    Object.values(ActivityStatus).includes(
      value as ActivityStatus
    )
  );
}

async function requireAdmin() {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (
    !user ||
    (user.role !== "ADMIN" &&
      user.role !== "SUPER_ADMIN")
  ) {
    return null;
  }

  return user;
}

// =====================================================
// GET SINGLE ACTIVITY
// =====================================================

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const user = await requireAdmin();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const activity =
      await prisma.activity.findUnique({
        where: {
          id,
        },
      });

    if (!activity) {
      return NextResponse.json(
        {
          error: "Activity not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(activity);
  } catch (error) {
    console.error(
      "GET ACTIVITY ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to load activity",
      },
      { status: 500 }
    );
  }
}

// =====================================================
// UPDATE ACTIVITY
// =====================================================

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const user = await requireAdmin();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const existing =
      await prisma.activity.findUnique({
        where: {
          id,
        },
      });

    if (!existing) {
      return NextResponse.json(
        {
          error: "Activity not found",
        },
        { status: 404 }
      );
    }

    const body = await request.json();

    const title =
      typeof body?.title === "string"
        ? body.title.trim()
        : "";

    const description =
      typeof body?.description === "string"
        ? body.description.trim()
        : "";

    const category =
      typeof body?.category === "string"
        ? body.category.trim()
        : "";

    const location =
      typeof body?.location === "string"
        ? body.location.trim()
        : "";

    const image =
      typeof body?.image === "string"
        ? body.image.trim()
        : "";

    const statusValue =
      body?.status || "DRAFT";

    if (!title) {
      return NextResponse.json(
        {
          error:
            "Activity title is required",
        },
        { status: 400 }
      );
    }

    if (!isActivityStatus(statusValue)) {
      return NextResponse.json(
        {
          error:
            "Invalid activity status",
        },
        { status: 400 }
      );
    }

    let activityDate: Date | null = null;

    if (body?.activityDate) {
      const parsedDate = new Date(
        body.activityDate
      );

      if (Number.isNaN(parsedDate.getTime())) {
        return NextResponse.json(
          {
            error:
              "Invalid activity date",
          },
          { status: 400 }
        );
      }

      activityDate = parsedDate;
    }

    const activity =
      await prisma.activity.update({
        where: {
          id,
        },
        data: {
          title,
          description:
            description || null,
          category:
            category || null,
          location:
            location || null,
          activityDate,
          image:
            image || null,
          status: statusValue,
        },
      });

    return NextResponse.json(activity);
  } catch (error) {
    console.error(
      "UPDATE ACTIVITY ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to update activity",
      },
      { status: 500 }
    );
  }
}

// =====================================================
// DELETE ACTIVITY
// =====================================================

export async function DELETE(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const user = await requireAdmin();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const existing =
      await prisma.activity.findUnique({
        where: {
          id,
        },
      });

    if (!existing) {
      return NextResponse.json(
        {
          error: "Activity not found",
        },
        { status: 404 }
      );
    }

    await prisma.activity.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "DELETE ACTIVITY ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to delete activity",
      },
      { status: 500 }
    );
  }
}