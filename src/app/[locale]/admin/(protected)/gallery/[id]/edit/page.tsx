import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { GalleryForm } from "@/components/admin/GalleryForm";

type Props = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

const pageText = {
  en: {
    title: "Edit Gallery",
    description:
      "Update gallery information and images.",
  },

  hi: {
    title: "गैलरी संपादित करें",
    description:
      "गैलरी की जानकारी और इमेज अपडेट करें।",
  },

  gu: {
    title: "ગેલેરી સંપાદિત કરો",
    description:
      "ગેલેરીની માહિતી અને ઇમેજ અપડેટ કરો.",
  },
};

export default async function EditGalleryPage({
  params,
}: Props) {
  const { locale, id } =
    await params;

  const language =
    locale === "hi"
      ? "hi"
      : locale === "gu"
      ? "gu"
      : "en";

  const text = pageText[language];

  const gallery =
    await prisma.gallery.findUnique({
      where: {
        id,
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
    });

  if (!gallery) {
    notFound();
  }

  const events =
    await prisma.event.findMany({
      orderBy: {
        eventDate: "desc",
      },

      include: {
        translations: true,
      },
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          {text.title}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {text.description}
        </p>
      </div>

      <GalleryForm
        locale={locale}
        events={events}
        galleryId={gallery.id}
        initialData={gallery}
      />
    </div>
  );
}