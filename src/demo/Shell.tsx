import { useState, type ReactNode } from "react";
import type { Route } from "@/App";
import { useI18n } from "@/providers/I18nProvider";
import { useTheme } from "@/providers/ThemeProvider";
import { SettingsDialog } from "@/demo/SettingsDialog";

const NAV: { route: Route; hash: string; key: string }[] = [
  { route: "home", hash: "#/", key: "nav.home" },
  { route: "components", hash: "#/components", key: "nav.components" },
  { route: "form", hash: "#/form", key: "nav.form" },
  { route: "table", hash: "#/table", key: "nav.table" },
];

/** The app frame every demo page shares: header (brand, nav, theme, language) and footer. */
export function Shell({ route, children }: { route: Route; children: ReactNode }) {
  const { t, lang, setLang } = useI18n();
  const { resolved, setPref } = useTheme();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <header className="app-header">
        <span className="brand">
          <span className="tile">ร</span>
          {t("app.name")}
        </span>
        <nav className="app-nav" aria-label={t("nav.home")}>
          {NAV.map((n) => (
            <a key={n.route} className="nav-item" aria-current={route === n.route ? "page" : undefined} href={n.hash}>
              {t(n.key)}
            </a>
          ))}
        </nav>
        <span className="flex-1" />
        <button type="button" className="search-chip">
          <span aria-hidden>⌕</span>
          <span className="hint">{t("header.search")}</span>
          <kbd>Ctrl K</kbd>
        </button>
        <button
          type="button"
          className="icon-btn"
          aria-label={t("header.theme")}
          title={t("header.theme")}
          onClick={() => setPref(resolved === "dark" ? "light" : "dark")}
        >
          ◐
        </button>
        <button
          type="button"
          className="icon-btn"
          aria-label={t("set.title")}
          title={t("set.title")}
          aria-haspopup="dialog"
          onClick={() => setSettingsOpen(true)}
        >
          ⛭
        </button>
        <span className="lang-toggle" role="group" aria-label={t("header.lang")}>
          <button type="button" aria-pressed={lang === "th"} onClick={() => setLang("th")}>ไทย</button>
          <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button>
        </span>
        <a className="nav-item login-link" href="#/login">{t("nav.login")}</a>
      </header>

      <SettingsDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} />

      {children}

      <footer className="app-footer">
        <span>{t("footer.note")}</span>
        <span>Inter + Noto Sans Thai</span>
      </footer>
    </>
  );
}
