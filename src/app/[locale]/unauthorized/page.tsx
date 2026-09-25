"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const translations = {
  en: {
    title: "Access Denied",
    message: "You do not have permission to access this page.",
    back: "Go to Home",
  },
  hi: {
    title: "पहुंच अस्वीकृत",
    message: "आपको इस पेज को देखने की अनुमति नहीं है।",
    back: "होम पर जाएं",
  },
  gu: {
    title: "ઍક્સેસ નકારવામાં આવ્યો",
    message: "તમને આ પેજ ઍક્સેસ કરવાની પરવાનગી નથી.",
    back: "હોમ પર જાઓ",
  },
};

export default function UnauthorizedPage() {
  const params = useParams();

  const locale =
    typeof params.locale === "string"
      ? params.locale
      : "en";

  const t =
    translations[locale as keyof typeof translations] ||
    translations.en;

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          {t.title}
        </h1>

        <p className="mt-4 text-gray-600">
          {t.message}
        </p>

        <Link
          href={`/${locale}`}
          className="inline-block mt-6 rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
        >
          {t.back}
        </Link>
      </div>
    </main>
  );
}