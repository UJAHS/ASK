"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  LogIn,
  UserPlus,
  ArrowRight,
  Heart,
  Users,
  Phone,
} from "lucide-react";

import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { locales, type Locale } from "@/i18n/config";

type PublicNavbarProps = {
  locale: Locale;
};

const translations = {
  en: {
    home: "Home",
    about: "About",
    activities: "Activities",
    events: "Events",
    news: "News",
    gallery: "Gallery",
    more: "More",
    matrimonial: "Matrimonial",
    contact: "Contact",
    members: "Members",
    login: "Login",
    register: "Register",
    community: "COMMUNITY PORTAL",
    menu: "Open menu",
    close: "Close menu",
  },

  hi: {
    home: "\u0939\u094b\u092e",
    about: "\u0939\u092e\u093e\u0930\u0947 \u092c\u093e\u0930\u0947 \u092e\u0947\u0902",
    activities: "\u0917\u0924\u093f\u0935\u093f\u0927\u093f\u092f\u093e\u0901",
    events: "\u0915\u093e\u0930\u094d\u092f\u0915\u094d\u0930\u092e",
    news: "\u0938\u092e\u093e\u091a\u093e\u0930",
    gallery: "\u0917\u0948\u0932\u0930\u0940",
    more: "\u0905\u0927\u093f\u0915",
    matrimonial: "\u0935\u0948\u0935\u093e\u0939\u093f\u0915",
    contact: "\u0938\u0902\u092a\u0930\u094d\u0915",
    members: "\u0938\u0926\u0938\u094d\u092f",
    login: "\u0932\u0949\u0917\u093f\u0928",
    register: "\u092a\u0902\u091c\u0940\u0915\u0930\u0923",
    community: "\u0938\u093e\u092e\u0941\u0926\u093e\u092f\u093f\u0915 \u092a\u094b\u0930\u094d\u091f\u0932",
    menu: "\u092e\u0947\u0928\u0942 \u0916\u094b\u0932\u0947\u0902",
    close: "\u092e\u0947\u0928\u0942 \u092c\u0902\u0926 \u0915\u0930\u0947\u0902",
  },
  gu: {
    home: "\u0939\u094b\u092e",
    about: "\u0905\u092e\u093e\u0930\u093e \u0935\u093f\u0936\u0947",
    activities: "\u092a\u094d\u0930\u0935\u0943\u0924\u094d\u0924\u093f\u0913",
    events: "\u0915\u093e\u0930\u094d\u092f\u0915\u094d\u0930\u092e\u094b",
    news: "\u0938\u092e\u093e\u091a\u093e\u0930",
    gallery: "\u0917\u0947\u0932\u0947\u0930\u0940",
    more: "\u0935\u0927\u0941",
    matrimonial: "\u0932\u0917\u094d\u0928 \u0938\u0902\u092c\u0902\u0927",
    contact: "\u0938\u0902\u092a\u0930\u094d\u0915",
    members: "\u0938\u092d\u094d\u092f\u094b",
    login: "\u0932\u0949\u0917\u093f\u0928",
    register: "\u0928\u094b\u0902\u0927\u0923\u0940",
    community: "\u0938\u093e\u092e\u0941\u0926\u093e\u092f\u093f\u0915 \u092a\u094b\u0930\u094d\u091f\u0932",
    menu: "\u092e\u0947\u0928\u0942 \u0916\u094b\u0932\u094b",
    close: "\u092e\u0947\u0928\u0942 \u092c\u0902\u0927 \u0915\u0930\u094b",
  },
} as const;

