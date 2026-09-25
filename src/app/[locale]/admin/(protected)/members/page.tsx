import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import MembersTable from "@/components/admin/MembersTable";
import {
  isValidLocale,
  type Locale,
} from "@/i18n/config";

export const dynamic = "force-dynamic";

const translations: Record<
  Locale,
  {
    title: string;
    description: string;
    totalMembers: string;
    pendingApproval: string;
    approved: string;
    blocked: string;
  }
> = {
  en: {
    title: "Members",
    description:
      "Manage ASK Community members and membership approvals.",
    totalMembers: "Total Members",
    pendingApproval: "Pending Approval",
    approved: "Approved",
    blocked: "Blocked",
  },

  hi: {
    title: "सदस्य",
    description:
      "ASK समुदाय के सदस्यों और सदस्यता अनुमोदन का प्रबंधन करें।",
    totalMembers: "कुल सदस्य",
    pendingApproval: "लंबित अनुमोदन",
    approved: "अनुमोदित",
    blocked: "ब्लॉक",
  },

  gu: {
    title: "સભ્યો",
    description:
      "ASK સમુદાયના સભ્યો અને સભ્યપદની મંજૂરીનું સંચાલન કરો.",
    totalMembers: "કુલ સભ્યો",
    pendingApproval: "મંજૂરી બાકી",
    approved: "મંજૂર",
    blocked: "બ્લોક",
  },
};

export default async function MembersPage({
  params,
}: {
  params: Promise<{
    locale: string;
  }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const currentLocale: Locale = locale;
  const t = translations[currentLocale];

  const session = await auth();

  const role = session?.user
    ? String((session.user as { role?: string }).role || "")
    : "";

  const isAdmin =
    role === "ADMIN" ||
    role === "SUPER_ADMIN";

  if (!isAdmin) {
    redirect(`/${currentLocale}/unauthorized`);
  }

  const members = await prisma.user.findMany({
    where: {
      role: "MEMBER",
    },
    include: {
      memberProfile: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalMembers = members.length;

  const pendingMembers = members.filter(
    (member) =>
      member.status === "PENDING"
  ).length;

  const approvedMembers = members.filter(
    (member) =>
      member.status === "APPROVED"
  ).length;

  const blockedMembers = members.filter(
    (member) =>
      member.status === "BLOCKED"
  ).length;

  const tableMembers = members.map(
    (member) => ({
      id: member.id,
      memberNumber: member.memberNumber,
      email: member.email,
      role: member.role,
      status: member.status,
      createdAt:
        member.createdAt.toISOString(),
      profile: member.memberProfile,
    })
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1
          className="
            text-3xl
            font-bold
            tracking-tight
            text-red-950
            dark:text-white
          "
        >
          {t.title}
        </h1>

        <p
          className="
            mt-2
            text-sm
            text-red-800/80
            dark:text-red-100/80
          "
        >
          {t.description}
        </p>

        <div
          className="
            mt-3
            h-1
            w-16
            rounded-full
            bg-gradient-to-r
            from-red-700
            to-pink-500
            dark:from-red-400
            dark:to-pink-300
          "
        />
      </div>

      {/* Statistics */}
      <div
        className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        {/* Total Members */}
        <div
          className="
            rounded-2xl
            border
            border-red-200/70
            bg-gradient-to-br
            from-[#fff0f2]
            via-[#ffe0e5]
            to-[#ffd0d8]
            p-5
            shadow-lg
            shadow-red-950/5
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-red-300
            hover:shadow-xl
            dark:border-red-400/20
            dark:from-[#751a28]
            dark:via-[#64131f]
            dark:to-[#51101a]
            dark:shadow-black/20
            dark:hover:border-red-300/40
            dark:hover:from-[#842033]
            dark:hover:via-[#701622]
            dark:hover:to-[#5b111c]
          "
        >
          <p
            className="
              text-sm
              font-medium
              text-red-700
              dark:text-red-100
            "
          >
            {t.totalMembers}
          </p>

          <p
            className="
              mt-2
              text-3xl
              font-bold
              text-red-950
              dark:text-white
            "
          >
            {totalMembers}
          </p>
        </div>

        {/* Pending Approval */}
        <div
          className="
            rounded-2xl
            border
            border-orange-200/80
            bg-gradient-to-br
            from-[#fff3e8]
            via-[#ffe7d6]
            to-[#ffd8c2]
            p-5
            shadow-lg
            shadow-orange-950/5
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-orange-300
            hover:shadow-xl
            dark:border-orange-400/20
            dark:from-[#6f281c]
            dark:via-[#652018]
            dark:to-[#51150f]
            dark:shadow-black/20
            dark:hover:border-orange-300/40
            dark:hover:from-[#7d3020]
            dark:hover:via-[#70231a]
            dark:hover:to-[#5a170f]
          "
        >
          <p
            className="
              text-sm
              font-medium
              text-orange-700
              dark:text-orange-100
            "
          >
            {t.pendingApproval}
          </p>

          <p
            className="
              mt-2
              text-3xl
              font-bold
              text-orange-600
              dark:text-orange-300
            "
          >
            {pendingMembers}
          </p>
        </div>

        {/* Approved */}
        <div
          className="
            rounded-2xl
            border
            border-green-200/70
            bg-gradient-to-br
            from-[#eefcf3]
            via-[#ddf6e6]
            to-[#ccefd9]
            p-5
            shadow-lg
            shadow-green-950/5
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-green-300
            hover:shadow-xl
            dark:border-green-400/20
            dark:from-[#16452d]
            dark:via-[#123c27]
            dark:to-[#0e301f]
            dark:shadow-black/20
            dark:hover:border-green-300/40
            dark:hover:from-[#1c5637]
            dark:hover:via-[#17472e]
            dark:hover:to-[#123722]
          "
        >
          <p
            className="
              text-sm
              font-medium
              text-green-700
              dark:text-green-100
            "
          >
            {t.approved}
          </p>

          <p
            className="
              mt-2
              text-3xl
              font-bold
              text-green-600
              dark:text-green-300
            "
          >
            {approvedMembers}
          </p>
        </div>

        {/* Blocked */}
        <div
          className="
            rounded-2xl
            border
            border-gray-200/70
            bg-gradient-to-br
            from-[#f4f4f5]
            via-[#e9e9eb]
            to-[#dedee1]
            p-5
            shadow-lg
            shadow-gray-950/5
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-gray-300
            hover:shadow-xl
            dark:border-white/10
            dark:from-[#3f1820]
            dark:via-[#35131a]
            dark:to-[#291016]
            dark:shadow-black/20
            dark:hover:border-white/20
            dark:hover:from-[#4b1b25]
            dark:hover:via-[#3d151d]
            dark:hover:to-[#301119]
          "
        >
          <p
            className="
              text-sm
              font-medium
              text-gray-600
              dark:text-gray-200
            "
          >
            {t.blocked}
          </p>

          <p
            className="
              mt-2
              text-3xl
              font-bold
              text-gray-900
              dark:text-white
            "
          >
            {blockedMembers}
          </p>
        </div>
      </div>

      {/* Members Table */}
      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-red-200/70
          bg-white/70
          shadow-lg
          shadow-red-950/5
          backdrop-blur-sm
          dark:border-red-400/20
          dark:bg-[#4d0d17]/70
          dark:shadow-black/20
        "
      >
        <MembersTable
          initialMembers={tableMembers}
        />
      </div>
    </div>
  );
}