"use client"

import Link from "next/link"
import { IconColorSwatch, IconDeviceDesktop, IconPhoto, IconMoodSmile } from "@tabler/icons-react"


// Copy lives here rather than in the shared dictionaries: this section is the
// only consumer and it keeps the home page self-contained.
const COPY = {
  en: {
    palette: ["One color, whole theme", "Pick a seed. Every light and dark token is derived in OKLCH so the theme stays in tune."],
    image: ["From a logo or photo", "Drop an image and start from its dominant colors. Nothing leaves your browser."],
    screens: ["See it on real screens", "Dashboard, landing page and sign-in form, switchable in light and dark."],
    chat: ["Chat UI with icons", "A friendly chat kit with 200+ cute icons for avatars, stickers and reactions."],
  },
} as const

const TILES = [
  { key: "palette", icon: IconColorSwatch, href: "/palette", tone: "bg-chart-1/25 text-primary" },
  { key: "image", icon: IconPhoto, href: "/palette", tone: "bg-chart-2/25 text-accent-foreground" },
  { key: "screens", icon: IconDeviceDesktop, href: "/palette", tone: "bg-chart-3/25 text-primary" },
  { key: "chat", icon: IconMoodSmile, href: "/chat", tone: "bg-chart-5/25 text-foreground" },
] as const

export function HomeFeatures() {
  const copy = COPY.en

  return (
    <section className="container-wrapper">
      <div className="container grid gap-4 px-6 pb-20 sm:grid-cols-2 lg:grid-cols-4">
        {TILES.map(({ key, icon: Icon, href, tone }) => {
          const [title, description] = copy[key]
          return (
            <Link
              key={key}
              href={href}
              className="glass group flex flex-col gap-3 rounded-3xl p-5 transition-transform hover:-translate-y-0.5"
            >
              <span className={`flex size-10 items-center justify-center rounded-2xl ${tone}`}>
                <Icon className="size-5" />
              </span>
              <span className="font-heading text-base font-semibold">{title}</span>
              <span className="text-sm text-muted-foreground">{description}</span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
