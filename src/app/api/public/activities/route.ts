import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const now = new Date();

    const oneYearAgo = new Date(now);
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const activities = await prisma.activity.findMany({
      where: {
        status: "PUBLISHED",
        OR: [
          {
            activityDate: {
              gte: oneYearAgo,
            },
          },
          {
            activityDate: null,
            createdAt: {
              gte: oneYearAgo,
            },
          },
        ],
      },
      orderBy: [
        {
          activityDate: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
      select: {
        id: true,
        title: true,
        category: true,
        activityDate: true,
      },
    });

    return NextResponse.json({
      activities,
    });
  } catch (error) {
    console.error("Public activities API error:", error);

    return NextResponse.json(
      {
        activities: [],
        error: "Unable to load activities",
      },
      {
        status: 500,
      },
    );
  }
}