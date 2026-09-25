import MasterDataCrud from "@/components/admin/MasterDataCrud";

export default async function BusinessCategoryMasterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <MasterDataCrud
      locale={locale}
      title="Business Category Master"
      description="Manage business categories used throughout the ASK Community Portal."
      endpoint="/api/admin/business-categories"
    />
  );
}