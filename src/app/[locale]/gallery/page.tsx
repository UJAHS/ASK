"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  MapPin,
  Sparkles,
  X,
} from "lucide-react";

type Locale = "en" | "hi" | "gu";

type GalleryImage = {
  id: string;
  imageUrl: string;
  sortOrder: number;
  createdAt: string;
  translations: {
    id: string;
    locale: string;
    caption: string | null;
  }[];
};

type Gallery = {
  id: string;
  slug: string;
  coverImage: string | null;
  category: string | null;
  createdAt: string;
  translation: {
    title: string;
    description: string | null;
  } | null;
  images: GalleryImage[];
};

const text: Record<
  Locale,
  {
    badge: string;
    title: string;
    accent: string;
    description: string;
    emptyTitle: string;
    emptyDescription: string;
    viewGallery: string;
    photos: string;
    community: string;
    close: string;
    previous: string;
    next: string;
    joinTitle: string;
    joinDescription: string;
    joinButton: string;
    activities: string;
  }
> = {
  en: {
    badge: "COMMUNITY GALLERY",
    title: "Moments That",
    accent: "Bring Us Together",
    description:
      "Explore memories from ASK community activities, celebrations, cultural programs, social initiatives, and special occasions.",
    emptyTitle: "No gallery available",
    emptyDescription:
      "New community photos will appear here as soon as galleries are published.",
    viewGallery: "View Gallery",
    photos: "Photos",
    community: "ASK Community",
    close: "Close",
    previous: "Previous",
    next: "Next",
    joinTitle: "Create More Memories Together",
    joinDescription:
      "Become part of ASK and participate in the activities, celebrations, cultural programs, and community initiatives that create lasting memories.",
    joinButton: "Become a Member",
    activities: "View Activities",
  },
  hi: {
    badge: "सामुदायिक गैलरी",
    title: "यादें जो",
    accent: "हमें जोड़ती हैं",
    description:
      "ASK की सामुदायिक गतिविधियों, समारोहों, सांस्कृतिक कार्यक्रमों, सामाजिक पहलों और विशेष अवसरों की यादों को देखें।",
    emptyTitle: "अभी कोई गैलरी उपलब्ध नहीं है",
    emptyDescription:
      "नई सामुदायिक तस्वीरें प्रकाशित होते ही यहां दिखाई देंगी।",
    viewGallery: "गैलरी देखें",
    photos: "तस्वीरें",
    community: "ASK समुदाय",
    close: "बंद करें",
    previous: "पिछली",
    next: "अगली",
    joinTitle: "साथ मिलकर और यादें बनाएं",
    joinDescription:
      "ASK का हिस्सा बनें और उन गतिविधियों, समारोहों, सांस्कृतिक कार्यक्रमों और सामुदायिक पहलों में भाग लें जो यादगार पल बनाते हैं।",
    joinButton: "सदस्य बनें",
    activities: "गतिविधियां देखें",
  },
  gu: {
    badge: "સામુદાયિક ગેલેરી",
    title: "એવી યાદો જે",
    accent: "આપણને જોડે છે",
    description:
      "ASKની સામુદાયિક પ્રવૃત્તિઓ, ઉજવણીઓ, સાંસ્કૃતિક કાર્યક્રમો, સામાજિક પહેલો અને ખાસ પ્રસંગોની યાદો જુઓ.",
    emptyTitle: "હાલમાં કોઈ ગેલેરી ઉપલબ્ધ નથી",
    emptyDescription:
      "નવી સામુદાયિક તસવીરો પ્રકાશિત થતાં જ અહીં દેખાશે.",
    viewGallery: "ગેલેરી જુઓ",
    photos: "તસવીરો",
    community: "ASK સમુદાય",
    close: "બંધ કરો",
    previous: "પહેલાની",
    next: "આગળની",
    joinTitle: "સાથે મળીને વધુ યાદો બનાવીએ",
    joinDescription:
      "ASKનો ભાગ બનો અને એવી પ્રવૃત્તિઓ, ઉજવણીઓ, સાંસ્કૃતિક કાર્યક્રમો અને સામુદાયિક પહેલોમાં ભાગ લો જે યાદગાર પળો બનાવે છે.",
    joinButton: "સભ્ય બનો",
    activities: "પ્રવૃત્તિઓ જુઓ",
  },
};

