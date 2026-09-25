import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getDictionary } from "@/i18n";
import { GalleryDeleteButton } from "@/components/admin/GalleryDeleteButton";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

const pageText = {
  en: {
    description:
      "Manage community galleries",
    gallery: "Gallery",
    images: "Images",
    event: "Event",
    status: "Status",
    actions: "Actions",
    noEvent: "No Event",
  },

  hi: {
    description:
      "सामुदायिक गैलरी प्रबंधित करें",
    gallery: "गैलरी",
    images: "इमेज",
    event: "कार्यक्रम",
    status: "स्थिति",
    actions: "कार्रवाई",
    noEvent: "कोई कार्यक्रम नहीं",
  },

  gu: {
    description:
      "સમુદાયની ગેલેરીનું સંચાલન કરો",
    gallery: "ગેલેરી",
    images: "ઇમેજ",
    event: "કાર્યક્રમ",
    status: "સ્થિતિ",
    actions: "ક્રિયાઓ",
    noEvent: "કોઈ કાર્યક્રમ નથી",
  },
};

function getLocale(
  value: string
): "en" | "hi" | "gu" {
  if (value === "hi") return "hi";
  if (value === "gu") return "gu";
  return "en";
}

export default async function GalleryPage({
  params,
}: Props) {
  const { locale } = await params;

  const language = getLocale(locale);

  const dictionary =
    getDictionary(language);

  const text =
    pageText[language];

  const galleries =
    await prisma.gallery.findMany({
      include: {
        translations: true,

        images: true,

        event: {
          include: {
            translations: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {dictionary.common.gallery}
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            {text.description}
          </p>
        </div>

        <Link
          href={
            "/" +
            locale +
            "/admin/gallery/new"
          }
          className="inline-flex items-center justify-center rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800"
        >
          + {dictionary.common.create}
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        {galleries.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            {dictionary.common.noData}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px]">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-5 py-4 text-left text-sm font-semibold">
                    {text.gallery}
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold">
                    {text.images}
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold">
                    {text.event}
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold">
                    {text.status}
                  </th>

                  <th className="px-5 py-4 text-right text-sm font-semibold">
                    {text.actions}
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {galleries.map(
                  (gallery) => {
                    const translation =
                      gallery.translations.find(
                        (item) =>
                          item.locale ===
                          locale
                      ) ||
                      gallery.translations.find(
                        (item) =>
                          item.locale ===
                          "en"
                      );

                    const eventTranslation =
                      gallery.event?.translations?.find(
                        (item) =>
                          item.locale ===
                          locale
                      ) ||
                      gallery.event?.translations?.find(
                        (item) =>
                          item.locale ===
                          "en"
                      );

                    return (
                      <tr
                        key={
                          gallery.id
                        }
                        className="hover:bg-gray-50"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-4">
                            <div className="h-14 w-20 overflow-hidden rounded-lg bg-gray-100">
                              {gallery.coverImage ? (
                                <img
                                  src={
                                    gallery.coverImage
                                  }
                                  alt={
                                    translation?.title ||
                                    gallery.slug
                                  }
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center text-xs text-gray-400">
                                  —
                                </div>
                              )}
                            </div>

                            <div>
                              <div className="font-medium text-gray-900">
                                {translation?.title ||
                                  gallery.slug}
                              </div>

                              <div className="text-xs text-gray-500">
                                {gallery.slug}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-600">
                          {gallery.images.length}
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-600">
                          {eventTranslation?.title ||
                            text.noEvent}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={
                              "rounded-full px-3 py-1 text-xs font-medium " +
                              (
                                gallery.status ===
                                "PUBLISHED"
                                  ? "bg-green-100 text-green-700"
                                  : gallery.status ===
                                    "DRAFT"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-100 text-gray-600"
                              )
                            }
                          >
                            {gallery.status}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-4">
                            <Link
                              href={
                                "/" +
                                locale +
                                "/admin/gallery/" +
                                gallery.id +
                                "/edit"
                              }
                              className="text-sm font-medium text-red-700 hover:underline"
                            >
                              {
                                dictionary
                                  .common
                                  .edit
                              }
                            </Link>

                            <GalleryDeleteButton
                              galleryId={
                                gallery.id
                              }
                              locale={
                                locale
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}