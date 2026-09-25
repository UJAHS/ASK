"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

type Locale = "en" | "hi" | "gu";

const translations = {
  en: {
    title: "Ahhichatra Sanskar Kendra",
    subtitle: "Administration Portal",
    welcome: "Admin Sign In",
    description: "Sign in to manage the community portal.",
    email: "Email Address",
    password: "Password",
    emailPlaceholder: "admin@example.com",
    passwordPlaceholder: "Enter your password",
    signIn: "Admin Sign In",
    signingIn: "Signing in...",
    invalid: "Invalid email or password.",
    error: "Something went wrong. Please try again.",
    footer: "Ahhichatra Sanskar Kendra Community Portal",
  },

  hi: {
    title: "अहिच्छत्र संस्कार केंद्र",
    subtitle: "प्रशासन पोर्टल",
    welcome: "एडमिन साइन इन",
    description: "सामुदायिक पोर्टल को प्रबंधित करने के लिए साइन इन करें।",
    email: "ईमेल पता",
    password: "पासवर्ड",
    emailPlaceholder: "admin@example.com",
    passwordPlaceholder: "अपना पासवर्ड दर्ज करें",
    signIn: "एडमिन साइन इन",
    signingIn: "साइन इन हो रहा है...",
    invalid: "ईमेल या पासवर्ड गलत है।",
    error: "कुछ गलत हो गया। कृपया पुनः प्रयास करें।",
    footer: "अहिच्छत्र संस्कार केंद्र कम्युनिटी पोर्टल",
  },

  gu: {
    title: "અહિચ્છત્ર સંસ્કાર કેન્દ્ર",
    subtitle: "એડમિનિસ્ટ્રેશન પોર્ટલ",
    welcome: "એડમિન સાઇન ઇન",
    description: "કમ્યુનિટી પોર્ટલ મેનેજ કરવા માટે સાઇન ઇન કરો.",
    email: "ઈમેલ સરનામું",
    password: "પાસવર્ડ",
    emailPlaceholder: "admin@example.com",
    passwordPlaceholder: "તમારો પાસવર્ડ દાખલ કરો",
    signIn: "એડમિન સાઇન ઇન",
    signingIn: "સાઇન ઇન થઈ રહ્યું છે...",
    invalid: "ઈમેલ અથવા પાસવર્ડ ખોટો છે.",
    error: "કંઈક ખોટું થયું. કૃપા કરીને ફરી પ્રયાસ કરો.",
    footer: "અહિચ્છત્ર સંસ્કાર કેન્દ્ર કમ્યુનિટી પોર્ટલ",
  },
} as const;

function normalizeLocale(value: string): Locale {
  if (value === "hi" || value === "gu") {
    return value;
  }

  return "en";
}

function getSafeCallbackUrl(
  value: string | null,
  locale: Locale
): string {
  const fallback = `/${locale}/admin/dashboard`;

  if (!value) {
    return fallback;
  }

  try {
    const decoded = decodeURIComponent(value);

    // Only allow internal absolute paths.
    if (!decoded.startsWith("/") || decoded.startsWith("//")) {
      return fallback;
    }

    // Prevent accidentally using the old non-localized admin route.
    if (decoded === "/admin/dashboard") {
      return fallback;
    }

    if (decoded.startsWith("/admin/")) {
      return `/${locale}${decoded}`;
    }

    return decoded;
  } catch {
    return fallback;
  }
}

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();

  const locale = normalizeLocale(String(params.locale || "en"));
  const t = translations[locale];

  const callbackUrl = getSafeCallbackUrl(
    searchParams.get("callbackUrl"),
    locale
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(t.invalid);
        setLoading(false);
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch (err) {
      console.error("Admin login error:", err);
      setError(t.error);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#ffe5e9] via-[#ffd9df] to-[#ffccd4] px-4 py-8 dark:from-[#3b0710] dark:via-[#520b16] dark:to-[#28040a]">
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="w-full max-w-md">
          <div className="overflow-hidden rounded-3xl border border-red-300/80 bg-white shadow-2xl dark:border-red-400/30 dark:bg-[#3d0912]">

            {/* HEADER */}
            <div className="bg-gradient-to-br from-[#991b2f] via-[#7f1726] to-[#5b0b18] px-6 py-8 text-center text-white">
              <div className="mx-auto h-20 w-20 overflow-hidden rounded-full border-2 border-[#e2b85d] bg-white shadow-lg">
                <img
                  src="/images/ask-shiva-logo.jpg"
                  alt="Ahhichatra Sanskar Kendra"
                  className="h-full w-full rounded-full object-contain"
                />
              </div>

              <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
                {t.title}
              </h1>

              <p className="mt-2 text-sm text-red-200">
                {t.subtitle}
              </p>
            </div>

            {/* FORM AREA */}
            <div className="p-6 sm:p-8">
              <div className="mb-7 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t.welcome}
                </h2>

                <p className="mt-2 text-sm text-red-900/70 dark:text-red-100/65">
                  {t.description}
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-gray-800 dark:text-red-100"
                  >
                    {t.email}
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder={t.emailPlaceholder}
                    autoComplete="email"
                    required
                    disabled={loading}
                    className="
                      w-full rounded-xl border border-red-200
                      bg-white px-4 py-3 text-gray-900
                      outline-none transition
                      placeholder:text-gray-400
                      focus:border-red-600
                      focus:ring-2 focus:ring-red-200
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                      dark:border-red-300/25
                      dark:bg-[#4e0d16]
                      dark:text-white
                      dark:placeholder:text-red-100/40
                      dark:focus:border-red-400
                      dark:focus:ring-red-400/20
                    "
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-gray-800 dark:text-red-100"
                  >
                    {t.password}
                  </label>

                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder={t.passwordPlaceholder}
                    autoComplete="current-password"
                    required
                    disabled={loading}
                    className="
                      w-full rounded-xl border border-red-200
                      bg-white px-4 py-3 text-gray-900
                      outline-none transition
                      placeholder:text-gray-400
                      focus:border-red-600
                      focus:ring-2 focus:ring-red-200
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                      dark:border-red-300/25
                      dark:bg-[#4e0d16]
                      dark:text-white
                      dark:placeholder:text-red-100/40
                      dark:focus:border-red-400
                      dark:focus:ring-red-400/20
                    "
                  />
                </div>

                {/* ERROR */}
                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-300">
                    {error}
                  </div>
                )}

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full rounded-xl
                    bg-gradient-to-r from-[#991b2f] via-[#7f1726] to-[#5b0b18]
                    px-4 py-3.5
                    font-semibold text-white
                    shadow-lg
                    transition-all duration-300
                    hover:-translate-y-0.5
                    hover:shadow-xl
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    disabled:hover:translate-y-0
                  "
                >
                  {loading ? t.signingIn : t.signIn}
                </button>
              </form>

              {/* FOOTER */}
              <div className="mt-7 border-t border-red-100 pt-5 text-center dark:border-red-300/10">
                <p className="text-xs text-gray-500 dark:text-red-100/50">
                  {t.footer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}