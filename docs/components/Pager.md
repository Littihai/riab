# Pager

`import { Pager } from "@/components/ui/Pager"`

Previous / next with a "page X of Y" label. It renders nothing when there is only one page.

| Prop        | Type                      | Notes                                              |
| ----------- | ------------------------- | -------------------------------------------------- |
| `page`      | `number`                  | Current page, from 1.                              |
| `pages`     | `number`                  | Total pages.                                       |
| `onPage`    | `(page: number) => void`  |                                                    |
| `label`     | `(page, pages) => string` | Builds the visible text (so it can be translated). |
| `prevLabel` | `string`                  | Accessible name of the previous button.            |
| `nextLabel` | `string`                  | Accessible name of the next button.                |

```tsx
<Pager
  page={page}
  pages={5}
  onPage={setPage}
  label={(p, n) => t("pager.page").replace("%p", String(p)).replace("%n", String(n))}
  prevLabel={t("pager.prev")}
  nextLabel={t("pager.next")}
/>
```

**Accessibility**

- The arrow buttons are icon-only, so `prevLabel` and `nextLabel` are required. At the ends the button is disabled.
