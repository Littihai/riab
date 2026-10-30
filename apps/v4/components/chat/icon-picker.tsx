"use client"

import * as React from "react"
import { IconSearch } from "@tabler/icons-react"
import { cn } from "cn"

import {
  CHAT_ICONS,
  getIconTone,
  ICON_CATEGORIES,
  type IconCategoryId,
} from "@/lib/chat/icons"
import { useLocale } from "@/components/locale-provider"
import { Input } from "@/registry/new-york-v4/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/new-york-v4/ui/popover"

export function ChatIconGlyph({
  id,
  className,
  size = "md",
}: {
  id: string
  className?: string
  size?: "sm" | "md" | "lg"
}) {
  const entry = CHAT_ICONS[id]
  if (!entry) return null
  const { Icon } = entry
  return (
    <span
      data-icon={id}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full",
        getIconTone(id),
        size === "sm" && "size-6 [&>svg]:size-3.5",
        size === "md" && "size-8 [&>svg]:size-4.5",
        size === "lg" && "size-12 [&>svg]:size-7",
        className
      )}
    >
      <Icon stroke={1.75} />
    </span>
  )
}

export function IconPicker({
  value,
  onPick,
  children,
  align = "start",
}: {
  value?: string
  onPick: (id: string) => void
  children: React.ReactNode
  align?: "start" | "center" | "end"
}) {
  const { t } = useLocale()
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [category, setCategory] = React.useState<IconCategoryId | "all">("all")

  const q = query.trim().toLowerCase()
  const visible = React.useMemo(
    () =>
      Object.values(CHAT_ICONS).filter(
        (icon) =>
          (category === "all" || icon.category === category) &&
          (q === "" || icon.name.includes(q))
      ),
    [category, q]
  )

  const categoryLabel = (id: IconCategoryId) => t.chat.categories[id]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align={align} className="w-80 p-2" data-slot="icon-picker">
        <div className="relative">
          <IconSearch className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.chat.searchIcons}
            className="h-8 pl-8"
          />
        </div>
        <div className="no-scrollbar -mx-2 mt-2 flex gap-1 overflow-x-auto px-2">
          {(["all", ...ICON_CATEGORIES.map((c) => c.id)] as const).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setCategory(id)}
              className={cn(
                "shrink-0 rounded-full px-2.5 py-1 text-xs transition-colors",
                category === id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {id === "all" ? t.chat.allCategories : categoryLabel(id)}
            </button>
          ))}
        </div>
        <div className="mt-2 max-h-56 overflow-y-auto">
          {visible.length === 0 ? (
            <p className="py-8 text-center text-xs text-muted-foreground">
              {t.chat.noIcons}
            </p>
          ) : (
            <div className="grid grid-cols-7 gap-1">
              {visible.map((icon) => (
                <button
                  key={icon.name}
                  type="button"
                  title={icon.name.split("/")[1]}
                  aria-label={icon.name}
                  aria-pressed={value === icon.name}
                  onClick={() => {
                    onPick(icon.name)
                    setOpen(false)
                  }}
                  className={cn(
                    "flex items-center justify-center rounded-lg p-1 transition-transform hover:scale-110 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                    value === icon.name && "bg-muted ring-2 ring-ring"
                  )}
                >
                  <ChatIconGlyph id={icon.name} />
                </button>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
