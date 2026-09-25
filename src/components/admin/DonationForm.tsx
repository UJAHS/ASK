"use client";

import {
  FormEvent,
  useState,
} from "react";
import { useRouter } from "next/navigation";

type Locale = "en" | "hi" | "gu";

type Props = {
  locale: string;
  donationId?: string;
  initialData?: any;
};

const labels = {
  en: {
    title: "Donation Details",
    donorName: "Donor Name",
    email: "Email",
    phone: "Phone",
    amount: "Amount",
    currency: "Currency",
    donationDate: "Donation Date",
    paymentMethod: "Payment Method",
    referenceNumber: "Reference Number",
    status: "Status",
    notes: "Notes",
    save: "Save Donation",
    saving: "Saving...",
    cancel: "Cancel",
    required: "Required",
    cash: "Cash",
    upi: "UPI",
    bankTransfer: "Bank Transfer",
    card: "Card",
    cheque: "Cheque",
    other: "Other",
    pending: "Pending",
    completed: "Completed",
    failed: "Failed",
    refunded: "Refunded",
    error: "Unable to save donation.",
  },

  hi: {
    title: "दान विवरण",
    donorName: "दाता का नाम",
    email: "ईमेल",
    phone: "फोन",
    amount: "राशि",
    currency: "मुद्रा",
    donationDate: "दान की तारीख",
    paymentMethod: "भुगतान विधि",
    referenceNumber: "संदर्भ संख्या",
    status: "स्थिति",
    notes: "नोट्स",
    save: "दान सेव करें",
    saving: "सेव हो रहा है...",
    cancel: "रद्द करें",
    required: "आवश्यक",
    cash: "नकद",
    upi: "UPI",
    bankTransfer: "बैंक ट्रांसफर",
    card: "कार्ड",
    cheque: "चेक",
    other: "अन्य",
    pending: "लंबित",
    completed: "पूर्ण",
    failed: "विफल",
    refunded: "वापस किया गया",
    error: "दान सेव नहीं किया जा सका।",
  },

  gu: {
    title: "દાનની વિગતો",
    donorName: "દાતાનું નામ",
    email: "ઈમેલ",
    phone: "ફોન",
    amount: "રકમ",
    currency: "ચલણ",
    donationDate: "દાનની તારીખ",
    paymentMethod: "ચુકવણી પદ્ધતિ",
    referenceNumber: "રેફરન્સ નંબર",
    status: "સ્થિતિ",
    notes: "નોંધ",
    save: "દાન સેવ કરો",
    saving: "સેવ થઈ રહ્યું છે...",
    cancel: "રદ કરો",
    required: "જરૂરી",
    cash: "રોકડ",
    upi: "UPI",
    bankTransfer: "બેંક ટ્રાન્સફર",
    card: "કાર્ડ",
    cheque: "ચેક",
    other: "અન્ય",
    pending: "બાકી",
    completed: "પૂર્ણ",
    failed: "નિષ્ફળ",
    refunded: "પરત કરવામાં આવ્યું",
    error: "દાન સેવ કરી શકાયું નથી.",
  },
};

function getLocale(
  value: string
): Locale {
  if (value === "hi") return "hi";
  if (value === "gu") return "gu";
  return "en";
}

function toDateInput(
  value: any
) {
  if (!value) {
    return new Date()
      .toISOString()
      .slice(0, 10);
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return new Date()
      .toISOString()
      .slice(0, 10);
  }

  return date
    .toISOString()
    .slice(0, 10);
}

