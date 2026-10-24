# Breadcrumb

`import { Breadcrumb, type Crumb } from "@/components/ui/Breadcrumb"`

A trail showing where the page sits in the site.

| Prop        | Type                                 | Notes                                                                    |
| ----------- | ------------------------------------ | ------------------------------------------------------------------------ |
| `items`     | `{ label: string; href?: string }[]` | Earlier items are links; the last is the current page and has no `href`. |
| `ariaLabel` | `string`                             | Names the navigation landmark ("You are here").                          |

```tsx
<Breadcrumb
  ariaLabel="You are here"
  items={[{ label: "Home", href: "#/" }, { label: "Components", href: "#/components" }, { label: "Details" }]}
/>
```

**Accessibility**

- A `nav` landmark with an ordered list; the current page has `aria-current="page"` and is not a link.
- The chevron separators are decorative and hidden from screen readers.
