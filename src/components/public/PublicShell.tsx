"use client";

import PublicNavbar from "@/components/public/PublicNavbar";
import type { Locale } from "@/i18n/config";

type PublicShellProps = {
  children: React.ReactNode;
  locale: Locale;
};

export default function PublicShell({
  children,
  locale,
}: PublicShellProps) {
  return (
    <>
      <PublicNavbar locale={locale} />
      <main>{children}</main>
    </>
  );
}