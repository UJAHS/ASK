import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  isValidLocale,
  type Locale,
} from "@/i18n/config";

export const dynamic = "force-dynamic";

const translations: Record<
  Locale,
  {
    back: string;
    location: string;
    published: string;
    notFound: string;
  }
> = {
  en: {
    back: "Back to News",
    location: "Location",
    published: "Published",
    notFound: "News article not found.",
  },

  hi: {
    back: "समाचार पर वापस जाएँ",
    location: "स्थान",
    published: "प्रकाशित",
    notFound: "समाचार लेख नहीं मिला।",
  },

  gu: {
    back: "સમાચાર પર પાછા જાઓ",
    location: "સ્થળ",
    published: "પ્રકાશિત",
    notFound: "સમાચાર લેખ મળ્યો નથી.",
  },
};

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const currentLocale: Locale = locale;
  const t = translations[currentLocale];

  const news = await prisma.news.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
      translations: {
        some: {
          locale: currentLocale,
        },
      },
    },
    include: {
      translations: {
        where: {
          locale: currentLocale,
        },
      },
    },
  });

  if (!news || news.translations.length === 0) {
    notFound();
  }

  const translation =
    news.translations[0];

  return (
    <main className="min-h-screen bg-white">
      <article className="mx-auto max-w-5xl px-6 py-10 md:py-16">
        <Link
          href={`/${currentLocale}/news`}
          className="inline-flex items-center text-sm font-semibold text-red-800 transition hover:text-red-950"
        >
          ← {t.back}
        </Link>

        <div className="mt-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
            {translation.title}
          </h1>

          <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-500">
            {news.publishedAt && (
              <span>
                {t.published}:{" "}
                {new Date(
                  news.publishedAt
                ).toLocaleDateString(
                  currentLocale === "gu"
                    ? "gu-IN"
                    : currentLocale === "hi"
                      ? "hi-IN"
                      : "en-IN",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </span>
            )}

            {translation.location && (
              <span>
                {t.location}:{" "}
                {translation.location}
              </span>
            )}
          </div>

          {news.image && (
            <div className="mt-8 overflow-hidden rounded-2xl">
              <img
                src={news.image}
                alt={translation.title}
                className="max-h-[600px] w-full object-cover"
              />
            </div>
          )}

          {translation.excerpt && (
            <p className="mt-8 text-lg font-medium leading-8 text-gray-600 md:text-xl">
              {translation.excerpt}
            </p>
          )}

          <div className="mt-8 whitespace-pre-wrap text-base leading-8 text-gray-700 md:text-lg">
            {translation.content}
          </div>
        </div>
      </article>
    </main>
  );
}