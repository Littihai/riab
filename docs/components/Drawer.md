# Drawer

`import { Drawer } from "@/components/ui/Drawer"`

A modal panel from the side edge, for tasks longer than a Modal suits: several filters, a detail view, a short form.

| Prop         | Type               | Default  | Notes                                               |
| ------------ | ------------------ | -------- | --------------------------------------------------- |
| `open`       | `boolean`          | required |                                                     |
| `onClose`    | `() => void`       | required | Esc, the scrim, and the close button call it.       |
| `title`      | `string`           | required | Heading and accessible name.                        |
| `closeLabel` | `string`           | required | Accessible name of the close button (translate it). |
| `children`   | `ReactNode`        | required | Scrolls inside the panel.                           |
| `footer`     | `ReactNode`        |          | Pinned at the bottom.                               |
| `side`       | `"start" \| "end"` | `"end"`  | Which edge it slides from.                          |

```tsx
<Drawer
  open={open}
  onClose={() => setOpen(false)}
  title="Request details"
  closeLabel="Close"
  footer={<Button onClick={() => setOpen(false)}>Done</Button>}
>
  ...
</Drawer>
```

**Accessibility**

- Same as [Modal](Modal.md): `role="dialog"`, `aria-modal`, focus trapped (`useFocusTrap`), Esc closes, focus returns to the opener.
- The panel is at most 420px and full width on a phone.
