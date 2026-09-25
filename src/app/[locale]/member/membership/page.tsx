import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import MembershipQRCode from "@/components/member/MembershipQRCode";
import PrintableMembershipCard from "@/components/member/PrintableMembershipCard";

type Locale = "en" | "hi" | "gu";

const translations = {
  en: {
    pageTitle: "My Membership",
    pageSubtitle: "View your community membership information and status.",
    membershipStatus: "Membership Status",
    memberSince: "Member Since",
    memberId: "Member ID",
    membershipCard: "Membership Card",
    membershipCardSubtitle: "Your digital community membership card.",
    communityMembership: "Community Membership",
    memberName: "MEMBER NAME",
    status: "STATUS",
    memberSinceCard: "MEMBER SINCE",
    scanToVerify: "Scan to Verify",
    membershipInformation: "Membership Information",
    fullName: "Full Name",
    emailAddress: "Email Address",
    phoneNumber: "Phone Number",
    gender: "Gender",
    dateOfBirth: "Date of Birth",
    gotra: "Gotra",
    education: "Education",
    occupation: "Occupation",
    profession: "Profession",
    city: "City",
    state: "State",
    country: "Country",
    pincode: "Pincode",
    address: "Address",
    notProvided: "Not provided",
    communityMember: "Community Member",
    approved: "Approved",
    pending: "Pending",
    blocked: "Blocked",
  },

  hi: {
    pageTitle: "\u092e\u0947\u0930\u0940 \u0938\u0926\u0938\u094d\u092f\u0924\u093e",
    pageSubtitle:
      "\u0905\u092a\u0928\u0940 \u0938\u092e\u0941\u0926\u093e\u092f\u093f\u0915 \u0938\u0926\u0938\u094d\u092f\u0924\u093e \u0915\u0940 \u091c\u093e\u0928\u0915\u093e\u0930\u0940 \u0914\u0930 \u0938\u094d\u0925\u093f\u0924\u093f \u0926\u0947\u0916\u0947\u0902\u0964",
    membershipStatus: "\u0938\u0926\u0938\u094d\u092f\u0924\u093e \u0915\u0940 \u0938\u094d\u0925\u093f\u0924\u093f",
    memberSince: "\u0938\u0926\u0938\u094d\u092f \u092c\u0928\u0928\u0947 \u0915\u0940 \u0924\u093e\u0930\u0940\u0916",
    memberId: "\u0938\u0926\u0938\u094d\u092f \u0906\u0908\u0921\u0940",
    membershipCard: "\u0938\u0926\u0938\u094d\u092f\u0924\u093e \u0915\u093e\u0930\u094d\u0921",
    membershipCardSubtitle:
      "\u0906\u092a\u0915\u093e \u0921\u093f\u091c\u093f\u091f\u0932 \u0938\u092e\u0941\u0926\u093e\u092f\u093f\u0915 \u0938\u0926\u0938\u094d\u092f\u0924\u093e \u0915\u093e\u0930\u094d\u0921\u0964",
    communityMembership: "\u0938\u092e\u0941\u0926\u093e\u092f\u093f\u0915 \u0938\u0926\u0938\u094d\u092f\u0924\u093e",
    memberName: "\u0938\u0926\u0938\u094d\u092f \u0915\u093e \u0928\u093e\u092e",
    status: "\u0938\u094d\u0925\u093f\u0924\u093f",
    memberSinceCard: "\u0938\u0926\u0938\u094d\u092f \u092c\u0928\u0928\u0947 \u0915\u0940 \u0924\u093e\u0930\u0940\u0916",
    scanToVerify: "\u0938\u0924\u094d\u092f\u093e\u092a\u0928 \u0915\u0947 \u0932\u093f\u090f \u0938\u094d\u0915\u0948\u0928 \u0915\u0930\u0947\u0902",
    membershipInformation:
      "\u0938\u0926\u0938\u094d\u092f\u0924\u093e \u0915\u0940 \u091c\u093e\u0928\u0915\u093e\u0930\u0940",
    fullName: "\u092a\u0942\u0930\u093e \u0928\u093e\u092e",
    emailAddress: "\u0908\u092e\u0947\u0932 \u092a\u0924\u093e",
    phoneNumber: "\u092b\u094b\u0928 \u0928\u0902\u092c\u0930",
    gender: "\u0932\u093f\u0902\u0917",
    dateOfBirth: "\u091c\u0928\u094d\u092e \u0924\u093f\u0925\u093f",
    gotra: "\u0917\u094b\u0924\u094d\u0930",
    education: "\u0936\u093f\u0915\u094d\u0937\u093e",
    occupation: "\u0935\u094d\u092f\u0935\u0938\u093e\u092f",
    profession: "\u092a\u0947\u0936\u093e",
    city: "\u0936\u0939\u0930",
    state: "\u0930\u093e\u091c\u094d\u092f",
    country: "\u0926\u0947\u0936",
    pincode: "\u092a\u093f\u0928\u0915\u094b\u0921",
    address: "\u092a\u0924\u093e",
    notProvided: "\u0909\u092a\u0932\u092c\u094d\u0927 \u0928\u0939\u0940\u0902",
    communityMember: "\u0938\u092e\u0941\u0926\u093e\u092f \u0938\u0926\u0938\u094d\u092f",
    approved: "\u0938\u094d\u0935\u0940\u0915\u0943\u0924",
    pending: "\u0932\u0902\u092c\u093f\u0924",
    blocked: "\u092c\u094d\u0932\u0949\u0915",
  },

  gu: {
    pageTitle: "\u0aae\u0abe\u0ab0\u0ac0 \u0ab8\u0aad\u0acd\u0aaf\u0aa4\u0abe",
    pageSubtitle:
      "\u0aa4\u0aae\u0abe\u0ab0\u0ac0 \u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0abf\u0a95 \u0ab8\u0aad\u0acd\u0aaf\u0aa4\u0abe\u0aa8\u0ac0 \u0aae\u0abe\u0ab9\u0abf\u0aa4\u0ac0 \u0a85\u0aa8\u0ac7 \u0ab8\u0acd\u0aa5\u0abf\u0aa4\u0abf \u0a9c\u0acb\u0ab5\u0acb.",
    membershipStatus:
      "\u0ab8\u0aad\u0acd\u0aaf\u0aa4\u0abe\u0aa8\u0ac0 \u0ab8\u0acd\u0aa5\u0abf\u0aa4\u0abf",
    memberSince:
      "\u0ab8\u0aad\u0acd\u0aaf \u0aac\u0aa8\u0acd\u0aaf\u0abe\u0aa8\u0ac0 \u0aa4\u0abe\u0ab0\u0ac0\u0a96",
    memberId: "\u0ab8\u0aad\u0acd\u0aaf \u0a86\u0a88\u0aa1\u0ac0",
    membershipCard: "\u0ab8\u0aad\u0acd\u0aaf\u0aa4\u0abe \u0a95\u0abe\u0ab0\u0acd\u0aa1",
    membershipCardSubtitle:
      "\u0aa4\u0aae\u0abe\u0ab0\u0ac1\u0a82 \u0aa1\u0abf\u0a9c\u0abf\u0a9f\u0ab2 \u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0abf\u0a95 \u0ab8\u0aad\u0acd\u0aaf\u0aa4\u0abe \u0a95\u0abe\u0ab0\u0acd\u0aa1.",
    communityMembership:
      "\u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0abf\u0a95 \u0ab8\u0aad\u0acd\u0aaf\u0aa4\u0abe",
    memberName: "\u0ab8\u0aad\u0acd\u0aaf\u0aa8\u0ac1\u0a82 \u0aa8\u0abe\u0aae",
    status: "\u0ab8\u0acd\u0aa5\u0abf\u0aa4\u0abf",
    memberSinceCard:
      "\u0ab8\u0aad\u0acd\u0aaf \u0aac\u0aa8\u0acd\u0aaf\u0abe\u0aa8\u0ac0 \u0aa4\u0abe\u0ab0\u0ac0\u0a96",
    scanToVerify:
      "\u0a96\u0ab0\u0abe\u0a88 \u0a95\u0ab0\u0ab5\u0abe \u0aae\u0abe\u0a9f\u0ac7 \u0ab8\u0acd\u0a95\u0ac7\u0aa8 \u0a95\u0ab0\u0acb",
    membershipInformation:
      "\u0ab8\u0aad\u0acd\u0aaf\u0aa4\u0abe\u0aa8\u0ac0 \u0aae\u0abe\u0ab9\u0abf\u0aa4\u0ac0",
    fullName: "\u0aaa\u0ac2\u0ab0\u0acd\u0aa3 \u0aa8\u0abe\u0aae",
    emailAddress: "\u0a88\u0aae\u0ac7\u0ab2 \u0a8d\u0aa1\u0acd\u0ab0\u0ac7\u0ab8",
    phoneNumber: "\u0aab\u0acb\u0aa8 \u0aa8\u0a82\u0aac\u0ab0",
    gender: "\u0ab2\u0abf\u0a82\u0a97",
    dateOfBirth: "\u0a9c\u0aa8\u0acd\u0aae \u0aa4\u0abe\u0ab0\u0ac0\u0a96",
    gotra: "\u0a97\u0acb\u0aa4\u0acd\u0ab0",
    education: "\u0ab6\u0abf\u0a95\u0acd\u0ab7\u0aa3",
    occupation: "\u0ab5\u0acd\u0aaf\u0ab5\u0ab8\u0abe\u0aaf",
    profession: "\u0aaa\u0ac7\u0ab6\u0acb",
    city: "\u0ab6\u0ab9\u0ac7\u0ab0",
    state: "\u0ab0\u0abe\u0a9c\u0acd\u0aaf",
    country: "\u0aa6\u0ac7\u0ab6",
    pincode: "\u0aaa\u0abf\u0aa8\u0a95\u0acb\u0aa1",
    address: "\u0ab8\u0ab0\u0aa8\u0abe\u0aae\u0ac1\u0a82",
    notProvided: "\u0a89\u0aaa\u0ab2\u0aac\u0acd\u0aa7 \u0aa8\u0aa5\u0ac0",
    communityMember:
      "\u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0aa8\u0acb \u0ab8\u0aad\u0acd\u0aaf",
    approved: "\u0aae\u0a82\u0a9c\u0ac2\u0ab0",
    pending: "\u0aac\u0abe\u0a95\u0ac0",
    blocked: "\u0aac\u0acd\u0ab2\u0acb\u0a95",
  },
} as const;

