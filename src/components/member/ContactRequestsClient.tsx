"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Clock3,
  Inbox,
  MapPin,
  Send,
  UserCircle2,
  X,
  XCircle,
} from "lucide-react";

type Locale = "en" | "hi" | "gu";

type Translation = {
  title: string;
  subtitle: string;
  incoming: string;
  outgoing: string;
  loading: string;
  noIncoming: string;
  noOutgoing: string;
  accept: string;
  reject: string;
  cancel: string;
  accepted: string;
  rejected: string;
  pending: string;
  cancelled: string;
  member: string;
  memberId: string;
  sentOn: string;
  receivedOn: string;
  unknown: string;
  error: string;
  retry: string;
};

type RequestStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "CANCELLED";

type RequestMember = {
  id: string;
  memberNumber: number;
  firstName: string | null;
  lastName: string | null;
  profileImage: string | null;
  profession: string | null;
  education: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
};

type RequestItem = {
  id: string;
  status: RequestStatus;
  message: string | null;
  createdAt: string;
  updatedAt: string;
  member: RequestMember;
};

type Props = {
  locale: Locale;
};

const translations: Record<Locale, Translation> = {
  en: {
    title: "Contact Requests",
    subtitle: "Manage your member contact requests.",
    incoming: "Incoming Requests",
    outgoing: "Sent Requests",
    loading: "Loading requests...",
    noIncoming: "You have no incoming contact requests.",
    noOutgoing: "You have not sent any contact requests.",
    accept: "Accept",
    reject: "Reject",
    cancel: "Cancel",
    accepted: "Accepted",
    rejected: "Rejected",
    pending: "Pending",
    cancelled: "Cancelled",
    member: "Member",
    memberId: "Member ID",
    sentOn: "Sent on",
    receivedOn: "Received on",
    unknown: "Member",
    error: "Unable to process request.",
    retry: "Try Again",
  },

  hi: {
    title: "संपर्क अनुरोध",
    subtitle: "अपने सदस्य संपर्क अनुरोधों को प्रबंधित करें।",
    incoming: "प्राप्त अनुरोध",
    outgoing: "भेजे गए अनुरोध",
    loading: "अनुरोध लोड हो रहे हैं...",
    noIncoming: "आपके पास कोई संपर्क अनुरोध नहीं है।",
    noOutgoing: "आपने अभी तक कोई संपर्क अनुरोध नहीं भेजा है।",
    accept: "स्वीकार करें",
    reject: "अस्वीकार करें",
    cancel: "रद्द करें",
    accepted: "स्वीकृत",
    rejected: "अस्वीकृत",
    pending: "लंबित",
    cancelled: "रद्द",
    member: "सदस्य",
    memberId: "सदस्य आईडी",
    sentOn: "भेजा गया",
    receivedOn: "प्राप्त हुआ",
    unknown: "सदस्य",
    error: "अनुरोध संसाधित नहीं किया जा सका।",
    retry: "पुनः प्रयास करें",
  },

  gu: {
    title: "સંપર્ક વિનંતીઓ",
    subtitle: "તમારી સભ્ય સંપર્ક વિનંતીઓ મેનેજ કરો.",
    incoming: "પ્રાપ્ત થયેલી વિનંતીઓ",
    outgoing: "મોકલેલી વિનંતીઓ",
    loading: "વિનંતીઓ લોડ થઈ રહી છે...",
    noIncoming: "તમારી પાસે કોઈ સંપર્ક વિનંતી નથી.",
    noOutgoing: "તમે હજી સુધી કોઈ સંપર્ક વિનંતી મોકલી નથી.",
    accept: "સ્વીકારો",
    reject: "નકારો",
    cancel: "રદ કરો",
    accepted: "સ્વીકારેલ",
    rejected: "નકારેલ",
    pending: "પેન્ડિંગ",
    cancelled: "રદ કરેલ",
    member: "સભ્ય",
    memberId: "સભ્ય આઈડી",
    sentOn: "મોકલેલ",
    receivedOn: "પ્રાપ્ત થયેલ",
    unknown: "સભ્ય",
    error: "વિનંતી પ્રક્રિયા કરી શકાઈ નથી.",
    retry: "ફરી પ્રયાસ કરો",
  },
};

