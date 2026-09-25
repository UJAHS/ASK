"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Locale = "en" | "hi" | "gu";

type TranslationItem = {
  id?: string;
  locale: string;
  name: string;
};

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

  translations?: TranslationItem[];
  ProfessionTranslation?: TranslationItem[];
  BloodGroupTranslation?: TranslationItem[];
  BusinessCategoryTranslation?: TranslationItem[];
};

type StateItem = {
  id: string;
  name: string;
};

type TranslationValues = {
  en: string;
  hi: string;
  gu: string;
};

type Props = {
  locale: string;
  title: string;
  endpoint: string;
  description: string;
  cityMode?: boolean;
};

const uiTranslations = {
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
    english: "English",
    hindi: "Hindi",
    gujarati: "Gujarati",
    name: "Name",
    status: "Status",
    actions: "Actions",
    activeStatus: "Active",
    inactiveStatus: "Inactive",
    noRecords: "No records found.",
    addTitle: "Add New",
    editTitle: "Edit",
    englishPlaceholder: "Enter English name",
    hindiPlaceholder: "हिंदी नाम दर्ज करें",
    gujaratiPlaceholder: "ગુજરાતી નામ દાખલ કરો",
    state: "State",
    selectState: "Select state",
    deleteTitle: "Delete Record",
    deleteMessage:
      "Are you sure you want to delete this record? This action cannot be undone.",
    yesDelete: "Yes, Delete",
    required: "English name is required.",
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
    delete: "हटाएँ",
    cancel: "रद्द करें",
    save: "सहेजें",
    update: "अपडेट करें",
    saving: "सहेजा जा रहा है...",
    loading: "लोड हो रहा है...",
    english: "अंग्रेज़ी",
    hindi: "हिन्दी",
    gujarati: "गुजराती",
    name: "नाम",
    status: "स्थिति",
    actions: "कार्य",
    activeStatus: "सक्रिय",
    inactiveStatus: "निष्क्रिय",
    noRecords: "कोई रिकॉर्ड नहीं मिला।",
    addTitle: "नया जोड़ें",
    editTitle: "संपादित करें",
    englishPlaceholder: "अंग्रेज़ी नाम दर्ज करें",
    hindiPlaceholder: "हिंदी नाम दर्ज करें",
    gujaratiPlaceholder: "गुजराती नाम दर्ज करें",
    state: "राज्य",
    selectState: "राज्य चुनें",
    deleteTitle: "रिकॉर्ड हटाएँ",
    deleteMessage:
      "क्या आप वाकई इस रिकॉर्ड को हटाना चाहते हैं? यह कार्य पूर्ववत नहीं किया जा सकता।",
    yesDelete: "हाँ, हटाएँ",
    required: "अंग्रेज़ी नाम आवश्यक है।",
    stateRequired: "राज्य आवश्यक है।",
    loadError: "रिकॉर्ड लोड नहीं हो सके।",
    saveSuccess: "रिकॉर्ड सफलतापूर्वक सहेजा गया।",
    updateSuccess: "रिकॉर्ड सफलतापूर्वक अपडेट किया गया।",
    deleteSuccess: "रिकॉर्ड सफलतापूर्वक हटाया गया।",
    genericError: "कुछ गलत हो गया। कृपया फिर से प्रयास करें।",
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
    english: "અંગ્રેજી",
    hindi: "હિન્દી",
    gujarati: "ગુજરાતી",
    name: "નામ",
    status: "સ્થિતિ",
    actions: "ક્રિયાઓ",
    activeStatus: "સક્રિય",
    inactiveStatus: "નિષ્ક્રિય",
    noRecords: "કોઈ રેકોર્ડ મળ્યો નથી.",
    addTitle: "નવું ઉમેરો",
    editTitle: "સંપાદિત કરો",
    englishPlaceholder: "અંગ્રેજી નામ દાખલ કરો",
    hindiPlaceholder: "હિન્દી નામ દાખલ કરો",
    gujaratiPlaceholder: "ગુજરાતી નામ દાખલ કરો",
    state: "રાજ્ય",
    selectState: "રાજ્ય પસંદ કરો",
    deleteTitle: "રેકોર્ડ કાઢી નાખો",
    deleteMessage:
      "શું તમે ખરેખર આ રેકોર્ડ કાઢી નાખવા માંગો છો? આ ક્રિયા પૂર્વવત્ કરી શકાશે નહીં.",
    yesDelete: "હા, કાઢી નાખો",
    required: "અંગ્રેજી નામ જરૂરી છે.",
    stateRequired: "રાજ્ય જરૂરી છે.",
    loadError: "રેકોર્ડ લોડ થઈ શક્યા નથી.",
    saveSuccess: "રેકોર્ડ સફળતાપૂર્વક સાચવાયો.",
    updateSuccess: "રેકોર્ડ સફળતાપૂર્વક અપડેટ થયો.",
    deleteSuccess: "રેકોર્ડ સફળતાપૂર્વક કાઢી નાખવામાં આવ્યો.",
    genericError: "કંઈક ખોટું થયું. કૃપા કરીને ફરી પ્રયાસ કરો.",
    deactivate: "નિષ્ક્રિય કરો",
    activate: "સક્રિય કરો",
    close: "બંધ કરો",
  },
};