export function DonationForm({
  locale,
  donationId,
  initialData,
}: Props) {
  const router = useRouter();

  const language = getLocale(locale);
  const t = labels[language];

  const [donorName, setDonorName] =
    useState(
      initialData?.donorName || ""
    );

  const [email, setEmail] =
    useState(
      initialData?.email || ""
    );

  const [phone, setPhone] =
    useState(
      initialData?.phone || ""
    );

  const [amount, setAmount] =
    useState(
      initialData?.amount
        ? String(initialData.amount)
        : ""
    );

  const [currency, setCurrency] =
    useState(
      initialData?.currency ||
        "INR"
    );

  const [donationDate, setDonationDate] =
    useState(
      toDateInput(
        initialData?.donationDate
      )
    );

  const [paymentMethod, setPaymentMethod] =
    useState(
      initialData?.paymentMethod ||
        "OTHER"
    );

  const [referenceNumber, setReferenceNumber] =
    useState(
      initialData?.referenceNumber ||
        ""
    );

  const [status, setStatus] =
    useState(
      initialData?.status ||
        "PENDING"
    );

  const [notes, setNotes] =
    useState(
      initialData?.notes || ""
    );

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSaving(true);
    setError("");

    try {
      const response =
        await fetch(
          donationId
            ? "/api/admin/donations/" +
                donationId
            : "/api/admin/donations",
          {
            method:
              donationId
                ? "PUT"
                : "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              donorName:
                donorName.trim(),
              email:
                email.trim() ||
                null,
              phone:
                phone.trim() ||
                null,
              amount:
                Number(amount),
              currency,
              donationDate,
              paymentMethod,
              referenceNumber:
                referenceNumber.trim() ||
                null,
              status,
              notes:
                notes.trim() ||
                null,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || t.error
        );
      }

      router.push(
        "/" +
          locale +
          "/admin/donations"
      );

      router.refresh();
    } catch (err: any) {
      setError(
        err?.message || t.error
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">
          {t.title}
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              {t.donorName}
              <span className="ml-1 text-red-600">
                *
              </span>
            </label>

            <input
              value={donorName}
              onChange={(e) =>
                setDonorName(
                  e.target.value
                )
              }
              required
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-red-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              {t.email}
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-red-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              {t.phone}
            </label>

            <input
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value
                )
              }
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-red-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              {t.amount}
              <span className="ml-1 text-red-600">
                *
              </span>
            </label>

            <input
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(e) =>
                setAmount(
                  e.target.value
                )
              }
              required
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-red-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              {t.currency}
            </label>

            <select
              value={currency}
              onChange={(e) =>
                setCurrency(
                  e.target.value
                )
              }
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-red-600"
            >
              <option value="INR">
                INR - ₹
              </option>

              <option value="USD">
                USD - $
              </option>

              <option value="EUR">
                EUR - €
              </option>

              <option value="GBP">
                GBP - £
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              {t.donationDate}
            </label>

            <input
              type="date"
              value={donationDate}
              onChange={(e) =>
                setDonationDate(
                  e.target.value
                )
              }
              required
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-red-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              {t.paymentMethod}
            </label>

            <select
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(
                  e.target.value
                )
              }
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-red-600"
            >
              <option value="CASH">
                {t.cash}
              </option>

              <option value="UPI">
                {t.upi}
              </option>

              <option value="BANK_TRANSFER">
                {t.bankTransfer}
              </option>

              <option value="CARD">
                {t.card}
              </option>

              <option value="CHEQUE">
                {t.cheque}
              </option>

              <option value="OTHER">
                {t.other}
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              {t.status}
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-red-600"
            >
              <option value="PENDING">
                {t.pending}
              </option>

              <option value="COMPLETED">
                {t.completed}
              </option>

              <option value="FAILED">
                {t.failed}
              </option>

              <option value="REFUNDED">
                {t.refunded}
              </option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">
              {t.referenceNumber}
            </label>

            <input
              value={referenceNumber}
              onChange={(e) =>
                setReferenceNumber(
                  e.target.value
                )
              }
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-red-600"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">
              {t.notes}
            </label>

            <textarea
              value={notes}
              onChange={(e) =>
                setNotes(
                  e.target.value
                )
              }
              rows={5}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-red-600"
            />
          </div>
        </div>
      </section>

      <div className="flex justify-end gap-3 pb-8">
        <button
          type="button"
          onClick={() =>
            router.push(
              "/" +
                locale +
                "/admin/donations"
            )
          }
          className="rounded-lg border px-5 py-2.5 text-sm font-medium transition hover:bg-gray-50"
        >
          {t.cancel}
        </button>

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-red-700 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-red-800 disabled:opacity-50"
        >
          {saving
            ? t.saving
            : t.save}
        </button>
      </div>
    </form>
  );
}