import { prisma } from "@/lib/prisma";
import {
  MatrimonialGender,
  MaritalStatus,
  Prisma,
  ProfileVisibility,
} from "@prisma/client";
import Link from "next/link";

type Locale = "en" | "hi" | "gu";

type Props = {
  locale: Locale;
  userId: string;
  q: string;
  gender: string;
  maritalStatus: string;
  city: string;
  state: string;
};

const translations = {
  en: {
    searchTitle: "Search Matrimonial Profiles",
    searchDescription:
      "Find profiles using name, location, profession, education or community.",
    search: "Search",
    searchPlaceholder:
      "Search by name, city, profession, education...",
    gender: "Gender",
    allGenders: "All Genders",
    male: "Male",
    female: "Female",
    other: "Other",
    maritalStatus: "Marital Status",
    allStatuses: "All Marital Statuses",
    neverMarried: "Never Married",
    divorced: "Divorced",
    widowed: "Widowed",
    separated: "Separated",
    city: "City",
    allCities: "All Cities",
    state: "State",
    allStates: "All States",
    clear: "Clear Filters",
    profiles: "Profiles",
    noResults: "No matrimonial profiles found.",
    noResultsText:
      "Try changing your search or filter criteria.",
    viewProfile: "View Profile",
    years: "years",
    location: "Location",
    education: "Education",
    profession: "Profession",
    community: "Community",
  },

  hi: {
    searchTitle: "वैवाहिक प्रोफ़ाइल खोजें",
    searchDescription:
      "नाम, स्थान, व्यवसाय, शिक्षा या समुदाय के आधार पर प्रोफ़ाइल खोजें।",
    search: "खोजें",
    searchPlaceholder:
      "नाम, शहर, व्यवसाय, शिक्षा से खोजें...",
    gender: "लिंग",
    allGenders: "सभी लिंग",
    male: "पुरुष",
    female: "महिला",
    other: "अन्य",
    maritalStatus: "वैवाहिक स्थिति",
    allStatuses: "सभी वैवाहिक स्थितियाँ",
    neverMarried: "अविवाहित",
    divorced: "तलाकशुदा",
    widowed: "विधवा / विधुर",
    separated: "अलग रह रहे हैं",
    city: "शहर",
    allCities: "सभी शहर",
    state: "राज्य",
    allStates: "सभी राज्य",
    clear: "फ़िल्टर साफ़ करें",
    profiles: "प्रोफ़ाइल",
    noResults: "कोई वैवाहिक प्रोफ़ाइल नहीं मिली।",
    noResultsText:
      "अपनी खोज या फ़िल्टर बदलकर देखें।",
    viewProfile: "प्रोफ़ाइल देखें",
    years: "वर्ष",
    location: "स्थान",
    education: "शिक्षा",
    profession: "व्यवसाय",
    community: "समुदाय",
  },

  gu: {
    searchTitle: "લગ્ન પ્રોફાઇલ શોધો",
    searchDescription:
      "નામ, સ્થળ, વ્યવસાય, શિક્ષણ અથવા સમુદાય દ્વારા પ્રોફાઇલ શોધો.",
    search: "શોધો",
    searchPlaceholder:
      "નામ, શહેર, વ્યવસાય, શિક્ષણથી શોધો...",
    gender: "લિંગ",
    allGenders: "બધા લિંગ",
    male: "પુરુષ",
    female: "સ્ત્રી",
    other: "અન્ય",
    maritalStatus: "વૈવાહિક સ્થિતિ",
    allStatuses: "બધી વૈવાહિક સ્થિતિ",
    neverMarried: "અપરિણીત",
    divorced: "છૂટાછેડા લીધેલ",
    widowed: "વિધવા / વિધુર",
    separated: "અલગ રહેતા",
    city: "શહેર",
    allCities: "બધા શહેરો",
    state: "રાજ્ય",
    allStates: "બધા રાજ્યો",
    clear: "ફિલ્ટર સાફ કરો",
    profiles: "પ્રોફાઇલ",
    noResults: "કોઈ લગ્ન પ્રોફાઇલ મળી નથી.",
    noResultsText:
      "તમારી શોધ અથવા ફિલ્ટર બદલીને પ્રયાસ કરો.",
    viewProfile: "પ્રોફાઇલ જુઓ",
    years: "વર્ષ",
    location: "સ્થળ",
    education: "શિક્ષણ",
    profession: "વ્યવસાય",
    community: "સમુદાય",
  },
} as const;

