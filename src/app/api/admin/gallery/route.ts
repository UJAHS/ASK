import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { GalleryStatus } from "@prisma/client";

const VALID_LOCALES = [
  "en",
  "hi",
  "gu",
] as const;

type Locale = (typeof VALID_LOCALES)[number];

type GalleryTranslationInput = {
  title?: unknown;
  description?: unknown;
};

type GalleryImageInput = {
  imageUrl?: unknown;
  caption?: unknown;
};

function cleanString(
  value: unknown
): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function isLocale(
  value: unknown
): value is Locale {
  return (
    typeof value === "string" &&
    VALID_LOCALES.includes(
      value as Locale
    )
  );
}

function isGalleryStatus(
  value: unknown
): value is GalleryStatus {
  return (
    typeof value === "string" &&
    Object.values(GalleryStatus).includes(
      value as GalleryStatus
    )
  );
}

function isObject(
  value: unknown
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

async function checkAdmin() {
  const session = await auth();

  const role = String(
    (session?.user as {
      role?: string;
    } | undefined)?.role || ""
  );

  return (
    role === "ADMIN" ||
    role === "SUPER_ADMIN"
  );
}

export async function POST(
  req: Request
) {
  try {
    if (!(await checkAdmin())) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    const body = await req.json();

    const slug = cleanString(
      body?.slug
    );

    const statusValue =
      body?.status || "DRAFT";

    const coverImage = cleanString(
      body?.coverImage
    );

    const eventId = cleanString(
      body?.eventId
    );

    const localeValue = cleanString(
      body?.locale
    );

    const translations =
      body?.translations;

    const images =
      body?.images;

    if (!slug) {
      return NextResponse.json(
        {
          error:
            "Slug is required.",
        },
        { status: 400 }
      );
    }

    if (!localeValue) {
      return NextResponse.json(
        {
          error:
            "Language is required.",
        },
        { status: 400 }
      );
    }

    if (!isLocale(localeValue)) {
      return NextResponse.json(
        {
          error:
            "Invalid language.",
        },
        { status: 400 }
      );
    }

    if (!isGalleryStatus(statusValue)) {
      return NextResponse.json(
        {
          error:
            "Invalid gallery status.",
        },
        { status: 400 }
      );
    }

    if (
      translations !== undefined &&
      !isObject(translations)
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid translations format.",
        },
        { status: 400 }
      );
    }

    if (
      images !== undefined &&
      !Array.isArray(images)
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid images format.",
        },
        { status: 400 }
      );
    }

    const existing =
      await prisma.gallery.findUnique({
        where: {
          slug,
        },
      });

    if (existing) {
      return NextResponse.json(
        {
          error:
            "A gallery with this slug already exists.",
        },
        { status: 409 }
      );
    }

    if (eventId) {
      const event =
        await prisma.event.findUnique({
          where: {
            id: eventId,
          },
        });

      if (!event) {
        return NextResponse.json(
          {
            error:
              "Selected event was not found.",
          },
          { status: 400 }
        );
      }
    }

    const translationMap =
      isObject(translations)
        ? translations
        : {};

    const translation =
      translationMap[localeValue];

    if (
      !isObject(translation)
    ) {
      return NextResponse.json(
        {
          error:
            "Gallery translation is required.",
        },
        { status: 400 }
      );
    }

    const title = cleanString(
      translation.title
    );

    const description =
      cleanString(
        translation.description
      );

    if (!title) {
      return NextResponse.json(
        {
          error:
            "Gallery title is required.",
        },
        { status: 400 }
      );
    }

    const imageInputs: GalleryImageInput[] =
      Array.isArray(images)
        ? images
            .filter(isObject)
            .map((image) => ({
              imageUrl:
                image.imageUrl,
              caption:
                image.caption,
            }))
        : [];

    const preparedImages =
      imageInputs
        .map((image, index) => {
          const imageUrl =
            cleanString(
              image.imageUrl
            );

          const caption =
            cleanString(
              image.caption
            );

          return {
            imageUrl,
            caption:
              caption || null,
            sortOrder: index,
          };
        })
        .filter(
          (image) =>
            image.imageUrl
        );

    if (
      Array.isArray(images) &&
      images.length > 0 &&
      preparedImages.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "At least one valid gallery image is required.",
        },
        { status: 400 }
      );
    }

    const gallery =
      await prisma.gallery.create({
        data: {
          slug,

          status:
            statusValue,

          coverImage:
            coverImage || null,

          eventId:
            eventId || null,

          translations: {
            create: {
              locale:
                localeValue,

              title,

              description:
                description || null,
            },
          },

          images: {
            create:
              preparedImages.map(
                (image) => ({
                  imageUrl:
                    image.imageUrl,

                  sortOrder:
                    image.sortOrder,

                  translations: {
                    create: {
                      locale:
                        localeValue,

                      caption:
                        image.caption,
                    },
                  },
                })
              ),
          },
        },

        include: {
          translations: true,

          images: {
            include: {
              translations: true,
            },
          },
        },
      });

    return NextResponse.json(
      gallery,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "CREATE_GALLERY_ERROR",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to create gallery.",
      },
      {
        status: 500,
      }
    );
  }
}