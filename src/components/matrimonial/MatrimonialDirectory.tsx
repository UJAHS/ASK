"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Locale = "en" | "hi" | "gu";

type Profile = {
  id: string;
  firstName: string;
  lastName: string | null;
  gender: string;
  dateOfBirth: string | null;
  height: string | null;
  maritalStatus: string;
  education: string | null;
  profession: string | null;
  occupation: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  community: string | null;
  subCommunity: string | null;
  profileImage: string | null;
  profileVisibility: string;
  contactPreference: string;
};

type Props = {
  locale: Locale;
  profiles: Profile[];
};

const text: Record<Locale, Record<string, string>> = {
  en: {
    title: "Matrimonial",
    subtitle:
      "Discover matrimonial profiles from the ASK Community.",
    search: "Search",
    searchPlaceholder:
      "Search by name, profession, city or community...",
    gender: "Gender",
    all: "All",
    male: "Male",
    female: "Female",
    other: "Other",
    maritalStatus: "Marital Status",
    neverMarried: "Never Married",
    divorced: "Divorced",
    widowed: "Widowed",
    separated: "Separated",
    allStatuses: "All Statuses",
    clear: "Clear Filters",
    view: "View Profile",
    noResults: "No matrimonial profiles found.",
    profiles: "Profiles",
    years: "years",
    location: "Location",
    education: "Education",
    profession: "Profession",
    community: "Community",
  },

  hi: {
    title: "वैवाहिक",
    subtitle:
      "ASK समुदाय के वैवाहिक प्रोफ़ाइल देखें।",
    search: "खोजें",
    searchPlaceholder:
      "नाम, व्यवसाय, शहर या समुदाय से खोजें...",
    gender: "लिंग",
    all: "सभी",
    male: "पुरुष",
    female: "महिला",
    other: "अन्य",
    maritalStatus: "वैवाहिक स्थिति",
    neverMarried: "कभी विवाहित नहीं",
    divorced: "तलाकशुदा",
    widowed: "विधवा/विधुर",
    separated: "अलग",
    allStatuses: "सभी स्थितियाँ",
    clear: "फ़िल्टर साफ़ करें",
    view: "प्रोफ़ाइल देखें",
    noResults: "कोई वैवाहिक प्रोफ़ाइल नहीं मिली।",
    profiles: "प्रोफ़ाइल",
    years: "वर्ष",
    location: "स्थान",
    education: "शिक्षा",
    profession: "व्यवसाय",
    community: "समुदाय",
  },

  gu: {
    title: "\u0ab5\u0abf\u0ab5\u0abe\u0ab9 \u0aae\u0abf\u0ab2\u0abe\u0aa8",
    subtitle:
      "\u0a8f\u0ab8\u0a95\u0ac7 \u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0aa8\u0abe \u0ab5\u0abf\u0ab5\u0abe\u0ab9 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0a9c\u0ac1\u0a93.",
    search: "\u0ab6\u0acb\u0aa7\u0acb",
    searchPlaceholder:
      "\u0aa8\u0abe\u0aae, \u0ab5\u0acd\u0aaf\u0ab5\u0ab8\u0abe\u0aaf, \u0ab6\u0ab9\u0ac7\u0ab0 \u0a85\u0aa5\u0ab5\u0abe \u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0aa5\u0ac0 \u0ab6\u0acb\u0aa7\u0acb...",
    gender: "\u0ab2\u0abf\u0a82\u0a97",
    all: "\u0aac\u0aa7\u0abe",
    male: "\u0aaa\u0ac1\u0ab0\u0ac1\u0ab7",
    female: "\u0ab8\u0acd\u0aa4\u0acd\u0ab0\u0ac0",
    other: "\u0a85\u0aa8\u0acd\u0aaf",
    maritalStatus: "\u0ab5\u0ac8\u0ab5\u0abe\u0ab9\u0abf\u0a95 \u0ab8\u0acd\u0aa5\u0abf\u0aa4\u0abf",
    neverMarried: "\u0a95\u0acd\u0af0\u0aaf\u0abe\u0ab0\u0ac7 \u0aaa\u0aa3 \u0aaa\u0acd\u0ab0\u0aa3\u0ac0\u0aa4 \u0aa8\u0aa5\u0ac0",
    divorced: "\u0a9b\u0ac2\u0a9f\u0abe\u0a9b\u0ac7\u0aa1\u0abe",
    widowed: "\u0ab5\u0abf\u0aa7\u0ab5\u0abe/\u0ab5\u0abf\u0aa7\u0ac1\u0ab0",
    separated: "\u0a85\u0ab2\u0a97",
    allStatuses: "\u0aac\u0aa7\u0ac0 \u0ab8\u0acd\u0aa5\u0abf\u0aa4\u0abf\u0a93",
    clear: "\u0aab\u0abf\u0ab2\u0acd\u0a9f\u0ab0 \u0ab8\u0abe\u0aab \u0a95\u0ab0\u0acb",
    view: "\u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0a9c\u0ac1\u0a93",
    noResults: "\u0a95\u0acb\u0a88 \u0ab5\u0abf\u0ab5\u0abe\u0ab9 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0aae\u0ab3\u0acd\u0aaf\u0acb \u0aa8\u0aa5\u0ac0.",
    profiles: "\u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2",
    years: "\u0ab5\u0ab0\u0acd\u0ab7",
    location: "\u0ab8\u0acd\u0aa5\u0ab3",
    education: "\u0ab6\u0abf\u0a95\u0acd\u0ab7\u0aa3",
    profession: "\u0ab5\u0acd\u0aaf\u0ab5\u0ab8\u0abe\u0aaf",
    community: "\u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf",
  },
};

