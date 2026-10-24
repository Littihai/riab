# Icon

`import { Icon, type IconName } from "@/components/ui/Icon"`

One stroke icon set on a 24px grid (1.75 stroke, round caps). Icons inherit `currentColor`, so they follow text color, hover states and both color modes.

| Prop   | Type       | Default  | Notes                                         |
| ------ | ---------- | -------- | --------------------------------------------- |
| `name` | `IconName` | required | One of the names in `PATHS` (see `Icon.tsx`). |
| `size` | `number`   | `20`     | Pixels, applied to width and height.          |

```tsx
<Icon name="search" size={16} />
<button type="button" aria-label="Close" className="icon-btn"><Icon name="close" /></button>
```

**Add an icon:** add an entry to `PATHS` in `Icon.tsx` (paths only, drawn for a 24px grid, no fill unless the shape needs it). `IconName` updates itself.

**Accessibility**

- Icons are decorative: they render with `aria-hidden` and `focusable="false"`.
- The meaning must come from visible text or the control's `aria-label`. Status is never an icon on its own color: pair it with text (see [Stamp](Stamp.md)).
