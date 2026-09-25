"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type Activity = {
  id: string;
  title: string;
  category: string | null;
  location: string | null;
  activityDate: string | null;
  status: string;
};

type Locale = "en" | "hi" | "gu";

const translations: Record<
  Locale,
  {
    searchPlaceholder: string;
    activity: string;
    category: string;
    location: string;
    date: string;
    status: string;
    actions: string;
    noActivitiesYet: string;
    noActivitiesFound: string;
    createFirstActivity: string;
    tryDifferentSearch: string;
    addActivity: string;
    edit: string;
    delete: string;
    deleting: string;
    notSet: string;
    confirmDelete: string;
    unableDelete: string;
    published: string;
    draft: string;
    archived: string;
    showing: string;
  }
> = {
  en: {
    searchPlaceholder: "Search activities...",
    activity: "Activity",
    category: "Category",
    location: "Location",
    date: "Date",
    status: "Status",
    actions: "Actions",
    noActivitiesYet: "No Activities Yet",
    noActivitiesFound: "No Activities Found",
    createFirstActivity:
      "Create your first community activity.",
    tryDifferentSearch:
      "Try a different search term.",
    addActivity: "+ Add Activity",
    edit: "Edit",
    delete: "Delete",
    deleting: "Deleting...",
    notSet: "Not set",
    confirmDelete:
      "Are you sure you want to delete this activity?",
    unableDelete:
      "Unable to delete activity.",
    published: "Published",
    draft: "Draft",
    archived: "Archived",
    showing: "Showing",
  },

  hi: {
    searchPlaceholder: "गतिविधियाँ खोजें...",
    activity: "गतिविधि",
    category: "श्रेणी",
    location: "स्थान",
    date: "तिथि",
    status: "स्थिति",
    actions: "कार्यवाही",
    noActivitiesYet: "अभी कोई गतिविधि नहीं है",
    noActivitiesFound: "कोई गतिविधि नहीं मिली",
    createFirstActivity:
      "अपनी पहली सामुदायिक गतिविधि बनाएँ।",
    tryDifferentSearch:
      "कोई दूसरा खोज शब्द आज़माएँ।",
    addActivity: "+ गतिविधि जोड़ें",
    edit: "संपादित करें",
    delete: "हटाएँ",
    deleting: "हटाया जा रहा है...",
    notSet: "निर्धारित नहीं",
    confirmDelete:
      "क्या आप इस गतिविधि को हटाना चाहते हैं?",
    unableDelete:
      "गतिविधि हटाई नहीं जा सकी।",
    published: "प्रकाशित",
    draft: "ड्राफ्ट",
    archived: "संग्रहीत",
    showing: "दिखाया जा रहा है",
  },

  gu: {
    searchPlaceholder: "પ્રવૃત્તિઓ શોધો...",
    activity: "પ્રવૃત્તિ",
    category: "શ્રેણી",
    location: "સ્થળ",
    date: "તારીખ",
    status: "સ્થિતિ",
    actions: "ક્રિયાઓ",
    noActivitiesYet: "હજુ સુધી કોઈ પ્રવૃત્તિ નથી",
    noActivitiesFound: "કોઈ પ્રવૃત્તિ મળી નથી",
    createFirstActivity:
      "તમારી પ્રથમ સામુદાયિક પ્રવૃત્તિ બનાવો.",
    tryDifferentSearch:
      "બીજો શોધ શબ્દ અજમાવો.",
    addActivity: "+ પ્રવૃત્તિ ઉમેરો",
    edit: "ફેરફાર કરો",
    delete: "કાઢી નાખો",
    deleting: "કાઢી રહ્યા છીએ...",
    notSet: "નક્કી કરેલ નથી",
    confirmDelete:
      "શું તમે આ પ્રવૃત્તિને કાઢી નાખવા માંગો છો?",
    unableDelete:
      "પ્રવૃત્તિ કાઢી શકાઈ નથી.",
    published: "પ્રકાશિત",
    draft: "ડ્રાફ્ટ",
    archived: "આર્કાઇવ કરેલ",
    showing: "બતાવી રહ્યા છીએ",
  },
};

export default function ActivitiesTable({
  activities,
}: {
  activities: Activity[];
}) {
  const router = useRouter();
  const pathname = usePathname();

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

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const filteredActivities =
    activities.filter((activity) => {
      const query =
        search.toLowerCase().trim();

      if (!query) {
        return true;
      }

      return (
        activity.title
          .toLowerCase()
          .includes(query) ||
        activity.category
          ?.toLowerCase()
          .includes(query) ||
        activity.location
          ?.toLowerCase()
          .includes(query)
      );
    });

  async function deleteActivity(id: string) {
    const confirmed = window.confirm(
      t.confirmDelete
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    try {
      const response = await fetch(
        `/api/admin/activities/${id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || t.unableDelete
        );
      }

      router.refresh();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : t.unableDelete
      );
    } finally {
      setDeletingId(null);
    }
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
        return "bg-green-100 text-green-700";

      case "DRAFT":
        return "bg-yellow-100 text-yellow-700";

      case "ARCHIVED":
        return "bg-gray-100 text-gray-600";

      default:
        return "bg-gray-100 text-gray-600";
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

      {/* SEARCH */}
      <div className="border-b border-gray-200 p-5">
        <div className="relative max-w-md">
          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder={t.searchPlaceholder}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-red-800 focus:ring-2 focus:ring-red-100"
          />
        </div>
      </div>

      {/* EMPTY */}
      {filteredActivities.length === 0 ? (
        <div className="p-12 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-2xl text-red-800">
            +
          </div>

          <h2 className="mt-5 text-xl font-bold text-gray-900">
            {activities.length === 0
              ? t.noActivitiesYet
              : t.noActivitiesFound}
          </h2>

          <p className="mt-2 text-gray-500">
            {activities.length === 0
              ? t.createFirstActivity
              : t.tryDifferentSearch}
          </p>

          {activities.length === 0 && (
            <a
              href={`/${locale}/admin/activities/new`}
              className="mt-5 inline-flex rounded-lg bg-red-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-900"
            >
              {t.addActivity}
            </a>
          )}

        </div>
      ) : (

        /* TABLE */
        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead className="border-b border-gray-200 bg-gray-50">

              <tr>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {t.activity}
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {t.category}
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {t.location}
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {t.date}
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {t.status}
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {t.actions}
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-gray-100">

              {filteredActivities.map(
                (activity) => {

                  const date =
                    activity.activityDate
                      ? new Date(
                          activity.activityDate
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
                      key={activity.id}
                      className="transition hover:bg-gray-50"
                    >

                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">
                          {activity.title}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {activity.category || "—"}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {activity.location || "—"}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {date}
                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                            activity.status
                          )}`}
                        >
                          {getStatusText(
                            activity.status
                          )}
                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <div className="flex items-center justify-end gap-2">

                          <a
                            href={`/${locale}/admin/activities/${activity.id}/edit`}
                            className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                          >
                            {t.edit}
                          </a>

                          <button
                            type="button"
                            disabled={
                              deletingId ===
                              activity.id
                            }
                            onClick={() =>
                              deleteActivity(
                                activity.id
                              )
                            }
                            className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-50"
                          >
                            {deletingId ===
                            activity.id
                              ? t.deleting
                              : t.delete}
                          </button>

                        </div>

                      </td>

                    </tr>
                  );
                }
              )}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}
