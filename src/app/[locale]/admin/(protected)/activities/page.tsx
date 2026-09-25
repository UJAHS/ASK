import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import ActivitiesTable from "@/components/admin/ActivitiesTable";
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
    addActivity: string;
    totalActivities: string;
    published: string;
    draft: string;
    archived: string;
  }
> = {
  en: {
    title: "Activities",
    description:
      "Manage community activities and initiatives.",
    addActivity: "+ Add Activity",
    totalActivities: "Total Activities",
    published: "Published",
    draft: "Draft",
    archived: "Archived",
  },

  hi: {
    title: "गतिविधियाँ",
    description:
      "सामुदायिक गतिविधियों और पहलों का प्रबंधन करें।",
    addActivity: "+ गतिविधि जोड़ें",
    totalActivities: "कुल गतिविधियाँ",
    published: "प्रकाशित",
    draft: "ड्राफ्ट",
    archived: "संग्रहीत",
  },

  gu: {
    title: "પ્રવૃત્તિઓ",
    description:
      "સમુદાયની પ્રવૃત્તિઓ અને પહેલોનું સંચાલન કરો.",
    addActivity: "+ પ્રવૃત્તિ ઉમેરો",
    totalActivities: "કુલ પ્રવૃત્તિઓ",
    published: "પ્રકાશિત",
    draft: "ડ્રાફ્ટ",
    archived: "આર્કાઇવ કરેલ",
  },
};

