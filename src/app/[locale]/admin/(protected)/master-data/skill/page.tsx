"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2, CheckCircle2, XCircle } from "lucide-react";

type Translation = {
  id: string;
  locale: string;
  name: string;
};

type Skill = {
  id: string;
  name: string | null;
  isActive: boolean;
  translations: Translation[];
};

const hindi = String.fromCharCode(
  0x0939, 0x093F, 0x0928, 0x094D, 0x0926, 0x0940
);

const gujarati = String.fromCharCode(
  0x0A97, 0x0AC1, 0x0A9C, 0x0AB0,
  0x0ABE, 0x0AA4, 0x0AC0
);

function translation(skill: Skill, locale: string) {
  return (
    skill.translations.find(
      (item) => item.locale === locale
    )?.name || "—"
  );
}

export default function SkillMasterPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);

  const [form, setForm] = useState({
    en: "",
    hi: "",
    gu: "",
    isActive: true,
  });

  async function loadSkills() {
    setLoading(true);

    try {
      const response = await fetch(
        "/api/admin/skill",
        { cache: "no-store" }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Failed to load skills"
        );
      }

      setSkills(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSkills();
  }, []);

  function openAdd() {
    setEditing(null);

    setForm({
      en: "",
      hi: "",
      gu: "",
      isActive: true,
    });

    setShowForm(true);
  }

  function openEdit(skill: Skill) {
    setEditing(skill);

    setForm({
      en: translation(skill, "en") === "—"
        ? ""
        : translation(skill, "en"),
      hi: translation(skill, "hi") === "—"
        ? ""
        : translation(skill, "hi"),
      gu: translation(skill, "gu") === "—"
        ? ""
        : translation(skill, "gu"),
      isActive: skill.isActive,
    });

    setShowForm(true);
  }

  async function saveSkill() {
    if (!form.en.trim()) {
      alert("English skill name is required.");
      return;
    }

    const url = editing
      ? `/api/admin/skill/${editing.id}`
      : "/api/admin/skill";

    const response = await fetch(url, {
      method: editing ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.en,
        isActive: form.isActive,
        translations: {
          en: form.en,
          hi: form.hi,
          gu: form.gu,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data?.error || "Unable to save skill.");
      return;
    }

    setShowForm(false);
    await loadSkills();
  }

  async function toggleStatus(skill: Skill) {
    const response = await fetch(
      `/api/admin/skill/${skill.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: translation(skill, "en"),
          isActive: !skill.isActive,
          translations: {
            en: translation(skill, "en"),
            hi: translation(skill, "hi") === "—"
              ? ""
              : translation(skill, "hi"),
            gu: translation(skill, "gu") === "—"
              ? ""
              : translation(skill, "gu"),
          },
        }),
      }
    );

    if (response.ok) {
      await loadSkills();
    }
  }

  async function deleteSkill(skill: Skill) {
    if (
      !confirm(
        `Delete "${translation(skill, "en")}"?`
      )
    ) {
      return;
    }

    const response = await fetch(
      `/api/admin/skill/${skill.id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      await loadSkills();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#7f1020] dark:text-white">
            Skills Master
          </h1>

          <p className="mt-1 text-sm text-gray-600 dark:text-white/70">
            Manage skills used throughout the ASK Community Portal.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#b40018] px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-[#8f0013]"
        >
          <Plus size={18} />
          Add Skill
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#b40018]/15 bg-white/80 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead>
              <tr className="border-b border-rose-200 bg-rose-50/80 dark:border-rose-900/50 dark:bg-[#520b16]">
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  #
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  English
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  {hindi}
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  {gujarati}
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center"
                  >
                    Loading skills...
                  </td>
                </tr>
              ) : skills.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-gray-500 dark:text-gray-400"
                  >
                    No skills found. Click{" "}
                    <strong>Add Skill</strong> to create one.
                  </td>
                </tr>
              ) : (
                skills.map((skill, index) => (
                  <tr
                    key={skill.id}
                    className="border-b border-gray-100 dark:border-white/5"
                  >
                    <td className="px-5 py-4">
                      {index + 1}
                    </td>

                    <td className="px-5 py-4 font-semibold">
                      {translation(skill, "en")}
                    </td>

                    <td className="px-5 py-4">
                      {translation(skill, "hi")}
                    </td>

                    <td className="px-5 py-4">
                      {translation(skill, "gu")}
                    </td>

                    <td className="px-5 py-4">
                      <button
                        onClick={() =>
                          toggleStatus(skill)
                        }
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${
                          skill.isActive
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                            : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                      >
                        {skill.isActive ? (
                          <CheckCircle2 size={15} />
                        ) : (
                          <XCircle size={15} />
                        )}

                        {skill.isActive
                          ? "Active"
                          : "Inactive"}
                      </button>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            openEdit(skill)
                          }
                          className="rounded-lg border border-gray-300 p-2 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-white/10"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() =>
                            deleteSkill(skill)
                          }
                          className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50 dark:border-red-900/50"
                        >
                          <Trash2 size={17} />
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

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl dark:bg-[#260914]">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {editing ? "Edit Skill" : "Add Skill"}
            </h2>

            <div className="mt-6 space-y-4">
              <input
                value={form.en}
                onChange={(e) =>
                  setForm({
                    ...form,
                    en: e.target.value,
                  })
                }
                placeholder="English skill name *"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 dark:border-gray-700 dark:bg-white/10 dark:text-white"
              />

              <input
                value={form.hi}
                onChange={(e) =>
                  setForm({
                    ...form,
                    hi: e.target.value,
                  })
                }
                placeholder={`${hindi} skill name`}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 dark:border-gray-700 dark:bg-white/10 dark:text-white"
              />

              <input
                value={form.gu}
                onChange={(e) =>
                  setForm({
                    ...form,
                    gu: e.target.value,
                  })
                }
                placeholder={`${gujarati} skill name`}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 dark:border-gray-700 dark:bg-white/10 dark:text-white"
              />

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      isActive: e.target.checked,
                    })
                  }
                />
                <span className="dark:text-white">
                  Active
                </span>
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() =>
                  setShowForm(false)
                }
                className="rounded-xl border border-gray-300 px-5 py-3 dark:border-gray-700 dark:text-white"
              >
                Cancel
              </button>

              <button
                onClick={saveSkill}
                className="rounded-xl bg-[#b40018] px-5 py-3 font-semibold text-white"
              >
                {editing ? "Update Skill" : "Add Skill"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
