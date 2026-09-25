import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import NewsTable from "@/components/admin/NewsTable";
import {
  isValidLocale,
  type Locale,
} from "@/i18n/config";

export const dynamic = "force-dynamic";

const translations: Record<
  Locale,
  {
    title: string;
    description: string;
    addNews: string;
    totalNews: string;
    published: string;
    draft: string;
    archived: string;
  }
> = {
  en: {
    title: "News",
    description:
      "Manage community news and announcements.",
    addNews: "+ Add News",
    totalNews: "Total News",
    published: "Published",
    draft: "Draft",
    archived: "Archived",
  },

  hi: {
    title: "समाचार",
    description:
      "सामुदायिक समाचार और घोषणाओं का प्रबंधन करें।",
    addNews: "+ समाचार जोड़ें",
    totalNews: "कुल समाचार",
    published: "प्रकाशित",
    draft: "ड्राफ्ट",
    archived: "संग्रहीत",
  },

  gu: {
    title: "સમાચાર",
    description:
      "સમુદાયના સમાચાર અને જાહેરાતોનું સંચાલન કરો.",
    addNews: "+ સમાચાર ઉમેરો",
    totalNews: "કુલ સમાચાર",
    published: "પ્રકાશિત",
    draft: "ડ્રાફ્ટ",
    archived: "આર્કાઇવ કરેલ",
  },
};

export default async function AdminNewsPage({
  params,
}: {
  params: Promise<{
    locale: string;
  }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const currentLocale: Locale = locale;
  const t = translations[currentLocale];

  const session = await auth();

  const role = session?.user?.role
    ? String(session.user.role)
    : "";

  const isAdmin =
    role === "ADMIN" ||
    role === "SUPER_ADMIN";

  if (!isAdmin) {
    redirect(`/${currentLocale}/unauthorized`);
  }

  const news = await prisma.news.findMany({
    include: {
      translations: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const publishedCount = news.filter(
    (item) => item.status === "PUBLISHED"
  ).length;

  const draftCount = news.filter(
    (item) => item.status === "DRAFT"
  ).length;

  const archivedCount = news.filter(
    (item) => item.status === "ARCHIVED"
  ).length;

  const tableNews = news.map((item) => ({
    id: item.id,
    slug: item.slug,
    image: item.image,
    status: item.status,
    publishedAt: item.publishedAt
      ? item.publishedAt.toISOString()
      : null,
    createdAt: item.createdAt.toISOString(),
    translations: item.translations.map(
      (translation) => ({
        locale: translation.locale,
        title: translation.title,
        excerpt: translation.excerpt,
        content: translation.content,
        location: translation.location,
      })
    ),
  }));

  return (
    <div className="mx-auto max-w-7xl">
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t.title}
          </h1>

          <p className="mt-1 text-red-900/80 dark:text-red-100/75">
            {t.description}
          </p>
        </div>

        <Link
          href={`/${currentLocale}/admin/news/new`}
          className="
            inline-flex
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-r
            from-red-700
            to-red-900
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            shadow-lg
            shadow-red-900/20
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:from-red-800
            hover:to-red-950
            hover:shadow-xl
            dark:from-red-700
            dark:to-red-900
          "
        >
          {t.addNews}
        </Link>
      </div>

      {/* STATISTICS */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* TOTAL */}
        <div
          className="
            rounded-2xl
            border
            border-red-300/80
            bg-gradient-to-br
            from-[#ffdfe5]
            via-[#ffd2da]
            to-[#ffc4ce]
            p-5
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-red-400
            hover:shadow-[0_18px_40px_rgba(190,24,93,0.15)]
            dark:border-red-900/70
            dark:from-[#68131f]
            dark:via-[#570e18]
            dark:to-[#410810]
          "
        >
          <p className="text-sm font-medium text-red-900/70 dark:text-red-100/70">
            {t.totalNews}
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {news.length}
          </p>
        </div>

        {/* PUBLISHED */}
        <div
          className="
            rounded-2xl
            border
            border-red-300/80
            bg-gradient-to-br
            from-[#ffdfe5]
            via-[#ffd2da]
            to-[#ffc4ce]
            p-5
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-red-400
            hover:shadow-[0_18px_40px_rgba(190,24,93,0.15)]
            dark:border-red-900/70
            dark:from-[#68131f]
            dark:via-[#570e18]
            dark:to-[#410810]
          "
        >
          <p className="text-sm font-medium text-red-900/70 dark:text-red-100/70">
            {t.published}
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
            {publishedCount}
          </p>
        </div>

        {/* DRAFT */}
        <div
          className="
            rounded-2xl
            border
            border-red-300/80
            bg-gradient-to-br
            from-[#ffdfe5]
            via-[#ffd2da]
            to-[#ffc4ce]
            p-5
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-red-400
            hover:shadow-[0_18px_40px_rgba(190,24,93,0.15)]
            dark:border-red-900/70
            dark:from-[#68131f]
            dark:via-[#570e18]
            dark:to-[#410810]
          "
        >
          <p className="text-sm font-medium text-red-900/70 dark:text-red-100/70">
            {t.draft}
          </p>

          <p className="mt-2 text-3xl font-bold text-amber-600 dark:text-amber-400">
            {draftCount}
          </p>
        </div>

        {/* ARCHIVED */}
        <div
          className="
            rounded-2xl
            border
            border-red-300/80
            bg-gradient-to-br
            from-[#ffdfe5]
            via-[#ffd2da]
            to-[#ffc4ce]
            p-5
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-red-400
            hover:shadow-[0_18px_40px_rgba(190,24,93,0.15)]
            dark:border-red-900/70
            dark:from-[#68131f]
            dark:via-[#570e18]
            dark:to-[#410810]
          "
        >
          <p className="text-sm font-medium text-red-900/70 dark:text-red-100/70">
            {t.archived}
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-600 dark:text-gray-300">
            {archivedCount}
          </p>
        </div>
      </div>

      {/* NEWS TABLE */}
      <NewsTable news={tableNews} />
    </div>
  );
}