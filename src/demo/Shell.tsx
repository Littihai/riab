import { useEffect, useState, type ReactNode } from "react";
import type { Route } from "@/App";
import { useI18n } from "@/providers/I18nProvider";
import { useTheme } from "@/providers/ThemeProvider";
import { useAppearance } from "@/providers/AppearanceProvider";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { SettingsDialog } from "@/demo/SettingsDialog";
import { CmdK, type Command } from "@/demo/CmdK";
import { SideNav, NAV } from "@/demo/SideNav";
import { Icon } from "@/components/ui/Icon";
import { Menu } from "@/components/ui/Menu";
import { Popover } from "@/components/ui/Popover";
import type { DictKey } from "@/i18n/dict";

/**
 * The app frame every demo page shares. The nav lives where the Customize
 * choice puts it: the header row (top), a labelled sidebar (side) or an icon
 * rail (rail); a phone always gets the top layout. Ctrl K opens the palette.
 */
export function Shell({ route, children }: { route: Route; children: ReactNode }) {
  const { t, lang, setLang } = useI18n();
  const { resolved, setPref } = useTheme();
  const ap = useAppearance();
  const mobile = useMediaQuery("(max-width: 760px)");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const navMode = mobile ? "top" : ap.nav;
  const sideMode = navMode !== "top";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const commands: Command[] = [
    ...NAV.map((n) => ({
      id: n.route,
      label: t(n.key),
      hint: t("cmdk.goto"),
      run: () => {
        window.location.hash = n.hash;
      },
    })),
    {
      id: "login",
      label: t("nav.login"),
      hint: t("cmdk.goto"),
      run: () => {
        window.location.hash = "#/login";
      },
    },
    { id: "settings", label: t("set.title"), run: () => setSettingsOpen(true) },
    { id: "theme", label: t("header.theme"), run: () => setPref(resolved === "dark" ? "light" : "dark") },
  ];

  const go = (hash: string) => () => {
    window.location.hash = hash;
  };
  const appsCurrent = route === "form" || route === "table";
  const notifs: DictKey[] = ["bell.n1", "bell.n2", "bell.n3"];

  const header = (
    <header className="app-header">
      {!sideMode && (
        <>
          <span className="brand">
            <span className="tile">ร</span>
            {t("app.name")}
          </span>
          <nav className="app-nav" aria-label={t("nav.home")}>
            {NAV.filter((n) => n.route === "home" || n.route === "components").map((n) => (
              <a key={n.route} className="nav-item" aria-current={route === n.route ? "page" : undefined} href={n.hash}>
                {t(n.key)}
              </a>
            ))}
            <Menu
              label={t("nav.apps")}
              triggerClassName="nav-item nav-menu"
              current={appsCurrent}
              items={NAV.filter((n) => n.route === "form" || n.route === "table").map((n) => ({
                id: n.route,
                label: t(n.key),
                onSelect: go(n.hash),
              }))}
            />
          </nav>
        </>
      )}
      <span className="flex-1" />
      <button type="button" className="search-chip" onClick={() => setPaletteOpen(true)}>
        <Icon name="search" size={16} />
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
        <Icon name="contrast" />
      </button>
      <button
        type="button"
        className="icon-btn"
        aria-label={t("set.title")}
        title={t("set.title")}
        aria-haspopup="dialog"
        onClick={() => setSettingsOpen(true)}
      >
        <Icon name="gear" />
      </button>
      <Popover
        align="end"
        label={t("bell.title")}
        triggerClassName="icon-btn bell-btn"
        triggerLabel={t("bell.label").replace("%n", String(notifs.length))}
        trigger={
          <>
            <Icon name="bell" />
            <span className="bell-badge" aria-hidden="true">
              {notifs.length}
            </span>
          </>
        }
      >
        <div className="notif">
          <h2 className="notif-title">{t("bell.title")}</h2>
          <ul className="notif-list">
            {notifs.map((k) => (
              <li key={k}>{t(k)}</li>
            ))}
          </ul>
        </div>
      </Popover>
      <span className="lang-toggle" role="group" aria-label={t("header.lang")}>
        <button type="button" aria-pressed={lang === "th"} onClick={() => setLang("th")}>
          ไทย
        </button>
        <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>
          EN
        </button>
      </span>
      <Menu
        align="end"
        chevron={false}
        triggerClassName="user-chip"
        triggerLabel={t("user.menu")}
        label={
          <>
            <span className="avatar" aria-hidden="true">
              <Icon name="user" size={18} />
            </span>
            <span className="user-text">
              <span className="user-name">{t("user.name")}</span>
              <span className="user-role">{t("user.role")}</span>
            </span>
          </>
        }
        items={[
          { id: "settings", label: t("set.title"), onSelect: () => setSettingsOpen(true) },
          { id: "signout", label: t("user.signout"), onSelect: go("#/login") },
        ]}
      />
    </header>
  );

  const footer = (
    <footer className="app-footer">
      <span>{t("footer.note")}</span>
      <span>Inter + Noto Sans Thai</span>
    </footer>
  );

  // the router owns the hash, so the skip link moves focus instead of navigating
  const skip = (e: React.MouseEvent) => {
    e.preventDefault();
    const main = document.querySelector<HTMLElement>("main");
    if (!main) return;
    main.tabIndex = -1;
    main.focus();
  };

  return (
    <>
      <a className="skip-link" href="#main" onClick={skip}>
        {t("a11y.skip")}
      </a>
      {sideMode ? (
        <div className="layout">
          <SideNav rail={navMode === "rail"} route={route} />
          <div className="layout-main">
            {header}
            {children}
            {footer}
          </div>
        </div>
      ) : (
        <>
          {header}
          {children}
          {footer}
        </>
      )}

      <SettingsDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <CmdK open={paletteOpen} onClose={() => setPaletteOpen(false)} commands={commands} />
    </>
  );
}
