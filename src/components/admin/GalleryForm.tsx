"use client";

import {
  FormEvent,
  useState,
} from "react";
import { useRouter } from "next/navigation";

type Locale = "en" | "hi" | "gu";

type GalleryImage = {
  id: string;
  imageUrl: string;
  caption: string;
};

type Props = {
  locale: string;
  galleryId?: string;
  initialData?: any;
  events?: any[];
};

const labels = {
  en: {
    galleryDetails: "Gallery Details",
    slug: "Slug",
    status: "Status",
    coverImage: "Cover Image",
    uploadImage: "Upload Image",
    imageUrl: "Image URL",
    chooseImage: "Choose Image",
    changeImage: "Change Image",
    remove: "Remove",
    event: "Link with Event",
    noEvent: "No Event",
    galleryContent: "Gallery Content",
    enterContent:
      "Enter content in the selected language.",
    title: "Title",
    description: "Description",
    galleryImages: "Gallery Images",
    addImage: "Add Image",
    caption: "Caption",
    save: "Save Gallery",
    saving: "Saving...",
    cancel: "Cancel",
    draft: "Draft",
    published: "Published",
    archived: "Archived",
    uploading: "Uploading...",
    uploadFailed: "Image upload failed.",
    noImages: "No images added yet.",
    imageInstructions:
      "Upload images directly or paste an image URL.",
    uploadCover: "Upload Cover Image",
  },

  hi: {
    galleryDetails: "गैलरी विवरण",
    slug: "स्लग",
    status: "स्थिति",
    coverImage: "कवर इमेज",
    uploadImage: "इमेज अपलोड करें",
    imageUrl: "इमेज URL",
    chooseImage: "इमेज चुनें",
    changeImage: "इमेज बदलें",
    remove: "हटाएं",
    event: "कार्यक्रम से जोड़ें",
    noEvent: "कोई कार्यक्रम नहीं",
    galleryContent: "गैलरी सामग्री",
    enterContent:
      "चयनित भाषा में सामग्री दर्ज करें।",
    title: "शीर्षक",
    description: "विवरण",
    galleryImages: "गैलरी इमेज",
    addImage: "इमेज जोड़ें",
    caption: "कैप्शन",
    save: "गैलरी सेव करें",
    saving: "सेव हो रहा है...",
    cancel: "रद्द करें",
    draft: "ड्राफ्ट",
    published: "प्रकाशित",
    archived: "संग्रहीत",
    uploading: "अपलोड हो रहा है...",
    uploadFailed: "इमेज अपलोड विफल हुआ।",
    noImages: "अभी कोई इमेज नहीं जोड़ी गई है।",
    imageInstructions:
      "इमेज सीधे अपलोड करें या इमेज URL डालें।",
    uploadCover: "कवर इमेज अपलोड करें",
  },

  gu: {
    galleryDetails: "ગેલેરીની વિગતો",
    slug: "સ્લગ",
    status: "સ્થિતિ",
    coverImage: "કવર ઈમેજ",
    uploadImage: "ઈમેજ અપલોડ કરો",
    imageUrl: "ઈમેજ URL",
    chooseImage: "ઈમેજ પસંદ કરો",
    changeImage: "ઈમેજ બદલો",
    remove: "દૂર કરો",
    event: "કાર્યક્રમ સાથે જોડો",
    noEvent: "કોઈ કાર્યક્રમ નથી",
    galleryContent: "ગેલેરીની સામગ્રી",
    enterContent:
      "પસંદ કરેલી ભાષામાં સામગ્રી દાખલ કરો.",
    title: "શીર્ષક",
    description: "વર્ણન",
    galleryImages: "ગેલેરી ઈમેજ",
    addImage: "ઈમેજ ઉમેરો",
    caption: "કૅપ્શન",
    save: "ગેલેરી સેવ કરો",
    saving: "સેવ થઈ રહ્યું છે...",
    cancel: "રદ કરો",
    draft: "ડ્રાફ્ટ",
    published: "પ્રકાશિત",
    archived: "આર્કાઇવ",
    uploading: "અપલોડ થઈ રહ્યું છે...",
    uploadFailed: "ઈમેજ અપલોડ નિષ્ફળ થયું.",
    noImages:
      "હજુ સુધી કોઈ ઈમેજ ઉમેરવામાં આવી નથી.",
    imageInstructions:
      "ઈમેજ સીધી અપલોડ કરો અથવા ઈમેજ URL દાખલ કરો.",
    uploadCover: "કવર ઈમેજ અપલોડ કરો",
  },
};

