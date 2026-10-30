"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "cn"

import { type NavItem } from "@/lib/config"
import { PAGES_NEW } from "@/lib/docs"
import { useLocale } from "@/components/locale-provider"
import { Button } from "@/registry/new-york-v4/ui/button"

export function MainNav({
  items,
  className,
  ...props
}: React.ComponentProps<"nav"> & {
  items: readonly NavItem[]
}) {
  const pathname = usePathname()
  const { t } = useLocale()

  return (
    <nav className={cn("items-center gap-0", className)} {...props}>
      {items.map((item) => (
        <Button
          key={item.href}
          variant="ghost"
          asChild
          size="sm"
          className="px-2.5"
        >
          <Link
            href={item.href}
            data-active={pathname === item.href}
            data-new={PAGES_NEW.includes(item.href)}
            className="relative items-center"
          >
            {t.nav[item.key]}
          </Link>
        </Button>
      ))}
    </nav>
  )
}
