"use client"

import * as React from "react"
import { IconPhoto, IconX } from "@tabler/icons-react"
import { cn } from "cn"

import { extractColors, loadImage, type ExtractedColor } from "@/lib/palette/extract"
import { useLocale } from "@/components/locale-provider"
import { Button } from "@/registry/new-york-v4/ui/button"

export function PaletteImagePicker({
  selected,
  onPick,
}: {
  selected: string
  onPick: (hex: string) => void
}) {
  const { t } = useLocale()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)
  const [colors, setColors] = React.useState<ExtractedColor[]>([])
  const [error, setError] = React.useState<string | null>(null)
  const [dragging, setDragging] = React.useState(false)

  // Object URLs must be released or the image stays in memory.
  React.useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const reset = React.useCallback(() => {
    setPreviewUrl(null)
    setColors([])
    setError(null)
    if (inputRef.current) inputRef.current.value = ""
  }, [])

  const handleFile = React.useCallback(
    async (file: File | undefined) => {
      if (!file || !file.type.startsWith("image/")) return
      setError(null)
      const url = URL.createObjectURL(file)
      try {
        const img = await loadImage(url)
        const found = extractColors(img)
        setPreviewUrl(url)
        setColors(found)
        if (found.length === 0) {
          setError(t.palette.imageNoColors)
        } else {
          onPick(found[0].hex)
        }
      } catch {
        URL.revokeObjectURL(url)
        setError(t.palette.imageError)
      }
    },
    [onPick, t.palette.imageError, t.palette.imageNoColors]
  )

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">{t.palette.imageLabel}</span>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        data-testid="palette-image-input"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {previewUrl ? (
        <div className="flex flex-col gap-2">
          <div className="relative overflow-hidden rounded-md border bg-muted/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt=""
              className="mx-auto max-h-32 w-auto object-contain"
            />
            <Button
              type="button"
              size="icon"
              variant="secondary"
              aria-label={t.palette.imageRemove}
              onClick={reset}
              className="absolute top-1 right-1 size-6"
            >
              <IconX />
            </Button>
          </div>
          {colors.length > 0 && (
            <>
              <span className="text-xs text-muted-foreground">
                {t.palette.imageExtracted}
              </span>
              <div className="flex flex-wrap gap-2" data-testid="extracted-colors">
                {colors.map(({ hex }) => (
                  <button
                    key={hex}
                    type="button"
                    aria-label={hex}
                    aria-pressed={selected === hex}
                    onClick={() => onPick(hex)}
                    className={cn(
                      "size-7 rounded-full border shadow-xs transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                      selected === hex &&
                        "ring-2 ring-ring ring-offset-2 ring-offset-background"
                    )}
                    style={{ backgroundColor: hex }}
                  />
                ))}
              </div>
            </>
          )}
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="w-fit"
            onClick={() => inputRef.current?.click()}
          >
            {t.palette.imageChange}
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragging(false)
            handleFile(e.dataTransfer.files?.[0])
          }}
          className={cn(
            "flex flex-col items-center gap-1.5 rounded-md border border-dashed px-3 py-5 text-center text-xs text-muted-foreground transition-colors hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
            dragging && "border-ring bg-muted/50"
          )}
        >
          <IconPhoto className="size-5" />
          <span>{t.palette.imageHint}</span>
        </button>
      )}

      {error && <p className="text-xs text-destructive">{error}</p>}
      <p className="text-[11px] text-muted-foreground">{t.palette.imagePrivacy}</p>
    </div>
  )
}
