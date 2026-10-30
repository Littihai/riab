"use client"

import { cn } from "cn"

import { useLocale } from "@/components/locale-provider"
import { Button } from "@/registry/new-york-v4/ui/button"

export function LocaleSwitcher({
  variant = "ghost",
  className,
}: {
  variant?: React.ComponentProps<typeof Button>["variant"]
  className?: string
}) {
  const { locale, setLocale, t } = useLocale()
  const next = locale === "th" ? "en" : "th"

  return (
    <Button
      variant={variant}
      size="sm"
      className={cn("h-8 px-2 text-xs font-medium uppercase", className)}
      onClick={() => setLocale(next)}
      aria-label={`${t.locale.label}: ${t.locale[next]}`}
      title={t.locale[next]}
    >
      {next}
    </Button>
  )
}
