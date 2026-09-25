import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

type Locale = "en" | "hi" | "gu";

function normalizeLocale(value: string): Locale {
  if (value === "hi" || value === "gu") {
    return value;
  }

  return "en";
}

const translations = {
  en: {
    title: "My Donations",
    subtitle:
      "View your donation history and contribution details.",
    history: "Donation History",
    noDonations:
      "No donations were found for your account.",
    amount: "Amount",
    status: "Status",
    date: "Date",
    reference: "Reference",
    payment: "Payment",
    completed: "Completed",
    pending: "Pending",
    failed: "Failed",
    cancelled: "Cancelled",
    refunded: "Refunded",
    unknown: "Unknown",
    community: "ASK Community",
    totalDonations: "Total Donations",
    totalAmount: "Total Amount",
    successful: "Successful",
  },

  hi: {
    title: "\u092e\u0947\u0930\u0947 \u0926\u093e\u0928",
    subtitle:
      "\u0905\u092a\u0928\u0947 \u0926\u093e\u0928 \u0915\u093e \u0907\u0924\u093f\u0939\u093e\u0938 \u0914\u0930 \u092f\u094b\u0917\u0926\u093e\u0928 \u0915\u0940 \u0935\u093f\u0935\u0930\u0923 \u0926\u0947\u0916\u0947\u0902\u0964",
    history: "\u0926\u093e\u0928 \u0915\u093e \u0907\u0924\u093f\u0939\u093e\u0938",
    noDonations:
      "\u0906\u092a\u0915\u0947 \u0916\u093e\u0924\u0947 \u0915\u0947 \u0932\u093f\u090f \u0915\u094b\u0908 \u0926\u093e\u0928 \u0928\u0939\u0940\u0902 \u092e\u093f\u0932\u093e\u0964",
    amount: "\u0930\u093e\u0936\u093f",
    status: "\u0938\u094d\u0925\u093f\u0924\u093f",
    date: "\u0926\u093f\u0928\u093e\u0902\u0915",
    reference: "\u0930\u0947\u092b\u0930\u0947\u0902\u0938",
    payment: "\u092d\u0941\u0917\u0924\u093e\u0928",
    completed: "\u092a\u0942\u0930\u094d\u0923",
    pending: "\u0932\u0902\u092c\u093f\u0924",
    failed: "\u0935\u093f\u092b\u0932",
    cancelled: "\u0930\u0926\u094d\u0926",
    refunded: "\u0935\u093e\u092a\u0938 \u0915\u093f\u092f\u093e \u0917\u092f\u093e",
    unknown: "\u0905\u091c\u094d\u091e\u093e\u0924",
    community: "ASK \u0938\u092e\u0941\u0926\u093e\u092f",
    totalDonations: "\u0915\u0941\u0932 \u0926\u093e\u0928",
    totalAmount: "\u0915\u0941\u0932 \u0930\u093e\u0936\u093f",
    successful: "\u0938\u092b\u0932 \u0926\u093e\u0928",
  },

  gu: {
    title: "\u0aae\u0abe\u0ab0\u0abe \u0aa6\u0abe\u0aa8",
    subtitle:
      "\u0aa4\u0aae\u0abe\u0ab0\u0abe \u0aa6\u0abe\u0aa8\u0aa8\u0abe \u0a87\u0aa4\u0abf\u0ab9\u0abe\u0ab8 \u0a85\u0aa8\u0ac7 \u0aaf\u0acb\u0a97\u0aa6\u0abe\u0aa8\u0aa8\u0ac0 \u0ab5\u0abf\u0a97\u0aa4\u0acb \u0a9c\u0acb\u0ab5\u0acb.",
    history: "\u0aa6\u0abe\u0aa8\u0aa8\u0acb \u0a87\u0aa4\u0abf\u0ab9\u0abe\u0ab8",
    noDonations:
      "\u0aa4\u0aae\u0abe\u0ab0\u0abe \u0a96\u0abe\u0aa4\u0abe \u0aae\u0abe\u0a9f\u0ac7 \u0a95\u0acb\u0a88 \u0aa6\u0abe\u0aa8 \u0aae\u0ab3\u0acd\u0aaf\u0ac1\u0a82 \u0aa8\u0aa5\u0ac0.",
    amount: "\u0ab0\u0a95\u0aae",
    status: "\u0ab8\u0acd\u0aa5\u0abf\u0aa4\u0abf",
    date: "\u0aa4\u0abe\u0ab0\u0ac0\u0a96",
    reference: "\u0ab0\u0ac7\u0aab\u0ab0\u0aa8\u0acd\u0ab8",
    payment: "\u0a9a\u0ac1\u0a95\u0ab5\u0aa3\u0ac0",
    completed: "\u0aaa\u0ac2\u0ab0\u0acd\u0aa3",
    pending: "\u0aac\u0abe\u0a95\u0ac0",
    failed: "\u0aa8\u0abf\u0ab7\u0acd\u0aab\u0ab3",
    cancelled: "\u0ab0\u0aa6\u0acd\u0aa6",
    refunded: "\u0aaa\u0ab0\u0aa4 \u0a95\u0ab0\u0abe\u0aaf\u0ac7\u0ab2",
    unknown: "\u0a85\u0a9c\u0acd\u0a9e\u0abe\u0aa4",
    community: "ASK \u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf",
    totalDonations: "\u0a95\u0ac1\u0ab2 \u0aa6\u0abe\u0aa8",
    totalAmount: "\u0a95\u0ac1\u0ab2 \u0ab0\u0a95\u0aae",
    successful: "\u0ab8\u0aab\u0ab3 \u0aa6\u0abe\u0aa8",
  },
} as const;

