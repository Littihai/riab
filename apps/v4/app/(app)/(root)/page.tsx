import { type Metadata } from "next"
import Image from "next/image"

import { siteConfig } from "@/lib/config"
import { getDictionary } from "@/lib/i18n"
import { HomeHero } from "@/components/home-hero"

import { CardsDemo } from "./cards"

// Metadata is static (force-static page), so it uses the default locale.
const title = getDictionary().home.title
const metadataTitle = `${siteConfig.name} - ${title}`
const description = siteConfig.description

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: siteConfig.name,
  alternateName: ["riab", "riab ui"],
  description: siteConfig.description,
  inLanguage: ["en-US", "th-TH"],
  sameAs: [siteConfig.links.github, siteConfig.links.twitter],
}

export const dynamic = "force-static"
export const revalidate = false

export const metadata: Metadata = {
  title: {
    absolute: metadataTitle,
  },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: metadataTitle,
    description,
    siteName: siteConfig.name,
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: metadataTitle,
    description,
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
}

export default function IndexPage() {
  return (
    <div className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HomeHero />
      <div className="container-wrapper flex-1 p-0">
        <div className="container overflow-hidden md:px-0 lg:max-w-none">
          <section className="-mx-4 w-[140vw] overflow-hidden md:hidden">
            <Image
              src="/images/full-light.png"
              width={2560}
              height={2764}
              alt="Dashboard"
              className="block h-auto w-full dark:hidden"
              priority
            />
            <Image
              src="/images/full-dark.png"
              width={2560}
              height={2764}
              alt="Dashboard"
              className="hidden h-auto w-full dark:block"
              priority
            />
          </section>
          <section className="hidden md:block">
            <CardsDemo />
          </section>
        </div>
      </div>
    </div>
  )
}
