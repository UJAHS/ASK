import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getDictionary } from "@/i18n";
import { EventDeleteButton } from "@/components/admin/EventDeleteButton";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

const pageText = {
  en: {
    description: "Manage community events",
    event: "Event",
    date: "Date",
    location: "Location",
    status: "Status",
    actions: "Actions",
  },

  hi: {
    description: "सामुदायिक कार्यक्रम प्रबंधित करें",
    event: "कार्यक्रम",
    date: "तारीख",
    location: "स्थान",
    status: "स्थिति",
    actions: "कार्रवाई",
  },

  gu: {
    description: "સમુદાયના કાર્યક્રમોનું સંચાલન કરો",
    event: "કાર્યક્રમ",
    date: "તારીખ",
    location: "સ્થળ",
    status: "સ્થિતિ",
    actions: "ક્રિયાઓ",
  },
};

function getLocale(
  value: string
): "en" | "hi" | "gu" {
  if (value === "hi") {
    return "hi";
  }

  if (value === "gu") {
    return "gu";
  }

  return "en";
}

function getStatusClass(status: string) {
  switch (status) {
    case "PUBLISHED":
      return `
        border-green-300
        bg-green-100
        text-green-700
        dark:border-green-400/30
        dark:bg-green-500/15
        dark:text-green-300
      `;

    case "DRAFT":
      return `
        border-yellow-300
        bg-yellow-100
        text-yellow-700
        dark:border-yellow-400/30
        dark:bg-yellow-500/15
        dark:text-yellow-300
      `;

    default:
      return `
        border-gray-300
        bg-gray-100
        text-gray-600
        dark:border-gray-400/20
        dark:bg-gray-500/15
        dark:text-gray-300
      `;
  }
}

export default async function EventsPage({
  params,
}: Props) {
  const { locale } = await params;

  const language = getLocale(locale);

  const dictionary = getDictionary(language);
  const text = pageText[language];

  const dateLocale =
    language === "hi"
      ? "hi-IN"
      : language === "gu"
        ? "gu-IN"
        : "en-IN";

  const events =
    await prisma.event.findMany({
      include: {
        translations: true,
      },
      orderBy: {
        eventDate: "desc",
      },
    });

  return (
    <div className="mx-auto max-w-7xl">
      {/* PAGE HEADER */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1
            className="
              text-3xl
              font-bold
              text-gray-900
              dark:text-white
            "
          >
            {dictionary.common.events}
          </h1>

          <p
            className="
              mt-1
              text-sm
              text-red-900/70
              dark:text-red-100/65
            "
          >
            {text.description}
          </p>
        </div>

        <Link
          href={`/${locale}/admin/events/new`}
          className="
            inline-flex
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-r
            from-red-800
            to-red-600
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            shadow-lg
            shadow-red-900/20
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:from-red-700
            hover:to-red-500
            hover:shadow-xl
            dark:from-red-700
            dark:to-red-500
            dark:hover:from-red-600
            dark:hover:to-red-400
          "
        >
          + {dictionary.common.create}
        </Link>
      </div>

      {/* EVENTS CARD */}
      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-red-200/80
          bg-gradient-to-br
          from-[#fff0f2]
          via-[#ffe4e9]
          to-[#ffd6df]
          shadow-lg
          shadow-red-900/10
          dark:border-red-300/20
          dark:from-[#68131f]
          dark:via-[#570e18]
          dark:to-[#410810]
        "
      >
        {events.length === 0 ? (
          <div
            className="
              p-12
              text-center
              text-sm
              text-red-900/60
              dark:text-red-100/60
            "
          >
            {dictionary.common.noData}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              {/* TABLE HEADER */}
              <thead
                className="
                  border-b
                  border-red-200/80
                  bg-white/40
                  dark:border-red-300/15
                  dark:bg-[#4b0b15]/50
                "
              >
                <tr>
                  <th
                    className="
                      px-5
                      py-4
                      text-left
                      text-sm
                      font-semibold
                      text-red-950
                      dark:text-red-50
                    "
                  >
                    {text.event}
                  </th>

                  <th
                    className="
                      px-5
                      py-4
                      text-left
                      text-sm
                      font-semibold
                      text-red-950
                      dark:text-red-50
                    "
                  >
                    {text.date}
                  </th>

                  <th
                    className="
                      px-5
                      py-4
                      text-left
                      text-sm
                      font-semibold
                      text-red-950
                      dark:text-red-50
                    "
                  >
                    {text.location}
                  </th>

                  <th
                    className="
                      px-5
                      py-4
                      text-left
                      text-sm
                      font-semibold
                      text-red-950
                      dark:text-red-50
                    "
                  >
                    {text.status}
                  </th>

                  <th
                    className="
                      px-5
                      py-4
                      text-right
                      text-sm
                      font-semibold
                      text-red-950
                      dark:text-red-50
                    "
                  >
                    {text.actions}
                  </th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody
                className="
                  divide-y
                  divide-red-200/70
                  dark:divide-red-300/10
                "
              >
                {events.map((event) => {
                  const translation =
                    event.translations.find(
                      (item) =>
                        item.locale ===
                        language
                    ) ||
                    event.translations.find(
                      (item) =>
                        item.locale === "en"
                    ) ||
                    event.translations[0];

                  return (
                    <tr
                      key={event.id}
                      className="
                        transition-colors
                        duration-200
                        hover:bg-white/50
                        dark:hover:bg-[#751a28]/30
                      "
                    >
                      {/* EVENT */}
                      <td className="px-5 py-5">
                        <div
                          className="
                            font-semibold
                            text-red-950
                            dark:text-white
                          "
                        >
                          {translation?.title ||
                            event.slug}
                        </div>

                        <div
                          className="
                            mt-1
                            text-xs
                            text-red-900/55
                            dark:text-red-100/50
                          "
                        >
                          {event.slug}
                        </div>
                      </td>

                      {/* DATE */}
                      <td
                        className="
                          px-5
                          py-5
                          text-sm
                          text-red-900/75
                          dark:text-red-100/70
                        "
                      >
                        {new Date(
                          event.eventDate
                        ).toLocaleDateString(
                          dateLocale
                        )}
                      </td>

                      {/* LOCATION */}
                      <td
                        className="
                          px-5
                          py-5
                          text-sm
                          text-red-900/75
                          dark:text-red-100/70
                        "
                      >
                        {translation?.location ||
                          "—"}
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-5">
                        <span
                          className={`
                            inline-flex
                            items-center
                            rounded-full
                            border
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            ${getStatusClass(
                              event.status
                            )}
                          `}
                        >
                          {event.status}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-5 py-5">
                        <div className="flex justify-end gap-4">
                          <Link
                            href={`/${locale}/admin/events/${event.id}/edit`}
                            className="
                              text-sm
                              font-semibold
                              text-red-700
                              transition-colors
                              hover:text-red-900
                              hover:underline
                              dark:text-red-300
                              dark:hover:text-red-100
                            "
                          >
                            {
                              dictionary
                                .common
                                .edit
                            }
                          </Link>

                          <EventDeleteButton
                            eventId={event.id}
                            locale={locale}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}