const translatedEndpoints = [
  "/api/admin/occupations",
  "/api/admin/countries",
  "/api/admin/education",
  "/api/admin/gotras",
  "/api/admin/professions",
  "/api/admin/blood-groups",
  "/api/admin/business-categories",
];

function supportsTranslations(endpoint: string) {
  return translatedEndpoints.some((route) =>
    endpoint.startsWith(route)
  );
}

function getTranslationRows(item: MasterItem): TranslationItem[] {
  const possibleRows = [
    item.translations,
    item.ProfessionTranslation,
    item.BloodGroupTranslation,
    item.BusinessCategoryTranslation,
  ];

  const rows = possibleRows.find((value) =>
    Array.isArray(value)
  );

  if (rows) {
    return rows;
  }

  if (item.name) {
    return [
      {
        locale: "en",
        name: item.name,
      },
    ];
  }

  return [];
}

function getTranslationValue(
  item: MasterItem,
  locale: Locale
) {
  return (
    getTranslationRows(item).find(
      (translation) => translation.locale === locale
    )?.name || ""
  );
}

function getTranslationValues(
  item: MasterItem
): TranslationValues {
  const rows = getTranslationRows(item);

  return {
    en:
      rows.find((row) => row.locale === "en")?.name ||
      item.name ||
      "",
    hi:
      rows.find((row) => row.locale === "hi")?.name ||
      "",
    gu:
      rows.find((row) => row.locale === "gu")?.name ||
      "",
  };
}

function getLocalizedColumnValue(
  item: MasterItem,
  locale: Locale
) {
  const value = getTranslationValue(item, locale);

  if (value) {
    return value;
  }

  if (locale === "en" && item.name) {
    return item.name;
  }

  return "—";
}

function getLocalizedMeta(
  endpoint: string,
  locale: Locale,
  fallbackTitle: string,
  fallbackDescription: string
) {
  if (endpoint.includes("/professions")) {
    return {
      title:
        locale === "hi"
          ? "पेशा मास्टर"
          : locale === "gu"
            ? "વ્યવસાય માસ્ટર"
            : "Profession Master",
      description:
        locale === "hi"
          ? "ASK Community Portal में उपयोग होने वाले पेशों का प्रबंधन करें।"
          : locale === "gu"
            ? "ASK Community Portal માં ઉપયોગ થતા વ્યવસાયોનું સંચાલન કરો."
            : "Manage professions used throughout the ASK Community Portal.",
    };
  }

  if (endpoint.includes("/blood-groups")) {
    return {
      title:
        locale === "hi"
          ? "रक्त समूह मास्टर"
          : locale === "gu"
            ? "બ્લડ ગ્રુપ માસ્ટર"
            : "Blood Group Master",
      description:
        locale === "hi"
          ? "ASK Community Portal में उपयोग होने वाले रक्त समूहों का प्रबंधन करें।"
          : locale === "gu"
            ? "ASK Community Portal માં ઉપયોગ થતા બ્લડ ગ્રુપનું સંચાલન કરો."
            : "Manage blood groups used throughout the ASK Community Portal.",
    };
  }

  if (endpoint.includes("/business-categories")) {
    return {
      title:
        locale === "hi"
          ? "व्यवसाय श्रेणी मास्टर"
          : locale === "gu"
            ? "વ્યવસાય કેટેગરી માસ્ટર"
            : "Business Category Master",
      description:
        locale === "hi"
          ? "ASK Community Portal में उपयोग होने वाली व्यवसाय श्रेणियों का प्रबंधन करें।"
          : locale === "gu"
            ? "ASK Community Portal માં ઉપયોગ થતી વ્યવસાય કેટેગરીનું સંચાલન કરો."
            : "Manage business categories used throughout the ASK Community Portal.",
    };
  }

  return {
    title: fallbackTitle,
    description: fallbackDescription,
  };
}

