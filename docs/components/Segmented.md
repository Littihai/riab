# Segmented

`import { Segmented } from "@/components/ui/Segmented"`

A short single choice shown as joined buttons (theme, density, layout). It is a `radiogroup` with roving focus.

| Prop        | Type                                 | Notes                         |
| ----------- | ------------------------------------ | ----------------------------- |
| `options`   | `{ value: string; label: string }[]` | Keep to 2 to 4 short options. |
| `value`     | `string`                             | The selected value.           |
| `onChange`  | `(value: string) => void`            |                               |
| `ariaLabel` | `string`                             | Names the group (required).   |

```tsx
<Segmented
  ariaLabel="Density"
  value={density}
  onChange={setDensity}
  options={[
    { value: "comfortable", label: "Comfortable" },
    { value: "compact", label: "Compact" },
  ]}
/>
```

**Accessibility**

- One tab stop for the group: Left/Right (and Up/Down) move and select, and wrap at the ends. Only the selected item is in the tab order.
- For choices that switch a panel of content, use [Tabs](Tabs.md).
