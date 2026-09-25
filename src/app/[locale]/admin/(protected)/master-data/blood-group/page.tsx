import MasterDataCrud from "@/components/admin/MasterDataCrud";

export default async function BloodGroupMasterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <MasterDataCrud
      locale={locale}
      title="Blood Group Master"
      description="Manage blood groups used throughout the ASK Community Portal."
      endpoint="/api/admin/blood-groups"
    />
  );
}