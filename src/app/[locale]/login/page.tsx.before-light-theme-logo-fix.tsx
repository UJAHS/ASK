"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

type Locale = "en" | "hi" | "gu";

type SessionUser = {
  role?: string;
};

const translations = {
  en: {
    title: "Ahhichatra Sanskar Kendra",
    subtitle: "Community Portal Login",
    email: "Email Address",
    emailPlaceholder: "Enter your email",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    invalidCredentials: "Invalid email or password.",
    genericError: "Something went wrong. Please try again.",
    signingIn: "Signing in...",
    signIn: "Sign In",
    notMember: "Not a member yet?",
    signUp: "Sign Up",
    footer: "Ahhichatra Sanskar Kendra Community Portal",
  },

  hi: {
    title: "\u0905\u0939\u093f\u091a\u094d\u091b\u0924\u094d\u0930 \u0938\u0902\u0938\u094d\u0915\u093e\u0930 \u0915\u0947\u0902\u0926\u094d\u0930",
    subtitle: "\u0938\u093e\u092e\u0941\u0926\u093e\u092f\u093f\u0915 \u092a\u094b\u0930\u094d\u091f\u0932 \u092a\u094d\u0930\u0935\u0947\u0936",
    email: "\u0908\u092e\u0947\u0932 \u092a\u0924\u093e",
    emailPlaceholder: "\u0905\u092a\u0928\u093e \u0908\u092e\u0947\u0932 \u0926\u0930\u094d\u091c \u0915\u0930\u0947\u0902",
    password: "\u092a\u093e\u0938\u0935\u0930\u094d\u0921",
    passwordPlaceholder: "\u0905\u092a\u0928\u093e \u092a\u093e\u0938\u0935\u0930\u094d\u0921 \u0926\u0930\u094d\u091c \u0915\u0930\u0947\u0902",
    invalidCredentials: "\u0908\u092e\u0947\u0932 \u092f\u093e \u092a\u093e\u0938\u0935\u0930\u094d\u0921 \u0917\u0932\u0924 \u0939\u0948\u0964",
    genericError: "\u0915\u0941\u091b \u0917\u0932\u0924 \u0939\u0941\u0906\u0964 \u0915\u0943\u092a\u092f\u093e \u092b\u093f\u0930 \u0938\u0947 \u092a\u094d\u0930\u092f\u093e\u0938 \u0915\u0930\u0947\u0902\u0964",
    signingIn: "\u092a\u094d\u0930\u0935\u0947\u0936 \u0939\u094b \u0930\u0939\u093e \u0939\u0948...",
    signIn: "\u092a\u094d\u0930\u0935\u0947\u0936 \u0915\u0930\u0947\u0902",
    notMember: "\u0905\u092d\u0940 \u0924\u0915 \u0938\u0926\u0938\u094d\u092f \u0928\u0939\u0940\u0902 \u0939\u0948\u0902?",
    signUp: "\u0938\u093e\u0907\u0928 \u0905\u092a \u0915\u0930\u0947\u0902",
    footer: "\u0905\u0939\u093f\u091a\u094d\u091b\u0924\u094d\u0930 \u0938\u0902\u0938\u094d\u0915\u093e\u0930 \u0915\u0947\u0902\u0926\u094d\u0930 \u0938\u093e\u092e\u0941\u0926\u093e\u092f\u093f\u0915 \u092a\u094b\u0930\u094d\u091f\u0932",
  },

  gu: {
    title: "\u0a85\u0ab9\u0abf\u0a9a\u0acd\u0a9b\u0aa4\u0acd\u0ab0 \u0ab8\u0a82\u0ab8\u0acd\u0a95\u0abe\u0ab0 \u0a95\u0ac7\u0aa8\u0acd\u0aa6\u0acd\u0ab0",
    subtitle: "\u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf \u0aaa\u0acb\u0ab0\u0acd\u0a9f\u0ab2\u0aae\u0abe\u0a82 \u0aaa\u0acd\u0ab0\u0ab5\u0ac7\u0ab6",
    email: "\u0a88\u0aae\u0ac7\u0ab2 \u0ab8\u0ab0\u0aa8\u0abe\u0aae\u0ac1\u0a82",
    emailPlaceholder: "\u0aa4\u0aae\u0abe\u0ab0\u0ac1\u0a82 \u0a88\u0aae\u0ac7\u0ab2 \u0aa6\u0abe\u0a96\u0ab2 \u0a95\u0ab0\u0acb",
    password: "\u0aaa\u0abe\u0ab8\u0ab5\u0ab0\u0acd\u0aa1",
    passwordPlaceholder: "\u0aa4\u0aae\u0abe\u0ab0\u0acb \u0aaa\u0abe\u0ab8\u0ab5\u0ab0\u0acd\u0aa1 \u0aa6\u0abe\u0a96\u0ab2 \u0a95\u0ab0\u0acb",
    invalidCredentials: "\u0a88\u0aae\u0ac7\u0ab2 \u0a85\u0aa5\u0ab5\u0abe \u0aaa\u0abe\u0ab8\u0ab5\u0ab0\u0acd\u0aa1 \u0a96\u0acb\u0a9f\u0acb \u0a9b\u0ac7.",
    genericError: "\u0a95\u0a82\u0a88\u0a95 \u0a96\u0acb\u0a9f\u0ac1\u0a82 \u0aa5\u0aaf\u0ac1\u0a82 \u0a9b\u0ac7. \u0a95\u0ac3\u0aaa\u0abe \u0aab\u0ab0\u0ac0 \u0aaa\u0acd\u0ab0\u0aaf\u0abe\u0ab8 \u0a95\u0ab0\u0acb.",
    signingIn: "\u0aaa\u0acd\u0ab0\u0ab5\u0ac7\u0ab6 \u0aa5\u0a88 \u0ab0\u0ab9\u0acd\u0aaf\u0acb \u0a9b\u0ac7...",
    signIn: "\u0aaa\u0acd\u0ab0\u0ab5\u0ac7\u0ab6 \u0a95\u0ab0\u0acb",
    notMember: "\u0ab9\u0a9c\u0ac1 \u0ab8\u0ac1\u0aa7\u0ac0 \u0ab8\u0aad\u0acd\u0aaf \u0aa8\u0aa5\u0ac0?",
    signUp: "\u0ab8\u0abe\u0a87\u0aa8 \u0a85\u0aaa \u0a95\u0ab0\u0acb",
    footer: "\u0a85\u0ab9\u0abf\u0a9a\u0acd\u0a9b\u0aa4\u0acd\u0ab0 \u0ab8\u0a82\u0ab8\u0acd\u0a95\u0abe\u0ab0 \u0a95\u0ac7\u0aa8\u0acd\u0aa6\u0acd\u0ab0 \u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf \u0aaa\u0acb\u0ab0\u0acd\u0a9f\u0ab2",
  },
} as const;

