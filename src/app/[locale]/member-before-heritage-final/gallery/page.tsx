import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import GalleryClient from "@/components/member/GalleryClient";

type Locale = "en" | "hi" | "gu";

function normalizeLocale(value: string): Locale {
  if (value === "hi" || value === "gu") {
    return value;
  }

  return "en";
}

export default async function MemberGalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;

  const locale = normalizeLocale(localeParam);

  const session = await auth();

  if (!session?.user) {
    redirect(`/${locale}/login`);
  }

  const role = String(
    (session.user as { role?: string }).role || ""
  );

  if (role !== "MEMBER") {
    redirect(`/${locale}/unauthorized`);
  }

  const gallery = await prisma.gallery.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const publishedGallery = gallery.filter(
    (item) =>
      String(
        (item as { status?: string }).status || "PUBLISHED"
      ) === "PUBLISHED"
  );

  return (
    <GalleryClient
      locale={locale}
      items={publishedGallery.map((item) => ({
        id: item.id,
        title:
          (item as { title?: string | null }).title || null,
        description:
          (item as { description?: string | null })
            .description || null,
        image:
          (item as { image?: string | null }).image || null,
        createdAt: item.createdAt.toISOString(),
      }))}
    />
  );
}