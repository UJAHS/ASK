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
  Globe2,
  X,
} from "lucide-react";

type Locale = "en" | "hi" | "gu";

type Translation = {
  id?: string;
  locale: Locale;
  name: string;
};

type Country = {
  id: string;
  name: string;
  legacyName?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  translations: Translation[];
};

const LOCALES: Locale[] = ["en", "hi", "gu"];

const localeLabels: Record<
  Locale,
  { short: string; label: string }
> = {
  en: {
    short: "EN",
    label: "English",
  },
  hi: {
    short: "HI",
    label: "हिन्दी",
  },
  gu: {
    short: "GU",
    label: "ગુજરાતી",
  },
};

function getTranslation(
  country: Country,
  locale: Locale
) {
  return (
    country.translations.find(
      (translation) =>
        translation.locale === locale
    )?.name ||
    country.translations.find(
      (translation) =>
        translation.locale === "en"
    )?.name ||
    country.name ||
    ""
  );
}

export default function CountryMasterPage() {
  const params = useParams();

  const localeParam = String(
    params?.locale || "en"
  );

  const currentLocale: Locale =
    LOCALES.includes(localeParam as Locale)
      ? (localeParam as Locale)
      : "en";

  const [countries, setCountries] = useState<
    Country[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<"all" | "active" | "inactive">("all");

  const [showModal, setShowModal] =
    useState(false);

  const [editingCountry, setEditingCountry] =
    useState<Country | null>(null);

  const [form, setForm] = useState<
    Record<Locale, string>
  >({
    en: "",
    hi: "",
    gu: "",
  });

  const [isActive, setIsActive] =
    useState(true);

  const [error, setError] = useState("");

  async function loadCountries() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/admin/countries?locale=${currentLocale}`,
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to load countries"
        );
      }

      setCountries(
        Array.isArray(data) ? data : []
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load countries"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCountries();
  }, [currentLocale]);

  const filteredCountries = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return countries.filter((country) => {
      const matchesSearch =
        !query ||
        country.name
          .toLowerCase()
          .includes(query) ||
        country.translations.some(
          (translation) =>
            translation.name
              .toLowerCase()
              .includes(query)
        );

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" &&
          country.isActive) ||
        (statusFilter === "inactive" &&
          !country.isActive);

      return (
        matchesSearch && matchesStatus
      );
    });
  }, [countries, search, statusFilter]);

  function openAddModal() {
    setEditingCountry(null);

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
    country: Country
  ) {
    setEditingCountry(country);

    setForm({
      en: getTranslation(country, "en"),
      hi:
        country.translations.find(
          (translation) =>
            translation.locale === "hi"
        )?.name || "",
      gu:
        country.translations.find(
          (translation) =>
            translation.locale === "gu"
        )?.name || "",
    });

    setIsActive(country.isActive);
    setError("");
    setShowModal(true);
  }

  function closeModal() {
    if (saving) return;

    setShowModal(false);
    setEditingCountry(null);
    setError("");
  }

  async function saveCountry() {
    if (!form.en.trim()) {
      setError(
        "English country name is required."
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

      const url = editingCountry
        ? `/api/admin/countries/${editingCountry.id}`
        : "/api/admin/countries";

      const method = editingCountry
        ? "PUT"
        : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to save country"
        );
      }

      setShowModal(false);
      setEditingCountry(null);

      await loadCountries();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save country"
      );
    } finally {
      setSaving(false);
    }
  }

  async function toggleStatus(
    country: Country
  ) {
    try {
      setError("");

      const translations = {
        en: getTranslation(country, "en"),
        hi:
          country.translations.find(
            (translation) =>
              translation.locale === "hi"
          )?.name || "",
        gu:
          country.translations.find(
            (translation) =>
              translation.locale === "gu"
          )?.name || "",
      };

      const response = await fetch(
        `/api/admin/countries/${country.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name: translations.en,
            isActive: !country.isActive,
            translations,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to update country"
        );
      }

      await loadCountries();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update country"
      );
    }
  }

  async function deleteCountry(
    country: Country
  ) {
    const confirmed = window.confirm(
      `Delete "${getTranslation(
        country,
        "en"
      )}"?`
    );

    if (!confirmed) return;

    try {
      setError("");

      const response = await fetch(
        `/api/admin/countries/${country.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to delete country"
        );
      }

      await loadCountries();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete country"
      );
    }
  }

  const activeCount = countries.filter(
    (country) => country.isActive
  ).length;

  const inactiveCount =
    countries.length - activeCount;

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-600 to-red-800 text-white shadow-lg">
                <Globe2 size={24} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                  Country
                </h1>

                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Manage countries in English,
                  Hindi and Gujarati.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-red-800 px-5 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl"
          >
            <Plus size={19} />
            Add Country
          </button>
        </div>

        {error && !showModal && (
          <div className="mb-5 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
            {error}
          </div>
        )}

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-rose-200 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-rose-900/50 dark:bg-[#64131f]/80">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Total Countries
            </p>
            <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
              {countries.length}
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
                  setSearch(event.target.value)
                }
                placeholder="Search countries in English, Hindi or Gujarati..."
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
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setStatusFilter(value)
                  }
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    statusFilter === value
                      ? "bg-gradient-to-r from-rose-600 to-red-700 text-white shadow"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-rose-200 bg-white/85 shadow-xl backdrop-blur dark:border-rose-900/50 dark:bg-[#64131f]/90">
          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full">
              <thead>
                <tr className="border-b border-rose-200 bg-rose-50/80 dark:border-rose-900/50 dark:bg-[#520b16]">
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                    Country
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                    English
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                    हिन्दी
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                    ગુજરાતી
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                    Actions
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
                      Loading countries...
                    </td>
                  </tr>
                ) : filteredCountries.length ===
                  0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-12 text-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      No countries found.
                    </td>
                  </tr>
                ) : (
                  filteredCountries.map(
                    (country, index) => (
                      <tr
                        key={country.id}
                        className={`border-b border-gray-100 transition hover:bg-rose-50/50 dark:border-white/5 dark:hover:bg-white/5 ${
                          index % 2 === 1
                            ? "bg-gray-50/40 dark:bg-white/[0.02]"
                            : ""
                        }`}
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-red-700 text-sm font-bold text-white">
                              {getTranslation(
                                country,
                                currentLocale
                              )
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div>
                              <div className="font-semibold text-gray-900 dark:text-white">
                                {getTranslation(
                                  country,
                                  currentLocale
                                )}
                              </div>

                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {localeLabels[
                                  currentLocale
                                ].label}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4 font-medium text-gray-800 dark:text-gray-100">
                          {getTranslation(
                            country,
                            "en"
                          ) || "—"}
                        </td>

                        <td className="px-5 py-4 text-gray-700 dark:text-gray-200">
                          {country.translations.find(
                            (translation) =>
                              translation.locale ===
                              "hi"
                          )?.name || "—"}
                        </td>

                        <td className="px-5 py-4 text-gray-700 dark:text-gray-200">
                          {country.translations.find(
                            (translation) =>
                              translation.locale ===
                              "gu"
                          )?.name || "—"}
                        </td>

                        <td className="px-5 py-4">
                          <button
                            type="button"
                            onClick={() =>
                              toggleStatus(
                                country
                              )
                            }
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${
                              country.isActive
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                            }`}
                          >
                            {country.isActive ? (
                              <CheckCircle2
                                size={15}
                              />
                            ) : (
                              <XCircle
                                size={15}
                              />
                            )}

                            {country.isActive
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
                                  country
                                )
                              }
                              className="rounded-lg border border-gray-300 p-2 text-gray-600 transition hover:border-rose-400 hover:bg-rose-50 hover:text-rose-700 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
                              title="Edit"
                            >
                              <Pencil size={17} />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                deleteCountry(
                                  country
                                )
                              }
                              className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/40"
                              title="Delete"
                            >
                              <Trash2 size={17} />
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
                  {editingCountry
                    ? "Edit Country"
                    : "Add Country"}
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Enter country names for each
                  supported language.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
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

              {LOCALES.map((item) => (
                <div key={item}>
                  <label className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {localeLabels[item].label}

                    {item === "en" && (
                      <span className="ml-1 text-red-500">
                        *
                      </span>
                    )}
                  </label>

                  <input
                    value={form[item]}
                    onChange={(event) =>
                      setForm((previous) => ({
                        ...previous,
                        [item]:
                          event.target.value,
                      }))
                    }
                    placeholder={`Enter country name in ${localeLabels[item].label}`}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 dark:border-gray-700 dark:bg-[#520b16] dark:text-white"
                  />
                </div>
              ))}

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-white/10 dark:bg-white/5">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(event) =>
                    setIsActive(
                      event.target.checked
                    )
                  }
                  className="h-5 w-5 accent-rose-600"
                />

                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    Active
                  </div>

                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Make this country available
                    for selection.
                  </div>
                </div>
              </label>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-gray-200 px-6 py-5 sm:flex-row sm:justify-end dark:border-white/10">
              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-white/10"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={saveCountry}
                disabled={saving}
                className="rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-red-800 px-6 py-3 font-semibold text-white shadow-lg transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : editingCountry
                    ? "Update Country"
                    : "Add Country"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}