function normalizeLocale(value: string): Locale {
  if (value === "hi") {
    return "hi";
  }

  if (value === "gu") {
    return "gu";
  }

  return "en";
}

export default function LoginPage() {
  const router = useRouter();
  const params = useParams<{ locale: string }>();

  const locale = normalizeLocale(params?.locale || "en");
  const t = translations[locale];

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
        setError(t.invalidCredentials);
        setLoading(false);
        return;
      }

      /*
       * Get the newly created session.
       * The existing auth.ts session callback
       * exposes the user's role here.
       */
      const session = await getSession();

      const role = String(
        (session?.user as SessionUser | undefined)?.role || ""
      );

      if (role === "ADMIN" || role === "SUPER_ADMIN") {
        router.push(`/${locale}/admin/dashboard`);
      } else {
        router.push(`/${locale}/member/dashboard`);
      }

      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      setError(t.genericError);
      setLoading(false);
    }
  }

  return (
    <main
      className="
        min-h-screen
        bg-gradient-to-br
        from-[#ffe5e9]
        via-[#ffd9df]
        to-[#ffccd4]
        px-4
        py-8
        dark:from-[#3b0710]
        dark:via-[#520b16]
        dark:to-[#28040a]
      "
    >
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="w-full max-w-md">
          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-red-300/80
              bg-white
              shadow-2xl
              dark:border-red-400/30
              dark:bg-[#3d0912]
            "
          >
            {/* HEADER */}
            <div
              className="
                bg-gradient-to-r
                from-[#9B0F16]
                via-[#B9161F]
                to-[#9B0F16]
                px-6
                py-8
                text-center
                text-white
              "
            >
              <div
  className="
    relative
    mx-auto
    flex
    h-[112px]
    w-[112px]
    shrink-0
    items-center
    justify-center
    overflow-hidden
    rounded-full
    border-[3px]
    border-[#d4af37]
    bg-white
    shadow-[0_4px_18px_rgba(80,0,10,0.28)]
  "
>
  <img
    src="/images/ROUND_SHIVA_LOGIN.png"
    alt="Ahhichatra Sanskar Kendra"
    className="h-full w-full object-contain p-1"
  />
</div>
<h1 className="mt-4 text-2xl font-bold sm:text-3xl" style={{ color: "#FFFFFF", WebkitTextFillColor: "#FFFFFF" }}>{t.title}</h1>

              <p className="mt-2 text-sm" style={{ color: "#FFFFFF", WebkitTextFillColor: "#FFFFFF" }}>{t.subtitle}</p>
            </div>

            {/* FORM */}
            <div className="p-6 sm:p-8">
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="email"
                    className="
                      mb-2
                      block
                      text-sm
                      font-semibold
                      text-gray-800
                      dark:text-red-100
                    "
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
                      w-full
                      rounded-xl
                      border
                      border-red-200
                      bg-white
                      px-4
                      py-3
                      text-gray-900
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-red-600
                      focus:ring-2
                      focus:ring-red-200
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
                    className="
                      mb-2
                      block
                      text-sm
                      font-semibold
                      text-gray-800
                      dark:text-red-100
                    "
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
                      w-full
                      rounded-xl
                      border
                      border-red-200
                      bg-white
                      px-4
                      py-3
                      text-gray-900
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-red-600
                      focus:ring-2
                      focus:ring-red-200
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
                  <div
                    className="
                      rounded-xl
                      border
                      border-red-200
                      bg-red-50
                      px-4
                      py-3
                      text-sm
                      font-medium
                      text-red-700
                      dark:border-red-400/20
                      dark:bg-red-500/10
                      dark:text-red-300
                    "
                  >
                    {error}
                  </div>
                )}

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full
                    rounded-xl
                    bg-gradient-to-r
                    from-[#991b2f]
                    via-[#7f1726]
                    to-[#5b0b18]
                    px-4
                    py-3.5
                    font-semibold
                    text-white
                    shadow-lg
                    transition-all
                    duration-300
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
              <div className="mt-5 text-center text-sm">
                <span className="text-gray-600 dark:text-red-100/70">
                  {t.notMember}
                </span>{" "}
                <Link
                  href={`/${locale}/register`}
                  className="
                    font-semibold
                    text-[#9B0F16]
                    underline-offset-4
                    hover:underline
                    dark:text-[#f3c969]
                  "
                >
                  {t.signUp}
                </Link>
              </div>

              {/* FOOTER */}
              <div
                className="
                  mt-7
                  border-t
                  border-red-100
                  pt-5
                  text-center
                  dark:border-red-300/10
                "
              >
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
