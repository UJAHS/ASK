"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  CheckCircle2,
  XCircle,
  BriefcaseBusiness,
  X,
} from "lucide-react";

type Locale = "en" | "hi" | "gu";

type Translation = {
  id?: string;
  locale: Locale;
  name: string;
};

type Occupation = {
  id: string;
  name: string;
  legacyName?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  translations: Translation[];
};

const UI_LABELS = {
  en: {
    title: "Occupation Master",
    description: "Manage occupations in English, Hindi and Gujarati.",
    add: "Add Occupation",
    total: "Total Occupations",
    active: "Active",
    inactive: "Inactive",
    search: "Search occupations in English, Hindi or Gujarati...",
    english: "English",
    hindi: "Hindi",
    gujarati: "Gujarati",
    status: "Status",
    actions: "Actions",
    noData: "No occupations found.",
    activeStatus: "Active",
    inactiveStatus: "Inactive",
    save: "Save",
    cancel: "Cancel",
  },

  hi: {
    title: "\u0915\u093e\u0930\u094d\u092f \u092e\u093e\u0938\u094d\u091f\u0930",
    description: "\u0905\u0902\u0917\u094d\u0930\u0947\u091c\u093c\u0940, \u0939\u093f\u0902\u0926\u0940 \u0914\u0930 \u0917\u0941\u091c\u0930\u093e\u0924\u0940 \u092e\u0947\u0902 \u0935\u094d\u092f\u0935\u0938\u093e\u092f \u092a\u094d\u0930\u092c\u0902\u0927\u093f\u0924 \u0915\u0930\u0947\u0902\u0964",
    add: "\u0915\u093e\u0930\u094d\u092f \u091c\u094b\u0921\u093c\u0947\u0902",
    total: "\u0915\u0941\u0932 \u0935\u094d\u092f\u0935\u0938\u093e\u092f",
    active: "\u0938\u0915\u094d\u0930\u093f\u092f",
    inactive: "\u0928\u093f\u0937\u094d\u0915\u094d\u0930\u093f\u092f",
    search: "\u0905\u0902\u0917\u094d\u0930\u0947\u091c\u093c\u0940, \u0939\u093f\u0902\u0926\u0940 \u092f\u093e \u0917\u0941\u091c\u0930\u093e\u0924\u0940 \u092e\u0947\u0902 \u0935\u094d\u092f\u0935\u0938\u093e\u092f \u0916\u094b\u091c\u0947\u0902...",
    english: "\u0905\u0902\u0917\u094d\u0930\u0947\u091c\u093c\u0940",
    hindi: "\u0939\u093f\u0902\u0926\u0940",
    gujarati: "\u0917\u0941\u091c\u0930\u093e\u0924\u0940",
    status: "\u0938\u094d\u0925\u093f\u0924\u093f",
    actions: "\u0915\u093e\u0930\u094d\u092f\u0935\u093e\u0908",
    noData: "\u0915\u094b\u0908 \u0935\u094d\u092f\u0935\u0938\u093e\u092f \u0928\u0939\u0940\u0902 \u092e\u093f\u0932\u093e\u0964",
    activeStatus: "\u0938\u0915\u094d\u0930\u093f\u092f",
    inactiveStatus: "\u0928\u093f\u0937\u094d\u0915\u094d\u0930\u093f\u092f",
    save: "\u0938\u0947\u0935 \u0915\u0930\u0947\u0902",
    cancel: "\u0930\u0926\u094d\u0926 \u0915\u0930\u0947\u0902",
  },

  gu: {
    title: "\u0935\u094d\u092f\u0935\u0938\u093e\u092f \u092e\u093e\u0938\u094d\u091f\u0930",
    description: "\u0905\u0902\u0917\u094d\u0930\u0947\u091c\u0940, \u0939\u093f\u0928\u094d\u0926\u0940 \u0905\u0928\u0947 \u0917\u0941\u091c\u0930\u093e\u0924\u0940\u092e\u093e\u0902 \u0935\u094d\u092f\u0935\u0938\u093e\u092f\u094b\u0928\u0941\u0902 \u0936\u093e\u0938\u0928 \u0915\u0930\u094b.",
    add: "\u0935\u094d\u092f\u0935\u0938\u093e\u092f \u0909\u092e\u0947\u0930\u094b",
    total: "\u0915\u0941\u0932 \u0935\u094d\u092f\u0935\u0938\u093e\u092f\u094b",
    active: "\u0938\u0915\u094d\u0930\u093f\u092f",
    inactive: "\u0928\u093f\u0937\u094d\u0915\u094d\u0930\u093f\u092f",
    search: "\u0905\u0902\u0917\u094d\u0930\u0947\u091c\u0940, \u0939\u093f\u0928\u094d\u0926\u0940 \u0915\u0947 \u0917\u0941\u091c\u0930\u093e\u0924\u0940\u092e\u093e\u0902 \u0935\u094d\u092f\u0935\u0938\u093e\u092f \u0936\u094b\u0927\u094b...",
    english: "\u0905\u0902\u0917\u094d\u0930\u0947\u091c\u0940",
    hindi: "\u0939\u093f\u0928\u094d\u0926\u0940",
    gujarati: "\u0917\u0941\u091c\u0930\u093e\u0924\u0940",
    status: "\u0938\u094d\u0925\u093f\u0924\u093f",
    actions: "\u0915\u093e\u0930\u094d\u092f\u0935\u093e\u0939\u0940",
    noData: "\u0915\u094b\u0907 \u0935\u094d\u092f\u0935\u0938\u093e\u092f \u092e\u0933\u094d\u092f\u094b \u0928\u0925\u0940.",
    activeStatus: "\u0938\u0915\u094d\u0930\u093f\u092f",
    inactiveStatus: "\u0928\u093f\u0937\u094d\u0915\u094d\u0930\u093f\u092f",
    save: "\u0938\u0947\u0935 \u0915\u0930\u094b",
    cancel: "\u0930\u0926\u094d\u0926 \u0915\u0930\u094b",
  },
} as const;
const LOCALES: Locale[] = [
  "en",
  "hi",
  "gu",
];

