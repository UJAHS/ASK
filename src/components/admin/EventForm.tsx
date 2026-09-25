"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Locale = "en" | "hi" | "gu";

type Props = {
  locale: string;
  eventId?: string;
  initialData?: any;
};

const languageLabels: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
  gu: "ગુજરાતી",
};

const labels: Record<
  Locale,
  {
    eventDetails: string;
    slug: string;
    status: string;
    draft: string;
    published: string;
    archived: string;
    eventDate: string;
    coverImage: string;
    startTime: string;
    endTime: string;
    eventContent: string;
    selectedLanguage: string;
    title: string;
    location: string;
    description: string;
    cancel: string;
    saveEvent: string;
    updateEvent: string;
    saving: string;
    eventTitlePlaceholder: string;
    eventLocationPlaceholder: string;
    eventDescriptionPlaceholder: string;
    slugPlaceholder: string;
    imagePlaceholder: string;
    requiredTitle: string;
  }
> = {
  en: {
    eventDetails: "Event Details",
    slug: "Slug",
    status: "Status",
    draft: "Draft",
    published: "Published",
    archived: "Archived",
    eventDate: "Event Date",
    coverImage: "Cover Image URL",
    startTime: "Start Time",
    endTime: "End Time",
    eventContent: "Event Content",
    selectedLanguage:
      "Enter content in the selected language.",
    title: "Title",
    location: "Location",
    description: "Description",
    cancel: "Cancel",
    saveEvent: "Save Event",
    updateEvent: "Update Event",
    saving: "Saving...",
    eventTitlePlaceholder: "Event title",
    eventLocationPlaceholder: "Event location",
    eventDescriptionPlaceholder:
      "Event description",
    slugPlaceholder: "navratri-garba-event",
    imagePlaceholder: "https://...",
    requiredTitle:
      "English title is required",
  },

  hi: {
    eventDetails: "कार्यक्रम विवरण",
    slug: "स्लग",
    status: "स्थिति",
    draft: "ड्राफ्ट",
    published: "प्रकाशित",
    archived: "संग्रहीत",
    eventDate: "कार्यक्रम की तारीख",
    coverImage: "कवर इमेज URL",
    startTime: "प्रारंभ समय",
    endTime: "समाप्ति समय",
    eventContent: "कार्यक्रम सामग्री",
    selectedLanguage:
      "चयनित भाषा में सामग्री दर्ज करें।",
    title: "शीर्षक",
    location: "स्थान",
    description: "विवरण",
    cancel: "रद्द करें",
    saveEvent: "कार्यक्रम सहेजें",
    updateEvent: "कार्यक्रम अपडेट करें",
    saving: "सहेजा जा रहा है...",
    eventTitlePlaceholder:
      "कार्यक्रम का शीर्षक",
    eventLocationPlaceholder:
      "कार्यक्रम का स्थान",
    eventDescriptionPlaceholder:
      "कार्यक्रम का विवरण",
    slugPlaceholder: "navratri-garba-event",
    imagePlaceholder: "https://...",
    requiredTitle:
      "हिंदी शीर्षक आवश्यक है",
  },

  gu: {
    eventDetails: "કાર્યક્રમની વિગતો",
    slug: "સ્લગ",
    status: "સ્થિતિ",
    draft: "ડ્રાફ્ટ",
    published: "પ્રકાશિત",
    archived: "આર્કાઇવ કરેલ",
    eventDate: "કાર્યક્રમની તારીખ",
    coverImage: "કવર ઇમેજ URL",
    startTime: "શરૂઆતનો સમય",
    endTime: "સમાપ્તિનો સમય",
    eventContent: "કાર્યક્રમની સામગ્રી",
    selectedLanguage:
      "પસંદ કરેલી ભાષામાં સામગ્રી દાખલ કરો.",
    title: "શીર્ષક",
    location: "સ્થળ",
    description: "વર્ણન",
    cancel: "રદ કરો",
    saveEvent: "કાર્યક્રમ સાચવો",
    updateEvent: "કાર્યક્રમ અપડેટ કરો",
    saving: "સાચવી રહ્યા છીએ...",
    eventTitlePlaceholder:
      "કાર્યક્રમનું શીર્ષક",
    eventLocationPlaceholder:
      "કાર્યક્રમનું સ્થળ",
    eventDescriptionPlaceholder:
      "કાર્યક્રમનું વર્ણન",
    slugPlaceholder: "navratri-garba-event",
    imagePlaceholder: "https://...",
    requiredTitle:
      "ગુજરાતી શીર્ષક જરૂરી છે",
  },
};

