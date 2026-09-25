import { auth } from "@/auth";
import { redirect } from "next/navigation";

type Locale = "en" | "hi" | "gu";

const translations = {
  en: {
    welcome: "Welcome to Your Dashboard",
    subtitle: "Manage your community profile and activities.",
    membership: "Membership",
    approved: "Approved",
    upcomingEvents: "Upcoming Events",
    activities: "Activities",
    notifications: "Notifications",
    quickActions: "Quick Actions",
    communityConnects: "Community Connects Us",
    accountInformation: "Account Information",
    email: "Email",
    accountType: "Account Type",
    communityMember: "Community Member",
    actions: {
      profile: {
        title: "My Profile",
        description: "View and update your profile",
      },
      events: {
        title: "Events",
        description: "View upcoming community events",
      },
      activities: {
        title: "Activities",
        description: "Explore community activities",
      },
      matrimonial: {
        title: "Matrimonial",
        description: "Explore matrimonial services",
      },
    },
  },

  hi: {
    welcome:
      "\u0906\u092a\u0915\u0947 \u0921\u0948\u0936\u092c\u094b\u0930\u094d\u0921 \u092e\u0947\u0902 \u0906\u092a\u0915\u093e \u0938\u094d\u0935\u093e\u0917\u0924 \u0939\u0948",
    subtitle:
      "\u0905\u092a\u0928\u0940 \u0938\u092e\u0941\u0926\u093e\u092f\u093f\u0915 \u092a\u094d\u0930\u094b\u092b\u093c\u093e\u0907\u0932 \u0914\u0930 \u0917\u0924\u093f\u0935\u093f\u0927\u093f\u092f\u094b\u0902 \u0915\u094b \u092a\u094d\u0930\u092c\u0902\u0927\u093f\u0924 \u0915\u0930\u0947\u0902\u0964",
    membership: "\u0938\u0926\u0938\u094d\u092f\u0924\u093e",
    approved: "\u0938\u094d\u0935\u0940\u0915\u0943\u0924",
    upcomingEvents: "\u0906\u0917\u093e\u092e\u0940 \u0915\u093e\u0930\u094d\u092f\u0915\u094d\u0930\u092e",
    activities: "\u0917\u0924\u093f\u0935\u093f\u0927\u093f\u092f\u093e\u0901",
    notifications: "\u0938\u0942\u091a\u0928\u093e\u090f\u0901",
    quickActions: "\u0924\u094d\u0935\u0930\u093f\u0924 \u0915\u093e\u0930\u094d\u092f\u0935\u093e\u0908",
    communityConnects:
      "\u0938\u092e\u0941\u0926\u093e\u092f \u0939\u092e\u0947\u0902 \u091c\u094b\u0921\u093c\u0924\u093e \u0939\u0948",
    accountInformation:
      "\u0916\u093e\u0924\u093e \u0915\u0940 \u091c\u093e\u0928\u0915\u093e\u0930\u0940",
    email: "\u0908\u092e\u0947\u0932",
    accountType: "\u0916\u093e\u0924\u093e \u092a\u094d\u0930\u0915\u093e\u0930",
    communityMember: "\u0938\u092e\u0941\u0926\u093e\u092f \u0938\u0926\u0938\u094d\u092f",
    actions: {
      profile: {
        title: "\u092e\u0947\u0930\u0940 \u092a\u094d\u0930\u094b\u092b\u093c\u093e\u0907\u0932",
        description:
          "\u0905\u092a\u0928\u0940 \u092a\u094d\u0930\u094b\u092b\u093c\u093e\u0907\u0932 \u0926\u0947\u0916\u0947\u0902 \u0914\u0930 \u0905\u092a\u0921\u0947\u091f \u0915\u0930\u0947\u0902",
      },
      events: {
        title: "\u0915\u093e\u0930\u094d\u092f\u0915\u094d\u0930\u092e",
        description:
          "\u0906\u0917\u093e\u092e\u0940 \u0938\u092e\u0941\u0926\u093e\u092f\u093f\u0915 \u0915\u093e\u0930\u094d\u092f\u0915\u094d\u0930\u092e \u0926\u0947\u0916\u0947\u0902",
      },
      activities: {
        title: "\u0917\u0924\u093f\u0935\u093f\u0927\u093f\u092f\u093e\u0901",
        description:
          "\u0938\u092e\u0941\u0926\u093e\u092f\u093f\u0915 \u0917\u0924\u093f\u0935\u093f\u0927\u093f\u092f\u094b\u0902 \u0915\u094b \u0926\u0947\u0916\u0947\u0902",
      },
      matrimonial: {
        title: "\u0935\u093f\u0935\u093e\u0939 \u092a\u0930\u093f\u091a\u092f",
        description:
          "\u0935\u093f\u0935\u093e\u0939 \u0938\u0947\u0935\u093e\u0913\u0902 \u0915\u094b \u0926\u0947\u0916\u0947\u0902",
      },
    },
  },

  gu: {
    welcome:
      "\u0a86\u0aaa\u0aa8\u0abe \u0aa1\u0ac7\u0ab6\u0aac\u0acb\u0ab0\u0acd\u0aa1 \u0aae\u0abe\u0a82 \u0a86\u0aaa\u0aa8\u0ac1\u0a82 \u0ab8\u0acd\u0ab5\u0abe\u0a97\u0aa4 \u0a9b\u0ac7",
    subtitle:
      "\u0aa4\u0aae\u0abe\u0ab0\u0ac0 \u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0abf\u0a95 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0a85\u0aa8\u0ac7 \u0aaa\u0acd\u0ab0\u0ab5\u0ac3\u0aa4\u0acd\u0aa4\u0abf\u0a93\u0aa8\u0ac1\u0a82 \u0ab8\u0a82\u0a9a\u0abe\u0ab2\u0aa8 \u0a95\u0ab0\u0acb.",
    membership: "\u0ab8\u0aad\u0acd\u0aaf\u0aa4\u0abe",
    approved: "\u0aae\u0a82\u0a9c\u0ac2\u0ab0",
    upcomingEvents:
      "\u0a86\u0ab5\u0aa8\u0abe\u0ab0\u0abe \u0a95\u0abe\u0ab0\u0acd\u0aaf\u0a95\u0acd\u0ab0\u0aae\u0acb",
    activities: "\u0aaa\u0acd\u0ab0\u0ab5\u0ac3\u0aa4\u0acd\u0aa4\u0abf\u0a93",
    notifications: "\u0ab8\u0ac2\u0a9a\u0aa8\u0abe\u0a93",
    quickActions: "\u0aa4\u0acd\u0ab5\u0ab0\u0abf\u0aa4 \u0a95\u0abe\u0ab0\u0acd\u0aaf\u0ab5\u0abe\u0ab9\u0ac0",
    communityConnects:
      "\u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf \u0a85\u0aae\u0aa8\u0ac7 \u0a9c\u0acb\u0aa1\u0ac7 \u0a9b\u0ac7",
    accountInformation:
      "\u0a96\u0abe\u0aa4\u0abe\u0aa8\u0ac0 \u0aae\u0abe\u0ab9\u0abf\u0aa4\u0ac0",
    email: "\u0a88\u0aae\u0ac7\u0ab2",
    accountType:
      "\u0a96\u0abe\u0aa4\u0abe\u0aa8\u0acb \u0aaa\u0acd\u0ab0\u0a95\u0abe\u0ab0",
    communityMember:
      "\u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0aa8\u0abe \u0ab8\u0aad\u0acd\u0aaf",
    actions: {
      profile: {
        title:
          "\u0aae\u0abe\u0ab0\u0ac0 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2",
        description:
          "\u0aa4\u0aae\u0abe\u0ab0\u0ac0 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0a9c\u0acb\u0ab5\u0abe \u0a85\u0aa8\u0ac7 \u0a85\u0aaa\u0aa1\u0ac7\u0a9f \u0a95\u0ab0\u0acb",
      },
      events: {
        title:
          "\u0a95\u0abe\u0ab0\u0acd\u0aaf\u0a95\u0acd\u0ab0\u0aae\u0acb",
        description:
          "\u0a86\u0ab5\u0aa8\u0abe\u0ab0\u0abe \u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0abf\u0a95 \u0a95\u0abe\u0ab0\u0acd\u0aaf\u0a95\u0acd\u0ab0\u0aae\u0acb \u0a9c\u0acb\u0ab5\u0acb",
      },
      activities: {
        title:
          "\u0aaa\u0acd\u0ab0\u0ab5\u0ac3\u0aa4\u0acd\u0aa4\u0abf\u0a93",
        description:
          "\u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0abf\u0a95 \u0aaa\u0acd\u0ab0\u0ab5\u0ac3\u0aa4\u0acd\u0aa4\u0abf\u0a93 \u0ab6\u0acb\u0aa7\u0acb",
      },
      matrimonial: {
        title:
          "\u0ab5\u0ac8\u0ab5\u0abe\u0ab9\u0abf\u0a95 \u0aaa\u0ab0\u0abf\u0a9a\u0aaf",
        description:
          "\u0ab5\u0ac8\u0ab5\u0abe\u0ab9\u0abf\u0a95 \u0ab8\u0ac7\u0ab5\u0abe\u0a93 \u0ab6\u0acb\u0aa7\u0acb",
      },
    },
  },
} as const;

