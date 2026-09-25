import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import MatrimonialEditForm from "@/components/admin/MatrimonialEditForm";

type Props = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function MatrimonialEditPage({
  params,
}: Props) {
  const { locale, id } = await params;

  const profile = await prisma.matrimonialProfile.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          memberNumber: true,
          status: true,
          memberProfile: true,
        },
      },
    },
  });

  if (!profile) {
    redirect(`/${locale}/admin/matrimonial`);
  }

  return (
    <MatrimonialEditForm
      locale={
        locale === "hi" || locale === "gu"
          ? locale
          : "en"
      }
      profile={JSON.parse(JSON.stringify(profile))}
    />
  );
}