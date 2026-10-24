# Stamp

`import { Stamp, type StampTone } from "@/components/ui/Stamp"`

A thin-bordered status mark for rows and headers (approved, pending, rejected, draft). It is always an icon plus text.

| Prop       | Type                                    | Notes                                                      |
| ---------- | --------------------------------------- | ---------------------------------------------------------- |
| `tone`     | `"ok" \| "warn" \| "stop" \| "neutral"` | Picks the icon (check, clock, close, minus) and the color. |
| `children` | `string`                                | The status text.                                           |

```tsx
<Stamp tone="ok">Approved</Stamp>
```

**Accessibility**

- Status is shown three ways at once: icon shape, text, color. Removing any one still reads correctly.
- The text is at least `--fs-micro` (12px), the smallest size the system allows.
