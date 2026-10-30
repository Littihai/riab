import * as React from "react"
import Link from "next/link"

import { siteConfig } from "@/lib/config"
import { Icons } from "@/components/icons"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Skeleton } from "@/registry/new-york-v4/ui/skeleton"

export function GitHubLink() {
  return (
    <Button asChild size="sm" variant="ghost" className="h-8 shadow-none">
      <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
        <Icons.gitHub />
        <React.Suspense fallback={<Skeleton className="h-4 w-[42px]" />}>
          <StarsCount />
        </React.Suspense>
      </Link>
    </Button>
  )
}

export async function StarsCount() {
  // Derive owner/repo from siteConfig so the counter follows the configured
  // repository instead of a hard-coded one.
  const repo = siteConfig.links.github.replace(/^https?:\/\/github\.com\//, "")

  let count: number | undefined
  try {
    const data = await fetch(`https://api.github.com/repos/${repo}`, {
      next: { revalidate: 86400 },
    })
    if (data.ok) {
      const json = await data.json()
      count = json.stargazers_count
    }
  } catch {
    // Repo may not exist yet or GitHub may be unreachable; render nothing.
  }

  if (typeof count !== "number") {
    return null
  }

  const formattedCount =
    count >= 1000 ? `${Math.round(count / 1000)}k` : count.toLocaleString()

  return (
    <span className="w-fit text-xs text-muted-foreground tabular-nums">
      {formattedCount}
    </span>
  )
}
