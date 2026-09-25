import "@/app/heritage.css";
import { notFound } from "next/navigation";

import PublicNavbar from "@/components/public/PublicNavbar";
import { isValidLocale, type Locale } from "@/i18n/config";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const currentLocale: Locale = locale;

  return (
    <>
      <PublicNavbar locale={currentLocale} />

      <main className="ask-public-page min-h-screen">
        {children}
      </main>
    </>
  );
}