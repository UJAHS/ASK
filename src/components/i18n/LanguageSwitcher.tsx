"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useState } from "react";
import {
  locales,
  localeNames,
  type Locale,
} from "@/i18n/config";

const languageOptions: Locale[] = [
  "en",
  "hi",
  "gu",
];

const ariaLabels: Record<Locale, string> = {
  en: "Select language",
  hi: "भाषा चुनें",
  gu: "ભાષા પસંદ કરો",
};

function getLocaleFromPath(
  pathname: string
): Locale {
  const firstSegment = pathname
    .split("/")
    .filter(Boolean)[0];

  if (
    locales.includes(
      firstSegment as Locale
    )
  ) {
    return firstSegment as Locale;
  }

  return "en";
}

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [changing, setChanging] =
    useState(false);

  const currentLocale =
    getLocaleFromPath(pathname);

  function changeLanguage(locale: Locale) {
    if (
      locale === currentLocale ||
      changing
    ) {
      return;
    }

    setChanging(true);

    const segments = pathname.split("/");

    if (
      segments[1] &&
      locales.includes(
        segments[1] as Locale
      )
    ) {
      segments[1] = locale;
    } else {
      segments.splice(1, 0, locale);
    }

    const newPath =
      segments.join("/") ||
      `/${locale}`;

    const queryString =
      searchParams.toString();

    const destination = queryString
      ? `${newPath}?${queryString}`
      : newPath;

    router.push(destination);
  }

  return (
    <div className="relative">
      <label className="sr-only">
        {ariaLabels[currentLocale]}
      </label>

      <select
        value={currentLocale}
        onChange={(event) =>
          changeLanguage(
            event.target.value as Locale
          )
        }
        disabled={changing}
        aria-label={
          ariaLabels[currentLocale]
        }
        className="
          h-11
          min-w-[122px]
          cursor-pointer
          appearance-none
          rounded-xl
          border
          px-4
          pr-10
          text-sm
          font-semibold
          outline-none
          transition-all
          duration-300

          /* LIGHT THEME */
          border-[#b40018]/30
          bg-[#fff8e7]
          text-[#7f0012]
          shadow-[0_4px_15px_rgba(120,0,20,0.10)]

          hover:border-[#b40018]/60
          hover:bg-white
          hover:text-[#b40018]

          focus:border-[#b40018]
          focus:ring-2
          focus:ring-[#b40018]/20

          disabled:cursor-wait
          disabled:opacity-70

          /* DARK THEME */
          dark:border-[#ef001d]/45
          dark:bg-[#4a0a14]
          dark:text-[#fff8e7]
          dark:shadow-[0_4px_18px_rgba(0,0,0,0.25)]

          dark:hover:border-[#ef001d]/70
          dark:hover:bg-[#64101d]
          dark:hover:text-white

          dark:focus:border-[#ef001d]
          dark:focus:ring-[#ef001d]/25
        "
      >
        {languageOptions.map(
          (locale) => (
            <option
              key={locale}
              value={locale}
              className="
                bg-white
                text-[#7f0012]
                dark:bg-[#4a0a14]
                dark:text-[#fff8e7]
              "
            >
              {localeNames[locale]}
            </option>
          )
        )}
      </select>

      {/* Custom dropdown arrow */}
      <div
        className="
          pointer-events-none
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          flex
          items-center
          justify-center
        "
      >
        <svg
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="
            h-4
            w-4
            text-[#8f0014]
            transition-colors
            duration-300

            dark:text-[#fff8e7]
          "
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}