import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

type Props = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

const translations = {
  en: {
    back: "Back to Matrimonial",
    profile: "Matrimonial Profile",
    about: "About",
    personal: "Personal Information",
    professional: "Professional Information",
    family: "Family Information",
    partner: "Partner Expectations",
    name: "Name",
    gender: "Gender",
    age: "Age",
    height: "Height",
    maritalStatus: "Marital Status",
    education: "Education",
    profession: "Profession",
    occupation: "Occupation",
    company: "Company",
    location: "Location",
    country: "Country",
    community: "Community",
    subCommunity: "Sub Community",
    gotra: "Gotra",
    familyDetails: "Family Details",
    fatherName: "Father's Name",
    motherName: "Mother's Name",
    siblings: "Siblings",
    contact: "Contact",
    contactAdmin: "Contact through ASK Community administration",
    contactMembers: "Contact is available to approved ASK Community members.",
    loginRequired: "Please login as an approved member to access this profile.",
    login: "Login",
    private: "This profile is private.",
    notFound: "Matrimonial profile not found.",
    approvedOnly: "This profile is not currently available.",
    years: "years",
    male: "Male",
    female: "Female",
    other: "Other",
    neverMarried: "Never Married",
    divorced: "Divorced",
    widowed: "Widowed",
    separated: "Separated",
  },

  hi: {
    back: "वैवाहिक प्रोफ़ाइल पर वापस जाएँ",
    profile: "वैवाहिक प्रोफ़ाइल",
    about: "परिचय",
    personal: "व्यक्तिगत जानकारी",
    professional: "व्यावसायिक जानकारी",
    family: "पारिवारिक जानकारी",
    partner: "जीवनसाथी की अपेक्षाएँ",
    name: "नाम",
    gender: "लिंग",
    age: "आयु",
    height: "कद",
    maritalStatus: "वैवाहिक स्थिति",
    education: "शिक्षा",
    profession: "व्यवसाय",
    occupation: "पेशा",
    company: "कंपनी",
    location: "स्थान",
    country: "देश",
    community: "समुदाय",
    subCommunity: "उप समुदाय",
    gotra: "गोत्र",
    familyDetails: "पारिवारिक विवरण",
    fatherName: "पिता का नाम",
    motherName: "माता का नाम",
    siblings: "भाई-बहन",
    contact: "संपर्क",
    contactAdmin: "ASK Community प्रशासन के माध्यम से संपर्क करें",
    contactMembers: "संपर्क केवल स्वीकृत ASK Community सदस्यों के लिए उपलब्ध है।",
    loginRequired: "इस प्रोफ़ाइल को देखने के लिए स्वीकृत सदस्य के रूप में लॉगिन करें।",
    login: "लॉगिन",
    private: "यह प्रोफ़ाइल निजी है।",
    notFound: "वैवाहिक प्रोफ़ाइल नहीं मिली।",
    approvedOnly: "यह प्रोफ़ाइल वर्तमान में उपलब्ध नहीं है।",
    years: "वर्ष",
    male: "पुरुष",
    female: "महिला",
    other: "अन्य",
    neverMarried: "कभी विवाहित नहीं",
    divorced: "तलाकशुदा",
    widowed: "विधवा/विधुर",
    separated: "अलग",
  },

  gu: {
    back: "\u0ab5\u0abf\u0ab5\u0abe\u0ab9 \u0aae\u0abf\u0ab2\u0abe\u0aa8 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0aaa\u0ab0 \u0aaa\u0abe\u0a9b\u0abe \u0a9c\u0abe\u0ab5",
    profile: "\u0ab5\u0abf\u0ab5\u0abe\u0ab9 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2",
    about: "\u0aaa\u0ab0\u0abf\u0a9a\u0aaf",
    personal: "\u0ab5\u0acd\u0aaf\u0a95\u0acd\u0aa4\u0abf\u0a97\u0aa4 \u0aae\u0abe\u0ab9\u0abf\u0aa4\u0ac0",
    professional: "\u0ab5\u0acd\u0aaf\u0ab5\u0ab8\u0abe\u0aaf\u0abf\u0a95 \u0aae\u0abe\u0ab9\u0abf\u0aa4\u0ac0",
    family: "\u0a95\u0ac1\u0a9f\u0ac1\u0a82\u0aac \u0aae\u0abe\u0ab9\u0abf\u0aa4\u0ac0",
    partner: "\u0a9c\u0ac0\u0ab5\u0aa8\u0ab8\u0abe\u0aa5\u0ac0 \u0aae\u0abe\u0a9f\u0ac7 \u0a85\u0aaa\u0ac7\u0a95\u0acd\u0ab7\u0abe\u0a93",
    name: "\u0aa8\u0abe\u0aae",
    gender: "\u0ab2\u0abf\u0a82\u0a97",
    age: "\u0a89\u0aae\u0ab0",
    height: "\u0a89\u0a82\u0a9a\u0abe\u0a88",
    maritalStatus: "\u0ab5\u0ac8\u0ab5\u0abe\u0ab9\u0abf\u0a95 \u0ab8\u0acd\u0aa5\u0abf\u0aa4\u0abf",
    education: "\u0ab6\u0abf\u0a95\u0acd\u0ab7\u0aa3",
    profession: "\u0ab5\u0acd\u0aaf\u0ab5\u0ab8\u0abe\u0aaf",
    occupation: "\u0ab5\u0acd\u0aaf\u0ab5\u0ab8\u0abe\u0aaf",
    company: "\u0a95\u0a82\u0aaa\u0aa8\u0ac0",
    location: "\u0ab8\u0acd\u0aa5\u0ab3",
    country: "\u0aa6\u0ac7\u0ab6",
    community: "\u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf",
    subCommunity: "\u0aaa\u0ac7\u0a9f\u0abe \u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf",
    gotra: "\u0a97\u0acb\u0aa4\u0acd\u0ab0",
    familyDetails: "\u0a95\u0ac1\u0a9f\u0ac1\u0a82\u0aac\u0aa8\u0abe \u0ab5\u0abf\u0a97\u0aa4\u0acb",
    fatherName: "\u0aaa\u0abf\u0aa4\u0abe\u0aa8\u0ac1\u0a82 \u0aa8\u0abe\u0aae",
    motherName: "\u0aae\u0abe\u0aa4\u0abe\u0aa8\u0ac1\u0a82 \u0aa8\u0abe\u0aae",
    siblings: "\u0aad\u0abe\u0a88-\u0aac\u0ab9\u0ac7\u0aa8",
    contact: "\u0ab8\u0a82\u0aaa\u0ab0\u0acd\u0a95",
    contactAdmin: "\u0a8f\u0ab8\u0a95\u0ac7 \u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf \u0ab5\u0acd\u0aaf\u0ab5\u0ab8\u0acd\u0aa5\u0abe\u0aaa\u0aa8 \u0aa6\u0acd\u0ab5\u0abe\u0ab0\u0abe \u0ab8\u0a82\u0aaa\u0ab0\u0acd\u0a95 \u0a95\u0ab0\u0acb",
    contactMembers: "\u0ab8\u0a82\u0aaa\u0ab0\u0acd\u0a95 \u0aae\u0abe\u0aa4\u0acd\u0ab0 \u0aae\u0a82\u0a9c\u0ac2\u0ab0 \u0a8f\u0ab8\u0a95\u0ac7 \u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf \u0ab8\u0aad\u0acd\u0aaf\u0acb \u0aae\u0abe\u0a9f\u0ac7 \u0a89\u0aaa\u0ab2\u0aac\u0acd\u0aa7 \u0a9b\u0ac7.",
    loginRequired: "\u0a86 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0a9c\u0acb\u0ab5\u0abe \u0aae\u0abe\u0a9f\u0ac7 \u0aae\u0a82\u0a9c\u0ac2\u0ab0 \u0ab8\u0aad\u0acd\u0aaf \u0aa4\u0ab0\u0ac0\u0a95\u0ac7 \u0ab2\u0acb\u0a97\u0abf\u0aa8 \u0a95\u0ab0\u0acb.",
    login: "\u0ab2\u0acb\u0a97\u0abf\u0aa8",
    private: "\u0a86 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0a96\u0abe\u0aa8\u0a97\u0ac0 \u0a9b\u0ac7.",
    notFound: "\u0ab5\u0abf\u0ab5\u0abe\u0ab9 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0aae\u0ab3\u0acd\u0aaf\u0acb \u0aa8\u0aa5\u0ac0.",
    approvedOnly: "\u0a86 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0ab9\u0abe\u0ab2 \u0a89\u0aaa\u0ab2\u0aac\u0acd\u0aa7 \u0aa8\u0aa5\u0ac0.",
    years: "\u0ab5\u0ab0\u0acd\u0ab7",
    male: "\u0aaa\u0ac1\u0ab0\u0ac1\u0ab7",
    female: "\u0ab8\u0acd\u0aa4\u0acd\u0ab0\u0ac0",
    other: "\u0a85\u0aa8\u0acd\u0aaf",
    neverMarried: "\u0a95\u0acd\u0af0\u0aaf\u0abe\u0ab0\u0ac7 \u0aaa\u0aa3 \u0aaa\u0acd\u0ab0\u0aa3\u0ac0\u0aa4 \u0aa8\u0aa5\u0ac0",
    divorced: "\u0a9b\u0ac2\u0a9f\u0abe\u0a9b\u0ac7\u0aa1\u0abe",
    widowed: "\u0ab5\u0abf\u0aa7\u0ab5\u0abe/\u0ab5\u0abf\u0aa7\u0ac1\u0ab0",
    separated: "\u0a85\u0ab2\u0a97",
  },
} as const;

