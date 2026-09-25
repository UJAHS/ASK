import MasterDataCrud from "@/components/admin/MasterDataCrud";

export default async function CityMasterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <MasterDataCrud
      locale={locale}
      title="City Master"
      description="Manage cities and their associated states."
      endpoint="/api/admin/cities"
      cityMode
    />
  );
}