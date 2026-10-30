"use client"

import * as React from "react"
import { IconMoodPlus, IconSend, IconSticker } from "@tabler/icons-react"
import { cn } from "cn"

import { ChatIconGlyph, IconPicker } from "@/components/chat/icon-picker"
import { useLocale } from "@/components/locale-provider"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Input } from "@/registry/new-york-v4/ui/input"

type Message = {
  id: number
  from: "me" | "them"
  text?: string
  sticker?: string
  reactions: string[]
  time: string
}

type Room = {
  id: string
  name: string
  icon: string
  messages: Message[]
}

const INITIAL_ROOMS: Room[] = [
  {
    id: "design",
    name: "Design crew",
    icon: "fun/palette",
    messages: [
      { id: 1, from: "them", text: "New palette is up! Try the teal seed 👀", reactions: ["hearts/heart-filled"], time: "09:12" },
      { id: 2, from: "me", text: "On it. The dark mode cards look great.", reactions: [], time: "09:14" },
      { id: 3, from: "them", sticker: "faces/crazy-happy", reactions: [], time: "09:15" },
      { id: 4, from: "me", text: "Shipping the landing preview today.", reactions: ["fun/confetti", "nature/rocket"], time: "09:20" },
    ],
  },
  {
    id: "weekend",
    name: "Weekend plans",
    icon: "nature/beach",
    messages: [
      { id: 1, from: "them", text: "Beach or mountains?", reactions: [], time: "Yesterday" },
      { id: 2, from: "me", sticker: "nature/mountain", reactions: ["faces/happy"], time: "Yesterday" },
      { id: 3, from: "them", text: "Mountains it is. Bringing snacks.", reactions: ["food/cookie"], time: "Yesterday" },
    ],
  },
  {
    id: "pets",
    name: "Pet pics",
    icon: "animals/cat",
    messages: [
      { id: 1, from: "them", sticker: "animals/dog", reactions: ["hearts/heart"], time: "Mon" },
      { id: 2, from: "me", text: "Okay that is the cutest.", reactions: [], time: "Mon" },
    ],
  },
]

