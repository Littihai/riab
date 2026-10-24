import { useRef, useState, type ReactNode } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useI18n } from "@/providers/I18nProvider";
import { useTheme, type ThemePref } from "@/providers/ThemeProvider";
import {
  useAppearance,
  type Accent,
  type Density,
  type FontFamily,
  type Icons,
  type Motion,
  type NavLayout,
  type Radius,
  type ThemeBase,
} from "@/providers/AppearanceProvider";
import { Segmented } from "@/components/ui/Segmented";
import { OptionCards } from "@/components/ui/OptionCards";
import { Switch } from "@/components/ui/Switch";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import type { DictKey } from "@/i18n/dict";
import { BasePreview, FontPreview, NavPreview, RadiusPreview, SchemePreview } from "@/demo/SettingsPreviews";

/**
 * The settings dialog: a section list on the left (grouped), the section on the
 * right with titled blocks. Choices are picture cards where a picture helps
 * (scheme, font, base, corners, navigation) and small controls otherwise.
 * Every choice applies the moment it is picked and is remembered on this
 * device; on a phone the section list becomes a row on top.
 */

const ACCENTS: Accent[] = ["ink", "blue", "azure", "teal", "green", "indigo", "violet", "rose", "amber", "slate"];
const FONTS: FontFamily[] = ["inter", "plex", "sarabun", "system"];
const BASES: ThemeBase[] = ["zinc", "slate", "gray", "neutral", "stone"];
const RADII: Radius[] = ["none", "soft", "round"];
const NAVS: NavLayout[] = ["top", "side", "rail"];

const SECTIONS = [
  { id: "general", icon: "gear", group: "personal" },
  { id: "account", icon: "user", group: "personal" },
  { id: "notifications", icon: "bell", group: "personal" },
  { id: "about", icon: "info", group: "other" },
] as const satisfies readonly { id: string; icon: IconName; group: "personal" | "other" }[];
type Section = (typeof SECTIONS)[number]["id"];

function Swatches({
  value,
  onChange,
  ariaLabel,
  name,
}: {
  value: Accent;
  onChange: (a: Accent) => void;
  ariaLabel: string;
  name: (a: Accent) => string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const go = (i: number) => {
    onChange(ACCENTS[(i + ACCENTS.length) % ACCENTS.length]);
    requestAnimationFrame(() => ref.current?.querySelector<HTMLElement>('[aria-checked="true"]')?.focus());
  };
  return (
    <div ref={ref} className="accent-row" role="radiogroup" aria-label={ariaLabel}>
      {ACCENTS.map((a) => {
        const on = a === value;
        return (
          <button
            key={a}
            type="button"
            role="radio"
            aria-checked={on}
            tabIndex={on ? 0 : -1}
            className="accent-pick"
            onClick={() => onChange(a)}
            onKeyDown={(e) => {
              const i = ACCENTS.indexOf(value);
              if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                e.preventDefault();
                go(i + 1);
              } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                e.preventDefault();
                go(i - 1);
              }
            }}
          >
            <span className="accent-dot" data-a={a}>
              {on && <Icon name="check" size={16} />}
            </span>
            <span className="accent-name">{name(a)}</span>
          </button>
        );
      })}
    </div>
  );
}

