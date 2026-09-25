import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, MapPin, Users, Heart } from "lucide-react";

type Locale = "en" | "hi" | "gu";

const content: Record<
  Locale,
  {
    badge: string;
    title: string;
    titleAccent: string;
    description: string;
    emptyTitle: string;
    emptyDescription: string;
    joinTitle: string;
    joinDescription: string;
    joinButton: string;
    viewEvents: string;
    learnMore: string;
    community: string;
    activity: string;
    date: string;
    location: string;
    ongoing: string;
  }
> = {
  en: {
    badge: "OUR ACTIVITIES",
    title: "Building Community",
    titleAccent: "Through Action",
    description:
      "Discover the activities, initiatives, and community programs that bring ASK members together and create meaningful social impact.",
    emptyTitle: "No activities available",
    emptyDescription:
      "New community activities will appear here as soon as they are published.",
    joinTitle: "Be Part of the Community",
    joinDescription:
      "Join ASK and participate in meaningful activities, cultural programs, social initiatives, and community events.",
    joinButton: "Become a Member",
    viewEvents: "View Events",
    learnMore: "Learn More",
    community: "Community",
    activity: "Activity",
    date: "Date",
    location: "Location",
    ongoing: "Ongoing",
  },
  hi: {
    badge: "हमारी गतिविधियां",
    title: "समुदाय का निर्माण",
    titleAccent: "साथ मिलकर",
    description:
      "ASK सदस्यों को जोड़ने और सार्थक सामाजिक प्रभाव पैदा करने वाली गतिविधियों, पहलों और सामुदायिक कार्यक्रमों को जानें।",
    emptyTitle: "अभी कोई गतिविधि उपलब्ध नहीं है",
    emptyDescription:
      "नई सामुदायिक गतिविधियां प्रकाशित होते ही यहां दिखाई देंगी।",
    joinTitle: "समुदाय का हिस्सा बनें",
    joinDescription:
      "ASK से जुड़ें और सामाजिक गतिविधियों, सांस्कृतिक कार्यक्रमों और सामुदायिक आयोजनों में भाग लें।",
    joinButton: "सदस्य बनें",
    viewEvents: "कार्यक्रम देखें",
    learnMore: "और जानें",
    community: "समुदाय",
    activity: "गतिविधि",
    date: "दिनांक",
    location: "स्थान",
    ongoing: "जारी",
  },
  gu: {
    badge: "અમારી પ્રવૃત્તિઓ",
    title: "સમુદાયનું નિર્માણ",
    titleAccent: "સાથે મળીને",
    description:
      "ASK સભ્યોને જોડતી અને અર્થપૂર્ણ સામાજિક અસર ઊભી કરતી પ્રવૃત્તિઓ, પહેલો અને સામુદાયિક કાર્યક્રમો વિશે જાણો.",
    emptyTitle: "હાલમાં કોઈ પ્રવૃત્તિ ઉપલબ્ધ નથી",
    emptyDescription:
      "નવી સામુદાયિક પ્રવૃત્તિ પ્રકાશિત થતાં જ અહીં દેખાશે.",
    joinTitle: "સમુદાયનો ભાગ બનો",
    joinDescription:
      "ASK સાથે જોડાઓ અને સામાજિક પ્રવૃત્તિઓ, સાંસ્કૃતિક કાર્યક્રમો અને સામુદાયિક કાર્યક્રમોમાં ભાગ લો.",
    joinButton: "સભ્ય બનો",
    viewEvents: "કાર્યક્રમો જુઓ",
    learnMore: "વધુ જાણો",
    community: "સમુદાય",
    activity: "પ્રવૃત્તિ",
    date: "તારીખ",
    location: "સ્થળ",
    ongoing: "ચાલુ",
  },
};

function getLocale(value: string): Locale {
  if (value === "hi" || value === "gu") return value;
  return "en";
}

