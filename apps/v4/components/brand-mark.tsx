import Link from "next/link"
import { cn } from "cn"

import { siteConfig } from "@/lib/config"

// Three overlapping translucent discs: the palette idea in one glyph.
export function BrandMark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("items-center gap-2 font-heading font-semibold", className)}
      aria-label={siteConfig.name}
    >
      <span className="relative block size-6">
        <span className="absolute top-0 left-0 size-4 rounded-full bg-chart-1/80 mix-blend-multiply dark:mix-blend-screen" />
        <span className="absolute top-0 right-0 size-4 rounded-full bg-chart-2/80 mix-blend-multiply dark:mix-blend-screen" />
        <span className="absolute bottom-0 left-1 size-4 rounded-full bg-chart-3/80 mix-blend-multiply dark:mix-blend-screen" />
      </span>
      <span>{siteConfig.name}</span>
    </Link>
  )
}
