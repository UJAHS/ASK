import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ActivityStatus } from "@prisma/client";
import { NextResponse } from "next/server";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

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
// GET ACTIVITIES
// =====================================================

export async function GET() {
  try {
    const user = await requireAdmin();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const activities =
      await prisma.activity.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json(activities);
  } catch (error) {
    console.error(
      "GET ACTIVITIES ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to load activities",
      },
      { status: 500 }
    );
  }
}

// =====================================================
// CREATE ACTIVITY
// =====================================================

export async function POST(
  request: Request
) {
  try {
    const user = await requireAdmin();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
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

    let slug = slugify(title);

    if (!slug) {
      slug = `activity-${Date.now()}`;
    }

    const existingSlug =
      await prisma.activity.findUnique({
        where: {
          slug,
        },
      });

    if (existingSlug) {
      slug = `${slug}-${Date.now()}`;
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
      await prisma.activity.create({
        data: {
          title,
          slug,
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

    return NextResponse.json(
      activity,
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "CREATE ACTIVITY ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to create activity",
      },
      { status: 500 }
    );
  }
}