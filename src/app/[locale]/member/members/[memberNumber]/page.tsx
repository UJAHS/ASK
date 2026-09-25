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
    back: "à¤¸à¤¦à¤¸à¥à¤¯ à¤¨à¤¿à¤°à¥à¤¦à¥‡à¤¶à¤¿à¤•à¤¾ à¤ªà¤° à¤µà¤¾à¤ªà¤¸ à¤œà¤¾à¤à¤‚",
    communityProfile: "à¤¸à¤¾à¤®à¥à¤¦à¤¾à¤¯à¤¿à¤• à¤ªà¥à¤°à¥‹à¤«à¤¼à¤¾à¤‡à¤²",
    memberId: "à¤¸à¤¦à¤¸à¥à¤¯ à¤†à¤ˆà¤¡à¥€",
    memberSince: "à¤¸à¤¦à¤¸à¥à¤¯ à¤¬à¤¨à¥‡",
    profession: "à¤µà¥à¤¯à¤µà¤¸à¤¾à¤¯",
    education: "à¤¶à¤¿à¤•à¥à¤·à¤¾",
    location: "à¤¸à¥à¤¥à¤¾à¤¨",
    country: "à¤¦à¥‡à¤¶",
    profileNotAvailable: "à¤ªà¥à¤°à¥‹à¤«à¤¼à¤¾à¤‡à¤² à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤‰à¤ªà¤²à¤¬à¥à¤§ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆà¥¤",
    privacyTitle: "à¤—à¥‹à¤ªà¤¨à¥€à¤¯à¤¤à¤¾ à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤",
    privacyText:
      "à¤µà¥à¤¯à¤•à¥à¤¤à¤¿à¤—à¤¤ à¤¸à¤‚à¤ªà¤°à¥à¤• à¤µà¤¿à¤µà¤°à¤£ à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤ à¤¹à¥ˆà¤‚à¥¤ à¤†à¤ª à¤‡à¤¸ à¤¸à¤¦à¤¸à¥à¤¯ à¤•à¥‹ à¤¸à¤‚à¤ªà¤°à¥à¤• à¤…à¤¨à¥à¤°à¥‹à¤§ à¤­à¥‡à¤œ à¤¸à¤•à¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤ à¤¸à¤‚à¤ªà¤°à¥à¤• à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤¸à¤¦à¤¸à¥à¤¯ à¤•à¥€ à¤—à¥‹à¤ªà¤¨à¥€à¤¯à¤¤à¤¾ à¤ªà¥à¤°à¤¾à¤¥à¤®à¤¿à¤•à¤¤à¤¾à¤“à¤‚ à¤•à¥‡ à¤…à¤¨à¥à¤¸à¤¾à¤° à¤¹à¥€ à¤¸à¤¾à¤à¤¾ à¤•à¥€ à¤œà¤¾à¤à¤—à¥€à¥¤",
    contactSection: "à¤¸à¤‚à¤ªà¤°à¥à¤•",
    approvedMember: "à¤¸à¥à¤µà¥€à¤•à¥ƒà¤¤ à¤¸à¤¦à¤¸à¥à¤¯",
    profile: "à¤ªà¥à¤°à¥‹à¤«à¤¼à¤¾à¤‡à¤²",
  },
  gu: {
    back: "àª¸àª­à«àª¯ àª¨àª¿àª°à«àª¦à«‡àª¶àª¿àª•àª¾ àªªàª° àªªàª¾àª›àª¾ àªœàª¾àª“",
    communityProfile: "àª¸àª®à«àª¦àª¾àª¯ àªªà«àª°à«‹àª«àª¾àª‡àª²",
    memberId: "àª¸àª­à«àª¯ àª†àªˆàª¡à«€",
    memberSince: "àª¸àª­à«àª¯ àª¬àª¨à«àª¯àª¾",
    profession: "àªµà«àª¯àªµàª¸àª¾àª¯",
    education: "àª¶àª¿àª•à«àª·àª£",
    location: "àª¸à«àª¥àª³",
    country: "àª¦à«‡àª¶",
    profileNotAvailable: "àªªà«àª°à«‹àª«àª¾àª‡àª² àª®àª¾àª¹àª¿àª¤à«€ àª‰àªªàª²àª¬à«àª§ àª¨àª¥à«€.",
    privacyTitle: "àª—à«‹àªªàª¨à«€àª¯àª¤àª¾ àª¸à«àª°àª•à«àª·àª¿àª¤",
    privacyText:
      "àªµà«àª¯àª•à«àª¤àª¿àª—àª¤ àª¸àª‚àªªàª°à«àª• àªµàª¿àª—àª¤à«‹ àª¸à«àª°àª•à«àª·àª¿àª¤ àª›à«‡. àª¤àª®à«‡ àª† àª¸àª­à«àª¯àª¨à«‡ àª¸àª‚àªªàª°à«àª• àªµàª¿àª¨àª‚àª¤à«€ àª®à«‹àª•àª²à«€ àª¶àª•à«‹ àª›à«‹. àª¸àª‚àªªàª°à«àª• àª®àª¾àª¹àª¿àª¤à«€ àª¸àª­à«àª¯àª¨à«€ àª—à«‹àªªàª¨à«€àª¯àª¤àª¾ àªªàª¸àª‚àª¦àª—à«€àª“ àª…àª¨à«àª¸àª¾àª° àªœ àª¶à«‡àª° àª•àª°àªµàª¾àª®àª¾àª‚ àª†àªµàª¶à«‡.",
    contactSection: "àª¸àª‚àªªàª°à«àª•",
    approvedMember: "àª®àª‚àªœà«‚àª° àª¸àª­à«àª¯",
    profile: "àªªà«àª°à«‹àª«àª¾àª‡àª²",
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
    return "â€”";
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
          bg-gradient-to-br from-[#FFFDF2] via-[#FFF6D8] to-[#FFEEC0]
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
            bg-gradient-to-br from-[#FFFDF2] to-[#FFEEC0]
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
            {profile?.profession || profile?.occupation || "â€”"}
          </p>
        </div>

        <div
          className="
            rounded-2xl border border-red-200/70
            bg-gradient-to-br from-[#FFFDF2] to-[#FFEEC0]
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
            {profile?.education || "â€”"}
          </p>
        </div>

        <div
          className="
            rounded-2xl border border-red-200/70
            bg-gradient-to-br from-[#FFFDF2] to-[#FFEEC0]
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
            {location || "â€”"}
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
          bg-gradient-to-br from-[#FFFDF2] via-[#FFF6D8] to-[#FFEEC0]
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