function getValidLocale(value: string): Locale {
  if (value === "hi") return "hi";
  if (value === "gu") return "gu";
  return "en";
}

export function EventForm({
  locale,
  eventId,
  initialData,
}: Props) {
  const router = useRouter();

  const selectedLocale = getValidLocale(locale);

  const text = labels[selectedLocale];

  const selectedTranslation =
    initialData?.translations?.find(
      (item: any) =>
        item.locale === selectedLocale,
    );

  const [eventDate, setEventDate] = useState(
    initialData?.eventDate
      ? new Date(initialData.eventDate)
          .toISOString()
          .split("T")[0]
      : "",
  );

  const [startTime, setStartTime] = useState(
    initialData?.startTime || "",
  );

  const [endTime, setEndTime] = useState(
    initialData?.endTime || "",
  );

  const [image, setImage] = useState(
    initialData?.image || "",
  );

  const [status, setStatus] = useState(
    initialData?.status || "DRAFT",
  );

  const [slug, setSlug] = useState(
    initialData?.slug || "",
  );

  const [title, setTitle] = useState(
    selectedTranslation?.title || "",
  );

  const [description, setDescription] =
    useState(
      selectedTranslation?.description || "",
    );

  const [location, setLocation] =
    useState(
      selectedTranslation?.location || "",
    );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();

    setSaving(true);
    setError("");

    try {
      if (!title.trim()) {
        throw new Error(text.requiredTitle);
      }

      const translations = {
        [selectedLocale]: {
          title: title.trim(),
          description: description.trim(),
          location: location.trim(),
        },
      };

      const response = await fetch(
        eventId
          ? "/api/admin/events/" + eventId
          : "/api/admin/events",
        {
          method: eventId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            slug,
            eventDate,
            startTime,
            endTime,
            image,
            status,
            locale: selectedLocale,
            translations,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to save event",
        );
      }

      router.push(
        "/" +
          selectedLocale +
          "/admin/events",
      );

      router.refresh();
    } catch (err: any) {
      setError(
        err.message ||
          "Unable to save event",
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
      {/* ERROR */}
      {error && (
        <div
          className="
            rounded-xl
            border
            border-red-300
            bg-red-100
            px-5
            py-4
            text-sm
            font-medium
            text-red-800
            shadow-sm
            dark:border-red-400/30
            dark:bg-red-950/50
            dark:text-red-200
          "
        >
          {error}
        </div>
      )}

      {/* EVENT DETAILS */}
      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          border-red-200/80
          bg-gradient-to-br
          from-[#fff0f2]
          via-[#ffe4e9]
          to-[#ffd6df]
          p-6
          shadow-lg
          shadow-red-900/10
          dark:border-red-300/20
          dark:from-[#68131f]
          dark:via-[#570e18]
          dark:to-[#410810]
          sm:p-7
        "
      >
        <div className="mb-6">
          <h2
            className="
              text-xl
              font-bold
              text-red-950
              dark:text-white
            "
          >
            {text.eventDetails}
          </h2>

          <div
            className="
              mt-2
              h-1
              w-14
              rounded-full
              bg-gradient-to-r
              from-red-600
              to-pink-500
              dark:from-red-400
              dark:to-pink-400
            "
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* SLUG */}
          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-red-950
                dark:text-red-50
              "
            >
              {text.slug}
              <span className="ml-1 text-red-600 dark:text-red-400">
                *
              </span>
            </label>

            <input
              value={slug}
              onChange={(e) =>
                setSlug(
                  e.target.value
                    .toLowerCase()
                    .replace(/\s+/g, "-"),
                )
              }
              required
              className="
                w-full
                rounded-xl
                border
                border-red-200
                bg-[#fff7f8]
                px-4
                py-3
                text-red-950
                outline-none
                transition
                placeholder:text-red-900/35
                focus:border-red-500
                focus:ring-2
                focus:ring-red-500/15
                dark:border-red-300/25
                dark:bg-[#4a0b15]
                dark:text-white
                dark:placeholder:text-red-100/35
                dark:focus:border-red-400
                dark:focus:ring-red-400/15
              "
              placeholder={text.slugPlaceholder}
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
                text-red-950
                dark:text-red-50
              "
            >
              {text.status}
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="
                w-full
                rounded-xl
                border
                border-red-200
                bg-[#fff7f8]
                px-4
                py-3
                text-red-950
                outline-none
                transition
                focus:border-red-500
                focus:ring-2
                focus:ring-red-500/15
                dark:border-red-300/25
                dark:bg-[#4a0b15]
                dark:text-white
                dark:focus:border-red-400
                dark:focus:ring-red-400/15
              "
            >
              <option value="DRAFT">
                {text.draft}
              </option>

              <option value="PUBLISHED">
                {text.published}
              </option>

              <option value="ARCHIVED">
                {text.archived}
              </option>
            </select>
          </div>

          {/* EVENT DATE */}
          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-red-950
                dark:text-red-50
              "
            >
              {text.eventDate}
              <span className="ml-1 text-red-600 dark:text-red-400">
                *
              </span>
            </label>

            <input
              type="date"
              value={eventDate}
              onChange={(e) =>
                setEventDate(e.target.value)
              }
              required
              className="
                w-full
                rounded-xl
                border
                border-red-200
                bg-[#fff7f8]
                px-4
                py-3
                text-red-950
                outline-none
                transition
                focus:border-red-500
                focus:ring-2
                focus:ring-red-500/15
                dark:border-red-300/25
                dark:bg-[#4a0b15]
                dark:text-white
                dark:focus:border-red-400
                dark:focus:ring-red-400/15
              "
            />
          </div>

          {/* COVER IMAGE URL */}
          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-red-950
                dark:text-red-50
              "
            >
              {text.coverImage}
            </label>

            <input
              type="url"
              value={image}
              onChange={(e) =>
                setImage(e.target.value)
              }
              className="
                w-full
                rounded-xl
                border
                border-red-200
                bg-[#fff7f8]
                px-4
                py-3
                text-red-950
                outline-none
                transition
                placeholder:text-red-900/35
                focus:border-red-500
                focus:ring-2
                focus:ring-red-500/15
                dark:border-red-300/25
                dark:bg-[#4a0b15]
                dark:text-white
                dark:placeholder:text-red-100/35
                dark:focus:border-red-400
                dark:focus:ring-red-400/15
              "
              placeholder={text.imagePlaceholder}
            />

            {image && (
              <div
                className="
                  mt-3
                  overflow-hidden
                  rounded-xl
                  border
                  border-red-200
                  bg-[#fff0f2]
                  dark:border-red-300/20
                  dark:bg-[#3f0710]
                "
              >
                <img
                  src={image}
                  alt="Event cover preview"
                  className="
                    h-40
                    w-full
                    object-cover
                  "
                  onError={(e) => {
                    e.currentTarget.style.display =
                      "none";
                  }}
                />
              </div>
            )}
          </div>

          {/* START TIME */}
          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-red-950
                dark:text-red-50
              "
            >
              {text.startTime}
            </label>

            <input
              type="time"
              value={startTime}
              onChange={(e) =>
                setStartTime(e.target.value)
              }
              className="
                w-full
                rounded-xl
                border
                border-red-200
                bg-[#fff7f8]
                px-4
                py-3
                text-red-950
                outline-none
                transition
                focus:border-red-500
                focus:ring-2
                focus:ring-red-500/15
                dark:border-red-300/25
                dark:bg-[#4a0b15]
                dark:text-white
                dark:focus:border-red-400
                dark:focus:ring-red-400/15
              "
            />
          </div>

          {/* END TIME */}
          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-red-950
                dark:text-red-50
              "
            >
              {text.endTime}
            </label>

            <input
              type="time"
              value={endTime}
              onChange={(e) =>
                setEndTime(e.target.value)
              }
              className="
                w-full
                rounded-xl
                border
                border-red-200
                bg-[#fff7f8]
                px-4
                py-3
                text-red-950
                outline-none
                transition
                focus:border-red-500
                focus:ring-2
                focus:ring-red-500/15
                dark:border-red-300/25
                dark:bg-[#4a0b15]
                dark:text-white
                dark:focus:border-red-400
                dark:focus:ring-red-400/15
              "
            />
          </div>
        </div>
      </section>

      {/* EVENT CONTENT */}
      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          border-red-200/80
          bg-gradient-to-br
          from-[#fff0f2]
          via-[#ffe4e9]
          to-[#ffd6df]
          p-6
          shadow-lg
          shadow-red-900/10
          dark:border-red-300/20
          dark:from-[#68131f]
          dark:via-[#570e18]
          dark:to-[#410810]
          sm:p-7
        "
      >
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2
              className="
                text-xl
                font-bold
                text-red-950
                dark:text-white
              "
            >
              {text.eventContent}
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-red-900/65
                dark:text-red-100/65
              "
            >
              {text.selectedLanguage}
            </p>
          </div>

          <div
            className="
              w-fit
              rounded-xl
              border
              border-red-200
              bg-[#ffe0e5]
              px-4
              py-2
              text-sm
              font-bold
              text-red-700
              dark:border-red-300/20
              dark:bg-[#4f0a15]
              dark:text-red-200
            "
          >
            {languageLabels[selectedLocale]}
          </div>
        </div>

        {/* LANGUAGE CONTENT */}
        <div
          className="
            rounded-2xl
            border
            border-red-200/80
            bg-[#ffe8ec]
            p-5
            dark:border-red-300/20
            dark:bg-[#4a0b15]
          "
        >
          <div
            className="
              mb-6
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                h-9
                w-1
                rounded-full
                bg-gradient-to-b
                from-red-600
                to-pink-500
                dark:from-red-400
                dark:to-pink-400
              "
            />

            <h3
              className="
                text-lg
                font-bold
                text-red-950
                dark:text-white
              "
            >
              {languageLabels[selectedLocale]}
            </h3>
          </div>

          <div className="space-y-5">
            {/* TITLE */}
            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-red-950
                  dark:text-red-50
                "
              >
                {text.title}
                <span className="ml-1 text-red-600 dark:text-red-400">
                  *
                </span>
              </label>

              <input
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                required
                className="
                  w-full
                  rounded-xl
                  border
                  border-red-200
                  bg-[#fff7f8]
                  px-4
                  py-3
                  text-red-950
                  outline-none
                  transition
                  placeholder:text-red-900/35
                  focus:border-red-500
                  focus:ring-2
                  focus:ring-red-500/15
                  dark:border-red-300/25
                  dark:bg-[#3f0710]
                  dark:text-white
                  dark:placeholder:text-red-100/35
                  dark:focus:border-red-400
                  dark:focus:ring-red-400/15
                "
                placeholder={
                  text.eventTitlePlaceholder
                }
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
                  text-red-950
                  dark:text-red-50
                "
              >
                {text.location}
              </label>

              <input
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-red-200
                  bg-[#fff7f8]
                  px-4
                  py-3
                  text-red-950
                  outline-none
                  transition
                  placeholder:text-red-900/35
                  focus:border-red-500
                  focus:ring-2
                  focus:ring-red-500/15
                  dark:border-red-300/25
                  dark:bg-[#3f0710]
                  dark:text-white
                  dark:placeholder:text-red-100/35
                  dark:focus:border-red-400
                  dark:focus:ring-red-400/15
                "
                placeholder={
                  text.eventLocationPlaceholder
                }
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-red-950
                  dark:text-red-50
                "
              >
                {text.description}
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                rows={7}
                className="
                  w-full
                  resize-y
                  rounded-xl
                  border
                  border-red-200
                  bg-[#fff7f8]
                  px-4
                  py-3
                  text-red-950
                  outline-none
                  transition
                  placeholder:text-red-900/35
                  focus:border-red-500
                  focus:ring-2
                  focus:ring-red-500/15
                  dark:border-red-300/25
                  dark:bg-[#3f0710]
                  dark:text-white
                  dark:placeholder:text-red-100/35
                  dark:focus:border-red-400
                  dark:focus:ring-red-400/15
                "
                placeholder={
                  text.eventDescriptionPlaceholder
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* ACTIONS */}
      <div
        className="
          flex
          flex-col-reverse
          gap-3
          border-t
          border-red-200/70
          pt-5
          sm:flex-row
          sm:justify-end
          dark:border-red-300/15
        "
      >
        <button
          type="button"
          onClick={() =>
            router.push(
              "/" +
                selectedLocale +
                "/admin/events",
            )
          }
          className="
            rounded-xl
            border
            border-red-300
            bg-[#ffe5e9]
            px-6
            py-3
            text-sm
            font-semibold
            text-red-800
            transition
            hover:bg-[#ffd4dc]
            dark:border-red-300/25
            dark:bg-[#4f0a15]
            dark:text-red-100
            dark:hover:bg-[#64101c]
          "
        >
          {text.cancel}
        </button>

        <button
          type="submit"
          disabled={saving}
          className="
            rounded-xl
            bg-gradient-to-r
            from-red-700
            to-red-600
            px-7
            py-3
            text-sm
            font-bold
            text-white
            shadow-lg
            shadow-red-900/20
            transition
            hover:from-red-800
            hover:to-red-700
            disabled:cursor-not-allowed
            disabled:opacity-50
            dark:from-red-600
            dark:to-red-500
            dark:hover:from-red-500
            dark:hover:to-red-400
          "
        >
          {saving
            ? text.saving
            : eventId
              ? text.updateEvent
              : text.saveEvent}
        </button>
      </div>
    </form>
  );
}