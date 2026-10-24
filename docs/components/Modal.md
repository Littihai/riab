# Modal

`import { Modal } from "@/components/ui/Modal"`

The one dialog style for short confirmations and small forms. For longer tasks use [Drawer](Drawer.md); for anchored content use [Popover](Popover.md).

| Prop       | Type         | Notes                                                     |
| ---------- | ------------ | --------------------------------------------------------- |
| `open`     | `boolean`    | Render nothing when false.                                |
| `onClose`  | `() => void` | Called on Esc, a press on the scrim, or your own buttons. |
| `title`    | `string`     | Heading and accessible name of the dialog.                |
| `children` | `ReactNode`  | Body.                                                     |
| `footer`   | `ReactNode`  | Usually the buttons, right-aligned.                       |

```tsx
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Delete this request?"
  footer={
    <>
      <Button variant="ghost" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button onClick={remove}>Delete</Button>
    </>
  }
>
  <p>This cannot be undone.</p>
</Modal>
```

**Accessibility** (shared with Drawer and the palette via `useFocusTrap`, see [hooks](../hooks.md))

- `role="dialog"` and `aria-modal="true"`, named by `title`.
- Focus moves to the first control on open, Tab and Shift+Tab wrap inside, Esc closes, and focus returns to the opener.
- Initial focus lands on the first control, so list the safe action (Cancel) before a destructive one.
