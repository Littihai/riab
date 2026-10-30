// Minimal sRGB <-> OKLCH conversion (Björn Ottosson's OKLab matrices) so the
// palette generator has no runtime color dependency.

export type Oklch = { l: number; c: number; h: number; alpha?: number }

type Rgb = { r: number; g: number; b: number }

export function isHex(value: string) {
  return /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value.trim())
}

export function normalizeHex(value: string) {
  let hex = value.trim().replace(/^#/, "").toLowerCase()
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((ch) => ch + ch)
      .join("")
  }
  return `#${hex}`
}

function hexToRgb(hex: string): Rgb {
  const n = parseInt(normalizeHex(hex).slice(1), 16)
  return {
    r: ((n >> 16) & 255) / 255,
    g: ((n >> 8) & 255) / 255,
    b: (n & 255) / 255,
  }
}

function rgbToHex({ r, g, b }: Rgb) {
  const to = (v: number) =>
    Math.round(Math.min(1, Math.max(0, v)) * 255)
      .toString(16)
      .padStart(2, "0")
  return `#${to(r)}${to(g)}${to(b)}`
}

function srgbToLinear(c: number) {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

function linearToSrgb(c: number) {
  return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055
}

function linearRgbToOklab({ r, g, b }: Rgb) {
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b
  const l_ = Math.cbrt(l)
  const m_ = Math.cbrt(m)
  const s_ = Math.cbrt(s)
  return {
    L: 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
    a: 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
    b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_,
  }
}

function oklabToLinearRgb(L: number, a: number, b: number): Rgb {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.291485548 * b
  const l = l_ * l_ * l_
  const m = m_ * m_ * m_
  const s = s_ * s_ * s_
  return {
    r: 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    g: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    b: -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  }
}

export function hexToOklch(hex: string): Oklch {
  const rgb = hexToRgb(hex)
  const { L, a, b } = linearRgbToOklab({
    r: srgbToLinear(rgb.r),
    g: srgbToLinear(rgb.g),
    b: srgbToLinear(rgb.b),
  })
  const c = Math.sqrt(a * a + b * b)
  let h = (Math.atan2(b, a) * 180) / Math.PI
  if (h < 0) h += 360
  // Hue is meaningless for near-greys; pin it to 0 so output is stable.
  return { l: L, c: c < 1e-4 ? 0 : c, h: c < 1e-4 ? 0 : h }
}

function oklchToLinearRgb({ l, c, h }: Oklch): Rgb {
  const rad = (h * Math.PI) / 180
  return oklabToLinearRgb(l, c * Math.cos(rad), c * Math.sin(rad))
}

function inGamut({ r, g, b }: Rgb) {
  const eps = 1e-4
  return (
    r >= -eps && r <= 1 + eps && g >= -eps && g <= 1 + eps && b >= -eps && b <= 1 + eps
  )
}

// Reduce chroma until the color fits in sRGB. Keeps lightness and hue, which
// is what you want for a design token: the tone stays the same, just less vivid.
export function clampToGamut(color: Oklch): Oklch {
  if (inGamut(oklchToLinearRgb(color))) return color
  let lo = 0
  let hi = color.c
  for (let i = 0; i < 20; i++) {
    const mid = (lo + hi) / 2
    if (inGamut(oklchToLinearRgb({ ...color, c: mid }))) lo = mid
    else hi = mid
  }
  return { ...color, c: lo }
}

export function oklchToHex(color: Oklch) {
  const lin = oklchToLinearRgb(clampToGamut(color))
  return rgbToHex({
    r: linearToSrgb(lin.r),
    g: linearToSrgb(lin.g),
    b: linearToSrgb(lin.b),
  })
}

export function formatOklch({ l, c, h, alpha }: Oklch) {
  const fmt = (n: number, d: number) =>
    Number(n.toFixed(d)).toString()
  const base = `${fmt(l, 3)} ${fmt(c, 3)} ${fmt(h, 1)}`
  return alpha !== undefined && alpha < 1
    ? `oklch(${base} / ${Math.round(alpha * 100)}%)`
    : `oklch(${base})`
}

// WCAG 2.x relative luminance / contrast ratio, used to pick readable foregrounds.
function relativeLuminance(hex: string) {
  const { r, g, b } = hexToRgb(hex)
  return (
    0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b)
  )
}

export function contrastRatio(hexA: string, hexB: string) {
  const a = relativeLuminance(hexA)
  const b = relativeLuminance(hexB)
  const [hi, lo] = a > b ? [a, b] : [b, a]
  return (hi + 0.05) / (lo + 0.05)
}
