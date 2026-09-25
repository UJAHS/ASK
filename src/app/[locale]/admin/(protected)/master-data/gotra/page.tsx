"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Check,
  Edit3,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

type Locale = "en" | "hi" | "gu";

type GotraTranslation = {
  id: string;
  locale: Locale;
  name: string;
};

type Gotra = {
  id: string;
  name: string;
  legacyName?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  translations: GotraTranslation[];
};

const translations = {
  en: {
    title: "Gotra Master",
    description:
      "Manage multilingual Gotra master data used across the community portal.",
    add: "Add Gotra",
    edit: "Edit Gotra",
    english: "English",
    hindi: "Hindi",
    gujarati: "Gujarati",
    englishPlaceholder: "Enter Gotra name in English",
    hindiPlaceholder: "Enter Gotra name in Hindi",
    gujaratiPlaceholder: "Enter Gotra name in Gujarati",
    search: "Search Gotra...",
    status: "Status",
    active: "Active",
    inactive: "Inactive",
    actions: "Actions",
    save: "Save Gotra",
    update: "Update Gotra",
    cancel: "Cancel",
    delete: "Delete",
    confirmDelete: "Delete Gotra?",
    deleteDescription:
      "Are you sure you want to delete this Gotra? This action cannot be undone.",
    confirm: "Yes, Delete",
    noData: "No Gotra records found.",
    loading: "Loading...",
    saving: "Saving...",
    deleting: "Deleting...",
    required: "English Gotra name is required.",
    duplicate: "This Gotra already exists.",
    failedLoad: "Failed to load Gotra data.",
    failedSave: "Failed to save Gotra.",
    failedDelete: "Failed to delete Gotra.",
    successAdded: "Gotra added successfully.",
    successUpdated: "Gotra updated successfully.",
    successDeleted: "Gotra deleted successfully.",
    total: "Total",
    translations: "Translations",
  },

  hi: {
    title: "गोत्र मास्टर",
    description:
      "कम्युनिटी पोर्टल में उपयोग होने वाले बहुभाषी गोत्र मास्टर डेटा का प्रबंधन करें।",
    add: "गोत्र जोड़ें",
    edit: "गोत्र संपादित करें",
    english: "English",
    hindi: "हिन्दी",
    gujarati: "ગુજરાતી",
    englishPlaceholder: "गोत्र का नाम अंग्रेज़ी में दर्ज करें",
    hindiPlaceholder: "गोत्र का नाम हिन्दी में दर्ज करें",
    gujaratiPlaceholder: "गोत्र का नाम गुजराती में दर्ज करें",
    search: "गोत्र खोजें...",
    status: "स्थिति",
    active: "सक्रिय",
    inactive: "निष्क्रिय",
    actions: "कार्य",
    save: "गोत्र सेव करें",
    update: "गोत्र अपडेट करें",
    cancel: "रद्द करें",
    delete: "हटाएं",
    confirmDelete: "गोत्र हटाएं?",
    deleteDescription:
      "क्या आप वाकई इस गोत्र को हटाना चाहते हैं? यह कार्य वापस नहीं किया जा सकता।",
    confirm: "हां, हटाएं",
    noData: "कोई गोत्र रिकॉर्ड नहीं मिला।",
    loading: "लोड हो रहा है...",
    saving: "सेव हो रहा है...",
    deleting: "हटाया जा रहा है...",
    required: "अंग्रेज़ी गोत्र नाम आवश्यक है।",
    duplicate: "यह गोत्र पहले से मौजूद है।",
    failedLoad: "गोत्र डेटा लोड नहीं हो सका।",
    failedSave: "गोत्र सेव नहीं हो सका।",
    failedDelete: "गोत्र हटाया नहीं जा सका।",
    successAdded: "गोत्र सफलतापूर्वक जोड़ा गया।",
    successUpdated: "गोत्र सफलतापूर्वक अपडेट किया गया।",
    successDeleted: "गोत्र सफलतापूर्वक हटाया गया।",
    total: "कुल",
    translations: "अनुवाद",
  },

  gu: {
    title: "ગોત્ર માસ્ટર",
    description:
      "કમ્યુનિટી પોર્ટલમાં ઉપયોગ થતા બહુભાષી ગોત્ર માસ્ટર ડેટાનું સંચાલન કરો.",
    add: "ગોત્ર ઉમેરો",
    edit: "ગોત્ર સંપાદિત કરો",
    english: "English",
    hindi: "हिन्दी",
    gujarati: "ગુજરાતી",
    englishPlaceholder: "ગોત્રનું નામ અંગ્રેજીમાં દાખલ કરો",
    hindiPlaceholder: "ગોત્રનું નામ હિન્દીમાં દાખલ કરો",
    gujaratiPlaceholder: "ગોત્રનું નામ ગુજરાતીમાં દાખલ કરો",
    search: "ગોત્ર શોધો...",
    status: "સ્થિતિ",
    active: "સક્રિય",
    inactive: "નિષ્ક્રિય",
    actions: "ક્રિયાઓ",
    save: "ગોત્ર સેવ કરો",
    update: "ગોત્ર અપડેટ કરો",
    cancel: "રદ કરો",
    delete: "કાઢી નાખો",
    confirmDelete: "ગોત્ર કાઢી નાખવું છે?",
    deleteDescription:
      "શું તમે ખરેખર આ ગોત્ર કાઢી નાખવા માંગો છો? આ કાર્યવાહી પાછી કરી શકાશે નહીં.",
    confirm: "હા, કાઢી નાખો",
    noData: "કોઈ ગોત્ર રેકોર્ડ મળ્યો નથી.",
    loading: "લોડ થઈ રહ્યું છે...",
    saving: "સેવ થઈ રહ્યું છે...",
    deleting: "કાઢી નાખવામાં આવી રહ્યું છે...",
    required: "અંગ્રેજી ગોત્ર નામ જરૂરી છે.",
    duplicate: "આ ગોત્ર પહેલેથી અસ્તિત્વમાં છે.",
    failedLoad: "ગોત્ર ડેટા લોડ થઈ શક્યો નથી.",
    failedSave: "ગોત્ર સેવ થઈ શક્યું નથી.",
    failedDelete: "ગોત્ર કાઢી શકાયું નથી.",
    successAdded: "ગોત્ર સફળતાપૂર્વક ઉમેરાયું.",
    successUpdated: "ગોત્ર સફળતાપૂર્વક અપડેટ થયું.",
    successDeleted: "ગોત્ર સફળતાપૂર્વક કાઢી નાખવામાં આવ્યું.",
    total: "કુલ",
    translations: "ભાષાંતર",
  },
} as const;

