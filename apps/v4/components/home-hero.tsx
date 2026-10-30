"use client"

import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { useLocale } from "@/components/locale-provider"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Button } from "@/registry/new-york-v4/ui/button"

export function HomeHero() {
  const { t } = useLocale()

  return (
    <section className="container-wrapper">
      <div className="container flex flex-col items-center gap-5 px-6 pt-16 pb-10 text-center md:pt-24 md:pb-14">
        <Badge asChild variant="secondary" className="glass rounded-full px-3 py-1">
          <Link href="/palette">
            {t.home.announcement} <ArrowRightIcon />
          </Link>
        </Badge>
        <h1 className="max-w-3xl font-heading text-4xl font-bold tracking-tight text-balance md:text-6xl">
          {t.home.title}
        </h1>
        <p className="max-w-2xl text-base text-balance text-muted-foreground md:text-lg">
          {t.home.description}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <Button asChild size="lg" className="rounded-full px-6">
            <Link href="/palette">{t.home.getStarted}</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="glass rounded-full px-6">
            <Link href="/docs/components">{t.home.viewComponents}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
