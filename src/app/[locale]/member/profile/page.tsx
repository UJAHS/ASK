import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ProfileForm from "@/components/member/ProfileForm";

type Locale = "en" | "hi" | "gu";

function getLocale(value: string): Locale {
  if (value === "hi" || value === "gu") return value;
  return "en";
}

export default async function MemberProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = getLocale(localeParam);

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

  return <ProfileForm />;
}