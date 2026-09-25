import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  Heart,
  MapPin,
  ShieldCheck,
  UserCircle2,
} from "lucide-react";

import MemberContactRequestButton from "@/components/member/MemberContactRequestButton";

type Locale = "en" | "hi" | "gu";

const translations = {
  en: {
    back: "Back to Members Directory",
    communityProfile: "Community Profile",
    memberId: "Member ID",
    memberSince: "Member Since",
    profession: "Profession",
    education: "Education",
    location: "Location",
    country: "Country",
    profileNotAvailable: "Profile information is not available.",
    privacyTitle: "Privacy Protected",
    privacyText:
      "Personal contact details are protected. You can send a contact request to this member. Contact information will only be shared according to the member's privacy preferences.",
    contactSection: "Contact",
    approvedMember: "Approved Member",
    profile: "Profile",
  },
  hi: {
    back: "सदस्य निर्देशिका पर वापस जाएं",
    communityProfile: "सामुदायिक प्रोफ़ाइल",
    memberId: "सदस्य आईडी",
    memberSince: "सदस्य बने",
    profession: "व्यवसाय",
    education: "शिक्षा",
    location: "स्थान",
    country: "देश",
    profileNotAvailable: "प्रोफ़ाइल जानकारी उपलब्ध नहीं है।",
    privacyTitle: "गोपनीयता सुरक्षित",
    privacyText:
      "व्यक्तिगत संपर्क विवरण सुरक्षित हैं। आप इस सदस्य को संपर्क अनुरोध भेज सकते हैं। संपर्क जानकारी सदस्य की गोपनीयता प्राथमिकताओं के अनुसार ही साझा की जाएगी।",
    contactSection: "संपर्क",
    approvedMember: "स्वीकृत सदस्य",
    profile: "प्रोफ़ाइल",
  },
  gu: {
    back: "સભ્ય નિર્દેશિકા પર પાછા જાઓ",
    communityProfile: "સમુદાય પ્રોફાઇલ",
    memberId: "સભ્ય આઈડી",
    memberSince: "સભ્ય બન્યા",
    profession: "વ્યવસાય",
    education: "શિક્ષણ",
    location: "સ્થળ",
    country: "દેશ",
    profileNotAvailable: "પ્રોફાઇલ માહિતી ઉપલબ્ધ નથી.",
    privacyTitle: "ગોપનીયતા સુરક્ષિત",
    privacyText:
      "વ્યક્તિગત સંપર્ક વિગતો સુરક્ષિત છે. તમે આ સભ્યને સંપર્ક વિનંતી મોકલી શકો છો. સંપર્ક માહિતી સભ્યની ગોપનીયતા પસંદગીઓ અનુસાર જ શેર કરવામાં આવશે.",
    contactSection: "સંપર્ક",
    approvedMember: "મંજૂર સભ્ય",
    profile: "પ્રોફાઇલ",
  },
} as const;

function getLocale(value: string): Locale {
  if (value === "hi" || value === "gu") {
    return value;
  }

  return "en";
}

