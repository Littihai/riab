import { useRef, useState } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useI18n } from "@/providers/I18nProvider";
import { useTheme, type ThemePref } from "@/providers/ThemeProvider";
import { useAppearance, type Accent, type Density, type Icons, type Motion, type NavLayout, type Radius } from "@/providers/AppearanceProvider";
import { Segmented } from "@/components/ui/Segmented";
import { Icon } from "@/components/ui/Icon";

/**
 * The settings dialog: a section rail on the left, the section's controls on
 * the right; on a phone the rail becomes a row on top. Every choice applies
 * the moment it is picked and is remembered on this device.
 */

const ACCENTS: Accent[] = ["ink", "clay", "pine", "blue", "indigo"];
const SECTIONS = ["general", "appearance", "about"] as const;
type Section = (typeof SECTIONS)[number];

export function SettingsDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, lang, setLang } = useI18n();
  const { pref, setPref } = useTheme();
  const ap = useAppearance();
  const [section, setSection] = useState<Section>("general");
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, open, onClose);

  if (!open) return null;

  const row = (label: string, control: React.ReactNode) => (
    <div className="set-row">
      <span className="set-label">{label}</span>
      {control}
    </div>
  );

  return (
    <div className="scrim" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label={t("set.title")} className="settings menu-slide">
        <nav className="set-nav" aria-label={t("set.title")}>
          {SECTIONS.map((s) => (
            <button
              key={s}
              type="button"
              className="set-nav-item"
              aria-current={section === s ? "true" : undefined}
              onClick={() => setSection(s)}
            >
              {t(`set.${s}`)}
            </button>
          ))}
        </nav>

        <div className="set-body">
          <div className="set-head">
            <h2>{t(`set.${section}`)}</h2>
            <button type="button" className="icon-btn" aria-label={t("set.close")} onClick={onClose}><Icon name="close" size={18} /></button>
          </div>

          {section === "general" && (
            <>
              {row(t("set.theme"), (
                <Segmented
                  ariaLabel={t("set.theme")}
                  value={pref}
                  onChange={(v) => setPref(v as ThemePref)}
                  options={[
                    { value: "light", label: t("set.theme.light") },
                    { value: "dark", label: t("set.theme.dark") },
                    { value: "system", label: t("set.theme.system") },
                  ]}
                />
              ))}
              {row(t("header.lang"), (
                <Segmented
                  ariaLabel={t("header.lang")}
                  value={lang}
                  onChange={(v) => setLang(v as "th" | "en")}
                  options={[{ value: "th", label: "ไทย" }, { value: "en", label: "English" }]}
                />
              ))}
              {row(t("set.motion"), (
                <Segmented
                  ariaLabel={t("set.motion")}
                  value={ap.motion}
                  onChange={(v) => ap.set("motion", v as Motion)}
                  options={[
                    { value: "system", label: t("set.motion.system") },
                    { value: "reduce", label: t("set.motion.reduce") },
                  ]}
                />
              ))}
            </>
          )}

          {section === "appearance" && (
            <>
              {row(t("set.accent"), (
                <div className="accent-row" role="radiogroup" aria-label={t("set.accent")}>
                  {ACCENTS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      role="radio"
                      aria-checked={ap.accent === a}
                      aria-label={t(`set.accent.${a}`)}
                      title={t(`set.accent.${a}`)}
                      className="accent-dot"
                      data-a={a}
                      onClick={() => ap.set("accent", a)}
                    />
                  ))}
                </div>
              ))}
              {row(t("set.icons"), (
                <Segmented
                  ariaLabel={t("set.icons")}
                  value={ap.icons}
                  onChange={(v) => ap.set("icons", v as Icons)}
                  options={[
                    { value: "mono", label: t("set.icons.mono") },
                    { value: "color", label: t("set.icons.color") },
                  ]}
                />
              ))}
              {row(t("set.radius"), (
                <Segmented
                  ariaLabel={t("set.radius")}
                  value={ap.radius}
                  onChange={(v) => ap.set("radius", v as Radius)}
                  options={[
                    { value: "none", label: t("set.radius.none") },
                    { value: "soft", label: t("set.radius.soft") },
                    { value: "round", label: t("set.radius.round") },
                  ]}
                />
              ))}
              {row(t("set.nav"), (
                <Segmented
                  ariaLabel={t("set.nav")}
                  value={ap.nav}
                  onChange={(v) => ap.set("nav", v as NavLayout)}
                  options={[
                    { value: "top", label: t("set.nav.top") },
                    { value: "side", label: t("set.nav.side") },
                    { value: "rail", label: t("set.nav.rail") },
                  ]}
                />
              ))}
              {row(t("set.density"), (
                <Segmented
                  ariaLabel={t("set.density")}
                  value={ap.density}
                  onChange={(v) => ap.set("density", v as Density)}
                  options={[
                    { value: "comfortable", label: t("set.density.comfortable") },
                    { value: "compact", label: t("set.density.compact") },
                  ]}
                />
              ))}
            </>
          )}

          {section === "about" && (
            <div className="set-about">
              <p>{t("set.about.text")}</p>
              <p className="muted">riab v0.2 · MIT · <a href="https://github.com/Littihai/riab">GitHub</a></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