function getLocaleFromPath(): Locale {
  if (typeof window === "undefined") {
    return "en";
  }

  const firstSegment = window.location.pathname
    .split("/")
    .filter(Boolean)[0];

  if (firstSegment === "hi") {
    return "hi";
  }

  if (firstSegment === "gu") {
    return "gu";
  }

  return "en";
}

export default function GotraPage() {
  const [locale, setLocale] = useState<Locale>("en");
  const [gotras, setGotras] = useState<Gotra[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [editing, setEditing] = useState<Gotra | null>(null);
  const [deleting, setDeleting] = useState<Gotra | null>(null);

  const [englishName, setEnglishName] = useState("");
  const [hindiName, setHindiName] = useState("");
  const [gujaratiName, setGujaratiName] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [saving, setSaving] = useState(false);
  const [deletingLoading, setDeletingLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const t = translations[locale];

  useEffect(() => {
    setLocale(getLocaleFromPath());
  }, []);

  async function loadGotras() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/admin/gotra?locale=${locale}`,
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t.failedLoad);
      }

      setGotras(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error ? err.message : t.failedLoad
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGotras();
  }, [locale]);

  const filteredGotras = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return gotras;
    }

    return gotras.filter((gotra) => {
      const names = [
        gotra.name,
        gotra.legacyName || "",
        ...gotra.translations.map(
          (translation) => translation.name
        ),
      ];

      return names.some((name) =>
        name.toLowerCase().includes(value)
      );
    });
  }, [gotras, search]);

  function getTranslation(
    gotra: Gotra,
    targetLocale: Locale
  ) {
    return (
      gotra.translations.find(
        (translation) => translation.locale === targetLocale
      )?.name || ""
    );
  }

  function openAddModal() {
    setEditing(null);
    setEnglishName("");
    setHindiName("");
    setGujaratiName("");
    setIsActive(true);
    setError("");
    setSuccess("");
    setModalOpen(true);
  }

  function openEditModal(gotra: Gotra) {
    setEditing(gotra);

    setEnglishName(
      getTranslation(gotra, "en") ||
        gotra.legacyName ||
        gotra.name ||
        ""
    );

    setHindiName(getTranslation(gotra, "hi"));
    setGujaratiName(getTranslation(gotra, "gu"));

    setIsActive(gotra.isActive);
    setError("");
    setSuccess("");
    setModalOpen(true);
  }

  function closeModal() {
    if (saving) {
      return;
    }

    setModalOpen(false);
    setEditing(null);
    setEnglishName("");
    setHindiName("");
    setGujaratiName("");
    setIsActive(true);
    setError("");
  }

  function openDeleteModal(gotra: Gotra) {
    setDeleting(gotra);
    setDeleteOpen(true);
    setError("");
    setSuccess("");
  }

  function closeDeleteModal() {
    if (deletingLoading) {
      return;
    }

    setDeleteOpen(false);
    setDeleting(null);
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const en = englishName.trim();
    const hi = hindiName.trim();
    const gu = gujaratiName.trim();

    if (!en) {
      setError(t.required);
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await fetch(
        editing
          ? `/api/admin/gotra/${editing.id}`
          : "/api/admin/gotra",
        {
          method: editing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: en,
            isActive,
            translations: {
              en,
              hi,
              gu,
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t.failedSave);
      }

      setSuccess(
        editing ? t.successUpdated : t.successAdded
      );

      await loadGotras();

      setTimeout(() => {
        closeModal();
        setSuccess("");
      }, 500);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error ? err.message : t.failedSave
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleting) {
      return;
    }

    try {
      setDeletingLoading(true);
      setError("");

      const response = await fetch(
        `/api/admin/gotra/${deleting.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t.failedDelete);
      }

      setSuccess(t.successDeleted);

      await loadGotras();

      setTimeout(() => {
        closeDeleteModal();
        setSuccess("");
      }, 500);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error ? err.message : t.failedDelete
      );
    } finally {
      setDeletingLoading(false);
    }
  }

  return (
    <div className="min-h-full">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
            Master Data
          </div>

          <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
            {t.title}
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-400">
            {t.description}
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-700 via-red-600 to-rose-600 px-5 py-3 font-bold text-white shadow-lg shadow-red-900/20 transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          <Plus className="h-5 w-5" />
          {t.add}
        </button>
      </div>

      {error && !modalOpen && !deleteOpen && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
          <X className="mt-0.5 h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && !modalOpen && !deleteOpen && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-300">
          <Check className="mt-0.5 h-5 w-5 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <div className="mb-6 grid gap-4 md:grid-cols-[1fr_auto]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t.search}
            className="w-full rounded-2xl border border-gray-200 bg-white py-3.5 pl-12 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-400 focus:ring-4 focus:ring-red-500/10 dark:border-red-900/40 dark:bg-[#2a0710] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-red-500"
          />
        </div>

        <div className="flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-3 dark:border-red-900/40 dark:bg-[#2a0710]">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {t.total}
          </span>

          <span className="ml-2 text-2xl font-black text-red-600 dark:text-red-400">
            {gotras.length}
          </span>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-red-900/40 dark:bg-[#24050b]">
        {loading ? (
          <div className="flex min-h-72 items-center justify-center">
            <div className="flex items-center gap-3 text-sm font-semibold text-gray-500 dark:text-gray-400">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-red-200 border-t-red-600" />
              {t.loading}
            </div>
          </div>
        ) : filteredGotras.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400">
              <Search className="h-6 w-6" />
            </div>

            <p className="mt-4 font-semibold text-gray-700 dark:text-gray-200">
              {t.noData}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 dark:border-red-900/40 dark:bg-red-950/20">
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    #
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {t.english}
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {t.hindi}
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {t.gujarati}
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {t.status}
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {t.actions}
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 dark:divide-red-900/20">
                {filteredGotras.map((gotra, index) => (
                  <tr
                    key={gotra.id}
                    className="transition hover:bg-red-50/50 dark:hover:bg-red-950/20"
                  >
                    <td className="px-6 py-5 text-sm font-semibold text-gray-400">
                      {index + 1}
                    </td>

                    <td className="px-6 py-5">
                      <span className="font-bold text-gray-900 dark:text-white">
                        {getTranslation(gotra, "en") ||
                          gotra.name}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {getTranslation(gotra, "hi") || "—"}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {getTranslation(gotra, "gu") || "—"}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      {gotra.isActive ? (
                        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />
                          {t.active}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                          <span className="h-2 w-2 rounded-full bg-gray-400" />
                          {t.inactive}
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(gotra)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/60"
                          title={t.edit}
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => openDeleteModal(gotra)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 bg-white text-red-600 transition hover:bg-red-50 dark:border-red-900/50 dark:bg-transparent dark:text-red-400 dark:hover:bg-red-950/40"
                          title={t.delete}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-red-200 bg-white shadow-2xl dark:border-red-900/60 dark:bg-[#24050b]">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5 dark:border-red-900/40">
              <h2 className="text-xl font-black text-gray-900 dark:text-white">
                {editing ? t.edit : t.add}
              </h2>

              <button
                type="button"
                onClick={closeModal}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-red-950/50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-5 p-6">
                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-300">
                    {success}
                  </div>
                )}

                <div className="grid gap-5 md:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-800 dark:text-gray-200">
                      {t.english}
                      <span className="ml-1 text-red-600">*</span>
                    </label>

                    <input
                      type="text"
                      value={englishName}
                      onChange={(event) =>
                        setEnglishName(event.target.value)
                      }
                      placeholder={t.englishPlaceholder}
                      maxLength={100}
                      autoFocus
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm font-medium text-gray-900 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 dark:border-red-900/40 dark:bg-red-950/20 dark:text-white dark:focus:bg-[#2a0710]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-800 dark:text-gray-200">
                      {t.hindi}
                    </label>

                    <input
                      type="text"
                      value={hindiName}
                      onChange={(event) =>
                        setHindiName(event.target.value)
                      }
                      placeholder={t.hindiPlaceholder}
                      maxLength={100}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm font-medium text-gray-900 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 dark:border-red-900/40 dark:bg-red-950/20 dark:text-white dark:focus:bg-[#2a0710]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-800 dark:text-gray-200">
                      {t.gujarati}
                    </label>

                    <input
                      type="text"
                      value={gujaratiName}
                      onChange={(event) =>
                        setGujaratiName(event.target.value)
                      }
                      placeholder={t.gujaratiPlaceholder}
                      maxLength={100}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm font-medium text-gray-900 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 dark:border-red-900/40 dark:bg-red-950/20 dark:text-white dark:focus:bg-[#2a0710]"
                    />
                  </div>
                </div>

                <label className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-red-900/40 dark:bg-red-950/20">
                  <div>
                    <p className="font-bold text-gray-800 dark:text-gray-200">
                      {t.status}
                    </p>

                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {isActive ? t.active : t.inactive}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setIsActive((value) => !value)
                    }
                    className={`relative h-7 w-12 rounded-full transition ${
                      isActive
                        ? "bg-red-600"
                        : "bg-gray-300 dark:bg-gray-700"
                    }`}
                    aria-label={t.status}
                  >
                    <span
                      className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                        isActive ? "left-6" : "left-1"
                      }`}
                    />
                  </button>
                </label>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-6 py-5 sm:flex-row sm:justify-end dark:border-red-900/40 dark:bg-red-950/10">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50 dark:border-red-900/40 dark:bg-transparent dark:text-gray-300 dark:hover:bg-red-950/30"
                >
                  {t.cancel}
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-700 to-rose-600 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  )}

                  {saving
                    ? t.saving
                    : editing
                      ? t.update
                      : t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteOpen && deleting && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-3xl border border-red-200 bg-white shadow-2xl dark:border-red-900/60 dark:bg-[#24050b]">
            <div className="p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400">
                <Trash2 className="h-6 w-6" />
              </div>

              <h2 className="mt-5 text-xl font-black text-gray-900 dark:text-white">
                {t.confirmDelete}
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                {t.deleteDescription}
              </p>

              <div className="mt-4 rounded-xl bg-gray-50 px-4 py-3 text-sm font-bold text-gray-800 dark:bg-red-950/20 dark:text-gray-200">
                {getTranslation(deleting, "en") ||
                  deleting.name}
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-6 py-5 sm:flex-row sm:justify-end dark:border-red-900/40 dark:bg-red-950/10">
              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={deletingLoading}
                className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50 dark:border-red-900/40 dark:bg-transparent dark:text-gray-300 dark:hover:bg-red-950/30"
              >
                {t.cancel}
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deletingLoading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deletingLoading && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                )}

                {deletingLoading
                  ? t.deleting
                  : t.confirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}