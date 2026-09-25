import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import MatrimonialCreateForm from "@/components/matrimonial/MatrimonialCreateForm";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

const translations = {
  en: {
    back: "← Back to Matrimonial",
    title: "Create Matrimonial Profile",
    subtitle:
      "Share your information to create your matrimonial profile.",
  },
  hi: {
    back: "← विवाह अनुभाग पर वापस जाएँ",
    title: "विवाह प्रोफ़ाइल बनाएँ",
    subtitle:
      "अपनी जानकारी साझा करके अपनी विवाह प्रोफ़ाइल बनाएँ।",
  },
  gu: {
    back: "\u2190 \u0ab5\u0abf\u0ab5\u0abe\u0ab9 \u0ab5\u0abf\u0aad\u0abe\u0a97 \u0aaa\u0ab0 \u0aa4\u0ab0\u0aab \u0aaa\u0abe\u0a9b\u0abe \u0a9c\u0abe\u0ab5",
    title: "\u0ab5\u0abf\u0ab5\u0abe\u0ab9 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0aac\u0aa8\u0abe\u0ab5\u0acb",
    subtitle:
      "\u0aa4\u0aae\u0abe\u0ab0\u0ac0 \u0aae\u0abe\u0ab9\u0abf\u0aa4\u0ac0 \u0ab6\u0ac7\u0ab0 \u0a95\u0ab0\u0ac0\u0aa8\u0ac7 \u0aa4\u0aae\u0abe\u0ab0\u0ac0 \u0ab5\u0abf\u0ab5\u0abe\u0ab9 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0aac\u0aa8\u0abe\u0ab5\u0acb.",
  },
} as const;

export default async function NewMatrimonialProfilePage({
  params,
}: Props) {
  const { locale } = await params;

  const t =
    locale === "hi"
      ? translations.hi
      : locale === "gu"
        ? translations.gu
        : translations.en;

  const session = await auth();

  if (!session?.user?.email) {
    redirect(`/${locale}/login`);
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      role: true,
      status: true,
      memberProfile: {
        select: {
          firstName: true,
          lastName: true,
          city: true,
          state: true,
          country: true,
          profileImage: true,
        },
      },
      matrimonialProfile: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!user) {
    redirect(`/${locale}/login`);
  }

  if (
    user.role !== "MEMBER" ||
    user.status !== "APPROVED"
  ) {
    redirect(`/${locale}/dashboard/matrimonial`);
  }

  if (user.matrimonialProfile) {
    redirect(`/${locale}/dashboard/matrimonial`);
  }

  const initialData = user.memberProfile
    ? {
        firstName: user.memberProfile.firstName,
        lastName: user.memberProfile.lastName,
        city: user.memberProfile.city,
        state: user.memberProfile.state,
        country: user.memberProfile.country,
        profileImage: user.memberProfile.profileImage,
      }
    : undefined;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <a
          href={`/${locale}/dashboard/matrimonial`}
          className="inline-flex text-sm font-medium text-red-600 transition hover:text-red-700 dark:text-red-400"
        >
          {t.back}
        </a>

        <div className="mt-5 mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {t.title}
          </h1>

          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {t.subtitle}
          </p>
        </div>

        <MatrimonialCreateForm
          locale={locale}
          initialData={initialData}
        />
      </div>
    </main>
  );
}