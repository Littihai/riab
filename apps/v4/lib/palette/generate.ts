import {
  clampToGamut,
  contrastRatio,
  formatOklch,
  hexToOklch,
  oklchToHex,
  type Oklch,
} from "./color"

export const TOKEN_NAMES = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "border",
  "input",
  "ring",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
] as const

export type TokenName = (typeof TOKEN_NAMES)[number]

export type ThemeScale = Record<TokenName, Oklch>

export type Theme = {
  seed: string
  radius: string
  light: ThemeScale
  dark: ThemeScale
}

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n))

const hue = (h: number, offset: number) => (((h + offset) % 360) + 360) % 360

// Pick the foreground (near-white or near-black, tinted with the seed hue)
// that reads best on top of `bg`.
function foregroundFor(bg: Oklch): Oklch {
  const light: Oklch = { l: 0.985, c: Math.min(bg.c * 0.05, 0.01), h: bg.h }
  const dark: Oklch = { l: 0.15, c: Math.min(bg.c * 0.15, 0.03), h: bg.h }
  const bgHex = oklchToHex(bg)
  return contrastRatio(bgHex, oklchToHex(light)) >=
    contrastRatio(bgHex, oklchToHex(dark))
    ? light
    : dark
}

function chartHues(h: number, c: number, l: number): Oklch[] {
  // Analogous pair, then a complement and its neighbour: distinct but related.
  const chroma = Math.max(c, 0.12)
  return [0, 40, 80, 180, 220].map((offset) =>
    clampToGamut({ l, c: chroma, h: hue(h, offset) })
  )
}

function lightScale(seed: Oklch): ThemeScale {
  const { c, h } = seed
  const tint = (l: number, factor: number, max: number): Oklch => ({
    l,
    c: Math.min(c * factor, max),
    h,
  })

  const background = tint(0.995, 0.05, 0.005)
  const foreground = tint(0.15, 0.15, 0.03)
  const primary = clampToGamut({
    l: clamp(seed.l, 0.3, 0.75),
    c,
    h,
  })
  const secondary = tint(0.96, 0.15, 0.03)
  const muted = tint(0.96, 0.08, 0.012)
  const accent = tint(0.94, 0.3, 0.05)
  const border = tint(0.91, 0.1, 0.012)
  const ring = clampToGamut({ l: 0.7, c: Math.min(c, 0.15), h })
  const [chart1, chart2, chart3, chart4, chart5] = chartHues(h, c, 0.65)
  const sidebar = tint(0.985, 0.08, 0.008)

  return {
    background,
    foreground,
    card: background,
    "card-foreground": foreground,
    popover: background,
    "popover-foreground": foreground,
    primary,
    "primary-foreground": foregroundFor(primary),
    secondary,
    "secondary-foreground": tint(0.25, 0.2, 0.04),
    muted,
    "muted-foreground": tint(0.55, 0.1, 0.02),
    accent,
    "accent-foreground": tint(0.25, 0.2, 0.04),
    destructive: { l: 0.577, c: 0.245, h: 27.325 },
    "destructive-foreground": { l: 0.985, c: 0, h: 0 },
    border,
    input: border,
    ring,
    "chart-1": chart1,
    "chart-2": chart2,
    "chart-3": chart3,
    "chart-4": chart4,
    "chart-5": chart5,
    sidebar,
    "sidebar-foreground": foreground,
    "sidebar-primary": primary,
    "sidebar-primary-foreground": foregroundFor(primary),
    "sidebar-accent": accent,
    "sidebar-accent-foreground": tint(0.25, 0.2, 0.04),
    "sidebar-border": border,
    "sidebar-ring": ring,
  }
}

function darkScale(seed: Oklch): ThemeScale {
  const { c, h } = seed
  const tint = (l: number, factor: number, max: number): Oklch => ({
    l,
    c: Math.min(c * factor, max),
    h,
  })

  const background = tint(0.15, 0.1, 0.02)
  const foreground = tint(0.985, 0.05, 0.008)
  const card = tint(0.2, 0.1, 0.02)
  // Lift the seed so it stays vivid against a dark surface.
  const primary = clampToGamut({
    l: clamp(seed.l + 0.1, 0.6, 0.85),
    c: c * 0.9,
    h,
  })
  const secondary = tint(0.27, 0.15, 0.03)
  const muted = tint(0.27, 0.1, 0.02)
  const accent = tint(0.32, 0.3, 0.06)
  const border: Oklch = { l: 1, c: 0, h: 0, alpha: 0.1 }
  const input: Oklch = { l: 1, c: 0, h: 0, alpha: 0.15 }
  const ring = clampToGamut({ l: 0.55, c: Math.min(c, 0.15), h })
  const [chart1, chart2, chart3, chart4, chart5] = chartHues(h, c, 0.7)

  return {
    background,
    foreground,
    card,
    "card-foreground": foreground,
    popover: card,
    "popover-foreground": foreground,
    primary,
    "primary-foreground": foregroundFor(primary),
    secondary,
    "secondary-foreground": foreground,
    muted,
    "muted-foreground": tint(0.71, 0.1, 0.02),
    accent,
    "accent-foreground": foreground,
    destructive: { l: 0.704, c: 0.191, h: 22.216 },
    "destructive-foreground": { l: 0.985, c: 0, h: 0 },
    border,
    input,
    ring,
    "chart-1": chart1,
    "chart-2": chart2,
    "chart-3": chart3,
    "chart-4": chart4,
    "chart-5": chart5,
    sidebar: card,
    "sidebar-foreground": foreground,
    "sidebar-primary": primary,
    "sidebar-primary-foreground": foregroundFor(primary),
    "sidebar-accent": accent,
    "sidebar-accent-foreground": foreground,
    "sidebar-border": border,
    "sidebar-ring": ring,
  }
}

export function generateTheme(seedHex: string, radius = "0.625rem"): Theme {
  const seed = hexToOklch(seedHex)
  return {
    seed: seedHex,
    radius,
    light: lightScale(seed),
    dark: darkScale(seed),
  }
}

export function scaleToCssVars(scale: ThemeScale) {
  return Object.fromEntries(
    TOKEN_NAMES.map((name) => [`--${name}`, formatOklch(scale[name])])
  ) as Record<`--${TokenName}`, string>
}

export function themeToCss(theme: Theme) {
  const block = (selector: string, scale: ThemeScale, extra: string[] = []) =>
    [
      `${selector} {`,
      ...extra.map((line) => `  ${line}`),
      ...TOKEN_NAMES.map(
        (name) => `  --${name}: ${formatOklch(scale[name])};`
      ),
      `}`,
    ].join("\n")

  return [
    `/* Generated by riab-ui from ${theme.seed} */`,
    block(":root", theme.light, [`--radius: ${theme.radius};`]),
    "",
    block(".dark", theme.dark),
    "",
  ].join("\n")
}

export { oklchToHex, formatOklch } from "./color"
