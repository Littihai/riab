import {
  Geist_Mono as FontMono,
  Noto_Sans_Arabic as FontNotoSansArabic,
  Noto_Sans_Hebrew as FontNotoSansHebrew,
  Noto_Sans_Thai as FontNotoSansThai,
  Geist as FontSans,
} from "next/font/google"
import { cn } from "cn"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontHeading = FontSans({
  subsets: ["latin"],
  variable: "--font-heading",
})

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
})

const fontNotoSansArabic = FontNotoSansArabic({
  subsets: ["latin"],
  variable: "--font-ar",
})

const fontNotoSansHebrew = FontNotoSansHebrew({
  subsets: ["latin"],
  variable: "--font-he",
})

// Geist has no Thai glyphs; this is swapped in for html[lang="th"] in globals.css.
const fontNotoSansThai = FontNotoSansThai({
  subsets: ["thai", "latin"],
  variable: "--font-th",
})

export const fontVariables = cn(
  fontSans.variable,
  fontHeading.variable,
  fontMono.variable,
  fontNotoSansArabic.variable,
  fontNotoSansHebrew.variable,
  fontNotoSansThai.variable
)
