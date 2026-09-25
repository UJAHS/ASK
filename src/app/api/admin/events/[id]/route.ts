import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { EventStatus } from "@prisma/client";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

type EventTranslationInput = {
  title?: unknown;
  description?: unknown;
  location?: unknown;
};

function isEventStatus(
  value: unknown
): value is EventStatus {
  return (
    typeof value === "string" &&
    Object.values(EventStatus).includes(
      value as EventStatus
    )
  );
}

function optionalString(
  value: unknown
): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  return trimmed || null;
}

function requiredString(
  value: unknown
): string {
  return typeof value === "string"
    ? value.trim()
    : "";
}

async function checkAdmin() {
  const session = await auth();

  const role = String(
    (session?.user as { role?: string } | undefined)
      ?.role || ""
  );

  return (
    role === "ADMIN" ||
    role === "SUPER_ADMIN"
  );
}

export async function PUT(
  req: Request,
  context: Context
) {
  try {
    const isAdmin = await checkAdmin();

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    const { id } = await context.params;

    const body = await req.json();

    const slug = requiredString(
      body?.slug
    );

    const eventDateValue =
      body?.eventDate;

    const startTime = optionalString(
      body?.startTime
    );

    const endTime = optionalString(
      body?.endTime
    );

    const image = optionalString(
      body?.image
    );

    const statusValue =
      body?.status || "DRAFT";

    const translations =
      body?.translations;

    if (!slug || !eventDateValue) {
      return NextResponse.json(
        {
          error:
            "Slug and event date are required",
        },
        {
          status: 400,
        }
      );
    }

    if (!isEventStatus(statusValue)) {
      return NextResponse.json(
        {
          error: "Invalid event status",
        },
        {
          status: 400,
        }
      );
    }

    const parsedEventDate =
      new Date(eventDateValue);

    if (
      Number.isNaN(
        parsedEventDate.getTime()
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid event date",
        },
        {
          status: 400,
        }
      );
    }

    if (
      translations !== undefined &&
      (
        typeof translations !== "object" ||
        translations === null ||
        Array.isArray(translations)
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid translations format",
        },
        {
          status: 400,
        }
      );
    }

    const event =
      await prisma.event.findUnique({
        where: {
          id,
        },
      });

    if (!event) {
      return NextResponse.json(
        {
          error: "Event not found",
        },
        {
          status: 404,
        }
      );
    }

    const duplicate =
      await prisma.event.findFirst({
        where: {
          slug,
          NOT: {
            id,
          },
        },
      });

    if (duplicate) {
      return NextResponse.json(
        {
          error:
            "Another event already uses this slug",
        },
        {
          status: 409,
        }
      );
    }

    await prisma.event.update({
      where: {
        id,
      },

      data: {
        slug,

        eventDate:
          parsedEventDate,

        startTime,

        endTime,

        image,

        status: statusValue,
      },
    });

    if (translations) {
      const translationMap =
        translations as Record<
          string,
          EventTranslationInput
        >;

      for (const locale of [
        "en",
        "hi",
        "gu",
      ]) {
        const translation =
          translationMap[locale];

        if (!translation) {
          continue;
        }

        const title =
          requiredString(
            translation.title
          );

        if (!title) {
          return NextResponse.json(
            {
              error:
                `Title is required for ${locale} translation`,
            },
            {
              status: 400,
            }
          );
        }

        await prisma.eventTranslation.upsert({
          where: {
            eventId_locale: {
              eventId: id,
              locale,
            },
          },

          update: {
            title,

            description:
              optionalString(
                translation.description
              ),

            location:
              optionalString(
                translation.location
              ),
          },

          create: {
            eventId: id,

            locale,

            title,

            description:
              optionalString(
                translation.description
              ),

            location:
              optionalString(
                translation.location
              ),
          },
        });
      }
    }

    const updated =
      await prisma.event.findUnique({
        where: {
          id,
        },
        include: {
          translations: true,
        },
      });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(
      "UPDATE_EVENT_ERROR",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to update event",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  _req: Request,
  context: Context
) {
  try {
    const isAdmin = await checkAdmin();

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    const { id } = await context.params;

    const event =
      await prisma.event.findUnique({
        where: {
          id,
        },
      });

    if (!event) {
      return NextResponse.json(
        {
          error: "Event not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.event.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Event deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE_EVENT_ERROR",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to delete event",
      },
      {
        status: 500,
      }
    );
  }
}