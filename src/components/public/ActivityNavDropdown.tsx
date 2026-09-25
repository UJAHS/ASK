"use client";

import Link from "next/link";
import { ChevronDown, CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";

type Locale = "en" | "hi" | "gu";

type ActivityItem = {
  id: string;
  title: string;
  category: string | null;
  activityDate: string | null;
};

type ActivityNavDropdownProps = {
  locale: Locale;
  label: string;
  mobile?: boolean;
  onNavigate?: () => void;
};

const labels = {
  en: {
    activities: "Activities",
    loading: "Loading activities...",
    noActivities: "No activities available",
    viewAll: "View all activities",
  },
  hi: {
    activities: "गतिविधियाँ",
    loading: "गतिविधियाँ लोड हो रही हैं...",
    noActivities: "कोई गतिविधि उपलब्ध नहीं है",
    viewAll: "सभी गतिविधियाँ देखें",
  },
  gu: {
    activities: "પ્રવૃત્તિઓ",
    loading: "પ્રવૃત્તિઓ લોડ થઈ રહી છે...",
    noActivities: "કોઈ પ્રવૃત્તિ ઉપલબ્ધ નથી",
    viewAll: "બધી પ્રવૃત્તિઓ જુઓ",
  },
} as const;

export default function ActivityNavDropdown({
  locale,
  label,
  mobile = false,
  onNavigate,
}: ActivityNavDropdownProps) {
  const [open, setOpen] = useState(false);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(false);

  const t = labels[locale];

  useEffect(() => {
    let cancelled = false;

    async function loadActivities() {
      setLoading(true);

      try {
        const response = await fetch(
          `/api/public/activities?locale=${locale}`,
          {
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to load activities");
        }

        const data = await response.json();

        if (!cancelled) {
          setActivities(
            Array.isArray(data.activities)
              ? data.activities
              : [],
          );
        }
      } catch (error) {
        console.error("Activity navigation error:", error);

        if (!cancelled) {
          setActivities([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadActivities();

    return () => {
      cancelled = true;
    };
  }, [locale]);

  function handleNavigate() {
    setOpen(false);
    onNavigate?.();
  }

  if (mobile) {
    return (
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="
            flex
            w-full
            items-center
            justify-between
            rounded-xl
            px-4
            py-3.5
            text-sm
            font-semibold
            text-[#fff8e7]/95
            transition-all
            duration-200
            hover:bg-[#fff8e7]/10
          "
          aria-expanded={open}
        >
          <span>{label}</span>

          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div
            className="
              ml-3
              mt-1
              space-y-1
              border-l
              border-[#fff8e7]/20
              pl-2
            "
          >
            {loading ? (
              <div className="px-4 py-3 text-sm text-[#fff8e7]/70">
                {t.loading}
              </div>
            ) : activities.length === 0 ? (
              <div className="px-4 py-3 text-sm text-[#fff8e7]/70">
                {t.noActivities}
              </div>
            ) : (
              activities.map((activity) => (
                <Link
                  key={activity.id}
                  href={`/${locale}/activities`}
                  onClick={handleNavigate}
                  className="
                    block
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    text-[#fff8e7]/90
                    transition-all
                    duration-200
                    hover:bg-[#fff8e7]/10
                    hover:text-[#fff8e7]
                  "
                >
                  {activity.title}
                </Link>
              ))
            )}

            <Link
              href={`/${locale}/activities`}
              onClick={handleNavigate}
              className="
                block
                rounded-xl
                px-4
                py-3
                text-sm
                font-bold
                text-[#fff8e7]
                hover:bg-[#fff8e7]/10
              "
            >
              {t.viewAll}
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="
          flex
          items-center
          gap-1.5
          rounded-xl
          px-4
          py-3
          text-[14px]
          font-semibold
          text-[#fff8e7]/95
          transition-all
          duration-300
          hover:bg-[#fff8e7]/12
          hover:text-[#fff8e7]
        "
        aria-expanded={open}
      >
        {label}

        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className="
            absolute
            left-1/2
            top-full
            z-[70]
            mt-2
            w-80
            -translate-x-1/2
            overflow-hidden
            rounded-2xl
            border
            border-[#d9ad55]/45
            bg-[#9B0F16]
            p-2
            shadow-[0_20px_50px_rgba(80,0,10,0.40)]
          "
        >
          <div className="px-3 py-2">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#fff8e7]/60">
              {t.activities}
            </div>
          </div>

          <div className="max-h-[360px] overflow-y-auto">
            {loading ? (
              <div className="px-4 py-4 text-sm text-[#fff8e7]/70">
                {t.loading}
              </div>
            ) : activities.length === 0 ? (
              <div className="px-4 py-4 text-sm text-[#fff8e7]/70">
                {t.noActivities}
              </div>
            ) : (
              activities.map((activity) => (
                <Link
                  key={activity.id}
                  href={`/${locale}/activities`}
                  onClick={handleNavigate}
                  className="
                    group
                    flex
                    items-start
                    gap-3
                    rounded-xl
                    px-3
                    py-3
                    transition-all
                    duration-200
                    hover:bg-[#fff8e7]/12
                  "
                >
                  <span
                    className="
                      mt-0.5
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#fff8e7]/10
                      text-[#fff8e7]
                    "
                  >
                    <CalendarDays className="h-4 w-4" />
                  </span>

                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-[#fff8e7]">
                      {activity.title}
                    </span>

                    {activity.category && (
                      <span className="mt-0.5 block truncate text-xs text-[#fff8e7]/55">
                        {activity.category}
                      </span>
                    )}
                  </span>
                </Link>
              ))
            )}
          </div>

          <div className="mt-1 border-t border-[#fff8e7]/15 pt-1">
            <Link
              href={`/${locale}/activities`}
              onClick={handleNavigate}
              className="
                block
                rounded-xl
                px-3
                py-3
                text-center
                text-sm
                font-bold
                text-[#fff8e7]
                transition-all
                hover:bg-[#fff8e7]/10
              "
            >
              {t.viewAll}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}