function ageFromDate(date: Date | null) {
  if (!date) {
    return null;
  }

  const today = new Date();

  let age =
    today.getFullYear() -
    date.getFullYear();

  const month =
    today.getMonth() -
    date.getMonth();

  if (
    month < 0 ||
    (month === 0 &&
      today.getDate() < date.getDate())
  ) {
    age--;
  }

  return age;
}

type Translation =
  (typeof translations)[keyof typeof translations];

function genderLabel(
  value: string | null,
  t: Translation
) {
  if (value === "MALE") {
    return t.male;
  }

  if (value === "FEMALE") {
    return t.female;
  }

  if (value === "OTHER") {
    return t.other;
  }

  return value || "";
}

function maritalLabel(
  value: string | null,
  t: Translation
) {
  if (value === "NEVER_MARRIED") {
    return t.neverMarried;
  }

  if (value === "DIVORCED") {
    return t.divorced;
  }

  if (value === "WIDOWED") {
    return t.widowed;
  }

  if (value === "SEPARATED") {
    return t.separated;
  }

  return value || "";
}

const genderValues: MatrimonialGender[] = [
  MatrimonialGender.MALE,
  MatrimonialGender.FEMALE,
  MatrimonialGender.OTHER,
];

const maritalStatusValues: MaritalStatus[] = [
  MaritalStatus.NEVER_MARRIED,
  MaritalStatus.DIVORCED,
  MaritalStatus.WIDOWED,
  MaritalStatus.SEPARATED,
];

function isGenderValue(
  value: string
): value is MatrimonialGender {
  return genderValues.includes(
    value as MatrimonialGender
  );
}

function isMaritalStatusValue(
  value: string
): value is MaritalStatus {
  return maritalStatusValues.includes(
    value as MaritalStatus
  );
}

