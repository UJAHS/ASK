import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const allowedLocales = ["en", "hi", "gu"];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const requestedLocale = searchParams.get("locale") || "en";
    const locale = allowedLocales.includes(requestedLocale)
      ? requestedLocale
      : "en";

    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const galleries = await prisma.gallery.findMany({
      where: {
        status: "PUBLISHED",
        createdAt: {
          gte: oneYearAgo,
          lte: new Date(),
        },
      },
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
      orderBy: {
        createdAt: "desc",
      },
    });

    const result = galleries.map((gallery) => {
      const galleryTranslation =
        gallery.translations.find(
          (translation) => translation.locale === locale,
        ) ??
        gallery.translations.find(
          (translation) => translation.locale === "en",
        ) ??
        gallery.translations[0] ??
        null;

      const images = gallery.images.map((image) => ({
        id: image.id,
        imageUrl: image.imageUrl,
        sortOrder: image.sortOrder,
        createdAt: image.createdAt.toISOString(),
        translations: image.translations.map((translation) => ({
          id: translation.id,
          locale: translation.locale,
          caption: translation.caption,
        })),
      }));

      return {
        id: gallery.id,
        slug: gallery.slug,
        coverImage: gallery.coverImage,
        category: gallery.category,
        createdAt: gallery.createdAt.toISOString(),
        translation: galleryTranslation
          ? {
              title: galleryTranslation.title,
              description: galleryTranslation.description,
            }
          : null,
        images,
      };
    });

    return NextResponse.json(result, {
      status: 200,
      headers: {
        "Cache-Control":
          "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("PUBLIC GALLERY API ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to load gallery",
      },
      {
        status: 500,
      },
    );
  }
}