import { redirect } from "next/navigation";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function DashboardMatrimonialRedirect({
  params,
}: Props) {
  const { locale: rawLocale } = await params;

  const locale =
    rawLocale === "hi" || rawLocale === "gu"
      ? rawLocale
      : "en";

  redirect(`/${locale}/member/matrimonial`);
}