function getLocale(value: string): Locale {
  if (value === "hi") return "hi";
  if (value === "gu") return "gu";
  return "en";
}

function formatDate(date: Date, locale: Locale) {
  const localeMap = {
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

export default function GalleryPage() {
  const [locale, setLocale] = useState<Locale>("en");
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGallery, setSelectedGallery] =
    useState<Gallery | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const pathLocale = window.location.pathname
      .split("/")
      .filter(Boolean)[0];

    setLocale(getLocale(pathLocale));

    async function loadGallery() {
      try {
        const response = await fetch(
          `/api/public/gallery?locale=${getLocale(pathLocale)}`,
          {
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to load gallery");
        }

        const data = await response.json();
        setGalleries(Array.isArray(data) ? data : []);
      } catch {
        setGalleries([]);
      } finally {
        setLoading(false);
      }
    }

    loadGallery();
  }, []);

  const t = text[locale];

  function openImage(gallery: Gallery, index: number) {
    setSelectedGallery(gallery);
    setSelectedImageIndex(index);
  }

  function closeViewer() {
    setSelectedGallery(null);
    setSelectedImageIndex(0);
  }

  function previousImage() {
    if (!selectedGallery) return;

    setSelectedImageIndex((current) =>
      current === 0
        ? selectedGallery.images.length - 1
        : current - 1,
    );
  }

  function nextImage() {
    if (!selectedGallery) return;

    setSelectedImageIndex((current) =>
      current === selectedGallery.images.length - 1
        ? 0
        : current + 1,
    );
  }

  useEffect(() => {
    if (!selectedGallery) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeViewer();
      if (event.key === "ArrowLeft") previousImage();
      if (event.key === "ArrowRight") nextImage();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedGallery]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fff8f9] via-[#fcebed] to-[#f6dfe3] text-[#3b0710] dark:from-[#210308] dark:via-[#3b0710] dark:to-[#180206] dark:text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#b40018]/10 dark:border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(180,0,24,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(139,18,40,0.12),transparent_35%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(239,0,29,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(180,0,24,0.14),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#b40018]/20 bg-white/70 px-4 py-2 text-xs font-bold tracking-[0.22em] text-[#b40018] shadow-sm backdrop-blur dark:border-[#ef001d]/30 dark:bg-white/5 dark:text-[#ff7182]">
              <ImageIcon className="h-4 w-4" />
              {t.badge}
            </div>

            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              {t.title}
              <span className="block bg-gradient-to-r from-[#8b1228] via-[#b40018] to-[#ef001d] bg-clip-text text-transparent dark:from-[#ff6b7d] dark:via-[#ef3349] dark:to-[#ff8a98]">
                {t.accent}
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#6b2733] sm:text-lg dark:text-[#f2cbd0]">
              {t.description}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="aspect-[4/3] animate-pulse rounded-3xl bg-[#b40018]/10 dark:bg-white/10"
              />
            ))}
          </div>
        ) : galleries.length === 0 ? (
          <div className="rounded-3xl border border-[#b40018]/10 bg-white/80 p-12 text-center shadow-xl shadow-[#8b1228]/5 backdrop-blur dark:border-white/10 dark:bg-white/5">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#b40018]/10 text-[#b40018] dark:bg-[#ef001d]/15 dark:text-[#ff7182]">
              <ImageIcon className="h-8 w-8" />
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              {t.emptyTitle}
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-[#6b2733] dark:text-[#e5b9c0]">
              {t.emptyDescription}
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            {galleries.map((gallery) => (
              <article key={gallery.id}>
                <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    {gallery.category && (
                      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#b40018]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#b40018] dark:bg-[#ef001d]/15 dark:text-[#ff7182]">
                        <Sparkles className="h-3.5 w-3.5" />
                        {gallery.category}
                      </div>
                    )}

                    <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                      {gallery.translation?.title ||
                        gallery.slug}
                    </h2>

                    {gallery.translation?.description && (
                      <p className="mt-3 max-w-2xl leading-7 text-[#6b2733] dark:text-[#e5b9c0]">
                        {gallery.translation.description}
                      </p>
                    )}

                    <div className="mt-3 flex items-center gap-2 text-sm text-[#7a3b47] dark:text-[#dcaab3]">
                      <CalendarDays className="h-4 w-4 text-[#b40018] dark:text-[#ff7182]" />
                      {formatDate(
                        new Date(gallery.createdAt),
                        locale,
                      )}
                      <span>•</span>
                      <span>
                        {gallery.images.length} {t.photos}
                      </span>
                    </div>
                  </div>
                </div>

                {gallery.images.length > 0 ? (
                  <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
                    {gallery.images.map((image, index) => {
                      const imageTranslation =
                        image.translations.find(
                          (item) => item.locale === locale,
                        ) ??
                        image.translations.find(
                          (item) => item.locale === "en",
                        ) ??
                        image.translations[0] ??
                        null;

                      return (
                        <button
                          key={image.id}
                          type="button"
                          onClick={() =>
                            openImage(gallery, index)
                          }
                          className="group relative mb-5 block w-full overflow-hidden rounded-3xl border border-[#b40018]/10 bg-white text-left shadow-lg shadow-[#8b1228]/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-[#4a0b16]"
                        >
                          <div
                            className={`relative ${
                              index % 4 === 0
                                ? "aspect-[4/5]"
                                : index % 3 === 0
                                  ? "aspect-square"
                                  : "aspect-[4/3]"
                            }`}
                          >
                            <Image
                              src={image.imageUrl}
                              alt={
                                imageTranslation?.caption ||
                                gallery.translation?.title ||
                                t.community
                              }
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                            <div className="absolute bottom-0 left-0 right-0 translate-y-3 p-5 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                              {imageTranslation?.caption && (
                                <p className="text-sm font-medium leading-6">
                                  {imageTranslation.caption}
                                </p>
                              )}

                              <div className="mt-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/80">
                                <ImageIcon className="h-3.5 w-3.5" />
                                {t.viewGallery}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-3xl border border-dashed border-[#b40018]/20 p-10 text-center text-[#7a3b47] dark:border-white/10 dark:text-[#dcaab3]">
                    {t.emptyDescription}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="px-6 pb-20 sm:px-8 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#8b1228] via-[#b40018] to-[#64131f] px-8 py-14 text-white shadow-2xl shadow-[#8b1228]/20 sm:px-12 lg:px-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-black/10 blur-3xl" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-2 text-white/80">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-bold uppercase tracking-[0.18em]">
                  {t.community}
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
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#8b1228] shadow-lg transition hover:-translate-y-0.5"
              >
                {t.joinButton}
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href={`/${locale}/activities`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                {t.activities}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedGallery && selectedGallery.images.length > 0 && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={t.viewGallery}
          onClick={closeViewer}
        >
          <button
            type="button"
            onClick={closeViewer}
            aria-label={t.close}
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              previousImage();
            }}
            aria-label={t.previous}
            className="absolute left-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 sm:left-8"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              nextImage();
            }}
            aria-label={t.next}
            className="absolute right-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 sm:right-8"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div
            className="relative flex max-h-[90vh] max-w-6xl flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative h-[70vh] w-[85vw] max-w-6xl sm:h-[78vh]">
              <Image
                src={
                  selectedGallery.images[selectedImageIndex]
                    .imageUrl
                }
                alt={
                  selectedGallery.images[selectedImageIndex]
                    .translations.find(
                      (item) => item.locale === locale,
                    )?.caption ||
                  selectedGallery.images[selectedImageIndex]
                    .translations.find(
                      (item) => item.locale === "en",
                    )?.caption ||
                  t.community
                }
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>

            {(() => {
              const currentImage =
                selectedGallery.images[selectedImageIndex];

              const caption =
                currentImage.translations.find(
                  (item) => item.locale === locale,
                )?.caption ??
                currentImage.translations.find(
                  (item) => item.locale === "en",
                )?.caption ??
                currentImage.translations[0]?.caption ??
                null;

              return (
                <div className="mt-4 max-w-2xl text-center">
                  {caption && (
                    <p className="text-sm font-medium text-white/90">
                      {caption}
                    </p>
                  )}

                  <p className="mt-2 text-xs text-white/50">
                    {selectedImageIndex + 1} /{" "}
                    {selectedGallery.images.length}
                  </p>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </main>
  );
}