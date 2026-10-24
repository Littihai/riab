import type { Route } from "@/App";
import { useI18n } from "@/providers/I18nProvider";

export const NAV: { route: Route; hash: string; key: string; icon: string }[] = [
  { route: "home", hash: "#/", key: "nav.home", icon: "⌂" },
  { route: "components", hash: "#/components", key: "nav.components", icon: "▦" },
  { route: "form", hash: "#/form", key: "nav.form", icon: "✎" },
  { route: "table", hash: "#/table", key: "nav.table", icon: "▤" },
];

/** The sidebar modes: full labels (side) or icons with tooltips (rail). */
export function SideNav({ rail, route }: { rail: boolean; route: Route }) {
  const { t } = useI18n();
  return (
    <aside className={rail ? "side rail" : "side"}>
      <a className="brand side-brand" href="#/" aria-label={t("app.name")}>
        <span className="tile">ร</span>
        {!rail && t("app.name")}
      </a>
      <nav className="side-list" aria-label={t("nav.home")}>
        {NAV.map((n) => (
          <a
            key={n.route}
            className="side-item"
            href={n.hash}
            aria-current={route === n.route ? "page" : undefined}
            aria-label={rail ? t(n.key) : undefined}
            title={rail ? t(n.key) : undefined}
          >
            <span className="side-icon" aria-hidden>{n.icon}</span>
            {!rail && <span>{t(n.key)}</span>}
          </a>
        ))}
      </nav>
    </aside>
  );
}
