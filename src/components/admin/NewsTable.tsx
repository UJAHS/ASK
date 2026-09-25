"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type NewsTranslation = {
  locale: string;
  title: string;
  excerpt: string | null;
  content: string;
  location: string | null;
};

type NewsItem = {
  id: string;
  slug: string;
  image: string | null;
  status: string;
  publishedAt: string | null;
  createdAt: string;
  translations: NewsTranslation[];
};

type Locale = "en" | "hi" | "gu";

const translations: Record<
  Locale,
  {
    search: string;
    allStatuses: string;
    publishedFilter: string;
    draftFilter: string;
    archivedFilter: string;
    title: string;
    language: string;
    location: string;
    date: string;
    status: string;
    actions: string;
    edit: string;
    delete: string;
    deleting: string;
    noNews: string;
    noNewsFound: string;
    createFirst: string;
    tryDifferent: string;
    addNews: string;
    published: string;
    draft: string;
    archived: string;
    notSet: string;
    confirmDelete: string;
    deleteError: string;
  }
> = {
  en: {
    search: "Search news...",
    allStatuses: "All Statuses",
    publishedFilter: "Published",
    draftFilter: "Draft",
    archivedFilter: "Archived",
    title: "Title",
    language: "Language",
    location: "Location",
    date: "Date",
    status: "Status",
    actions: "Actions",
    edit: "Edit",
    delete: "Delete",
    deleting: "Deleting...",
    noNews: "No News Yet",
    noNewsFound: "No News Found",
    createFirst:
      "Create your first community news article.",
    tryDifferent:
      "Try a different search or status filter.",
    addNews: "+ Add News",
    published: "Published",
    draft: "Draft",
    archived: "Archived",
    notSet: "Not set",
    confirmDelete:
      "Are you sure you want to delete this news article?",
    deleteError:
      "Unable to delete news article.",
  },

  hi: {
    search: "समाचार खोजें...",
    allStatuses: "सभी स्थितियाँ",
    publishedFilter: "प्रकाशित",
    draftFilter: "ड्राफ्ट",
    archivedFilter: "संग्रहीत",
    title: "शीर्षक",
    language: "भाषा",
    location: "स्थान",
    date: "तिथि",
    status: "स्थिति",
    actions: "कार्यवाही",
    edit: "संपादित करें",
    delete: "हटाएँ",
    deleting: "हटाया जा रहा है...",
    noNews: "अभी कोई समाचार नहीं है",
    noNewsFound: "कोई समाचार नहीं मिला",
    createFirst:
      "अपना पहला सामुदायिक समाचार लेख बनाएँ।",
    tryDifferent:
      "कोई दूसरा खोज शब्द या स्थिति फ़िल्टर आज़माएँ।",
    addNews: "+ समाचार जोड़ें",
    published: "प्रकाशित",
    draft: "ड्राफ्ट",
    archived: "संग्रहीत",
    notSet: "निर्धारित नहीं",
    confirmDelete:
      "क्या आप इस समाचार लेख को हटाना चाहते हैं?",
    deleteError:
      "समाचार लेख हटाया नहीं जा सका।",
  },

  gu: {
    search: "સમાચાર શોધો...",
    allStatuses: "બધી સ્થિતિઓ",
    publishedFilter: "પ્રકાશિત",
    draftFilter: "ડ્રાફ્ટ",
    archivedFilter: "આર્કાઇવ કરેલ",
    title: "શીર્ષક",
    language: "ભાષા",
    location: "સ્થળ",
    date: "તારીખ",
    status: "સ્થિતિ",
    actions: "ક્રિયાઓ",
    edit: "ફેરફાર કરો",
    delete: "કાઢી નાખો",
    deleting: "કાઢી રહ્યા છીએ...",
    noNews: "હજુ સુધી કોઈ સમાચાર નથી",
    noNewsFound: "કોઈ સમાચાર મળ્યા નથી",
    createFirst:
      "તમારો પ્રથમ સામુદાયિક સમાચાર લેખ બનાવો.",
    tryDifferent:
      "બીજો શોધ શબ્દ અથવા સ્થિતિ ફિલ્ટર અજમાવો.",
    addNews: "+ સમાચાર ઉમેરો",
    published: "પ્રકાશિત",
    draft: "ડ્રાફ્ટ",
    archived: "આર્કાઇવ કરેલ",
    notSet: "નક્કી કરેલ નથી",
    confirmDelete:
      "શું તમે આ સમાચાર લેખને કાઢી નાખવા માંગો છો?",
    deleteError:
      "સમાચાર લેખ કાઢી શકાતો નથી.",
  },
};