function formatDate(value: string, locale: Locale) {
  const localeMap: Record<Locale, string> = {
    en: "en-IN",
    hi: "hi-IN",
    gu: "gu-IN",
  };

  return new Intl.DateTimeFormat(localeMap[locale], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function getFullName(member: RequestMember, fallback: string) {
  const name = `${member.firstName || ""} ${member.lastName || ""}`.trim();

  return name || fallback;
}

function StatusBadge({
  status,
  t,
}: {
  status: RequestStatus;
  t: Translation;
}) {
  const config: Record<
    RequestStatus,
    {
      label: string;
      icon: typeof Clock3;
      className: string;
    }
  > = {
    PENDING: {
      label: t.pending,
      icon: Clock3,
      className:
        "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-200",
    },

    ACCEPTED: {
      label: t.accepted,
      icon: Check,
      className:
        "bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-200",
    },

    REJECTED: {
      label: t.rejected,
      icon: XCircle,
      className:
        "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-200",
    },

    CANCELLED: {
      label: t.cancelled,
      icon: X,
      className:
        "bg-gray-100 text-gray-700 dark:bg-gray-900/60 dark:text-gray-300",
    },
  };

  const item = config[status];
  const Icon = item.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${item.className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {item.label}
    </span>
  );
}

function RequestCard({
  item,
  type,
  locale,
  t,
  onAction,
  actionId,
}: {
  item: RequestItem;
  type: "incoming" | "outgoing";
  locale: Locale;
  t: Translation;
  onAction: (
    id: string,
    action: "ACCEPT" | "REJECT" | "CANCEL",
  ) => void;
  actionId: string | null;
}) {
  const name = getFullName(item.member, t.unknown);

  const location = [
    item.member.city,
    item.member.state,
    item.member.country,
  ]
    .filter(Boolean)
    .join(", ");

  const isProcessing = actionId === item.id;

  return (
    <div
      className="
        rounded-2xl border border-red-200/70
        bg-gradient-to-br from-[#fff0f2] via-[#ffe0e5] to-[#ffd0d8]
        p-5 shadow-lg shadow-red-900/5
        transition-all duration-200
        hover:-translate-y-0.5 hover:shadow-xl
        dark:border-red-900/60
        dark:from-[#751a28] dark:via-[#64131f] dark:to-[#51101a]
      "
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-4">
          <div
            className="
              flex h-14 w-14 shrink-0 items-center justify-center
              overflow-hidden rounded-xl
              bg-gradient-to-br from-red-600 to-rose-500
              text-white shadow-md
            "
          >
            {item.member.profileImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.member.profileImage}
                alt={name}
                className="h-full w-full object-cover"
              />
            ) : (
              <UserCircle2 className="h-8 w-8" />
            )}
          </div>

          <div className="min-w-0">
            <h3 className="text-lg font-bold text-red-950 dark:text-white">
              {name}
            </h3>

            <p className="mt-1 text-xs font-semibold text-red-700 dark:text-red-200">
              {t.memberId}: #{item.member.memberNumber}
            </p>

            {item.member.profession && (
              <p className="mt-2 text-sm text-red-800 dark:text-red-100">
                {item.member.profession}
              </p>
            )}

            {location && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-red-700 dark:text-red-200">
                <MapPin className="h-3.5 w-3.5" />
                {location}
              </div>
            )}
          </div>
        </div>

        <StatusBadge status={item.status} t={t} />
      </div>

      <div className="mt-5 border-t border-red-200/70 pt-4 dark:border-red-900/50">
        <p className="text-xs text-red-700 dark:text-red-200">
          {type === "incoming" ? t.receivedOn : t.sentOn}:{" "}
          <span className="font-semibold">
            {formatDate(item.createdAt, locale)}
          </span>
        </p>

        {item.message && (
          <p className="mt-3 rounded-xl bg-white/50 p-3 text-sm text-red-900 dark:bg-black/10 dark:text-red-100">
            {item.message}
          </p>
        )}

        {item.status === "PENDING" && (
          <div className="mt-4 flex flex-wrap gap-2">
            {type === "incoming" ? (
              <>
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => onAction(item.id, "ACCEPT")}
                  className="
                    inline-flex items-center gap-2 rounded-xl
                    bg-gradient-to-r from-green-600 to-emerald-600
                    px-4 py-2.5 text-sm font-semibold text-white
                    shadow-md transition hover:scale-[1.02]
                    disabled:cursor-not-allowed disabled:opacity-60
                  "
                >
                  <Check className="h-4 w-4" />
                  {isProcessing ? "..." : t.accept}
                </button>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => onAction(item.id, "REJECT")}
                  className="
                    inline-flex items-center gap-2 rounded-xl
                    border border-red-300 bg-white/70
                    px-4 py-2.5 text-sm font-semibold text-red-700
                    transition hover:bg-red-50
                    disabled:cursor-not-allowed disabled:opacity-60
                    dark:border-red-800 dark:bg-[#51101a]
                    dark:text-red-200 dark:hover:bg-[#64131f]
                  "
                >
                  <X className="h-4 w-4" />
                  {isProcessing ? "..." : t.reject}
                </button>
              </>
            ) : (
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => onAction(item.id, "CANCEL")}
                className="
                  inline-flex items-center gap-2 rounded-xl
                  border border-red-300 bg-white/70
                  px-4 py-2.5 text-sm font-semibold text-red-700
                  transition hover:bg-red-50
                  disabled:cursor-not-allowed disabled:opacity-60
                  dark:border-red-800 dark:bg-[#51101a]
                  dark:text-red-200 dark:hover:bg-[#64131f]
                "
              >
                <X className="h-4 w-4" />
                {isProcessing ? "..." : t.cancel}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ContactRequestsClient({ locale }: Props) {
  const t = translations[locale];

  const [incoming, setIncoming] = useState<RequestItem[]>([]);
  const [outgoing, setOutgoing] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function loadRequests() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/member/contact-requests", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.error || t.error);
        return;
      }

      setIncoming(Array.isArray(data?.incoming) ? data.incoming : []);
      setOutgoing(Array.isArray(data?.outgoing) ? data.outgoing : []);
    } catch {
      setError(t.error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadRequests();
  }, []);

  async function handleAction(
    id: string,
    action: "ACCEPT" | "REJECT" | "CANCEL",
  ) {
    setActionId(id);
    setError("");

    try {
      const response = await fetch(`/api/member/contact-requests/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.error || t.error);
        return;
      }

      await loadRequests();
    } catch {
      setError(t.error);
    } finally {
      setActionId(null);
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <section
        className="
          rounded-3xl border border-red-200/70
          bg-gradient-to-br from-[#fff0f2] via-[#ffe0e5] to-[#ffd0d8]
          p-6 shadow-xl shadow-red-900/10
          dark:border-red-900/60
          dark:from-[#751a28] dark:via-[#64131f] dark:to-[#51101a]
          md:p-8
        "
      >
        <div className="flex items-center gap-4">
          <div
            className="
              rounded-2xl bg-gradient-to-br from-red-600 to-rose-500
              p-3 text-white shadow-lg shadow-red-500/20
            "
          >
            <Inbox className="h-7 w-7" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-red-950 dark:text-white md:text-3xl">
              {t.title}
            </h1>

            <p className="mt-1 text-sm text-red-700 dark:text-red-200">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      {error && (
        <div
          className="
            flex items-center justify-between gap-4 rounded-2xl
            border border-red-300 bg-red-50 p-4
            text-sm text-red-800
            dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-200
          "
        >
          <span>{error}</span>

          <button
            type="button"
            onClick={() => void loadRequests()}
            className="
              inline-flex shrink-0 items-center gap-2 rounded-lg
              bg-red-600 px-3 py-2 text-xs font-semibold text-white
              hover:bg-red-700
            "
          >
            {t.retry}
          </button>
        </div>
      )}

      {loading ? (
        <div
          className="
            rounded-2xl border border-red-200/70
            bg-white/50 p-10 text-center
            text-sm text-red-700
            dark:border-red-900/60 dark:bg-[#51101a]/50
            dark:text-red-200
          "
        >
          {t.loading}
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-2">
          <section>
            <div className="mb-4 flex items-center gap-3">
              <Inbox className="h-5 w-5 text-red-600 dark:text-red-300" />

              <h2 className="text-xl font-bold text-red-950 dark:text-white">
                {t.incoming}
              </h2>
            </div>

            {incoming.length === 0 ? (
              <div
                className="
                  rounded-2xl border border-dashed border-red-300
                  bg-white/40 p-8 text-center text-sm
                  text-red-700
                  dark:border-red-900/60 dark:bg-[#51101a]/40
                  dark:text-red-200
                "
              >
                {t.noIncoming}
              </div>
            ) : (
              <div className="space-y-4">
                {incoming.map((item) => (
                  <RequestCard
                    key={item.id}
                    item={item}
                    type="incoming"
                    locale={locale}
                    t={t}
                    onAction={handleAction}
                    actionId={actionId}
                  />
                ))}
              </div>
            )}
          </section>

          <section>
            <div className="mb-4 flex items-center gap-3">
              <Send className="h-5 w-5 text-red-600 dark:text-red-300" />

              <h2 className="text-xl font-bold text-red-950 dark:text-white">
                {t.outgoing}
              </h2>
            </div>

            {outgoing.length === 0 ? (
              <div
                className="
                  rounded-2xl border border-dashed border-red-300
                  bg-white/40 p-8 text-center text-sm
                  text-red-700
                  dark:border-red-900/60 dark:bg-[#51101a]/40
                  dark:text-red-200
                "
              >
                {t.noOutgoing}
              </div>
            ) : (
              <div className="space-y-4">
                {outgoing.map((item) => (
                  <RequestCard
                    key={item.id}
                    item={item}
                    type="outgoing"
                    locale={locale}
                    t={t}
                    onAction={handleAction}
                    actionId={actionId}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}