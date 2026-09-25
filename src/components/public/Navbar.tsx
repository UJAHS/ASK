"use client";

import { useState } from "react";

type Locale = "EN" | "GU" | "HI";

const labels = {
  EN: {
    about: "About",
    objectives: "Objectives",
    activities: "Activities",
    events: "Events",
    trustees: "Trustees",
    news: "News",
    gallery: "Gallery",
    donate: "Donate",
  },
  GU: {
    about: "ટ્રસ્ટ વિશે",
    objectives: "હેતુઓ",
    activities: "પ્રવૃત્તિઓ",
    events: "કાર્યક્રમો",
    trustees: "ટ્રસ્ટીઓ",
    news: "સમાચાર",
    gallery: "ગેલેરી",
    donate: "દાન કરો",
  },
  HI: {
    about: "ट्रस्ट के बारे में",
    objectives: "उद्देश्य",
    activities: "गतिविधियाँ",
    events: "कार्यक्रम",
    trustees: "ट्रस्टी",
    news: "समाचार",
    gallery: "गैलरी",
    donate: "दान करें",
  },
};

export default function Navbar() {
  const [locale, setLocale] = useState<Locale>("EN");
  const [open, setOpen] = useState(false);

  const t = labels[locale];

  const navigation = [
    ["about", "#about"],
    ["objectives", "#objectives"],
    ["activities", "#activities"],
    ["events", "#events"],
    ["trustees", "#trustees"],
    ["news", "#news"],
    ["gallery", "#gallery"],
  ] as const;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

        <a
          href="#home"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-700 text-lg font-bold text-white shadow-lg">
            H
          </div>

          <div className="hidden sm:block">
            <div className="text-sm font-bold tracking-wide text-emerald-900">
              SHREE HATKESH
            </div>
            <div className="text-xs font-medium text-slate-500">
              VIDHYOTEJAK TRUST
            </div>
          </div>
        </a>

        <nav className="hidden items-center gap-5 xl:flex">
          {navigation.map(([key, href]) => (
            <a
              key={key}
              href={href}
              className="text-sm font-medium text-slate-700 transition hover:text-emerald-700"
            >
              {t[key]}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex rounded-full border border-slate-200 bg-slate-50 p-1">
            {(["EN", "GU", "HI"] as Locale[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setLocale(item)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  locale === item
                    ? "bg-emerald-700 text-white"
                    : "text-slate-600 hover:text-emerald-700"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <a
            href="#donate"
            className="rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            {t.donate}
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
          className="rounded-lg border border-slate-200 p-2 lg:hidden"
        >
          <span className="block h-0.5 w-5 bg-slate-700" />
          <span className="my-1.5 block h-0.5 w-5 bg-slate-700" />
          <span className="block h-0.5 w-5 bg-slate-700" />
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-5 py-5 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navigation.map(([key, href]) => (
              <a
                key={key}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
              >
                {t[key]}
              </a>
            ))}
          </nav>

          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
            <div className="flex rounded-full border border-slate-200 bg-slate-50 p-1">
              {(["EN", "GU", "HI"] as Locale[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLocale(item)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    locale === item
                      ? "bg-emerald-700 text-white"
                      : "text-slate-600"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <a
              href="#donate"
              onClick={() => setOpen(false)}
              className="rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white"
            >
              {t.donate}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
