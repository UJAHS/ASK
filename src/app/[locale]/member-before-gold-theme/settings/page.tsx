import { auth } from "@/auth";
import { redirect } from "next/navigation";
import MemberSettingsForm from "@/components/member/MemberSettingsForm";

export default async function MemberSettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const safeLocale =
    locale === "hi" || locale === "gu"
      ? locale
      : "en";

  const session = await auth();

  if (!session?.user) {
    redirect(`/${safeLocale}/login`);
  }

  const role = String(
    (session.user as { role?: string }).role || ""
  );

  if (role !== "MEMBER") {
    redirect(`/${safeLocale}/unauthorized`);
  }

  return (
    <MemberSettingsForm
      locale={safeLocale}
      email={session.user.email || ""}
      status={
        String(
          (session.user as { status?: string }).status || "PENDING"
        )
      }
    />
  );
}