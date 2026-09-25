import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

type Locale = "en" | "hi" | "gu";

const translations = {
  en: {
    title: "Activities",
    subtitle:
      "Explore community activities and initiatives organized by Ahhichatra Sanskar Kendra.",
    publishedActivities: "Published Activities",
    community: "Community",
    communityName: "ASK Community",
    participation: "Participation",
    joinParticipate: "Join & Participate",
    communityActivity: "Community Activity",
    date: "DATE",
    location: "LOCATION",
    published: "Published",
    noActivities: "No activities available at the moment.",
    categories: {
      religious: "Religious",
      social: "Social",
      cultural: "Cultural",
      educational: "Educational",
      sports: "Sports",
      charity: "Charity",
      community: "Community",
      other: "Other",
    },
  },

  hi: {
    title: "\u0917\u0924\u093f\u0935\u093f\u0927\u093f\u092f\u093e\u0901",
    subtitle:
      "\u0905\u0939\u093f\u091a\u094d\u091b\u0924\u094d\u0930 \u0938\u0902\u0938\u094d\u0915\u093e\u0930 \u0915\u0947\u0928\u094d\u0926\u094d\u0930 \u0926\u094d\u0935\u093e\u0930\u093e \u0906\u092f\u094b\u091c\u093f\u0924 \u0938\u093e\u092e\u0941\u0926\u093e\u092f\u093f\u0915 \u0917\u0924\u093f\u0935\u093f\u0927\u093f\u092f\u094b\u0902 \u0914\u0930 \u092a\u0939\u0932\u094b\u0902 \u0915\u093e \u0905\u0928\u0941\u0938\u0902\u0927\u093e\u0928 \u0915\u0930\u0947\u0902\u0964",
    publishedActivities: "\u092a\u094d\u0930\u0915\u093e\u0936\u093f\u0924 \u0917\u0924\u093f\u0935\u093f\u0927\u093f\u092f\u093e\u0901",
    community: "\u0938\u092e\u0941\u0926\u093e\u092f",
    communityName: "ASK \u0938\u092e\u0941\u0926\u093e\u092f",
    participation: "\u092d\u093e\u0917\u0940\u0926\u093e\u0930\u0940",
    joinParticipate: "\u091c\u0941\u0921\u093c\u0947\u0902 \u0914\u0930 \u092d\u093e\u0917 \u0932\u0947\u0902",
    communityActivity: "\u0938\u093e\u092e\u0941\u0926\u093e\u092f\u093f\u0915 \u0917\u0924\u093f\u0935\u093f\u0927\u093f",
    date: "\u0926\u093f\u0928\u093e\u0902\u0915",
    location: "\u0938\u094d\u0925\u093e\u0928",
    published: "\u092a\u094d\u0930\u0915\u093e\u0936\u093f\u0924",
    noActivities:
      "\u0907\u0938 \u0938\u092e\u092f \u0915\u094b\u0908 \u0917\u0924\u093f\u0935\u093f\u0927\u093f \u0909\u092a\u0932\u092c\u094d\u0927 \u0928\u0939\u0940\u0902 \u0939\u0948\u0964",
    categories: {
      religious: "\u0927\u093e\u0930\u094d\u092e\u093f\u0915",
      social: "\u0938\u093e\u092e\u093e\u091c\u093f\u0915",
      cultural: "\u0938\u093e\u0902\u0938\u094d\u0915\u0943\u0924\u093f\u0915",
      educational: "\u0936\u0948\u0915\u094d\u0937\u0923\u093f\u0915",
      sports: "\u0916\u0947\u0932",
      charity: "\u0926\u093e\u0928",
      community: "\u0938\u092e\u0941\u0926\u093e\u092f",
      other: "\u0905\u0928\u094d\u092f",
    },
  },

  gu: {
    title: "\u0aaa\u0acd\u0ab0\u0ab5\u0ac3\u0aa4\u0acd\u0aa4\u0abf\u0a93",
    subtitle:
      "\u0a85\u0ab9\u0abf\u0a9a\u0acd\u0a9b\u0aa4\u0acd\u0ab0 \u0ab8\u0a82\u0ab8\u0acd\u0a95\u0abe\u0ab0 \u0a95\u0ac7\u0aa8\u0acd\u0aa6\u0acd\u0ab0 \u0aa6\u0acd\u0ab5\u0abe\u0ab0\u0abe \u0a86\u0aaf\u0acb\u0a9c\u0abf\u0aa4 \u0ab8\u0abe\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0abf\u0a95 \u0aaa\u0acd\u0ab0\u0ab5\u0ac3\u0aa4\u0acd\u0aa4\u0abf\u0a93 \u0a85\u0aa8\u0ac7 \u0aaa\u0ab9\u0ac7\u0ab2\u0acb\u0aa8\u0ac0 \u0ab6\u0acb\u0aa7 \u0ab2\u0acb.",
    publishedActivities:
      "\u0aaa\u0acd\u0ab0\u0a95\u0abe\u0ab6\u0abf\u0aa4 \u0aaa\u0acd\u0ab0\u0ab5\u0ac3\u0aa4\u0acd\u0aa4\u0abf\u0a93",
    community: "\u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf",
    communityName: "ASK \u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf",
    participation: "\u0aad\u0abe\u0a97\u0ac0\u0aa6\u0abe\u0ab0\u0ac0",
    joinParticipate:
      "\u0a9c\u0acb\u0aa1\u0abe\u0a93 \u0a85\u0aa8\u0ac7 \u0aad\u0abe\u0a97 \u0ab2\u0acb",
    communityActivity:
      "\u0ab8\u0abe\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0abf\u0a95 \u0aaa\u0acd\u0ab0\u0ab5\u0ac3\u0aa4\u0acd\u0aa4\u0abf",
    date: "\u0aa4\u0abe\u0ab0\u0ac0\u0a96",
    location: "\u0ab8\u0acd\u0aa5\u0ab3",
    published: "\u0aaa\u0acd\u0ab0\u0a95\u0abe\u0ab6\u0abf\u0aa4",
    noActivities:
      "\u0a85\u0aa4\u0acd\u0aaf\u0abe\u0ab0\u0ac7 \u0a95\u0acb\u0a88 \u0aaa\u0acd\u0ab0\u0ab5\u0ac3\u0aa4\u0acd\u0aa4\u0abf \u0a89\u0aaa\u0ab2\u0aac\u0acd\u0aa7 \u0aa8\u0aa5\u0ac0.",
    categories: {
      religious: "\u0aa7\u0abe\u0ab0\u0acd\u0aae\u0abf\u0a95",
      social: "\u0ab8\u0abe\u0aae\u0abe\u0a9c\u0abf\u0a95",
      cultural: "\u0ab8\u0abe\u0a82\u0ab8\u0acd\u0a95\u0ac3\u0aa4\u0abf\u0a95",
      educational: "\u0ab6\u0ac8\u0a95\u0acd\u0ab7\u0aa3\u0abf\u0a95",
      sports: "\u0ab0\u0aae\u0aa4",
      charity: "\u0aa6\u0abe\u0aa8",
      community: "\u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf",
      other: "\u0a85\u0aa8\u0acd\u0aaf",
    },
  },
} as const;

