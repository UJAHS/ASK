"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  CalendarDays,
  Database,
  FileText,
  GalleryHorizontal,
  HeartHandshake,
  LayoutDashboard,
  Settings,
  Users,
  UsersRound,
} from "lucide-react";

type Locale = "en" | "hi" | "gu";

type MenuItem = {
  key: string;
  en: string;
  hi: string;
  gu: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
};

const menus: MenuItem[] = [
  {
    key: "dashboard",
    en: "Dashboard",
    hi: "\u0921\u0948\u0936\u092C\u094B\u0930\u094D\u0921",
    gu: "\u0AA1\u0AC7\u0AB6\u0AAC\u0ACB\u0AB0\u0ACD\u0AA1",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    key: "masterData",
    en: "Master Data",
    hi: "\u092E\u093E\u0938\u094D\u091F\u0930 \u0921\u0947\u091F\u093E",
    gu: "\u0AAE\u0ABE\u0AB8\u0ACD\u0A9F\u0AB0 \u0AA1\u0AC7\u0A9F\u0ABE",
    url: "/admin/master-data",
    icon: Database,
  },
  {
    key: "members",
    en: "Members",
    hi: "\u0938\u0926\u0938\u094D\u092F",
    gu: "\u0AB8\u0AAD\u0ACD\u0AAF\u0ACB",
    url: "/admin/members",
    icon: Users,
  },
  {
    key: "news",
    en: "News",
    hi: "\u0938\u092E\u093E\u091A\u093E\u0930",
    gu: "\u0AB8\u0AAE\u0ABE\u0A9A\u0ABE\u0AB0",
    url: "/admin/news",
    icon: FileText,
  },
  {
    key: "activities",
    en: "Activities",
    hi: "\u0917\u0924\u093F\u0935\u093F\u0927\u093F\u092F\u093E\u0901",
    gu: "\u0AAA\u0ACD\u0AB0\u0AB5\u0AC3\u0AA4\u0ACD\u0AA4\u0ABF\u0A93",
    url: "/admin/activities",
    icon: Activity,
  },
  {
    key: "events",
    en: "Events",
    hi: "\u0915\u093E\u0930\u094D\u092F\u0915\u094D\u0930\u092E",
    gu: "\u0A95\u0ABE\u0AB0\u0ACD\u0AAF\u0A95\u0ACD\u0AB0\u0AAE\u0ACB",
    url: "/admin/events",
    icon: CalendarDays,
  },
  {
    key: "gallery",
    en: "Gallery",
    hi: "\u0917\u0948\u0932\u0930\u0940",
    gu: "\u0A97\u0AC7\u0AB2\u0AC7\u0AB0\u0AC0",
    url: "/admin/gallery",
    icon: GalleryHorizontal,
  },
  {
    key: "donations",
    en: "Donations",
    hi: "\u0926\u093E\u0928",
    gu: "\u0AA6\u0ABE\u0AA8",
    url: "/admin/donations",
    icon: HeartHandshake,
  },
  {
    key: "matrimonial",
    en: "Matrimonial",
    hi: "\u0935\u093F\u0935\u093E\u0939 \u092A\u0930\u093F\u091A\u092F",
    gu: "\u0AB5\u0AC8\u0AB5\u0ABE\u0AB9\u0ABF\u0A95",
    url: "/admin/matrimonial",
    icon: UsersRound,
  },
  {
    key: "settings",
    en: "Settings",
    hi: "\u0938\u0947\u091F\u093F\u0902\u0917\u094D\u0938",
    gu: "\u0AB8\u0AC7\u0A9F\u0ABF\u0A82\u0A97\u0ACD\u0AB8",
    url: "/admin/settings",
    icon: Settings,
  },
];

const translations: Record<
  Locale,
  {
    title: string;
    subtitle: string;
    footer: string;
  }
