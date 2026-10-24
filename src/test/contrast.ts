import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Reads src/styles/tokens.css and resolves the custom properties the way the
 * cascade would for a theme + accent combination, so tests can measure real
 * contrast instead of trusting a hand-kept table.
 */

const TOKENS = join(process.cwd(), "src", "styles", "tokens.css");

type Vars = Record<string, string>;
type Rule = { selectors: string[]; vars: Vars };

function parseRules(css: string): Rule[] {
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const rules: Rule[] = [];
  for (const m of clean.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const vars: Vars = {};
    for (const d of m[2].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) vars[d[1]] = d[2].trim();
    if (Object.keys(vars).length === 0) continue;
    rules.push({ selectors: m[1].split(",").map((s) => s.replace(/\s+/g, "").trim()), vars });
  }
  return rules;
}

const RULES = parseRules(readFileSync(TOKENS, "utf8"));

export const ACCENTS = ["ink", "blue", "azure", "teal", "green", "indigo", "violet", "rose", "amber", "slate"] as const;
export const BASES = ["zinc", "slate", "gray", "neutral", "stone"] as const;
export type Theme = "light" | "dark";

/** Custom properties for a theme, accent and gray base, in cascade order. */
export function resolve(
  theme: Theme,
  accent: (typeof ACCENTS)[number] = "ink",
  base: (typeof BASES)[number] = "zinc",
): Vars {
  const picks: string[] = [":root", '[data-theme="light"]', `[data-base="${base}"]`];
  if (theme === "dark") picks.push('[data-theme="dark"]', `[data-theme="dark"][data-base="${base}"]`);
  if (accent !== "ink") {
    picks.push(`[data-accent="${accent}"]`);
    if (theme === "dark") picks.push(`[data-theme="dark"][data-accent="${accent}"]`);
  }
  const out: Vars = {};
  for (const sel of picks) {
    for (const r of RULES) if (r.selectors.includes(sel)) Object.assign(out, r.vars);
  }
  return out;
}

export function hex(vars: Vars, name: string): [number, number, number] {
  const raw = vars[name];
  const m = raw && /^#([0-9a-f]{6})$/i.exec(raw);
  if (!m) throw new Error(`${name} is not a #rrggbb value: ${raw}`);
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function luminance([r, g, b]: [number, number, number]) {
  const lin = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

export function ratio(a: [number, number, number], b: [number, number, number]) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** color-mix(in srgb, fill pct%, surface): the same wash the sidebar uses. */
export function mix(
  fill: [number, number, number],
  base: [number, number, number],
  pct: number,
): [number, number, number] {
  return fill.map((c, i) => Math.round(c * pct + base[i] * (1 - pct))) as [number, number, number];
}

export { TOKENS };