function formatDate(date: Date, locale: Locale) {
  const localeMap: Record<Locale, string> = {
    en: "en-IN",
    hi: "hi-IN",
    gu: "gu-IN",
  };

  return new Intl.DateTimeFormat(localeMap[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function ActivitiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = getLocale(rawLocale);
  const t = content[locale];

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const activities = await prisma.activity.findMany({
    where: {
      status: "PUBLISHED",
      OR: [
        {
          activityDate: {
            gte: oneYearAgo,
          },
        },
        {
          activityDate: null,
          createdAt: {
            gte: oneYearAgo,
          },
        },
      ],
    },
    orderBy: [
      {
        activityDate: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fff8f9] via-[#fcebed] to-[#f6dfe3] text-[#3b0710] dark:from-[#210308] dark:via-[#3b0710] dark:to-[#180206] dark:text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#b40018]/10 dark:border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(180,0,24,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(139,18,40,0.12),transparent_35%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(239,0,29,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(180,0,24,0.14),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#b40018]/20 bg-white/70 px-4 py-2 text-xs font-bold tracking-[0.22em] text-[#b40018] shadow-sm backdrop-blur dark:border-[#ef001d]/30 dark:bg-white/5 dark:text-[#ff7182]">
              <Heart className="h-4 w-4 fill-current" />
              {t.badge}
            </div>

            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              {t.title}
              <span className="block bg-gradient-to-r from-[#8b1228] via-[#b40018] to-[#ef001d] bg-clip-text text-transparent dark:from-[#ff6b7d] dark:via-[#ef3349] dark:to-[#ff8a98]">
                {t.titleAccent}
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#6b2733] sm:text-lg dark:text-[#f2cbd0]">
              {t.description}
            </p>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        {activities.length === 0 ? (
          <div className="rounded-3xl border border-[#b40018]/10 bg-white/80 p-12 text-center shadow-xl shadow-[#8b1228]/5 backdrop-blur dark:border-white/10 dark:bg-white/5">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#b40018]/10 text-[#b40018] dark:bg-[#ef001d]/15 dark:text-[#ff7182]">
              <Users className="h-8 w-8" />
            </div>

            <h2 className="mt-6 text-2xl font-bold">{t.emptyTitle}</h2>

            <p className="mx-auto mt-3 max-w-xl text-[#6b2733] dark:text-[#e5b9c0]">
              {t.emptyDescription}
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => {
              const displayDate = activity.activityDate ?? activity.createdAt;

              return (
                <article
                  key={activity.id}
                  className="group overflow-hidden rounded-3xl border border-[#b40018]/10 bg-white shadow-xl shadow-[#8b1228]/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#8b1228]/15 dark:border-white/10 dark:bg-[#4a0b16] dark:shadow-black/20"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#b40018] to-[#64131f]">
                    {activity.image ? (
                      <Image
                        src={activity.image}
                        alt={activity.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Heart className="h-16 w-16 text-white/70" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {activity.category && (
                      <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#8b1228] shadow-lg backdrop-blur dark:bg-[#3b0710]/90 dark:text-[#ff8a98]">
                        {activity.category}
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-sm font-medium text-white">
                      <CalendarDays className="h-4 w-4" />
                      {formatDate(displayDate, locale)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold leading-tight text-[#3b0710] transition-colors group-hover:text-[#b40018] dark:text-white dark:group-hover:text-[#ff7182]">
                      {activity.title}
                    </h2>

                    {activity.description && (
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#6b2733] dark:text-[#e5b9c0]">
                        {activity.description}
                      </p>
                    )}

                    <div className="mt-5 space-y-2">
                      {activity.location && (
                        <div className="flex items-center gap-2 text-sm text-[#7a3b47] dark:text-[#dcaab3]">
                          <MapPin className="h-4 w-4 shrink-0 text-[#b40018] dark:text-[#ff7182]" />
                          <span className="line-clamp-1">{activity.location}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-sm text-[#7a3b47] dark:text-[#dcaab3]">
                        <Users className="h-4 w-4 shrink-0 text-[#b40018] dark:text-[#ff7182]" />
                        <span>{t.community}</span>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-[#b40018]/10 pt-5 dark:border-white/10">
                      <div className="inline-flex items-center gap-2 text-sm font-bold text-[#b40018] transition-all group-hover:gap-3 dark:text-[#ff7182]">
                        {t.learnMore}
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Community CTA */}
      <section className="px-6 pb-20 sm:px-8 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#8b1228] via-[#b40018] to-[#64131f] px-8 py-14 text-white shadow-2xl shadow-[#8b1228]/20 sm:px-12 lg:px-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-black/10 blur-3xl" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-2 text-white/80">
                <Heart className="h-5 w-5 fill-current" />
                <span className="text-sm font-bold uppercase tracking-[0.18em]">
                  {t.activity}
                </span>
              </div>

              <h2 className="text-3xl font-black sm:text-4xl">
                {t.joinTitle}
              </h2>

              <p className="mt-4 leading-7 text-white/80">
                {t.joinDescription}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/register`}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#8b1228] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#fff4f5]"
              >
                {t.joinButton}
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href={`/${locale}/events`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                {t.viewEvents}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}