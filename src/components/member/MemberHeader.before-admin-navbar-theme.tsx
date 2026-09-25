"use client";

import { signOut } from "next-auth/react";
import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";
import ThemeToggle from "@/components/theme/ThemeToggle";

type Locale = "en" | "hi" | "gu";

const translations = {
  en: {
    portalTitle: "Ahhichatra Sanskar Kendra",
    portalSubtitle: "Community Member Portal",
    member: "Member",
    logout: "Logout",
  },

  hi: {
    portalTitle: "à¤…à¤¹à¤¿à¤šà¥à¤›à¤¤à¥à¤° à¤¸à¤‚à¤¸à¥à¤•à¤¾à¤° à¤•à¥‡à¤‚à¤¦à¥à¤°",
    portalSubtitle: "à¤¸à¤¾à¤®à¥à¤¦à¤¾à¤¯à¤¿à¤• à¤¸à¤¦à¤¸à¥à¤¯ à¤ªà¥‹à¤°à¥à¤Ÿà¤²",
    member: "à¤¸à¤¦à¤¸à¥à¤¯",
    logout: "à¤²à¥‰à¤— à¤†à¤‰à¤Ÿ",
  },

  gu: {
    portalTitle: "àª…àª¹àª¿àªšà«àª›àª¤à«àª° àª¸àª‚àª¸à«àª•àª¾àª° àª•à«‡àª¨à«àª¦à«àª°",
    portalSubtitle: "àª¸àª®à«àª¦àª¾àª¯ àª¸àª­à«àª¯ àªªà«‹àª°à«àªŸàª²",
    member: "àª¸àª­à«àª¯",
    logout: "àª²à«‰àª— àª†àª‰àªŸ",
  },
} as const;

function normalizeLocale(value: string): Locale {
  if (value === "hi") {
    return "hi";
  }

  if (value === "gu") {
    return "gu";
  }

  return "en";
}

export default function MemberHeader({
  email,
  locale,
}: {
  email: string;
  locale: string;
}) {
  const currentLocale = normalizeLocale(locale);
  const t = translations[currentLocale];

  return (
    <header
      className="
        relative
        z-50
        flex
        h-16
        items-center
        justify-between
        overflow-hidden
        border-b
        border-red-300/70
        bg-gradient-to-r
        from-[#FFFDF7]
        via-[#ffe9ec]
        to-[#F5E8C4]
        px-4
        shadow-sm
        transition-all
        duration-300
        dark:border-red-400/30
        dark:bg-gradient-to-r
        dark:from-[#64111d]
        dark:via-[#751624]
        dark:to-[#4b0b14]
        md:px-6
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-r
          from-[#D4A72C]/[0.08]
          via-transparent
          to-rose-500/[0.12]
          dark:from-red-300/[0.08]
          dark:via-transparent
          dark:to-rose-300/[0.10]
        "
      />

      <div className="relative min-w-0">
        <h2
          className="
            truncate
            text-lg
            font-bold
            text-gray-900
            dark:text-white
          "
        >
          {t.portalTitle}
        </h2>

        <p
          className="
            text-xs
            text-red-800
            dark:text-red-100/80
          "
        >
          {t.portalSubtitle}
        </p>
      </div>

      <div className="relative flex items-center gap-2 md:gap-3">
        <div className="hidden text-right sm:block">
          <p
            className="
              text-sm
              font-semibold
              text-gray-900
              dark:text-white
            "
          >
            {t.member}
          </p>

          <p
            className="
              max-w-[240px]
              truncate
              text-xs
              text-red-800
              dark:text-red-100/70
            "
            title={email}
          >
            {email}
          </p>
        </div>

        <div
          className="
            rounded-xl
            border
            border-red-300
            bg-[#FFF5D6]
            p-0.5
            shadow-sm
            dark:border-red-400/50
            dark:bg-[#57101a]
          "
        >
          <ThemeToggle />
        </div>

        <div
          className="
            rounded-xl
            border
            border-red-300
            bg-[#FFF5D6]
            px-1
            py-1
            shadow-sm
            dark:border-red-400/50
            dark:bg-[#57101a]
          "
        >
          <LanguageSwitcher />
        </div>

        <button
          type="button"
          onClick={() =>
            signOut({
              callbackUrl: `/${currentLocale}/login`,
            })
          }
          className="
            rounded-xl
            bg-gradient-to-r
            from-[#D4A72C]
            via-red-500
            to-rose-500
            px-3
            py-2
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:from-[#B88716]
            hover:via-red-600
            hover:to-rose-600
            hover:shadow-md
            dark:from-[#D4A72C]
            dark:via-red-500
            dark:to-rose-500
          "
        >
          {t.logout}
        </button>
      </div>
    </header>
  );
}