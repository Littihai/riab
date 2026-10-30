import { en, type Dictionary } from "./dictionaries/en"
import { defaultLocale, type Locale } from "./config"

const dictionaries: Record<Locale, Dictionary> = { en }

export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale]
}

export { defaultLocale, isLocale, locales, LOCALE_COOKIE } from "./config"
export type { Locale } from "./config"
export type { Dictionary } from "./dictionaries/en"
