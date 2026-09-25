import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Newspaper,
  Sparkles,
} from "lucide-react";

type Locale = "en" | "hi" | "gu";

const text: Record<
  Locale,
  {
    badge: string;
    title: string;
    accent: string;
    description: string;
    emptyTitle: string;
    emptyDescription: string;
    readMore: string;
    communityNews: string;
    latest: string;
    joinTitle: string;
    joinDescription: string;
    joinButton: string;
    activities: string;
  }
> = {
  en: {
    badge: "ASK COMMUNITY NEWS",
    title: "What's Happening",
    accent: "In Our Community",
    description:
      "Stay connected with the latest community updates, announcements, achievements, initiatives, and stories from ASK.",
    emptyTitle: "No news available",
    emptyDescription:
      "New community news will appear here as soon as it is published.",
    readMore: "Read More",
    communityNews: "Community News",
    latest: "Latest",
    joinTitle: "Stay Connected With ASK",
    joinDescription:
      "Join the ASK community and stay informed about activities, events, announcements, and important community updates.",
    joinButton: "Become a Member",
    activities: "View Activities",
  },
  hi: {
    badge: "ASK सामुदायिक समाचार",
    title: "हमारे समुदाय में",
    accent: "क्या हो रहा है",
    description:
      "ASK की नवीनतम सामुदायिक जानकारी, घोषणाओं, उपलब्धियों, पहलों और कहानियों से जुड़े रहें।",
    emptyTitle: "अभी कोई समाचार उपलब्ध नहीं है",
    emptyDescription:
      "नए सामुदायिक समाचार प्रकाशित होते ही यहां दिखाई देंगे।",
    readMore: "और पढ़ें",
    communityNews: "सामुदायिक समाचार",
    latest: "नवीनतम",
    joinTitle: "ASK से जुड़े रहें",
    joinDescription:
      "ASK समुदाय से जुड़ें और गतिविधियों, कार्यक्रमों, घोषणाओं और महत्वपूर्ण सामुदायिक अपडेट की जानकारी प्राप्त करें।",
    joinButton: "सदस्य बनें",
    activities: "गतिविधियां देखें",
  },
  gu: {
    badge: "ASK સામુદાયિક સમાચાર",
    title: "આપણા સમુદાયમાં",
    accent: "શું થઈ રહ્યું છે",
    description:
      "ASKના નવીનતમ સામુદાયિક અપડેટ્સ, જાહેરાતો, સિદ્ધિઓ, પહેલો અને વાર્તાઓ સાથે જોડાયેલા રહો.",
    emptyTitle: "હાલમાં કોઈ સમાચાર ઉપલબ્ધ નથી",
    emptyDescription:
      "નવા સામુદાયિક સમાચાર પ્રકાશિત થતાં જ અહીં દેખાશે.",
    readMore: "વધુ વાંચો",
    communityNews: "સામુદાયિક સમાચાર",
    latest: "નવીનતમ",
    joinTitle: "ASK સાથે જોડાયેલા રહો",
    joinDescription:
      "ASK સમુદાય સાથે જોડાઓ અને પ્રવૃત્તિઓ, કાર્યક્રમો, જાહેરાતો અને મહત્વપૂર્ણ સામુદાયિક અપડેટ્સ વિશે માહિતગાર રહો.",
    joinButton: "સભ્ય બનો",
    activities: "પ્રવૃત્તિઓ જુઓ",
  },
};

function getLocale(value: string): Locale {
  if (value === "hi") return "hi";
  if (value === "gu") return "gu";
  return "en";
}

