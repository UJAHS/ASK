"use client";

import { FormEvent, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import ImageInput from "@/components/common/ImageInput";

type Locale = "en" | "hi" | "gu";

type Translation = {
  title: string;
  excerpt: string;
  content: string;
  location: string;
};

type NewsFormProps = {
  mode: "create" | "edit";
  newsId?: string;
  initialData?: {
    slug: string;
    image: string | null;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    publishedAt: string | null;
    translations: Array<{
      locale: string;
      title: string;
      excerpt: string | null;
      content: string;
      location: string | null;
    }>;
  };
};

const languages: Array<{
  code: Locale;
  label: string;
  short: string;
}> = [
  {
    code: "en",
    label: "English",
    short: "EN",
  },
  {
    code: "hi",
    label: "हिन्दी",
    short: "हि",
  },
  {
    code: "gu",
    label: "ગુજરાતી",
    short: "ગુ",
  },
];

const translations: Record<
  Locale,
  {
    title: string;
    slug: string;
    image: string;
    status: string;
    publishedDate: string;
    languageContent: string;
    articleTitle: string;
    excerpt: string;
    content: string;
    location: string;
    locationPlaceholder: string;
    titlePlaceholder: string;
    excerptPlaceholder: string;
    contentPlaceholder: string;
    required: string;
    save: string;
    create: string;
    update: string;
    saving: string;
    cancel: string;
    back: string;
    draft: string;
    published: string;
    archived: string;
    translationRequired: string;
    successCreate: string;
    successUpdate: string;
    genericError: string;
  }
> = {
  en: {
    title: "News",
    slug: "Slug",
    image: "Featured Image",
    status: "Status",
    publishedDate: "Published Date",
    languageContent: "Language Content",
    articleTitle: "Article Title",
    excerpt: "Excerpt",
    content: "Content",
    location: "Location",
    locationPlaceholder: "Ahmedabad, Gujarat",
    titlePlaceholder: "Enter news title",
    excerptPlaceholder: "Short description of the news",
    contentPlaceholder:
      "Write the complete news article...",
    required: "Required",
    save: "Save News",
    create: "Create News",
    update: "Update News",
    saving: "Saving...",
    cancel: "Cancel",
    back: "Back to News",
    draft: "Draft",
    published: "Published",
    archived: "Archived",
    translationRequired:
      "Please complete at least one language translation with title and content.",
    successCreate:
      "News created successfully.",
    successUpdate:
      "News updated successfully.",
    genericError:
      "Unable to save news.",
  },

  hi: {
    title: "समाचार",
    slug: "स्लग",
    image: "फीचर्ड इमेज",
    status: "स्थिति",
    publishedDate: "प्रकाशित तिथि",
    languageContent: "भाषा सामग्री",
    articleTitle: "समाचार शीर्षक",
    excerpt: "संक्षिप्त विवरण",
    content: "सामग्री",
    location: "स्थान",
    locationPlaceholder:
      "अहमदाबाद, गुजरात",
    titlePlaceholder:
      "समाचार शीर्षक दर्ज करें",
    excerptPlaceholder:
      "समाचार का संक्षिप्त विवरण",
    contentPlaceholder:
      "पूरा समाचार लेख लिखें...",
    required: "आवश्यक",
    save: "समाचार सहेजें",
    create: "समाचार बनाएँ",
    update: "समाचार अपडेट करें",
    saving: "सहेजा जा रहा है...",
    cancel: "रद्द करें",
    back: "समाचार पर वापस जाएँ",
    draft: "ड्राफ्ट",
    published: "प्रकाशित",
    archived: "संग्रहीत",
    translationRequired:
      "कम से कम एक भाषा में शीर्षक और सामग्री पूरी करें।",
    successCreate:
      "समाचार सफलतापूर्वक बनाया गया।",
    successUpdate:
      "समाचार सफलतापूर्वक अपडेट किया गया।",
    genericError:
      "समाचार सहेजा नहीं जा सका।",
  },

  gu: {
    title: "સમાચાર",
    slug: "સ્લગ",
    image: "ફીચર્ડ ઈમેજ",
    status: "સ્થિતિ",
    publishedDate: "પ્રકાશિત તારીખ",
    languageContent: "ભાષા સામગ્રી",
    articleTitle: "સમાચારનું શીર્ષક",
    excerpt: "ટૂંકો વર્ણન",
    content: "સામગ્રી",
    location: "સ્થળ",
    locationPlaceholder:
      "અમદાવાદ, ગુજરાત",
    titlePlaceholder:
      "સમાચારનું શીર્ષક દાખલ કરો",
    excerptPlaceholder:
      "સમાચારનું ટૂંકું વર્ણન",
    contentPlaceholder:
      "સંપૂર્ણ સમાચાર લેખ લખો...",
    required: "જરૂરી",
    save: "સમાચાર સાચવો",
    create: "સમાચાર બનાવો",
    update: "સમાચાર અપડેટ કરો",
    saving: "સાચવી રહ્યા છીએ...",
    cancel: "રદ કરો",
    back: "સમાચાર પર પાછા જાઓ",
    draft: "ડ્રાફ્ટ",
    published: "પ્રકાશિત",
    archived: "આર્કાઇવ કરેલ",
    translationRequired:
      "ઓછામાં ઓછી એક ભાષામાં શીર્ષક અને સામગ્રી પૂર્ણ કરો.",
    successCreate:
      "સમાચાર સફળતાપૂર્વક બનાવવામાં આવ્યો.",
    successUpdate:
      "સમાચાર સફળતાપૂર્વક અપડેટ કરવામાં આવ્યો.",
    genericError:
      "સમાચાર સાચવી શકાયો નથી.",
  },
};

function createEmptyTranslations(): Record<
  Locale,
  Translation
> {
  return {
    en: {
      title: "",
      excerpt: "",
      content: "",
      location: "",
    },
    hi: {
      title: "",
      excerpt: "",
      content: "",
      location: "",
    },
    gu: {
      title: "",
      excerpt: "",
      content: "",
      location: "",
    },
  };
}

function formatDateTimeLocal(
  value: string | null
) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const offset = date.getTimezoneOffset();

  const localDate = new Date(
    date.getTime() -
      offset * 60 * 1000
  );

  return localDate
    .toISOString()
    .slice(0, 16);
}

