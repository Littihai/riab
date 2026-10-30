"use client"

import * as React from "react"
import { IconCheck, IconCopy } from "@tabler/icons-react"

import { CHAT_ICON_COUNT, ICON_CATEGORIES } from "@/lib/chat/icons"
import { ChatScreen } from "@/components/chat/chat-screen"
import { ChatIconGlyph, IconPicker } from "@/components/chat/icon-picker"
import { copyToClipboardWithMeta } from "@/components/copy-button"
import { useLocale } from "@/components/locale-provider"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Button } from "@/registry/new-york-v4/ui/button"

const USAGE = `import { IconPicker, ChatIconGlyph } from "@/components/chat/icon-picker"

const [icon, setIcon] = useState("faces/smile")

<IconPicker value={icon} onPick={setIcon}>
  <button type="button">
    <ChatIconGlyph id={icon} />
  </button>
</IconPicker>`

export function ChatPage() {
  const { t } = useLocale()
  const [copied, setCopied] = React.useState(false)
  const [demoIcon, setDemoIcon] = React.useState("animals/cat")

  React.useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>{t.chat.title}</PageHeaderHeading>
        <PageHeaderDescription>
          {t.chat.description.replace("{count}", String(CHAT_ICON_COUNT))}
        </PageHeaderDescription>
      </PageHeader>
      <div className="container-wrapper">
        <div className="container flex flex-col gap-10 py-8">
          <ChatScreen />

          <section className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <div className="flex flex-col gap-3">
              <h2 className="font-heading text-lg font-semibold">{t.chat.pickerTitle}</h2>
              <p className="text-sm text-muted-foreground">{t.chat.pickerDescription}</p>
              <div className="flex items-center gap-3">
                <IconPicker value={demoIcon} onPick={setDemoIcon}>
                  <Button variant="outline" data-testid="demo-picker">
                    <ChatIconGlyph id={demoIcon} size="sm" />
                    {t.chat.pickIcon}
                  </Button>
                </IconPicker>
                <code className="rounded-md bg-muted px-2 py-1 font-mono text-xs">
                  {demoIcon}
                </code>
              </div>
              <ul className="flex flex-wrap gap-2 pt-2">
                {ICON_CATEGORIES.map((category) => (
                  <li
                    key={category.id}
                    className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs"
                  >
                    <span className={`size-2.5 rounded-full ${category.tone.split(" ")[0].replace("/20", "").replace("/15", "")}`} />
                    {t.chat.categories[category.id]}
                    <span className="text-muted-foreground">
                      {Object.keys(category.icons).length}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium">{t.chat.usage}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={async () => {
                    if (await copyToClipboardWithMeta(USAGE)) setCopied(true)
                  }}
                >
                  {copied ? <IconCheck /> : <IconCopy />}
                  {copied ? t.palette.copied : t.chat.copy}
                </Button>
              </div>
              <pre className="overflow-auto rounded-xl border bg-code p-4 font-mono text-xs leading-relaxed text-code-foreground">
                <code>{USAGE}</code>
              </pre>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
