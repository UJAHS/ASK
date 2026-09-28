import { notFound } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import LogoutButton from "@/components/admin/LogoutButton";
import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { isValidLocale, type Locale } from "@/i18n/config";

const translations = {
  en: {
    title: "Ahhichatra Sanskar Kendra",
    subtitle: "Administration Panel",
    admin: "Super Admin",
  },
  hi: {
    title: "\u0905\u0939\u093F\u091A\u094D\u091B\u0924\u094D\u0930 \u0938\u0902\u0938\u094D\u0915\u093E\u0930 \u0915\u0947\u0902\u0926\u094D\u0930",
    subtitle: "\u092A\u094D\u0930\u0936\u093E\u0938\u0928 \u092A\u0948\u0928\u0932",
    admin: "\u0938\u0941\u092A\u0930 \u090F\u0921\u092E\u093F\u0928",
  },
  gu: {
    title: "\u0A85\u0AB9\u0ABF\u0A9A\u0ACD\u0A9B\u0AA4\u0ACD\u0AB0 \u0AB8\u0A82\u0AB8\u0ACD\u0A95\u0ABE\u0AB0 \u0A95\u0AC7\u0AA8\u0ACD\u0AA6\u0ACD\u0AB0",
    subtitle: "\u0A8F\u0AA1\u0AAE\u0ABF\u0AA8\u0ABF\u0AB8\u0ACD\u0A9F\u0ACD\u0AB0\u0AC7\u0AB6\u0AA8 \u0AAA\u0AC7\u0AA8\u0AB2",
    admin: "\u0AB8\u0AC1\u0AAA\u0AB0 \u0A8F\u0AA1\u0AAE\u0ABF\u0AA8",
  },
};

export default async function AdminLayout({
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
  const t = translations[currentLocale];

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-[#ffe5e9]
        via-[#ffd9df]
        to-[#ffccd4]
        dark:from-[#3b0710]
        dark:via-[#520b16]
        dark:to-[#28040a]
      "
    >
      {/* Admin Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 min-h-screen">
        {/* Admin Header */}
        <header
          className="
            sticky
            top-0
            z-30
            flex
            min-h-24
            items-center
            justify-between
            border-b
            border-red-950/10
            bg-gradient-to-r
            from-red-900
            via-red-800
            to-red-900
            px-6
            py-4
            shadow-lg
            dark:border-white/10
            dark:from-[#3f0710]
            dark:via-[#4f0a15]
            dark:to-[#2a0409]
          "
        >
          {/* Header Brand */}
<div className="flex min-w-0 items-center gap-3">
  {/* SAME SHIVA LOGO AS MEMBER PORTAL */}
  <div
    className="
      relative
      h-12
      w-12
      shrink-0
      overflow-hidden
      rounded-full
      border-2
      border-[#d9ad55]
      bg-white
      shadow-[0_0_14px_rgba(217,173,85,0.45)]
    "
  >
    <img
      src="/images/SHIVA_ORI_!.png"
      alt="Ahhichatra Sanskar Kendra"
      className="h-full w-full object-cover object-center"
    />
  </div>

  {/* ORGANIZATION NAME */}
  <div className="min-w-0">
    <h1
      className="
        whitespace-nowrap
        font-serif
        text-xl
        font-bold
        leading-tight
        tracking-wide
        text-white
        sm:text-2xl
      "
    >
      {t.title}
    </h1>

    <p
      className="
        mt-0.5
        whitespace-nowrap
        text-xs
        font-medium
        tracking-wide
        text-red-100
        dark:text-red-200
      "
    >
      {t.subtitle}
    </p>
  </div>
</div>

          {/* Header Actions */}
          <div className="flex shrink-0 items-center gap-3">
            {/* Language */}
            <LanguageSwitcher />

            {/* Admin Role */}
            <div
              className="
                hidden
                rounded-xl
                border
                border-white/15
                bg-white/10
                px-4
                py-2
                text-sm
                font-semibold
                text-white
                backdrop-blur-sm
                sm:block
              "
            >
              {t.admin}
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Logout */}
            <LogoutButton
              callbackUrl={`/${currentLocale}/login`}
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}