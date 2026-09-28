"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Activity,
  CalendarDays,
  ChevronRight,
  CircleUserRound,
  CreditCard,
  Heart,
  Inbox,
  Images,
  LayoutDashboard,
  Newspaper,
  Settings,
  Users,
  Wallet,
} from "lucide-react";

const translations = {
  en: {
    dashboard: "Dashboard",
    profile: "My Profile",
    membership: "My Membership",
    members: "Members Directory",
    activities: "Activities",
    events: "Events",
    news: "News",
    gallery: "Gallery",
    donations: "Donations",
    matrimonial: "Matrimonial",
    contactRequests: "Contact Requests",
    settings: "Settings",
    portal: "Member Portal",
    organization: "Ahhichatra Sanskar Kendra",
  },

  hi: {
    dashboard: "\u0921\u0948\u0936\u092c\u094b\u0930\u094d\u0921",
    profile: "\u092e\u0947\u0930\u0940 \u092a\u094d\u0930\u094b\u092b\u093c\u093e\u0907\u0932",
    membership: "\u092e\u0947\u0930\u0940 \u0938\u0926\u0938\u094d\u092f\u0924\u093e",
    members: "\u0938\u0926\u0938\u094d\u092f \u0928\u093f\u0930\u094d\u0926\u0947\u0936\u093f\u0915\u093e",
    activities: "\u0917\u0924\u093f\u0935\u093f\u0927\u093f\u092f\u093e\u0901",
    events: "\u0915\u093e\u0930\u094d\u092f\u0915\u094d\u0930\u092e",
    news: "\u0938\u092e\u093e\u091a\u093e\u0930",
    gallery: "\u0917\u0948\u0932\u0930\u0940",
    donations: "\u0926\u093e\u0928",
    matrimonial: "\u0935\u093f\u0935\u093e\u0939 \u092a\u0930\u093f\u091a\u092f",
    contactRequests: "\u0938\u0902\u092a\u0930\u094d\u0915 \u0905\u0928\u0941\u0930\u094b\u0927",
    settings: "\u0938\u0947\u091f\u093f\u0902\u0917\u094d\u0938",
    portal: "\u0938\u0926\u0938\u094d\u092f \u092a\u094b\u0930\u094d\u091f\u0932",
    organization: "Ahhichatra Sanskar Kendra",
  },

  gu: {
    dashboard: "\u0aa1\u0ac7\u0ab6\u0aac\u0acb\u0ab0\u0acd\u0aa1",
    profile: "\u0aae\u0abe\u0ab0\u0ac0 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2",
    membership: "\u0aae\u0abe\u0ab0\u0ac0 \u0ab8\u0aad\u0acd\u0aaf\u0aa4\u0abe",
    members: "\u0ab8\u0aad\u0acd\u0aaf \u0aa8\u0abf\u0ab0\u0acd\u0aa6\u0ac7\u0ab6\u0abf\u0a95\u0abe",
    activities: "\u0aaa\u0acd\u0ab0\u0ab5\u0ac3\u0aa4\u0acd\u0aa4\u0abf\u0a93",
    events: "\u0a95\u0abe\u0ab0\u0acd\u0aaf\u0a95\u0acd\u0ab0\u0aae\u0acb",
    news: "\u0ab8\u0aae\u0abe\u0a9a\u0abe\u0ab0",
    gallery: "\u0a97\u0ac7\u0ab2\u0ac7\u0ab0\u0ac0",
    donations: "\u0aa6\u0abe\u0aa8",
    matrimonial: "\u0ab5\u0ac8\u0ab5\u0abe\u0ab9\u0abf\u0a95",
    contactRequests: "\u0ab8\u0a82\u0aaa\u0ab0\u0acd\u0a95 \u0ab5\u0abf\u0aa8\u0a82\u0aa4\u0ac0\u0a93",
    settings: "\u0ab8\u0ac7\u0a9f\u0abf\u0a82\u0a97\u0acd\u0ab8",
    portal: "\u0ab8\u0aad\u0acd\u0aaf \u0aaa\u0acb\u0ab0\u0acd\u0a9f\u0ab2",
    organization: "Ahhichatra Sanskar Kendra",
  },
} as const;

type Locale = keyof typeof translations;

type MenuKey =
  | "dashboard"
  | "profile"
  | "membership"
  | "members"
  | "activities"
  | "events"
  | "news"
  | "gallery"
  | "donations"
  | "matrimonial"
  | "contactRequests"
  | "settings";

const menuItems: {
  key: MenuKey;
  href: string;
  icon: typeof LayoutDashboard;
}[] = [
  {
    key: "dashboard",
    href: "/member/dashboard",
    icon: LayoutDashboard,
  },
  {
    key: "profile",
    href: "/member/profile",
    icon: CircleUserRound,
  },
  {
    key: "membership",
    href: "/member/membership",
    icon: CreditCard,
  },
  {
    key: "members",
    href: "/member/members",
    icon: Users,
  },
  {
    key: "activities",
    href: "/member/activities",
    icon: Activity,
  },
  {
    key: "events",
    href: "/member/events",
    icon: CalendarDays,
  },
  {
    key: "news",
    href: "/member/news",
    icon: Newspaper,
  },
  {
    key: "gallery",
    href: "/member/gallery",
    icon: Images,
  },
  {
    key: "donations",
    href: "/member/donations",
    icon: Wallet,
  },
  {
    key: "matrimonial",
    href: "/member/matrimonial",
    icon: Heart,
  },
  {
    key: "contactRequests",
    href: "/member/contact-requests",
    icon: Inbox,
  },
  {
    key: "settings",
    href: "/member/settings",
    icon: Settings,
  },
];

