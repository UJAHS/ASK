"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";

type Locale = "en" | "hi" | "gu";

type Donation = {
  id: string;
  donorName: string;
  email: string | null;
  phone: string | null;
  amount: string;
  currency: string;
  donationDate: string;
  paymentMethod: string;
  referenceNumber: string | null;
  status: string;
};

const translations: Record<Locale, {
  title: string;
  subtitle: string;
  add: string;
  search: string;
  allStatus: string;
  allMethods: string;
  donor: string;
  amount: string;
  date: string;
  method: string;
  reference: string;
  status: string;
  actions: string;
  view: string;
  edit: string;
  remove: string;
  noData: string;
  loading: string;
  confirmTitle: string;
  confirmMessage: string;
  cancel: string;
  confirmDelete: string;
  deleted: string;
  deleteFailed: string;
  cash: string;
  upi: string;
  bankTransfer: string;
  card: string;
  cheque: string;
  other: string;
  pending: string;
  completed: string;
  failed: string;
  refunded: string;
}> = {
  en: {
    title: "Donations",
    subtitle: "Manage community donations",
    add: "Add Donation",
    search: "Search donor, email, phone or reference...",
    allStatus: "All Status",
    allMethods: "All Payment Methods",
    donor: "Donor",
    amount: "Amount",
    date: "Date",
    method: "Method",
    reference: "Reference",
    status: "Status",
    actions: "Actions",
    view: "View",
    edit: "Edit",
    remove: "Delete",
    noData: "No donations found.",
    loading: "Loading...",
    confirmTitle: "Delete Donation?",
    confirmMessage: "This action cannot be undone.",
    cancel: "Cancel",
    confirmDelete: "Yes, Delete",
    deleted: "Donation deleted successfully.",
    deleteFailed: "Failed to delete donation.",
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
  },

  hi: {
    title: "दान",
    subtitle: "सामुदायिक दान प्रबंधित करें",
    add: "दान जोड़ें",
    search: "दाता, ईमेल, फोन या संदर्भ खोजें...",
    allStatus: "सभी स्थिति",
    allMethods: "सभी भुगतान विधियाँ",
    donor: "दाता",
    amount: "राशि",
    date: "तारीख",
    method: "विधि",
    reference: "संदर्भ",
    status: "स्थिति",
    actions: "कार्य",
    view: "देखें",
    edit: "संपादित करें",
    remove: "हटाएँ",
    noData: "कोई दान नहीं मिला।",
    loading: "लोड हो रहा है...",
    confirmTitle: "दान हटाएँ?",
    confirmMessage: "यह कार्रवाई पूर्ववत नहीं की जा सकती।",
    cancel: "रद्द करें",
    confirmDelete: "हाँ, हटाएँ",
    deleted: "दान सफलतापूर्वक हटा दिया गया।",
    deleteFailed: "दान हटाने में विफल।",
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
  },

  gu: {
    title: "\u0aa6\u0abe\u0aa8",
    subtitle: "\u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0aa8\u0abe \u0aa6\u0abe\u0aa8\u0aa8\u0ac1\u0a82 \u0ab8\u0a82\u0a9a\u0abe\u0ab2\u0aa8 \u0a95\u0ab0\u0acb",
    add: "\u0aa6\u0abe\u0aa8 \u0a89\u0aae\u0ac7\u0ab0\u0acb",
    search: "\u0aa6\u0abe\u0aa4\u0abe, \u0a87\u0aae\u0ac7\u0a87\u0ab2, \u0aab\u0acb\u0aa8 \u0a85\u0aa5\u0ab5\u0abe \u0ab8\u0a82\u0aa6\u0ab0\u0acd\u0aad \u0ab6\u0acb\u0aa7\u0acb...",
    allStatus: "\u0aac\u0aa7\u0ac0 \u0ab8\u0acd\u0aa5\u0abf\u0aa4\u0abf",
    allMethods: "\u0aac\u0aa7\u0ac0 \u0a9a\u0ac1\u0a95\u0ab5\u0aa3\u0ac0 \u0aaa\u0aa6\u0acd\u0aa7\u0aa4\u0abf\u0a93",
    donor: "\u0aa6\u0abe\u0aa4\u0abe",
    amount: "\u0ab0\u0a95\u0aae",
    date: "\u0aa4\u0abe\u0ab0\u0ac0\u0a96",
    method: "\u0aaa\u0aa6\u0acd\u0aa7\u0aa4\u0abf",
    reference: "\u0ab8\u0a82\u0aa6\u0ab0\u0acd\u0aad",
    status: "\u0ab8\u0acd\u0aa5\u0abf\u0aa4\u0abf",
    actions: "\u0a95\u0acd\u0ab0\u0abf\u0aaf\u0abe\u0a93",
    view: "\u0a9c\u0ac1\u0a93",
    edit: "\u0aab\u0ac7\u0ab0\u0aab\u0abe\u0ab0 \u0a95\u0ab0\u0acb",
    remove: "\u0a95\u0abe\u0aa2\u0ac0 \u0aa8\u0abe\u0a96\u0acb",
    noData: "\u0a95\u0acb\u0a88 \u0aa6\u0abe\u0aa8 \u0aae\u0ab3\u0acd\u0aaf\u0ac1\u0a82 \u0aa8\u0aa5\u0ac0.",
    loading: "\u0ab2\u0acb\u0aa1 \u0aa5\u0a88 \u0ab0\u0ab9\u0acd\u0aaf\u0ac1\u0a82 \u0a9b\u0ac7...",
    confirmTitle: "\u0aa6\u0abe\u0aa8 \u0a95\u0abe\u0aa2\u0ac0 \u0aa8\u0abe\u0a96\u0ab5\u0ac1\u0a82?",
    confirmMessage: "\u0a86 \u0a95\u0acd\u0ab0\u0abf\u0aaf\u0abe \u0aaa\u0ac2\u0ab0\u0acd\u0ab5\u0ab5\u0aa4\u0acd \u0a95\u0ab0\u0ac0 \u0ab6\u0a95\u0abe\u0ab6\u0ac7 \u0aa8\u0ab9\u0ac0\u0a82.",
    cancel: "\u0ab0\u0aa6 \u0a95\u0ab0\u0acb",
    confirmDelete: "\u0ab9\u0abe, \u0a95\u0abe\u0aa2\u0ac0 \u0aa8\u0abe\u0a96\u0acb",
    deleted: "\u0aa6\u0abe\u0aa8 \u0ab8\u0aab\u0ab3\u0aa4\u0abe\u0aaa\u0ac2\u0ab0\u0acd\u0ab5\u0a95 \u0a95\u0abe\u0aa2\u0ac0 \u0aa8\u0abe\u0a96\u0ab5\u0abe\u0aae\u0abe\u0a82 \u0a86\u0ab5\u0acd\u0aaf\u0ac1\u0a82.",
    deleteFailed: "\u0aa6\u0abe\u0aa8 \u0a95\u0abe\u0aa2\u0ab5\u0abe\u0aae\u0abe\u0a82 \u0aa8\u0abf\u0ab7\u0acd\u0aab\u0ab3.",
    cash: "\u0ab0\u0acb\u0a95\u0aa1",
    upi: "UPI",
    bankTransfer: "\u0aac\u0ac7\u0a82\u0a95 \u0a9f\u0acd\u0ab0\u0abe\u0aa8\u0acd\u0ab8\u0aab\u0ab0",
    card: "\u0a95\u0abe\u0ab0\u0acd\u0aa1",
    cheque: "\u0a9a\u0ac7\u0a95",
    other: "\u0a85\u0aa8\u0acd\u0aaf",
    pending: "\u0aac\u0abe\u0a95\u0ac0",
    completed: "\u0aaa\u0ac2\u0ab0\u0acd\u0aa3",
    failed: "\u0aa8\u0abf\u0ab7\u0acd\u0aab\u0ab3",
    refunded: "\u0aaa\u0ab0\u0aa4 \u0a95\u0ab0\u0ac7\u0ab2",
  },
};

