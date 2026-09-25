import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

type Locale = "en" | "hi" | "gu";

const translations = {
  en: {
    title: "News",
    subtitle:
      "Stay updated with the latest news, announcements, and community updates from Ahhichatra Sanskar Kendra.",
    latestNews: "Latest News",
    noNews: "No news available at the moment.",
    communityNews: "Community News",
    communityName: "ASK Community",
    published: "Published",
    date: "DATE",
    readMore: "Read More",
  },

  hi: {
    title:
      "\u0938\u092e\u093e\u091a\u093e\u0930",
    subtitle:
      "\u0905\u0939\u093f\u091a\u094d\u091b\u0924\u094d\u0930 \u0938\u0902\u0938\u094d\u0915\u093e\u0930 \u0915\u0947\u0928\u094d\u0926\u094d\u0930 \u0915\u0947 \u0928\u0935\u0940\u0928\u0924\u092e \u0938\u092e\u093e\u091a\u093e\u0930, \u0918\u094b\u0937\u0923\u093e\u0913\u0902 \u0914\u0930 \u0938\u093e\u092e\u0941\u0926\u093e\u092f\u093f\u0915 \u0905\u092a\u0921\u0947\u091f \u0938\u0947 \u091c\u0941\u0921\u093c\u0947 \u0930\u0939\u0947\u0902\u0964",
    latestNews:
      "\u0928\u0935\u0940\u0928\u0924\u092e \u0938\u092e\u093e\u091a\u093e\u0930",
    noNews:
      "\u0907\u0938 \u0938\u092e\u092f \u0915\u094b\u0908 \u0938\u092e\u093e\u091a\u093e\u0930 \u0909\u092a\u0932\u092c\u094d\u0927 \u0928\u0939\u0940\u0902 \u0939\u0948\u0964",
    communityNews:
      "\u0938\u093e\u092e\u0941\u0926\u093e\u092f\u093f\u0915 \u0938\u092e\u093e\u091a\u093e\u0930",
    communityName:
      "ASK \u0938\u092e\u0941\u0926\u093e\u092f",
    published:
      "\u092a\u094d\u0930\u0915\u093e\u0936\u093f\u0924",
    date:
      "\u0926\u093f\u0928\u093e\u0902\u0915",
    readMore:
      "\u0914\u0930 \u092a\u0922\u093c\u0947\u0902",
  },

  gu: {
    title:
      "\u0ab8\u0aae\u0abe\u0a9a\u0abe\u0ab0",
    subtitle:
      "\u0a85\u0ab9\u0abf\u0a9a\u0acd\u0a9b\u0aa4\u0acd\u0ab0 \u0ab8\u0a82\u0ab8\u0acd\u0a95\u0abe\u0ab0 \u0a95\u0ac7\u0aa8\u0acd\u0aa6\u0acd\u0ab0\u0aa8\u0abe \u0aa4\u0abe\u0a9c\u0abe \u0ab8\u0aae\u0abe\u0a9a\u0abe\u0ab0, \u0a9c\u0abe\u0ab9\u0ac7\u0ab0\u0abe\u0aa4\u0acb \u0a85\u0aa8\u0ac7 \u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0abf\u0a95 \u0a85\u0aaa\u0aa1\u0ac7\u0a9f\u0acd\u0ab8 \u0ab8\u0abe\u0aa5\u0ac7 \u0a9c\u0acb\u0aa1\u0abe\u0aaf\u0ac7\u0ab2\u0abe \u0ab0\u0ab9\u0acb.",
    latestNews:
      "\u0aa4\u0abe\u0a9c\u0abe \u0ab8\u0aae\u0abe\u0a9a\u0abe\u0ab0",
    noNews:
      "\u0a85\u0aa4\u0acd\u0aaf\u0abe\u0ab0\u0ac7 \u0a95\u0acb\u0a88 \u0ab8\u0aae\u0abe\u0a9a\u0abe\u0ab0 \u0a89\u0aaa\u0ab2\u0aac\u0acd\u0aa7 \u0aa8\u0aa5\u0ac0.",
    communityNews:
      "\u0ab8\u0abe\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0abf\u0a95 \u0ab8\u0aae\u0abe\u0a9a\u0abe\u0ab0",
    communityName:
      "ASK \u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf",
    published:
      "\u0aaa\u0acd\u0ab0\u0a95\u0abe\u0ab6\u0abf\u0aa4",
    date:
      "\u0aa4\u0abe\u0ab0\u0ac0\u0a96",
    readMore:
      "\u0ab5\u0aa7\u0ac1 \u0ab5\u0abe\u0a82\u0a9a\u0acb",
  },
} as const;

