"use client";

import Link from "next/link";
import { ArrowRight, Heart, Users, Sparkles, CalendarDays, ShieldCheck } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Locale = "en" | "hi" | "gu";

const content: Record<
  Locale,
  {
    badge: string;
    title1: string;
    title2: string;
    description: string;
    join: string;
    explore: string;
    community: string;
    communityText: string;
    culture: string;
    events: string;
    place: string;
    connected: string;
  }
> = {
  en: {
    badge: "AHHICHATRA SANSKAR KENDRA",
    title1: "A community that",
    title2: "keeps us connected.",
    description:
      "Discover people, culture, activities and meaningful connections through the ASK Community Portal.",
    join: "Join ASK",
    explore: "Explore Community",
    community: "Community",
    communityText: "A place to connect, participate and belong.",
    culture: "Culture & Values",
    events: "Community Events",
    place: "A place to connect, participate and belong.",
    connected: "Stay Connected",
  },
  hi: {
    badge: "अहिच्छत्र संस्कार केंद्र",
    title1: "एक समुदाय जो",
    title2: "हमें जोड़कर रखता है।",
    description:
      "ASK कम्युनिटी पोर्टल के माध्यम से लोगों, संस्कृति, गतिविधियों और सार्थक संबंधों से जुड़ें।",
    join: "ASK से जुड़ें",
    explore: "समुदाय देखें",
    community: "समुदाय",
    communityText: "जुड़ने, भाग लेने और साथ रहने का स्थान।",
    culture: "संस्कृति और मूल्य",
    events: "सामुदायिक कार्यक्रम",
    place: "जुड़ने, भाग लेने और साथ रहने का स्थान।",
    connected: "जुड़े रहें",
  },
  gu: {
    badge: "અહિચ્છત્ર સંસ્કાર કેન્દ્ર",
    title1: "એક સમુદાય જે",
    title2: "આપણને જોડીને રાખે છે.",
    description:
      "ASK કમ્યુનિટી પોર્ટલ દ્વારા લોકો, સંસ્કૃતિ, પ્રવૃત્તિઓ અને અર્થપૂર્ણ સંબંધો સાથે જોડાઓ.",
    join: "ASK સાથે જોડાઓ",
    explore: "સમુદાય જુઓ",
    community: "સમુદાય",
    communityText: "જોડાવા, ભાગ લેવા અને સાથે રહેવાનું સ્થળ.",
    culture: "સંસ્કૃતિ અને મૂલ્યો",
    events: "સમુદાય કાર્યક્રમો",
    place: "જોડાવા, ભાગ લેવા અને સાથે રહેવાનું સ્થળ.",
    connected: "જોડાયેલા રહો",
  },
};

function getLocaleFromPath(pathname: string): Locale {
  const firstSegment = pathname
    .split("/")
    .filter(Boolean)[0];

  if (firstSegment === "hi" || firstSegment === "gu") {
    return firstSegment;
  }

  return "en";
}

