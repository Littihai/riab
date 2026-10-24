import { useEffect, type ReactNode } from "react";
import type { Route } from "@/App";
import { useI18n } from "@/providers/I18nProvider";
import { useTheme } from "@/providers/ThemeProvider";

const NAV: { route: Route; hash: string; key: string }[] = [
  { route: "home", hash: "#/", key: "nav.home" },
  { route: "components", hash: "#/components", key: "nav.components" },
  { route: "form", hash: "#/form", key: "nav.form" },
  { route: "table", hash: "#/table", key: "nav.table" },
];

const TITLE_KEY: Record<Route, string> = {
  home: "nav.home",
  components: "nav.components",
  form: "nav.form",
  table: "nav.table",
  login: "login.title",
  "404": "nf.title",
};

/** The app frame every demo page shares: header (brand, nav, theme, language) and footer. */
export function Shell({ route, children }: { route: Route; children: ReactNode }) {
  const { t, lang, setLang } = useI18n();
  const { resolved, setPref } = useTheme();

  // the tab title follows the page (and the language)
  useEffect(() => {
    document.title = `riab · ${t(TITLE_KEY[route])}`;
  }, [route, lang]); // eslint-disable-line react-hooks/exhaustive-deps

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
        <span className="lang-toggle" role="group" aria-label={t("header.lang")}>
          <button type="button" aria-pressed={lang === "th"} onClick={() => setLang("th")}>ไทย</button>
          <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button>
        </span>
        <a className="nav-item login-link" href="#/login">{t("nav.login")}</a>
      </header>

      {children}

      <footer className="app-footer">
        <span>{t("footer.note")}</span>
        <span>Inter + Noto Sans Thai</span>
      </footer>
    </>
  );
}
