"use client"

import * as React from "react"

import {
  defaultLocale,
  getDictionary,
  isLocale,
  LOCALE_COOKIE,
  type Dictionary,
  type Locale,
} from "@/lib/i18n"

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Dictionary
}

const LocaleContext = React.createContext<LocaleContextValue | null>(null)

function readLocaleCookie(): Locale | null {
  if (typeof document === "undefined") {
    return null
  }
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`)
  )
  const value = match ? decodeURIComponent(match[1]) : null
  return isLocale(value) ? value : null
}

function writeLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  // Start with the default on both server and client so hydration matches,
  // then switch to the saved locale once mounted.
  const [locale, setLocaleState] = React.useState<Locale>(defaultLocale)

  React.useEffect(() => {
    const saved = readLocaleCookie()
    if (saved && saved !== locale) {
      setLocaleState(saved)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = React.useCallback((next: Locale) => {
    writeLocaleCookie(next)
    setLocaleState(next)
  }, [])

  const value = React.useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, t: getDictionary(locale) }),
    [locale, setLocale]
  )

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = React.useContext(LocaleContext)
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider")
  }
  return context
}

// Inline script run before hydration so <html lang> (and therefore the Thai
// font) is correct on first paint, mirroring the theme-color script.
export const LOCALE_INIT_SCRIPT = `
  try {
    var m = document.cookie.match(/(?:^|; )${LOCALE_COOKIE}=([^;]*)/);
    var l = m ? decodeURIComponent(m[1]) : null;
    if (l === 'en') document.documentElement.lang = l;
  } catch (_) {}
`
