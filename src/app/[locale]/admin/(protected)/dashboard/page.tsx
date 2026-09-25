import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";

export const dynamic = "force-dynamic";

const translations = {
  en: {
    dashboard: "Dashboard",
    totalMembers: "Total Members",
    registeredMembers: "Registered community members",
    pendingApproval: "Pending Approval",
    membersWaiting: "Members waiting for approval",
    news: "News",
    manageNews: "Manage community news",
    activities: "Activities",
    totalActivities: "Total community activities",
  },

  hi: {
    dashboard: "डैशबोर्ड",
    totalMembers: "कुल सदस्य",
    registeredMembers: "पंजीकृत समुदाय सदस्य",
    pendingApproval: "अनुमोदन लंबित",
    membersWaiting: "अनुमोदन की प्रतीक्षा कर रहे सदस्य",
    news: "समाचार",
    manageNews: "समुदाय के समाचार प्रबंधित करें",
    activities: "गतिविधियाँ",
    totalActivities: "कुल सामुदायिक गतिविधियाँ",
  },

  gu: {
    dashboard: "ડેશબોર્ડ",
    totalMembers: "કુલ સભ્યો",
    registeredMembers: "નોંધાયેલા સમુદાય સભ્યો",
    pendingApproval: "મંજૂરી બાકી",
    membersWaiting: "મંજૂરીની રાહ જોઈ રહેલા સભ્યો",
    news: "સમાચાર",
    manageNews: "સમુદાયના સમાચારનું સંચાલન કરો",
    activities: "પ્રવૃત્તિઓ",
    totalActivities: "કુલ સામુદાયિક પ્રવૃત્તિઓ",
  },
};

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const currentLocale: Locale = locale;
  const t = translations[currentLocale];

  const [
    totalMembers,
    pendingMembers,
    totalActivities,
  ] = await Promise.all([
    prisma.user.count({
      where: {
        role: "MEMBER",
      },
    }),

    prisma.user.count({
      where: {
        role: "MEMBER",
        status: "PENDING",
      },
    }),

    prisma.activity.count(),
  ]);

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
          {t.dashboard}
        </h1>

        <div
          className="
            mt-2
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

      {/* Dashboard Statistics */}
      <div
        className="
          grid
          grid-cols-1
          gap-5
          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        {/* Total Members */}
        <Link
          href={`/${currentLocale}/admin/members`}
          className="
            group
            rounded-2xl
            border
            border-red-200/70
            bg-gradient-to-br
            from-[#fff0f2]
            via-[#ffe0e5]
            to-[#ffd0d8]
            p-6
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
          <h2
            className="
              text-base
              font-semibold
              text-red-950
              dark:text-white
            "
          >
            {t.totalMembers}
          </h2>

          <p
            className="
              mt-4
              text-4xl
              font-bold
              text-red-900
              dark:text-white
            "
          >
            {totalMembers}
          </p>

          <p
            className="
              mt-2
              text-sm
              text-red-700/80
              dark:text-red-100/80
            "
          >
            {t.registeredMembers}
          </p>
        </Link>

        {/* Pending Approval */}
        <Link
          href={`/${currentLocale}/admin/members`}
          className="
            group
            rounded-2xl
            border
            border-orange-200/80
            bg-gradient-to-br
            from-[#fff3e8]
            via-[#ffe7d6]
            to-[#ffd8c2]
            p-6
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
          <h2
            className="
              text-base
              font-semibold
              text-orange-950
              dark:text-orange-100
            "
          >
            {t.pendingApproval}
          </h2>

          <p
            className="
              mt-4
              text-4xl
              font-bold
              text-orange-600
              dark:text-orange-300
            "
          >
            {pendingMembers}
          </p>

          <p
            className="
              mt-2
              text-sm
              text-orange-800/80
              dark:text-orange-100/75
            "
          >
            {t.membersWaiting}
          </p>
        </Link>

        {/* News */}
        <Link
          href={`/${currentLocale}/admin/news`}
          className="
            group
            rounded-2xl
            border
            border-red-200/70
            bg-gradient-to-br
            from-[#fff0f2]
            via-[#ffe0e5]
            to-[#ffd0d8]
            p-6
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
          <h2
            className="
              text-base
              font-semibold
              text-red-950
              dark:text-white
            "
          >
            {t.news}
          </h2>

          <p
            className="
              mt-4
              text-4xl
              font-bold
              text-red-900
              dark:text-white
            "
          >
            0
          </p>

          <p
            className="
              mt-2
              text-sm
              text-red-700/80
              dark:text-red-100/80
            "
          >
            {t.manageNews}
          </p>
        </Link>

        {/* Activities */}
        <Link
          href={`/${currentLocale}/admin/activities`}
          className="
            group
            rounded-2xl
            border
            border-green-200/70
            bg-gradient-to-br
            from-[#eefcf3]
            via-[#ddf6e6]
            to-[#ccefd9]
            p-6
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
          <h2
            className="
              text-base
              font-semibold
              text-green-950
              dark:text-green-100
            "
          >
            {t.activities}
          </h2>

          <p
            className="
              mt-4
              text-4xl
              font-bold
              text-green-600
              dark:text-green-300
            "
          >
            {totalActivities}
          </p>

          <p
            className="
              mt-2
              text-sm
              text-green-800/80
              dark:text-green-100/75
            "
          >
            {t.totalActivities}
          </p>
        </Link>
      </div>
    </div>
  );
}