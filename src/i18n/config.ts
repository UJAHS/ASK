export const locales = ["en", "hi", "gu"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
  gu: "ગુજરાતી",
};

export function isValidLocale(
  value: string
): value is Locale {
  return locales.includes(value as Locale);
}