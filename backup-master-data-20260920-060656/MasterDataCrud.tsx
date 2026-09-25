"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Locale = "en" | "hi" | "gu";

type MasterItem = {
  id: string;
  name: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  state?: {
    id: string;
    name: string;
  } | null;
};

type StateItem = {
  id: string;
  name: string;
};

type Props = {
  locale: string;
  title: string;
  endpoint: string;
  description: string;
  cityMode?: boolean;
};

const translations = {
  en: {
    search: "Search",
    searchPlaceholder: "Search...",
    all: "All",
    active: "Active",
    inactive: "Inactive",
    add: "Add New",
    edit: "Edit",
    delete: "Delete",
    cancel: "Cancel",
    save: "Save",
    update: "Update",
    saving: "Saving...",
    loading: "Loading...",
    name: "Name",
    status: "Status",
    actions: "Actions",
    activeStatus: "Active",
    inactiveStatus: "Inactive",
    noRecords: "No records found.",
    addTitle: "Add New",
    editTitle: "Edit",
    namePlaceholder: "Enter name",
    state: "State",
    selectState: "Select state",
    deleteTitle: "Delete Record",
    deleteMessage:
      "Are you sure you want to delete this record? This action cannot be undone.",
    yesDelete: "Yes, Delete",
    required: "Name is required.",
    stateRequired: "State is required.",
    loadError: "Unable to load records.",
    saveSuccess: "Record saved successfully.",
    updateSuccess: "Record updated successfully.",
    deleteSuccess: "Record deleted successfully.",
    genericError: "Something went wrong. Please try again.",
    deactivate: "Deactivate",
    activate: "Activate",
    close: "Close",
  },

  hi: {
    search: "खोजें",
    searchPlaceholder: "खोजें...",
    all: "सभी",
    active: "सक्रिय",
    inactive: "निष्क्रिय",
    add: "नया जोड़ें",
    edit: "संपादित करें",
    delete: "हटाएं",
    cancel: "रद्द करें",
    save: "सहेजें",
    update: "अपडेट करें",
    saving: "सहेजा जा रहा है...",
    loading: "लोड हो रहा है...",
    name: "नाम",
    status: "स्थिति",
    actions: "कार्य",
    activeStatus: "सक्रिय",
    inactiveStatus: "निष्क्रिय",
    noRecords: "कोई रिकॉर्ड नहीं मिला।",
    addTitle: "नया जोड़ें",
    editTitle: "संपादित करें",
    namePlaceholder: "नाम दर्ज करें",
    state: "राज्य",
    selectState: "राज्य चुनें",
    deleteTitle: "रिकॉर्ड हटाएं",
    deleteMessage:
      "क्या आप वाकई इस रिकॉर्ड को हटाना चाहते हैं? यह कार्य वापस नहीं किया जा सकता।",
    yesDelete: "हां, हटाएं",
    required: "नाम आवश्यक है।",
    stateRequired: "राज्य आवश्यक है।",
    loadError: "रिकॉर्ड लोड नहीं हो सके।",
    saveSuccess: "रिकॉर्ड सफलतापूर्वक सहेजा गया।",
    updateSuccess: "रिकॉर्ड सफलतापूर्वक अपडेट किया गया।",
    deleteSuccess: "रिकॉर्ड सफलतापूर्वक हटाया गया।",
    genericError: "कुछ गलत हो गया। कृपया पुनः प्रयास करें।",
    deactivate: "निष्क्रिय करें",
    activate: "सक्रिय करें",
    close: "बंद करें",
  },

  gu: {
    search: "શોધો",
    searchPlaceholder: "શોધો...",
    all: "બધા",
    active: "સક્રિય",
    inactive: "નિષ્ક્રિય",
    add: "નવું ઉમેરો",
    edit: "સંપાદિત કરો",
    delete: "કાઢી નાખો",
    cancel: "રદ કરો",
    save: "સાચવો",
    update: "અપડેટ કરો",
    saving: "સાચવી રહ્યા છીએ...",
    loading: "લોડ થઈ રહ્યું છે...",
    name: "નામ",
    status: "સ્થિતિ",
    actions: "ક્રિયાઓ",
    activeStatus: "સક્રિય",
    inactiveStatus: "નિષ્ક્રિય",
    noRecords: "કોઈ રેકોર્ડ મળ્યો નથી.",
    addTitle: "નવું ઉમેરો",
    editTitle: "સંપાદિત કરો",
    namePlaceholder: "નામ દાખલ કરો",
    state: "રાજ્ય",
    selectState: "રાજ્ય પસંદ કરો",
    deleteTitle: "રેકોર્ડ કાઢી નાખો",
    deleteMessage:
      "શું તમે ખરેખર આ રેકોર્ડ કાઢી નાખવા માંગો છો? આ ક્રિયા પાછી લઈ શકાશે નહીં.",
    yesDelete: "હા, કાઢી નાખો",
    required: "નામ જરૂરી છે.",
    stateRequired: "રાજ્ય જરૂરી છે.",
    loadError: "રેકોર્ડ લોડ થઈ શક્યા નથી.",
    saveSuccess: "રેકોર્ડ સફળતાપૂર્વક સાચવાયો.",
    updateSuccess: "રેકોર્ડ સફળતાપૂર્વક અપડેટ થયો.",
    deleteSuccess: "રેકોર્ડ સફળતાપૂર્વક કાઢી નાખાયો.",
    genericError: "કંઈક ખોટું થયું. ફરી પ્રયાસ કરો.",
    deactivate: "નિષ્ક્રિય કરો",
    activate: "સક્રિય કરો",
    close: "બંધ કરો",
  },
};

