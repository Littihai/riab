import { type Metadata } from "next"

import { getDictionary } from "@/lib/i18n"
import { ChatPage } from "@/components/chat/chat-page"

const { title, description } = getDictionary().chat

export const metadata: Metadata = {
  title,
  description: description.replace("{count}", "200+"),
  openGraph: {
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description.replace("{count}", "200+"))}`,
      },
    ],
  },
}

export default function Page() {
  return <ChatPage />
}