export default function PublicHero() {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const locale = getLocaleFromPath(pathname);
  const t = content[locale];

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <section
      className={`
        relative isolate overflow-hidden
        transition-colors duration-500
        ${
          isDark
            ? "bg-[#3b0710] text-white"
            : "bg-[#fff5f6] text-[#3b0710]"
        }
      `}
    >
      {/* Background atmosphere */}
      <div
        className={`
          pointer-events-none absolute inset-0 -z-10
          transition-all duration-700
          ${
            isDark
              ? "bg-[radial-gradient(circle_at_70%_25%,rgba(255,45,75,0.18),transparent_30%),radial-gradient(circle_at_20%_70%,rgba(190,0,30,0.16),transparent_32%)]"
              : "bg-[radial-gradient(circle_at_70%_25%,rgba(255,105,130,0.20),transparent_30%),radial-gradient(circle_at_20%_70%,rgba(255,180,195,0.28),transparent_35%)]"
          }
        `}
      />

      {/* Decorative glow */}
      <div
        className={`
          pointer-events-none absolute -right-40 top-20
          h-[500px] w-[500px] rounded-full blur-3xl
          transition-all duration-700
          ${
            isDark
              ? "bg-red-700/10"
              : "bg-pink-300/25"
          }
        `}
      />

      <div className="mx-auto max-w-7xl px-6 pb-16 pt-8 sm:px-8 lg:px-10 lg:pb-20 lg:pt-10">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* LEFT CONTENT */}
          <div className="relative z-10">
            {/* Badge */}
            <div
              className={`
                mb-7 inline-flex items-center gap-2 rounded-full
                border px-4 py-2 text-[11px] font-semibold
                tracking-[0.18em]
                transition-all duration-500
                ${
                  isDark
                    ? "border-red-400/30 bg-red-950/50 text-red-100"
                    : "border-red-200 bg-white/80 text-red-800 shadow-sm"
                }
              `}
            >
              <span
                className={`
                  flex h-5 w-5 items-center justify-center rounded-full
                  ${
                    isDark
                      ? "bg-red-600 text-white"
                      : "bg-red-600 text-white"
                  }
                `}
              >
                <Sparkles className="h-3 w-3" />
              </span>

              {t.badge}
            </div>

            {/* Heading */}
            <h1
              className={`
  max-w-[560px]
  text-4xl font-black leading-[1.02]
  tracking-[-0.035em]
  sm:text-5xl
  lg:text-[54px]
  xl:text-[60px]
  transition-colors duration-500
  ${
    isDark
      ? "text-white"
      : "text-[#3b0710]"
  }
`}
            >
              {t.title1}
              <br />
              <span
                className={`
                  transition-colors duration-500
                  ${
                    isDark
                      ? "text-[#ff9aaa]"
                      : "text-[#d31335]"
                  }
                `}
              >
                {t.title2}
              </span>
            </h1>

            {/* Description */}
            <p
              className={`
                mt-7 max-w-xl text-base leading-7
                transition-colors duration-500
                sm:text-lg
                ${
                  isDark
                    ? "text-red-100/75"
                    : "text-[#6f2735]"
                }
              `}
            >
              {t.description}
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`/${locale}/register`}
                className={`
                  group inline-flex items-center gap-3 rounded-xl
                  px-6 py-3.5 text-sm font-bold
                  shadow-lg transition-all duration-300
                  hover:-translate-y-0.5 hover:shadow-xl
                  ${
                    isDark
                      ? "bg-[#f0002b] text-white shadow-red-950/40 hover:bg-[#ff123d]"
                      : "bg-[#d9002b] text-white shadow-red-300/40 hover:bg-[#b90025]"
                  }
                `}
              >
                {t.join}

                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href={`/${locale}/about`}
                className={`
                  inline-flex items-center rounded-xl
                  border px-6 py-3.5 text-sm font-bold
                  transition-all duration-300
                  ${
                    isDark
                      ? "border-red-300/30 bg-red-950/30 text-white hover:border-red-300/50 hover:bg-red-900/40"
                      : "border-red-200 bg-white/80 text-[#5c0a17] shadow-sm hover:border-red-300 hover:bg-white"
                  }
                `}
              >
                {t.explore}
              </Link>
            </div>

            {/* Small community line */}
            <div className="mt-9 flex items-center gap-4">
              <div className="flex -space-x-2">
                {["A", "S", "K"].map((letter) => (
                  <div
                    key={letter}
                    className={`
                      flex h-8 w-8 items-center justify-center
                      rounded-full border-2 text-[10px] font-bold
                      ${
                        isDark
                          ? "border-[#3b0710] bg-red-600 text-white"
                          : "border-[#fff5f6] bg-red-600 text-white"
                      }
                    `}
                  >
                    {letter}
                  </div>
                ))}
              </div>

              <span
                className={`
                  text-xs font-medium
                  ${
                    isDark
                      ? "text-red-100/65"
                      : "text-[#7b3442]"
                  }
                `}
              >
                {t.place}
              </span>
            </div>
          </div>

          {/* RIGHT IMAGE COMPOSITION */}
          <div className="relative min-h-[470px] sm:min-h-[540px]">
            {/* Main image frame */}
            <div
              className={`
                absolute right-[7%] top-4
                h-[370px] w-[72%]
                overflow-hidden rounded-[28px]
                border shadow-2xl
                transition-all duration-500
                sm:h-[440px]
                ${
                  isDark
                    ? "border-red-300/20 bg-red-950/40 shadow-black/40"
                    : "border-red-200 bg-white shadow-red-200/50"
                }
              `}
            >
              <img
                src="https://images.unsplash.com/photo-1762899570516-57628ac64a99?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600"
                alt="Community and heritage"
                className="h-full w-full object-cover"
              />

              {/* Image overlay */}
              <div
                className={`
                  absolute inset-0 transition-all duration-500
                  ${
                    isDark
                      ? "bg-gradient-to-t from-[#3b0710]/55 via-transparent to-transparent"
                      : "bg-gradient-to-t from-white/20 via-transparent to-transparent"
                  }
                `}
              />
            </div>

            {/* Wedding image */}
            <div
              className={`
                absolute bottom-20 left-[4%]
                h-[185px] w-[42%]
                overflow-hidden rounded-2xl
                border-4 shadow-2xl
                transition-all duration-500
                sm:h-[190px]
                ${
                  isDark
                    ? "border-[#3b0710] shadow-black/50"
                    : "border-[#fff5f6] shadow-red-200/60"
                }
              `}
            >
              <img
                src="https://images.unsplash.com/photo-1760080903525-d3608e3bbe2d?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=900"
                alt="Community celebration"
                className="h-full w-full object-cover"
              />

              <div
                className={`
                  absolute inset-0
                  ${
                    isDark
                      ? "bg-gradient-to-t from-red-950/30 to-transparent"
                      : "bg-gradient-to-t from-white/10 to-transparent"
                  }
                `}
              />
            </div>

            {/* Heritage / culture image */}
            <div
              className={`
                absolute right-[0%] top-0
                h-[170px] w-[28%]
                overflow-hidden rounded-2xl
                border shadow-2xl
                transition-all duration-500
                sm:h-[175px]
                ${
                  isDark
                    ? "border-red-300/20 shadow-black/50"
                    : "border-red-200 shadow-red-200/50"
                }
              `}
            >
              <img
                src="https://images.unsplash.com/photo-1769326309527-0c6fed6cfe22?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=700"
                alt="Indian culture"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Heart floating card */}
            <div
              className={`
                absolute left-[8%] top-[105px]
                flex h-12 w-12 items-center justify-center
                rounded-2xl shadow-xl
                transition-all duration-500
                ${
                  isDark
                    ? "bg-[#c90025] text-white shadow-red-950/50"
                    : "bg-[#d9002b] text-white shadow-red-300/50"
                }
              `}
            >
              <Heart className="h-5 w-5 fill-current" />
            </div>

            {/* Stay connected card */}
            <div
              className={`
                absolute bottom-16 right-[0%]
                flex items-center gap-3 rounded-2xl
                border px-4 py-3 shadow-xl
                transition-all duration-500
                ${
                  isDark
                    ? "border-red-300/20 bg-red-950/90 text-white shadow-black/40"
                    : "border-red-200 bg-white/95 text-[#4a0a15] shadow-red-200/50"
                }
              `}
            >
              <div
                className={`
                  flex h-10 w-10 items-center justify-center rounded-xl
                  ${
                    isDark
                      ? "bg-red-800 text-red-100"
                      : "bg-red-100 text-red-700"
                  }
                `}
              >
                <Users className="h-5 w-5" />
              </div>

              <div>
                <p
                  className={`
                    text-[10px] font-semibold uppercase tracking-wider
                    ${
                      isDark
                        ? "text-red-200/60"
                        : "text-red-700/60"
                    }
                  `}
                >
                  Community
                </p>

                <p className="text-sm font-bold">
                  {t.connected}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURE STRIP */}
        <div
          className={`
            relative mt-8 grid overflow-hidden rounded-2xl
            border transition-all duration-500
            sm:grid-cols-3
            ${
              isDark
                ? "border-red-300/20 bg-red-950/35"
                : "border-red-200 bg-white/75 shadow-sm"
            }
          `}
        >
          {/* Community */}
          <div
            className={`
              flex items-center gap-4 px-6 py-5
              transition-colors duration-300
              ${
                isDark
                  ? "border-red-300/10 sm:border-r"
                  : "border-red-100 sm:border-r"
              }
            `}
          >
            <div
              className={`
                flex h-11 w-11 shrink-0 items-center justify-center rounded-xl
                ${
                  isDark
                    ? "bg-red-900/70 text-red-200"
                    : "bg-red-100 text-red-700"
                }
              `}
            >
              <Users className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p
                className={`
                  text-sm font-bold
                  ${
                    isDark
                      ? "text-white"
                      : "text-[#4a0a15]"
                  }
                `}
              >
                {t.community}
              </p>

              <p
                className={`
                  mt-1 text-xs
                  ${
                    isDark
                      ? "text-red-100/55"
                      : "text-[#7b3442]"
                  }
                `}
              >
                {t.communityText}
              </p>
            </div>

            <ShieldCheck
              className={`
                ml-auto h-4 w-4 shrink-0
                ${
                  isDark
                    ? "text-red-400"
                    : "text-red-600"
                }
              `}
            />
          </div>

          {/* Culture */}
          <div
            className={`
              flex items-center gap-4 border-t px-6 py-5
              transition-colors duration-300
              sm:border-t-0 sm:border-r
              ${
                isDark
                  ? "border-red-300/10"
                  : "border-red-100"
              }
            `}
          >
            <div
              className={`
                flex h-11 w-11 shrink-0 items-center justify-center rounded-xl
                ${
                  isDark
                    ? "bg-red-900/70 text-red-200"
                    : "bg-red-100 text-red-700"
                }
              `}
            >
              <Sparkles className="h-5 w-5" />
            </div>

            <p
              className={`
                text-sm font-bold
                ${
                  isDark
                    ? "text-white"
                    : "text-[#4a0a15]"
                }
              `}
            >
              {t.culture}
            </p>

            <ShieldCheck
              className={`
                ml-auto h-4 w-4
                ${
                  isDark
                    ? "text-red-400"
                    : "text-red-600"
                }
              `}
            />
          </div>

          {/* Events */}
          <div className="flex items-center gap-4 border-t px-6 py-5 sm:border-t-0">
            <div
              className={`
                flex h-11 w-11 shrink-0 items-center justify-center rounded-xl
                ${
                  isDark
                    ? "bg-red-900/70 text-red-200"
                    : "bg-red-100 text-red-700"
                }
              `}
            >
              <CalendarDays className="h-5 w-5" />
            </div>

            <p
              className={`
                text-sm font-bold
                ${
                  isDark
                    ? "text-white"
                    : "text-[#4a0a15]"
                }
              `}
            >
              {t.events}
            </p>

            <ShieldCheck
              className={`
                ml-auto h-4 w-4
                ${
                  isDark
                    ? "text-red-400"
                    : "text-red-600"
                }
              `}
            />
          </div>
        </div>
      </div>
    </section>
  );
}