export function SettingsDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, lang, setLang } = useI18n();
  const { pref, setPref } = useTheme();
  const ap = useAppearance();
  const [section, setSection] = useState<Section>("general");
  const [digest, setDigest] = useState(true);
  const [alerts, setAlerts] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, open, onClose);

  if (!open) return null;

  const current = SECTIONS.find((s) => s.id === section)!;

  const block = (label: string, hint: string | undefined, control: ReactNode) => (
    <div className="set-block">
      <h4 className="set-label">{label}</h4>
      {hint && <p className="set-hint">{hint}</p>}
      {control}
    </div>
  );
  const group = (title: string, children: ReactNode) => (
    <section className="set-group">
      <h4 className="set-group-title">{title}</h4>
      {children}
    </section>
  );
  const navGroup = (g: "personal" | "other") => (
    <div className="set-nav-group">
      <div className="set-nav-title">{t(`set.${g}`)}</div>
      {SECTIONS.filter((s) => s.group === g).map((s) => (
        <button
          key={s.id}
          type="button"
          className="set-nav-item"
          aria-current={section === s.id ? "true" : undefined}
          onClick={() => setSection(s.id)}
        >
          <Icon name={s.icon} size={18} />
          {t(`set.${s.id}`)}
        </button>
      ))}
    </div>
  );

  return (
    <div
      className="scrim settings-scrim"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={t("set.title")}
        className="settings menu-slide"
      >
        <aside className="set-side">
          <h2 className="set-title">{t("set.title")}</h2>
          <nav className="set-nav" aria-label={t("set.title")}>
            {navGroup("personal")}
            {navGroup("other")}
          </nav>
        </aside>

        <div className="set-main">
          <button type="button" className="icon-btn set-close" aria-label={t("set.close")} onClick={onClose}>
            <Icon name="close" size={18} />
          </button>

          <header className="set-head">
            <h3>
              <Icon name={current.icon} size={22} />
              {t(`set.${section}`)}
            </h3>
            <p>{t(`set.${section}.sub` as DictKey)}</p>
          </header>

          <div className="set-scroll">
            {section === "general" && (
              <>
                {group(
                  t("set.sec.appearance"),
                  <>
                    {block(
                      t("set.theme"),
                      t("set.theme.hint"),
                      <OptionCards
                        ariaLabel={t("set.theme")}
                        value={pref}
                        onChange={(v) => setPref(v as ThemePref)}
                        options={(["light", "dark", "system"] as const).map((v) => ({
                          value: v,
                          label: t(`set.theme.${v}`),
                          preview: <SchemePreview scheme={v} />,
                        }))}
                      />,
                    )}
                    {block(
                      t("set.accent"),
                      t("set.accent.hint"),
                      <Swatches
                        ariaLabel={t("set.accent")}
                        value={ap.accent}
                        onChange={(a) => ap.set("accent", a)}
                        name={(a) => t(`set.accent.${a}`)}
                      />,
                    )}
                    {block(
                      t("set.font"),
                      t("set.font.hint"),
                      <OptionCards
                        ariaLabel={t("set.font")}
                        value={ap.font}
                        onChange={(v) => ap.set("font", v as FontFamily)}
                        options={FONTS.map((f) => ({
                          value: f,
                          label: t(`set.font.${f}`),
                          preview: <FontPreview font={f} />,
                        }))}
                      />,
                    )}
                    {block(
                      t("set.base"),
                      t("set.base.hint"),
                      <OptionCards
                        size="sm"
                        ariaLabel={t("set.base")}
                        value={ap.base}
                        onChange={(v) => ap.set("base", v as ThemeBase)}
                        options={BASES.map((b) => ({
                          value: b,
                          label: t(`set.base.${b}`),
                          preview: <BasePreview base={b} />,
                        }))}
                      />,
                    )}
                    {block(
                      t("set.radius"),
                      t("set.radius.hint"),
                      <OptionCards
                        size="sm"
                        ariaLabel={t("set.radius")}
                        value={ap.radius}
                        onChange={(v) => ap.set("radius", v as Radius)}
                        options={RADII.map((r) => ({
                          value: r,
                          label: t(`set.radius.${r}`),
                          preview: <RadiusPreview radius={r} />,
                        }))}
                      />,
                    )}
                  </>,
                )}

                {group(
                  t("set.sec.layout"),
                  <>
                    {block(
                      t("set.nav"),
                      t("set.nav.hint"),
                      <OptionCards
                        size="sm"
                        ariaLabel={t("set.nav")}
                        value={ap.nav}
                        onChange={(v) => ap.set("nav", v as NavLayout)}
                        options={NAVS.map((n) => ({
                          value: n,
                          label: t(`set.nav.${n}`),
                          preview: <NavPreview nav={n} />,
                        }))}
                      />,
                    )}
                    {block(
                      t("set.density"),
                      t("set.density.hint"),
                      <Segmented
                        ariaLabel={t("set.density")}
                        value={ap.density}
                        onChange={(v) => ap.set("density", v as Density)}
                        options={[
                          { value: "comfortable", label: t("set.density.comfortable") },
                          { value: "compact", label: t("set.density.compact") },
                        ]}
                      />,
                    )}
                  </>,
                )}

                {group(
                  t("set.sec.behavior"),
                  <>
                    {block(
                      t("set.icons"),
                      t("set.icons.hint"),
                      <Segmented
                        ariaLabel={t("set.icons")}
                        value={ap.icons}
                        onChange={(v) => ap.set("icons", v as Icons)}
                        options={[
                          { value: "mono", label: t("set.icons.mono") },
                          { value: "color", label: t("set.icons.color") },
                        ]}
                      />,
                    )}
                    {block(
                      t("set.motion"),
                      t("set.motion.hint"),
                      <Segmented
                        ariaLabel={t("set.motion")}
                        value={ap.motion}
                        onChange={(v) => ap.set("motion", v as Motion)}
                        options={[
                          { value: "system", label: t("set.motion.system") },
                          { value: "reduce", label: t("set.motion.reduce") },
                        ]}
                      />,
                    )}
                  </>,
                )}

                {group(
                  t("set.sec.language"),
                  block(
                    t("header.lang"),
                    t("set.lang.hint"),
                    <Segmented
                      ariaLabel={t("header.lang")}
                      value={lang}
                      onChange={(v) => setLang(v as "th" | "en")}
                      options={[
                        { value: "th", label: "ไทย" },
                        { value: "en", label: "English" },
                      ]}
                    />,
                  ),
                )}
              </>
            )}

            {section === "account" && (
              <div className="set-profile">
                <span className="avatar avatar-lg" aria-hidden="true">
                  <Icon name="user" size={28} />
                </span>
                <dl className="set-dl">
                  <dt>{t("set.account.name")}</dt>
                  <dd>{t("user.name")}</dd>
                  <dt>{t("set.account.role")}</dt>
                  <dd>{t("user.role")}</dd>
                  <dt>{t("set.account.email")}</dt>
                  <dd>{t("user.email")}</dd>
                </dl>
                <Button
                  variant="ghost"
                  onClick={() => {
                    onClose();
                    window.location.hash = "#/login";
                  }}
                >
                  {t("user.signout")}
                </Button>
              </div>
            )}

            {section === "notifications" && (
              <div className="set-notifs">
                <div className="set-switch-row">
                  <Switch ariaLabel={t("set.notif.email")} checked={digest} onChange={setDigest} />
                  <span>{t("set.notif.email")}</span>
                </div>
                <div className="set-switch-row">
                  <Switch ariaLabel={t("set.notif.app")} checked={alerts} onChange={setAlerts} />
                  <span>{t("set.notif.app")}</span>
                </div>
                <p className="set-hint">{t("set.notif.demo")}</p>
              </div>
            )}

            {section === "about" && (
              <div className="set-about">
                <p>{t("set.about.text")}</p>
                <p className="muted">
                  riab · MIT · <a href="https://github.com/Littihai/riab">GitHub</a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
