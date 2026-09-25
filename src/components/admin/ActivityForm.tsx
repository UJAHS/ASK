"use client";

import { FormEvent, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import ImageInput from "@/components/common/ImageInput";

type Activity = {
  id?: string;
  title?: string;
  description?: string | null;
  category?: string | null;
  location?: string | null;
  activityDate?: string | null;
  image?: string | null;
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
};

type Locale = "en" | "hi" | "gu";

const categories = [
  "Community",
  "Education",
  "Social Service",
  "Religious",
  "Cultural",
  "Health",
  "Environment",
  "Youth",
  "Women Empowerment",
  "Senior Citizens",
  "Charity",
  "Awareness",
  "Other",
];

const categoryTranslations: Record<
  Locale,
  Record<string, string>
> = {
  en: {
    Community: "Community",
    Education: "Education",
    "Social Service": "Social Service",
    Religious: "Religious",
    Cultural: "Cultural",
    Health: "Health",
    Environment: "Environment",
    Youth: "Youth",
    "Women Empowerment": "Women Empowerment",
    "Senior Citizens": "Senior Citizens",
    Charity: "Charity",
    Awareness: "Awareness",
    Other: "Other",
  },

  hi: {
    Community: "सामुदायिक",
    Education: "शिक्षा",
    "Social Service": "सामाजिक सेवा",
    Religious: "धार्मिक",
    Cultural: "सांस्कृतिक",
    Health: "स्वास्थ्य",
    Environment: "पर्यावरण",
    Youth: "युवा",
    "Women Empowerment": "महिला सशक्तिकरण",
    "Senior Citizens": "वरिष्ठ नागरिक",
    Charity: "दान",
    Awareness: "जागरूकता",
    Other: "अन्य",
  },

  gu: {
    Community: "સામુદાયિક",
    Education: "શિક્ષણ",
    "Social Service": "સામાજિક સેવા",
    Religious: "ધાર્મિક",
    Cultural: "સાંસ્કૃતિક",
    Health: "આરોગ્ય",
    Environment: "પર્યાવરણ",
    Youth: "યુવા",
    "Women Empowerment": "મહિલા સશક્તિકરણ",
    "Senior Citizens": "વરિષ્ઠ નાગરિકો",
    Charity: "દાન",
    Awareness: "જાગૃતિ",
    Other: "અન્ય",
  },
};

const translations: Record<
  Locale,
  {
    activityTitle: string;
    activityTitleRequired: string;
    enterActivityTitle: string;
    category: string;
    categoryRequired: string;
    selectCategory: string;
    description: string;
    describeActivity: string;
    location: string;
    enterLocation: string;
    activityDate: string;
    image: string;
    status: string;
    published: string;
    draft: string;
    archived: string;
    cancel: string;
    saving: string;
    updateActivity: string;
    createActivity: string;
    failedSave: string;
    somethingWrong: string;
  }
> = {
  en: {
    activityTitle: "Activity Title",
    activityTitleRequired:
      "Activity title is required.",
    enterActivityTitle:
      "Enter activity title",
    category: "Category",
    categoryRequired:
      "Please select a category.",
    selectCategory:
      "Select activity category",
    description: "Description",
    describeActivity:
      "Describe the community activity...",
    location: "Location",
    enterLocation:
      "Enter activity location",
    activityDate: "Activity Date",
    image: "Activity Image",
    status: "Status",
    published: "Published",
    draft: "Draft",
    archived: "Archived",
    cancel: "Cancel",
    saving: "Saving...",
    updateActivity: "Update Activity",
    createActivity: "Create Activity",
    failedSave:
      "Failed to save activity.",
    somethingWrong:
      "Something went wrong.",
  },

  hi: {
    activityTitle: "गतिविधि का शीर्षक",
    activityTitleRequired:
      "गतिविधि का शीर्षक आवश्यक है।",
    enterActivityTitle:
      "गतिविधि का शीर्षक दर्ज करें",
    category: "श्रेणी",
    categoryRequired:
      "कृपया एक श्रेणी चुनें।",
    selectCategory:
      "गतिविधि की श्रेणी चुनें",
    description: "विवरण",
    describeActivity:
      "सामुदायिक गतिविधि का विवरण दें...",
    location: "स्थान",
    enterLocation:
      "गतिविधि का स्थान दर्ज करें",
    activityDate: "गतिविधि की तिथि",
    image: "गतिविधि की छवि",
    status: "स्थिति",
    published: "प्रकाशित",
    draft: "ड्राफ्ट",
    archived: "संग्रहीत",
    cancel: "रद्द करें",
    saving: "सहेजा जा रहा है...",
    updateActivity: "गतिविधि अपडेट करें",
    createActivity: "गतिविधि बनाएँ",
    failedSave:
      "गतिविधि सहेजी नहीं जा सकी।",
    somethingWrong:
      "कुछ गलत हो गया।",
  },

  gu: {
    activityTitle: "પ્રવૃત્તિનું શીર્ષક",
    activityTitleRequired:
      "પ્રવૃત્તિનું શીર્ષક જરૂરી છે.",
    enterActivityTitle:
      "પ્રવૃત્તિનું શીર્ષક દાખલ કરો",
    category: "શ્રેણી",
    categoryRequired:
      "કૃપા કરીને શ્રેણી પસંદ કરો.",
    selectCategory:
      "પ્રવૃત્તિની શ્રેણી પસંદ કરો",
    description: "વર્ણન",
    describeActivity:
      "સામુદાયિક પ્રવૃત્તિનું વર્ણન કરો...",
    location: "સ્થળ",
    enterLocation:
      "પ્રવૃત્તિનું સ્થળ દાખલ કરો",
    activityDate: "પ્રવૃત્તિની તારીખ",
    image: "પ્રવૃત્તિની છબી",
    status: "સ્થિતિ",
    published: "પ્રકાશિત",
    draft: "ડ્રાફ્ટ",
    archived: "આર્કાઇવ કરેલ",
    cancel: "રદ કરો",
    saving: "સાચવી રહ્યા છીએ...",
    updateActivity: "પ્રવૃત્તિ અપડેટ કરો",
    createActivity: "પ્રવૃત્તિ બનાવો",
    failedSave:
      "પ્રવૃત્તિ સાચવી શકાઈ નથી.",
    somethingWrong:
      "કંઈક ખોટું થયું.",
  },
};

export default function ActivityForm({
  activity,
}: {
  activity?: Activity;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const firstSegment = pathname.split("/")[1];

  const locale: Locale =
    firstSegment === "hi" ||
    firstSegment === "gu"
      ? firstSegment
      : "en";

  const t = translations[locale];
  const categoryText =
    categoryTranslations[locale];

  const isEdit = !!activity?.id;

  const [title, setTitle] = useState(
    activity?.title || ""
  );

  const [description, setDescription] =
    useState(
      activity?.description || ""
    );

  const [category, setCategory] =
    useState(
      activity?.category || ""
    );

  const [location, setLocation] =
    useState(
      activity?.location || ""
    );

  const [activityDate, setActivityDate] =
    useState(
      activity?.activityDate
        ? activity.activityDate.substring(0, 10)
        : ""
    );

  const [image, setImage] = useState(
    activity?.image || ""
  );

  const [status, setStatus] = useState<
    "DRAFT" | "PUBLISHED" | "ARCHIVED"
  >(
    activity?.status || "PUBLISHED"
  );

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");

    if (!title.trim()) {
      setError(
        t.activityTitleRequired
      );
      return;
    }

    if (!category) {
      setError(
        t.categoryRequired
      );
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title: title.trim(),
        description:
          description.trim() || null,
        category,
        location:
          location.trim() || null,
        activityDate:
          activityDate || null,
        image:
          image.trim() || null,
        status,
      };

      const response = await fetch(
        isEdit
          ? `/api/admin/activities/${activity.id}`
          : "/api/admin/activities",
        {
          method: isEdit
            ? "PATCH"
            : "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            t.failedSave
        );
      }

      router.push(
        `/${locale}/admin/activities`
      );

      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : t.somethingWrong
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClass = `
    w-full
    rounded-xl
    border
    border-red-200/80
    bg-white/80
    px-4
    py-3
    text-sm
    text-gray-900
    outline-none
    transition-all
    duration-200
    placeholder:text-gray-400
    focus:border-red-500
    focus:bg-white
    focus:ring-4
    focus:ring-red-500/10
    dark:border-red-300/20
    dark:bg-[#4f0d17]/80
    dark:text-white
    dark:placeholder:text-red-100/45
    dark:focus:border-red-300
    dark:focus:bg-[#5b101c]
    dark:focus:ring-red-300/10
  `;

  const labelClass = `
    mb-2
    block
    text-sm
    font-semibold
    text-red-950
    dark:text-red-50
  `;

  return (
    <form
      onSubmit={handleSubmit}
      className="
        overflow-hidden
        rounded-2xl
        border
        border-red-200/80
        bg-gradient-to-br
        from-[#fff0f2]
        via-[#ffe4e9]
        to-[#ffd6df]
        p-5
        shadow-lg
        shadow-red-900/10
        transition-all
        duration-300
        dark:border-red-300/20
        dark:from-[#68131f]
        dark:via-[#570e18]
        dark:to-[#410810]
        md:p-7
      "
    >
      {/* ERROR */}
      {error && (
        <div
          className="
            mb-6
            rounded-xl
            border
            border-red-300
            bg-red-50
            px-4
            py-3
            text-sm
            font-medium
            text-red-700
            dark:border-red-300/30
            dark:bg-red-950/40
            dark:text-red-200
          "
        >
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* TITLE + CATEGORY */}
        <div
          className="
            rounded-2xl
            border
            border-red-200/70
            bg-white/50
            p-5
            dark:border-red-300/15
            dark:bg-[#4b0b15]/45
          "
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* TITLE */}
            <div>
              <label
                className={labelClass}
              >
                {t.activityTitle}
                <span className="ml-1 text-red-600 dark:text-red-300">
                  *
                </span>
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder={
                  t.enterActivityTitle
                }
                className={inputClass}
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label
                className={labelClass}
              >
                {t.category}
                <span className="ml-1 text-red-600 dark:text-red-300">
                  *
                </span>
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }
                className={inputClass}
              >
                <option value="">
                  {t.selectCategory}
                </option>

                {categories.map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {
                        categoryText[
                          item
                        ]
                      }
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div
          className="
            rounded-2xl
            border
            border-red-200/70
            bg-white/50
            p-5
            dark:border-red-300/15
            dark:bg-[#4b0b15]/45
          "
        >
          <label
            className={labelClass}
          >
            {t.description}
          </label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            placeholder={
              t.describeActivity
            }
            rows={6}
            className={`${inputClass} resize-y`}
          />
        </div>

        {/* LOCATION + DATE */}
        <div
          className="
            rounded-2xl
            border
            border-red-200/70
            bg-white/50
            p-5
            dark:border-red-300/15
            dark:bg-[#4b0b15]/45
          "
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* LOCATION */}
            <div>
              <label
                className={labelClass}
              >
                {t.location}
              </label>

              <input
                type="text"
                value={location}
                onChange={(e) =>
                  setLocation(
                    e.target.value
                  )
                }
                placeholder={
                  t.enterLocation
                }
                className={inputClass}
              />
            </div>

            {/* DATE */}
            <div>
              <label
                className={labelClass}
              >
                {t.activityDate}
              </label>

              <input
                type="date"
                value={activityDate}
                onChange={(e) =>
                  setActivityDate(
                    e.target.value
                  )
                }
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* IMAGE */}
        <div
          className="
            rounded-2xl
            border
            border-red-200/70
            bg-white/50
            p-5
            dark:border-red-300/15
            dark:bg-[#4b0b15]/45
          "
        >
          <ImageInput
            locale={locale}
            value={image}
            onChange={setImage}
            label={t.image}
            maxSizeMB={5}
          />

          {image && (
            <div
              className="
                mt-5
                overflow-hidden
                rounded-2xl
                border
                border-red-200/70
                bg-white/60
                p-3
                dark:border-red-300/15
                dark:bg-[#3d0811]/70
              "
            >
              <p
                className="
                  mb-3
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-red-900/60
                  dark:text-red-100/60
                "
              >
                Image Preview
              </p>

              <div className="overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt={
                    title ||
                    "Activity image"
                  }
                  className="
                    h-56
                    w-full
                    object-cover
                    transition-transform
                    duration-300
                    hover:scale-[1.02]
                  "
                />
              </div>
            </div>
          )}
        </div>

        {/* STATUS */}
        <div
          className="
            rounded-2xl
            border
            border-red-200/70
            bg-white/50
            p-5
            dark:border-red-300/15
            dark:bg-[#4b0b15]/45
          "
        >
          <label
            className={labelClass}
          >
            {t.status}
          </label>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {/* PUBLISHED */}
            <button
              type="button"
              onClick={() =>
                setStatus("PUBLISHED")
              }
              className={`
                rounded-xl
                border
                px-4
                py-3
                text-sm
                font-semibold
                transition-all
                duration-200
                ${
                  status === "PUBLISHED"
                    ? `
                      border-green-500
                      bg-green-50
                      text-green-700
                      shadow-sm
                      dark:border-green-400
                      dark:bg-green-500/15
                      dark:text-green-300
                    `
                    : `
                      border-red-200/80
                      bg-white/70
                      text-red-900/70
                      hover:border-green-400
                      hover:bg-green-50
                      dark:border-red-300/15
                      dark:bg-[#4f0d17]
                      dark:text-red-100/75
                      dark:hover:border-green-400/50
                      dark:hover:bg-green-500/10
                    `
                }
              `}
            >
              {t.published}
            </button>

            {/* DRAFT */}
            <button
              type="button"
              onClick={() =>
                setStatus("DRAFT")
              }
              className={`
                rounded-xl
                border
                px-4
                py-3
                text-sm
                font-semibold
                transition-all
                duration-200
                ${
                  status === "DRAFT"
                    ? `
                      border-yellow-500
                      bg-yellow-50
                      text-yellow-700
                      shadow-sm
                      dark:border-yellow-400
                      dark:bg-yellow-500/15
                      dark:text-yellow-300
                    `
                    : `
                      border-red-200/80
                      bg-white/70
                      text-red-900/70
                      hover:border-yellow-400
                      hover:bg-yellow-50
                      dark:border-red-300/15
                      dark:bg-[#4f0d17]
                      dark:text-red-100/75
                      dark:hover:border-yellow-400/50
                      dark:hover:bg-yellow-500/10
                    `
                }
              `}
            >
              {t.draft}
            </button>

            {/* ARCHIVED */}
            <button
              type="button"
              onClick={() =>
                setStatus("ARCHIVED")
              }
              className={`
                rounded-xl
                border
                px-4
                py-3
                text-sm
                font-semibold
                transition-all
                duration-200
                ${
                  status === "ARCHIVED"
                    ? `
                      border-gray-500
                      bg-gray-100
                      text-gray-700
                      shadow-sm
                      dark:border-gray-400
                      dark:bg-gray-500/15
                      dark:text-gray-300
                    `
                    : `
                      border-red-200/80
                      bg-white/70
                      text-red-900/70
                      hover:border-gray-400
                      hover:bg-gray-100
                      dark:border-red-300/15
                      dark:bg-[#4f0d17]
                      dark:text-red-100/75
                      dark:hover:border-gray-400/50
                      dark:hover:bg-gray-500/10
                    `
                }
              `}
            >
              {t.archived}
            </button>
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div
        className="
          mt-8
          flex
          flex-col-reverse
          gap-3
          border-t
          border-red-200/70
          pt-6
          sm:flex-row
          sm:justify-end
          dark:border-red-300/15
        "
      >
        <button
          type="button"
          onClick={() =>
            router.push(
              `/${locale}/admin/activities`
            )
          }
          disabled={loading}
          className="
            rounded-xl
            border
            border-red-200
            bg-white/80
            px-6
            py-3
            text-sm
            font-semibold
            text-red-900
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:bg-white
            hover:shadow-sm
            disabled:cursor-not-allowed
            disabled:opacity-50
            dark:border-red-300/20
            dark:bg-[#4f0d17]
            dark:text-red-100
            dark:hover:bg-[#64131f]
          "
        >
          {t.cancel}
        </button>

        <button
          type="submit"
          disabled={loading}
          className="
            rounded-xl
            bg-gradient-to-r
            from-red-800
            to-red-600
            px-7
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
            disabled:cursor-not-allowed
            disabled:opacity-50
            dark:from-red-700
            dark:to-red-500
            dark:hover:from-red-600
            dark:hover:to-red-400
          "
        >
          {loading
            ? t.saving
            : isEdit
              ? t.updateActivity
              : t.createActivity}
        </button>
      </div>
    </form>
  );
}