function normalizeLocale(value: string): Locale {
  if (value === "hi" || value === "gu") {
    return value;
  }

  return "en";
}

function translateCategory(category: string | null, locale: Locale) {
  if (!category) {
    return "";
  }

  const key = category.toLowerCase().trim();

  const map: Record<string, keyof typeof translations.en.categories> = {
    religious: "religious",
    religion: "religious",
    social: "social",
    cultural: "cultural",
    educational: "educational",
    education: "educational",
    sports: "sports",
    sport: "sports",
    charity: "charity",
    community: "community",
    other: "other",
  };

  const categoryKey = map[key];

  if (!categoryKey) {
    return category;
  }

  return translations[locale].categories[categoryKey];
}

function formatActivityDate(date: Date | null, locale: Locale) {
  if (!date) {
    return "";
  }

  const localeMap = {
    en: "en-IN",
    hi: "hi-IN",
    gu: "gu-IN",
  } as const;

  return new Intl.DateTimeFormat(localeMap[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function MemberActivitiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = normalizeLocale(localeParam);
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

  const activities = await prisma.activity.findMany({
    where: {
      status: "PUBLISHED",
    },
    orderBy: [
      {
        activityDate: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
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
        <div className="mb-6">
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
              text-red-900/80
              dark:text-red-100/75
            "
          >
            {t.subtitle}
          </p>
        </div>

        {/* Summary Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">

          {/* Published */}
          <div
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-red-300/80
              bg-gradient-to-br
              from-[#FFF7D8]
              via-[#FFEEC0]
              to-[#FFE2A0]
              p-5
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1.5
              hover:border-red-500
              hover:from-[#FFE8B5]
              hover:via-[#FFDA82]
              hover:to-[#E9B52D]
              hover:shadow-[0_16px_35px_rgba(190,24,93,0.22)]
              dark:border-red-400/40
              dark:from-[#711521]
              dark:via-[#5e101a]
              dark:to-[#480a13]
              dark:hover:border-red-300/80
              dark:hover:from-[#8a2636]
              dark:hover:via-[#741a28]
              dark:hover:to-[#5e131f]
              dark:hover:shadow-[0_16px_35px_rgba(248,113,113,0.20)]
            "
          >
            <p className="text-sm text-red-900/70 dark:text-red-100/70">
              {t.publishedActivities}
            </p>

            <p
              className="
                mt-2
                text-3xl
                font-bold
                text-gray-900
                transition-all
                duration-300
                group-hover:scale-105
                dark:text-white
              "
            >
              {activities.length}
            </p>
          </div>

          {/* Community */}
          <div
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-red-300/80
              bg-gradient-to-br
              from-[#FFF7D8]
              via-[#FFEEC0]
              to-[#FFE2A0]
              p-5
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1.5
              hover:border-red-500
              hover:from-[#FFE8B5]
              hover:via-[#FFDA82]
              hover:to-[#E9B52D]
              hover:shadow-[0_16px_35px_rgba(190,24,93,0.22)]
              dark:border-red-400/40
              dark:from-[#711521]
              dark:via-[#5e101a]
              dark:to-[#480a13]
              dark:hover:border-red-300/80
              dark:hover:from-[#8a2636]
              dark:hover:via-[#741a28]
              dark:hover:to-[#5e131f]
            "
          >
            <p className="text-sm text-red-900/70 dark:text-red-100/70">
              {t.community}
            </p>

            <p
              className="
                mt-2
                text-xl
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              {t.communityName}
            </p>
          </div>

          {/* Participation */}
          <div
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-red-300/80
              bg-gradient-to-br
              from-[#FFF7D8]
              via-[#FFEEC0]
              to-[#FFE2A0]
              p-5
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1.5
              hover:border-red-500
              hover:from-[#FFE8B5]
              hover:via-[#FFDA82]
              hover:to-[#E9B52D]
              hover:shadow-[0_16px_35px_rgba(190,24,93,0.22)]
              dark:border-red-400/40
              dark:from-[#711521]
              dark:via-[#5e101a]
              dark:to-[#480a13]
              dark:hover:border-red-300/80
              dark:hover:from-[#8a2636]
              dark:hover:via-[#741a28]
              dark:hover:to-[#5e131f]
            "
          >
            <p className="text-sm text-red-900/70 dark:text-red-100/70">
              {t.participation}
            </p>

            <p
              className="
                mt-2
                text-xl
                font-bold
                text-red-700
                transition-colors
                duration-300
                group-hover:text-red-900
                dark:text-red-200
                dark:group-hover:text-white
              "
            >
              {t.joinParticipate}
            </p>
          </div>

        </div>

        {/* Activities */}
        {activities.length === 0 ? (
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
            {t.noActivities}
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
            {activities.map((activity) => (
              <article
                key={activity.id}
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

                {/* Image / Fallback */}
                <div className="relative h-64 overflow-hidden">

                  {activity.image ? (
                    <img
                      src={activity.image}
                      alt={activity.title}
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
                          text-4xl
                          transition-transform
                          duration-300
                          group-hover:scale-125
                        "
                      >
                        {"\u2605"}
                      </span>

                      <span className="mt-3 text-lg font-bold">
                        {t.communityName}
                      </span>

                      <span className="mt-1 text-sm text-white/85">
                        {t.communityActivity}
                      </span>
                    </div>
                  )}

                  {/* Image Overlay */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/25
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

                  {/* Category */}
                  <span
                    className="
                      inline-flex
                      rounded-full
                      border
                      border-red-200
                      bg-gradient-to-r
                      from-[#FFF9E8]
                      to-[#ffd3da]
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      text-red-700
                      transition-all
                      duration-300
                      group-hover:border-red-400
                      group-hover:from-[#FFE09A]
                      group-hover:to-[#FFD36A]
                      group-hover:text-red-900
                      dark:border-red-300/25
                      dark:from-[#7c1b2b]
                      dark:to-[#64121e]
                      dark:text-red-100
                      dark:group-hover:from-[#9b3042]
                      dark:group-hover:to-[#7e1d2e]
                    "
                  >
                    {translateCategory(activity.category, locale)}
                  </span>

                  {/* Title */}
                  <h2
                    className="
                      mt-4
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
                    {activity.title}
                  </h2>

                  {/* Description */}
                  <p
                    className="
                      mt-2
                      line-clamp-2
                      text-sm
                      text-red-900/70
                      dark:text-red-100/70
                    "
                  >
                    {activity.description}
                  </p>

                  {/* Date */}
                  <div className="mt-5">
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
                        font-semibold
                        text-gray-900
                        dark:text-white
                      "
                    >
                      {formatActivityDate(activity.activityDate, locale)}
                    </p>
                  </div>

                  {/* Location */}
                  {activity.location && (
                    <div className="mt-4">
                      <p
                        className="
                          text-xs
                          font-medium
                          tracking-wide
                          text-red-800/70
                          dark:text-red-200/70
                        "
                      >
                        {t.location}
                      </p>

                      <p
                        className="
                          mt-1
                          font-semibold
                          text-gray-900
                          dark:text-white
                        "
                      >
                        {activity.location}
                      </p>
                    </div>
                  )}

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
                    Ahhichatra Sanskar Kendra
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
            ))}
          </div>
        )}

      </div>
    </div>
  );
}