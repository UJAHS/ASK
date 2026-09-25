"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  eventId: string;
  locale: string;
};

const text = {
  en: {
    delete: "Delete",
    confirm:
      "Are you sure you want to permanently delete this event?",
    deleting: "Deleting...",
    failed: "Failed to delete event.",
  },

  hi: {
    delete: "हटाएं",
    confirm:
      "क्या आप वाकई इस कार्यक्रम को स्थायी रूप से हटाना चाहते हैं?",
    deleting: "हटाया जा रहा है...",
    failed: "कार्यक्रम हटाने में विफल।",
  },

  gu: {
    delete: "કાઢી નાખો",
    confirm:
      "શું તમે ખરેખર આ કાર્યક્રમને કાયમ માટે કાઢી નાખવા માંગો છો?",
    deleting: "કાઢી રહ્યા છીએ...",
    failed: "કાર્યક્રમ કાઢી નાખવામાં નિષ્ફળ.",
  },
};

export function EventDeleteButton({
  eventId,
  locale,
}: Props) {
  const router = useRouter();

  const language =
    locale === "hi"
      ? "hi"
      : locale === "gu"
      ? "gu"
      : "en";

  const labels = text[language];

  const [deleting, setDeleting] =
    useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      labels.confirm
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);

    try {
      const response = await fetch(
        "/api/admin/events/" + eventId,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || labels.failed
        );
      }

      router.refresh();
    } catch (error) {
      window.alert(
        error instanceof Error
          ? error.message
          : labels.failed
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      className="text-sm font-medium text-red-600 hover:text-red-800 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
    >
      {deleting
        ? labels.deleting
        : labels.delete}
    </button>
  );
}