function normalizeLocale(value: string): Locale {
  if (value === "hi" || value === "gu") {
    return value;
  }

  return "en";
}

export default async function MemberDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = normalizeLocale(localeParam);
  const t = translations[locale];

  const session = await auth();

  if (!session?.user) {
    redirect(`/${locale}/login`);
  }

  const role = String(
    (session.user as { role?: string }).role || ""
  );

  if (role !== "MEMBER") {
    redirect(`/${locale}/unauthorized`);
  }

  const quickActions = [
    {
      title: t.actions.profile.title,
      description: t.actions.profile.description,
      href: `/${locale}/member/profile`,
      icon: "\u{1F464}",
    },
    {
      title: t.actions.events.title,
      description: t.actions.events.description,
      href: `/${locale}/member/events`,
      icon: "\u{1F4C5}",
    },
    {
      title: t.actions.activities.title,
      description: t.actions.activities.description,
      href: `/${locale}/member/activities`,
      icon: "\u{1F465}",
    },
    {
      title: t.actions.matrimonial.title,
      description: t.actions.matrimonial.description,
      href: `/${locale}/member/matrimonial`,
      icon: "\u{2665}",
    },
  ];

  const statCard =
    "group relative overflow-hidden rounded-2xl border border-[#D4A72C]/45 bg-gradient-to-br from-[#FFFEF8] via-[#FFFBEB] to-[#FFF6D6] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#C89B2C] hover:from-[#ffc4ce] hover:via-[#FFE8B0] hover:to-[#E8B42A] hover:shadow-[0_16px_35px_rgba(190,24,93,0.22)] dark:border-red-400/40 dark:from-[#711521] dark:via-[#5f101a] dark:to-[#480a13] dark:hover:border-[#D4A72C]/45 dark:hover:from-[#8b2636] dark:hover:via-[#751a28] dark:hover:to-[#60131f] dark:hover:shadow-[0_16px_35px_rgba(248,113,113,0.20)]";

  return (
    <div className="mx-auto max-w-7xl">

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t.welcome}
        </h1>

        <p className="mt-1 text-red-900/80 dark:text-red-100/75">
          {t.subtitle}
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

        <div className={statCard}>
          <div
            className="
              pointer-events-none absolute -right-10 -top-10 h-28 w-28
              rounded-full bg-[#D4A72C]/10 blur-2xl transition-all duration-300
              group-hover:scale-150 group-hover:bg-[#D4A72C]/20
              dark:bg-red-300/10 dark:group-hover:bg-red-300/20
            "
          />

          <p className="relative text-sm text-red-900/75 dark:text-red-100/75">
            {t.membership}
          </p>

          <p
            className="
              relative mt-2 text-2xl font-bold text-green-600
              transition-all duration-300 group-hover:scale-105
              group-hover:text-green-700 dark:group-hover:text-green-300
            "
          >
            {t.approved}
          </p>
        </div>

        <div className={statCard}>
          <p className="text-sm text-red-900/75 dark:text-red-100/75">
            {t.upcomingEvents}
          </p>

          <p
            className="
              mt-2 text-3xl font-bold text-gray-900
              transition-all duration-300 group-hover:scale-105 dark:text-white
            "
          >
            0
          </p>
        </div>

        <div className={statCard}>
          <p className="text-sm text-red-900/75 dark:text-red-100/75">
            {t.activities}
          </p>

          <p
            className="
              mt-2 text-3xl font-bold text-gray-900
              transition-all duration-300 group-hover:scale-105 dark:text-white
            "
          >
            0
          </p>
        </div>

        <div className={statCard}>
          <p className="text-sm text-red-900/75 dark:text-red-100/75">
            {t.notifications}
          </p>

          <p
            className="
              mt-2 text-3xl font-bold text-gray-900
              transition-all duration-300 group-hover:scale-105 dark:text-white
            "
          >
            0
          </p>
        </div>

      </div>

      <section
        className="
          relative mb-6 overflow-hidden rounded-2xl border border-[#D4A72C]/45
          bg-gradient-to-br from-[#FFFEF8] via-[#FFFBEB] to-[#FFF6D6]
          p-6 shadow-sm transition-all duration-300
          hover:border-red-400 hover:shadow-[0_18px_40px_rgba(190,24,93,0.12)]
          dark:border-red-400/40 dark:from-[#68131f] dark:via-[#570e18]
          dark:to-[#410810] dark:hover:border-[#D4A72C]/45/60
          dark:hover:shadow-[0_18px_40px_rgba(248,113,113,0.14)]
        "
      >
        <div
          className="
            pointer-events-none absolute right-0 top-0 h-40 w-72 rounded-full
            bg-[#D4A72C]/10 blur-3xl transition-all duration-500
            hover:bg-[#D4A72C]/20 dark:bg-red-300/10
          "
        />

        <div className="relative mb-5 flex items-center gap-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t.quickActions}
          </h2>

          <div className="hidden h-px flex-1 bg-[#D4A72C]/35 dark:bg-red-300/25 md:block" />

          <span className="text-sm font-medium text-red-600 dark:text-red-200">
            {t.communityConnects}
          </span>
        </div>

        <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {quickActions.map((action) => (
            <a
              key={action.href}
              href={action.href}
              className="
                group relative min-h-[185px] overflow-hidden rounded-2xl
                border border-[#D4A72C]/45 bg-gradient-to-br
                from-[#FFFFFC] via-[#FFFDF0] to-[#FFF8E0] p-4 shadow-sm
                transition-all duration-300
                hover:-translate-y-2 hover:border-[#C89B2C]
                hover:from-[#FFF0D0] hover:via-[#FFE8B0] hover:to-[#E8B42A]
                hover:shadow-[0_18px_35px_rgba(190,24,93,0.25)]
                dark:border-red-400/35 dark:from-[#751a28]
                dark:via-[#64131f] dark:to-[#51101a]
                dark:hover:border-[#D4A72C]/45 dark:hover:from-[#8e2b3b]
                dark:hover:via-[#781b2a] dark:hover:to-[#601421]
                dark:hover:shadow-[0_18px_35px_rgba(248,113,113,0.22)]
              "
            >
              <div
                className="
                  pointer-events-none absolute -right-16 -top-20 h-40 w-40
                  rounded-full bg-white/20 blur-3xl opacity-0
                  transition-all duration-500 group-hover:scale-150
                  group-hover:opacity-100 dark:bg-red-200/10
                "
              />

              <div
                className="
                  relative mb-4 flex h-11 w-11 items-center justify-center
                  rounded-xl border border-red-200
                  bg-gradient-to-br from-[#FFFDF4] to-[#FFF9E3]
                  text-xl shadow-sm transition-all duration-300
                  group-hover:scale-110 group-hover:border-red-400
                  group-hover:from-[#FFF0C8] group-hover:to-[#FFE5A0]
                  group-hover:text-[#3D2508] group-hover:shadow-lg
                  dark:border-[#D4A72C]/45/25 dark:from-[#8b2636] dark:to-[#701522]
                  dark:group-hover:border-red-200/50 dark:group-hover:from-[#a63749]
                  dark:group-hover:to-[#8b2435]
                "
              >
                {action.icon}
              </div>

              <h3
                className="
                  relative font-semibold text-gray-900 transition-colors duration-300
                  group-hover:text-red-900 dark:text-white dark:group-hover:text-red-50
                "
              >
                {action.title}
              </h3>

              <p
                className="
                  relative mt-1 text-sm text-red-900/75 transition-colors duration-300
                  group-hover:text-red-950 dark:text-red-100/75
                  dark:group-hover:text-[#3D2508]/90
                "
              >
                {action.description}
              </p>

              <div className="relative mt-4 flex justify-end">
                <span
                  className="
                    flex h-8 w-8 items-center justify-center rounded-full border
                    border-[#D4A72C]/45 bg-gradient-to-br from-[#FFFEF8] to-[#FFF1CE]
                    text-red-600 transition-all duration-300
                    group-hover:translate-x-1 group-hover:scale-110
                    group-hover:border-[#B88716] group-hover:bg-[#D4A72C]
                    group-hover:text-[#3D2508] group-hover:shadow-lg
                    dark:border-[#D4A72C]/45/30 dark:from-[#7d1b2b] dark:to-[#64111b]
                    dark:text-red-100 dark:group-hover:border-red-200/50
                    dark:group-hover:bg-[#D4A72C]
                  "
                >
                  {"\u2192"}
                </span>
              </div>
            </a>
          ))}

        </div>
      </section>

      <section
        className="
          relative overflow-hidden rounded-2xl border border-[#D4A72C]/45
          bg-gradient-to-br from-[#FFFEF8] via-[#FFFBEB] to-[#FFF6D6]
          p-6 shadow-sm transition-all duration-300
          hover:border-red-400 hover:shadow-[0_18px_40px_rgba(190,24,93,0.12)]
          dark:border-red-400/40 dark:from-[#68131f] dark:via-[#570e18]
          dark:to-[#410810] dark:hover:border-[#D4A72C]/45/60
          dark:hover:shadow-[0_18px_40px_rgba(248,113,113,0.14)]
        "
      >
        <h2 className="mb-5 text-xl font-bold text-gray-900 dark:text-white">
          {t.accountInformation}
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          <div
            className="
              group rounded-xl border border-red-200/80
              bg-gradient-to-br from-[#FFFEF8] via-[#FFFBEF] to-[#FFF8E4]
              p-4 shadow-sm transition-all duration-300
              hover:-translate-y-1 hover:border-[#C89B2C]
              hover:from-[#FFFBEB] hover:via-[#FFF8E0] hover:to-[#FFEDC4]
              hover:shadow-[0_12px_25px_rgba(190,24,93,0.20)]
              dark:border-[#D4A72C]/45/25 dark:from-[#5c111b]
              dark:via-[#4e0d16] dark:to-[#420910]
              dark:hover:border-[#D4A72C]/45/70 dark:hover:from-[#79202e]
              dark:hover:via-[#681622] dark:hover:to-[#54101a]
            "
          >
            <p className="text-sm text-red-900/70 dark:text-red-100/70">
              {t.email}
            </p>

            <p className="mt-1 font-medium text-gray-900 dark:text-white">
              {session.user.email}
            </p>
          </div>

          <div
            className="
              group rounded-xl border border-red-200/80
              bg-gradient-to-br from-[#FFFEF8] via-[#FFFBEF] to-[#FFF8E4]
              p-4 shadow-sm transition-all duration-300
              hover:-translate-y-1 hover:border-[#C89B2C]
              hover:from-[#FFFBEB] hover:via-[#FFF8E0] hover:to-[#FFEDC4]
              hover:shadow-[0_12px_25px_rgba(190,24,93,0.20)]
              dark:border-[#D4A72C]/45/25 dark:from-[#5c111b]
              dark:via-[#4e0d16] dark:to-[#420910]
              dark:hover:border-[#D4A72C]/45/70 dark:hover:from-[#79202e]
              dark:hover:via-[#681622] dark:hover:to-[#54101a]
            "
          >
            <p className="text-sm text-red-900/70 dark:text-red-100/70">
              {t.accountType}
            </p>

            <p className="mt-1 font-medium text-gray-900 dark:text-white">
              {t.communityMember}
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}