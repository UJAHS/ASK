"use client";

import { useState } from "react";

type Locale = "en" | "hi" | "gu";

type GalleryItem = {
  id: string;
  title: string | null;
  description: string | null;
  image: string | null;
  createdAt: string;
};

type Props = {
  locale: Locale;
  items: GalleryItem[];
};

const translations = {
  en: {
    title: "Gallery",
    subtitle:
      "Explore moments, activities, events, and memories from the ASK community.",
    latest: "Latest Moments",
    noGallery:
      "No gallery images are available at the moment.",
    community: "ASK Community",
    close: "Close",
    previous: "Previous",
    next: "Next",
    image: "Image",
  },

  hi: {
    title: "\u0917\u0948\u0932\u0930\u0940",
    subtitle:
      "\u090f\u090f\u0938\u0915\u0947 \u0938\u092e\u0941\u0926\u093e\u092f \u0915\u0947 \u0915\u094d\u0937\u0923\u094b\u0902, \u0917\u0924\u093f\u0935\u093f\u0927\u093f\u092f\u094b\u0902, \u0915\u093e\u0930\u094d\u092f\u0915\u094d\u0930\u092e\u094b\u0902 \u0914\u0930 \u092f\u093e\u0926\u094b\u0902 \u0915\u093e \u0905\u0928\u0941\u092d\u0935 \u0915\u0930\u0947\u0902\u0964",
    latest: "\u0928\u0935\u0940\u0928\u0924\u092e \u0915\u094d\u0937\u0923",
    noGallery:
      "\u0907\u0938 \u0938\u092e\u092f \u0915\u094b\u0908 \u0917\u0948\u0932\u0930\u0940 \u091a\u093f\u0924\u094d\u0930 \u0909\u092a\u0932\u092c\u094d\u0927 \u0928\u0939\u0940\u0902 \u0939\u0948\u0964",
    community: "ASK \u0938\u092e\u0941\u0926\u093e\u092f",
    close: "\u092c\u0902\u0926 \u0915\u0930\u0947\u0902",
    previous: "\u092a\u093f\u091b\u0932\u093e",
    next: "\u0905\u0917\u0932\u093e",
    image: "\u091a\u093f\u0924\u094d\u0930",
  },

  gu: {
    title: "\u0a97\u0ac7\u0ab2\u0ac7\u0ab0\u0ac0",
    subtitle:
      "\u0a8f\u0ab8\u0a95\u0ac7 \u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0aa8\u0abe \u0a95\u0acd\u0ab7\u0aa3\u0acb, \u0aaa\u0acd\u0ab0\u0ab5\u0ac3\u0aa4\u0acd\u0aa4\u0abf\u0a93, \u0a95\u0abe\u0ab0\u0acd\u0aaf\u0a95\u0acd\u0ab0\u0aae\u0acb \u0a85\u0aa8\u0ac7 \u0aaf\u0abe\u0aa6\u0acb\u0aa8\u0acb \u0a85\u0aa8\u0ac1\u0aad\u0ab5 \u0a95\u0ab0\u0acb.",
    latest: "\u0aa4\u0abe\u0a9c\u0abe \u0a95\u0acd\u0ab7\u0aa3\u0acb",
    noGallery:
      "\u0a85\u0aa4\u0acd\u0aaf\u0abe\u0ab0\u0ac7 \u0a95\u0acb\u0a88 \u0a97\u0ac7\u0ab2\u0ac7\u0ab0\u0ac0 \u0a9a\u0abf\u0aa4\u0acd\u0ab0\u0acb \u0a89\u0aaa\u0ab2\u0aac\u0acd\u0aa7 \u0aa8\u0aa5\u0ac0.",
    community: "ASK \u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf",
    close: "\u0aac\u0a82\u0aa7 \u0a95\u0ab0\u0acb",
    previous: "\u0aaa\u0abe\u0a9b\u0ab2\u0ac1\u0a82",
    next: "\u0a86\u0a97\u0ab3",
    image: "\u0a9a\u0abf\u0aa4\u0acd\u0ab0",
  },
} as const;

