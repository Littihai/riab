export const locales = ["en"] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"

// Cookie read on the client to restore the chosen language across visits.
export const LOCALE_COOKIE = "riab-locale"

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value)
}
