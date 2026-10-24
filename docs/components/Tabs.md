# Tabs

`import { Tabs, tabId } from "@/components/ui/Tabs"`

A tablist with roving tabindex. You render the panel yourself.

| Prop        | Type                              | Notes                                                   |
| ----------- | --------------------------------- | ------------------------------------------------------- |
| `tabs`      | `{ id: string; label: string }[]` |                                                         |
| `value`     | `string`                          | The selected tab id.                                    |
| `onChange`  | `(id: string) => void`            | Called on click and on arrow-key moves.                 |
| `ariaLabel` | `string`                          | Names the tablist.                                      |
| `idBase`    | `string`                          | Prefix for tab ids (defaults to a generated id).        |
| `panelId`   | `string`                          | Id of the visible panel; each tab gets `aria-controls`. |

`tabId(base, id)` returns the id of a tab so the panel can point back with `aria-labelledby`.

```tsx
const base = useId();
<Tabs tabs={tabs} value={tab} onChange={setTab} ariaLabel="Document" idBase={base} panelId={`${base}-panel`} />
<div role="tabpanel" id={`${base}-panel`} aria-labelledby={tabId(base, tab)}>...</div>
```

**Accessibility**

- Left/Right walk and wrap, Home/End jump to the first and last tab; selection follows focus.
- Only the selected tab is in the tab order; Tab moves on into the panel.
