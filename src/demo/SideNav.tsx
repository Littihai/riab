import type { Route } from "@/App";
import { useI18n } from "@/providers/I18nProvider";
import { useAppearance } from "@/providers/AppearanceProvider";
import { Icon, type IconName } from "@/components/ui/Icon";

export const NAV: { route: Route; hash: string; key: string; icon: IconName; hue: "violet" | "blue" | "teal" }[] = [
  { route: "home", hash: "#/", key: "nav.home", icon: "home", hue: "blue" },
  { route: "components", hash: "#/components", key: "nav.components", icon: "grid", hue: "violet" },
  { route: "form", hash: "#/form", key: "nav.form", icon: "form", hue: "blue" },
  { route: "table", hash: "#/table", key: "nav.table", icon: "table", hue: "teal" },
];

/**
 * The sidebar modes: full labels (side) or icons with tooltips (rail). Labels
 * stay in the DOM in both so every link keeps its accessible name; the rail
 * only fades them out, and the footer button glides between the two modes.
 */
export function SideNav({ rail, route }: { rail: boolean; route: Route }) {
  const { t } = useI18n();
  const { set } = useAppearance();
  return (
    <aside className={rail ? "side rail" : "side"}>
      <a className="brand side-brand" href="#/" aria-label={t("app.name")}>
        <span className="tile">ร</span>
        <span className="side-label">{t("app.name")}</span>
      </a>
      <nav className="side-list" aria-label={t("nav.home")}>
        {NAV.map((n) => (
          <a
            key={n.route}
            className="side-item"
            href={n.hash}
            data-hue={n.hue}
            aria-current={route === n.route ? "page" : undefined}
            title={rail ? t(n.key) : undefined}
          >
            <span className="side-icon">
              <Icon name={n.icon} />
            </span>
            <span className="side-label">{t(n.key)}</span>
          </a>
        ))}
      </nav>
      <span className="flex-1" />
      <button
        type="button"
        className="side-toggle"
        aria-label={rail ? t("nav.expand") : t("nav.collapse")}
        title={rail ? t("nav.expand") : t("nav.collapse")}
        onClick={() => set("nav", rail ? "side" : "rail")}
      >
        <Icon name="chevronLeft" size={18} />
      </button>
    </aside>
  );
}