export default async function AdminActivitiesPage({
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

  /*
   * Shared login is used for both
   * members and administrators.
   */
  if (!session?.user?.email) {
    redirect(`/${currentLocale}/login`);
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      role: true,
    },
  });

  if (
    !user ||
    (user.role !== "ADMIN" &&
      user.role !== "SUPER_ADMIN")
  ) {
    redirect(
      `/${currentLocale}/unauthorized`
    );
  }

  const activities =
    await prisma.activity.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

  const publishedCount =
    activities.filter(
      (activity) =>
        activity.status === "PUBLISHED"
    ).length;

  const draftCount =
    activities.filter(
      (activity) =>
        activity.status === "DRAFT"
    ).length;

  const archivedCount =
    activities.filter(
      (activity) =>
        activity.status === "ARCHIVED"
    ).length;

  return (
    <div className="mx-auto max-w-7xl">
      {/* ========================================
          PAGE HEADER
      ======================================== */}
      <div
        className="
          mb-6
          flex
          flex-col
          gap-4
          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        <div>
          <h1
            className="
              text-3xl
              font-bold
              text-red-950
              dark:text-red-50
            "
          >
            {t.title}
          </h1>

          <p
            className="
              mt-1
              text-red-800/80
              dark:text-red-100/75
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
              from-red-600
              to-pink-500
            "
          />
        </div>

        <Link
          href={`/${currentLocale}/admin/activities/new`}
          className="
            inline-flex
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-r
            from-red-700
            to-red-600
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            shadow-md
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:from-red-800
            hover:to-red-700
            hover:shadow-lg
          "
        >
          {t.addActivity}
        </Link>
      </div>

      {/* ========================================
          STATISTICS
      ======================================== */}
      <div
        className="
          mb-6
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >
        {/* TOTAL */}
        <div
          className="
            rounded-2xl
            border
            border-red-200
            bg-gradient-to-br
            from-[#ffe5e9]
            via-[#ffdce2]
            to-[#ffd2da]
            p-5
            shadow-sm
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:shadow-md

            dark:border-red-900
            dark:from-[#68131f]
            dark:via-[#570e18]
            dark:to-[#410810]
          "
        >
          <p
            className="
              text-sm
              font-medium
              text-red-700
              dark:text-red-200
            "
          >
            {t.totalActivities}
          </p>

          <p
            className="
              mt-2
              text-3xl
              font-bold
              text-red-950
              dark:text-red-50
            "
          >
            {activities.length}
          </p>
        </div>

        {/* PUBLISHED */}
        <div
          className="
            rounded-2xl
            border
            border-green-200
            bg-gradient-to-br
            from-[#e7f9ee]
            via-[#d8f4e4]
            to-[#c9eed9]
            p-5
            shadow-sm
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:shadow-md

            dark:border-green-900
            dark:from-[#123e29]
            dark:via-[#103622]
            dark:to-[#0c2b1b]
          "
        >
          <p
            className="
              text-sm
              font-medium
              text-green-700
              dark:text-green-300
            "
          >
            {t.published}
          </p>

          <p
            className="
              mt-2
              text-3xl
              font-bold
              text-green-700
              dark:text-green-300
            "
          >
            {publishedCount}
          </p>
        </div>

        {/* DRAFT */}
        <div
          className="
            rounded-2xl
            border
            border-orange-200
            bg-gradient-to-br
            from-[#fff0df]
            via-[#ffe7d0]
            to-[#ffddc0]
            p-5
            shadow-sm
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:shadow-md

            dark:border-orange-900
            dark:from-[#54230b]
            dark:via-[#451c09]
            dark:to-[#351507]
          "
        >
          <p
            className="
              text-sm
              font-medium
              text-orange-700
              dark:text-orange-300
            "
          >
            {t.draft}
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
            {draftCount}
          </p>
        </div>

        {/* ARCHIVED */}
        <div
          className="
            rounded-2xl
            border
            border-pink-200
            bg-gradient-to-br
            from-[#fbe8ee]
            via-[#f6dce4]
            to-[#efd0da]
            p-5
            shadow-sm
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:shadow-md

            dark:border-red-900
            dark:from-[#4d111c]
            dark:via-[#40101a]
            dark:to-[#320b13]
          "
        >
          <p
            className="
              text-sm
              font-medium
              text-red-700
              dark:text-red-300
            "
          >
            {t.archived}
          </p>

          <p
            className="
              mt-2
              text-3xl
              font-bold
              text-red-700
              dark:text-red-200
            "
          >
            {archivedCount}
          </p>
        </div>
      </div>

      {/* ========================================
          ACTIVITIES TABLE
          
          The child ActivitiesTable still contains
          legacy bg-white / gray classes.
          These descendant overrides make the
          entire component theme-aware without
          changing its functionality.
      ======================================== */}
      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-red-200
          bg-gradient-to-br
          from-[#fff0f2]
          via-[#ffe4e9]
          to-[#ffd9e0]
          shadow-sm

          dark:border-red-900
          dark:from-[#570e18]
          dark:via-[#4b0b15]
          dark:to-[#3b0710]

          [&_.bg-white]:!bg-[#fff0f2]
          [&_.bg-gray-50]:!bg-[#ffe4e9]
          [&_.bg-gray-100]:!bg-[#ffd9e0]

          [&_.border-gray-200]:!border-red-200
          [&_.border-gray-300]:!border-red-200

          [&_.text-gray-900]:!text-red-950
          [&_.text-gray-800]:!text-red-900
          [&_.text-gray-700]:!text-red-800
          [&_.text-gray-600]:!text-red-700
          [&_.text-gray-500]:!text-red-700/70

          [&_input]:!bg-[#fff7f8]
          [&_select]:!bg-[#fff7f8]

          dark:[&_.bg-white]:!bg-[#4b0b15]
          dark:[&_.bg-gray-50]:!bg-[#570e18]
          dark:[&_.bg-gray-100]:!bg-[#4b0b15]

          dark:[&_.border-gray-200]:!border-red-900
          dark:[&_.border-gray-300]:!border-red-800

          dark:[&_.text-gray-900]:!text-red-50
          dark:[&_.text-gray-800]:!text-red-100
          dark:[&_.text-gray-700]:!text-red-200
          dark:[&_.text-gray-600]:!text-red-300
          dark:[&_.text-gray-500]:!text-red-300/70

          dark:[&_input]:!bg-[#3b0710]
          dark:[&_select]:!bg-[#3b0710]

          [&_input]:!text-red-950
          [&_select]:!text-red-950
          [&_input::placeholder]:!text-red-300

          dark:[&_input]:!text-red-50
          dark:[&_select]:!text-red-50
          dark:[&_input::placeholder]:!text-red-300/70
        "
      >
        <ActivitiesTable
          activities={activities.map(
            (activity) => ({
              id: activity.id,
              title: activity.title,
              category:
                activity.category,
              location:
                activity.location,
              activityDate:
                activity.activityDate
                  ? activity.activityDate.toISOString()
                  : null,
              status:
                activity.status,
            })
          )}
        />
      </div>
    </div>
  );
}