import type { ReactNode } from "react";
import { useI18n } from "@/providers/I18nProvider";
import { useTheme } from "@/providers/ThemeProvider";

/** The app frame every demo page shares: header (brand, nav, theme, language) and footer. */
export function Shell({ route, children }: { route: "home" | "components"; children: ReactNode }) {
  const { t, lang, setLang } = useI18n();
  const { resolved, setPref } = useTheme();

  return (
    <>
      <header className="app-header">
        <span className="brand">
          <span className="tile">ร</span>
          {t("app.name")}
        </span>
        <nav className="app-nav" aria-label={t("nav.home")}>
          <a className="nav-item" aria-current={route === "home" ? "page" : undefined} href="#/">{t("nav.home")}</a>
          <a className="nav-item" aria-current={route === "components" ? "page" : undefined} href="#/components">{t("nav.components")}</a>
        </nav>
        <span className="flex-1" />
        <button className="search-chip">
          <span aria-hidden>⌕</span>
          <span className="hint">{t("header.search")}</span>
          <kbd>Ctrl K</kbd>
        </button>
        <button
          className="icon-btn"
          aria-label={t("header.theme")}
          title={t("header.theme")}
          onClick={() => setPref(resolved === "dark" ? "light" : "dark")}
        >
          ◐
        </button>
        <span className="lang-toggle" role="group" aria-label={t("header.lang")}>
          <button aria-pressed={lang === "th"} onClick={() => setLang("th")}>ไทย</button>
          <button aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button>
        </span>
      </header>

      {children}

      <footer className="app-footer">
        <span>{t("footer.note")}</span>
        <span>Inter + Noto Sans Thai</span>
      </footer>
    </>
  );
}