export function ChatScreen({ className }: { className?: string }) {
  const { t } = useLocale()
  const [rooms, setRooms] = React.useState(INITIAL_ROOMS)
  const [activeId, setActiveId] = React.useState(INITIAL_ROOMS[0].id)
  const [myIcon, setMyIcon] = React.useState("faces/smile")
  const [draft, setDraft] = React.useState("")
  const listRef = React.useRef<HTMLDivElement>(null)

  const room = rooms.find((r) => r.id === activeId) ?? rooms[0]

  const updateRoom = React.useCallback(
    (id: string, update: (room: Room) => Room) =>
      setRooms((prev) => prev.map((r) => (r.id === id ? update(r) : r))),
    []
  )

  const send = React.useCallback(
    (payload: Pick<Message, "text" | "sticker">) => {
      updateRoom(room.id, (r) => ({
        ...r,
        messages: [
          ...r.messages,
          {
            id: (r.messages.at(-1)?.id ?? 0) + 1,
            from: "me",
            reactions: [],
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            ...payload,
          },
        ],
      }))
    },
    [room.id, updateRoom]
  )

  const toggleReaction = (messageId: number, icon: string) =>
    updateRoom(room.id, (r) => ({
      ...r,
      messages: r.messages.map((m) =>
        m.id !== messageId
          ? m
          : {
              ...m,
              reactions: m.reactions.includes(icon)
                ? m.reactions.filter((x) => x !== icon)
                : [...m.reactions, icon],
            }
      ),
    }))

  React.useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight })
  }, [room.messages.length, activeId])

  return (
    <div
      data-slot="chat-screen"
      className={cn(
        "grid h-[600px] overflow-hidden rounded-xl border bg-background text-foreground md:grid-cols-[220px_1fr]",
        className
      )}
    >
      <aside className="hidden flex-col border-r bg-sidebar text-sidebar-foreground md:flex">
        <div className="flex items-center justify-between px-3 py-3">
          <span className="text-sm font-semibold">{t.chat.rooms}</span>
          <IconPicker value={myIcon} onPick={setMyIcon} align="end">
            <button
              type="button"
              title={t.chat.yourAvatar}
              aria-label={t.chat.yourAvatar}
              className="rounded-full transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <ChatIconGlyph id={myIcon} />
            </button>
          </IconPicker>
        </div>
        <div className="flex flex-col gap-0.5 px-2">
          {rooms.map((r) => {
            const last = r.messages.at(-1)
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setActiveId(r.id)}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-2 py-2 text-left transition-colors hover:bg-sidebar-accent",
                  r.id === room.id && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
              >
                <ChatIconGlyph id={r.icon} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{r.name}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {last?.text ?? t.chat.stickerPreview}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="flex items-center gap-3 border-b px-4 py-2.5">
          <IconPicker
            value={room.icon}
            onPick={(icon) => updateRoom(room.id, (r) => ({ ...r, icon }))}
          >
            <button
              type="button"
              title={t.chat.changeAvatar}
              aria-label={t.chat.changeAvatar}
              className="rounded-full transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <ChatIconGlyph id={room.icon} />
            </button>
          </IconPicker>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{room.name}</div>
            <div className="text-xs text-muted-foreground">{t.chat.changeAvatarHint}</div>
          </div>
        </header>

        <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4">
          <div className="flex flex-col gap-3">
            {room.messages.map((m) => {
              const mine = m.from === "me"
              return (
                <div
                  key={m.id}
                  className={cn("group flex items-end gap-2", mine && "flex-row-reverse")}
                >
                  <ChatIconGlyph id={mine ? myIcon : room.icon} size="sm" />
                  <div className={cn("flex max-w-[75%] flex-col gap-1", mine && "items-end")}>
                    {m.sticker ? (
                      <ChatIconGlyph id={m.sticker} size="lg" className="shadow-sm" />
                    ) : (
                      <div
                        className={cn(
                          "rounded-2xl px-3.5 py-2 text-sm",
                          mine
                            ? "rounded-br-sm bg-primary text-primary-foreground"
                            : "rounded-bl-sm bg-muted"
                        )}
                      >
                        {m.text}
                      </div>
                    )}
                    <div className={cn("flex items-center gap-1", mine && "flex-row-reverse")}>
                      <span className="text-[10px] text-muted-foreground">{m.time}</span>
                      {m.reactions.map((icon) => (
                        <button
                          key={icon}
                          type="button"
                          onClick={() => toggleReaction(m.id, icon)}
                          title={t.chat.removeReaction}
                          className="rounded-full border bg-card p-0.5 shadow-xs transition-transform hover:scale-110"
                        >
                          <ChatIconGlyph id={icon} size="sm" />
                        </button>
                      ))}
                      <IconPicker onPick={(icon) => toggleReaction(m.id, icon)} align={mine ? "end" : "start"}>
                        <button
                          type="button"
                          title={t.chat.addReaction}
                          aria-label={t.chat.addReaction}
                          className="rounded-full p-1 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-muted hover:text-foreground focus-visible:opacity-100"
                        >
                          <IconMoodPlus className="size-4" />
                        </button>
                      </IconPicker>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <form
          className="flex items-center gap-2 border-t p-3"
          onSubmit={(e) => {
            e.preventDefault()
            const text = draft.trim()
            if (!text) return
            send({ text })
            setDraft("")
          }}
        >
          <IconPicker onPick={(sticker) => send({ sticker })}>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              title={t.chat.sendSticker}
              aria-label={t.chat.sendSticker}
            >
              <IconSticker />
            </Button>
          </IconPicker>
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={t.chat.placeholder}
            className="flex-1"
            data-testid="chat-composer"
          />
          <Button type="submit" size="icon" aria-label={t.chat.send}>
            <IconSend />
          </Button>
        </form>
      </div>
    </div>
  )
}
