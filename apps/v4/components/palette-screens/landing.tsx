"use client"

import {
  IconBolt,
  IconChartDots,
  IconCheck,
  IconCloud,
  IconUsersGroup,
} from "@tabler/icons-react"

import { useLocale } from "@/components/locale-provider"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card"

export function LandingScreen() {
  const { t } = useLocale()
  const s = t.screens.landing

  const features = [
    { icon: IconBolt, title: s.feature1Title, description: s.feature1Description },
    { icon: IconChartDots, title: s.feature2Title, description: s.feature2Description },
    { icon: IconUsersGroup, title: s.feature3Title, description: s.feature3Description },
  ]

  return (
    <div className="overflow-hidden rounded-lg border bg-background text-foreground">
      <header className="flex items-center gap-6 border-b px-6 py-3">
        <div className="flex items-center gap-2 font-semibold">
          <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <IconCloud className="size-3.5" />
          </span>
          {s.brand}
        </div>
        <nav className="hidden gap-4 text-sm text-muted-foreground sm:flex">
          <span className="text-foreground">{s.navFeatures}</span>
          <span>{s.navPricing}</span>
          <span>{s.navDocs}</span>
        </nav>
        <div className="ml-auto flex gap-2">
          <Button variant="ghost" size="sm">
            {s.signIn}
          </Button>
          <Button size="sm">{s.cta}</Button>
        </div>
      </header>

      <section className="flex flex-col items-center gap-4 px-6 py-12 text-center">
        <Badge variant="secondary">{s.badge}</Badge>
        <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {s.title}
        </h2>
        <p className="max-w-lg text-sm text-balance text-muted-foreground sm:text-base">
          {s.description}
        </p>
        <div className="flex gap-2 pt-2">
          <Button>{s.cta}</Button>
          <Button variant="outline">{s.secondary}</Button>
        </div>
      </section>

      <section className="grid gap-3 border-t bg-muted/40 px-6 py-8 sm:grid-cols-3">
        {features.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex flex-col gap-2 rounded-lg border bg-card p-4">
            <span className="flex size-8 items-center justify-center rounded-md bg-accent text-accent-foreground">
              <Icon className="size-4" />
            </span>
            <div className="text-sm font-medium">{title}</div>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        ))}
      </section>

      <section className="grid items-center gap-6 border-t px-6 py-8 sm:grid-cols-[1fr_280px]">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold">{s.navPricing}</h3>
          <p className="text-sm text-muted-foreground">{s.pricingDescription}</p>
          <ul className="mt-2 flex flex-col gap-1.5 text-sm">
            {[s.pricingItem1, s.pricingItem2, s.pricingItem3].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <IconCheck className="size-4 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <Card className="border-primary/40 shadow-md ring-1 ring-primary/20">
          <CardHeader>
            <CardDescription>{s.pricingLabel}</CardDescription>
            <CardTitle className="text-3xl">
              {s.pricingPrice}
              <span className="text-sm font-normal text-muted-foreground">
                {s.pricingPeriod}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {s.pricingDescription}
          </CardContent>
          <CardFooter>
            <Button className="w-full">{s.pricingCta}</Button>
          </CardFooter>
        </Card>
      </section>

      <footer className="border-t px-6 py-3 text-xs text-muted-foreground">
        {s.footer}
      </footer>
    </div>
  )
}
