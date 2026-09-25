"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";

type Locale = "en" | "hi" | "gu";

type Profile = {
  id: string;
  firstName: string;
  lastName: string | null;
  gender: string;
  dateOfBirth: string | null;
  maritalStatus: string;
  education: string | null;
  profession: string | null;
  city: string | null;
  state: string | null;
  profileImage: string | null;
  status: string;
  user: {
    email: string;
    memberNumber: number;
    status: string;
  };
};

const translations: Record<
  Locale,
  {
    title: string;
    subtitle: string;
    add: string;
    search: string;
    allGender: string;
    male: string;
    female: string;
    other: string;
    allMarital: string;
    neverMarried: string;
    divorced: string;
    widowed: string;
    separated: string;
    allStatus: string;
    pending: string;
    approved: string;
    rejected: string;
    blocked: string;
    name: string;
    member: string;
    gender: string;
    marital: string;
    profession: string;
    location: string;
    status: string;
    actions: string;
    view: string;
    edit: string;
    approve: string;
    reject: string;
    block: string;
    delete: string;
    loading: string;
    noData: string;
    confirmDelete: string;
    confirmMessage: string;
    cancel: string;
    yesDelete: string;
    updated: string;
    updateFailed: string;
    deleted: string;
    deleteFailed: string;
  }