export default function NewsForm({
  mode,
  newsId,
  initialData,
}: NewsFormProps) {
  const router = useRouter();
  const pathname = usePathname();

  const firstSegment =
    pathname.split("/")[1];

  const locale: Locale =
    firstSegment === "hi" ||
    firstSegment === "gu"
      ? firstSegment
      : "en";

  const t = translations[locale];

  const [activeLanguage, setActiveLanguage] =
    useState<Locale>(locale);

  const [slug, setSlug] = useState(
    initialData?.slug || ""
  );

  const [image, setImage] = useState(
    initialData?.image || ""
  );

  const [status, setStatus] =
    useState<
      "DRAFT" | "PUBLISHED" | "ARCHIVED"
    >(
      initialData?.status || "DRAFT"
    );

  const [publishedAt, setPublishedAt] =
    useState(
      formatDateTimeLocal(
        initialData?.publishedAt || null
      )
    );

  const [languageData, setLanguageData] =
    useState<
      Record<Locale, Translation>
    >(() => {
      const result =
        createEmptyTranslations();

      initialData?.translations.forEach(
        (translation) => {
          if (
            translation.locale === "en" ||
            translation.locale === "hi" ||
            translation.locale === "gu"
          ) {
            result[
              translation.locale
            ] = {
              title:
                translation.title ||
                "",
              excerpt:
                translation.excerpt ||
                "",
              content:
                translation.content ||
                "",
              location:
                translation.location ||
                "",
            };
          }
        }
      );

      return result;
    });

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const currentLanguage =
    useMemo(
      () =>
        languageData[
          activeLanguage
        ],
      [
        languageData,
        activeLanguage,
      ]
    );

  function updateLanguageField(
    field: keyof Translation,
    value: string
  ) {
    setLanguageData(
      (previous) => ({
        ...previous,
        [activeLanguage]: {
          ...previous[
            activeLanguage
          ],
          [field]: value,
        },
      })
    );
  }

  function generateSlug(
    value: string
  ) {
    return value
      .toLowerCase()
      .trim()
      .replace(
        /[^a-z0-9]+/g,
        "-"
      )
      .replace(
        /^-+|-+$/g,
        "");
  }

  function handleTitleChange(
    value: string
  ) {
    updateLanguageField(
      "title",
      value
    );

    if (
      activeLanguage === "en" &&
      !initialData
    ) {
      setSlug(
        generateSlug(value)
      );
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const hasCompleteTranslation =
      Object.values(
        languageData
      ).some(
        (translation) =>
          translation.title.trim() &&
          translation.content.trim()
      );

    if (!hasCompleteTranslation) {
      setError(
        t.translationRequired
      );
      return;
    }

    if (!slug.trim()) {
      setError(
        `${t.slug} ${t.required}.`
      );
      return;
    }

    setSaving(true);

    try {
      const payload = {
        slug: slug.trim(),
        image: image.trim(),
        status,
        publishedAt: publishedAt
          ? new Date(
              publishedAt
            ).toISOString()
          : null,
        translations:
          languageData,
      };

      const url =
        mode === "create"
          ? "/api/admin/news"
          : `/api/admin/news/${newsId}`;

      const response =
        await fetch(url, {
          method:
            mode === "create"
              ? "POST"
              : "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            payload
          ),
        });

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            t.genericError
        );
      }

      setSuccess(
        mode === "create"
          ? t.successCreate
          : t.successUpdate
      );

      if (mode === "create") {
        router.push(
          `/${locale}/admin/news`
        );
        router.refresh();
        return;
      }

      router.refresh();
    } catch (
      submitError
    ) {
      setError(
        submitError instanceof
          Error
          ? submitError.message
          : t.genericError
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        mx-auto
        max-w-6xl
      "
    >
      {/* =========================
          HEADER
      ========================== */}
      <div
        className="
          mb-6
          flex
          flex-col
          gap-4
          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        <div>
          <button
            type="button"
            onClick={() =>
              router.push(
                `/${locale}/admin/news`
              )
            }
            className="
              mb-3
              text-sm
              font-medium
              text-red-700
              transition
              hover:text-red-900
              dark:text-red-300
              dark:hover:text-red-100
            "
          >
            ← {t.back}
          </button>

          <h1
            className="
              text-3xl
              font-bold
              text-red-950
              dark:text-red-50
            "
          >
            {mode === "create"
              ? t.create
              : t.update}
          </h1>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() =>
              router.push(
                `/${locale}/admin/news`
              )
            }
            className="
              rounded-xl
              border
              border-red-300
              bg-[#fff0f2]
              px-5
              py-3
              text-sm
              font-semibold
              text-red-800
              shadow-sm
              transition
              hover:bg-[#ffe0e5]

              dark:border-red-800
              dark:bg-[#4b0b15]
              dark:text-red-100
              dark:hover:bg-[#570e18]
            "
          >
            {t.cancel}
          </button>

          <button
            type="submit"
            disabled={saving}
            className="
              rounded-xl
              bg-gradient-to-r
              from-red-700
              to-red-600
              px-6
              py-3
              text-sm
              font-semibold
              text-white
              shadow-md
              transition
              hover:-translate-y-0.5
              hover:from-red-800
              hover:to-red-700
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {saving
              ? t.saving
              : mode === "create"
                ? t.save
                : t.update}
          </button>
        </div>
      </div>

      {/* =========================
          ERROR
      ========================== */}
      {error && (
        <div
          className="
            mb-5
            rounded-xl
            border
            border-red-300
            bg-[#ffe5e9]
            px-4
            py-3
            text-sm
            font-medium
            text-red-800

            dark:border-red-800
            dark:bg-[#570e18]
            dark:text-red-100
          "
        >
          {error}
        </div>
      )}

      {/* =========================
          SUCCESS
      ========================== */}
      {success && (
        <div
          className="
            mb-5
            rounded-xl
            border
            border-green-300
            bg-green-50
            px-4
            py-3
            text-sm
            font-medium
            text-green-800

            dark:border-green-800
            dark:bg-green-950/30
            dark:text-green-200
          "
        >
          {success}
        </div>
      )}

      {/* =========================
          BASIC NEWS INFORMATION
      ========================== */}
      <div
        className="
          mb-6
          rounded-2xl
          border
          border-red-200
          bg-[#fff0f2]
          p-6
          shadow-sm

          dark:border-red-900
          dark:bg-[#4b0b15]
        "
      >
        <h2
          className="
            mb-5
            text-lg
            font-bold
            text-red-950
            dark:text-red-50
          "
        >
          {t.title}
        </h2>

        <div
          className="
            grid
            grid-cols-1
            gap-5
            md:grid-cols-2
          "
        >
          {/* SLUG */}
          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-red-900
                dark:text-red-100
              "
            >
              {t.slug}

              <span className="ml-1 text-red-600">
                *
              </span>
            </label>

            <input
              type="text"
              value={slug}
              onChange={(event) =>
                setSlug(
                  event.target.value
                )
              }
              placeholder="community-news-2026"
              className="
                w-full
                rounded-xl
                border
                border-red-200
                bg-[#fff7f8]
                px-4
                py-3
                text-sm
                text-red-950
                outline-none
                transition
                placeholder:text-red-300
                focus:border-red-500
                focus:ring-2
                focus:ring-red-200

                dark:border-red-800
                dark:bg-[#3b0710]
                dark:text-red-50
                dark:placeholder:text-red-300
                dark:focus:border-red-500
                dark:focus:ring-red-900
              "
            />
          </div>

          {/* STATUS */}
          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-red-900
                dark:text-red-100
              "
            >
              {t.status}
            </label>

            <select
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value as
                    | "DRAFT"
                    | "PUBLISHED"
                    | "ARCHIVED"
                )
              }
              className="
                w-full
                rounded-xl
                border
                border-red-200
                bg-[#fff7f8]
                px-4
                py-3
                text-sm
                text-red-950
                outline-none
                transition
                focus:border-red-500
                focus:ring-2
                focus:ring-red-200

                dark:border-red-800
                dark:bg-[#3b0710]
                dark:text-red-50
                dark:focus:border-red-500
                dark:focus:ring-red-900
              "
            >
              <option value="DRAFT">
                {t.draft}
              </option>

              <option value="PUBLISHED">
                {t.published}
              </option>

              <option value="ARCHIVED">
                {t.archived}
              </option>
            </select>
          </div>

          {/* FEATURED IMAGE */}
          <div className="md:col-span-2">
            <ImageInput
              locale={locale}
              value={image}
              onChange={setImage}
              label={t.image}
              maxSizeMB={5}
            />
          </div>

          {/* PUBLISHED DATE */}
          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-red-900
                dark:text-red-100
              "
            >
              {t.publishedDate}
            </label>

            <input
              type="datetime-local"
              value={publishedAt}
              onChange={(event) =>
                setPublishedAt(
                  event.target.value
                )
              }
              className="
                w-full
                rounded-xl
                border
                border-red-200
                bg-[#fff7f8]
                px-4
                py-3
                text-sm
                text-red-950
                outline-none
                transition
                focus:border-red-500
                focus:ring-2
                focus:ring-red-200

                dark:border-red-800
                dark:bg-[#3b0710]
                dark:text-red-50
                dark:focus:border-red-500
                dark:focus:ring-red-900
              "
            />
          </div>
        </div>
      </div>

      {/* =========================
          LANGUAGE CONTENT
      ========================== */}
      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-red-200
          bg-[#fff0f2]
          shadow-sm

          dark:border-red-900
          dark:bg-[#4b0b15]
        "
      >
        {/* LANGUAGE HEADER */}
        <div
          className="
            border-b
            border-red-200
            px-6
            pt-6

            dark:border-red-900
          "
        >
          <h2
            className="
              mb-5
              text-lg
              font-bold
              text-red-950
              dark:text-red-50
            "
          >
            {t.languageContent}
          </h2>

          <div
            className="
              flex
              gap-2
              overflow-x-auto
            "
          >
            {languages.map(
              (language) => {
                const isActive =
                  activeLanguage ===
                  language.code;

                const hasContent =
                  Boolean(
                    languageData[
                      language.code
                    ].title.trim() ||
                      languageData[
                        language.code
                      ].content.trim()
                  );

                return (
                  <button
                    key={
                      language.code
                    }
                    type="button"
                    onClick={() =>
                      setActiveLanguage(
                        language.code
                      )
                    }
                    className={`
                      relative
                      rounded-t-xl
                      border
                      border-b-0
                      px-5
                      py-3
                      text-sm
                      font-semibold
                      transition-all

                      ${
                        isActive
                          ? `
                            border-red-200
                            bg-[#ffe0e5]
                            text-red-800
                            dark:border-red-900
                            dark:bg-[#68131f]
                            dark:text-red-100
                          `
                          : `
                            border-transparent
                            bg-[#ffe8ed]
                            text-red-600
                            hover:bg-[#ffe0e5]
                            hover:text-red-800
                            dark:bg-[#570e18]
                            dark:text-red-200
                            dark:hover:bg-[#68131f]
                          `
                      }
                    `}
                  >
                    {language.label}

                    {hasContent && (
                      <span
                        className="
                          ml-2
                          inline-block
                          h-2
                          w-2
                          rounded-full
                          bg-green-500
                        "
                      />
                    )}
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* LANGUAGE FORM */}
        <div className="p-6">
          <div
            className="
              mb-5
              rounded-xl
              border
              border-red-200
              bg-[#ffe8ed]
              px-4
              py-3
              text-sm
              text-red-800

              dark:border-red-900
              dark:bg-[#570e18]
              dark:text-red-100
            "
          >
            <strong>
              {
                languages.find(
                  (language) =>
                    language.code ===
                    activeLanguage
                )?.label
              }
            </strong>

            {" — "}

            {t.articleTitle},{" "}
            {t.excerpt},{" "}
            {t.content} and{" "}
            {t.location}
          </div>

          <div className="space-y-5">
            {/* ARTICLE TITLE */}
            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-red-900
                  dark:text-red-100
                "
              >
                {t.articleTitle}

                <span className="ml-1 text-red-600">
                  *
                </span>
              </label>

              <input
                type="text"
                value={
                  currentLanguage.title
                }
                onChange={(event) =>
                  handleTitleChange(
                    event.target.value
                  )
                }
                placeholder={
                  t.titlePlaceholder
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-red-200
                  bg-[#fff7f8]
                  px-4
                  py-3
                  text-sm
                  text-red-950
                  outline-none
                  transition
                  placeholder:text-red-300
                  focus:border-red-500
                  focus:ring-2
                  focus:ring-red-200

                  dark:border-red-800
                  dark:bg-[#3b0710]
                  dark:text-red-50
                  dark:placeholder:text-red-300
                  dark:focus:border-red-500
                  dark:focus:ring-red-900
                "
              />
            </div>

            {/* EXCERPT */}
            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-red-900
                  dark:text-red-100
                "
              >
                {t.excerpt}
              </label>

              <textarea
                rows={3}
                value={
                  currentLanguage.excerpt
                }
                onChange={(event) =>
                  updateLanguageField(
                    "excerpt",
                    event.target.value
                  )
                }
                placeholder={
                  t.excerptPlaceholder
                }
                className="
                  w-full
                  resize-y
                  rounded-xl
                  border
                  border-red-200
                  bg-[#fff7f8]
                  px-4
                  py-3
                  text-sm
                  text-red-950
                  outline-none
                  transition
                  placeholder:text-red-300
                  focus:border-red-500
                  focus:ring-2
                  focus:ring-red-200

                  dark:border-red-800
                  dark:bg-[#3b0710]
                  dark:text-red-50
                  dark:placeholder:text-red-300
                  dark:focus:border-red-500
                  dark:focus:ring-red-900
                "
              />
            </div>

            {/* CONTENT */}
            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-red-900
                  dark:text-red-100
                "
              >
                {t.content}

                <span className="ml-1 text-red-600">
                  *
                </span>
              </label>

              <textarea
                rows={14}
                value={
                  currentLanguage.content
                }
                onChange={(event) =>
                  updateLanguageField(
                    "content",
                    event.target.value
                  )
                }
                placeholder={
                  t.contentPlaceholder
                }
                className="
                  w-full
                  resize-y
                  rounded-xl
                  border
                  border-red-200
                  bg-[#fff7f8]
                  px-4
                  py-3
                  text-sm
                  leading-7
                  text-red-950
                  outline-none
                  transition
                  placeholder:text-red-300
                  focus:border-red-500
                  focus:ring-2
                  focus:ring-red-200

                  dark:border-red-800
                  dark:bg-[#3b0710]
                  dark:text-red-50
                  dark:placeholder:text-red-300
                  dark:focus:border-red-500
                  dark:focus:ring-red-900
                "
              />
            </div>

            {/* LOCATION */}
            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-red-900
                  dark:text-red-100
                "
              >
                {t.location}
              </label>

              <input
                type="text"
                value={
                  currentLanguage.location
                }
                onChange={(event) =>
                  updateLanguageField(
                    "location",
                    event.target.value
                  )
                }
                placeholder={
                  t.locationPlaceholder
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-red-200
                  bg-[#fff7f8]
                  px-4
                  py-3
                  text-sm
                  text-red-950
                  outline-none
                  transition
                  placeholder:text-red-300
                  focus:border-red-500
                  focus:ring-2
                  focus:ring-red-200

                  dark:border-red-800
                  dark:bg-[#3b0710]
                  dark:text-red-50
                  dark:placeholder:text-red-300
                  dark:focus:border-red-500
                  dark:focus:ring-red-900
                "
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}