function formatDate(date: Date | null | undefined, locale: Locale) {
  if (!date) {
    return "—";
  }

  const localeMap: Record<Locale, string> = {
    en: "en-IN",
    hi: "hi-IN",
    gu: "gu-IN",
  };

  return new Intl.DateTimeFormat(localeMap[locale], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function MemberDetailPage({
  params,
}: {
  params: Promise<{
    locale: string;
    memberNumber: string;
  }>;
}) {
  const { locale: localeParam, memberNumber: memberNumberParam } = await params;

  const locale = getLocale(localeParam);
  const t = translations[locale];

  const session = await auth();

  if (!session?.user) {
    redirect(`/${locale}/login`);
  }

  const role = String((session.user as { role?: string }).role || "");

  if (role !== "MEMBER") {
    redirect(`/${locale}/unauthorized`);
  }

  const memberNumber = Number(memberNumberParam);

  if (!Number.isInteger(memberNumber) || memberNumber <= 0) {
    redirect(`/${locale}/member/members`);
  }

  const member = await prisma.user.findFirst({
    where: {
      memberNumber,
      role: "MEMBER",
      status: "APPROVED",
    },
    select: {
      id: true,
      memberNumber: true,
      createdAt: true,
    },
  });

  if (!member) {
    redirect(`/${locale}/member/members`);
  }

  const profile = await prisma.memberProfile.findUnique({
    where: {
      userId: member.id,
    },
  });

  const firstName = profile?.firstName || "";
  const lastName = profile?.lastName || "";
  const fullName =
    `${firstName} ${lastName}`.trim() || `Member #${member.memberNumber}`;

  const location = [
    profile?.city,
    profile?.state,
    profile?.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Link
        href={`/${locale}/member/members`}
        className="
          inline-flex items-center gap-2 rounded-xl
          border border-red-200/70 bg-white/70 px-4 py-2
          text-sm font-semibold text-red-700
          shadow-sm transition
          hover:bg-red-50
          dark:border-red-900/60 dark:bg-[#51101a]/70
          dark:text-red-200 dark:hover:bg-[#64131f]
        "
      >
        <ArrowLeft className="h-4 w-4" />
        {t.back}
      </Link>

      <section
        className="
          overflow-hidden rounded-3xl
          border border-red-200/70
          bg-gradient-to-br from-[#fff0f2] via-[#ffe0e5] to-[#ffd0d8]
          shadow-xl shadow-red-900/10
          dark:border-red-900/60
          dark:from-[#751a28] dark:via-[#64131f] dark:to-[#51101a]
        "
      >
        <div className="p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <div
                className="
                  flex h-20 w-20 shrink-0 items-center justify-center
                  overflow-hidden rounded-2xl
                  bg-gradient-to-br from-red-600 to-rose-500
                  text-white shadow-lg shadow-red-500/25
                "
              >
                {profile?.profileImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.profileImage}
                    alt={fullName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserCircle2 className="h-12 w-12" />
                )}
              </div>

              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700 dark:bg-red-950/50 dark:text-red-200">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {t.approvedMember}
                </div>

                <h1 className="text-2xl font-bold text-red-950 md:text-3xl dark:text-white">
                  {fullName}
                </h1>

                <p className="mt-1 text-sm font-medium text-red-700 dark:text-red-200">
                  {t.memberId}: #{member.memberNumber}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-3 md:items-end">
              <div className="flex items-center gap-2 text-sm text-red-800 dark:text-red-100">
                <CalendarDays className="h-4 w-4" />
                <span>
                  {t.memberSince}: {formatDate(member.createdAt, locale)}
                </span>
              </div>

              <MemberContactRequestButton
                locale={locale}
                memberNumber={member.memberNumber}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div
          className="
            rounded-2xl border border-red-200/70
            bg-gradient-to-br from-[#fff0f2] to-[#ffd0d8]
            p-6 shadow-lg shadow-red-900/5
            dark:border-red-900/60
            dark:from-[#751a28] dark:to-[#51101a]
          "
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-xl bg-red-100 p-2.5 text-red-700 dark:bg-red-950/60 dark:text-red-200">
              <BriefcaseBusiness className="h-5 w-5" />
            </div>

            <h2 className="font-bold text-red-950 dark:text-white">
              {t.profession}
            </h2>
          </div>

          <p className="text-sm text-red-800 dark:text-red-100">
            {profile?.profession || profile?.occupation || "—"}
          </p>
        </div>

        <div
          className="
            rounded-2xl border border-red-200/70
            bg-gradient-to-br from-[#fff0f2] to-[#ffd0d8]
            p-6 shadow-lg shadow-red-900/5
            dark:border-red-900/60
            dark:from-[#751a28] dark:to-[#51101a]
          "
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-xl bg-red-100 p-2.5 text-red-700 dark:bg-red-950/60 dark:text-red-200">
              <GraduationCap className="h-5 w-5" />
            </div>

            <h2 className="font-bold text-red-950 dark:text-white">
              {t.education}
            </h2>
          </div>

          <p className="text-sm text-red-800 dark:text-red-100">
            {profile?.education || "—"}
          </p>
        </div>

        <div
          className="
            rounded-2xl border border-red-200/70
            bg-gradient-to-br from-[#fff0f2] to-[#ffd0d8]
            p-6 shadow-lg shadow-red-900/5
            dark:border-red-900/60
            dark:from-[#751a28] dark:to-[#51101a]
          "
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-xl bg-red-100 p-2.5 text-red-700 dark:bg-red-950/60 dark:text-red-200">
              <MapPin className="h-5 w-5" />
            </div>

            <h2 className="font-bold text-red-950 dark:text-white">
              {t.location}
            </h2>
          </div>

          <p className="text-sm text-red-800 dark:text-red-100">
            {location || "—"}
          </p>

          {profile?.country && (
            <p className="mt-2 text-xs text-red-600 dark:text-red-300">
              {t.country}: {profile.country}
            </p>
          )}
        </div>
      </section>

      <section
        className="
          rounded-2xl border border-red-200/70
          bg-gradient-to-br from-[#fff0f2] via-[#ffe0e5] to-[#ffd0d8]
          p-6 shadow-lg shadow-red-900/5
          dark:border-red-900/60
          dark:from-[#751a28] dark:via-[#64131f] dark:to-[#51101a]
        "
      >
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-red-100 p-2.5 text-red-700 dark:bg-red-950/60 dark:text-red-200">
            <Heart className="h-5 w-5" />
          </div>

          <div className="flex-1">
            <h2 className="font-bold text-red-950 dark:text-white">
              {t.contactSection}
            </h2>

            <p className="mt-2 text-sm leading-6 text-red-800 dark:text-red-100">
              {t.privacyText}
            </p>
          </div>
        </div>
      </section>

      {!profile && (
        <div
          className="
            rounded-2xl border border-amber-300/70
            bg-amber-50/80 p-5 text-sm text-amber-900
            dark:border-amber-900/60 dark:bg-amber-950/30
            dark:text-amber-100
          "
        >
          {t.profileNotAvailable}
        </div>
      )}
    </div>
  );
}