function formatDate(
  date: Date,
  locale: Locale
) {
  const localeMap = {
    en: "en-IN",
    hi: "hi-IN",
    gu: "gu-IN",
  } as const;

  return new Intl.DateTimeFormat(
    localeMap[locale],
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  ).format(date);
}

function formatAmount(
  amount: number,
  currency: string,
  locale: Locale
) {
  const localeMap = {
    en: "en-IN",
    hi: "hi-IN",
    gu: "gu-IN",
  } as const;

  return new Intl.NumberFormat(
    localeMap[locale],
    {
      style: "currency",
      currency: currency || "INR",
      maximumFractionDigits: 2,
    }
  ).format(amount);
}

function getStatusLabel(
  status: string,
  locale: Locale
) {
  const t = translations[locale];

  const normalized = status.toUpperCase();

  if (
    normalized === "COMPLETED" ||
    normalized === "SUCCESS" ||
    normalized === "PAID"
  ) {
    return t.completed;
  }

  if (normalized === "PENDING") {
    return t.pending;
  }

  if (normalized === "FAILED") {
    return t.failed;
  }

  if (
    normalized === "CANCELLED" ||
    normalized === "CANCELED"
  ) {
    return t.cancelled;
  }

  if (normalized === "REFUNDED") {
    return t.refunded;
  }

  return t.unknown;
}

function getStatusClass(status: string) {
  const normalized = status.toUpperCase();

  if (
    normalized === "COMPLETED" ||
    normalized === "SUCCESS" ||
    normalized === "PAID"
  ) {
    return `
      bg-green-100
      text-green-700
      dark:bg-green-500/15
      dark:text-green-300
    `;
  }

  if (normalized === "PENDING") {
    return `
      bg-yellow-100
      text-yellow-700
      dark:bg-yellow-500/15
      dark:text-yellow-300
    `;
  }

  if (
    normalized === "FAILED" ||
    normalized === "CANCELLED" ||
    normalized === "CANCELED"
  ) {
    return `
      bg-red-100
      text-red-700
      dark:bg-red-500/15
      dark:text-red-300
    `;
  }

  if (normalized === "REFUNDED") {
    return `
      bg-blue-100
      text-blue-700
      dark:bg-blue-500/15
      dark:text-blue-300
    `;
  }

  return `
    bg-gray-100
    text-gray-700
    dark:bg-white/10
    dark:text-gray-300
  `;
}

