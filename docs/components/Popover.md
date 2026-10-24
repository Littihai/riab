# Popover

`import { Popover } from "@/components/ui/Popover"`

A non-modal panel anchored to a button, for a few controls or a short piece of content (filters, a quick edit). The page behind stays usable. For a blocking choice use [Modal](Modal.md); for a list of commands use [Menu](Menu.md).

| Prop       | Type               | Default   | Notes                                        |
| ---------- | ------------------ | --------- | -------------------------------------------- |
| `trigger`  | `ReactNode`        | required  | Content of the trigger button.               |
| `label`    | `string`           | required  | Accessible name of the panel.                |
| `children` | `ReactNode`        | required  | Panel content.                               |
| `align`    | `"start" \| "end"` | `"start"` | Edge of the trigger the panel lines up with. |

```tsx
<Popover trigger="Filters" label="Document filters">
  <Checkbox label="Pending only" checked={pending} onChange={setPending} />
</Popover>
```

**Keyboard and behavior**

- Focus moves to the panel on open. Tab walks the controls inside, and tabbing out closes it. Esc closes and returns focus to the trigger. A press outside closes it.
- The panel is `role="dialog"` without `aria-modal`; the trigger has `aria-expanded` and `aria-controls`.
- The panel flips above the trigger or end-aligns when it would leave the screen.
