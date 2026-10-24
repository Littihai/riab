import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DICT, type Lang } from "@/i18n/dict";

const KEY = "riab.lang";

interface I18nValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  /** one formatter per locale — never format dates or money ad hoc */
  fmtMoney: (n: number) => string;
  fmtDate: (d: Date) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      return localStorage.getItem(KEY) === "en" ? "en" : "th";
    } catch {
      return "th";
    }
  });

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {
      /* fine without persistence */
    }
  };

  const t = (key: string) => DICT[key]?.[lang] ?? key;
  // Gregorian calendar in both languages so document numbers and years never drift (lesson from lotline)
  const money = new Intl.NumberFormat(lang === "th" ? "th-TH" : "en-GB", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  });
  const date = new Intl.DateTimeFormat(lang === "th" ? "th-TH-u-ca-gregory" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <I18nContext.Provider
      value={{ lang, setLang, t, fmtMoney: (n) => money.format(n), fmtDate: (d) => date.format(d) }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const v = useContext(I18nContext);
  if (!v) throw new Error("useI18n outside I18nProvider");
  return v;
}
