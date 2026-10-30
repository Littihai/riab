"use client"

import * as React from "react"
import { IconCheck, IconCopy } from "@tabler/icons-react"
import { cn } from "cn"

import {
  generateTheme,
  oklchToHex,
  scaleToCssVars,
  themeToCss,
  type TokenName,
} from "@/lib/palette/generate"
import { isHex, normalizeHex } from "@/lib/palette/color"
import { copyToClipboardWithMeta } from "@/components/copy-button"
import { useLocale } from "@/components/locale-provider"
import { PaletteImagePicker } from "@/components/palette-image-picker"
import { DashboardScreen } from "@/components/palette-screens/dashboard"
import { FormScreen } from "@/components/palette-screens/form"
import { LandingScreen } from "@/components/palette-screens/landing"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Input } from "@/registry/new-york-v4/ui/input"
import { Label } from "@/registry/new-york-v4/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/registry/new-york-v4/ui/tabs"

const PRESETS = [
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#f59e0b",
  "#7c3aed",
  "#db2777",
  "#0d9488",
  "#171717",
]

// Tokens worth showing as swatches; the rest are derived aliases (card,
// popover, sidebar-*) and would only repeat colors.
const SWATCH_TOKENS: TokenName[] = [
  "background",
  "foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "muted",
  "muted-foreground",
  "accent",
  "destructive",
  "border",
  "ring",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
]

type Mode = "light" | "dark"
type Screen = "dashboard" | "landing" | "form"

const SCREENS: Record<Screen, React.ComponentType> = {
  dashboard: DashboardScreen,
  landing: LandingScreen,
  form: FormScreen,
}

export function PaletteGenerator({ className }: { className?: string }) {
  const { t } = useLocale()
  const [seed, setSeed] = React.useState(PRESETS[0])
  const [draft, setDraft] = React.useState(PRESETS[0])
  const [mode, setMode] = React.useState<Mode>("light")
  const [screen, setScreen] = React.useState<Screen>("dashboard")
  const [copied, setCopied] = React.useState(false)

  const theme = React.useMemo(() => generateTheme(seed), [seed])
  const scale = theme[mode]
  const css = React.useMemo(() => themeToCss(theme), [theme])
  const previewVars = React.useMemo(
    () => scaleToCssVars(scale) as React.CSSProperties,
    [scale]
  )
  const draftValid = isHex(draft)
  const ScreenComponent = SCREENS[screen]

  const commit = React.useCallback((value: string) => {
    if (!isHex(value)) return
    const hex = normalizeHex(value)
    setSeed(hex)
    setDraft(hex)
  }, [])

  React.useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  const screenLabels: Record<Screen, string> = {
    dashboard: t.palette.screenDashboard,
    landing: t.palette.screenLanding,
    form: t.palette.screenForm,
  }

  return (
    <div className={cn("grid gap-8 lg:grid-cols-[300px_1fr]", className)}>
      <aside className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="seed-hex">{t.palette.seedLabel}</Label>
          <div className="flex items-center gap-2">
            <label
              className="relative size-9 shrink-0 overflow-hidden rounded-md border shadow-xs"
              style={{ backgroundColor: seed }}
            >
              <input
                type="color"
                aria-label={t.palette.seedLabel}
                value={seed}
                onChange={(e) => commit(e.target.value)}
                className="absolute inset-0 size-full cursor-pointer opacity-0"
              />
            </label>
            <Input
              id="seed-hex"
              value={draft}
              placeholder={t.palette.hexPlaceholder}
              spellCheck={false}
              aria-invalid={!draftValid}
              onChange={(e) => {
                setDraft(e.target.value)
                if (isHex(e.target.value)) commit(e.target.value)
              }}
              onBlur={() => draftValid && commit(draft)}
              className="font-mono uppercase"
            />
          </div>
          {!draftValid && (
            <p className="text-xs text-destructive">{t.palette.invalidHex}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">{t.palette.presets}</span>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((hex) => (
              <button
                key={hex}
                type="button"
                aria-label={hex}
                aria-pressed={seed === hex}
                onClick={() => commit(hex)}
                className={cn(
                  "size-7 rounded-full border shadow-xs transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  seed === hex && "ring-2 ring-ring ring-offset-2 ring-offset-background"
                )}
                style={{ backgroundColor: hex }}
              />
            ))}
          </div>
        </div>

        <PaletteImagePicker selected={seed} onPick={commit} />

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">{t.palette.tokens}</span>
          <ul className="grid grid-cols-2 gap-2">
            {SWATCH_TOKENS.map((name) => {
              const hex = oklchToHex(scale[name])
              return (
                <li key={name} className="flex items-center gap-2 text-xs">
                  <span
                    className="size-6 shrink-0 rounded-md border"
                    style={{ backgroundColor: hex }}
                  />
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate font-medium">{name}</span>
                    <span className="font-mono text-muted-foreground">
                      {hex}
                    </span>
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </aside>

      <div className="flex min-w-0 flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Tabs value={screen} onValueChange={(v) => setScreen(v as Screen)}>
            <TabsList>
              {(Object.keys(SCREENS) as Screen[]).map((key) => (
                <TabsTrigger key={key} value={key}>
                  {screenLabels[key]}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
            <TabsList>
              <TabsTrigger value="light">{t.palette.light}</TabsTrigger>
              <TabsTrigger value="dark">{t.palette.dark}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Inline vars beat :root/.dark rules, so the preview is fully
            scoped; `dark` class keeps dark: variants working inside. */}
        <div
          data-slot="palette-preview"
          data-screen={screen}
          className={cn(
            "rounded-xl border bg-muted/30 p-3 text-foreground sm:p-6",
            mode === "dark" && "dark"
          )}
          style={previewVars}
        >
          <ScreenComponent />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium">{t.palette.code}</span>
            <Button
              size="sm"
              variant="outline"
              onClick={async () => {
                if (await copyToClipboardWithMeta(css)) setCopied(true)
              }}
            >
              {copied ? <IconCheck /> : <IconCopy />}
              {copied ? t.palette.copied : t.palette.copy}
            </Button>
          </div>
          <pre className="max-h-96 overflow-auto rounded-xl border bg-code p-4 font-mono text-xs leading-relaxed text-code-foreground">
            <code>{css}</code>
          </pre>
          <p className="text-xs text-muted-foreground">{t.palette.copyHint}</p>
        </div>
      </div>
    </div>
  )
}