> = {
  en: {
    title: "Matrimonial Profiles",
    subtitle: "Manage community matrimonial profiles",
    add: "Add Profile",
    search: "Search name, email, city, state or profession...",
    allGender: "All Gender",
    male: "Male",
    female: "Female",
    other: "Other",
    allMarital: "All Marital Status",
    neverMarried: "Never Married",
    divorced: "Divorced",
    widowed: "Widowed",
    separated: "Separated",
    allStatus: "All Status",
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    blocked: "Blocked",
    name: "Name",
    member: "Member",
    gender: "Gender",
    marital: "Marital Status",
    profession: "Profession",
    location: "Location",
    status: "Status",
    actions: "Actions",
    view: "View",
    edit: "Edit",
    approve: "Approve",
    reject: "Reject",
    block: "Block",
    delete: "Delete",
    loading: "Loading...",
    noData: "No matrimonial profiles found.",
    confirmDelete: "Delete Matrimonial Profile?",
    confirmMessage: "This action cannot be undone.",
    cancel: "Cancel",
    yesDelete: "Yes, Delete",
    updated: "Profile status updated successfully.",
    updateFailed: "Failed to update profile status.",
    deleted: "Profile deleted successfully.",
    deleteFailed: "Failed to delete profile.",
  },

  hi: {
    title: "वैवाहिक प्रोफ़ाइल",
    subtitle: "सामुदायिक वैवाहिक प्रोफ़ाइल प्रबंधित करें",
    add: "प्रोफ़ाइल जोड़ें",
    search: "नाम, ईमेल, शहर, राज्य या व्यवसाय खोजें...",
    allGender: "सभी लिंग",
    male: "पुरुष",
    female: "महिला",
    other: "अन्य",
    allMarital: "सभी वैवाहिक स्थिति",
    neverMarried: "कभी विवाहित नहीं",
    divorced: "तलाकशुदा",
    widowed: "विधवा/विधुर",
    separated: "अलग",
    allStatus: "सभी स्थिति",
    pending: "लंबित",
    approved: "स्वीकृत",
    rejected: "अस्वीकृत",
    blocked: "ब्लॉक",
    name: "नाम",
    member: "सदस्य",
    gender: "लिंग",
    marital: "वैवाहिक स्थिति",
    profession: "व्यवसाय",
    location: "स्थान",
    status: "स्थिति",
    actions: "कार्य",
    view: "देखें",
    edit: "संपादित करें",
    approve: "स्वीकृत करें",
    reject: "अस्वीकार करें",
    block: "ब्लॉक करें",
    delete: "हटाएँ",
    loading: "लोड हो रहा है...",
    noData: "कोई वैवाहिक प्रोफ़ाइल नहीं मिली।",
    confirmDelete: "वैवाहिक प्रोफ़ाइल हटाएँ?",
    confirmMessage: "यह कार्रवाई पूर्ववत नहीं की जा सकती।",
    cancel: "रद्द करें",
    yesDelete: "हाँ, हटाएँ",
    updated: "प्रोफ़ाइल की स्थिति सफलतापूर्वक अपडेट हुई।",
    updateFailed: "प्रोफ़ाइल की स्थिति अपडेट करने में विफल।",
    deleted: "प्रोफ़ाइल सफलतापूर्वक हटा दी गई।",
    deleteFailed: "प्रोफ़ाइल हटाने में विफल।",
  },

  gu: {
    title: "\u0ab5\u0abf\u0ab5\u0abe\u0ab9 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2",
    subtitle: "\u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0aa8\u0abe \u0ab5\u0abf\u0ab5\u0abe\u0ab9 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2\u0acb\u0aa8\u0ac1\u0a82 \u0ab8\u0a82\u0a9a\u0abe\u0ab2\u0aa8 \u0a95\u0ab0\u0acb",
    add: "\u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0a89\u0aae\u0ac7\u0ab0\u0acb",
    search: "\u0aa8\u0abe\u0aae, \u0a87\u0aae\u0ac7\u0a87\u0ab2, \u0ab6\u0ab9\u0ac7\u0ab0, \u0ab0\u0abe\u0a9c\u0acd\u0aaf \u0a85\u0aa5\u0ab5\u0abe \u0ab5\u0acd\u0aaf\u0ab5\u0ab8\u0abe\u0aaf \u0ab6\u0acb\u0aa7\u0acb...",
    allGender: "\u0aac\u0aa7\u0abe \u0ab2\u0abf\u0a82\u0a97",
    male: "\u0aaa\u0ac1\u0ab0\u0ac1\u0ab7",
    female: "\u0ab8\u0acd\u0aa4\u0acd\u0ab0\u0ac0",
    other: "\u0a85\u0aa8\u0acd\u0aaf",
    allMarital: "\u0aac\u0aa7\u0ac0 \u0ab5\u0ac8\u0ab5\u0abe\u0ab9\u0abf\u0a95 \u0ab8\u0acd\u0aa5\u0abf\u0aa4\u0abf",
    neverMarried: "\u0a95\u0acd\u0aaf\u0abe\u0ab0\u0ac7 \u0aaa\u0aa3 \u0aaa\u0acd\u0ab0\u0aa3\u0ac0\u0aa4 \u0aa8\u0aa5\u0ac0",
    divorced: "\u0a9b\u0ac2\u0a9f\u0abe\u0a9b\u0ac7\u0aa1\u0abe",
    widowed: "\u0ab5\u0abf\u0aa7\u0ab5\u0abe/\u0ab5\u0abf\u0aa7\u0ac1\u0ab0",
    separated: "\u0a85\u0ab2\u0a97",
    allStatus: "\u0aac\u0aa7\u0ac0 \u0ab8\u0acd\u0aa5\u0abf\u0aa4\u0abf",
    pending: "\u0aac\u0abe\u0a95\u0ac0",
    approved: "\u0aae\u0a82\u0a9c\u0ac2\u0ab0",
    rejected: "\u0aa8\u0abe\u0a95\u0abe\u0ab0\u0ac7\u0ab2",
    blocked: "\u0aac\u0acd\u0ab2\u0acb\u0a95",
    name: "\u0aa8\u0abe\u0aae",
    member: "\u0ab8\u0aad\u0acd\u0aaf",
    gender: "\u0ab2\u0abf\u0a82\u0a97",
    marital: "\u0ab5\u0ac8\u0ab5\u0abe\u0ab9\u0abf\u0a95 \u0ab8\u0acd\u0aa5\u0abf\u0aa4\u0abf",
    profession: "\u0ab5\u0acd\u0aaf\u0ab5\u0ab8\u0abe\u0aaf",
    location: "\u0ab8\u0acd\u0aa5\u0ab3",
    status: "\u0ab8\u0acd\u0aa5\u0abf\u0aa4\u0abf",
    actions: "\u0a95\u0acd\u0ab0\u0abf\u0aaf\u0abe\u0a93",
    view: "\u0a9c\u0ac1\u0a93",
    edit: "\u0aab\u0ac7\u0ab0\u0aab\u0abe\u0ab0 \u0a95\u0ab0\u0acb",
    approve: "\u0aae\u0a82\u0a9c\u0ac2\u0ab0 \u0a95\u0ab0\u0acb",
    reject: "\u0aa8\u0abe\u0a95\u0abe\u0ab0\u0acb",
    block: "\u0aac\u0acd\u0ab2\u0acb\u0a95 \u0a95\u0ab0\u0acb",
    delete: "\u0a95\u0abe\u0aa2\u0ac0 \u0aa8\u0abe\u0a96\u0acb",
    loading: "\u0ab2\u0acb\u0aa1 \u0aa5\u0a88 \u0ab0\u0ab9\u0acd\u0aaf\u0ac1\u0a82 \u0a9b\u0ac7...",
    noData: "\u0a95\u0acb\u0a88 \u0ab5\u0abf\u0ab5\u0abe\u0ab9 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0aae\u0ab3\u0ac0 \u0aa8\u0aa5\u0ac0.",
    confirmDelete: "\u0ab5\u0abf\u0ab5\u0abe\u0ab9 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0a95\u0abe\u0aa2\u0ac0 \u0aa8\u0abe\u0a96\u0ab5\u0ac0?",
    confirmMessage: "\u0a86 \u0a95\u0acd\u0ab0\u0abf\u0aaf\u0abe \u0aaa\u0ac2\u0ab0\u0acd\u0ab5\u0ab5\u0aa4\u0acd \u0a95\u0ab0\u0ac0 \u0ab6\u0a95\u0abe\u0ab6\u0ac7 \u0aa8\u0ab9\u0ac0\u0a82.",
    cancel: "\u0ab0\u0aa6 \u0a95\u0ab0\u0acb",
    yesDelete: "\u0ab9\u0abe, \u0a95\u0abe\u0aa2\u0ac0 \u0aa8\u0abe\u0a96\u0acb",
    updated: "\u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2\u0aa8\u0ac0 \u0ab8\u0acd\u0aa5\u0abf\u0aa4\u0abf \u0ab8\u0aab\u0ab3\u0aa4\u0abe\u0aaa\u0ac2\u0ab0\u0acd\u0ab5\u0a95 \u0a85\u0aaa\u0aa1\u0ac7\u0a9f \u0aa5\u0a88.",
    updateFailed: "\u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2\u0aa8\u0ac0 \u0ab8\u0acd\u0aa5\u0abf\u0aa4\u0abf \u0a85\u0aaa\u0aa1\u0ac7\u0a9f \u0a95\u0ab0\u0ab5\u0abe\u0aae\u0abe\u0a82 \u0aa8\u0abf\u0ab7\u0acd\u0aab\u0ab3.",
    deleted: "\u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0ab8\u0aab\u0ab3\u0aa4\u0abe\u0aaa\u0ac2\u0ab0\u0acd\u0ab5\u0a95 \u0a95\u0abe\u0aa2\u0ac0 \u0aa8\u0abe\u0a96\u0ab5\u0abe\u0aae\u0abe\u0a82 \u0a86\u0ab5\u0acd\u0aaf\u0ac1\u0a82.",
    deleteFailed: "\u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0a95\u0abe\u0aa2\u0ab5\u0abe\u0aae\u0abe\u0a82 \u0aa8\u0abf\u0ab7\u0acd\u0aab\u0ab3.",
  },
};

