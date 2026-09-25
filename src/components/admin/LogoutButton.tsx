"use client";

import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const translations = {
  en: {
    logout: "Logout",
  },

  hi: {
    logout: "लॉग आउट",
  },

  gu: {
    logout: "લોગ આઉટ",
  },
};

export default function LogoutButton({
  callbackUrl = "/login",
}: {
  callbackUrl?: string;
}) {
  const pathname = usePathname();

  const firstSegment = pathname.split("/")[1];

  const locale =
    firstSegment === "hi" || firstSegment === "gu"
      ? firstSegment
      : "en";

  const t = translations[locale];

  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl,
        })
      }
      className="rounded bg-red-600 px-6 py-2 text-white transition hover:bg-red-700"
    >
      {t.logout}
    </button>
  );
}