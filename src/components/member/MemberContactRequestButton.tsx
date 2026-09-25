"use client";

import { useState } from "react";
import { CheckCircle2, Clock3, Send, XCircle } from "lucide-react";

type Locale = "en" | "hi" | "gu";

type Props = {
  locale: Locale;
  memberNumber: number;
  initialStatus?: "NONE" | "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED";
};

const translations = {
  en: {
    request: "Request Contact",
    sending: "Sending...",
    pending: "Request Pending",
    accepted: "Contact Request Accepted",
    rejected: "Request Rejected",
    cancelled: "Request Cancelled",
    sent: "Contact request sent successfully.",
    error: "Unable to send contact request.",
    login: "Please login again and try.",
  },
  hi: {
    request: "संपर्क का अनुरोध करें",
    sending: "भेजा जा रहा है...",
    pending: "अनुरोध लंबित है",
    accepted: "संपर्क अनुरोध स्वीकार किया गया",
    rejected: "अनुरोध अस्वीकार किया गया",
    cancelled: "अनुरोध रद्द किया गया",
    sent: "संपर्क अनुरोध सफलतापूर्वक भेजा गया।",
    error: "संपर्क अनुरोध भेजने में समस्या हुई।",
    login: "कृपया दोबारा लॉगिन करके प्रयास करें।",
  },
  gu: {
    request: "સંપર્ક માટે વિનંતી કરો",
    sending: "મોકલાઈ રહ્યું છે...",
    pending: "વિનંતી પેન્ડિંગ છે",
    accepted: "સંપર્ક વિનંતી સ્વીકારવામાં આવી",
    rejected: "વિનંતી નકારવામાં આવી",
    cancelled: "વિનંતી રદ કરવામાં આવી",
    sent: "સંપર્ક વિનંતી સફળતાપૂર્વક મોકલવામાં આવી.",
    error: "સંપર્ક વિનંતી મોકલી શકાઈ નથી.",
    login: "કૃપા કરીને ફરીથી લોગિન કરીને પ્રયાસ કરો.",
  },
} as const;

export default function MemberContactRequestButton({
  locale,
  memberNumber,
  initialStatus = "NONE",
}: Props) {
  const t = translations[locale];

  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function sendRequest() {
    if (loading || status === "PENDING" || status === "ACCEPTED") {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/member/contact-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memberNumber,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.error || t.error);
        return;
      }

      setStatus("PENDING");
    } catch {
      setError(t.error);
    } finally {
      setLoading(false);
    }
  }

  if (status === "PENDING") {
    return (
      <div className="space-y-2">
        <button
          type="button"
          disabled
          className="
            inline-flex items-center justify-center gap-2 rounded-xl
            bg-gradient-to-r from-amber-500 to-orange-500
            px-5 py-3 text-sm font-semibold text-white
            shadow-lg shadow-orange-500/20
            disabled:cursor-not-allowed disabled:opacity-90
          "
        >
          <Clock3 className="h-4 w-4" />
          {t.pending}
        </button>
      </div>
    );
  }

  if (status === "ACCEPTED") {
    return (
      <button
        type="button"
        disabled
        className="
          inline-flex items-center justify-center gap-2 rounded-xl
          bg-gradient-to-r from-green-600 to-emerald-600
          px-5 py-3 text-sm font-semibold text-white
          shadow-lg shadow-green-500/20
          disabled:cursor-not-allowed disabled:opacity-95
        "
      >
        <CheckCircle2 className="h-4 w-4" />
        {t.accepted}
      </button>
    );
  }

  if (status === "REJECTED") {
    return (
      <div className="space-y-2">
        <button
          type="button"
          onClick={sendRequest}
          disabled={loading}
          className="
            inline-flex items-center justify-center gap-2 rounded-xl
            bg-gradient-to-r from-red-600 to-rose-600
            px-5 py-3 text-sm font-semibold text-white
            shadow-lg shadow-red-500/20
            transition hover:scale-[1.02]
            disabled:cursor-not-allowed disabled:opacity-60
          "
        >
          <Send className="h-4 w-4" />
          {loading ? t.sending : t.request}
        </button>
      </div>
    );
  }

  if (status === "CANCELLED") {
    return (
      <div className="space-y-2">
        <button
          type="button"
          onClick={sendRequest}
          disabled={loading}
          className="
            inline-flex items-center justify-center gap-2 rounded-xl
            bg-gradient-to-r from-red-600 to-rose-600
            px-5 py-3 text-sm font-semibold text-white
            shadow-lg shadow-red-500/20
            transition hover:scale-[1.02]
            disabled:cursor-not-allowed disabled:opacity-60
          "
        >
          <Send className="h-4 w-4" />
          {loading ? t.sending : t.request}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={sendRequest}
        disabled={loading}
        className="
          inline-flex items-center justify-center gap-2 rounded-xl
          bg-gradient-to-r from-red-600 to-rose-600
          px-5 py-3 text-sm font-semibold text-white
          shadow-lg shadow-red-500/20
          transition-all duration-200
          hover:scale-[1.02] hover:shadow-xl hover:shadow-red-500/30
          disabled:cursor-not-allowed disabled:opacity-60
        "
      >
        <Send className="h-4 w-4" />
        {loading ? t.sending : t.request}
      </button>

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-300">
          <XCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}