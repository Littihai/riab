import { hexToOklch, type Oklch } from "./color"

// Runs entirely in the browser: the image is drawn to a small offscreen canvas
// and never leaves the user's machine.

const SAMPLE_SIZE = 96
const BUCKET_BITS = 4 // 16 levels per channel -> 4096 buckets

type Bucket = { r: number; g: number; b: number; count: number }

export type ExtractedColor = { hex: string; share: number }

function toHex(r: number, g: number, b: number) {
  const to = (v: number) => Math.round(v).toString(16).padStart(2, "0")
  return `#${to(r)}${to(g)}${to(b)}`
}

export function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error("Could not load image"))
    img.src = src
  })
}

function samplePixels(img: HTMLImageElement) {
  const scale = Math.min(1, SAMPLE_SIZE / Math.max(img.width, img.height))
  const w = Math.max(1, Math.round(img.width * scale))
  const h = Math.max(1, Math.round(img.height * scale))
  const canvas = document.createElement("canvas")
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext("2d", { willReadFrequently: true })
  if (!ctx) throw new Error("Canvas not supported")
  ctx.drawImage(img, 0, 0, w, h)
  return ctx.getImageData(0, 0, w, h).data
}

// How much a color "wants" to be a seed: vivid mid-tones score high, greys
// and near-white/black score low, so a logo's brand color beats its background.
function seedScore(color: Oklch) {
  const lightnessFit = 1 - Math.min(1, Math.abs(color.l - 0.55) / 0.45)
  return 0.05 + color.c * 2 + lightnessFit * 0.3
}

function hueDistance(a: number, b: number) {
  const d = Math.abs(a - b) % 360
  return d > 180 ? 360 - d : d
}

function isSimilar(a: Oklch, b: Oklch) {
  const hueClose =
    a.c < 0.04 || b.c < 0.04 ? true : hueDistance(a.h, b.h) < 18
  return hueClose && Math.abs(a.l - b.l) < 0.14 && Math.abs(a.c - b.c) < 0.08
}

export function extractColors(
  img: HTMLImageElement,
  limit = 6
): ExtractedColor[] {
  const data = samplePixels(img)
  const buckets = new Map<number, Bucket>()
  let total = 0

  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3]
    if (alpha < 128) continue
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const key =
      ((r >> (8 - BUCKET_BITS)) << (BUCKET_BITS * 2)) |
      ((g >> (8 - BUCKET_BITS)) << BUCKET_BITS) |
      (b >> (8 - BUCKET_BITS))
    const bucket = buckets.get(key)
    if (bucket) {
      bucket.r += r
      bucket.g += g
      bucket.b += b
      bucket.count++
    } else {
      buckets.set(key, { r, g, b, count: 1 })
    }
    total++
  }

  if (total === 0) return []

  const candidates = [...buckets.values()]
    .map((bucket) => {
      const hex = toHex(
        bucket.r / bucket.count,
        bucket.g / bucket.count,
        bucket.b / bucket.count
      )
      const oklch = hexToOklch(hex)
      const share = bucket.count / total
      return { hex, oklch, share, score: share * seedScore(oklch) }
    })
    .sort((a, b) => b.score - a.score)

  const picked: typeof candidates = []
  for (const candidate of candidates) {
    if (picked.some((p) => isSimilar(p.oklch, candidate.oklch))) continue
    picked.push(candidate)
    if (picked.length >= limit) break
  }

  return picked.map(({ hex, share }) => ({ hex, share }))
}
