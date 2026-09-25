import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { isValidLocale, type Locale } from "@/i18n/config";

export const dynamic = "force-dynamic";

const text: Record<Locale, Record<string, string>> = {
  en: {
    back: "\u2190 Back to Members",
    personal: "Personal Information",
    contact: "Contact Information",
    education: "Education & Profession",
    membership: "Membership Information",
    firstName: "First Name",
    lastName: "Last Name",
    gender: "Gender",
    dob: "Date of Birth",
    gotra: "Gotra",
    email: "Email",
    phone: "Phone",
    address: "Address",
    city: "City",
    state: "State",
    country: "Country",
    pincode: "Pincode",
    educationValue: "Education",
    occupation: "Occupation",
    profession: "Profession",
    membershipId: "Membership ID",
    memberNumber: "Member Number",
    registrationDate: "Registration Date",
    accountStatus: "Account Status",
    notProvided: "Not provided",
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    blocked: "Blocked",
  },

  hi: {
    back: "\u2190 सदस्यों पर वापस जाएँ",
    personal: "व्यक्तिगत जानकारी",
    contact: "संपर्क जानकारी",
    education: "शिक्षा और व्यवसाय",
    membership: "सदस्यता जानकारी",
    firstName: "पहला नाम",
    lastName: "उपनाम",
    gender: "लिंग",
    dob: "जन्म तिथि",
    gotra: "गोत्र",
    email: "ईमेल",
    phone: "फोन",
    address: "पता",
    city: "शहर",
    state: "राज्य",
    country: "देश",
    pincode: "पिनकोड",
    educationValue: "शिक्षा",
    occupation: "व्यवसाय",
    profession: "पेशा",
    membershipId: "सदस्यता आईडी",
    memberNumber: "सदस्य संख्या",
    registrationDate: "पंजीकरण तिथि",
    accountStatus: "खाता स्थिति",
    notProvided: "उपलब्ध नहीं",
    pending: "लंबित",
    approved: "अनुमोदित",
    rejected: "अस्वीकृत",
    blocked: "ब्लॉक",
  },

  gu: {
    back: "\u2190 સભ્યો પર પાછા જાઓ",
    personal: "\u0ab5\u0acd\u0aaf\u0a95\u0acd\u0aa4\u0abf\u0a97\u0aa4 \u0aae\u0abe\u0ab9\u0abf\u0aa4\u0ac0",
    contact: "\u0ab8\u0a82\u0aaa\u0ab0\u0acd\u0a95 \u0aae\u0abe\u0ab9\u0abf\u0aa4\u0ac0",
    education: "\u0ab6\u0abf\u0a95\u0acd\u0ab7\u0aa3 \u0a85\u0aa8\u0ac7 \u0ab5\u0acd\u0aaf\u0ab5\u0ab8\u0abe\u0aaf",
    membership: "\u0ab8\u0aad\u0acd\u0aaf\u0aaa\u0aa6\u0aa8\u0ac0 \u0aae\u0abe\u0ab9\u0abf\u0aa4\u0ac0",
    firstName: "\u0aaa\u0acd\u0ab0\u0aa5\u0aae \u0aa8\u0abe\u0aae",
    lastName: "\u0a85\u0a9f\u0a95",
    gender: "\u0ab2\u0abf\u0a82\u0a97",
    dob: "\u0a9c\u0aa8\u0acd\u0aae \u0aa4\u0abe\u0ab0\u0ac0\u0a96",
    gotra: "\u0a97\u0acb\u0aa4\u0acd\u0ab0",
    email: "\u0a88\u0aae\u0ac7\u0ab2",
    phone: "\u0aab\u0acb\u0aa8",
    address: "\u0ab8\u0ab0\u0aa8\u0abe\u0aae\u0ac1\u0a82",
    city: "\u0ab6\u0ab9\u0ac7\u0ab0",
    state: "\u0ab0\u0abe\u0a9c\u0acd\u0aaf",
    country: "\u0aa6\u0ac7\u0ab6",
    pincode: "\u0aaa\u0abf\u0aa8\u0a95\u0acb\u0aa1",
    educationValue: "\u0ab6\u0abf\u0a95\u0acd\u0ab7\u0aa3",
    occupation: "\u0ab5\u0acd\u0aaf\u0ab5\u0ab8\u0abe\u0aaf",
    profession: "\u0aaa\u0acd\u0ab0\u0acb\u0aab\u0ac7\u0ab6\u0aa8",
    membershipId: "\u0ab8\u0aad\u0acd\u0aaf\u0aaa\u0aa6 ID",
    memberNumber: "\u0ab8\u0aad\u0acd\u0aaf \u0aa8\u0a82\u0aac\u0ab0",
    registrationDate: "\u0aa8\u0acb\u0a82\u0aa7\u0aa3\u0ac0 \u0aa4\u0abe\u0ab0\u0ac0\u0a96",
    accountStatus: "\u0a8f\u0a95\u0abe\u0a89\u0aa8\u0acd\u0a9f \u0ab8\u0acd\u0aa5\u0abf\u0aa4\u0abf",
    notProvided: "\u0a86\u0aaa\u0ab5\u0abe\u0aae\u0abe\u0a82 \u0a86\u0ab5\u0acd\u0aaf\u0ac1\u0a82 \u0aa8\u0aa5\u0ac0",
    pending: "\u0aac\u0abe\u0a95\u0ac0",
    approved: "\u0aae\u0a82\u0a9c\u0ac2\u0ab0",
    rejected: "\u0aa8\u0abe\u0aae\u0a82\u0a9c\u0ac2\u0ab0",
    blocked: "\u0aac\u0acd\u0ab2\u0acb\u0a95",
  },
};

