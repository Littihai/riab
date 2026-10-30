export const siteConfig = {
  name: "riab-ui",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://riab-ui.vercel.app",
  ogImage: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://riab-ui.vercel.app"}/og.jpg`,
  description:
    "Generate a complete color palette from a single color or an image, preview it on real screens, and copy the code.",
  links: {
    twitter: "https://twitter.com/Littihai",
    github: "https://github.com/Littihai/riab",
  },
  navItems: [
    {
      href: "/",
      key: "home",
      label: "Home",
    },
    {
      href: "/palette",
      key: "palette",
      label: "Palette",
    },
    {
      href: "/chat",
      key: "chat",
      label: "Chat",
    },
    {
      href: "/docs/installation",
      key: "docs",
      label: "Docs",
    },
    {
      href: "/docs/components",
      key: "components",
      label: "Components",
    },
    {
      href: "/blocks",
      key: "blocks",
      label: "Blocks",
    },
    {
      href: "/charts/area",
      key: "charts",
      label: "Charts",
    },
  ],
} as const

export type NavItem = (typeof siteConfig.navItems)[number]
export type NavKey = NavItem["key"]

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}