export default async function MatrimonialSearch({
  locale,
  userId,
  q,
  gender,
  maritalStatus,
  city,
  state,
}: Props) {
  const t = translations[locale];

  const validGender = isGenderValue(gender)
    ? gender
    : undefined;

  const validMaritalStatus =
    isMaritalStatusValue(maritalStatus)
      ? maritalStatus
      : undefined;

  const profiles =
    await prisma.matrimonialProfile.findMany({
      where: {
        status: "APPROVED",

        profileVisibility: {
          in: [
            ProfileVisibility.PUBLIC,
            ProfileVisibility.MEMBERS_ONLY,
          ],
        },

        userId: {
          not: userId,
        },

        ...(validGender
          ? {
              gender: validGender,
            }
          : {}),

        ...(validMaritalStatus
          ? {
              maritalStatus:
                validMaritalStatus,
            }
          : {}),

        ...(city
          ? {
              city,
            }
          : {}),

        ...(state
          ? {
              state,
            }
          : {}),

        ...(q
          ? {
              OR: [
                {
                  firstName: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
                {
                  lastName: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
                {
                  city: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
                {
                  state: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
                {
                  profession: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
                {
                  occupation: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
                {
                  education: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
                {
                  community: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
                {
                  religion: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : {}),
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 60,
    });

  const filterBase: Prisma.MatrimonialProfileWhereInput =
    {
      status: "APPROVED",

      profileVisibility: {
        in: [
          ProfileVisibility.PUBLIC,
          ProfileVisibility.MEMBERS_ONLY,
        ],
      },
    };

  const [cities, states] =
    await Promise.all([
      prisma.matrimonialProfile.findMany({
        where: filterBase,
        select: {
          city: true,
        },
        distinct: ["city"],
        orderBy: {
          city: "asc",
        },
      }),

      prisma.matrimonialProfile.findMany({
        where: filterBase,
        select: {
          state: true,
        },
        distinct: ["state"],
        orderBy: {
          state: "asc",
        },
      }),
    ]);

  const buildUrl = (
    overrides: Record<string, string>
  ) => {
    const values = {
      q,
      gender,
      maritalStatus,
      city,
      state,
      ...overrides,
    };

    const params =
      new URLSearchParams();

    Object.entries(values).forEach(
      ([key, value]) => {
        if (value) {
          params.set(key, value);
        }
      }
    );

    const query =
      params.toString();

    return `/${locale}/member/matrimonial${
      query ? `?${query}` : ""
    }`;
  };

  return (
    <section
      className="
        overflow-hidden rounded-3xl
        border border-red-200
        bg-gradient-to-br
        from-[#ffdfe5]
        via-[#ffd2da]
        to-[#ffc4ce]
        shadow-lg shadow-red-900/10
        dark:border-red-900/70
        dark:bg-gradient-to-br
        dark:from-[#68131f]
        dark:via-[#570e18]
        dark:to-[#410810]
      "
    >
      <div
        className="
          border-b border-red-300/40
          px-6 py-5
          dark:border-red-200/10
        "
      >
        <h2 className="text-xl font-bold text-red-950 dark:text-white">
          {t.searchTitle}
        </h2>

        <p className="mt-1 text-sm text-red-800/70 dark:text-red-100/60">
          {t.searchDescription}
        </p>
      </div>

      <form
        method="GET"
        action={`/${locale}/member/matrimonial`}
        className="grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-5"
      >
        <div className="xl:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-red-900 dark:text-red-100">
            {t.search}
          </label>

          <input
            name="q"
            defaultValue={q}
            placeholder={t.searchPlaceholder}
            className="
              h-12 w-full rounded-xl
              border border-red-200
              bg-white/80 px-4
              text-sm text-gray-900
              outline-none
              transition
              focus:border-red-600
              focus:ring-4
              focus:ring-red-600/10
              dark:border-red-100/10
              dark:bg-[#51101a]
              dark:text-white
              dark:placeholder:text-red-100/40
            "
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-red-900 dark:text-red-100">
            {t.gender}
          </label>

          <select
            name="gender"
            defaultValue={gender}
            className="
              h-12 w-full rounded-xl
              border border-red-200
              bg-white/80 px-3
              text-sm text-gray-900
              outline-none
              focus:border-red-600
              dark:border-red-100/10
              dark:bg-[#51101a]
              dark:text-white
            "
          >
            <option value="">
              {t.allGenders}
            </option>

            <option value="MALE">
              {t.male}
            </option>

            <option value="FEMALE">
              {t.female}
            </option>

            <option value="OTHER">
              {t.other}
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-red-900 dark:text-red-100">
            {t.maritalStatus}
          </label>

          <select
            name="maritalStatus"
            defaultValue={maritalStatus}
            className="
              h-12 w-full rounded-xl
              border border-red-200
              bg-white/80 px-3
              text-sm text-gray-900
              outline-none
              focus:border-red-600
              dark:border-red-100/10
              dark:bg-[#51101a]
              dark:text-white
            "
          >
            <option value="">
              {t.allStatuses}
            </option>

            <option value="NEVER_MARRIED">
              {t.neverMarried}
            </option>

            <option value="DIVORCED">
              {t.divorced}
            </option>

            <option value="WIDOWED">
              {t.widowed}
            </option>

            <option value="SEPARATED">
              {t.separated}
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-red-900 dark:text-red-100">
            {t.city}
          </label>

          <select
            name="city"
            defaultValue={city}
            className="
              h-12 w-full rounded-xl
              border border-red-200
              bg-white/80 px-3
              text-sm text-gray-900
              outline-none
              focus:border-red-600
              dark:border-red-100/10
              dark:bg-[#51101a]
              dark:text-white
            "
          >
            <option value="">
              {t.allCities}
            </option>

            {cities
              .map((item) => item.city)
              .filter(
                (
                  value
                ): value is string =>
                  Boolean(value)
              )
              .map((value) => (
                <option
                  key={value}
                  value={value}
                >
                  {value}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-red-900 dark:text-red-100">
            {t.state}
          </label>

          <select
            name="state"
            defaultValue={state}
            className="
              h-12 w-full rounded-xl
              border border-red-200
              bg-white/80 px-3
              text-sm text-gray-900
              outline-none
              focus:border-red-600
              dark:border-red-100/10
              dark:bg-[#51101a]
              dark:text-white
            "
          >
            <option value="">
              {t.allStates}
            </option>

            {states
              .map((item) => item.state)
              .filter(
                (
                  value
                ): value is string =>
                  Boolean(value)
              )
              .map((value) => (
                <option
                  key={value}
                  value={value}
                >
                  {value}
                </option>
              ))}
          </select>
        </div>

        <div
          className="
            flex flex-col gap-3
            md:col-span-2
            xl:col-span-5
            sm:flex-row sm:justify-end
          "
        >
          <Link
            href={`/${locale}/member/matrimonial`}
            className="
              inline-flex h-12
              items-center justify-center
              rounded-xl
              border border-red-300
              bg-white/70
              px-5
              text-sm font-bold
              text-red-700
              transition
              hover:-translate-y-0.5
              hover:bg-white
              hover:shadow-md
              dark:border-red-800
              dark:bg-[#64131f]
              dark:text-red-100
              dark:hover:bg-[#841e2d]
            "
          >
            {t.clear}
          </Link>

          <button
            type="submit"
            className="
              inline-flex h-12
              items-center justify-center
              rounded-xl
              bg-red-600
              px-7
              text-sm font-bold
              text-white
              shadow-md
              transition
              hover:-translate-y-0.5
              hover:bg-red-700
              hover:shadow-lg
            "
          >
            {t.search}
          </button>
        </div>
      </form>

      <div className="px-6 pb-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t.profiles}
          </h3>

          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700 dark:bg-red-950/50 dark:text-red-300">
            {profiles.length}
          </span>
        </div>

        {profiles.length === 0 ? (
          <div className="rounded-2xl border border-red-200 bg-white/60 p-10 text-center dark:border-red-900/50 dark:bg-[#751a28]/40">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white">
              {t.noResults}
            </h4>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {t.noResultsText}
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {profiles.map((item) => {
              const age =
                ageFromDate(
                  item.dateOfBirth
                );

              const name =
                [
                  item.firstName,
                  item.lastName,
                ]
                  .filter(Boolean)
                  .join(" ");

              return (
                <article
                  key={item.id}
                  className="
                    group overflow-hidden
                    rounded-3xl
                    border border-red-200
                    bg-gradient-to-br
                    from-[#fff0f2]
                    via-[#ffe0e5]
                    to-[#ffd0d8]
                    shadow-md
                    transition-all duration-300
                    hover:-translate-y-1.5
                    hover:border-red-400
                    hover:shadow-xl
                    hover:shadow-red-900/15
                    dark:border-red-900/70
                    dark:bg-gradient-to-br
                    dark:from-[#751a28]
                    dark:via-[#64131f]
                    dark:to-[#51101a]
                    dark:hover:border-red-500/60
                  "
                >
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      <div
                        className="
                          h-20 w-20 shrink-0
                          overflow-hidden rounded-2xl
                          border-4 border-white
                          bg-red-100 shadow-md
                          dark:border-red-200/10
                          dark:bg-red-950
                        "
                      >
                        {item.profileImage ? (
                          <img
                            src={
                              item.profileImage
                            }
                            alt={name}
                            className="
                              h-full w-full
                              object-cover
                              transition duration-500
                              group-hover:scale-105
                            "
                          />
                        ) : (
                          <div
                            className="
                              flex h-full w-full
                              items-center justify-center
                              bg-red-600
                              text-2xl font-bold
                              text-white
                            "
                          >
                            {item.firstName
                              .charAt(0)
                              .toUpperCase()}
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4
                          className="
                            truncate text-xl
                            font-bold text-gray-900
                            dark:text-white
                          "
                        >
                          {name}
                        </h4>

                        <div className="mt-2 flex flex-wrap gap-2">
                          {age !== null &&
                            age > 0 && (
                              <span
                                className="
                                  rounded-full
                                  bg-white/70
                                  px-2.5 py-1
                                  text-xs font-semibold
                                  text-red-800
                                  dark:bg-[#51101a]
                                  dark:text-red-200
                                "
                              >
                                {age} {t.years}
                              </span>
                            )}

                          {item.gender && (
                            <span
                              className="
                                rounded-full
                                bg-white/70
                                px-2.5 py-1
                                text-xs font-semibold
                                text-red-800
                                dark:bg-[#51101a]
                                dark:text-red-200
                              "
                            >
                              {genderLabel(
                                item.gender,
                                t
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 space-y-3">
                      {(item.city ||
                        item.state) && (
                        <div>
                          <p
                            className="
                              text-xs font-bold
                              uppercase tracking-wide
                              text-red-600
                              dark:text-red-300
                            "
                          >
                            {t.location}
                          </p>

                          <p
                            className="
                              mt-1 text-sm
                              text-gray-700
                              dark:text-gray-200
                            "
                          >
                            {item.city || ""}
                            {item.city &&
                            item.state
                              ? ", "
                              : ""}
                            {item.state || ""}
                          </p>
                        </div>
                      )}

                      {item.profession && (
                        <div>
                          <p
                            className="
                              text-xs font-bold
                              uppercase tracking-wide
                              text-red-600
                              dark:text-red-300
                            "
                          >
                            {t.profession}
                          </p>

                          <p
                            className="
                              mt-1 text-sm
                              text-gray-700
                              dark:text-gray-200
                            "
                          >
                            {item.profession}
                          </p>
                        </div>
                      )}

                      {item.education && (
                        <div>
                          <p
                            className="
                              text-xs font-bold
                              uppercase tracking-wide
                              text-red-600
                              dark:text-red-300
                            "
                          >
                            {t.education}
                          </p>

                          <p
                            className="
                              mt-1 text-sm
                              text-gray-700
                              dark:text-gray-200
                            "
                          >
                            {item.education}
                          </p>
                        </div>
                      )}

                      {item.community && (
                        <div>
                          <p
                            className="
                              text-xs font-bold
                              uppercase tracking-wide
                              text-red-600
                              dark:text-red-300
                            "
                          >
                            {t.community}
                          </p>

                          <p
                            className="
                              mt-1 text-sm
                              text-gray-700
                              dark:text-gray-200
                            "
                          >
                            {item.community}
                          </p>
                        </div>
                      )}

                      {item.maritalStatus && (
                        <div
                          className="
                            border-t
                            border-red-200/70
                            pt-3
                            dark:border-red-100/10
                          "
                        >
                          <p
                            className="
                              text-sm font-semibold
                              text-gray-700
                              dark:text-gray-200
                            "
                          >
                            {maritalLabel(
                              item.maritalStatus,
                              t
                            )}
                          </p>
                        </div>
                      )}
                    </div>

                    <Link
                      href={`/${locale}/matrimonial/${item.id}`}
                      className="
                        mt-5 flex w-full
                        items-center justify-center
                        rounded-xl
                        bg-red-600
                        px-4 py-3
                        text-sm font-bold
                        text-white
                        shadow-md
                        transition-all
                        hover:bg-red-700
                        hover:shadow-lg
                      "
                    >
                      {t.viewProfile}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}