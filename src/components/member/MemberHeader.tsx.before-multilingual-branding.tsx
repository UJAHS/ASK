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
    portalTitle: "\u0905\u0939\u093f\u091a\u094d\u091b\u0924\u094d\u0930 \u0938\u0902\u0938\u094d\u0915\u093e\u0930 \u0915\u0947\u0902\u0926\u094d\u0930",
    portalSubtitle: "\u0938\u092e\u0941\u0926\u093e\u092f\u093f\u0915 \u0938\u0926\u0938\u094d\u092f \u092a\u094b\u0930\u094d\u091f\u0932",
    member: "\u0938\u0926\u0938\u094d\u092f",
    logout: "\u0932\u0949\u0917 \u0906\u0909\u091f",
  },

  gu: {
    portalTitle: "\u0A85\u0AB9\u0ABF\u0A9A\u0ACD\u0A9B\u0AA4\u0ACD\u0AB0 \u0AB8\u0A82\u0AB8\u0ACD\u0A95\u0ABE\u0AB0 \u0A95\u0AC7\u0AA8\u0ACD\u0AA6\u0ACD\u0AB0",
    portalSubtitle: "\u0AB8\u0AAE\u0AC1\u0AA6\u0ABE\u0AAF \u0AB8\u0AAD\u0ACD\u0AAF \u0AAA\u0ACB\u0AB0\u0ACD\u0A9F\u0AB2",
    member: "\u0AB8\u0AAD\u0ACD\u0AAF",
    logout: "\u0AB2\u0AC9\u0A97\u0A86\u0A89\u0A9F",
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
        h-[86px]
        items-center
        justify-between
        overflow-hidden
        border-b
        border-[#d9ad55]/50 dark:border-[#d9ad55]/35
        bg-gradient-to-r
        from-[#8f0014]
        via-[#a80f1c]
        to-[#8f0014] dark:from-[#3f0710] dark:via-[#4f0a15] dark:to-[#2a0409]
        px-4
        shadow-[0_8px_28px_rgba(70,0,10,0.35)]
        transition-all
        duration-300
        md:px-6
      "
    >
      {/* Traditional top highlight */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-[#fff8e8]
          to-transparent
          opacity-80
        "
      />

      {/* Subtle heritage glow */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-r
          from-[#f0c96b]/[0.06]
          via-transparent
          to-[#f0c96b]/[0.08]
        "
      />

      {/* BRAND + ORGANIZATION */}
      <div className="relative flex min-w-0 items-center gap-3">
        {/* ASK Shiva Logo */}
        <div
          className="
            relative
            h-11
            w-11
            shrink-0
            overflow-hidden
            rounded-full
            border-2
            border-[#d9ad55]
            bg-white
            shadow-[0_3px_12px_rgba(0,0,0,0.22)]
            sm:h-12
            sm:w-12
          "
        >
          <img
            src="/images/ASK_Logo.jpg"
            alt="Ahhichatra Sanskar Kendra"
            className="h-full w-full object-contain"
          />
        </div>

        {/* ORGANIZATION */}
        <div className="relative min-w-0">
          <h2
          className="
            truncate
            font-serif
            text-lg
            font-bold
            tracking-wide
            !text-[#fff8e8]
            md:text-xl
          "
        >
          Ahhichatra Sanskar Kendra
        </h2>

        <p
          className="
            text-xs
            font-medium
            tracking-wide
            !text-[#f0c96b]
          "
        >
          Community Member Portal
        </p>
        </div>
      </div>

      {/* RIGHT CONTROLS */}
      <div className="relative flex items-center gap-2 md:gap-3">
        <div className="hidden text-right sm:block">
          <p
            className="
              text-sm
              font-semibold
              !text-[#fff8e8]
            "
          >
            {t.member}
          </p>

          <p
            className="
              max-w-[240px]
              truncate
              text-xs
              !text-[#f0c96b]
            "
            title={email}
          >
            {email}
          </p>
        </div>

        {/* Theme */}
        <div
          className="
            rounded-xl
            border
            border-[#d9ad55]
            bg-[#f0c96b]
            p-0.5
            shadow-[0_3px_12px_rgba(0,0,0,0.22)]
          "
        >
          <ThemeToggle />
        </div>

        {/* Language */}
        <div
          className="
            rounded-xl
            border
            border-[#d9ad55]
            bg-[#f0c96b]
            px-1
            py-1
            shadow-[0_3px_12px_rgba(0,0,0,0.22)]
          "
        >
          <LanguageSwitcher />
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={() =>
            signOut({
              callbackUrl: `/${currentLocale}/login`,
            })
          }
          className="
            rounded-xl
            border
            border-[#f0c96b]
            bg-gradient-to-b
            from-[#fff1b8]
            via-[#f0c96b]
            to-[#d9ad55]
            px-4
            py-2.5
            text-sm
            font-semibold
            text-[#5b0712]
            shadow-[0_4px_14px_rgba(0,0,0,0.22)]
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:from-[#fff8d6]
            hover:via-[#f6d77b]
            hover:to-[#e2b85d]
            hover:shadow-[0_7px_18px_rgba(0,0,0,0.28)]
          "
        >
          {t.logout}
        </button>
      </div>
    </header>
  );
}