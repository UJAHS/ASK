import MasterDataCrud from "@/components/admin/MasterDataCrud";

export default async function ProfessionMasterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <MasterDataCrud
      locale={locale}
      title="Profession Master"
      description="Manage professions used throughout the ASK Community Portal."
      endpoint="/api/admin/professions"
    />
  );
}