function getLanguage(value: string): Locale {
  if (value === "hi") return "hi";
  if (value === "gu") return "gu";
  return "en";
}

export function GalleryForm({
  locale,
  galleryId,
  initialData,
  events = [],
}: Props) {
  const router = useRouter();

  const language = getLanguage(locale);
  const t = labels[language];

  const [slug, setSlug] = useState(
    initialData?.slug || "",
  );

  const [status, setStatus] = useState(
    initialData?.status || "DRAFT",
  );

  const [coverImage, setCoverImage] = useState(
    initialData?.coverImage || "",
  );

  const [eventId, setEventId] = useState(
    initialData?.eventId || "",
  );

  const [title, setTitle] = useState(
    initialData?.translations?.find(
      (item: any) =>
        item.locale === language,
    )?.title || "",
  );

  const [description, setDescription] =
    useState(
      initialData?.translations?.find(
        (item: any) =>
          item.locale === language,
      )?.description || "",
    );

  const [images, setImages] =
    useState<GalleryImage[]>(
      (initialData?.images || []).map(
        (image: any) => ({
          id: image.id,
          imageUrl: image.imageUrl,
          caption:
            image.translations?.find(
              (item: any) =>
                item.locale === language,
            )?.caption || "",
        }),
      ),
    );

  const [saving, setSaving] = useState(false);

  const [uploadingCover, setUploadingCover] =
    useState(false);

  const [uploadingImageId, setUploadingImageId] =
    useState<string | null>(null);

  const [error, setError] = useState("");

  async function uploadImage(
    file: File,
    target: "cover" | "gallery",
    galleryImageId?: string,
  ) {
    if (!file) return;

    try {
      if (target === "cover") {
        setUploadingCover(true);
      } else {
        setUploadingImageId(
          galleryImageId || null,
        );
      }

      setError("");

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "/api/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (!response.ok || !data?.url) {
        throw new Error(
          data?.error || t.uploadFailed,
        );
      }

      if (target === "cover") {
        setCoverImage(data.url);
      } else if (galleryImageId) {
        setImages((current) =>
          current.map((image) =>
            image.id === galleryImageId
              ? {
                  ...image,
                  imageUrl: data.url,
                }
              : image,
          ),
        );
      }
    } catch (err: any) {
      setError(
        err?.message || t.uploadFailed,
      );
    } finally {
      if (target === "cover") {
        setUploadingCover(false);
      } else {
        setUploadingImageId(null);
      }
    }
  }

  function addImage() {
    setImages((current) => [
      ...current,
      {
        id:
          "new-" +
          Date.now() +
          "-" +
          Math.random()
            .toString(36)
            .slice(2),
        imageUrl: "",
        caption: "",
      },
    ]);
  }

  function removeImage(imageId: string) {
    setImages((current) =>
      current.filter(
        (image) => image.id !== imageId,
      ),
    );
  }

  function updateImage(
    imageId: string,
    field: "imageUrl" | "caption",
    value: string,
  ) {
    setImages((current) =>
      current.map((image) =>
        image.id === imageId
          ? {
              ...image,
              [field]: value,
            }
          : image,
      ),
    );
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setSaving(true);
    setError("");

    try {
      const translations = {
        [language]: {
          title,
          description: description || null,
        },
      };

      const payload = {
        slug,
        status,
        coverImage: coverImage || null,
        eventId: eventId || null,
        translations,
        images: images
          .filter(
            (image) =>
              image.imageUrl.trim(),
          )
          .map((image, index) => ({
            id: image.id.startsWith("new-")
              ? undefined
              : image.id,
            imageUrl:
              image.imageUrl.trim(),
            sortOrder: index,
            caption:
              image.caption || null,
          })),
        locale: language,
      };

      const response = await fetch(
        galleryId
          ? "/api/admin/gallery/" +
              galleryId
          : "/api/admin/gallery",
        {
          method: galleryId
            ? "PUT"
            : "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Unable to save gallery.",
        );
      }

      router.push(
        "/" +
          locale +
          "/admin/gallery",
      );

      router.refresh();
    } catch (err: any) {
      setError(
        err?.message ||
          "Unable to save gallery.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* ERROR */}
      {error && (
        <div
          className="
            rounded-xl
            border
            border-red-300
            bg-red-100
            px-5
            py-4
            text-sm
            font-medium
            text-red-800
            shadow-sm
            dark:border-red-400/30
            dark:bg-red-950/50
            dark:text-red-200
          "
        >
          {error}
        </div>
      )}

      {/* GALLERY DETAILS */}
      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          border-red-200/80
          bg-gradient-to-br
          from-[#fff0f2]
          via-[#ffe4e9]
          to-[#ffd6df]
          p-6
          shadow-lg
          shadow-red-900/10
          dark:border-red-300/20
          dark:from-[#68131f]
          dark:via-[#570e18]
          dark:to-[#410810]
          sm:p-7
        "
      >
        <div className="mb-6">
          <h2
            className="
              text-xl
              font-bold
              text-red-950
              dark:text-white
            "
          >
            {t.galleryDetails}
          </h2>

          <div
            className="
              mt-2
              h-1
              w-14
              rounded-full
              bg-gradient-to-r
              from-red-600
              to-pink-500
              dark:from-red-400
              dark:to-pink-400
            "
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* SLUG */}
          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-red-950
                dark:text-red-50
              "
            >
              {t.slug}
              <span className="ml-1 text-red-600 dark:text-red-400">
                *
              </span>
            </label>

            <input
              value={slug}
              onChange={(e) =>
                setSlug(
                  e.target.value
                    .toLowerCase()
                    .replace(/\s+/g, "-"),
                )
              }
              required
              className="
                w-full
                rounded-xl
                border
                border-red-200
                bg-[#fff7f8]
                px-4
                py-3
                text-red-950
                outline-none
                transition
                placeholder:text-red-900/35
                focus:border-red-500
                focus:ring-2
                focus:ring-red-500/15
                dark:border-red-300/25
                dark:bg-[#4a0b15]
                dark:text-white
                dark:placeholder:text-red-100/35
                dark:focus:border-red-400
                dark:focus:ring-red-400/15
              "
              placeholder="navratri-garba-2026"
            />
          </div>

          {/* STATUS */}
          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-red-950
                dark:text-red-50
              "
            >
              {t.status}
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="
                w-full
                rounded-xl
                border
                border-red-200
                bg-[#fff7f8]
                px-4
                py-3
                text-red-950
                outline-none
                transition
                focus:border-red-500
                focus:ring-2
                focus:ring-red-500/15
                dark:border-red-300/25
                dark:bg-[#4a0b15]
                dark:text-white
                dark:focus:border-red-400
                dark:focus:ring-red-400/15
              "
            >
              <option value="DRAFT">
                {t.draft}
              </option>

              <option value="PUBLISHED">
                {t.published}
              </option>

              <option value="ARCHIVED">
                {t.archived}
              </option>
            </select>
          </div>

          {/* COVER IMAGE */}
          <div className="md:col-span-2">
            <div className="mb-3">
              <label
                className="
                  block
                  text-sm
                  font-semibold
                  text-red-950
                  dark:text-red-50
                "
              >
                {t.coverImage}
              </label>

              <p
                className="
                  mt-1
                  text-xs
                  text-red-900/60
                  dark:text-red-100/60
                "
              >
                {t.imageUrl} /{" "}
                {t.uploadImage}
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {/* DIRECT UPLOAD */}
              <div
                className="
                  rounded-2xl
                  border
                  border-dashed
                  border-red-300
                  bg-[#ffe7eb]
                  p-5
                  dark:border-red-300/25
                  dark:bg-[#4f0a15]
                "
              >
                <p
                  className="
                    mb-3
                    text-sm
                    font-bold
                    text-red-950
                    dark:text-white
                  "
                >
                  {t.uploadImage}
                </p>

                <label
                  className="
                    inline-flex
                    w-full
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-xl
                    bg-gradient-to-r
                    from-red-700
                    to-red-600
                    px-5
                    py-3
                    text-sm
                    font-bold
                    text-white
                    shadow-md
                    transition
                    hover:from-red-800
                    hover:to-red-700
                    dark:from-red-600
                    dark:to-red-500
                    dark:hover:from-red-500
                    dark:hover:to-red-400
                  "
                >
                  {uploadingCover
                    ? t.uploading
                    : coverImage
                      ? t.changeImage
                      : t.chooseImage}

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploadingCover}
                    onChange={async (e) => {
                      const file =
                        e.target.files?.[0];

                      if (!file) return;

                      await uploadImage(
                        file,
                        "cover",
                      );

                      e.target.value = "";
                    }}
                  />
                </label>
              </div>

              {/* URL */}
              <div
                className="
                  rounded-2xl
                  border
                  border-red-200
                  bg-[#ffeef1]
                  p-5
                  dark:border-red-300/20
                  dark:bg-[#4a0b15]
                "
              >
                <p
                  className="
                    mb-3
                    text-sm
                    font-bold
                    text-red-950
                    dark:text-white
                  "
                >
                  {t.imageUrl}
                </p>

                <input
                  type="url"
                  value={coverImage}
                  onChange={(e) =>
                    setCoverImage(
                      e.target.value,
                    )
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-red-200
                    bg-[#fff7f8]
                    px-4
                    py-3
                    text-red-950
                    outline-none
                    transition
                    placeholder:text-red-900/35
                    focus:border-red-500
                    focus:ring-2
                    focus:ring-red-500/15
                    dark:border-red-300/25
                    dark:bg-[#3f0710]
                    dark:text-white
                    dark:placeholder:text-red-100/35
                    dark:focus:border-red-400
                    dark:focus:ring-red-400/15
                  "
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            {/* COVER PREVIEW */}
            {coverImage && (
              <div
                className="
                  mt-5
                  overflow-hidden
                  rounded-2xl
                  border
                  border-red-200
                  bg-[#ffe8ec]
                  p-3
                  dark:border-red-300/20
                  dark:bg-[#3f0710]
                "
              >
                <div className="mb-2 px-1">
                  <p
                    className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wide
                      text-red-700
                      dark:text-red-200
                    "
                  >
                    Preview
                  </p>
                </div>

                <img
                  src={coverImage}
                  alt={title || "Cover"}
                  className="
                    h-64
                    w-full
                    rounded-xl
                    object-cover
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setCoverImage("")
                  }
                  className="
                    mt-3
                    rounded-lg
                    px-2
                    py-1
                    text-sm
                    font-semibold
                    text-red-700
                    transition
                    hover:bg-red-100
                    hover:underline
                    dark:text-red-300
                    dark:hover:bg-red-900/30
                  "
                >
                  {t.remove}
                </button>
              </div>
            )}
          </div>

          {/* EVENT */}
          <div className="md:col-span-2">
            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-red-950
                dark:text-red-50
              "
            >
              {t.event}
            </label>

            <select
              value={eventId}
              onChange={(e) =>
                setEventId(e.target.value)
              }
              className="
                w-full
                rounded-xl
                border
                border-red-200
                bg-[#fff7f8]
                px-4
                py-3
                text-red-950
                outline-none
                transition
                focus:border-red-500
                focus:ring-2
                focus:ring-red-500/15
                dark:border-red-300/25
                dark:bg-[#4a0b15]
                dark:text-white
                dark:focus:border-red-400
                dark:focus:ring-red-400/15
              "
            >
              <option value="">
                {t.noEvent}
              </option>

              {events.map((event) => {
                const translation =
                  event.translations?.find(
                    (item: any) =>
                      item.locale ===
                      language,
                  ) ||
                  event.translations?.find(
                    (item: any) =>
                      item.locale === "en",
                  );

                return (
                  <option
                    key={event.id}
                    value={event.id}
                  >
                    {translation?.title ||
                      event.slug}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </section>

      {/* GALLERY CONTENT */}
      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          border-red-200/80
          bg-gradient-to-br
          from-[#fff0f2]
          via-[#ffe4e9]
          to-[#ffd6df]
          p-6
          shadow-lg
          shadow-red-900/10
          dark:border-red-300/20
          dark:from-[#68131f]
          dark:via-[#570e18]
          dark:to-[#410810]
          sm:p-7
        "
      >
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2
              className="
                text-xl
                font-bold
                text-red-950
                dark:text-white
              "
            >
              {t.galleryContent}
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-red-900/65
                dark:text-red-100/65
              "
            >
              {t.enterContent}
            </p>
          </div>

          <span
            className="
              w-fit
              rounded-xl
              border
              border-red-200
              bg-[#ffe0e5]
              px-4
              py-2
              text-sm
              font-bold
              text-red-700
              dark:border-red-300/20
              dark:bg-[#4f0a15]
              dark:text-red-200
            "
          >
            {language === "gu"
              ? "ગુજરાતી"
              : language === "hi"
                ? "हिन्दी"
                : "English"}
          </span>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-red-200/80
            bg-[#ffe8ec]
            p-5
            dark:border-red-300/20
            dark:bg-[#4a0b15]
          "
        >
          <div className="space-y-5">
            {/* TITLE */}
            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-red-950
                  dark:text-red-50
                "
              >
                {t.title}
                <span className="ml-1 text-red-600 dark:text-red-400">
                  *
                </span>
              </label>

              <input
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                required
                className="
                  w-full
                  rounded-xl
                  border
                  border-red-200
                  bg-[#fff7f8]
                  px-4
                  py-3
                  text-red-950
                  outline-none
                  transition
                  placeholder:text-red-900/35
                  focus:border-red-500
                  focus:ring-2
                  focus:ring-red-500/15
                  dark:border-red-300/25
                  dark:bg-[#3f0710]
                  dark:text-white
                  dark:placeholder:text-red-100/35
                  dark:focus:border-red-400
                  dark:focus:ring-red-400/15
                "
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-red-950
                  dark:text-red-50
                "
              >
                {t.description}
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value,
                  )
                }
                rows={6}
                className="
                  w-full
                  resize-y
                  rounded-xl
                  border
                  border-red-200
                  bg-[#fff7f8]
                  px-4
                  py-3
                  text-red-950
                  outline-none
                  transition
                  placeholder:text-red-900/35
                  focus:border-red-500
                  focus:ring-2
                  focus:ring-red-500/15
                  dark:border-red-300/25
                  dark:bg-[#3f0710]
                  dark:text-white
                  dark:placeholder:text-red-100/35
                  dark:focus:border-red-400
                  dark:focus:ring-red-400/15
                "
              />
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY IMAGES */}
      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          border-red-200/80
          bg-gradient-to-br
          from-[#fff0f2]
          via-[#ffe4e9]
          to-[#ffd6df]
          p-6
          shadow-lg
          shadow-red-900/10
          dark:border-red-300/20
          dark:from-[#68131f]
          dark:via-[#570e18]
          dark:to-[#410810]
          sm:p-7
        "
      >
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2
              className="
                text-xl
                font-bold
                text-red-950
                dark:text-white
              "
            >
              {t.galleryImages}
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-red-900/65
                dark:text-red-100/65
              "
            >
              {t.imageInstructions}
            </p>
          </div>

          <button
            type="button"
            onClick={addImage}
            className="
              w-fit
              rounded-xl
              bg-gradient-to-r
              from-red-700
              to-red-600
              px-5
              py-3
              text-sm
              font-bold
              text-white
              shadow-md
              transition
              hover:from-red-800
              hover:to-red-700
              dark:from-red-600
              dark:to-red-500
              dark:hover:from-red-500
              dark:hover:to-red-400
            "
          >
            + {t.addImage}
          </button>
        </div>

        {images.length === 0 ? (
          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-red-300
              bg-[#ffe8ec]
              px-6
              py-14
              text-center
              text-sm
              font-medium
              text-red-900/60
              dark:border-red-300/25
              dark:bg-[#4a0b15]
              dark:text-red-100/60
            "
          >
            {t.noImages}
          </div>
        ) : (
          <div className="space-y-5">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="
                  rounded-2xl
                  border
                  border-red-200
                  bg-[#ffe8ec]
                  p-5
                  shadow-sm
                  dark:border-red-300/20
                  dark:bg-[#4a0b15]
                "
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        bg-red-700
                        text-sm
                        font-bold
                        text-white
                        dark:bg-red-600
                      "
                    >
                      {index + 1}
                    </div>

                    <h3
                      className="
                        font-bold
                        text-red-950
                        dark:text-white
                      "
                    >
                      {t.galleryImages}{" "}
                      {index + 1}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeImage(image.id)
                    }
                    className="
                      rounded-lg
                      px-3
                      py-2
                      text-sm
                      font-semibold
                      text-red-700
                      transition
                      hover:bg-red-100
                      dark:text-red-300
                      dark:hover:bg-red-900/30
                    "
                  >
                    {t.remove}
                  </button>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                  {/* UPLOAD */}
                  <div>
                    <label
                      className="
                        mb-2
                        block
                        text-sm
                        font-semibold
                        text-red-950
                        dark:text-red-50
                      "
                    >
                      {t.uploadImage}
                    </label>

                    <label
                      className="
                        flex
                        min-h-[130px]
                        cursor-pointer
                        flex-col
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-dashed
                        border-red-300
                        bg-[#fff0f2]
                        px-4
                        py-8
                        text-center
                        text-sm
                        font-bold
                        text-red-700
                        transition
                        hover:border-red-500
                        hover:bg-[#ffe4e9]
                        dark:border-red-300/25
                        dark:bg-[#3f0710]
                        dark:text-red-200
                        dark:hover:border-red-400
                        dark:hover:bg-[#51101a]
                      "
                    >
                      <span
                        className="
                          mb-2
                          text-2xl
                        "
                      >
                        +
                      </span>

                      <span>
                        {uploadingImageId ===
                        image.id
                          ? t.uploading
                          : image.imageUrl
                            ? t.changeImage
                            : t.chooseImage}
                      </span>

                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={
                          uploadingImageId ===
                          image.id
                        }
                        onChange={async (
                          e,
                        ) => {
                          const file =
                            e.target.files?.[0];

                          if (!file) return;

                          await uploadImage(
                            file,
                            "gallery",
                            image.id,
                          );

                          e.target.value = "";
                        }}
                      />
                    </label>
                  </div>

                  {/* URL */}
                  <div>
                    <label
                      className="
                        mb-2
                        block
                        text-sm
                        font-semibold
                        text-red-950
                        dark:text-red-50
                      "
                    >
                      {t.imageUrl}
                    </label>

                    <input
                      type="url"
                      value={image.imageUrl}
                      onChange={(e) =>
                        updateImage(
                          image.id,
                          "imageUrl",
                          e.target.value,
                        )
                      }
                      className="
                        w-full
                        rounded-xl
                        border
                        border-red-200
                        bg-[#fff7f8]
                        px-4
                        py-3
                        text-red-950
                        outline-none
                        transition
                        placeholder:text-red-900/35
                        focus:border-red-500
                        focus:ring-2
                        focus:ring-red-500/15
                        dark:border-red-300/25
                        dark:bg-[#3f0710]
                        dark:text-white
                        dark:placeholder:text-red-100/35
                        dark:focus:border-red-400
                        dark:focus:ring-red-400/15
                      "
                      placeholder="https://example.com/gallery.jpg"
                    />
                  </div>

                  {/* CAPTION */}
                  <div className="lg:col-span-2">
                    <label
                      className="
                        mb-2
                        block
                        text-sm
                        font-semibold
                        text-red-950
                        dark:text-red-50
                      "
                    >
                      {t.caption}
                    </label>

                    <input
                      value={image.caption}
                      onChange={(e) =>
                        updateImage(
                          image.id,
                          "caption",
                          e.target.value,
                        )
                      }
                      className="
                        w-full
                        rounded-xl
                        border
                        border-red-200
                        bg-[#fff7f8]
                        px-4
                        py-3
                        text-red-950
                        outline-none
                        transition
                        placeholder:text-red-900/35
                        focus:border-red-500
                        focus:ring-2
                        focus:ring-red-500/15
                        dark:border-red-300/25
                        dark:bg-[#3f0710]
                        dark:text-white
                        dark:placeholder:text-red-100/35
                        dark:focus:border-red-400
                        dark:focus:ring-red-400/15
                      "
                    />
                  </div>
                </div>

                {/* IMAGE PREVIEW */}
                {image.imageUrl && (
                  <div
                    className="
                      mt-5
                      overflow-hidden
                      rounded-2xl
                      border
                      border-red-200
                      bg-[#fff0f2]
                      p-3
                      dark:border-red-300/20
                      dark:bg-[#3f0710]
                    "
                  >
                    <div className="mb-2 px-1">
                      <p
                        className="
                          text-xs
                          font-semibold
                          uppercase
                          tracking-wide
                          text-red-700
                          dark:text-red-200
                        "
                      >
                        Preview
                      </p>
                    </div>

                    <img
                      src={image.imageUrl}
                      alt={
                        image.caption ||
                        `Gallery image ${
                          index + 1
                        }`
                      }
                      className="
                        max-h-72
                        w-full
                        rounded-xl
                        object-contain
                      "
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ACTIONS */}
      <div
        className="
          flex
          flex-col-reverse
          gap-3
          border-t
          border-red-200/70
          pt-5
          pb-8
          sm:flex-row
          sm:justify-end
          dark:border-red-300/15
        "
      >
        <button
          type="button"
          onClick={() =>
            router.push(
              "/" +
                locale +
                "/admin/gallery",
            )
          }
          className="
            rounded-xl
            border
            border-red-300
            bg-[#ffe5e9]
            px-6
            py-3
            text-sm
            font-semibold
            text-red-800
            transition
            hover:bg-[#ffd4dc]
            dark:border-red-300/25
            dark:bg-[#4f0a15]
            dark:text-red-100
            dark:hover:bg-[#64101c]
          "
        >
          {t.cancel}
        </button>

        <button
          type="submit"
          disabled={saving}
          className="
            rounded-xl
            bg-gradient-to-r
            from-red-700
            to-red-600
            px-7
            py-3
            text-sm
            font-bold
            text-white
            shadow-lg
            shadow-red-900/20
            transition
            hover:from-red-800
            hover:to-red-700
            disabled:cursor-not-allowed
            disabled:opacity-50
            dark:from-red-600
            dark:to-red-500
            dark:hover:from-red-500
            dark:hover:to-red-400
          "
        >
          {saving
            ? t.saving
            : t.save}
        </button>
      </div>
    </form>
  );
}