function calculateAge(dateOfBirth: Date | null) {
  if (!dateOfBirth) return null;

  const today = new Date();

  let age =
    today.getFullYear() -
    dateOfBirth.getFullYear();

  const month =
    today.getMonth() -
    dateOfBirth.getMonth();

  if (
    month < 0 ||
    (month === 0 &&
      today.getDate() < dateOfBirth.getDate())
  ) {
    age--;
  }

  return age;
}

function getGender(
  value: string,
  t: {
    male: string;
    female: string;
    other: string;
  }
) {
  if (value === "MALE") return t.male;
  if (value === "FEMALE") return t.female;
  return t.other;
}

function getMaritalStatus(
  value: string,
  t: {
    neverMarried: string;
    divorced: string;
    widowed: string;
    separated: string;
  }
) {
  if (value === "NEVER_MARRIED") return t.neverMarried;
  if (value === "DIVORCED") return t.divorced;
  if (value === "WIDOWED") return t.widowed;
  if (value === "SEPARATED") return t.separated;
  return value;
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  if (!value) return null;

  return (
    <div className="flex flex-col gap-1 border-b border-slate-100 py-3 last:border-0 dark:border-slate-800 sm:flex-row sm:items-start sm:justify-between">
      <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
        {label}
      </span>

      <span className="text-sm font-semibold text-slate-900 dark:text-white sm:max-w-[65%] sm:text-right">
        {value}
      </span>
    </div>
  );
}

