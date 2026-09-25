import { prisma } from "@/lib/prisma";
import { GalleryForm } from "@/components/admin/GalleryForm";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

const pageText = {
  en: {
    title: "Create Gallery",
    description:
      "Create a community gallery in the selected language.",
  },

  hi: {
    title: "गैलरी बनाएं",
    description:
      "चयनित भाषा में सामुदायिक गैलरी बनाएं।",
  },

  gu: {
    title: "ગેલેરી બનાવો",
    description:
      "પસંદ કરેલી ભાષામાં સમુદાયની ગેલેરી બનાવો.",
  },
};

export default async function NewGalleryPage({
  params,
}: Props) {
  const { locale } = await params;

  const language =
    locale === "hi"
      ? "hi"
      : locale === "gu"
      ? "gu"
      : "en";

  const text = pageText[language];

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
      />
    </div>
  );
}