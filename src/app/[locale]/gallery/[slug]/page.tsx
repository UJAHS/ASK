import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

const text = {
  en: {
    back: "Back to Gallery",
    event: "Event",
    images: "Images",
    noImages:
      "No images are available in this gallery.",
  },

  hi: {
    back: "गैलरी पर वापस जाएं",
    event: "कार्यक्रम",
    images: "इमेज",
    noImages:
      "इस गैलरी में कोई इमेज उपलब्ध नहीं है।",
  },

  gu: {
    back: "ગેલેરી પર પાછા જાઓ",
    event: "કાર્યક્રમ",
    images: "ઇમેજ",
    noImages:
      "આ ગેલેરીમાં કોઈ ઇમેજ ઉપલબ્ધ નથી.",
  },
};

function getLocale(
  value: string
): "en" | "hi" | "gu" {
  if (value === "hi") return "hi";
  if (value === "gu") return "gu";
  return "en";
}

export default async function GalleryDetailPage({
  params,
}: Props) {
  const {
    locale,
    slug,
  } = await params;

  const language = getLocale(locale);
  const labels = text[language];

  const gallery =
    await prisma.gallery.findFirst({
      where: {
        slug,
        status: "PUBLISHED",
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

        event: {
          include: {
            translations: true,
          },
        },
      },
    });

  if (!gallery) {
    notFound();
  }

  const translation =
    gallery.translations.find(
      (item) =>
        item.locale === locale
    ) ||
    gallery.translations.find(
      (item) =>
        item.locale === "en"
    );

  const eventTranslation =
    gallery.event?.translations?.find(
      (item) =>
        item.locale === locale
    ) ||
    gallery.event?.translations?.find(
      (item) =>
        item.locale === "en"
    );

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-red-800 via-red-700 to-red-600 px-6 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <Link
            href={
              "/" +
              locale +
              "/gallery"
            }
            className="inline-flex items-center text-sm font-medium text-red-100 transition hover:text-white"
          >
            ← {labels.back}
          </Link>

          <h1 className="mt-6 text-3xl font-bold sm:text-5xl">
            {translation?.title ||
              gallery.slug}
          </h1>

          {translation?.description && (
            <p className="mt-4 max-w-3xl text-base leading-7 text-red-100 sm:text-lg">
              {
                translation.description
              }
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-white/15 px-4 py-2 text-sm">
              {gallery.images.length}{" "}
              {labels.images}
            </span>

            {eventTranslation?.title && (
              <span className="rounded-full bg-white/15 px-4 py-2 text-sm">
                {labels.event}:{" "}
                {eventTranslation.title}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        {gallery.images.length === 0 ? (
          <div className="rounded-2xl border bg-white px-6 py-16 text-center shadow-sm">
            <p className="text-gray-500">
              {labels.noImages}
            </p>
          </div>
        ) : (
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            {gallery.images.map(
              (image) => {
                const imageTranslation =
                  image.translations.find(
                    (item) =>
                      item.locale ===
                      locale
                  ) ||
                  image.translations.find(
                    (item) =>
                      item.locale ===
                      "en"
                  );

                return (
                  <figure
                    key={image.id}
                    className="mb-6 break-inside-avoid overflow-hidden rounded-2xl border bg-white shadow-sm"
                  >
                    <img
                      src={image.imageUrl}
                      alt={
                        imageTranslation?.caption ||
                        translation?.title ||
                        gallery.slug
                      }
                      className="block h-auto w-full"
                    />

                    {imageTranslation?.caption && (
                      <figcaption className="px-4 py-3 text-sm leading-6 text-gray-600">
                        {
                          imageTranslation.caption
                        }
                      </figcaption>
                    )}
                  </figure>
                );
              }
            )}
          </div>
        )}
      </section>
    </main>
  );
}