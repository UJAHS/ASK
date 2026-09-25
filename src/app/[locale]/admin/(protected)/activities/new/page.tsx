import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import ActivityForm from "@/components/admin/ActivityForm";
import { isValidLocale, type Locale } from "@/i18n/config";

export default async function NewActivityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;

  if (!isValidLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;

  const session = await auth();

  const role = session?.user
    ? String(
        (session.user as { role?: string }).role || ""
      )
    : "";

  const isAdmin =
    role === "ADMIN" ||
    role === "SUPER_ADMIN";

  if (!isAdmin) {
    redirect(`/${locale}/unauthorized`);
  }

  return (
    <div
      className="
        min-h-[calc(100vh-5rem)]
        rounded-2xl
        bg-gradient-to-br
        from-[#ffdfe5]
        via-[#ffd3db]
        to-[#ffc5cf]
        p-4
        transition-all
        duration-300
        dark:from-[#4b0b15]
        dark:via-[#390812]
        dark:to-[#26050c]
        md:p-6
      "
    >
      <div className="mx-auto max-w-5xl">
        {/* Back */}
        <div className="mb-6">
          <Link
            href={`/${locale}/admin/activities`}
            className="
              inline-flex
              items-center
              text-sm
              font-semibold
              text-red-800
              transition-all
              duration-200
              hover:-translate-x-1
              hover:text-red-600
              dark:text-red-200
              dark:hover:text-white
            "
          >
            ← Back to Activities
          </Link>
        </div>

        {/* Page heading */}
        <div className="mb-6">
          <h1
            className="
              text-3xl
              font-bold
              text-red-950
              dark:text-white
            "
          >
            Add Activity
          </h1>

          <p
            className="
              mt-1
              text-red-900/75
              dark:text-red-100/75
            "
          >
            Create a new community activity.
          </p>
        </div>

        {/* Form */}
        <div
          className="
            rounded-2xl
            border
            border-red-200/80
            bg-gradient-to-br
            from-[#fff0f2]
            via-[#ffe4e9]
            to-[#ffd8e0]
            p-1
            shadow-lg
            shadow-red-900/5
            dark:border-red-900/70
            dark:from-[#68131f]
            dark:via-[#570e18]
            dark:to-[#410810]
          "
        >
          <ActivityForm />
        </div>
      </div>
    </div>
  );
}