export default function NewsTable({
  news,
}: {
  news: NewsItem[];
}) {
  const pathname = usePathname();
  const router = useRouter();

  const firstSegment = pathname.split("/")[1];

  const locale: Locale =
    firstSegment === "hi" || firstSegment === "gu"
      ? firstSegment
      : "en";

  const t = translations[locale];

  const dateLocale =
    locale === "gu"
      ? "gu-IN"
      : locale === "hi"
        ? "hi-IN"
        : "en-IN";

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("ALL");
  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const filteredNews = news.filter((item) => {
    const query = search
      .toLowerCase()
      .trim();

    const matchesSearch =
      !query ||
      item.slug
        .toLowerCase()
        .includes(query) ||
      item.translations.some(
        (translation) =>
          translation.title
            .toLowerCase()
            .includes(query) ||
          translation.excerpt
            ?.toLowerCase()
            .includes(query) ||
          translation.location
            ?.toLowerCase()
            .includes(query)
      );

    const matchesStatus =
      statusFilter === "ALL" ||
      item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  function getTranslation(
    item: NewsItem
  ) {
    return (
      item.translations.find(
        (translation) =>
          translation.locale === locale
      ) ||
      item.translations.find(
        (translation) =>
          translation.locale === "en"
      ) ||
      item.translations[0] ||
      null
    );
  }

  function getAvailableLanguages(
    item: NewsItem
  ) {
    return item.translations
      .map((translation) => {
        if (translation.locale === "en") {
          return "EN";
        }

        if (translation.locale === "hi") {
          return "हि";
        }

        if (translation.locale === "gu") {
          return "ગુ";
        }

        return translation.locale.toUpperCase();
      })
      .join(" · ");
  }

  function getStatusText(status: string) {
    switch (status) {
      case "PUBLISHED":
        return t.published;

      case "DRAFT":
        return t.draft;

      case "ARCHIVED":
        return t.archived;

      default:
        return status;
    }
  }

  function getStatusClass(status: string) {
    switch (status) {
      case "PUBLISHED":
        return `
          border
          border-green-300
          bg-green-50
          text-green-700
          dark:border-green-400/40
          dark:bg-green-900/25
          dark:text-green-300
        `;

      case "DRAFT":
        return `
          border
          border-amber-300
          bg-amber-50
          text-amber-700
          dark:border-amber-400/40
          dark:bg-amber-900/25
          dark:text-amber-300
        `;

      case "ARCHIVED":
        return `
          border
          border-gray-300
          bg-gray-100
          text-gray-600
          dark:border-gray-400/30
          dark:bg-gray-800/40
          dark:text-gray-300
        `;

      default:
        return `
          border
          border-gray-300
          bg-gray-100
          text-gray-600
          dark:border-gray-400/30
          dark:bg-gray-800/40
          dark:text-gray-300
        `;
    }
  }

  async function deleteNews(id: string) {
    const confirmed = window.confirm(
      t.confirmDelete
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    try {
      const response = await fetch(
        `/api/admin/news/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || t.deleteError
        );
      }

      router.refresh();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : t.deleteError
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-red-200/70
        bg-[#ffe8ed]
        shadow-lg
        shadow-red-950/5

        dark:border-red-400/20
        dark:bg-[#4b0b15]
        dark:shadow-red-950/20
      "
    >
      {/* SEARCH / FILTER */}
      <div
        className="
          flex
          flex-col
          gap-4
          border-b
          border-red-200/70
          bg-gradient-to-r
          from-[#fff0f2]
          via-[#ffe3e8]
          to-[#ffd7df]
          p-5

          dark:border-red-300/15
          dark:from-[#68131f]
          dark:via-[#5c101a]
          dark:to-[#4b0c15]

          md:flex-row
        "
      >
        <input
          type="text"
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder={t.search}
          className="
            w-full
            max-w-md
            rounded-xl
            border
            border-red-200
            bg-[#fff7f8]
            px-4
            py-3
            text-sm
            text-red-950
            outline-none
            transition-all
            placeholder:text-red-900/35

            focus:border-red-400
            focus:ring-2
            focus:ring-red-200/60

            dark:border-red-300/25
            dark:bg-[#3b0710]
            dark:text-red-50
            dark:placeholder:text-red-100/40
            dark:focus:border-red-300/60
            dark:focus:ring-red-400/20
          "
        />

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
          className="
            rounded-xl
            border
            border-red-200
            bg-[#fff7f8]
            px-4
            py-3
            text-sm
            text-red-950
            outline-none
            transition-all

            focus:border-red-400
            focus:ring-2
            focus:ring-red-200/60

            dark:border-red-300/25
            dark:bg-[#3b0710]
            dark:text-red-50
            dark:focus:border-red-300/60
            dark:focus:ring-red-400/20
          "
        >
          <option
            value="ALL"
            className="
              bg-[#fff7f8]
              text-red-950
              dark:bg-[#3b0710]
              dark:text-red-50
            "
          >
            {t.allStatuses}
          </option>

          <option
            value="PUBLISHED"
            className="
              bg-[#fff7f8]
              text-red-950
              dark:bg-[#3b0710]
              dark:text-red-50
            "
          >
            {t.publishedFilter}
          </option>

          <option
            value="DRAFT"
            className="
              bg-[#fff7f8]
              text-red-950
              dark:bg-[#3b0710]
              dark:text-red-50
            "
          >
            {t.draftFilter}
          </option>

          <option
            value="ARCHIVED"
            className="
              bg-[#fff7f8]
              text-red-950
              dark:bg-[#3b0710]
              dark:text-red-50
            "
          >
            {t.archivedFilter}
          </option>
        </select>
      </div>

      {/* EMPTY STATE */}
      {filteredNews.length === 0 ? (
        <div
          className="
            bg-gradient-to-br
            from-[#ffeef1]
            via-[#ffe2e7]
            to-[#ffd7df]
            px-6
            py-16
            text-center

            dark:from-[#4b0b15]
            dark:via-[#410810]
            dark:to-[#35060d]
          "
        >
          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              border
              border-red-200
              bg-[#ffdfe5]
              text-2xl
              font-bold
              text-red-700
              shadow-sm

              dark:border-red-400/20
              dark:bg-[#68131f]
              dark:text-red-200
            "
          >
            +
          </div>

          <h2
            className="
              mt-5
              text-xl
              font-bold
              text-red-950

              dark:text-red-50
            "
          >
            {news.length === 0
              ? t.noNews
              : t.noNewsFound}
          </h2>

          <p
            className="
              mt-2
              text-red-900/60

              dark:text-red-100/60
            "
          >
            {news.length === 0
              ? t.createFirst
              : t.tryDifferent}
          </p>

          {news.length === 0 && (
            <a
              href={`/${locale}/admin/news/new`}
              className="
                mt-5
                inline-flex
                rounded-xl
                bg-gradient-to-r
                from-red-700
                to-red-900
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                shadow-md
                shadow-red-900/15
                transition-all
                hover:-translate-y-0.5
                hover:from-red-800
                hover:to-red-950
                hover:shadow-lg
              "
            >
              {t.addNews}
            </a>
          )}
        </div>
      ) : (
        /* NEWS TABLE */
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px]">

            {/* TABLE HEADER */}
            <thead
              className="
                border-b
                border-red-200/70
                bg-gradient-to-r
                from-[#ffdfe5]
                via-[#ffd5dc]
                to-[#ffccd5]

                dark:border-red-300/15
                dark:from-[#68131f]
                dark:via-[#5c101a]
                dark:to-[#4b0c15]
              "
            >
              <tr>
                <th
                  className="
                    px-6
                    py-4
                    text-left
                    text-xs
                    font-bold
                    uppercase
                    tracking-wide
                    text-red-900

                    dark:text-red-100
                  "
                >
                  {t.title}
                </th>

                <th
                  className="
                    px-6
                    py-4
                    text-left
                    text-xs
                    font-bold
                    uppercase
                    tracking-wide
                    text-red-900

                    dark:text-red-100
                  "
                >
                  {t.language}
                </th>

                <th
                  className="
                    px-6
                    py-4
                    text-left
                    text-xs
                    font-bold
                    uppercase
                    tracking-wide
                    text-red-900

                    dark:text-red-100
                  "
                >
                  {t.location}
                </th>

                <th
                  className="
                    px-6
                    py-4
                    text-left
                    text-xs
                    font-bold
                    uppercase
                    tracking-wide
                    text-red-900

                    dark:text-red-100
                  "
                >
                  {t.date}
                </th>

                <th
                  className="
                    px-6
                    py-4
                    text-left
                    text-xs
                    font-bold
                    uppercase
                    tracking-wide
                    text-red-900

                    dark:text-red-100
                  "
                >
                  {t.status}
                </th>

                <th
                  className="
                    px-6
                    py-4
                    text-right
                    text-xs
                    font-bold
                    uppercase
                    tracking-wide
                    text-red-900

                    dark:text-red-100
                  "
                >
                  {t.actions}
                </th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody
              className="
                divide-y
                divide-red-200/60

                dark:divide-red-300/10
              "
            >
              {filteredNews.map((item) => {
                const translation =
                  getTranslation(item);

                const date =
                  item.publishedAt
                    ? new Date(
                        item.publishedAt
                      ).toLocaleDateString(
                        dateLocale,
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )
                    : t.notSet;

                return (
                  <tr
                    key={item.id}
                    className="
                      bg-[#ffe8ed]
                      transition-all
                      duration-200
                      hover:bg-[#ffd9e0]

                      dark:bg-[#4b0b15]
                      dark:hover:bg-[#68131f]
                    "
                  >
                    {/* TITLE */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt=""
                            className="
                              h-12
                              w-16
                              rounded-lg
                              border
                              border-red-200
                              object-cover

                              dark:border-red-300/20
                            "
                          />
                        ) : (
                          <div
                            className="
                              flex
                              h-12
                              w-16
                              items-center
                              justify-center
                              rounded-lg
                              border
                              border-red-200
                              bg-[#ffdfe5]
                              text-lg
                              font-bold
                              text-red-700

                              dark:border-red-300/20
                              dark:bg-[#68131f]
                              dark:text-red-200
                            "
                          >
                            N
                          </div>
                        )}

                        <div>
                          <p
                            className="
                              font-semibold
                              text-red-950

                              dark:text-red-50
                            "
                          >
                            {translation?.title ||
                              item.slug}
                          </p>

                          <p
                            className="
                              mt-1
                              max-w-md
                              truncate
                              text-xs
                              text-red-800/55

                              dark:text-red-100/50
                            "
                          >
                            {item.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* LANGUAGE */}
                    <td
                      className="
                        px-6
                        py-4
                        text-sm
                        font-semibold
                        text-red-800/80

                        dark:text-red-100/75
                      "
                    >
                      {getAvailableLanguages(item)}
                    </td>

                    {/* LOCATION */}
                    <td
                      className="
                        px-6
                        py-4
                        text-sm
                        text-red-900/70

                        dark:text-red-100/70
                      "
                    >
                      {translation?.location ||
                        "—"}
                    </td>

                    {/* DATE */}
                    <td
                      className="
                        px-6
                        py-4
                        text-sm
                        text-red-900/70

                        dark:text-red-100/70
                      "
                    >
                      {date}
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-4">
                      <span
                        className={`
                          inline-flex
                          rounded-full
                          px-3
                          py-1
                          text-xs
                          font-semibold
                          ${getStatusClass(
                            item.status
                          )}
                        `}
                      >
                        {getStatusText(
                          item.status
                        )}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4">
                      <div
                        className="
                          flex
                          items-center
                          justify-end
                          gap-2
                        "
                      >
                        {/* EDIT */}
                        <a
                          href={`/${locale}/admin/news/${item.id}/edit`}
                          className="
                            rounded-lg
                            border
                            border-red-300
                            bg-[#ffdfe5]
                            px-3
                            py-2
                            text-xs
                            font-semibold
                            text-red-800
                            transition-all

                            hover:border-red-400
                            hover:bg-[#ffccd5]
                            hover:text-red-950

                            dark:border-red-300/25
                            dark:bg-[#5c101a]
                            dark:text-red-100
                            dark:hover:border-red-300/50
                            dark:hover:bg-[#751a28]
                            dark:hover:text-white
                          "
                        >
                          {t.edit}
                        </a>

                        {/* DELETE */}
                        <button
                          type="button"
                          disabled={
                            deletingId === item.id
                          }
                          onClick={() =>
                            deleteNews(item.id)
                          }
                          className="
                            rounded-lg
                            border
                            border-red-300
                            bg-red-50
                            px-3
                            py-2
                            text-xs
                            font-semibold
                            text-red-700
                            transition-all

                            hover:border-red-400
                            hover:bg-red-100
                            hover:text-red-900

                            disabled:cursor-not-allowed
                            disabled:opacity-50

                            dark:border-red-400/35
                            dark:bg-red-900/25
                            dark:text-red-300
                            dark:hover:bg-red-800/40
                            dark:hover:text-red-100
                          "
                        >
                          {deletingId === item.id
                            ? t.deleting
                            : t.delete}
                        </button>
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
  );
}