export default function MasterDataCrud({
  locale,
  title,
  endpoint,
  description,
  cityMode = false,
}: Props) {
  const currentLocale: Locale =
    locale === "hi" || locale === "gu" ? locale : "en";

  const t = uiTranslations[currentLocale];
  const multilingual = supportsTranslations(endpoint);

  const localizedMeta = getLocalizedMeta(
    endpoint,
    currentLocale,
    title,
    description
  );

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

  const [editingItem, setEditingItem] =
    useState<MasterItem | null>(null);

  const [deletingItem, setDeletingItem] =
    useState<MasterItem | null>(null);

  const [name, setName] = useState("");

  const [translationValues, setTranslationValues] =
    useState<TranslationValues>({
      en: "",
      hi: "",
      gu: "",
    });

  const [stateId, setStateId] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function getItemsUrl() {
    if (!multilingual) {
      return endpoint;
    }

    const separator = endpoint.includes("?")
      ? "&"
      : "?";

    return `${endpoint}${separator}locale=${encodeURIComponent(
      currentLocale
    )}`;
  }

  async function loadItems() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(getItemsUrl(), {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t.loadError);
      }

      setItems(
        Array.isArray(data)
          ? data
          : Array.isArray(data.items)
            ? data.items
            : []
      );
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : t.loadError
      );
    } finally {
      setLoading(false);
    }
  }

  async function loadStates() {
    if (!cityMode) return;

    try {
      const response = await fetch(
        "/api/admin/states",
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || t.loadError
        );
      }

      setStates(
        Array.isArray(data)
          ? data
          : Array.isArray(data.items)
            ? data.items
            : []
      );
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadItems();
  }, [endpoint, currentLocale, multilingual]);

  useEffect(() => {
    loadStates();
  }, [cityMode]);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter((item) => {
      const localizedNames = multilingual
        ? getTranslationRows(item)
            .map((row) => row.name)
            .join(" ")
            .toLowerCase()
        : item.name.toLowerCase();

      const matchesSearch =
        !query ||
        localizedNames.includes(query) ||
        item.state?.name
          ?.toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "ACTIVE" &&
          item.isActive) ||
        (statusFilter === "INACTIVE" &&
          !item.isActive);

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    items,
    search,
    statusFilter,
    multilingual,
  ]);

  function openAdd() {
    setEditingItem(null);
    setName("");

    setTranslationValues({
      en: "",
      hi: "",
      gu: "",
    });

    setStateId("");
    setError("");
    setMessage("");
    setModalOpen(true);
  }

  function openEdit(item: MasterItem) {
    setEditingItem(item);

    const values = getTranslationValues(item);

    setName(item.name || values.en);

    setTranslationValues(values);

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

    setTranslationValues({
      en: "",
      hi: "",
      gu: "",
    });

    setStateId("");
    setError("");
  }

  function updateTranslation(
    localeKey: Locale,
    value: string
  ) {
    setTranslationValues(
      (current) => ({
        ...current,
        [localeKey]: value,
      })
    );
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setMessage("");

    const englishName = multilingual
      ? translationValues.en.trim()
      : name.trim();

    if (!englishName) {
      setError(t.required);
      return;
    }

    if (cityMode && !stateId) {
      setError(t.stateRequired);
      return;
    }

    try {
      setSaving(true);

      const payload: Record<string, unknown> =
        multilingual
          ? {
              name: englishName,
              translations: {
                en: translationValues.en.trim(),
                hi: translationValues.hi.trim(),
                gu: translationValues.gu.trim(),
              },
            }
          : {
              name: englishName,
            };

      if (cityMode) {
        payload.stateId = stateId;
      }

      const response = await fetch(
        editingItem
          ? `${endpoint}/${editingItem.id}`
          : endpoint,
        {
          method: editingItem
            ? "PUT"
            : "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || t.genericError
        );
      }

      setMessage(
        editingItem
          ? t.updateSuccess
          : t.saveSuccess
      );

      setModalOpen(false);
      setEditingItem(null);
      setName("");

      setTranslationValues({
        en: "",
        hi: "",
        gu: "",
      });

      setStateId("");

      await loadItems();
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : t.genericError
      );
    } finally {
      setSaving(false);
    }
  }

  async function toggleStatus(
    item: MasterItem
  ) {
    try {
      setError("");
      setMessage("");

      const payload: Record<string, unknown> =
        multilingual
          ? {
              name:
                getTranslationValue(
                  item,
                  "en"
                ) || item.name,

              translations:
                getTranslationValues(item),

              isActive: !item.isActive,
            }
          : {
              name: item.name,
              isActive:
                !item.isActive,
            };

      if (
        cityMode &&
        item.state?.id
      ) {
        payload.stateId =
          item.state.id;
      }

      const response = await fetch(
        `${endpoint}/${item.id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(payload),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            t.genericError
        );
      }

      setMessage(
        item.isActive
          ? `${getLocalizedColumnValue(
              item,
              currentLocale
            )}: ${t.deactivate}`
          : `${getLocalizedColumnValue(
              item,
              currentLocale
            )}: ${t.activate}`
      );

      await loadItems();
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : t.genericError
      );
    }
  }

  function openDelete(
    item: MasterItem
  ) {
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

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            t.genericError
        );
      }

      setDeleteOpen(false);
      setDeletingItem(null);
      setMessage(
        t.deleteSuccess
      );

      await loadItems();
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : t.genericError
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
            {localizedMeta.title}
          </h1>

          <p className="mt-1 text-sm text-gray-600 dark:text-white/70">
            {localizedMeta.description}
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
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder={
                t.searchPlaceholder
              }
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#b40018] dark:border-white/10 dark:bg-black/20 dark:text-white"
            />
          </div>

          <div className="flex rounded-xl border border-gray-200 bg-gray-50 p-1 dark:border-white/10 dark:bg-black/20">
            {[
              ["ALL", t.all],
              ["ACTIVE", t.active],
              ["INACTIVE", t.inactive],
            ].map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setStatusFilter(
                      value as
                        | "ALL"
                        | "ACTIVE"
                        | "INACTIVE"
                    )
                  }
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    statusFilter ===
                    value
                      ? "bg-[#b40018] text-white shadow"
                      : "text-gray-600 hover:bg-white dark:text-white/60 dark:hover:bg-white/10"
                  }`}
                >
                  {label}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#b40018]/15 bg-white/80 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
        {loading ? (
          <div className="p-10 text-center text-sm text-gray-500 dark:text-white/60">
            {t.loading}
          </div>
        ) : filteredItems.length ===
          0 ? (
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

                  {multilingual ? (
                    <>
                      <th className="px-5 py-4 text-left font-semibold text-gray-700 dark:text-white/80">
                        {t.english}
                      </th>

                      <th className="px-5 py-4 text-left font-semibold text-gray-700 dark:text-white/80">
                        {t.hindi}
                      </th>

                      <th className="px-5 py-4 text-left font-semibold text-gray-700 dark:text-white/80">
                        {t.gujarati}
                      </th>
                    </>
                  ) : (
                    <th className="px-5 py-4 text-left font-semibold text-gray-700 dark:text-white/80">
                      {t.name}
                    </th>
                  )}

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
                {filteredItems.map(
                  (item, index) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-100 transition hover:bg-red-50/60 dark:border-white/5 dark:hover:bg-white/5"
                    >
                      <td className="px-5 py-4 text-gray-500 dark:text-white/50">
                        {index + 1}
                      </td>

                      {multilingual ? (
                        <>
                          <td className="px-5 py-4 font-semibold text-[#64131f] dark:text-white">
                            {getLocalizedColumnValue(
                              item,
                              "en"
                            )}
                          </td>

                          <td className="px-5 py-4 text-gray-700 dark:text-white/80">
                            {getLocalizedColumnValue(
                              item,
                              "hi"
                            )}
                          </td>

                          <td className="px-5 py-4 text-gray-700 dark:text-white/80">
                            {getLocalizedColumnValue(
                              item,
                              "gu"
                            )}
                          </td>
                        </>
                      ) : (
                        <td className="px-5 py-4 font-semibold text-[#64131f] dark:text-white">
                          {item.name}
                        </td>
                      )}

                      {cityMode && (
                        <td className="px-5 py-4 text-gray-600 dark:text-white/70">
                          {item.state?.name ||
                            "—"}
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
                            onClick={() =>
                              openEdit(item)
                            }
                            className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100 dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-300"
                          >
                            {t.edit}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              toggleStatus(
                                item
                              )
                            }
                            className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 transition hover:bg-amber-100 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-300"
                          >
                            {item.isActive
                              ? t.deactivate
                              : t.activate}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              openDelete(
                                item
                              )
                            }
                            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-300"
                          >
                            {t.delete}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl border border-[#b40018]/20 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#3b0710]">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#64131f] dark:text-white">
                  {editingItem
                    ? t.editTitle
                    : t.addTitle}
                </h2>

                {multilingual && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-white/50">
                    {currentLocale ===
                    "hi"
                      ? "तीनों भाषाओं में नाम दर्ज करें।"
                      : currentLocale ===
                          "gu"
                        ? "ત્રણેય ભાષામાં નામ દાખલ કરો."
                        : "Enter the name in all three languages."}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg px-2 py-1 text-gray-500 transition hover:bg-gray-100 hover:text-red-600 dark:text-white/50 dark:hover:bg-white/10 dark:hover:text-white"
                aria-label={t.close}
              >
                X
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {multilingual ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-white/80">
                      {t.english}
                      <span className="ml-1 text-red-500">
                        *
                      </span>
                    </label>

                    <input
                      value={
                        translationValues.en
                      }
                      onChange={(event) =>
                        updateTranslation(
                          "en",
                          event.target
                            .value
                        )
                      }
                      placeholder={
                        t.englishPlaceholder
                      }
                      autoFocus
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#b40018] dark:border-white/10 dark:bg-black/20 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-white/80">
                      {t.hindi}
                    </label>

                    <input
                      value={
                        translationValues.hi
                      }
                      onChange={(event) =>
                        updateTranslation(
                          "hi",
                          event.target
                            .value
                        )
                      }
                      placeholder={
                        t.hindiPlaceholder
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#b40018] dark:border-white/10 dark:bg-black/20 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-white/80">
                      {t.gujarati}
                    </label>

                    <input
                      value={
                        translationValues.gu
                      }
                      onChange={(event) =>
                        updateTranslation(
                          "gu",
                          event.target
                            .value
                        )
                      }
                      placeholder={
                        t.gujaratiPlaceholder
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#b40018] dark:border-white/10 dark:bg-black/20 dark:text-white"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-white/80">
                    {t.name}
                  </label>

                  <input
                    value={name}
                    onChange={(event) =>
                      setName(
                        event.target.value
                      )
                    }
                    placeholder={
                      t.englishPlaceholder
                    }
                    autoFocus
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#b40018] dark:border-white/10 dark:bg-black/20 dark:text-white"
                  />
                </div>
              )}

              {cityMode && (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-white/80">
                    {t.state}
                  </label>

                  <select
                    value={stateId}
                    onChange={(event) =>
                      setStateId(
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#b40018] dark:border-white/10 dark:bg-[#28040a] dark:text-white"
                  >
                    <option value="">
                      {t.selectState}
                    </option>

                    {states.map(
                      (state) => (
                        <option
                          key={state.id}
                          value={state.id}
                        >
                          {state.name}
                        </option>
                      )
                    )}
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
                  onClick={
                    closeModal
                  }
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

      {deleteOpen &&
        deletingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-6 shadow-2xl dark:border-red-400/20 dark:bg-[#3b0710]">
              <h2 className="text-xl font-bold text-[#64131f] dark:text-white">
                {t.deleteTitle}
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-white/70">
                {t.deleteMessage}
              </p>

              <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 dark:bg-red-500/10 dark:text-red-300">
                {getLocalizedColumnValue(
                  deletingItem,
                  currentLocale
                )}
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setDeleteOpen(
                      false
                    )
                  }
                  disabled={saving}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 dark:border-white/10 dark:text-white/70"
                >
                  {t.cancel}
                </button>

                <button
                  type="button"
                  onClick={
                    confirmDelete
                  }
                  disabled={saving}
                  className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
                >
                  {saving
                    ? t.saving
                    : t.yesDelete}
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}