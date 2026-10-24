# Spinner and Skeleton

`import { Spinner, Skeleton } from "@/components/ui/Loading"`

**Spinner**: a small spinner for short waits (a button, an inline check).

| Prop    | Type     | Notes                                   |
| ------- | -------- | --------------------------------------- |
| `label` | `string` | Accessible name, announced as a status. |

**Skeleton**: a shimmering placeholder line for content that is loading.

| Prop | Type                    | Default | Notes                        |
| ---- | ----------------------- | ------- | ---------------------------- |
| `w`  | `25 \| 50 \| 75 \| 100` | `100`   | Width as a share of the row. |

```tsx
<Spinner label="Loading" />
<Skeleton w={75} />
```

**Accessibility**

- `Skeleton` is hidden from assistive tech; announce loading once with a `Spinner` or a status line, not per line.
- Both stop animating under reduced motion (`prefers-reduced-motion` or `data-motion="reduce"`); the skeleton becomes a still bar.
