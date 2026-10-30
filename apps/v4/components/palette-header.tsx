"use client"

import { useLocale } from "@/components/locale-provider"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"

export function PaletteHeader() {
  const { t } = useLocale()

  return (
    <PageHeader>
      <PageHeaderHeading>{t.palette.title}</PageHeaderHeading>
      <PageHeaderDescription>{t.palette.description}</PageHeaderDescription>
    </PageHeader>
  )
}
