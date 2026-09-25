import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { GalleryStatus } from "@prisma/client";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

const VALID_LOCALES = ["en", "hi", "gu"] as const;

type Locale = (typeof VALID_LOCALES)[number];

type GalleryImageInput = {
  id?: unknown;
  imageUrl?: unknown;
  caption?: unknown;
};

function cleanString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isLocale(value: unknown): value is Locale {
  return (
    typeof value === "string" &&
    VALID_LOCALES.includes(value as Locale)
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
    (
      session?.user as {
        role?: string;
      } | undefined
    )?.role || ""
  );

  return role === "ADMIN" || role === "SUPER_ADMIN";
}

export async function PUT(
  req: Request,
  context: Context
) {
  try {
    if (!(await checkAdmin())) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    const { id } = await context.params;
    const body = await req.json();

    const slug = cleanString(body?.slug);
    const statusValue = body?.status || "DRAFT";
    const coverImage = cleanString(body?.coverImage);
    const eventId = cleanString(body?.eventId);
    const localeValue = cleanString(body?.locale);
    const translations = body?.translations;
    const images = body?.images;

    if (!slug || !localeValue) {
      return NextResponse.json(
        {
          error:
            "Slug and language are required.",
        },
        { status: 400 }
      );
    }

    if (!isLocale(localeValue)) {
      return NextResponse.json(
        { error: "Invalid language." },
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

    const gallery =
      await prisma.gallery.findUnique({
        where: { id },
      });

    if (!gallery) {
      return NextResponse.json(
        {
          error: "Gallery not found.",
        },
        { status: 404 }
      );
    }

    const duplicate =
      await prisma.gallery.findFirst({
        where: {
          slug,
          NOT: { id },
        },
      });

    if (duplicate) {
      return NextResponse.json(
        {
          error:
            "Another gallery already uses this slug.",
        },
        { status: 409 }
      );
    }

    if (eventId) {
      const event =
        await prisma.event.findUnique({
          where: { id: eventId },
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

    if (!isObject(translation)) {
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

    const description = cleanString(
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
              id: image.id,
              imageUrl: image.imageUrl,
              caption: image.caption,
            }))
        : [];

    const preparedImages =
      imageInputs
        .map((image, index) => ({
          id: cleanString(image.id),
          imageUrl: cleanString(
            image.imageUrl
          ),
          caption:
            cleanString(image.caption) ||
            null,
          sortOrder: index,
        }))
        .filter(
          (image) => image.imageUrl.length > 0
        );

    await prisma.gallery.update({
      where: { id },

      data: {
        slug,
        status: statusValue,
        coverImage: coverImage || null,
        eventId: eventId || null,
      },
    });

    await prisma.galleryTranslation.upsert({
      where: {
        galleryId_locale: {
          galleryId: id,
          locale: localeValue,
        },
      },

      update: {
        title,
        description: description || null,
      },

      create: {
        galleryId: id,
        locale: localeValue,
        title,
        description: description || null,
      },
    });

    const existingImages =
      await prisma.galleryImage.findMany({
        where: {
          galleryId: id,
        },

        select: {
          id: true,
        },
      });

    const existingImageIds =
      existingImages.map(
        (image) => image.id
      );

    /*
     * Keep only image IDs that belong
     * to this gallery.
     */
    const submittedExistingIds =
      preparedImages
        .map((image) => image.id)
        .filter((imageId) =>
          imageId.length > 0 &&
          existingImageIds.includes(
            imageId
          )
        );

    const imagesToDelete =
      existingImageIds.filter(
        (imageId) =>
          !submittedExistingIds.includes(
            imageId
          )
      );

    if (imagesToDelete.length > 0) {
      await prisma.galleryImage.deleteMany({
        where: {
          galleryId: id,
          id: {
            in: imagesToDelete,
          },
        },
      });
    }

    /*
     * Process each submitted image.
     */
    for (const image of preparedImages) {
      let savedImageId: string;

      const existingImageId =
        image.id.length > 0 &&
        existingImageIds.includes(
          image.id
        )
          ? image.id
          : null;

      if (existingImageId !== null) {
        await prisma.galleryImage.update({
          where: {
            id: existingImageId,
          },

          data: {
            imageUrl: image.imageUrl,
            sortOrder: image.sortOrder,
          },
        });

        savedImageId = existingImageId;
      } else {
        const created =
          await prisma.galleryImage.create({
            data: {
              galleryId: id,
              imageUrl: image.imageUrl,
              sortOrder: image.sortOrder,
            },
          });

        savedImageId = created.id;
      }

      await prisma.galleryImageTranslation.upsert({
        where: {
          galleryImageId_locale: {
            galleryImageId: savedImageId,
            locale: localeValue,
          },
        },

        update: {
          caption: image.caption,
        },

        create: {
          galleryImageId: savedImageId,
          locale: localeValue,
          caption: image.caption,
        },
      });
    }

    const updated =
      await prisma.gallery.findUnique({
        where: { id },

        include: {
          translations: true,

          images: {
            orderBy: {
              sortOrder: "asc",
            },

            include: {
              translations: true,
            },
          },
        },
      });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(
      "UPDATE_GALLERY_ERROR",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to update gallery.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  context: Context
) {
  try {
    if (!(await checkAdmin())) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    const { id } = await context.params;

    const gallery =
      await prisma.gallery.findUnique({
        where: { id },
      });

    if (!gallery) {
      return NextResponse.json(
        {
          error:
            "Gallery not found.",
        },
        { status: 404 }
      );
    }

    await prisma.gallery.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "DELETE_GALLERY_ERROR",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to delete gallery.",
      },
      { status: 500 }
    );
  }
}