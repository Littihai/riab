# Menu

`import { Menu, type MenuItem } from "@/components/ui/Menu"`

An action menu (menu button pattern): one trigger, a list of commands. For revealing content or a small form use [Popover](Popover.md).

| Prop    | Type               | Default   | Notes                                              |
| ------- | ------------------ | --------- | -------------------------------------------------- |
| `label` | `ReactNode`        | required  | Trigger content. A chevron is added.               |
| `items` | `MenuItem[]`       | required  | See below.                                         |
| `align` | `"start" \| "end"` | `"start"` | Which edge of the trigger the panel lines up with. |

`MenuItem`: `{ id: string; label: string; onSelect: () => void; disabled?: boolean; danger?: boolean }`. A `danger` item uses the stop color and keeps its text label.

```tsx
<Menu
  label="Actions"
  items={[
    { id: "edit", label: "Edit", onSelect: edit },
    { id: "del", label: "Delete", onSelect: remove, danger: true },
  ]}
/>
```

**Keyboard**

- On the trigger: Enter, Space or Down opens on the first item; Up opens on the last.
- In the menu: Up/Down move and wrap (disabled items are skipped), Home/End jump, Enter or Space chooses and returns focus to the trigger, Esc closes and returns focus, Tab closes.

**Behavior and accessibility**

- The trigger has `aria-haspopup="menu"` and `aria-expanded`; items are `role="menuitem"`.
- A press outside closes the menu. The panel flips above the trigger or end-aligns when it would leave the screen.
- Typeahead (jump by typing a letter) is not implemented.