export default function MemberSidebar() {
  const pathname = usePathname();
  const [pendingRequests, setPendingRequests] = useState(0);

  const pathParts = pathname.split("/").filter(Boolean);
  const detectedLocale = pathParts[0] as Locale;

  const locale: Locale =
    detectedLocale === "hi" || detectedLocale === "gu"
      ? detectedLocale
      : "en";

  const t = translations[locale];

  useEffect(() => {
    let mounted = true;

    async function loadPendingRequests() {
      try {
        const response = await fetch(
          "/api/member/contact-requests",
          {
            cache: "no-store",
          },
        );

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        if (!mounted) {
          return;
        }

        const incoming = Array.isArray(data?.incoming)
          ? data.incoming
          : [];

        const pendingCount = incoming.filter(
          (request: { status?: string }) =>
            request?.status === "PENDING",
        ).length;

        setPendingRequests(pendingCount);
      } catch {
        // Keep the existing badge value if the request fails.
      }
    }

    void loadPendingRequests();

    const interval = window.setInterval(
      () => {
        void loadPendingRequests();
      },
      30000,
    );

    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <aside
      className="member-sidebar 
        fixed inset-y-0 left-0 z-40
        hidden md:flex
        w-64 min-w-64 max-w-64
        flex-col
        overflow-hidden
        bg-gradient-to-b from-red-900 via-red-800 to-red-900
        text-white
        shadow-2xl shadow-red-950/20
        dark:from-[#3f0710]
        dark:via-[#4f0a15]
        dark:to-[#2a0409]
      "
    >
      {/* BRAND */}
      <div
        className="
          flex
          h-28
          shrink-0
          items-center
          overflow-hidden
          border-b
          border-[#d9ad55]/40
          px-4
        "
      >
        <Link
          href={`/${locale}/member/dashboard`}
          className="
            flex
            w-full
            min-w-0
            items-center
            gap-3
            rounded-xl
            outline-none
            transition-all
            duration-200
            hover:bg-white/5
          "
        >
          {/* SHIVA LOGO */}
          <div
            className="
              h-14
              w-14
              shrink-0
              overflow-hidden
              rounded-full
              border-2
              border-[#e2b85d]
              bg-white
              p-1
              shadow-[0_4px_18px_rgba(226,184,93,0.35)]
            "
          >
            <img
              src="/images/SHIVA_ORI_!.png"
              alt="Ahhichatra Sanskar Kendra"
              className="h-full w-full rounded-full object-contain"
            />
          </div>

          {/* BRAND TEXT */}
          <div className="min-w-0">
            <h1
              className="
                max-w-[150px]
                font-serif
                text-[15px]
                font-bold
                leading-tight
                tracking-wide
                !text-[#fff8e8]
                sm:text-[16px]
              "
            >
              Ahhichatra Sanskar Kendra
            </h1>

            <p
              className="
                mt-0.5
                text-[10px]
                font-medium
                leading-tight
                tracking-wide
                !text-[#f0c96b]
                sm:text-[11px]
              "
            >
              {t.portal}
            </p>
          </div>
        </Link>
      </div>

      {/* NAVIGATION */}

      {/* NAVIGATION */}
      <nav
        className="
          min-h-0 flex-1
          overflow-x-hidden overflow-y-auto
          px-3 py-4
        "
      >
        <div className="space-y-1">
          {menuItems.map((item) => {
            const localizedHref = `/${locale}${item.href}`;

            const active =
              pathname === localizedHref ||
              pathname.startsWith(`${localizedHref}/`);

            const Icon = item.icon;

            return (
              <Link
                key={item.key}
                href={localizedHref}
                className={`
                  group flex w-full items-center gap-3
                  overflow-hidden rounded-xl
                  px-4 py-3
                  text-sm font-medium
                  transition-all duration-200
                  ${
                    active
                      ? "bg-white text-red-800 shadow-lg shadow-black/10"
                      : "text-white hover:bg-white/10 hover:pl-5"
                  }
                `}
              >
                <Icon
                  className={`
                    h-[18px] w-[18px] shrink-0
                    ${
                      active
                        ? "text-red-700"
                        : "text-red-200 group-hover:text-white"
                    }
                  `}
                />

                <span className="min-w-0 flex-1 truncate">
                  {t[item.key]}
                </span>

                {item.key === "contactRequests" &&
                  pendingRequests > 0 && (
                    <span
                      className="
                        flex h-6 min-w-6 shrink-0
                        items-center justify-center
                        rounded-full
                        bg-red-500
                        px-1.5
                        text-[11px]
                        font-bold
                        text-white
                        shadow-md
                        ring-2 ring-red-900
                      "
                    >
                      {pendingRequests > 99
                        ? "99+"
                        : pendingRequests}
                    </span>
                  )}

                {active && pendingRequests === 0 && (
                  <ChevronRight
                    className={`
                      h-4 w-4 shrink-0
                      ${
                        active
                          ? "text-red-600"
                          : "text-white"
                      }
                    `}
                  />
                )}

                {active &&
                  item.key === "contactRequests" &&
                  pendingRequests > 0 && (
                    <ChevronRight className="h-4 w-4 shrink-0 text-red-600" />
                  )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* FOOTER */}
      <div
        className="
          shrink-0
          border-t border-white/10
          bg-black/5
          px-5 py-4
        "
      >
        <p className="truncate text-xs font-medium text-red-200">
          {t.organization}
        </p>
      </div>
    </aside>
  );
}