function formatDate(date: Date, locale: Locale) {
  const localeMap = {
    en: "en-IN",
    hi: "hi-IN",
    gu: "gu-IN",
  };

  return new Intl.DateTimeFormat(localeMap[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = getLocale(rawLocale);
  const t = text[locale];

  const now = new Date();

  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const newsItems = await prisma.news.findMany({
    where: {
      status: "PUBLISHED",
      publishedAt: {
        gte: oneYearAgo,
        lte: now,
      },
    },
    include: {
      translations: true,
    },
    orderBy: {
      publishedAt: "desc",
    },
  });

  const localizedNews = newsItems
    .map((news) => {
      const translation =
        news.translations.find(
          (item) => item.locale === locale,
        ) ??
        news.translations.find(
          (item) => item.locale === "en",
        ) ??
        news.translations[0] ??
        null;

      return {
        ...news,
        translation,
      };
    })
    .filter((news) => news.translation !== null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fff8f9] via-[#fcebed] to-[#f6dfe3] text-[#3b0710] dark:from-[#210308] dark:via-[#3b0710] dark:to-[#180206] dark:text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#b40018]/10 dark:border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(180,0,24,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(139,18,40,0.12),transparent_35%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(239,0,29,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(180,0,24,0.14),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#b40018]/20 bg-white/70 px-4 py-2 text-xs font-bold tracking-[0.22em] text-[#b40018] shadow-sm backdrop-blur dark:border-[#ef001d]/30 dark:bg-white/5 dark:text-[#ff7182]">
              <Newspaper className="h-4 w-4" />
              {t.badge}
            </div>

            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              {t.title}
              <span className="block bg-gradient-to-r from-[#8b1228] via-[#b40018] to-[#ef001d] bg-clip-text text-transparent dark:from-[#ff6b7d] dark:via-[#ef3349] dark:to-[#ff8a98]">
                {t.accent}
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#6b2733] sm:text-lg dark:text-[#f2cbd0]">
              {t.description}
            </p>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mb-10 flex items-center gap-3">
          <div className="h-1 w-12 rounded-full bg-gradient-to-r from-[#8b1228] to-[#ef001d]" />
          <span className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1228] dark:text-[#ff7182]">
            {t.latest}
          </span>
        </div>

        {localizedNews.length === 0 ? (
          <div className="rounded-3xl border border-[#b40018]/10 bg-white/80 p-12 text-center shadow-xl shadow-[#8b1228]/5 backdrop-blur dark:border-white/10 dark:bg-white/5">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#b40018]/10 text-[#b40018] dark:bg-[#ef001d]/15 dark:text-[#ff7182]">
              <Newspaper className="h-8 w-8" />
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              {t.emptyTitle}
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-[#6b2733] dark:text-[#e5b9c0]">
              {t.emptyDescription}
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {localizedNews.map((news) => {
              const translation = news.translation;

              if (!translation) return null;

              const publishedDate =
                news.publishedAt ?? news.createdAt;

              return (
                <article
                  key={news.id}
                  className="group overflow-hidden rounded-3xl border border-[#b40018]/10 bg-white shadow-xl shadow-[#8b1228]/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#8b1228]/15 dark:border-white/10 dark:bg-[#4a0b16] dark:shadow-black/20"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#8b1228] via-[#b40018] to-[#64131f]">
                    {news.image ? (
                      <Image
                        src={news.image}
                        alt={translation.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Newspaper className="h-16 w-16 text-white/70" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#8b1228] shadow-lg backdrop-blur dark:bg-[#3b0710]/90 dark:text-[#ff8a98]">
                      <Sparkles className="h-3.5 w-3.5" />
                      {t.communityNews}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-sm font-semibold text-white">
                      <CalendarDays className="h-4 w-4" />
                      {formatDate(publishedDate, locale)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="line-clamp-2 text-xl font-bold leading-tight text-[#3b0710] transition-colors group-hover:text-[#b40018] dark:text-white dark:group-hover:text-[#ff7182]">
                      {translation.title}
                    </h2>

                    {translation.excerpt && (
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#6b2733] dark:text-[#e5b9c0]">
                        {translation.excerpt}
                      </p>
                    )}

                    <div className="mt-5 space-y-3">
                      {translation.location && (
                        <div className="flex items-start gap-2 text-sm text-[#7a3b47] dark:text-[#dcaab3]">
                          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#b40018] dark:text-[#ff7182]" />
                          <span className="line-clamp-2">
                            {translation.location}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-sm text-[#7a3b47] dark:text-[#dcaab3]">
                        <CalendarDays className="h-4 w-4 shrink-0 text-[#b40018] dark:text-[#ff7182]" />
                        <span>
                          {formatDate(publishedDate, locale)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-[#b40018]/10 pt-5 dark:border-white/10">
                      <Link
                        href={`/${locale}/news/${news.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#b40018] transition-all hover:gap-3 dark:text-[#ff7182]"
                      >
                        {t.readMore}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="px-6 pb-20 sm:px-8 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#8b1228] via-[#b40018] to-[#64131f] px-8 py-14 text-white shadow-2xl shadow-[#8b1228]/20 sm:px-12 lg:px-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-black/10 blur-3xl" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-2 text-white/80">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-bold uppercase tracking-[0.18em]">
                  {t.communityNews}
                </span>
              </div>

              <h2 className="text-3xl font-black sm:text-4xl">
                {t.joinTitle}
              </h2>

              <p className="mt-4 leading-7 text-white/80">
                {t.joinDescription}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/register`}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#8b1228] shadow-lg transition hover:-translate-y-0.5"
              >
                {t.joinButton}
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href={`/${locale}/activities`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                {t.activities}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}