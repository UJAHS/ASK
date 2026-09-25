import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { EventStatus } from "@prisma/client";

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

export async function POST(req: Request) {
  try {
    const session = await auth();

    const role = String(
      (session?.user as { role?: string } | undefined)
        ?.role || ""
    );

    if (
      role !== "ADMIN" &&
      role !== "SUPER_ADMIN"
    ) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

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
        { status: 400 }
      );
    }

    if (!isEventStatus(statusValue)) {
      return NextResponse.json(
        {
          error: "Invalid event status",
        },
        { status: 400 }
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
        { status: 400 }
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
        { status: 400 }
      );
    }

    const existing =
      await prisma.event.findUnique({
        where: {
          slug,
        },
      });

    if (existing) {
      return NextResponse.json(
        {
          error:
            "An event with this slug already exists",
        },
        { status: 409 }
      );
    }

    const translationEntries =
      Object.entries(
        (translations || {}) as Record<
          string,
          EventTranslationInput
        >
      );

    const validTranslations =
      translationEntries
        .map(([locale, value]) => ({
          locale: locale.trim(),
          title: requiredString(
            value?.title
          ),
          description:
            optionalString(
              value?.description
            ),
          location:
            optionalString(
              value?.location
            ),
        }))
        .filter(
          (translation) =>
            translation.locale &&
            translation.title
        );

    if (
      translationEntries.length > 0 &&
      validTranslations.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "At least one valid translation with a title is required",
        },
        { status: 400 }
      );
    }

    const event =
      await prisma.event.create({
        data: {
          slug,

          eventDate:
            parsedEventDate,

          startTime,

          endTime,

          image,

          status: statusValue,

          translations: {
            create:
              validTranslations.map(
                (translation) => ({
                  locale:
                    translation.locale,

                  title:
                    translation.title,

                  description:
                    translation.description,

                  location:
                    translation.location,
                })
              ),
          },
        },

        include: {
          translations: true,
        },
      });

    return NextResponse.json(
      event,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "CREATE_EVENT_ERROR",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to create event",
      },
      {
        status: 500,
      }
    );
  }
}