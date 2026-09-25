import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import NewsForm from "@/components/admin/NewsForm";
import {
  isValidLocale,
  type Locale,
} from "@/i18n/config";

export const dynamic = "force-dynamic";

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}) {
  const { locale, id } = await params;

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

  const news = await prisma.news.findUnique({
    where: {
      id,
    },
    include: {
      translations: {
        orderBy: {
          locale: "asc",
        },
      },
    },
  });

  if (!news) {
    notFound();
  }

  return (
    <NewsForm
      mode="edit"
      newsId={news.id}
      initialData={{
        slug: news.slug,
        image: news.image,
        status: news.status,
        publishedAt: news.publishedAt
          ? news.publishedAt.toISOString()
          : null,
        translations:
          news.translations.map(
            (translation) => ({
              locale: translation.locale,
              title: translation.title,
              excerpt:
                translation.excerpt,
              content:
                translation.content,
              location:
                translation.location,
            })
          ),
      }}
    />
  );
}