import { type Metadata } from "next"

import { getDictionary } from "@/lib/i18n"
import { PaletteGenerator } from "@/components/palette-generator"
import { PaletteHeader } from "@/components/palette-header"

// Metadata is static and uses the default locale; the page body translates
// on the client like the rest of the site.
const { title, description } = getDictionary().palette

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
}

export default function PalettePage() {
  return (
    <div>
      <PaletteHeader />
      <div className="container-wrapper">
        <div className="container py-8">
          <PaletteGenerator />
        </div>
      </div>
    </div>
  )
}
