import { prisma } from "@/lib/prisma";
import { getDictionary } from "@/i18n";
import MatrimonialForm from "@/components/admin/MatrimonialForm";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function NewMatrimonialPage({
  params,
}: Props) {
  const { locale } = await params;

  const language =
    locale === "hi" || locale === "gu" ? locale : "en";

  const dictionary = getDictionary(language);

  const members = await prisma.user.findMany({
    where: {
      role: "MEMBER",
      status: "APPROVED",
    },
    select: {
      id: true,
      email: true,
      memberNumber: true,
      memberProfile: {
        select: {
          firstName: true,
          lastName: true,
          phone: true,
          city: true,
          state: true,
          profileImage: true,
        },
      },
    },
    orderBy: {
      memberNumber: "asc",
    },
  });

  return (
    <MatrimonialForm
      locale={language}
      members={members}
      dictionary={dictionary}
    />
  );
}