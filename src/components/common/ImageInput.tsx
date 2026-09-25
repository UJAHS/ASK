"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";

type Props = {
  locale: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  maxSizeMB?: number;
};

const translations = {
  en: {
    image: "Image",
    uploadImage: "Upload Image",
    imageUrl: "Image URL",
    chooseImage: "Choose Image",
    uploading: "Uploading...",
    replace: "Replace",
    remove: "Remove",
    preview: "Preview",
    uploadFailed: "Image upload failed.",
    invalidType: "Please select a JPG, JPEG, PNG or WEBP image.",
    tooLarge: "Image is too large.",
    urlPlaceholder: "https://example.com/image.jpg",
    uploadHelp: "Upload an image from your computer.",
    urlHelp: "Or paste an image URL.",
  },

  hi: {
    image: "इमेज",
    uploadImage: "इमेज अपलोड करें",
    imageUrl: "इमेज URL",
    chooseImage: "इमेज चुनें",
    uploading: "अपलोड हो रहा है...",
    replace: "बदलें",
    remove: "हटाएँ",
    preview: "पूर्वावलोकन",
    uploadFailed: "इमेज अपलोड विफल हुआ।",
    invalidType: "कृपया JPG, JPEG, PNG या WEBP इमेज चुनें।",
    tooLarge: "इमेज बहुत बड़ी है।",
    urlPlaceholder: "https://example.com/image.jpg",
    uploadHelp: "अपने कंप्यूटर से इमेज अपलोड करें।",
    urlHelp: "या इमेज URL पेस्ट करें।",
  },

  gu: {
    image: "\u0a87\u0aae\u0ac7\u0a9c",
    uploadImage: "\u0a87\u0aae\u0ac7\u0a9c \u0a85\u0aaa\u0ab2\u0acb\u0aa1 \u0a95\u0ab0\u0acb",
    imageUrl: "\u0a87\u0aae\u0ac7\u0a9c URL",
    chooseImage: "\u0a87\u0aae\u0ac7\u0a9c \u0aaa\u0ab8\u0a82\u0aa6 \u0a95\u0ab0\u0acb",
    uploading: "\u0a85\u0aaa\u0ab2\u0acb\u0aa1 \u0aa5\u0a88 \u0ab0\u0ab9\u0acd\u0aaf\u0ac1\u0a82 \u0a9b\u0ac7...",
    replace: "\u0aac\u0aa6\u0ab2\u0acb",
    remove: "\u0aa6\u0ac2\u0ab0 \u0a95\u0ab0\u0acb",
    preview: "\u0aaa\u0ac2\u0ab0\u0acd\u0ab5\u0abe\u0ab5\u0ab2\u0acb\u0a95\u0aa8",
    uploadFailed: "\u0a87\u0aae\u0ac7\u0a9c \u0a85\u0aaa\u0ab2\u0acb\u0aa1 \u0aa8\u0abf\u0ab7\u0acd\u0aab\u0ab3 \u0aa5\u0aaf\u0ac1\u0a82.",
    invalidType: "\u0a95\u0ac3\u0aaa\u0abe JPG, JPEG, PNG \u0a85\u0aa5\u0ab5\u0abe WEBP \u0a87\u0aae\u0ac7\u0a9c \u0aaa\u0ab8\u0a82\u0aa6 \u0a95\u0ab0\u0acb.",
    tooLarge: "\u0a87\u0aae\u0ac7\u0a9c \u0a96\u0ac2\u0aac \u0aae\u0acb\u0a9f\u0ac0 \u0a9b\u0ac7.",
    urlPlaceholder: "https://example.com/image.jpg",
    uploadHelp: "\u0aa4\u0aae\u0abe\u0ab0\u0abe \u0a95\u0a82\u0aaa\u0acd\u0aaf\u0ac2\u0a9f\u0ab0 \u0aaa\u0ab0\u0aa5\u0ac0 \u0a87\u0aae\u0ac7\u0a9c \u0a85\u0aaa\u0ab2\u0acb\u0aa1 \u0a95\u0ab0\u0acb.",
    urlHelp: "\u0a85\u0aa5\u0ab5\u0abe \u0a87\u0aae\u0ac7\u0a9c URL \u0aaa\u0ac7\u0ab8\u0acd\u0a9f \u0a95\u0ab0\u0acb.",
  },
} as const;

