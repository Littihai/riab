import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/**
 * The Customize choices: accent, theme base, font, corners, density, icon tone, motion. Each applies as a
 * data attribute on <html> (the default removes the attribute), persists in
 * one localStorage key, and is re-applied before first paint by the inline
 * script in index.html.
 */

export type Accent = "ink" | "blue" | "azure" | "teal" | "green" | "indigo" | "violet" | "rose" | "amber" | "slate";
export type ThemeBase = "zinc" | "slate" | "gray" | "neutral" | "stone";
export type FontFamily = "inter" | "plex" | "sarabun" | "system";
export type Radius = "none" | "soft" | "round";
export type Density = "comfortable" | "compact";
export type Motion = "system" | "reduce";
export type Icons = "mono" | "color";
export type NavLayout = "top" | "side" | "rail";

export interface Appearance {
  accent: Accent;
  radius: Radius;
  density: Density;
  motion: Motion;
  nav: NavLayout;
  icons: Icons;
  base: ThemeBase;
  font: FontFamily;
}

const DEFAULTS: Appearance = {
  accent: "ink",
  radius: "soft",
  density: "comfortable",
  motion: "system",
  nav: "top",
  icons: "mono",
  base: "stone",
  font: "inter",
};
const KEY = "riab.app";

interface AppearanceValue extends Appearance {
  set: <K extends keyof Appearance>(key: K, value: Appearance[K]) => void;
}

const AppearanceContext = createContext<AppearanceValue | null>(null);

function load(): Appearance {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "{}") as Partial<Omit<Appearance, "accent">> & {
      accent?: string;
    };
    // v0.2 presets that were replaced: clay and pine map to their nearest colors
    const { accent: saved, ...rest } = raw;
    const accent = saved === "clay" ? "amber" : saved === "pine" ? "green" : saved;
    return { ...DEFAULTS, ...rest, ...(accent ? { accent: accent as Accent } : {}) };
  } catch {
    return DEFAULTS;
  }
}

export function AppearanceProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Appearance>(load);

  useEffect(() => {
    const el = document.documentElement;
    const apply = (attr: string, value: string, def: string) => {
      if (value === def) delete el.dataset[attr];
      else el.dataset[attr] = value;
    };
    apply("accent", state.accent, DEFAULTS.accent);
    apply("radius", state.radius, DEFAULTS.radius);
    apply("density", state.density, DEFAULTS.density);
    apply("icons", state.icons, DEFAULTS.icons);
    apply("base", state.base, DEFAULTS.base);
    apply("font", state.font, DEFAULTS.font);
    apply("motion", state.motion === "reduce" ? "reduce" : "system", "system");
  }, [state]);

  const set: AppearanceValue["set"] = (key, value) => {
    setState((cur) => {
      const next = { ...cur, [key]: value };
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* fine without persistence */
      }
      return next;
    });
  };

  return <AppearanceContext.Provider value={{ ...state, set }}>{children}</AppearanceContext.Provider>;
}

export function useAppearance() {
  const v = useContext(AppearanceContext);
  if (!v) throw new Error("useAppearance outside AppearanceProvider");
  return v;
}