function normalizeLocale(value: string): Locale {
  if (value === "hi" || value === "gu") {
    return value;
  }

  return "en";
}

function translateStatus(status: string, locale: Locale) {
  const t = translations[locale];

  switch (status) {
    case "APPROVED":
      return t.approved;
    case "PENDING":
      return t.pending;
    case "BLOCKED":
      return t.blocked;
    default:
      return status;
  }
}

export default async function MembershipPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = normalizeLocale(localeParam);
  const t = translations[locale];

  const session = await auth();

  if (!session?.user?.email) {
    redirect(`/${locale}/login`);
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      memberNumber: true,
    },
  });

  if (!user) {
    redirect(`/${locale}/login`);
  }

  if (user.role !== "MEMBER") {
    redirect(`/${locale}/unauthorized`);
  }

  const profile = await prisma.memberProfile.findUnique({
    where: {
      userId: user.id,
    },
  });

  const memberName =
    `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim() ||
    t.communityMember;

  const initials =
    memberName
      .split(" ")
      .filter(Boolean)
      .map((name) => name.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase() || "MC";

  const status = user.status;

  const dateLocale = {
    en: "en-IN",
    hi: "hi-IN",
    gu: "gu-IN",
  } as const;

  const memberSince = user.createdAt.toLocaleDateString(
    dateLocale[locale],
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );

  const memberId = `ASK-${user.createdAt.getFullYear()}-${String(
    user.memberNumber
  ).padStart(6, "0")}`;

  const memberNumber = user.memberNumber;

  const dateOfBirth = profile?.dateOfBirth
    ? profile.dateOfBirth.toLocaleDateString(
        dateLocale[locale],
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      )
    : t.notProvided;

  return (
    <div className="mx-auto max-w-7xl">
      {/* PAGE HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t.pageTitle}
        </h1>

        <p className="mt-1 text-red-900/80 dark:text-red-100/75">
          {t.pageSubtitle}
        </p>
      </div>

      {/* MEMBERSHIP SUMMARY */}
      <div
        className="
          mb-6 rounded-2xl border border-red-300/80
          bg-gradient-to-br from-[#FFF8DF] via-[#ffd2da] to-[#ffc4ce]
          p-6 shadow-sm transition-all duration-300
          hover:border-red-400
          hover:shadow-[0_18px_40px_rgba(190,24,93,0.12)]
          dark:border-red-400/40
          dark:from-[#68131f] dark:via-[#570e18] dark:to-[#410810]
          dark:hover:border-red-300/60
          dark:hover:shadow-[0_18px_40px_rgba(248,113,113,0.14)]
        "
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* STATUS */}
          <div>
            <p className="mb-2 text-sm text-red-900/70 dark:text-red-100/70">
              {t.membershipStatus}
            </p>

            <span
              className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-bold ${
                status === "APPROVED"
                  ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                  : status === "PENDING"
                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300"
                  : status === "BLOCKED"
                  ? "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-300"
              }`}
            >
              {translateStatus(status, locale)}
            </span>
          </div>

          {/* MEMBER SINCE */}
          <div>
            <p className="mb-2 text-sm text-red-900/70 dark:text-red-100/70">
              {t.memberSince}
            </p>

            <p className="font-bold text-gray-900 dark:text-white">
              {memberSince}
            </p>
          </div>

          {/* MEMBER ID */}
          <div>
            <p className="mb-2 text-sm text-red-900/70 dark:text-red-100/70">
              {t.memberId}
            </p>

            <p className="break-all font-mono font-bold text-gray-900 dark:text-white">
              {memberId}
            </p>
          </div>
        </div>
      </div>

      {/* MEMBERSHIP CARD SECTION */}
      <div
        className="
          mb-6 rounded-2xl border border-red-300/80
          bg-gradient-to-br from-[#FFF8DF] via-[#ffd2da] to-[#ffc4ce]
          p-6 shadow-sm transition-all duration-300
          hover:border-red-400
          hover:shadow-[0_18px_40px_rgba(190,24,93,0.12)]
          dark:border-red-400/40
          dark:from-[#68131f] dark:via-[#570e18] dark:to-[#410810]
          dark:hover:border-red-300/60
          dark:hover:shadow-[0_18px_40px_rgba(248,113,113,0.14)]
        "
      >
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t.membershipCard}
            </h2>

            <p className="mt-1 text-sm text-red-900/70 dark:text-red-100/70">
              {t.membershipCardSubtitle}
            </p>
          </div>

          <PrintableMembershipCard
            memberName={memberName}
            memberNumber={memberNumber}
            status={status}
            memberSince={memberSince}
            profileImage={profile?.profileImage}
          />
        </div>

        {/* DIGITAL CARD */}
        <div className="flex justify-center sm:justify-start">
          <div
            className="member-membership-card 
              w-full max-w-[680px] rounded-2xl
              bg-gradient-to-br from-[#991b2f] via-[#7f1726] to-[#5b0b18]
              p-6 text-white shadow-xl
              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-[0_20px_45px_rgba(127,23,38,0.35)]
            "
          >
            {/* CARD HEADER */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm tracking-wide text-red-200">
                  AHICHCHATRA SANSKAR KENDRA
                </p>

                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                  {t.communityMembership}
                </h2>
              </div>

              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-white text-lg font-bold text-red-800 shadow-md">
                ASK
              </div>
            </div>

            {/* MEMBER INFORMATION */}
            <div className="mt-7 flex items-center gap-5">
              {profile?.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt={memberName}
                  className="h-20 w-20 flex-shrink-0 rounded-xl border-2 border-white object-cover shadow-md"
                />
              ) : (
                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-xl bg-white text-2xl font-bold text-red-800 shadow-md">
                  {initials}
                </div>
              )}

              <div className="min-w-0">
                <p className="text-xs text-red-200">
                  {t.memberName}
                </p>

                <p className="truncate text-xl font-bold">
                  {memberName}
                </p>

                <p className="mt-3 text-xs text-red-200">
                  {t.memberId}
                </p>

                <p className="break-all font-mono text-sm font-semibold sm:text-base">
                  {memberId}
                </p>
              </div>
            </div>

            {/* CARD FOOTER */}
            <div className="mt-7 flex items-end justify-between gap-5 border-t border-red-400/30 pt-5">
              <div>
                <p className="text-xs text-red-200">
                  {t.status}
                </p>

                <p className="font-bold">
                  {translateStatus(status, locale)}
                </p>

                <p className="mt-3 text-xs text-red-200">
                  {t.memberSinceCard}
                </p>

                <p className="font-semibold">
                  {memberSince}
                </p>
              </div>

              <div className="flex-shrink-0 text-center">
                <MembershipQRCode
                  memberNumber={memberNumber}
                />

                <p className="mt-1 text-[9px] text-red-200">
                  {t.scanToVerify}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MEMBERSHIP INFORMATION */}
      <div
        className="
          rounded-2xl border border-red-300/80
          bg-gradient-to-br from-[#FFF8DF] via-[#ffd2da] to-[#ffc4ce]
          p-6 shadow-sm transition-all duration-300
          hover:border-red-400
          hover:shadow-[0_18px_40px_rgba(190,24,93,0.12)]
          dark:border-red-400/40
          dark:from-[#68131f] dark:via-[#570e18] dark:to-[#410810]
          dark:hover:border-red-300/60
          dark:hover:shadow-[0_18px_40px_rgba(248,113,113,0.14)]
        "
      >
        <h2 className="mb-5 text-xl font-bold text-gray-900 dark:text-white">
          {t.membershipInformation}
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <InfoField
            label={t.fullName}
            value={memberName}
          />

          <InfoField
            label={t.emailAddress}
            value={user.email}
          />

          <InfoField
            label={t.phoneNumber}
            value={profile?.phone || t.notProvided}
          />

          <InfoField
            label={t.gender}
            value={profile?.gender || t.notProvided}
          />

          <InfoField
            label={t.dateOfBirth}
            value={dateOfBirth}
          />

          <InfoField
            label={t.gotra}
            value={profile?.gotra || t.notProvided}
          />

          <InfoField
            label={t.education}
            value={profile?.education || t.notProvided}
          />

          <InfoField
            label={t.occupation}
            value={profile?.occupation || t.notProvided}
          />

          <InfoField
            label={t.profession}
            value={profile?.profession || t.notProvided}
          />

          <InfoField
            label={t.city}
            value={profile?.city || t.notProvided}
          />

          <InfoField
            label={t.state}
            value={profile?.state || t.notProvided}
          />

          <InfoField
            label={t.country}
            value={profile?.country || "India"}
          />

          <InfoField
            label={t.pincode}
            value={profile?.pincode || t.notProvided}
          />

          <div className="md:col-span-2">
            <InfoField
              label={t.address}
              value={profile?.address || t.notProvided}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* INFORMATION FIELD                                                          */
/* -------------------------------------------------------------------------- */

function InfoField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        group rounded-xl border border-red-200/80
        bg-gradient-to-br from-[#FFFDF2] via-[#FFF8DF] to-[#FFF3C9]
        p-4 shadow-sm transition-all duration-300
        hover:-translate-y-1 hover:border-red-500
        hover:from-[#FFE7AC] hover:via-[#FFD96A] hover:to-[#E8B52B]
        hover:shadow-[0_12px_25px_rgba(190,24,93,0.20)]
        dark:border-red-300/25
        dark:from-[#5c111b] dark:via-[#4e0d16] dark:to-[#420910]
        dark:hover:border-red-300/70 dark:hover:from-[#79202e]
        dark:hover:via-[#681622] dark:hover:to-[#54101a]
      "
    >
      <p className="text-xs font-medium uppercase tracking-wide text-red-900/60 dark:text-red-100/60">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-semibold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}