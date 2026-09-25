import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import NewsForm from "@/components/admin/NewsForm";
import {
  isValidLocale,
  type Locale,
} from "@/i18n/config";

export const dynamic = "force-dynamic";

export default async function NewNewsPage({
  params,
}: {
  params: Promise<{
    locale: string;
  }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const currentLocale: Locale = locale;

  const session = await auth();

  const role = session?.user?.role
    ? String(session.user.role)
    : "";

  const isAdmin =
    role === "ADMIN" ||
    role === "SUPER_ADMIN";

  if (!isAdmin) {
    redirect(
      `/${currentLocale}/unauthorized`
    );
  }

  return (
    <div
      className="
        min-h-full
        rounded-2xl
        bg-transparent
      "
    >
      <NewsForm mode="create" />
    </div>
  );
}