function calculateAge(date: string | null) {
  if (!date) return null;

  const dob = new Date(date);
  const today = new Date();

  let age = today.getFullYear() - dob.getFullYear();

  const month = today.getMonth() - dob.getMonth();

  if (
    month < 0 ||
    (month === 0 && today.getDate() < dob.getDate())
  ) {
    age--;
  }

  return age;
}

function displayGender(value: string, t: Record<string, string>) {
  if (value === "MALE") return t.male;
  if (value === "FEMALE") return t.female;
  return t.other;
}

function displayMaritalStatus(
  value: string,
  t: Record<string, string>
) {
  if (value === "NEVER_MARRIED") return t.neverMarried;
  if (value === "DIVORCED") return t.divorced;
  if (value === "WIDOWED") return t.widowed;
  if (value === "SEPARATED") return t.separated;
  return value;
}

export default function MatrimonialDirectory({
  locale,
  profiles,
}: Props) {
  const t = text[locale];

  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("ALL");
  const [maritalStatus, setMaritalStatus] =
    useState("ALL");

  const filteredProfiles = useMemo(() => {
    const query = search.trim().toLowerCase();

    return profiles.filter((profile) => {
      const name = [
        profile.firstName,
        profile.lastName,
      ]
        .filter(Boolean)
        .join(" ");

      const searchable = [
        name,
        profile.profession,
        profile.occupation,
        profile.city,
        profile.state,
        profile.community,
        profile.subCommunity,
        profile.education,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query || searchable.includes(query);

      const matchesGender =
        gender === "ALL" ||
        profile.gender === gender;

      const matchesMarital =
        maritalStatus === "ALL" ||
        profile.maritalStatus === maritalStatus;

      return (
        matchesSearch &&
        matchesGender &&
        matchesMarital
      );
    });
  }, [profiles, search, gender, maritalStatus]);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">

      <section className="bg-gradient-to-br from-red-800 via-red-700 to-red-600 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-red-100">
            ASK Community
          </p>

          <h1 className="text-4xl font-bold sm:text-5xl">
            {t.title}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-red-50 sm:text-lg">
            {t.subtitle}
          </p>
        </div>
      </section>

      <section className="mx-auto -mt-7 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-lg dark:border-slate-800 dark:bg-slate-900">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">

            <div className="lg:col-span-3">
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                {t.search}
              </label>

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder={t.searchPlaceholder}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-red-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                {t.gender}
              </label>

              <select
                value={gender}
                onChange={(e) =>
                  setGender(e.target.value)
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-red-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              >
                <option value="ALL">{t.all}</option>
                <option value="MALE">{t.male}</option>
                <option value="FEMALE">{t.female}</option>
                <option value="OTHER">{t.other}</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                {t.maritalStatus}
              </label>

              <select
                value={maritalStatus}
                onChange={(e) =>
                  setMaritalStatus(e.target.value)
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-red-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              >
                <option value="ALL">
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

            <div className="flex items-end">
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setGender("ALL");
                  setMaritalStatus("ALL");
                }}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {t.clear}
              </button>
            </div>

          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {filteredProfiles.length} {t.profiles}
          </p>
        </div>

        {filteredProfiles.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
            <p className="text-lg font-semibold text-slate-900 dark:text-white">
              {t.noResults}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">

            {filteredProfiles.map((profile) => {
              const name = [
                profile.firstName,
                profile.lastName,
              ]
                .filter(Boolean)
                .join(" ");

              const age = calculateAge(
                profile.dateOfBirth
              );

              const location = [
                profile.city,
                profile.state,
              ]
                .filter(Boolean)
                .join(", ");

              return (
                <article
                  key={profile.id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="relative h-72 overflow-hidden bg-slate-100 dark:bg-slate-800">
                    {profile.profileImage ? (
                      <img
                        src={profile.profileImage}
                        alt={name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-6xl font-bold text-slate-300 dark:text-slate-600">
                        {profile.firstName
                          ?.charAt(0)
                          .toUpperCase()}
                      </div>
                    )}

                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-red-700 shadow dark:bg-slate-950/90 dark:text-red-400">
                      {displayGender(profile.gender, t)}
                    </div>
                  </div>

                  <div className="p-5">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      {name}
                    </h2>

                    <div className="mt-2 flex flex-wrap gap-2 text-sm text-slate-500 dark:text-slate-400">
                      {age !== null && (
                        <span>
                          {age} {t.years}
                        </span>
                      )}

                      {profile.height && (
                        <span>• {profile.height}</span>
                      )}
                    </div>

                    <div className="mt-4 space-y-2 text-sm">
                      {location && (
                        <p className="text-slate-600 dark:text-slate-300">
                          <span className="font-semibold">
                            {t.location}:
                          </span>{" "}
                          {location}
                        </p>
                      )}

                      {profile.profession && (
                        <p className="text-slate-600 dark:text-slate-300">
                          <span className="font-semibold">
                            {t.profession}:
                          </span>{" "}
                          {profile.profession}
                        </p>
                      )}

                      {profile.education && (
                        <p className="text-slate-600 dark:text-slate-300">
                          <span className="font-semibold">
                            {t.education}:
                          </span>{" "}
                          {profile.education}
                        </p>
                      )}

                      {profile.community && (
                        <p className="text-slate-600 dark:text-slate-300">
                          <span className="font-semibold">
                            {t.community}:
                          </span>{" "}
                          {profile.community}
                        </p>
                      )}

                      <p className="pt-1 text-xs font-medium text-slate-400">
                        {displayMaritalStatus(
                          profile.maritalStatus,
                          t
                        )}
                      </p>
                    </div>

                    <Link
                      href={`/${locale}/matrimonial/${profile.id}`}
                      className="mt-5 block rounded-xl bg-red-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-red-700"
                    >
                      {t.view}
                    </Link>
                  </div>
                </article>
              );
            })}

          </div>
        )}
      </section>
    </main>
  );
}