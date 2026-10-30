"use client"

import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { useLocale } from "@/components/locale-provider"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Button } from "@/styles/radix-luma/ui/button"

export function HomeHero() {
  const { t } = useLocale()

  return (
    <PageHeader className="md:**:[.container]:pb-8 lg:**:[.container]:pb-12">
      <Badge asChild variant="secondary" className="bg-muted">
        <Link href="/palette">
          {t.home.announcement} <ArrowRightIcon />
        </Link>
      </Badge>
      <PageHeaderHeading className="max-w-4xl">{t.home.title}</PageHeaderHeading>
      <PageHeaderDescription>{t.home.description}</PageHeaderDescription>
      <PageActions>
        <Button asChild className="h-[35px]">
          <Link href="/palette">{t.home.getStarted}</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/docs/components">{t.home.viewComponents}</Link>
        </Button>
      </PageActions>
    </PageHeader>
  )
}