export default async function MemberDonationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;

  const locale =
    normalizeLocale(localeParam);

  const t = translations[locale];

  const session = await auth();

  if (!session?.user) {
    redirect(`/${locale}/login`);
  }

  const role = String(
    (session.user as { role?: string }).role || ""
  );

  if (role !== "MEMBER") {
    redirect(`/${locale}/unauthorized`);
  }

  const email = String(
    session.user.email || ""
  ).trim().toLowerCase();

  /*
   * The current Donation model does not have userId.
   * Donations are associated with members through email.
   */
  const donations = email
    ? await prisma.donation.findMany({
        where: {
          email: {
            equals: email,
            mode: "insensitive",
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    : [];

  const successfulDonations =
    donations.filter((donation) => {
      const status = String(
        donation.status
      ).toUpperCase();

      return (
        status === "COMPLETED" ||
        status === "SUCCESS" ||
        status === "PAID"
      );
    });

  const totalAmount =
    successfulDonations.reduce(
      (total, donation) =>
        total + Number(donation.amount),
      0
    );

  const currency =
    successfulDonations[0]?.currency ||
    donations[0]?.currency ||
    "INR";

  return (
    <div
      className="
        min-h-[calc(100vh-4rem)]
        rounded-2xl
        bg-gradient-to-br
        from-[#FFF8DF]
        via-[#FFF1C7]
        to-[#FFE5A8]
        p-4
        md:p-6
        transition-all
        duration-300
        dark:from-[#4b0b15]
        dark:via-[#390812]
        dark:to-[#26050c]
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <h1
            className="
              text-3xl
              font-bold
              text-gray-900
              dark:text-white
            "
          >
            {t.title}
          </h1>

          <p
            className="
              mt-1
              text-red-900/80
              dark:text-red-100/75
            "
          >
            {t.subtitle}
          </p>
        </div>

        {/* Summary */}
        <div
          className="
            mb-8
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-3
          "
        >
          <div
            className="
              rounded-2xl
              border
              border-red-300/80
              bg-gradient-to-br
              from-[#FFFDF2]
              via-[#FFF6D8]
              to-[#FFEEC0]
              p-5
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-red-500
              hover:shadow-lg
              dark:border-red-400/35
              dark:from-[#751a28]
              dark:via-[#64131f]
              dark:to-[#51101a]
            "
          >
            <p
              className="
                text-sm
                font-medium
                text-red-900/70
                dark:text-red-100/70
              "
            >
              {t.totalDonations}
            </p>

            <p
              className="
                mt-2
                text-3xl
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              {donations.length}
            </p>
          </div>

          <div
            className="
              rounded-2xl
              border
              border-red-300/80
              bg-gradient-to-br
              from-[#FFFDF2]
              via-[#FFF6D8]
              to-[#FFEEC0]
              p-5
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-green-500
              hover:shadow-lg
              dark:border-red-400/35
              dark:from-[#751a28]
              dark:via-[#64131f]
              dark:to-[#51101a]
            "
          >
            <p
              className="
                text-sm
                font-medium
                text-red-900/70
                dark:text-red-100/70
              "
            >
              {t.successful}
            </p>

            <p
              className="
                mt-2
                text-3xl
                font-bold
                text-green-700
                dark:text-green-300
              "
            >
              {successfulDonations.length}
            </p>
          </div>

          <div
            className="
              rounded-2xl
              border
              border-red-300/80
              bg-gradient-to-br
              from-[#FFFDF2]
              via-[#FFF6D8]
              to-[#FFEEC0]
              p-5
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-red-500
              hover:shadow-lg
              dark:border-red-400/35
              dark:from-[#751a28]
              dark:via-[#64131f]
              dark:to-[#51101a]
            "
          >
            <p
              className="
                text-sm
                font-medium
                text-red-900/70
                dark:text-red-100/70
              "
            >
              {t.totalAmount}
            </p>

            <p
              className="
                mt-2
                text-2xl
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              {formatAmount(
                totalAmount,
                currency,
                locale
              )}
            </p>
          </div>
        </div>

        {/* History heading */}
        <div className="mb-5 flex items-center gap-4">
          <h2
            className="
              text-2xl
              font-bold
              text-gray-900
              dark:text-white
            "
          >
            {t.history}
          </h2>

          <div
            className="
              hidden
              h-px
              flex-1
              bg-red-300/70
              dark:bg-red-300/25
              md:block
            "
          />
        </div>

        {/* Empty state */}
        {donations.length === 0 ? (
          <div
            className="
              rounded-2xl
              border
              border-red-300/80
              bg-gradient-to-br
              from-[#FFFDF2]
              via-[#FFF6D8]
              to-[#FFEEC0]
              p-12
              text-center
              shadow-sm
              dark:border-red-400/40
              dark:from-[#68131f]
              dark:via-[#570e18]
              dark:to-[#410810]
            "
          >
            <div className="text-5xl">
              {"\u{1F64F}"}
            </div>

            <p
              className="
                mt-4
                text-red-900/70
                dark:text-red-100/70
              "
            >
              {t.noDonations}
            </p>
          </div>
        ) : (
          <div
            className="
              overflow-hidden
              rounded-2xl
              border
              border-red-300/80
              bg-gradient-to-br
              from-[#FFFDF2]
              via-[#FFF6D8]
              to-[#FFEEC0]
              shadow-sm
              dark:border-red-400/35
              dark:from-[#751a28]
              dark:via-[#64131f]
              dark:to-[#51101a]
            "
          >
            {/* Desktop */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full">
                <thead>
                  <tr
                    className="
                      border-b
                      border-red-200/70
                      bg-red-100/50
                      dark:border-red-300/20
                      dark:bg-red-950/30
                    "
                  >
                    <th className="px-5 py-4 text-left text-sm font-semibold text-red-900 dark:text-red-100">
                      {t.date}
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold text-red-900 dark:text-red-100">
                      {t.amount}
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold text-red-900 dark:text-red-100">
                      {t.status}
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold text-red-900 dark:text-red-100">
                      {t.reference}
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold text-red-900 dark:text-red-100">
                      {t.payment}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {donations.map((donation) => {
                    const status =
                      String(
                        donation.status
                      );

                    return (
                      <tr
                        key={donation.id}
                        className="
                          border-b
                          border-red-200/50
                          last:border-b-0
                          transition-colors
                          hover:bg-red-100/40
                          dark:border-red-300/15
                          dark:hover:bg-red-950/25
                        "
                      >
                        <td
                          className="
                            whitespace-nowrap
                            px-5
                            py-4
                            text-sm
                            text-gray-800
                            dark:text-gray-200
                          "
                        >
                          {formatDate(
                            donation.donationDate,
                            locale
                          )}
                        </td>

                        <td
                          className="
                            whitespace-nowrap
                            px-5
                            py-4
                            text-sm
                            font-bold
                            text-gray-900
                            dark:text-white
                          "
                        >
                          {formatAmount(
                            Number(
                              donation.amount
                            ),
                            donation.currency,
                            locale
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`
                              inline-flex
                              rounded-full
                              px-3
                              py-1
                              text-xs
                              font-semibold
                              ${getStatusClass(status)}
                            `}
                          >
                            {getStatusLabel(
                              status,
                              locale
                            )}
                          </span>
                        </td>

                        <td
                          className="
                            max-w-[220px]
                            px-5
                            py-4
                            text-sm
                            text-gray-700
                            dark:text-gray-300
                          "
                        >
                          <span
                            className="
                              block
                              truncate
                              font-mono
                              text-xs
                            "
                            title={
                              donation.referenceNumber ||
                              "-"
                            }
                          >
                            {donation.referenceNumber ||
                              "-"}
                          </span>
                        </td>

                        <td
                          className="
                            px-5
                            py-4
                            text-sm
                            text-red-800
                            dark:text-red-200
                          "
                        >
                          {String(
                            donation.paymentMethod
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile */}
            <div className="divide-y divide-red-200/60 dark:divide-red-300/15 md:hidden">
              {donations.map((donation) => {
                const status =
                  String(
                    donation.status
                  );

                return (
                  <div
                    key={donation.id}
                    className="
                      p-5
                      transition-colors
                      hover:bg-red-100/40
                      dark:hover:bg-red-950/25
                    "
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p
                          className="
                            text-xs
                            font-medium
                            text-red-800/60
                            dark:text-red-200/60
                          "
                        >
                          {t.date}
                        </p>

                        <p
                          className="
                            mt-1
                            text-sm
                            font-semibold
                            text-gray-900
                            dark:text-white
                          "
                        >
                          {formatDate(
                            donation.donationDate,
                            locale
                          )}
                        </p>
                      </div>

                      <span
                        className={`
                          inline-flex
                          shrink-0
                          rounded-full
                          px-3
                          py-1
                          text-xs
                          font-semibold
                          ${getStatusClass(status)}
                        `}
                      >
                        {getStatusLabel(
                          status,
                          locale
                        )}
                      </span>
                    </div>

                    <div className="mt-5">
                      <p
                        className="
                          text-xs
                          font-medium
                          text-red-800/60
                          dark:text-red-200/60
                        "
                      >
                        {t.amount}
                      </p>

                      <p
                        className="
                          mt-1
                          text-xl
                          font-bold
                          text-gray-900
                          dark:text-white
                        "
                      >
                        {formatAmount(
                          Number(
                            donation.amount
                          ),
                          donation.currency,
                          locale
                        )}
                      </p>
                    </div>

                    <div className="mt-4">
                      <p
                        className="
                          text-xs
                          font-medium
                          text-red-800/60
                          dark:text-red-200/60
                        "
                      >
                        {t.reference}
                      </p>

                      <p
                        className="
                          mt-1
                          break-all
                          font-mono
                          text-xs
                          text-gray-700
                          dark:text-gray-300
                        "
                      >
                        {donation.referenceNumber ||
                          "-"}
                      </p>
                    </div>

                    <div className="mt-4">
                      <p
                        className="
                          text-xs
                          font-medium
                          text-red-800/60
                          dark:text-red-200/60
                        "
                      >
                        {t.payment}
                      </p>

                      <p
                        className="
                          mt-1
                          text-sm
                          font-medium
                          text-red-800
                          dark:text-red-200
                        "
                      >
                        {String(
                          donation.paymentMethod
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}