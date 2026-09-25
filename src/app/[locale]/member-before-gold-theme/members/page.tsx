import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

type Locale = "en" | "hi" | "gu";

type SearchParams = Promise<{
  q?: string;
  city?: string;
  state?: string;
  page?: string;
}>;

const translations = {
  en: {
    title: "Members Directory",
    subtitle: "Connect with approved members of the ASK community.",
    searchMembers: "Search Members",
    searchPlaceholder: "Name, occupation or profession",
    city: "City",
    allCities: "All Cities",
    state: "State",
    allStates: "All States",
    searchButton: "Search Members",
    clearFilters: "Clear Filters",
    communityMembers: "Community Members",
    approvedMember: "Approved Member",
    memberFound: "approved member found",
    membersFound: "approved members found",
    page: "Page",
    of: "of",
    noMembers: "No Members Found",
    tryChanging: "Try changing your search or filter criteria.",
    profession: "Profession",
    education: "Education",
    location: "Location",
    askCommunity: "ASK Community",
    viewProfile: "View Profile",
    previous: "Previous",
    next: "Next",
    communityMember: "Community Member",
  },

  hi: {
    title: "\u0938\u0926\u0938\u094d\u092f \u0928\u093f\u0930\u094d\u0926\u0947\u0936\u093f\u0915\u093e",
    subtitle:
      "\u090f\u0938\u0915\u0947 \u0938\u092e\u0941\u0926\u093e\u092f \u0915\u0947 \u0938\u094d\u0935\u0940\u0915\u0943\u0924 \u0938\u0926\u0938\u094d\u092f\u094b\u0902 \u0938\u0947 \u091c\u0941\u0921\u093c\u0947\u0902\u0964",
    searchMembers:
      "\u0938\u0926\u0938\u094d\u092f\u094b\u0902 \u0915\u094b \u0916\u094b\u091c\u0947\u0902",
    searchPlaceholder:
      "\u0928\u093e\u092e, \u0935\u094d\u092f\u0935\u0938\u093e\u092f \u092f\u093e \u092a\u0947\u0936\u093e",
    city: "\u0936\u0939\u0930",
    allCities: "\u0938\u092d\u0940 \u0936\u0939\u0930",
    state: "\u0930\u093e\u091c\u094d\u092f",
    allStates: "\u0938\u092d\u0940 \u0930\u093e\u091c\u094d\u092f",
    searchButton:
      "\u0938\u0926\u0938\u094d\u092f\u094b\u0902 \u0915\u094b \u0916\u094b\u091c\u0947\u0902",
    clearFilters:
      "\u092b\u093f\u0932\u094d\u091f\u0930 \u0939\u091f\u093e\u090f\u0901",
    communityMembers:
      "\u0938\u092e\u0941\u0926\u093e\u092f \u0915\u0947 \u0938\u0926\u0938\u094d\u092f",
    approvedMember:
      "\u0938\u094d\u0935\u0940\u0915\u0943\u0924 \u0938\u0926\u0938\u094d\u092f",
    memberFound:
      "\u0938\u094d\u0935\u0940\u0915\u0943\u0924 \u0938\u0926\u0938\u094d\u092f \u092e\u093f\u0932\u093e",
    membersFound:
      "\u0938\u094d\u0935\u0940\u0915\u0943\u0924 \u0938\u0926\u0938\u094d\u092f \u092e\u093f\u0932\u0947",
    page: "\u092a\u0943\u0937\u094d\u0920",
    of: "\u092e\u0947\u0902 \u0938\u0947",
    noMembers:
      "\u0915\u094b\u0908 \u0938\u0926\u0938\u094d\u092f \u0928\u0939\u0940\u0902 \u092e\u093f\u0932\u093e",
    tryChanging:
      "\u0905\u092a\u0928\u0940 \u0916\u094b\u091c \u092f\u093e \u092b\u093f\u0932\u094d\u091f\u0930 \u092e\u093e\u0928\u0926\u0902\u0921 \u092c\u0926\u0932\u0928\u0947 \u0915\u093e \u092a\u094d\u0930\u092f\u093e\u0938 \u0915\u0930\u0947\u0902\u0964",
    profession: "\u092a\u0947\u0936\u093e",
    education: "\u0936\u093f\u0915\u094d\u0937\u093e",
    location: "\u0938\u094d\u0925\u093e\u0928",
    askCommunity: "ASK \u0938\u092e\u0941\u0926\u093e\u092f",
    viewProfile:
      "\u092a\u094d\u0930\u094b\u092b\u093c\u093e\u0907\u0932 \u0926\u0947\u0916\u0947\u0902",
    previous: "\u092a\u093f\u091b\u0932\u093e",
    next: "\u0905\u0917\u0932\u093e",
    communityMember:
      "\u0938\u092e\u0941\u0926\u093e\u092f \u0938\u0926\u0938\u094d\u092f",
  },

  gu: {
    title:
      "\u0ab8\u0aad\u0acd\u0aaf \u0aa8\u0abf\u0ab0\u0acd\u0aa6\u0ac7\u0ab6\u0abf\u0a95\u0abe",
    subtitle:
      "\u0a8f\u0ab8\u0a95\u0ac7 \u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0aa8\u0abe \u0aae\u0a82\u0a9c\u0ac2\u0ab0 \u0ab8\u0aad\u0acd\u0aaf\u0acb \u0ab8\u0abe\u0aa5\u0ac7 \u0a9c\u0acb\u0aa1\u0abe\u0a93.",
    searchMembers:
      "\u0ab8\u0aad\u0acd\u0aaf\u0acb\u0aa8\u0ac7 \u0ab6\u0acb\u0aa7\u0acb",
    searchPlaceholder:
      "\u0aa8\u0abe\u0aae, \u0ab5\u0acd\u0aaf\u0ab5\u0ab8\u0abe\u0aaf \u0a85\u0aa5\u0ab5\u0abe \u0aaa\u0ac7\u0ab6\u0acb",
    city: "\u0ab6\u0ab9\u0ac7\u0ab0",
    allCities:
      "\u0aa4\u0aae\u0abe\u0aae \u0ab6\u0ab9\u0ac7\u0ab0\u0acb",
    state: "\u0ab0\u0abe\u0a9c\u0acd\u0aaf",
    allStates:
      "\u0aa4\u0aae\u0abe\u0aae \u0ab0\u0abe\u0a9c\u0acd\u0aaf\u0acb",
    searchButton:
      "\u0ab8\u0aad\u0acd\u0aaf\u0acb\u0aa8\u0ac7 \u0ab6\u0acb\u0aa7\u0acb",
    clearFilters:
      "\u0aab\u0abf\u0ab2\u0acd\u0a9f\u0ab0 \u0aa6\u0ac2\u0ab0 \u0a95\u0ab0\u0acb",
    communityMembers:
      "\u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0aa8\u0abe \u0ab8\u0aad\u0acd\u0aaf\u0acb",
    approvedMember:
      "\u0aae\u0a82\u0a9c\u0ac2\u0ab0 \u0ab8\u0aad\u0acd\u0aaf",
    memberFound:
      "\u0aae\u0a82\u0a9c\u0ac2\u0ab0 \u0ab8\u0aad\u0acd\u0aaf \u0aae\u0ab3\u0acd\u0caf\u0acb",
    membersFound:
      "\u0aae\u0a82\u0a9c\u0ac2\u0ab0 \u0ab8\u0aad\u0acd\u0aaf\u0acb \u0aae\u0ab3\u0acd\u0aaf\u0abe",
    page: "\u0aaa\u0ac3\u0ab7\u0acd\u0aa0",
    of: "\u0aae\u0abe\u0a82\u0aa5\u0ac0",
    noMembers:
      "\u0a95\u0acb\u0a88 \u0ab8\u0aad\u0acd\u0aaf \u0aae\u0ab3\u0acd\u0aaf\u0acb \u0aa8\u0aa5\u0ac0",
    tryChanging:
      "\u0aa4\u0aae\u0abe\u0ab0\u0ac0 \u0ab6\u0acb\u0aa7 \u0a85\u0aa5\u0ab5\u0abe \u0aab\u0abf\u0ab2\u0acd\u0a9f\u0ab0 \u0aae\u0abe\u0aa8\u0aa6\u0a82\u0aa1 \u0aac\u0aa6\u0ab2\u0ab5\u0abe\u0aa8\u0acb \u0aaa\u0acd\u0ab0\u0aaf\u0abe\u0ab8 \u0a95\u0ab0\u0acb.",
    profession:
      "\u0aaa\u0ac7\u0ab6\u0acb",
    education:
      "\u0ab6\u0abf\u0a95\u0acd\u0ab7\u0aa3",
    location:
      "\u0ab8\u0acd\u0aa5\u0ab3",
    askCommunity:
      "ASK \u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf",
    viewProfile:
      "\u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0a9c\u0acb\u0ab5\u0acb",
    previous:
      "\u0aaa\u0abe\u0a9b\u0ab3\u0aa8\u0ac1\u0a82",
    next:
      "\u0a86\u0a97\u0ab3\u0aa8\u0ac1\u0a82",
    communityMember:
      "\u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0aa8\u0acb \u0ab8\u0aad\u0acd\u0aaf",
  },
} as const;