function formatDate(
  date: string,
  locale: Locale
) {
  const localeMap = {
    en: "en-IN",
    hi: "hi-IN",
    gu: "gu-IN",
  } as const;

  return new Intl.DateTimeFormat(
    localeMap[locale],
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  ).format(new Date(date));
}

export default function GalleryClient({
  locale,
  items,
}: Props) {
  const t = translations[locale];

  const [selectedIndex, setSelectedIndex] =
    useState<number | null>(null);

  const selectedItem =
    selectedIndex !== null
      ? items[selectedIndex]
      : null;

  function closeLightbox() {
    setSelectedIndex(null);
  }

  function showPrevious() {
    if (selectedIndex === null || items.length === 0) {
      return;
    }

    setSelectedIndex(
      selectedIndex === 0
        ? items.length - 1
        : selectedIndex - 1
    );
  }

  function showNext() {
    if (selectedIndex === null || items.length === 0) {
      return;
    }

    setSelectedIndex(
      selectedIndex === items.length - 1
        ? 0
        : selectedIndex + 1
    );
  }

  return (
    <>
      <div
        className="
          min-h-[calc(100vh-4rem)]
          rounded-2xl
          bg-gradient-to-br
          from-[#ffdfe5]
          via-[#ffd3db]
          to-[#ffc5cf]
          p-4
          md:p-6
          transition-all
          duration-300
          dark:from-[#4b0b15]
          dark:via-[#390812]
          dark:to-[#26050c]
        "
      >
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="mb-8">
            <h1
              className="
                text-3xl
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              {t.title}
            </h1>

            <p
              className="
                mt-1
                max-w-3xl
                text-red-900/80
                dark:text-red-100/75
              "
            >
              {t.subtitle}
            </p>
          </div>

          {/* Section heading */}
          <div className="mb-5 flex items-center gap-4">
            <h2
              className="
                text-2xl
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              {t.latest}
            </h2>

            <div
              className="
                hidden
                h-px
                flex-1
                bg-red-300/70
                dark:bg-red-300/25
                md:block
              "
            />
          </div>

          {/* Empty state */}
          {items.length === 0 ? (
            <div
              className="
                rounded-2xl
                border
                border-red-300/80
                bg-gradient-to-br
                from-[#fff0f2]
                via-[#ffe0e5]
                to-[#ffd0d8]
                p-12
                text-center
                shadow-sm
                dark:border-red-400/40
                dark:from-[#68131f]
                dark:via-[#570e18]
                dark:to-[#410810]
              "
            >
              <div className="text-5xl">
                {"\u{1F5BC}\uFE0F"}
              </div>

              <p
                className="
                  mt-4
                  text-red-900/70
                  dark:text-red-100/70
                "
              >
                {t.noGallery}
              </p>
            </div>
          ) : (
            <div
              className="
                columns-1
                gap-5
                sm:columns-2
                lg:columns-3
                xl:columns-4
              "
            >
              {items.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setSelectedIndex(index)
                  }
                  className="
                    group
                    relative
                    mb-5
                    block
                    w-full
                    break-inside-avoid
                    overflow-hidden
                    rounded-2xl
                    border
                    border-red-300/80
                    bg-gradient-to-br
                    from-[#fff0f2]
                    via-[#ffe0e5]
                    to-[#ffd0d8]
                    text-left
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-red-500
                    hover:shadow-[0_18px_40px_rgba(190,24,93,0.25)]
                    dark:border-red-400/30
                    dark:from-[#751a28]
                    dark:via-[#64131f]
                    dark:to-[#51101a]
                    dark:hover:border-red-300/80
                    dark:hover:shadow-[0_18px_40px_rgba(248,113,113,0.2)]
                  "
                  aria-label={
                    item.title ||
                    `${t.image} ${index + 1}`
                  }
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={
                          item.title ||
                          `${t.image} ${index + 1}`
                        }
                        className="
                          block
                          h-auto
                          w-full
                          object-cover
                          transition-transform
                          duration-500
                          group-hover:scale-105
                        "
                      />
                    ) : (
                      <div
                        className="
                          flex
                          aspect-[4/3]
                          w-full
                          items-center
                          justify-center
                          bg-gradient-to-br
                          from-[#d90416]
                          via-[#c90015]
                          to-[#a90012]
                          text-white
                          dark:from-[#861c2b]
                          dark:via-[#6e1422]
                          dark:to-[#510d17]
                        "
                      >
                        <span className="text-5xl">
                          {"\u{1F5BC}\uFE0F"}
                        </span>
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div
                      className="
                        absolute
                        inset-0
                        flex
                        items-center
                        justify-center
                        bg-black/0
                        transition-all
                        duration-300
                        group-hover:bg-black/35
                      "
                    >
                      <span
                        className="
                          flex
                          h-12
                          w-12
                          scale-75
                          items-center
                          justify-center
                          rounded-full
                          bg-white/90
                          text-xl
                          text-red-700
                          opacity-0
                          shadow-lg
                          transition-all
                          duration-300
                          group-hover:scale-100
                          group-hover:opacity-100
                        "
                      >
                        {"\u{1F50D}"}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  {(item.title ||
                    item.description) && (
                    <div className="p-4">
                      {item.title && (
                        <h3
                          className="
                            line-clamp-2
                            text-base
                            font-bold
                            text-gray-900
                            dark:text-white
                          "
                        >
                          {item.title}
                        </h3>
                      )}

                      {item.description && (
                        <p
                          className="
                            mt-1
                            line-clamp-2
                            text-sm
                            leading-5
                            text-red-900/70
                            dark:text-red-100/65
                          "
                        >
                          {item.description}
                        </p>
                      )}

                      <p
                        className="
                          mt-3
                          text-xs
                          font-medium
                          text-red-800/60
                          dark:text-red-200/60
                        "
                      >
                        {formatDate(
                          item.createdAt,
                          locale
                        )}
                      </p>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {selectedItem && selectedIndex !== null && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/90
            p-4
            backdrop-blur-sm
          "
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title || t.image}
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            type="button"
            onClick={closeLightbox}
            className="
              absolute
              right-4
              top-4
              z-20
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-white/15
              text-2xl
              text-white
              backdrop-blur-md
              transition
              hover:bg-white/25
            "
            aria-label={t.close}
          >
            {"\u00D7"}
          </button>

          {/* Previous */}
          {items.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              className="
                absolute
                left-3
                top-1/2
                z-20
                flex
                h-12
                w-12
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                bg-white/15
                text-2xl
                text-white
                backdrop-blur-md
                transition
                hover:bg-white/25
                md:left-6
              "
              aria-label={t.previous}
            >
              {"\u2190"}
            </button>
          )}

          {/* Next */}
          {items.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              className="
                absolute
                right-3
                top-1/2
                z-20
                flex
                h-12
                w-12
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                bg-white/15
                text-2xl
                text-white
                backdrop-blur-md
                transition
                hover:bg-white/25
                md:right-6
              "
              aria-label={t.next}
            >
              {"\u2192"}
            </button>
          )}

          {/* Image */}
          <div
            className="
              flex
              max-h-[90vh]
              max-w-6xl
              flex-col
              items-center
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {selectedItem.image ? (
              <img
                src={selectedItem.image}
                alt={
                  selectedItem.title ||
                  t.image
                }
                className="
                  max-h-[75vh]
                  max-w-full
                  rounded-xl
                  object-contain
                  shadow-2xl
                "
              />
            ) : (
              <div
                className="
                  flex
                  h-80
                  w-80
                  items-center
                  justify-center
                  rounded-xl
                  bg-gradient-to-br
                  from-[#861c2b]
                  to-[#510d17]
                  text-7xl
                "
              >
                {"\u{1F5BC}\uFE0F"}
              </div>
            )}

            {(selectedItem.title ||
              selectedItem.description) && (
              <div
                className="
                  mt-4
                  max-w-2xl
                  text-center
                  text-white
                "
              >
                {selectedItem.title && (
                  <h3 className="text-xl font-bold">
                    {selectedItem.title}
                  </h3>
                )}

                {selectedItem.description && (
                  <p className="mt-2 text-sm text-white/75">
                    {selectedItem.description}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}