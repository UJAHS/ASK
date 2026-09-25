import {
  defaultLocale,
  isValidLocale,
  type Locale,
} from "./config";

import { dictionaries } from "./dictionaries";

export function getDictionary(
  locale: string
) {
  const validLocale: Locale = isValidLocale(locale)
    ? locale
    : defaultLocale;

  return dictionaries[validLocale];
}

export {
  defaultLocale,
  isValidLocale,
};

export type { Locale };