import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(
  req: Request,
  context: Context
) {
  try {
    const session = await auth();

    const role = String(
      (session?.user as any)?.role || ""
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

    const { id } = await context.params;

    const body = await req.json();

    const {
      slug,
      eventDate,
      startTime,
      endTime,
      image,
      status,
      translations,
    } = body;

    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    await prisma.event.update({
      where: { id },

      data: {
        slug,
        eventDate: new Date(eventDate),
        startTime: startTime || null,
        endTime: endTime || null,
        image: image || null,
        status: status || "DRAFT",
      },
    });

    for (const locale of [
      "en",
      "hi",
      "gu",
    ]) {
      const translation =
        translations?.[locale];

      if (!translation) {
        continue;
      }

      await prisma.eventTranslation.upsert({
        where: {
          eventId_locale: {
            eventId: id,
            locale,
          },
        },

        update: {
          title: translation.title,
          description:
            translation.description || null,
          location:
            translation.location || null,
        },

        create: {
          eventId: id,
          locale,
          title: translation.title,
          description:
            translation.description || null,
          location:
            translation.location || null,
        },
      });
    }

    const updated = await prisma.event.findUnique({
      where: { id },
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
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}