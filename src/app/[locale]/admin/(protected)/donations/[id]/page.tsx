import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

const labels = {
  en: {
    title: "Donation Details",
    donor: "Donor Name",
    email: "Email",
    phone: "Phone",
    amount: "Amount",
    currency: "Currency",
    date: "Donation Date",
    method: "Payment Method",
    reference: "Reference Number",
    status: "Status",
    notes: "Notes",
    edit: "Edit Donation",
    back: "Back to Donations",
    notProvided: "Not provided",
  },
  hi: {
    title: "दान विवरण",
    donor: "दाता का नाम",
    email: "ईमेल",
    phone: "फोन",
    amount: "राशि",
    currency: "मुद्रा",
    date: "दान की तारीख",
    method: "भुगतान विधि",
    reference: "संदर्भ संख्या",
    status: "स्थिति",
    notes: "टिप्पणियाँ",
    edit: "दान संपादित करें",
    back: "दान पर वापस जाएँ",
    notProvided: "उपलब्ध नहीं",
  },
  gu: {
    title: "દાનની વિગતો",
    donor: "દાતાનું નામ",
    email: "ઇમેઇલ",
    phone: "ફોન",
    amount: "રકમ",
    currency: "ચલણ",
    date: "દાનની તારીખ",
    method: "ચુકવણી પદ્ધતિ",
    reference: "સંદર્ભ નંબર",
    status: "સ્થિતિ",
    notes: "નોંધ",
    edit: "દાન સંપાદિત કરો",
    back: "દાન પર પાછા જાઓ",
    notProvided: "આપેલ નથી",
  },
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function DonationDetailsPage({ params }: Props) {
  const { locale, id } = await params;

  const language =
    locale === "hi" || locale === "gu" ? locale : "en";

  const t = labels[language];

  const donation = await prisma.donation.findUnique({
    where: { id },
  });

  if (!donation) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-slate-950 sm:p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {t.title}
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {donation.donorName}
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href={`/${language}/admin/donations`}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {t.back}
            </Link>

            <Link
              href={`/${language}/admin/donations/${donation.id}/edit`}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              {t.edit}
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="grid grid-cols-1 divide-y divide-slate-200 dark:divide-slate-800 md:grid-cols-2 md:divide-x md:divide-y-0">
            <div className="space-y-6 p-6">
              <Detail label={t.donor} value={donation.donorName} />
              <Detail label={t.email} value={donation.email} fallback={t.notProvided} />
              <Detail label={t.phone} value={donation.phone} fallback={t.notProvided} />
              <Detail
                label={t.amount}
                value={`${donation.currency} ${donation.amount.toString()}`}
              />
              <Detail label={t.currency} value={donation.currency} />
            </div>

            <div className="space-y-6 p-6">
              <Detail
                label={t.date}
                value={formatDate(donation.donationDate)}
              />
              <Detail
                label={t.method}
                value={donation.paymentMethod.replaceAll("_", " ")}
              />
              <Detail
                label={t.reference}
                value={donation.referenceNumber}
                fallback={t.notProvided}
              />
              <Detail
                label={t.status}
                value={donation.status}
              />
              <Detail
                label={t.notes}
                value={donation.notes}
                fallback={t.notProvided}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
  fallback = "",
}: {
  label: string;
  value: string | null | undefined;
  fallback?: string;
}) {
  return (
    <div>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className="break-words text-base font-medium text-slate-900 dark:text-white">
        {value || fallback}
      </p>
    </div>
  );
}