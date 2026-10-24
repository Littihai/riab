# Badge

`import { Badge } from "@/components/ui/Badge"`

A small pill for a label or count ("New", "3"). For a document or workflow status use [Stamp](Stamp.md), which always carries an icon.

| Prop       | Type                       | Notes                                      |
| ---------- | -------------------------- | ------------------------------------------ |
| `tone`     | `"ok" \| "warn" \| "stop"` | Optional. Without it the badge is neutral. |
| `children` | `ReactNode`                | Keep it to one or two words or a number.   |

```tsx
<Badge>Beta</Badge>
<Badge tone="warn">3 due</Badge>
```

**Accessibility**

- The text carries the meaning. Do not rely on the tone color to say "good" or "bad".
- Text colors are tokens measured at 4.5:1 or more in both modes.