function normalizeLocale(value: string): Locale {
  if (value === "hi" || value === "gu") {
    return value;
  }

  return "en";
}

export default async function MembersDirectoryPage({
  params: routeParams,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: SearchParams;
}) {
  const { locale: localeParam } = await routeParams;
  const locale = normalizeLocale(localeParam);
  const t = translations[locale];

  const session = await auth();

  if (!session?.user?.email) {
    redirect(`/${locale}/login`);
  }

  const loggedInUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!loggedInUser || loggedInUser.role !== "MEMBER") {
    redirect(`/${locale}/unauthorized`);
  }

  const params = await searchParams;

  const q = params.q?.trim() || "";
  const city = params.city?.trim() || "";
  const state = params.state?.trim() || "";

  const parsedPage = Number(params.page || "1");

  const currentPage =
    Number.isInteger(parsedPage) && parsedPage > 0
      ? parsedPage
      : 1;

  const pageSize = 12;

  const profileFilters = [
    ...(q
      ? [
          {
            OR: [
              {
                firstName: {
                  contains: q,
                  mode: "insensitive" as const,
                },
              },
              {
                lastName: {
                  contains: q,
                  mode: "insensitive" as const,
                },
              },
              {
                occupation: {
                  contains: q,
                  mode: "insensitive" as const,
                },
              },
              {
                profession: {
                  contains: q,
                  mode: "insensitive" as const,
                },
              },
            ],
          },
        ]
      : []),

    ...(city
      ? [
          {
            city: {
              contains: city,
              mode: "insensitive" as const,
            },
          },
        ]
      : []),

    ...(state
      ? [
          {
            state: {
              contains: state,
              mode: "insensitive" as const,
            },
          },
        ]
      : []),
  ];

  const where = {
    role: "MEMBER" as const,
    status: "APPROVED" as const,

    ...(profileFilters.length > 0
      ? {
          memberProfile: {
            AND: profileFilters,
          },
        }
      : {}),
  };

  const totalMembers = await prisma.user.count({
    where,
  });

  const totalPages = Math.max(
    Math.ceil(totalMembers / pageSize),
    1
  );

  const safePage = Math.min(currentPage, totalPages);

  const members = await prisma.user.findMany({
    where,
    include: {
      memberProfile: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: (safePage - 1) * pageSize,
    take: pageSize,
  });

  const cities = await prisma.memberProfile.findMany({
    where: {
      users: {
        some: {
          role: "MEMBER",
          status: "APPROVED",
        },
      },
      city: {
        not: null,
      },
    },
    select: {
      city: true,
    },
    distinct: ["city"],
    orderBy: {
      city: "asc",
    },
  });

  const states = await prisma.memberProfile.findMany({
    where: {
      users: {
        some: {
          role: "MEMBER",
          status: "APPROVED",
        },
      },
      state: {
        not: null,
      },
    },
    select: {
      state: true,
    },
    distinct: ["state"],
    orderBy: {
      state: "asc",
    },
  });

  function getMemberName(
    member: (typeof members)[number]
  ) {
    const firstName =
      member.memberProfile?.firstName || "";

    const lastName =
      member.memberProfile?.lastName || "";

    return (
      `${firstName} ${lastName}`.trim() ||
      t.communityMember
    );
  }

  function getMemberId(
    member: (typeof members)[number]
  ) {
    return `ASK-${member.createdAt.getFullYear()}-${String(
      member.memberNumber
    ).padStart(6, "0")}`;
  }

  function buildUrl(page: number) {
    const query = new URLSearchParams();

    if (q) {
      query.set("q", q);
    }

    if (city) {
      query.set("city", city);
    }

    if (state) {
      query.set("state", state);
    }

    query.set("page", String(page));

    return `/${locale}/member/members?${query.toString()}`;
  }

  const memberCountText =
    totalMembers === 1
      ? `${totalMembers} ${t.memberFound}`
      : `${totalMembers} ${t.membersFound}`;

  return (
    <div className="mx-auto max-w-7xl">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t.title}
        </h1>

        <p className="mt-1 text-red-900/80 dark:text-red-100/75">
          {t.subtitle}
        </p>
      </div>

      {/* SEARCH / FILTER */}
      <div
        className="
          mb-6 rounded-2xl border border-red-300/80
          bg-gradient-to-br from-[#ffdfe5] via-[#ffd2da] to-[#ffc4ce]
          p-6 shadow-sm transition-all duration-300
          hover:border-red-400
          hover:shadow-[0_18px_40px_rgba(190,24,93,0.12)]
          dark:border-red-400/40
          dark:from-[#68131f] dark:via-[#570e18] dark:to-[#410810]
          dark:hover:border-red-300/60
        "
      >
        <form
          method="GET"
          action={`/${locale}/member/members`}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-red-900/80 dark:text-red-100/80">
                {t.searchMembers}
              </label>

              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder={t.searchPlaceholder}
                className="
                  w-full rounded-xl border border-red-300/80
                  bg-[#fff0f2] px-4 py-3 text-gray-900
                  outline-none transition-all
                  placeholder:text-red-900/40
                  focus:border-red-600 focus:ring-2 focus:ring-red-200
                  dark:border-red-300/30 dark:bg-[#4f0d16]
                  dark:text-white dark:placeholder:text-red-100/40
                  dark:focus:border-red-300 dark:focus:ring-red-400/20
                "
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-red-900/80 dark:text-red-100/80">
                {t.city}
              </label>

              <select
                name="city"
                defaultValue={city}
                className="
                  w-full rounded-xl border border-red-300/80
                  bg-[#fff0f2] px-4 py-3 text-gray-900
                  outline-none transition-all
                  focus:border-red-600 focus:ring-2 focus:ring-red-200
                  dark:border-red-300/30 dark:bg-[#4f0d16]
                  dark:text-white dark:focus:border-red-300
                  dark:focus:ring-red-400/20
                "
              >
                <option value="">
                  {t.allCities}
                </option>

                {cities
                  .map((item) => item.city)
                  .filter(
                    (item): item is string =>
                      Boolean(item)
                  )
                  .map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-red-900/80 dark:text-red-100/80">
                {t.state}
              </label>

              <select
                name="state"
                defaultValue={state}
                className="
                  w-full rounded-xl border border-red-300/80
                  bg-[#fff0f2] px-4 py-3 text-gray-900
                  outline-none transition-all
                  focus:border-red-600 focus:ring-2 focus:ring-red-200
                  dark:border-red-300/30 dark:bg-[#4f0d16]
                  dark:text-white dark:focus:border-red-300
                  dark:focus:ring-red-400/20
                "
              >
                <option value="">
                  {t.allStates}
                </option>

                {states
                  .map((item) => item.state)
                  .filter(
                    (item): item is string =>
                      Boolean(item)
                  )
                  .map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
              </select>
            </div>

          </div>

          <div className="mt-5 flex flex-wrap gap-3">

            <button
              type="submit"
              className="
                rounded-xl bg-gradient-to-r from-red-800 to-red-700
                px-6 py-3 font-semibold text-white shadow-sm
                transition-all duration-300
                hover:-translate-y-0.5 hover:from-red-700 hover:to-red-600
                hover:shadow-lg
                dark:from-red-700 dark:to-red-600
                dark:hover:from-red-600 dark:hover:to-red-500
              "
            >
              {t.searchButton}
            </button>

            <a
              href={`/${locale}/member/members`}
              className="
                rounded-xl border border-red-300/80
                bg-[#fff0f2] px-6 py-3 font-semibold
                text-red-800 transition-all duration-300
                hover:-translate-y-0.5 hover:border-red-500
                hover:bg-[#ffd1d9] hover:shadow-md
                dark:border-red-300/30 dark:bg-[#5c111b]
                dark:text-red-100 dark:hover:border-red-300/70
                dark:hover:bg-[#741a28]
              "
            >
              {t.clearFilters}
            </a>

          </div>
        </form>
      </div>

      {/* RESULT HEADER */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t.communityMembers}
          </h2>

          <p className="mt-1 text-sm text-red-900/60 dark:text-red-100/60">
            {memberCountText}
          </p>
        </div>

        {totalMembers > 0 && (
          <div className="text-sm font-medium text-red-900/60 dark:text-red-100/60">
            {t.page} {safePage} {t.of} {totalPages}
          </div>
        )}

      </div>

      {/* MEMBERS */}
      {members.length === 0 ? (
        <div
          className="
            rounded-2xl border border-red-300/80
            bg-gradient-to-br from-[#ffdfe5] via-[#ffd2da] to-[#ffc4ce]
            p-10 text-center shadow-sm
            dark:border-red-400/40
            dark:from-[#68131f] dark:via-[#570e18] dark:to-[#410810]
          "
        >
          <div
            className="
              mx-auto flex h-16 w-16 items-center justify-center
              rounded-full bg-gradient-to-br from-[#ffb6c1] to-[#ff8fa1]
              text-2xl text-red-800 shadow-sm
              dark:from-[#8b2636] dark:to-[#6d1422] dark:text-red-100
            "
          >
            ?
          </div>

          <h2 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
            {t.noMembers}
          </h2>

          <p className="mt-2 text-red-900/65 dark:text-red-100/65">
            {t.tryChanging}
          </p>
        </div>
      ) : (
        <div
          className="
            overflow-hidden rounded-2xl
            border border-red-300/80
            bg-gradient-to-br from-[#fff0f2] via-[#ffe0e5] to-[#ffd0d8]
            shadow-sm
            dark:border-red-400/35
            dark:from-[#751a28] dark:via-[#64131f] dark:to-[#51101a]
          "
        >
          {/* DESKTOP LIST HEADER */}
          <div
            className="
              hidden border-b border-red-200/80
              bg-gradient-to-r from-[#ffd6dd] to-[#ffc5cf]
              px-6 py-4
              text-xs font-bold uppercase tracking-wide
              text-red-900/70
              md:grid md:grid-cols-[minmax(220px,1.8fr)_minmax(150px,1fr)_minmax(180px,1.2fr)_140px_130px]
              md:items-center md:gap-4
              dark:border-red-300/20
              dark:from-[#5c111b] dark:to-[#4d0c15]
              dark:text-red-100/70
            "
          >
            <div>{t.communityMembers}</div>
            <div>{t.profession}</div>
            <div>{t.location}</div>
            <div>{t.approvedMember}</div>
            <div className="text-right">{t.viewProfile}</div>
          </div>

          {/* MEMBER LIST */}
          <div className="divide-y divide-red-200/70 dark:divide-red-300/15">
            {members.map((member) => {
              const profile = member.memberProfile;
              const memberName = getMemberName(member);

              const initials =
                memberName
                  .split(" ")
                  .filter(Boolean)
                  .map((name) => name.charAt(0))
                  .join("")
                  .slice(0, 2)
                  .toUpperCase() || "MC";

              const memberId = getMemberId(member);

              const profession =
                profile?.profession ||
                profile?.occupation ||
                "—";

              const location =
                [profile?.city, profile?.state]
                  .filter(Boolean)
                  .join(", ") || "—";

              return (
                <div
                  key={member.id}
                  className="
                    group px-5 py-5
                    transition-all duration-200
                    hover:bg-[#ffd8df]
                    dark:hover:bg-[#68131f]
                    md:px-6
                  "
                >
                  {/* DESKTOP */}
                  <div
                    className="
                      hidden
                      md:grid
                      md:grid-cols-[minmax(220px,1.8fr)_minmax(150px,1fr)_minmax(180px,1.2fr)_140px_130px]
                      md:items-center
                      md:gap-4
                    "
                  >
                    {/* MEMBER */}
                    <div className="flex min-w-0 items-center gap-4">
                      {profile?.profileImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={profile.profileImage}
                          alt={memberName}
                          className="
                            h-12 w-12 flex-shrink-0 rounded-full
                            border-2 border-red-200 object-cover
                            shadow-sm dark:border-red-300/40
                          "
                        />
                      ) : (
                        <div
                          className="
                            flex h-12 w-12 flex-shrink-0 items-center
                            justify-center rounded-full
                            bg-gradient-to-br from-red-800 to-red-600
                            text-sm font-bold text-white shadow-md
                            transition-transform duration-200
                            group-hover:scale-105
                          "
                        >
                          {initials}
                        </div>
                      )}

                      <div className="min-w-0">
                        <h3
                          className="
                            truncate text-base font-bold
                            text-gray-900 dark:text-white
                          "
                        >
                          {memberName}
                        </h3>

                        <p
                          className="
                            mt-1 font-mono text-xs
                            text-red-900/55 dark:text-red-100/55
                          "
                        >
                          {memberId}
                        </p>
                      </div>
                    </div>

                    {/* PROFESSION */}
                    <div className="min-w-0">
                      <p
                        className="
                          truncate text-sm font-medium
                          text-gray-900 dark:text-white
                        "
                        title={profession}
                      >
                        {profession}
                      </p>
                    </div>

                    {/* LOCATION */}
                    <div className="min-w-0">
                      <p
                        className="
                          truncate text-sm
                          text-red-900/75 dark:text-red-100/75
                        "
                        title={location}
                      >
                        {location}
                      </p>
                    </div>

                    {/* STATUS */}
                    <div>
                      <span
                        className="
                          inline-flex rounded-full
                          bg-green-100 px-3 py-1
                          text-xs font-semibold text-green-700
                          dark:bg-green-500/20 dark:text-green-300
                        "
                      >
                        {t.approvedMember}
                      </span>
                    </div>

                    {/* ACTION */}
                    <div className="text-right">
                      <a
                        href={`/${locale}/member/members/${member.memberNumber}`}
                        className="
                          inline-flex items-center justify-end
                          text-sm font-semibold text-red-800
                          transition-all duration-200
                          hover:translate-x-1 hover:text-red-600
                          dark:text-red-200 dark:hover:text-white
                        "
                      >
                        {t.viewProfile} {"\u2192"}
                      </a>
                    </div>
                  </div>

                  {/* MOBILE */}
                  <div className="flex items-center gap-4 md:hidden">
                    {profile?.profileImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={profile.profileImage}
                        alt={memberName}
                        className="
                          h-14 w-14 flex-shrink-0 rounded-full
                          border-2 border-red-200 object-cover
                          shadow-sm dark:border-red-300/40
                        "
                      />
                    ) : (
                      <div
                        className="
                          flex h-14 w-14 flex-shrink-0 items-center
                          justify-center rounded-full
                          bg-gradient-to-br from-red-800 to-red-600
                          text-base font-bold text-white shadow-md
                        "
                      >
                        {initials}
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3
                            className="
                              truncate text-base font-bold
                              text-gray-900 dark:text-white
                            "
                          >
                            {memberName}
                          </h3>

                          <p
                            className="
                              mt-1 font-mono text-xs
                              text-red-900/55 dark:text-red-100/55
                            "
                          >
                            {memberId}
                          </p>
                        </div>

                        <span
                          className="
                            shrink-0 rounded-full
                            bg-green-100 px-2.5 py-1
                            text-[10px] font-semibold text-green-700
                            dark:bg-green-500/20 dark:text-green-300
                          "
                        >
                          {t.approvedMember}
                        </span>
                      </div>

                      <div className="mt-2 space-y-1">
                        <p
                          className="
                            truncate text-sm
                            text-red-900/75 dark:text-red-100/75
                          "
                        >
                          {profession}
                        </p>

                        <p
                          className="
                            truncate text-xs
                            text-red-900/60 dark:text-red-100/60
                          "
                        >
                          {location}
                        </p>
                      </div>

                      <a
                        href={`/${locale}/member/members/${member.memberNumber}`}
                        className="
                          mt-3 inline-flex text-sm font-semibold
                          text-red-800 transition hover:text-red-600
                          dark:text-red-200 dark:hover:text-white
                        "
                      >
                        {t.viewProfile} {"\u2192"}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 pb-8">

          {safePage > 1 ? (
            <a
              href={buildUrl(safePage - 1)}
              className="
                rounded-xl border border-red-300/80
                bg-[#fff0f2] px-4 py-2 text-sm font-semibold
                text-red-800 transition-all duration-300
                hover:-translate-y-0.5 hover:border-red-500
                hover:bg-[#ffd1d9] hover:shadow-md
                dark:border-red-300/30 dark:bg-[#5c111b]
                dark:text-red-100 dark:hover:border-red-300/70
                dark:hover:bg-[#741a28]
              "
            >
              {"\u2190"} {t.previous}
            </a>
          ) : (
            <span
              className="
                rounded-xl border border-red-200/60
                px-4 py-2 text-sm text-red-900/35
                dark:border-red-300/20 dark:text-red-100/30
              "
            >
              {"\u2190"} {t.previous}
            </span>
          )}

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          )
            .filter(
              (page) =>
                page === 1 ||
                page === totalPages ||
                Math.abs(page - safePage) <= 2
            )
            .map((page, index, pages) => {

              const previousPage = pages[index - 1];

              const showDots =
                previousPage &&
                page - previousPage > 1;

              return (
                <span
                  key={page}
                  className="flex items-center gap-2"
                >

                  {showDots && (
                    <span className="text-red-900/40 dark:text-red-100/40">
                      ...
                    </span>
                  )}

                  <a
                    href={buildUrl(page)}
                    className={`
                      flex h-10 w-10 items-center justify-center
                      rounded-xl text-sm font-semibold transition-all duration-300
                      ${
                        page === safePage
                          ? "bg-gradient-to-br from-red-800 to-red-600 text-white shadow-md"
                          : "border border-red-300/80 bg-[#fff0f2] text-red-800 hover:-translate-y-0.5 hover:border-red-500 hover:bg-[#ffd1d9] hover:shadow-md dark:border-red-300/30 dark:bg-[#5c111b] dark:text-red-100 dark:hover:border-red-300/70 dark:hover:bg-[#741a28]"
                      }
                    `}
                  >
                    {page}
                  </a>

                </span>
              );
            })}

          {safePage < totalPages ? (
            <a
              href={buildUrl(safePage + 1)}
              className="
                rounded-xl border border-red-300/80
                bg-[#fff0f2] px-4 py-2 text-sm font-semibold
                text-red-800 transition-all duration-300
                hover:-translate-y-0.5 hover:border-red-500
                hover:bg-[#ffd1d9] hover:shadow-md
                dark:border-red-300/30 dark:bg-[#5c111b]
                dark:text-red-100 dark:hover:border-red-300/70
                dark:hover:bg-[#741a28]
              "
            >
              {t.next} {"\u2192"}
            </a>
          ) : (
            <span
              className="
                rounded-xl border border-red-200/60
                px-4 py-2 text-sm text-red-900/35
                dark:border-red-300/20 dark:text-red-100/30
              "
            >
              {t.next} {"\u2192"}
            </span>
          )}

        </div>
      )}

    </div>
  );
}