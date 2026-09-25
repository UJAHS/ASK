import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { EventForm } from "@/components/admin/EventForm";
import {
  isValidLocale,
  type Locale,
} from "@/i18n/config";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

const pageText: Record<
  Locale,
  {
    title: string;
    description: string;
    back: string;
  }
> = {
  en: {
    title: "Create Event",
    description:
      "Create an event in the selected language.",
    back: "← Back to Events",
  },

  hi: {
    title: "कार्यक्रम बनाएं",
    description:
      "चयनित भाषा में कार्यक्रम बनाएं।",
    back: "← कार्यक्रमों पर वापस जाएं",
  },

  gu: {
    title: "કાર્યક્રમ બનાવો",
    description:
      "પસંદ કરેલી ભાષામાં કાર્યક્રમ બનાવો.",
    back: "← કાર્યક્રમો પર પાછા જાઓ",
  },
};

export const dynamic = "force-dynamic";

export default async function NewEventPage({
  params,
}: Props) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const currentLocale: Locale = locale;
  const text = pageText[currentLocale];

  /* -----------------------------
     ADMIN AUTHORIZATION
  ----------------------------- */

  const session = await auth();

  const role = session?.user
    ? String(
        (session.user as { role?: string }).role ||
          "",
      )
    : "";

  const isAdmin =
    role === "ADMIN" ||
    role === "SUPER_ADMIN";

  if (!isAdmin) {
    redirect(
      `/${currentLocale}/unauthorized`,
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      {/* PAGE HEADER */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <a
            href={`/${currentLocale}/admin/events`}
            className="
              mb-3
              inline-flex
              items-center
              text-sm
              font-semibold
              text-red-700
              transition-colors
              hover:text-red-900
              dark:text-red-300
              dark:hover:text-red-100
            "
          >
            {text.back}
          </a>

          <h1
            className="
              text-3xl
              font-bold
              text-red-950
              dark:text-white
            "
          >
            {text.title}
          </h1>

          <p
            className="
              mt-1
              text-sm
              text-red-900/70
              dark:text-red-100/65
            "
          >
            {text.description}
          </p>
        </div>
      </div>

      {/* EVENT FORM AREA */}
      <div
        className="
          rounded-2xl
          border
          border-red-200/80
          bg-gradient-to-br
          from-[#fff0f2]
          via-[#ffe4e9]
          to-[#ffd6df]
          p-1
          shadow-lg
          shadow-red-900/10
          dark:border-red-300/20
          dark:from-[#68131f]
          dark:via-[#570e18]
          dark:to-[#410810]
        "
      >
        <EventForm
          locale={currentLocale}
        />
      </div>
    </div>
  );
}