function normalizeLocale(value: string): Locale {
  if (value === "hi" || value === "gu") {
    return value;
  }

  return "en";
}

function formatNewsDate(
  date: Date,
  locale: Locale
) {
  const localeMap = {
    en: "en-IN",
    hi: "hi-IN",
    gu: "gu-IN",
  } as const;

  return new Intl.DateTimeFormat(
    localeMap[locale],
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  ).format(date);
}

function getTranslation(
  translationsList: Array<{
    locale: string;
    title: string;
    excerpt: string | null;
    content: string | null;
  }>,
  locale: Locale
) {
  return (
    translationsList.find(
      (translation) =>
        translation.locale === locale
    ) ||
    translationsList.find(
      (translation) =>
        translation.locale === "en"
    ) ||
    translationsList[0] ||
    null
  );
}

export default async function MemberNewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;

  const locale =
    normalizeLocale(localeParam);

  const t = translations[locale];

  const session = await auth();

  if (!session?.user) {
    redirect(`/${locale}/login`);
  }

  const role = String(
    (session.user as { role?: string }).role || ""
  );

  if (role !== "MEMBER") {
    redirect(`/${locale}/unauthorized`);
  }

  const news =
    await prisma.news.findMany({
      where: {
        status: "PUBLISHED",
      },
      orderBy: [
        {
          publishedAt: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
      include: {
        translations: {
          select: {
            locale: true,
            title: true,
            excerpt: true,
            content: true,
          },
        },
      },
    });

  return (
    <div
      className="
        min-h-[calc(100vh-4rem)]
        rounded-2xl
        bg-gradient-to-br
        from-[#FFF8DF]
        via-[#FFF1C7]
        to-[#FFE5A8]
        p-4
        md:p-6
        transition-all
        duration-300
        dark:from-[#4b0b15]
        dark:via-[#390812]
        dark:to-[#26050c]
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-8">
          <h1
            className="
              text-3xl
              font-bold
              text-gray-900
              dark:text-white
            "
          >
            {t.title}
          </h1>

          <p
            className="
              mt-1
              max-w-3xl
              text-red-900/80
              dark:text-red-100/75
            "
          >
            {t.subtitle}
          </p>
        </div>

        {/* Section Header */}
        <div className="mb-5 flex items-center gap-4">
          <h2
            className="
              text-2xl
              font-bold
              text-gray-900
              dark:text-white
            "
          >
            {t.latestNews}
          </h2>

          <div
            className="
              hidden
              h-px
              flex-1
              bg-red-300/70
              dark:bg-red-300/25
              md:block
            "
          />
        </div>

        {/* Empty State */}
        {news.length === 0 ? (
          <div
            className="
              rounded-2xl
              border
              border-red-300/80
              bg-gradient-to-br
              from-[#FFF8DF]
              via-[#FFF1C7]
              to-[#FFE5A8]
              p-10
              text-center
              text-red-900/70
              shadow-sm
              dark:border-red-400/40
              dark:from-[#68131f]
              dark:via-[#570e18]
              dark:to-[#410810]
              dark:text-red-100/70
            "
          >
            {t.noNews}
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-1
              gap-6
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {news.map((article) => {
              const translation =
                getTranslation(
                  article.translations,
                  locale
                );

              if (!translation) {
                return null;
              }

              const publicationDate =
                article.publishedAt ||
                article.createdAt;

              return (
                <article
                  key={article.id}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-red-300/80
                    bg-gradient-to-br
                    from-[#FFFDF2]
                    via-[#FFF6D8]
                    to-[#FFEEC0]
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:border-red-500
                    hover:from-[#FFE5A8]
                    hover:via-[#FFD982]
                    hover:to-[#E8B42A]
                    hover:shadow-[0_20px_40px_rgba(190,24,93,0.25)]
                    dark:border-red-400/35
                    dark:from-[#751a28]
                    dark:via-[#64131f]
                    dark:to-[#51101a]
                    dark:hover:border-red-300/80
                    dark:hover:from-[#8e2b3b]
                    dark:hover:via-[#781b2a]
                    dark:hover:to-[#601421]
                    dark:hover:shadow-[0_20px_40px_rgba(248,113,113,0.22)]
                  "
                >

                  {/* Image */}
                  <div
                    className="
                      relative
                      h-56
                      overflow-hidden
                    "
                  >
                    {article.image ? (
                      <img
                        src={article.image}
                        alt={translation.title}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-500
                          group-hover:scale-105
                        "
                      />
                    ) : (
                      <div
                        className="
                          flex
                          h-full
                          w-full
                          flex-col
                          items-center
                          justify-center
                          bg-gradient-to-br
                          from-[#d90416]
                          via-[#c90015]
                          to-[#a90012]
                          text-white
                          transition-all
                          duration-500
                          group-hover:from-[#ef233c]
                          group-hover:via-[#d90429]
                          group-hover:to-[#b00016]
                          dark:from-[#861c2b]
                          dark:via-[#6e1422]
                          dark:to-[#510d17]
                          dark:group-hover:from-[#a52d3f]
                          dark:group-hover:via-[#8c2032]
                          dark:group-hover:to-[#691522]
                        "
                      >
                        <span
                          className="
                            text-5xl
                            transition-transform
                            duration-300
                            group-hover:scale-125
                          "
                        >
                          {"\u{1F4F0}"}
                        </span>

                        <span
                          className="
                            mt-3
                            text-lg
                            font-bold
                          "
                        >
                          {t.communityName}
                        </span>

                        <span
                          className="
                            mt-1
                            text-sm
                            text-white/85
                          "
                        >
                          {t.communityNews}
                        </span>
                      </div>
                    )}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/30
                        via-transparent
                        to-white/10
                        opacity-0
                        transition-opacity
                        duration-300
                        group-hover:opacity-100
                      "
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">

                    {/* Date */}
                    <div className="mb-3">
                      <p
                        className="
                          text-xs
                          font-medium
                          tracking-wide
                          text-red-800/70
                          dark:text-red-200/70
                        "
                      >
                        {t.date}
                      </p>

                      <p
                        className="
                          mt-1
                          text-sm
                          font-semibold
                          text-gray-900
                          dark:text-white
                        "
                      >
                        {formatNewsDate(
                          publicationDate,
                          locale
                        )}
                      </p>
                    </div>

                    {/* Title */}
                    <h3
                      className="
                        text-xl
                        font-bold
                        text-gray-900
                        transition-colors
                        duration-300
                        group-hover:text-red-900
                        dark:text-white
                        dark:group-hover:text-red-50
                      "
                    >
                      {translation.title}
                    </h3>

                    {/* Excerpt */}
                    {translation.excerpt ? (
                      <p
                        className="
                          mt-2
                          line-clamp-3
                          text-sm
                          leading-6
                          text-red-900/70
                          dark:text-red-100/70
                        "
                      >
                        {translation.excerpt}
                      </p>
                    ) : translation.content ? (
                      <p
                        className="
                          mt-2
                          line-clamp-3
                          text-sm
                          leading-6
                          text-red-900/70
                          dark:text-red-100/70
                        "
                      >
                        {translation.content}
                      </p>
                    ) : null}

                    {/* Read More */}
                    <div className="mt-5">
                      <span
                        className="
                          inline-flex
                          items-center
                          gap-2
                          text-sm
                          font-semibold
                          text-red-700
                          transition-all
                          duration-300
                          group-hover:translate-x-1
                          group-hover:text-red-900
                          dark:text-red-200
                          dark:group-hover:text-white
                        "
                      >
                        {t.readMore}
                        <span
                          className="
                            transition-transform
                            duration-300
                            group-hover:translate-x-1
                          "
                        >
                          {"\u2192"}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      border-t
                      border-red-200/70
                      bg-gradient-to-r
                      from-[#FFF9E4]
                      to-[#FFEFC7]
                      px-5
                      py-4
                      transition-all
                      duration-300
                      group-hover:from-[#FFE5A3]
                      group-hover:to-[#FFD982]
                      dark:border-red-300/20
                      dark:from-[#64131f]
                      dark:to-[#52101a]
                      dark:group-hover:from-[#7d1d2e]
                      dark:group-hover:to-[#681624]
                    "
                  >
                    <span
                      className="
                        text-xs
                        text-red-800/70
                        dark:text-red-100/70
                      "
                    >
                      {t.communityName}
                    </span>

                    <span
                      className="
                        text-xs
                        font-semibold
                        text-green-600
                        dark:text-green-300
                      "
                    >
                      {t.published}
                    </span>
                  </div>

                </article>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}