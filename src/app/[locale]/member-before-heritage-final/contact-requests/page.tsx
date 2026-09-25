import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ContactRequestsClient from "@/components/member/ContactRequestsClient";

type Locale = "en" | "hi" | "gu";

function getLocale(value: string): Locale {
  if (value === "hi" || value === "gu") {
    return value;
  }

  return "en";
}

export default async function ContactRequestsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = getLocale(localeParam);

  const session = await auth();

  if (!session?.user?.email) {
    redirect(`/${locale}/login`);
  }

  const role = String((session.user as { role?: string }).role || "");

  if (role !== "MEMBER") {
    redirect(`/${locale}/unauthorized`);
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      status: true,
    },
  });

  if (!user || user.status !== "APPROVED") {
    redirect(`/${locale}/member/dashboard`);
  }

  return (
    <ContactRequestsClient
      locale={locale}
    />
  );
}