function getMethodLabel(method: string, t: typeof translations.en) {
  const values: Record<string, string> = {
    CASH: t.cash,
    UPI: t.upi,
    BANK_TRANSFER: t.bankTransfer,
    CARD: t.card,
    CHEQUE: t.cheque,
    OTHER: t.other,
  };

  return values[method] || method;
}

function getStatusLabel(status: string, t: typeof translations.en) {
  const values: Record<string, string> = {
    PENDING: t.pending,
    COMPLETED: t.completed,
    FAILED: t.failed,
    REFUNDED: t.refunded,
  };

  return values[status] || status;
}

function getStatusClass(status: string) {
  if (status === "COMPLETED") {
    return "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400";
  }

  if (status === "PENDING") {
    return "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400";
  }

  if (status === "FAILED") {
    return "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400";
  }

  if (status === "REFUNDED") {
    return "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400";
  }

  return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
}

export default function DonationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = use(params);

  const locale: Locale =
    rawLocale === "hi" || rawLocale === "gu" ? rawLocale : "en";

  const t = translations[locale];

  const [donations, setDonations] = useState<Donation[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");

  async function loadDonations() {
    try {
      setLoading(true);

      const query = new URLSearchParams();

      if (search.trim()) {
        query.set("search", search.trim());
      }

      if (status) {
        query.set("status", status);
      }

      if (paymentMethod) {
        query.set("paymentMethod", paymentMethod);
      }

      const response = await fetch(
        `/api/admin/donations?${query.toString()}`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load donations");
      }

      const data = await response.json();

      setDonations(data.donations || data || []);
    } catch {
      setDonations([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      loadDonations();
    }, 250);

    return () => clearTimeout(timer);
  }, [search, status, paymentMethod]);

  async function handleDelete() {
    if (!deleteId) return;

    try {
      setDeleting(true);

      const response = await fetch(
        `/api/admin/donations/${deleteId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      setDeleteId(null);
      setMessage(t.deleted);

      await loadDonations();

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch {
      setMessage(t.deleteFailed);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-slate-950 sm:p-6">
      <div className="mx-auto max-w-7xl">

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {t.title}
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {t.subtitle}
            </p>
          </div>

          <Link
            href={`/${locale}/admin/donations/new`}
            className="inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            + {t.add}
          </Link>
        </div>

        {message && (
          <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-400">
            {message}
          </div>
        )}

        <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-3">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t.search}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-red-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-red-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            <option value="">{t.allStatus}</option>
            <option value="PENDING">{t.pending}</option>
            <option value="COMPLETED">{t.completed}</option>
            <option value="FAILED">{t.failed}</option>
            <option value="REFUNDED">{t.refunded}</option>
          </select>

          <select
            value={paymentMethod}
            onChange={(event) => setPaymentMethod(event.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-red-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            <option value="">{t.allMethods}</option>
            <option value="CASH">{t.cash}</option>
            <option value="UPI">{t.upi}</option>
            <option value="BANK_TRANSFER">{t.bankTransfer}</option>
            <option value="CARD">{t.card}</option>
            <option value="CHEQUE">{t.cheque}</option>
            <option value="OTHER">{t.other}</option>
          </select>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="min-w-[1000px] w-full">
              <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {t.donor}
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {t.amount}
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {t.date}
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {t.method}
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {t.reference}
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {t.status}
                  </th>
                  <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {t.actions}
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-12 text-center text-sm text-slate-500 dark:text-slate-400"
                    >
                      {t.loading}
                    </td>
                  </tr>
                ) : donations.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-12 text-center text-sm text-slate-500 dark:text-slate-400"
                    >
                      {t.noData}
                    </td>
                  </tr>
                ) : (
                  donations.map((donation) => (
                    <tr
                      key={donation.id}
                      className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    >
                      <td className="px-5 py-4">
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {donation.donorName}
                        </div>

                        {donation.email && (
                          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            {donation.email}
                          </div>
                        )}
                      </td>

                      <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white">
                        {donation.currency} {donation.amount}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                        {new Date(
                          donation.donationDate
                        ).toLocaleDateString(
                          locale === "gu"
                            ? "gu-IN"
                            : locale === "hi"
                              ? "hi-IN"
                              : "en-IN"
                        )}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                        {getMethodLabel(donation.paymentMethod, t)}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                        {donation.referenceNumber || "-"}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                            donation.status
                          )}`}
                        >
                          {getStatusLabel(donation.status, t)}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/${locale}/admin/donations/${donation.id}`}
                            className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                          >
                            {t.view}
                          </Link>

                          <Link
                            href={`/${locale}/admin/donations/${donation.id}/edit`}
                            className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
                          >
                            {t.edit}
                          </Link>

                          <button
                            type="button"
                            onClick={() => setDeleteId(donation.id)}
                            className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 dark:border-red-900/60 dark:text-red-400 dark:hover:bg-red-950/30"
                          >
                            {t.remove}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {t.confirmTitle}
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {t.confirmMessage}
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setDeleteId(null)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {t.cancel}
              </button>

              <button
                type="button"
                disabled={deleting}
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? t.loading : t.confirmDelete}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}