export default function MasterDataCrud({
  locale,
  title,
  endpoint,
  description,
  cityMode = false,
}: Props) {
  const currentLocale: Locale =
    locale === "hi" || locale === "gu" ? locale : "en";

  const t = translations[currentLocale];

  const [items, setItems] = useState<MasterItem[]>([]);
  const [states, setStates] = useState<StateItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "ACTIVE" | "INACTIVE"
  >("ALL");

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [editingItem, setEditingItem] = useState<MasterItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<MasterItem | null>(null);

  const [name, setName] = useState("");
  const [stateId, setStateId] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadItems() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(endpoint, {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t.loadError);
      }

      setItems(Array.isArray(data) ? data : data.items || []);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : t.loadError
      );
    } finally {
      setLoading(false);
    }
  }

  async function loadStates() {
    if (!cityMode) return;

    try {
      const response = await fetch("/api/admin/states", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t.loadError);
      }

      setStates(Array.isArray(data) ? data : data.items || []);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadItems();
    loadStates();
  }, [endpoint, cityMode]);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter((item) => {
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.state?.name?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "ACTIVE" && item.isActive) ||
        (statusFilter === "INACTIVE" && !item.isActive);

      return matchesSearch && matchesStatus;
    });
  }, [items, search, statusFilter]);

  function openAdd() {
    setEditingItem(null);
    setName("");
    setStateId("");
    setError("");
    setMessage("");
    setModalOpen(true);
  }

  function openEdit(item: MasterItem) {
    setEditingItem(item);
    setName(item.name);
    setStateId(item.state?.id || "");
    setError("");
    setMessage("");
    setModalOpen(true);
  }

  function closeModal() {
    if (saving) return;

    setModalOpen(false);
    setEditingItem(null);
    setName("");
    setStateId("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setMessage("");

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError(t.required);
      return;
    }

    if (cityMode && !stateId) {
      setError(t.stateRequired);
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        editingItem
          ? `${endpoint}/${editingItem.id}`
          : endpoint,
        {
          method: editingItem ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            cityMode
              ? {
                  name: trimmedName,
                  stateId,
                }
              : {
                  name: trimmedName,
                }
          ),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t.genericError);
      }

      setMessage(
        editingItem ? t.updateSuccess : t.saveSuccess
      );

      setModalOpen(false);
      setEditingItem(null);
      setName("");
      setStateId("");

      await loadItems();
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : t.genericError
      );
    } finally {
      setSaving(false);
    }
  }

  async function toggleStatus(item: MasterItem) {
    try {
      setError("");
      setMessage("");

      const response = await fetch(`${endpoint}/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: item.name,
          isActive: !item.isActive,
          ...(cityMode && item.state?.id
            ? { stateId: item.state.id }
            : {}),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t.genericError);
      }

      setMessage(
        item.isActive
          ? `${item.name}: ${t.deactivate}`
          : `${item.name}: ${t.activate}`
      );

      await loadItems();
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : t.genericError
      );
    }
  }

  function openDelete(item: MasterItem) {
    setDeletingItem(item);
    setError("");
    setDeleteOpen(true);
  }

  async function confirmDelete() {
    if (!deletingItem) return;

    try {
      setSaving(true);
      setError("");

      const response = await fetch(
        `${endpoint}/${deletingItem.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t.genericError);
      }

      setDeleteOpen(false);
      setDeletingItem(null);
      setMessage(t.deleteSuccess);

      await loadItems();
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : t.genericError
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#7f1020] dark:text-white">
            {title}
          </h1>

          <p className="mt-1 text-sm text-gray-600 dark:text-white/70">
            {description}
          </p>
        </div>

        <button
          type="button"
          onClick={openAdd}
          className="rounded-xl bg-[#b40018] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#8f0014]"
        >
          + {t.add}
        </button>
      </div>

      {message && (
        <div className="rounded-xl border border-green-500/20 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 dark:border-green-400/20 dark:bg-green-500/10 dark:text-green-300">
          {message}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="rounded-2xl border border-[#b40018]/15 bg-white/80 p-4 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="flex-1">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#b40018] dark:border-white/10 dark:bg-black/20 dark:text-white"
            />
          </div>

          <div className="flex rounded-xl border border-gray-200 bg-gray-50 p-1 dark:border-white/10 dark:bg-black/20">
            {[
              ["ALL", t.all],
              ["ACTIVE", t.active],
              ["INACTIVE", t.inactive],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() =>
                  setStatusFilter(
                    value as "ALL" | "ACTIVE" | "INACTIVE"
                  )
                }
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  statusFilter === value
                    ? "bg-[#b40018] text-white shadow"
                    : "text-gray-600 hover:bg-white dark:text-white/60 dark:hover:bg-white/10"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#b40018]/15 bg-white/80 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
        {loading ? (
          <div className="p-10 text-center text-sm text-gray-500 dark:text-white/60">
            {t.loading}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-10 text-center text-sm text-gray-500 dark:text-white/60">
            {t.noRecords}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/5">
                  <th className="px-5 py-4 text-left font-semibold text-gray-700 dark:text-white/80">
                    #
                  </th>

                  <th className="px-5 py-4 text-left font-semibold text-gray-700 dark:text-white/80">
                    {t.name}
                  </th>

                  {cityMode && (
                    <th className="px-5 py-4 text-left font-semibold text-gray-700 dark:text-white/80">
                      {t.state}
                    </th>
                  )}

                  <th className="px-5 py-4 text-left font-semibold text-gray-700 dark:text-white/80">
                    {t.status}
                  </th>

                  <th className="px-5 py-4 text-right font-semibold text-gray-700 dark:text-white/80">
                    {t.actions}
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-100 transition hover:bg-red-50/60 dark:border-white/5 dark:hover:bg-white/5"
                  >
                    <td className="px-5 py-4 text-gray-500 dark:text-white/50">
                      {index + 1}
                    </td>

                    <td className="px-5 py-4 font-semibold text-[#64131f] dark:text-white">
                      {item.name}
                    </td>

                    {cityMode && (
                      <td className="px-5 py-4 text-gray-600 dark:text-white/70">
                        {item.state?.name || "-"}
                      </td>
                    )}

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          item.isActive
                            ? "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-300"
                            : "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-white/50"
                        }`}
                      >
                        {item.isActive
                          ? t.activeStatus
                          : t.inactiveStatus}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(item)}
                          className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100 dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-300"
                        >
                          {t.edit}
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleStatus(item)}
                          className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 transition hover:bg-amber-100 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-300"
                        >
                          {item.isActive
                            ? t.deactivate
                            : t.activate}
                        </button>

                        <button
                          type="button"
                          onClick={() => openDelete(item)}
                          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-300"
                        >
                          {t.delete}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-[#b40018]/20 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#3b0710]">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#64131f] dark:text-white">
                {editingItem ? t.editTitle : t.addTitle}
              </h2>

              <button
                type="button"
                onClick={closeModal}
                className="text-gray-500 hover:text-red-600 dark:text-white/50 dark:hover:text-white"
              >
                X
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-white/80">
                  {t.name}
                </label>

                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={t.namePlaceholder}
                  autoFocus
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#b40018] dark:border-white/10 dark:bg-black/20 dark:text-white"
                />
              </div>

              {cityMode && (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-white/80">
                    {t.state}
                  </label>

                  <select
                    value={stateId}
                    onChange={(event) =>
                      setStateId(event.target.value)
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#b40018] dark:border-white/10 dark:bg-[#28040a] dark:text-white"
                  >
                    <option value="">
                      {t.selectState}
                    </option>

                    {states.map((state) => (
                      <option key={state.id} value={state.id}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {error && (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50 dark:border-white/10 dark:text-white/70 dark:hover:bg-white/10"
                >
                  {t.cancel}
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-[#b40018] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8f0014] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? t.saving
                    : editingItem
                      ? t.update
                      : t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteOpen && deletingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-6 shadow-2xl dark:border-red-400/20 dark:bg-[#3b0710]">
            <h2 className="text-xl font-bold text-[#64131f] dark:text-white">
              {t.deleteTitle}
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-white/70">
              {t.deleteMessage}
            </p>

            <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 dark:bg-red-500/10 dark:text-red-300">
              {deletingItem.name}
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteOpen(false)}
                disabled={saving}
                className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 dark:border-white/10 dark:text-white/70"
              >
                {t.cancel}
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                disabled={saving}
                className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                {saving ? t.saving : t.yesDelete}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}