function statusClass(status: string) {
  if (status === "APPROVED") {
    return "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400";
  }

  if (status === "PENDING") {
    return "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400";
  }

  if (status === "REJECTED") {
    return "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400";
  }

  return "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-200";
}

export default function MatrimonialPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = use(params);

  const locale: Locale =
    rawLocale === "hi" || rawLocale === "gu"
      ? rawLocale
      : "en";

  const t = translations[locale];

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");

  async function loadProfiles() {
    try {
      setLoading(true);

      const query = new URLSearchParams();

      if (search.trim()) query.set("search", search.trim());
      if (gender) query.set("gender", gender);
      if (maritalStatus) {
        query.set("maritalStatus", maritalStatus);
      }
      if (status) query.set("status", status);

      const response = await fetch(
        `/api/admin/matrimonial?${query.toString()}`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load profiles");
      }

      const data = await response.json();
      setProfiles(Array.isArray(data) ? data : []);
    } catch {
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      loadProfiles();
    }, 250);

    return () => clearTimeout(timer);
  }, [search, gender, maritalStatus, status]);

  async function updateStatus(
    id: string,
    nextStatus: string
  ) {
    try {
      const response = await fetch(
        `/api/admin/matrimonial/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: nextStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Update failed");
      }

      setMessage(t.updated);
      await loadProfiles();

      setTimeout(() => setMessage(""), 3000);
    } catch {
      setMessage(t.updateFailed);

      setTimeout(() => setMessage(""), 3000);
    }
  }

  async function deleteProfile() {
    if (!deleteId) return;

    try {
      setDeleting(true);

      const response = await fetch(
        `/api/admin/matrimonial/${deleteId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      setDeleteId(null);
      setMessage(t.deleted);

      await loadProfiles();

      setTimeout(() => setMessage(""), 3000);
    } catch {
      setMessage(t.deleteFailed);

      setTimeout(() => setMessage(""), 3000);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {t.title}
            </h1>

            <p className="mt-1 text-sm text-slate-600 dark:text-red-100/75">
              {t.subtitle}
            </p>
          </div>

          <Link
            href={`/${locale}/admin/matrimonial/new`}
            className="inline-flex items-center justify-center rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-950/20 transition hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-500"
          >
            + {t.add}
          </Link>
        </div>

        {message && (
          <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 shadow-sm dark:border-green-800/60 dark:bg-green-950/30 dark:text-green-300">
            {message}
          </div>
        )}

        <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-4">
          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder={t.search}
            className="rounded-xl border border-red-200 bg-white/90 px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/10 dark:border-red-900/80 dark:bg-[#64131f] dark:text-white dark:focus:border-red-500"
          />

          <select
            value={gender}
            onChange={(event) =>
              setGender(event.target.value)
            }
            className="rounded-xl border border-red-200 bg-white/90 px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/10 dark:border-red-900/80 dark:bg-[#64131f] dark:text-white dark:focus:border-red-500"
          >
            <option value="">{t.allGender}</option>
            <option value="MALE">{t.male}</option>
            <option value="FEMALE">{t.female}</option>
            <option value="OTHER">{t.other}</option>
          </select>

          <select
            value={maritalStatus}
            onChange={(event) =>
              setMaritalStatus(event.target.value)
            }
            className="rounded-xl border border-red-200 bg-white/90 px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/10 dark:border-red-900/80 dark:bg-[#64131f] dark:text-white dark:focus:border-red-500"
          >
            <option value="">{t.allMarital}</option>
            <option value="NEVER_MARRIED">
              {t.neverMarried}
            </option>
            <option value="DIVORCED">{t.divorced}</option>
            <option value="WIDOWED">{t.widowed}</option>
            <option value="SEPARATED">{t.separated}</option>
          </select>

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
            className="rounded-xl border border-red-200 bg-white/90 px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/10 dark:border-red-900/80 dark:bg-[#64131f] dark:text-white dark:focus:border-red-500"
          >
            <option value="">{t.allStatus}</option>
            <option value="PENDING">{t.pending}</option>
            <option value="APPROVED">{t.approved}</option>
            <option value="REJECTED">{t.rejected}</option>
            <option value="BLOCKED">{t.blocked}</option>
          </select>
        </div>

        <div className="overflow-hidden rounded-2xl border border-red-200/80 bg-gradient-to-br from-[#fff0f2] via-[#ffe0e5] to-[#ffd0d8] shadow-xl shadow-red-950/10 dark:border-red-900/80 dark:bg-gradient-to-br dark:from-[#751a28] dark:via-[#64131f] dark:to-[#51101a]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead className="border-b border-red-200/80 bg-white/50 dark:border-red-900/70 dark:bg-[#51101a]/70">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-red-100/70">
                    {t.name}
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-red-100/70">
                    {t.member}
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-red-100/70">
                    {t.gender}
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-red-100/70">
                    {t.marital}
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-red-100/70">
                    {t.profession}
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-red-100/70">
                    {t.location}
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-red-100/70">
                    {t.status}
                  </th>
                  <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-red-100/70">
                    {t.actions}
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-red-100 dark:divide-red-900/60">
                {loading ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-5 py-12 text-center text-sm text-slate-600 dark:text-red-100/70"
                    >
                      {t.loading}
                    </td>
                  </tr>
                ) : profiles.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-5 py-12 text-center text-sm text-slate-600 dark:text-red-100/70"
                    >
                      {t.noData}
                    </td>
                  </tr>
                ) : (
                  profiles.map((profile) => (
                    <tr
                      key={profile.id}
                      className="transition-colors hover:bg-white/60 dark:hover:bg-[#7f1f2e]/40"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {profile.profileImage ? (
                            <img
                              src={profile.profileImage}
                              alt=""
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 font-bold text-red-700 dark:bg-red-950/50 dark:text-red-200">
                              {profile.firstName
                                .charAt(0)
                                .toUpperCase()}
                            </div>
                          )}

                          <div>
                            <div className="font-semibold text-slate-900 dark:text-white">
                              {profile.firstName}{" "}
                              {profile.lastName || ""}
                            </div>

                            <div className="text-xs text-slate-600 dark:text-red-100/70">
                              {profile.user.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm font-medium text-slate-700 dark:text-red-50/90">
                        #{profile.user.memberNumber}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600 dark:text-red-50/80">
                        {profile.gender === "MALE"
                          ? t.male
                          : profile.gender === "FEMALE"
                            ? t.female
                            : t.other}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600 dark:text-red-50/80">
                        {profile.maritalStatus ===
                        "NEVER_MARRIED"
                          ? t.neverMarried
                          : profile.maritalStatus ===
                              "DIVORCED"
                            ? t.divorced
                            : profile.maritalStatus ===
                                "WIDOWED"
                              ? t.widowed
                              : t.separated}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600 dark:text-red-50/80">
                        {profile.profession || "—"}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600 dark:text-red-50/80">
                        {[
                          profile.city,
                          profile.state,
                        ]
                          .filter(Boolean)
                          .join(", ") || "—"}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                            profile.status
                          )}`}
                        >
                          {profile.status === "APPROVED"
                            ? t.approved
                            : profile.status === "REJECTED"
                              ? t.rejected
                              : profile.status === "BLOCKED"
                                ? t.blocked
                                : t.pending}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/${locale}/admin/matrimonial/${profile.id}`}
                            className="rounded-md border border-red-200 bg-white/50 px-3 py-1.5 text-xs font-semibold text-red-800 transition hover:bg-white dark:border-red-900 dark:bg-transparent dark:text-red-50 dark:hover:bg-red-900/40"
                          >
                            {t.view}
                          </Link>

                          <Link
                            href={`/${locale}/admin/matrimonial/${profile.id}/edit`}
                            className="rounded-md bg-red-700 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-500"
                          >
                            {t.edit}
                          </Link>

                          {profile.status !== "APPROVED" && (
                            <button
                              type="button"
                              onClick={() =>
                                updateStatus(
                                  profile.id,
                                  "APPROVED"
                                )
                              }
                              className="rounded-md border border-green-200 px-3 py-1.5 text-xs font-semibold text-green-600 hover:bg-green-50 dark:border-green-900/50 dark:text-green-400 dark:hover:bg-green-950/30"
                            >
                              {t.approve}
                            </button>
                          )}

                          {profile.status !== "REJECTED" && (
                            <button
                              type="button"
                              onClick={() =>
                                updateStatus(
                                  profile.id,
                                  "REJECTED"
                                )
                              }
                              className="rounded-md border border-yellow-200 px-3 py-1.5 text-xs font-semibold text-yellow-700 hover:bg-yellow-50 dark:border-yellow-900/50 dark:text-yellow-400 dark:hover:bg-yellow-950/30"
                            >
                              {t.reject}
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              setDeleteId(profile.id)
                            }
                            className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 dark:border-red-900/60 dark:text-red-400 dark:hover:bg-red-950/30"
                          >
                            {t.delete}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#64131f]">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {t.confirmDelete}
            </h2>

            <p className="mt-2 text-sm text-slate-600 dark:text-red-100/70">
              {t.confirmMessage}
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setDeleteId(null)}
                className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-800 transition hover:bg-red-50 dark:border-red-900 dark:text-red-50 dark:hover:bg-red-900/40"
              >
                {t.cancel}
              </button>

              <button
                type="button"
                disabled={deleting}
                onClick={deleteProfile}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? t.loading : t.yesDelete}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}