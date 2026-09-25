import { prisma } from "@/lib/prisma";
import MatrimonialDirectory from "@/components/matrimonial/MatrimonialDirectory";

type Props = {
  params: Promise<{ locale: string }>;
};

export const dynamic = "force-dynamic";

export default async function MatrimonialPage({
  params,
}: Props) {
  const { locale } = await params;

  const profiles = await prisma.matrimonialProfile.findMany({
    where: {
      status: "APPROVED",
      profileVisibility: {
        in: ["PUBLIC", "MEMBERS_ONLY"],
      },
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      gender: true,
      dateOfBirth: true,
      height: true,
      maritalStatus: true,
      education: true,
      profession: true,
      occupation: true,
      city: true,
      state: true,
      country: true,
      community: true,
      subCommunity: true,
      profileImage: true,
      profileVisibility: true,
      contactPreference: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const safeProfiles = profiles.map((profile) => ({
    ...profile,
    dateOfBirth: profile.dateOfBirth?.toISOString() || null,
  }));

  return (
    <MatrimonialDirectory
      locale={
        locale === "hi" || locale === "gu"
          ? locale
          : "en"
      }
      profiles={safeProfiles}
    />
  );
}