> = {
  en: {
    title: "ASK Community",
    subtitle: "Administration Portal",
    footer: "Ahhichatra Sanskar Kendra",
  },

  hi: {
    title: "ASK \u0915\u092E\u094D\u092F\u0941\u0928\u093F\u091F\u0940",
    subtitle: "\u092A\u094D\u0930\u0936\u093E\u0938\u0928 \u092A\u094B\u0930\u094D\u091F\u0932",
    footer: "\u0905\u0939\u093F\u091A\u094D\u091B\u0924\u094D\u0930 \u0938\u0902\u0938\u094D\u0915\u093E\u0930 \u0915\u0947\u0902\u0926\u094D\u0930",
  },

  gu: {
    title: "ASK \u0A95\u0AAE\u0ACD\u0AAF\u0AC1\u0AA8\u0ABF\u0A9F\u0AC0",
    subtitle: "\u0A8F\u0AA1\u0AAE\u0ABF\u0AA8\u0ABF\u0AB8\u0ACD\u0A9F\u0ACD\u0AB0\u0AC7\u0AB6\u0AA8 \u0AAA\u0ACB\u0AB0\u0ACD\u0A9F\u0AB2",
    footer: "\u0A85\u0AB9\u0ABF\u0A9A\u0ACD\u0A9B\u0AA4\u0ACD\u0AB0 \u0AB8\u0A82\u0AB8\u0ACD\u0A95\u0ABE\u0AB0 \u0A95\u0AC7\u0AA8\u0ACD\u0AA6\u0ACD\u0AB0",
  },
};

export default function Sidebar() {
  const pathname = usePathname();

  const firstSegment = pathname.split("/").filter(Boolean)[0];

  const locale: Locale =
    firstSegment === "hi" || firstSegment === "gu"
      ? firstSegment
      : "en";

  const t = translations[locale];

  return (
    <aside
      className="
        fixed inset-y-0 left-0 z-40
        hidden md:flex
        w-64 min-w-64 max-w-64
        flex-col
        overflow-hidden
        bg-gradient-to-b
        from-red-900
        via-red-800
        to-red-900
        text-white
        shadow-2xl
        shadow-red-950/20
        dark:from-[#3f0710]
        dark:via-[#4f0a15]
        dark:to-[#2a0409]
      "
    >
      {/* BRAND */}
      <div
        className="
          flex h-28 shrink-0
          items-center
          overflow-hidden
          border-b border-white/10
          px-4
          text-white
          dark:text-white
        "
      >
        <Link
          href={`/${locale}/admin/dashboard`}
          className="flex min-w-0 w-full items-center gap-3"
        >
          <div
            className="
              h-14 w-14
              shrink-0
              overflow-hidden
              rounded-full
              border-2 border-[#e2b85d]
              bg-white
              p-1
              shadow-[0_4px_18px_rgba(226,184,93,0.35)]
            "
          >
            <img
              src="/images/ask-shiva-logo.jpg"
              alt="Ahhichatra Sanskar Kendra"
              className="h-full w-full rounded-full object-contain"
            />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold tracking-tight !text-white">
              {t.title}
            </h1>

            <p className="mt-1 truncate text-xs font-medium !text-[#F7C948]">
              {t.subtitle}
            </p>
          </div>
        </Link>
      </div>

      {/* NAVIGATION */}
      <nav
        className="
          min-h-0 flex-1
          overflow-x-hidden
          overflow-y-auto
          px-3 py-4
        "
      >
        <div className="space-y-1">
          {menus.map((item) => {
            const localizedHref = `/${locale}${item.url}`;

            const active =
              pathname === localizedHref ||
              pathname.startsWith(`${localizedHref}/`);

            const Icon = item.icon;

            const label =
              locale === "hi"
                ? item.hi
                : locale === "gu"
                  ? item.gu
                  : item.en;

            return (
              <Link
                key={item.key}
                href={localizedHref}
                className={`
                  group
                  flex w-full
                  items-center
                  gap-3
                  overflow-hidden
                  rounded-xl
                  px-4 py-3
                  text-sm
                  font-medium
                  transition-all
                  duration-200
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
                  {label}
                </span>

                {active && (
                  <span
                    className="
                      h-2 w-2
                      shrink-0
                      rounded-full
                      bg-red-600
                    "
                  />
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
          {t.footer}
        </p>
      </div>
    </aside>
  );
}