export default function PublicNavbar({
  locale,
}: PublicNavbarProps) {
  const pathname = usePathname();

  // Public navbar must never appear inside authenticated portals.
  if (pathname?.includes("/admin") || pathname?.includes("/member")) {
    return null;
  }

  const { status } = useSession();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const currentLocale: Locale = locales.includes(locale)
    ? locale
    : "en";

  const t = translations[currentLocale];

  const navItems = [
    {
      label: t.home,
      href: `/${currentLocale}`,
    },
    {
      label: t.about,
      href: `/${currentLocale}/about`,
    },
    {
      label: t.activities,
      href: `/${currentLocale}/activities`,
    },
    {
      label: t.events,
      href: `/${currentLocale}/events`,
    },
    {
      label: t.news,
      href: `/${currentLocale}/news`,
    },
    {
      label: t.gallery,
      href: `/${currentLocale}/gallery`,
    },
  ];

  const moreItems = [
    {
      label: t.matrimonial,
      href: `/${currentLocale}/member/matrimonial`,
      icon: Heart,
    },
    {
      label: t.members,
      href: `/${currentLocale}/member/members`,
      icon: Users,
    },
    {
      label: t.contact,
      href: `/${currentLocale}/contact`,
      icon: Phone,
    },
  ];

  function isActive(href: string) {
    if (href === `/${currentLocale}`) {
      return pathname === href;
    }

    return pathname.startsWith(href);
  }

  function closeMenus() {
    setMobileOpen(false);
    setMoreOpen(false);
  }

  /*
   * The public Navbar remains visible on public pages
   * even when the user is logged in.
   *
   * Authentication controls are handled separately:
   * Login/Register are hidden for authenticated users.
   */
  const isAuthenticated = status === "authenticated";

  return (
    <>
      <header
        className="
          fixed
          inset-x-0
          top-0
          z-50
          border-b
          border-[#d9ad55]/45
          bg-gradient-to-r
          from-[#4b0712]
          via-[#650b1b]
          to-[#4b0712]
          shadow-[0_10px_35px_rgba(58,5,15,0.42)]
        "
      >
        {/* Top highlight */}
        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-[#fff8e7]/70
            to-transparent
          "
        />

        {/* Main Navbar */}
        <div
          className="
            mx-auto
            flex
            h-[78px]
            max-w-[1600px]
            items-center
            px-4
            sm:px-6
            lg:px-8
            xl:px-10
          "
        >
          {/* BRAND */}
          <Link
            href={`/${currentLocale}`}
            onClick={closeMenus}
            className="
              group
              flex
              shrink-0
              items-center
              gap-3
              rounded-md
              outline-none
              transition-all
              duration-300
              focus-visible:ring-2
              focus-visible:ring-[#fff8e7]
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#c90018]
            "
          >
            {/* ASK Shiva Logo */}
            <div
              className="
                relative
                flex
                h-[58px]
                w-[58px]
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-full
                border-2
                border-[#d4af37]
                bg-[#fff8e7]
                shadow-[0_4px_18px_rgba(80,0,10,0.28)]
                transition-all
                duration-300
                group-hover:scale-105
                group-hover:border-[#f1d36a]
                group-hover:shadow-[0_0_28px_rgba(212,175,55,0.45)]
              "
            >
              <img
                src="/images/ask-shiva-logo.jpg"
                alt="Ahhichatra Sanskar Kendra"
                className="h-full w-full object-contain p-1"
              />
            </div>
            {/* Brand Text */}
            <div className="hidden sm:block">
              <div
                className="
                  whitespace-nowrap
                  text-[15px]
                  font-bold
                  leading-tight
                  tracking-[-0.01em]
                  text-[#fff7e6]
                  sm:text-[17px]
                "
              >
                Ahhichatra Sanskar Kendra
              </div>

              <div
                className="
                  mt-1
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.30em]
                  text-[#fff7e6]/80
                  sm:text-[10px]
                "
              >
                {t.community}
              </div>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav
            className="
              ml-auto
              hidden
              items-center
              gap-1
              xl:flex
            "
          >
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    relative
                    rounded-md
                    px-4
                    py-3
                    text-[14px]
                    font-semibold
                    transition-all
                    duration-300
                    ${
                      active
                        ? `
                          bg-[#d9ad55]/18
                          text-[#fff7e6]
                          shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]
                        `
                        : `
                          text-[#fff7e6]/95
                          hover:bg-[#d9ad55]/10
                          hover:text-[#fff7e6]
                        `
                    }
                  `}
                >
                  {item.label}

                  {active && (
                    <span
                      className="
                        absolute
                        bottom-1
                        left-1/2
                        h-0.5
                        w-5
                        -translate-x-1/2
                        rounded-full
                        bg-[#fff8e7]
                      "
                    />
                  )}
                </Link>
              );
            })}

            {/* More Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMoreOpen((value) => !value)}
                className={`
                  flex
                  items-center
                  gap-1.5
                  rounded-md
                  px-4
                  py-3
                  text-[14px]
                  font-semibold
                  text-[#fff7e6]/95
                  transition-all
                  duration-300
                  hover:bg-[#d9ad55]/10
                  hover:text-[#fff7e6]
                  ${moreOpen ? "bg-[#d9ad55]/10" : ""}
                `}
                aria-expanded={moreOpen}
                aria-haspopup="menu"
              >
                {t.more}

                <ChevronDown
                  className={`
                    h-4
                    w-4
                    transition-transform
                    duration-300
                    ${moreOpen ? "rotate-180" : ""}
                  `}
                />
              </button>

              {moreOpen && (
                <div
                  className="
                    absolute
                    right-0
                    top-full
                    z-[100]
                    mt-2
                    w-56
                    overflow-hidden
                    rounded-md
                    border
                    border-[#d9ad55]/25
                    bg-[#570817]
                    p-2
                    shadow-[0_20px_50px_rgba(45,4,12,0.48)]
                    backdrop-blur-xl
                  "
                  role="menu"
                >
                  {moreItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMenus}
                        className="
                          flex
                          items-center
                          gap-3
                          rounded-md
                          px-3
                          py-3
                          text-sm
                          font-medium
                          text-[#fff7e6]
                          transition-all
                          duration-200
                          hover:bg-[#d9ad55]/15
                        "
                        role="menuitem"
                      >
                        <Icon className="h-4 w-4" />

                        <span>{item.label}</span>

                        <ArrowRight
                          className="
                            ml-auto
                            h-3.5
                            w-3.5
                            opacity-50
                          "
                        />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>          </nav>

          {/* RIGHT CONTROLS */}
          <div
            className="
              ml-auto
              hidden
              items-center
              gap-2
              xl:ml-5
              xl:flex
            "
          >
            <div
              className="
                mr-2
                h-8
                w-px
                bg-[#fff8e7]/25
              "
            />

            {/* Language */}
            <div>
              <LanguageSwitcher />
            </div>

            {/* Theme */}
            <div>
              <ThemeToggle />
            </div>

            {/* Login */}
            <Link
              href={`/${currentLocale}/login`}
              className="
                group
                flex
                h-10
                shrink-0
                items-center
                gap-1.5
                rounded-md
                border-2
                border-[#fff8e7]/75
                bg-[#d9ad55]/5
                px-3
                text-sm
                font-semibold
                whitespace-nowrap
                text-[#fff7e6]
                transition-all
                duration-300
                hover:border-[#fff8e7]
                hover:bg-[#d9ad55]/15
                hover:shadow-[0_0_28px_rgba(255,248,231,0.35)]
                active:scale-[0.97]
              "
            >
              <LogIn
                className="
                  h-4
                  w-4
                  shrink-0
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                "
              />
              <span>{t.login}</span>
            </Link>
          </div>
          {/* MOBILE CONTROLS */}
          <div
            className="
              ml-auto
              flex
              items-center
              gap-2
              xl:hidden
            "
          >
            {/* Mobile Theme */}
            <div
              className="
                [&_button]:!border-[#d9ad55]/45
                [&_button]:!bg-transparent
                [&_button]:!text-[#fff7e6]
                [&_button]:hover:!bg-[#fff8e7]/10
              "
            >
              <ThemeToggle />
            </div>

            {/* Mobile Menu */}
            <button
              type="button"
              onClick={() =>
                setMobileOpen((value) => !value)
              }
              aria-label={
                mobileOpen ? t.close : t.menu
              }
              aria-expanded={mobileOpen}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-md
                border
                border-[#d9ad55]/45
                bg-[#d9ad55]/5
                text-[#fff7e6]
                transition-all
                duration-300
                hover:border-[#fff8e7]/70
                hover:bg-[#d9ad55]/10
              "
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div
            className="
              border-t
              border-[#fff8e7]/15
              bg-gradient-to-b
              from-[#4b0712]
              via-[#650b1b]
              to-[#4b0712]
              shadow-[0_20px_35px_rgba(80,0,10,0.35)]
              xl:hidden
            "
          >
            <div
              className="
                mx-auto
                max-w-[1600px]
                px-4
                py-5
                sm:px-6
              "
            >
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenus}
                      className={`
                        flex
                        items-center
                        rounded-md
                        px-4
                        py-3.5
                        text-sm
                        font-semibold
                        transition-all
                        duration-200
                        ${
                          active
                            ? "bg-[#fff8e7]/18 text-[#fff7e6]"
                            : "text-[#fff7e6]/95 hover:bg-[#d9ad55]/12"
                        }
                      `}
                    >
                      {item.label}

                      {active && (
                        <span
                          className="
                            ml-auto
                            h-1.5
                            w-1.5
                            rounded-full
                            bg-[#fff8e7]
                          "
                        />
                      )}
                    </Link>
                  );
                })}

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      setMoreOpen((value) => !value)
                    }
                    className="
                      flex
                      w-full
                      items-center
                      justify-between
                      rounded-md
                      px-4
                      py-3.5
                      text-sm
                      font-semibold
                      text-[#fff7e6]/95
                      transition-all
                      duration-200
                      hover:bg-[#d9ad55]/12
                    "
                  >
                    {t.more}

                    <ChevronDown
                      className={`
                        h-4
                        w-4
                        transition-transform
                        duration-300
                        ${moreOpen ? "rotate-180" : ""}
                      `}
                    />
                  </button>

                  {moreOpen && (
                    <div
                      className="
                        ml-3
                        mt-1
                        space-y-1
                        border-l
                        border-[#d9ad55]/25
                        pl-2
                      "
                    >
                      {moreItems.map((item) => {
                        const Icon = item.icon;

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={closeMenus}
                            className="
                              flex
                              items-center
                              gap-3
                              rounded-md
                              px-4
                              py-3
                              text-sm
                              text-[#fff7e6]/90
                              transition-all
                              duration-200
                              hover:bg-[#d9ad55]/12
                              hover:text-[#fff7e6]
                            "
                          >
                            <Icon className="h-4 w-4" />

                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </nav>

              <div className="my-4 h-px bg-[#fff8e7]/15" />

              {/* Mobile Language */}
              <div
                className="
                  mb-3
                  [&_select]:!w-full
                  [&_select]:!border-[#d9ad55]/45
                  [&_select]:!bg-[#d9ad55]/5
                  [&_select]:!text-[#fff7e6]
                  [&_option]:!bg-[#8f0014]
                  [&_option]:!text-[#fff7e6]
                "
              >
                <LanguageSwitcher />
              </div>

              {/* Mobile Auth */}
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href={`/${currentLocale}/login`}
                  onClick={closeMenus}
                  className="
                    flex
                    h-11
                    items-center
                    justify-center
                    gap-2
                    rounded-md
                    border
                    border-[#fff8e7]/40
                    text-sm
                    font-semibold
                    text-[#fff7e6]
                    transition-all
                    duration-200
                    hover:bg-[#d9ad55]/12
                  "
                >
                  <LogIn className="h-4 w-4" />
                  {t.login}
                </Link>

                <Link
                  href={`/${currentLocale}/register`}
                  onClick={closeMenus}
                  className="
                    flex
                    h-11
                    items-center
                    justify-center
                    gap-2
                    rounded-md
                    bg-[#fff8e7]
                    text-sm
                    font-bold
                    text-[#b40018]
                    transition-all
                    duration-200
                    hover:bg-white
                  "
                >
                  <UserPlus className="h-4 w-4" />
                  {t.register}
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Navbar spacer */}
      <div
        className="h-[78px]"
        aria-hidden="true"
      />
    </>
  );
}