const localeLabels: Record<
  Locale,
  { label: string }
> = {
  en: { label: "English" },
  hi: { label: "\u0939\u093f\u0928\u094d\u0926\u0940" },
  gu: { label: "\u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0aa4\u0ac0" },
};

function getTranslation(
  occupation: Occupation,
  locale: Locale
) {
  return (
    (Array.isArray(occupation?.translations) ? occupation.translations : []).find(
      (translation) =>
        translation.locale === locale
    )?.name ||
    (Array.isArray(occupation?.translations) ? occupation.translations : []).find(
      (translation) =>
        translation.locale === "en"
    )?.name ||
    occupation.name ||
    ""
  );
}

export default function OccupationMasterPage() {
  const params = useParams();

  const localeParam = String(
    params?.locale || "en"
  );

  const currentLocale: Locale =
    LOCALES.includes(
      localeParam as Locale
    )
      ? (localeParam as Locale)
      : "en";

  const [occupations, setOccupations] =
    useState<Occupation[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState<
      "all" | "active" | "inactive"
    >("all");

  const [showModal, setShowModal] =
    useState(false);

  const [editingOccupation, setEditingOccupation] =
    useState<Occupation | null>(null);

  const [form, setForm] = useState<
    Record<Locale, string>
  >({
    en: "",
    hi: "",
    gu: "",
  });

  const [isActive, setIsActive] =
    useState(true);

  const [error, setError] =
    useState("");

  async function loadOccupations() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/admin/occupations?locale=${currentLocale}`,
        {
          cache: "no-store",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to load occupations"
        );
      }

      setOccupations(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load occupations"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOccupations();
  }, [currentLocale]);

  const filteredOccupations =
    useMemo(() => {
      const query = search
        .trim()
        .toLowerCase();

      return occupations.filter(
        (occupation) => {
          const matchesSearch =
            !query ||
            occupation.name
              .toLowerCase()
              .includes(query) ||
            occupation.translations.some(
              (translation) =>
                translation.name
                  .toLowerCase()
                  .includes(query)
            );

          const matchesStatus =
            statusFilter === "all" ||
            (statusFilter ===
              "active" &&
              occupation.isActive) ||
            (statusFilter ===
              "inactive" &&
              !occupation.isActive);

          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );
    }, [
      occupations,
      search,
      statusFilter,
    ]);

  function openAddModal() {
    setEditingOccupation(null);

    setForm({
      en: "",
      hi: "",
      gu: "",
    });

    setIsActive(true);
    setError("");
    setShowModal(true);
  }

  function openEditModal(
    occupation: Occupation
  ) {
    setEditingOccupation(
      occupation
    );

    setForm({
      en: getTranslation(
        occupation,
        "en"
      ),
      hi:
        (Array.isArray(occupation?.translations) ? occupation.translations : []).find(
          (translation) =>
            translation.locale ===
            "hi"
        )?.name || "",
      gu:
        (Array.isArray(occupation?.translations) ? occupation.translations : []).find(
          (translation) =>
            translation.locale ===
            "gu"
        )?.name || "",
    });

    setIsActive(
      occupation.isActive
    );

    setError("");
    setShowModal(true);
  }

  function closeModal() {
    if (saving) return;

    setShowModal(false);
    setEditingOccupation(null);
    setError("");
  }

  async function saveOccupation() {
    if (!form.en.trim()) {
      setError(
        "English occupation name is required."
      );
      return;
    }

    try {
      setSaving(true);
      setError("");

      const translations = {
        en: form.en.trim(),
        hi: form.hi.trim(),
        gu: form.gu.trim(),
      };

      const payload = {
        name: translations.en,
        isActive,
        translations,
      };

      const url =
        editingOccupation
          ? `/api/admin/occupations/${editingOccupation.id}`
          : "/api/admin/occupations";

      const method =
        editingOccupation
          ? "PUT"
          : "POST";

      const response =
        await fetch(url, {
          method,
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
            "Failed to save occupation"
        );
      }

      setShowModal(false);
      setEditingOccupation(null);

      await loadOccupations();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save occupation"
      );
    } finally {
      setSaving(false);
    }
  }

  async function toggleStatus(
    occupation: Occupation
  ) {
    try {
      setError("");

      const translations = {
        en: getTranslation(
          occupation,
          "en"
        ),
        hi:
          (Array.isArray(occupation?.translations) ? occupation.translations : []).find(
            (translation) =>
              translation.locale ===
              "hi"
          )?.name || "",
        gu:
          (Array.isArray(occupation?.translations) ? occupation.translations : []).find(
            (translation) =>
              translation.locale ===
              "gu"
          )?.name || "",
      };

      const response =
        await fetch(
          `/api/admin/occupations/${occupation.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              name: translations.en,
              isActive:
                !occupation.isActive,
              translations,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to update occupation"
        );
      }

      await loadOccupations();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update occupation"
      );
    }
  }

  async function deleteOccupation(
    occupation: Occupation
  ) {
    const confirmed =
      window.confirm(
        `Delete "${getTranslation(
          occupation,
          "en"
        )}"?`
      );

    if (!confirmed) return;

    try {
      setError("");

      const response =
        await fetch(
          `/api/admin/occupations/${occupation.id}`,
          {
            method: "DELETE",
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to delete occupation"
        );
      }

      await loadOccupations();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete occupation"
      );
    }
  }

  const activeCount =
    occupations.filter(
      (occupation) =>
        occupation.isActive
    ).length;

  const inactiveCount =
    occupations.length -
    activeCount;

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-600 to-red-800 text-white shadow-lg">
                <BriefcaseBusiness
                  size={24}
                />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                  Occupation Master
                </h1>

                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Manage occupations in
                  English, Hindi and
                  Gujarati.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={
              openAddModal
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-red-800 px-5 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl"
          >
            <Plus size={19} />
            Add Occupation
          </button>
        </div>

        {error &&
          !showModal && (
            <div className="mb-5 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
              {error}
            </div>
          )}

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-rose-200 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-rose-900/50 dark:bg-[#64131f]/80">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Total Occupations
            </p>

            <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
              {occupations.length}
            </p>
          </div>

          <div className="rounded-2xl border border-green-200 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-green-900/50 dark:bg-[#64131f]/80">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Active
            </p>

            <p className="mt-1 text-3xl font-bold text-green-600 dark:text-green-400">
              {activeCount}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-[#64131f]/80">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Inactive
            </p>

            <p className="mt-1 text-3xl font-bold text-gray-600 dark:text-gray-300">
              {inactiveCount}
            </p>
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-rose-200 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-rose-900/50 dark:bg-[#64131f]/80">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search occupations in English, Hindi or Gujarati..."
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 dark:border-gray-700 dark:bg-[#3b0710] dark:text-white"
              />
            </div>

            <div className="flex rounded-xl border border-gray-300 bg-white p-1 dark:border-gray-700 dark:bg-[#3b0710]">
              {(
                [
                  ["all", "All"],
                  ["active", "Active"],
                  ["inactive", "Inactive"],
                ] as const
              ).map(
                ([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() =>
                      setStatusFilter(
                        value
                      )
                    }
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                      statusFilter ===
                      value
                        ? "bg-gradient-to-r from-rose-600 to-red-700 text-white shadow"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
                    }`}
                  >
                    {label}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-rose-200 bg-white/85 shadow-xl backdrop-blur dark:border-rose-900/50 dark:bg-[#64131f]/90">
          <div className="overflow-x-auto">
            <table className="min-w-[950px] w-full">
              <thead>
  <tr>
    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
      #
    </th>

    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
      {localeParam === "hi"
        ? "\u0905\u0902\u0917\u094d\u0930\u0947\u091c\u093c\u0940"
        : localeParam === "gu"
          ? "\u0905\u0902\u0917\u094d\u0930\u0947\u091c\u0940"
          : "English"}
    </th>

    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
      {localeParam === "hi"
        ? "\u0939\u093f\u0902\u0926\u0940"
        : localeParam === "gu"
          ? "\u0939\u093f\u0928\u094d\u0926\u0940"
          : "Hindi"}
    </th>

    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
      {localeParam === "hi"
        ? "\u0917\u0941\u091c\u0930\u093e\u0924\u0940"
        : localeParam === "gu"
          ? "\u0917\u0941\u091c\u0930\u093e\u0924\u0940"
          : "Gujarati"}
    </th>

    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
      {localeParam === "hi"
        ? "\u0938\u094d\u0925\u093f\u0924\u093f"
        : localeParam === "gu"
          ? "\u0938\u094d\u0925\u093f\u0924\u093f"
          : "Status"}
    </th>

    <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
      {localeParam === "hi"
        ? "\u0915\u093e\u0930\u094d\u092f\u0935\u093e\u0939\u0940"
        : localeParam === "gu"
          ? "\u0915\u093e\u0930\u094d\u092f\u0935\u093e\u0939\u0940"
          : "Actions"}
    </th>
  </tr>
</thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-12 text-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      Loading occupations...
                    </td>
                  </tr>
                ) : filteredOccupations.length ===
                  0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-12 text-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      No occupations found.
                    </td>
                  </tr>
                ) : (
                  filteredOccupations.map(
                    (
                      occupation,
                      index
                    ) => (
                      <tr
                        key={
                          occupation.id
                        }
                        className={`border-b border-gray-100 transition hover:bg-rose-50/50 dark:border-white/5 dark:hover:bg-white/5 ${
                          index % 2 === 1
                            ? "bg-gray-50/40 dark:bg-white/[0.02]"
                            : ""
                        }`}
                      >
                        <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {index + 1}
                        </td>

                        <td className="px-5 py-4 font-semibold text-gray-900 dark:text-white">
                          {getTranslation(
                            occupation,
                            "en"
                          ) || "\u2014"}
                        </td>

                        <td className="px-5 py-4 text-gray-700 dark:text-gray-200">
                          {(Array.isArray(occupation?.translations) ? occupation.translations : []).find(
                            (
                              translation
                            ) =>
                              translation.locale ===
                              "hi"
                          )?.name ||
                            "\u2014"}
                        </td>

                        <td className="px-5 py-4 text-gray-700 dark:text-gray-200">
                          {(Array.isArray(occupation?.translations) ? occupation.translations : []).find(
                            (
                              translation
                            ) =>
                              translation.locale ===
                              "gu"
                          )?.name ||
                            "\u2014"}
                        </td>

                        <td className="px-5 py-4">
                          <button
                            type="button"
                            onClick={() =>
                              toggleStatus(
                                occupation
                              )
                            }
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${
                              occupation.isActive
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                            }`}
                          >
                            {occupation.isActive ? (
                              <CheckCircle2
                                size={
                                  15
                                }
                              />
                            ) : (
                              <XCircle
                                size={
                                  15
                                }
                              />
                            )}

                            {occupation.isActive
                              ? "Active"
                              : "Inactive"}
                          </button>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                openEditModal(
                                  occupation
                                )
                              }
                              className="rounded-lg border border-gray-300 p-2 text-gray-600 transition hover:border-rose-400 hover:bg-rose-50 hover:text-rose-700 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
                              title="Edit"
                            >
                              <Pencil
                                size={
                                  17
                                }
                              />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                deleteOccupation(
                                  occupation
                                )
                              }
                              className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/40"
                              title="Delete"
                            >
                              <Trash2
                                size={
                                  17
                                }
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-rose-200 bg-white shadow-2xl dark:border-rose-900/50 dark:bg-[#3b0710]">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5 dark:border-white/10">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {editingOccupation
                    ? "Edit Occupation"
                    : "Add Occupation"}
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Enter occupation names
                  in all supported
                  languages.
                </p>
              </div>

              <button
                type="button"
                onClick={
                  closeModal
                }
                className="rounded-xl p-2 text-gray-500 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              {error && (
                <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
                  {error}
                </div>
              )}

              {LOCALES.map(
                (item) => (
                  <div key={item}>
                    <label className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {
                        localeLabels[
                          item
                        ].label
                      }

                      {item ===
                        "en" && (
                        <span className="ml-1 text-red-500">
                          *
                        </span>
                      )}
                    </label>

                    <input
                      value={
                        form[item]
                      }
                      onChange={(
                        event
                      ) =>
                        setForm(
                          (
                            previous
                          ) => ({
                            ...previous,
                            [item]:
                              event
                                .target
                                .value,
                          })
                        )
                      }
                      placeholder={`Enter occupation name in ${localeLabels[item].label}`}
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 dark:border-gray-700 dark:bg-[#520b16] dark:text-white"
                    />
                  </div>
                )
              )}

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-white/10 dark:bg-white/5">
                <input
                  type="checkbox"
                  checked={
                    isActive
                  }
                  onChange={(
                    event
                  ) =>
                    setIsActive(
                      event.target
                        .checked
                    )
                  }
                  className="h-5 w-5 accent-rose-600"
                />

                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    Active
                  </div>

                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Make this occupation
                    available for
                    selection.
                  </div>
                </div>
              </label>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-gray-200 px-6 py-5 sm:flex-row sm:justify-end dark:border-white/10">
              <button
                type="button"
                onClick={
                  closeModal
                }
                disabled={
                  saving
                }
                className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-white/10"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  saveOccupation
                }
                disabled={
                  saving
                }
                className="rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-red-800 px-6 py-3 font-semibold text-white shadow-lg transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : editingOccupation
                    ? "Update Occupation"
                    : "Add Occupation"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}






