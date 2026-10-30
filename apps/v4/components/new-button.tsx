"use client"

import Link from "next/link"
import { PlusSignIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { useLocale } from "@/components/locale-provider"
import { Button } from "@/styles/radix-nova/ui/button"

export function NewButton() {
  const { t } = useLocale()

  return (
    <Button asChild size="sm" className="h-[31px] rounded-lg">
      <Link href="/create">
        <HugeiconsIcon icon={PlusSignIcon} />
        {t.header.new}
      </Link>
    </Button>
  )
}