export default async function MemberDetailsPage({
  params,
}: {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}) {
  const { locale, id } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const currentLocale: Locale = locale;
  const t = text[currentLocale];

  const session = await auth();

  const role = session?.user?.role
    ? String(session.user.role)
    : "";

  if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
    redirect(`/${currentLocale}/unauthorized`);
  }

  const member = await prisma.user.findUnique({
    where: { id },
    include: {
      memberProfile: true,
    },
  });

  if (!member || member.role !== "MEMBER") {
    notFound();
  }

  const profile = member.memberProfile;

  const membershipId = `ASK-${member.createdAt.getFullYear()}-${String(
    member.memberNumber
  ).padStart(6, "0")}`;

  const fullName =
    [profile?.firstName, profile?.lastName]
      .filter(Boolean)
      .join(" ") || "Unnamed Member";

  const statusText =
    member.status === "APPROVED"
      ? t.approved
      : member.status === "PENDING"
        ? t.pending
        : member.status === "BLOCKED"
          ? t.blocked
          : t.rejected;

  const dateLocale =
    currentLocale === "gu"
      ? "gu-IN"
      : currentLocale === "hi"
        ? "hi-IN"
        : "en-IN";

  return (
    <div className="mx-auto max-w-6xl">

      <Link
        href={`/${currentLocale}/admin/members`}
        className="mb-6 inline-flex text-sm font-semibold text-red-700 hover:text-red-900"
      >
        {t.back}
      </Link>

      <div className="mb-6 flex flex-col justify-between gap-4 rounded-xl bg-white p-6 shadow-sm md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {fullName}
          </h1>

          <p className="mt-1 font-semibold text-red-700">
            {membershipId}
          </p>
        </div>

        <span
          className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-bold ${
            member.status === "APPROVED"
              ? "bg-green-100 text-green-700"
              : member.status === "PENDING"
                ? "bg-orange-100 text-orange-700"
                : member.status === "BLOCKED"
                  ? "bg-gray-200 text-gray-700"
                  : "bg-red-100 text-red-700"
          }`}
        >
          {statusText}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 border-b pb-3 text-xl font-bold text-gray-900">
            {t.personal}
          </h2>

          <div className="space-y-4">
            <Info label={t.firstName} value={profile?.firstName} empty={t.notProvided} />
            <Info label={t.lastName} value={profile?.lastName} empty={t.notProvided} />
            <Info label={t.gender} value={profile?.gender} empty={t.notProvided} />

            <Info
              label={t.dob}
              value={
                profile?.dateOfBirth
                  ? profile.dateOfBirth.toLocaleDateString(dateLocale)
                  : null
              }
              empty={t.notProvided}
            />

            <Info label={t.gotra} value={profile?.gotra} empty={t.notProvided} />
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 border-b pb-3 text-xl font-bold text-gray-900">
            {t.contact}
          </h2>

          <div className="space-y-4">
            <Info label={t.email} value={member.email} empty={t.notProvided} />
            <Info label={t.phone} value={profile?.phone} empty={t.notProvided} />
            <Info label={t.address} value={profile?.address} empty={t.notProvided} />
            <Info label={t.city} value={profile?.city} empty={t.notProvided} />
            <Info label={t.state} value={profile?.state} empty={t.notProvided} />
            <Info label={t.country} value={profile?.country} empty={t.notProvided} />
            <Info label={t.pincode} value={profile?.pincode} empty={t.notProvided} />
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 border-b pb-3 text-xl font-bold text-gray-900">
            {t.education}
          </h2>

          <div className="space-y-4">
            <Info label={t.educationValue} value={profile?.education} empty={t.notProvided} />
            <Info label={t.occupation} value={profile?.occupation} empty={t.notProvided} />
            <Info label={t.profession} value={profile?.profession} empty={t.notProvided} />
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 border-b pb-3 text-xl font-bold text-gray-900">
            {t.membership}
          </h2>

          <div className="space-y-4">
            <Info label={t.membershipId} value={membershipId} empty={t.notProvided} />
            <Info
              label={t.memberNumber}
              value={String(member.memberNumber)}
              empty={t.notProvided}
            />

            <Info
              label={t.registrationDate}
              value={member.createdAt.toLocaleDateString(dateLocale)}
              empty={t.notProvided}
            />

            <Info
              label={t.accountStatus}
              value={statusText}
              empty={t.notProvided}
            />
          </div>
        </section>

      </div>
    </div>
  );
}

function Info({
  label,
  value,
  empty,
}: {
  label: string;
  value?: string | null;
  empty: string;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-gray-800">
        {value || empty}
      </p>
    </div>
  );
}