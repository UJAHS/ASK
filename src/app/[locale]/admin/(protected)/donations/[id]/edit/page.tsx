import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DonationForm } from "@/components/admin/DonationForm";

type Props = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

const titles = {
  en: "Edit Donation",
  hi: "दान संपादित करें",
  gu: "દાન સંપાદિત કરો",
};

export default async function EditDonationPage({
  params,
}: Props) {
  const { locale, id } =
    await params;

  const language =
    locale === "hi"
      ? "hi"
      : locale === "gu"
      ? "gu"
      : "en";

  const donation =
    await prisma.donation.findUnique({
      where: { id },
    });

  if (!donation) {
    notFound();
  }

  const initialData = {
    ...donation,
    amount:
      donation.amount.toString(),
  };

  return (
    <div className="space-y-6">
      <div>
        <Link
          href={
            "/" +
            locale +
            "/admin/donations"
          }
          className="text-sm font-medium text-red-700 hover:underline"
        >
          ←{" "}
          {language === "gu"
            ? "દાન પર પાછા જાઓ"
            : language === "hi"
            ? "दान पर वापस जाएं"
            : "Back to Donations"}
        </Link>

        <h1 className="mt-3 text-2xl font-bold">
          {titles[language]}
        </h1>
      </div>

      <DonationForm
        locale={locale}
        donationId={id}
        initialData={initialData}
      />
    </div>
  );
}