type Translation = {
  [K in keyof typeof translations.en]: string;
};

function getTranslation(locale: string): Translation {
  if (locale === "hi") return translations.hi;
  if (locale === "gu") return translations.gu;
  return translations.en;
}

const MAX_DEFAULT_MB = 5;

export default function ImageInput({
  locale,
  value,
  onChange,
  label,
  required = false,
  disabled = false,
  maxSizeMB = MAX_DEFAULT_MB,
}: Props) {
  const t = getTranslation(locale);
  const inputRef = useRef<HTMLInputElement>(null);

  const [mode, setMode] = useState<"upload" | "url">(
    value ? "url" : "upload"
  );

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (value) {
      setMode((current) => current);
    }
  }, [value]);

  async function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(t.invalidType);

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      return;
    }

    const maxBytes = maxSizeMB * 1024 * 1024;

    if (file.size > maxBytes) {
      setError(`${t.tooLarge} Maximum ${maxSizeMB} MB.`);

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data?.url) {
        throw new Error(
          data?.error || t.uploadFailed
        );
      }

      onChange(data.url);
      setMode("upload");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : t.uploadFailed
      );
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  function removeImage() {
    onChange("");
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200">
          {label || t.image}
          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            disabled={disabled || uploading}
            onClick={() => {
              setMode("upload");
              setError("");
              inputRef.current?.click();
            }}
            className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
              mode === "upload"
                ? "border-red-500 bg-red-50 text-red-700 dark:border-red-500 dark:bg-red-950/30 dark:text-red-300"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            } disabled:cursor-not-allowed disabled:opacity-50`}
          >
            {uploading
              ? t.uploading
              : t.uploadImage}
          </button>

          <button
            type="button"
            disabled={disabled || uploading}
            onClick={() => {
              setMode("url");
              setError("");
            }}
            className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
              mode === "url"
                ? "border-red-500 bg-red-50 text-red-700 dark:border-red-500 dark:bg-red-950/30 dark:text-red-300"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            } disabled:cursor-not-allowed disabled:opacity-50`}
          >
            {t.imageUrl}
          </button>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled || uploading}
      />

      {mode === "upload" && (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-5 text-center dark:border-gray-700 dark:bg-gray-900/50">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {t.chooseImage}
          </p>

          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {t.uploadHelp}
          </p>

          <button
            type="button"
            disabled={disabled || uploading}
            onClick={() => inputRef.current?.click()}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
          >
            {uploading
              ? t.uploading
              : t.chooseImage}
          </button>
        </div>
      )}

      {mode === "url" && (
        <div>
          <input
            type="url"
            value={value}
            disabled={disabled || uploading}
            onChange={(event) => {
              setError("");
              onChange(event.target.value);
            }}
            placeholder={t.urlPlaceholder}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />

          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {t.urlHelp}
          </p>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
          {error}
        </div>
      )}

      {value && (
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              {t.preview}
            </span>

            <button
              type="button"
              disabled={disabled || uploading}
              onClick={removeImage}
              className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/30"
            >
              {t.remove}
            </button>
          </div>

          <div className="flex justify-center">
            <img
              src={value}
              alt={t.preview}
              className="max-h-64 max-w-full rounded-xl object-contain shadow-sm"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          </div>

          <div className="mt-3 break-all rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-500 dark:bg-gray-900 dark:text-gray-400">
            {value}
          </div>
        </div>
      )}
    </div>
  );
}