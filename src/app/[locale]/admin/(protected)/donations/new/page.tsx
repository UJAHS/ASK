import Link from "next/link";
import { DonationForm } from "@/components/admin/DonationForm";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

const titles = {
  en: "Add Donation",
  hi: "दान जोड़ें",
  gu: "દાન ઉમેરો",
};

export default async function NewDonationPage({
  params,
}: Props) {
  const { locale } = await params;

  const language =
    locale === "hi"
      ? "hi"
      : locale === "gu"
      ? "gu"
      : "en";

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
      />
    </div>
  );
}