export default async function MatrimonialProfilePage({
  params,
}: Props) {
  const { locale: rawLocale, id } = await params;

  const locale =
    rawLocale === "hi" || rawLocale === "gu"
      ? rawLocale
      : "en";

  const t = translations[locale];

  const session = await auth();

  const profile =
    await prisma.matrimonialProfile.findUnique({
      where: {
        id,
      },
    });

  if (!profile) {
    notFound();
  }

  if (profile.status !== "APPROVED") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
        <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {t.notFound}
          </h1>

          <p className="mt-3 text-slate-500 dark:text-slate-400">
            {t.approvedOnly}
          </p>

          <Link
            href={`/${locale}/matrimonial`}
            className="mt-6 inline-block rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700"
          >
            {t.back}
          </Link>
        </div>
      </main>
    );
  }

  if (profile.profileVisibility === "PRIVATE") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
        <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {t.private}
          </h1>

          <Link
            href={`/${locale}/matrimonial`}
            className="mt-6 inline-block rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700"
          >
            {t.back}
          </Link>
        </div>
      </main>
    );
  }

  const isMember =
    !!session?.user &&
    String(
      (session.user as any).role || ""
    ) === "MEMBER";

  const isApprovedMember =
    isMember &&
    String(
      (session.user as any).status || ""
    ) === "APPROVED";

  if (
    profile.profileVisibility === "MEMBERS_ONLY" &&
    !isApprovedMember
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
        <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {t.loginRequired}
          </h1>

          <Link
            href={`/${locale}/login`}
            className="mt-6 inline-block rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700"
          >
            {t.login}
          </Link>
        </div>
      </main>
    );
  }

  const age = calculateAge(
    profile.dateOfBirth
  );

  const name = [
    profile.firstName,
    profile.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  const location = [
    profile.city,
    profile.state,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">

      <section className="bg-gradient-to-br from-red-800 via-red-700 to-red-600 px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link
            href={`/${locale}/matrimonial`}
            className="text-sm font-medium text-red-100 hover:text-white"
          >
            ← {t.back}
          </Link>

          <div className="mt-7">
            <p className="text-sm font-semibold uppercase tracking-widest text-red-100">
              ASK Community
            </p>

            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              {t.profile}
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[360px_1fr]">

          <aside>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

              <div className="h-[420px] bg-slate-100 dark:bg-slate-800">
                {profile.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt={name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-8xl font-bold text-slate-300 dark:text-slate-600">
                    {profile.firstName
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                )}
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {name}
                </h2>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-950 dark:text-red-300">
                    {getGender(
                      profile.gender,
                      t
                    )}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {getMaritalStatus(
                      profile.maritalStatus,
                      t
                    )}
                  </span>
                </div>

                {age !== null && (
                  <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                    {age} {t.years}
                    {profile.height
                      ? ` • ${profile.height}`
                      : ""}
                  </p>
                )}

                {location && (
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    {location}
                  </p>
                )}
              </div>
            </div>
          </aside>

          <div className="space-y-6">

            {profile.aboutMe && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {t.about}
                </h2>

                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {profile.aboutMe}
                </p>
              </section>
            )}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {t.personal}
              </h2>

              <div className="mt-4">
                <InfoRow
                  label={t.name}
                  value={name}
                />

                <InfoRow
                  label={t.gender}
                  value={getGender(
                    profile.gender,
                    t
                  )}
                />

                {age !== null && (
                  <InfoRow
                    label={t.age}
                    value={`${age} ${t.years}`}
                  />
                )}

                <InfoRow
                  label={t.height}
                  value={profile.height}
                />

                <InfoRow
                  label={t.maritalStatus}
                  value={getMaritalStatus(
                    profile.maritalStatus,
                    t
                  )}
                />

                <InfoRow
                  label={t.location}
                  value={location}
                />

                <InfoRow
                  label={t.country}
                  value={profile.country}
                />

                <InfoRow
                  label={t.community}
                  value={profile.community}
                />

                <InfoRow
                  label={t.subCommunity}
                  value={profile.subCommunity}
                />

                <InfoRow
                  label={t.gotra}
                  value={profile.gotra}
                />
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {t.professional}
              </h2>

              <div className="mt-4">
                <InfoRow
                  label={t.education}
                  value={profile.education}
                />

                <InfoRow
                  label={t.profession}
                  value={profile.profession}
                />

                <InfoRow
                  label={t.occupation}
                  value={profile.occupation}
                />

                <InfoRow
                  label={t.company}
                  value={profile.company}
                />
              </div>
            </section>

            {(profile.familyDetails ||
              profile.fatherName ||
              profile.motherName ||
              profile.siblings) && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {t.family}
                </h2>

                <div className="mt-4">
                  <InfoRow
                    label={t.fatherName}
                    value={profile.fatherName}
                  />

                  <InfoRow
                    label={t.motherName}
                    value={profile.motherName}
                  />

                  <InfoRow
                    label={t.siblings}
                    value={profile.siblings}
                  />

                  {profile.familyDetails && (
                    <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        {t.familyDetails}
                      </p>

                      <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-700 dark:text-slate-300">
                        {profile.familyDetails}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {profile.partnerExpectation && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {t.partner}
                </h2>

                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {profile.partnerExpectation}
                </p>
              </section>
            )}

            <section className="rounded-2xl border border-red-100 bg-red-50 p-6 dark:border-red-950 dark:bg-red-950/30">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {t.contact}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {profile.contactPreference ===
                "MEMBERS_ONLY"
                  ? t.contactMembers
                  : t.contactAdmin}
              </p>
            </section>

          </div>
        </div>
      </section>
    </main>
  );
}