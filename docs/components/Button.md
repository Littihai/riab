# Button

`import { Button } from "@/components/ui/Button"`

A native `<button>`; every standard button attribute passes through.

| Prop        | Type                              | Default     | Notes                                                           |
| ----------- | --------------------------------- | ----------- | --------------------------------------------------------------- |
| `variant`   | `"primary" \| "ghost"`            | `"primary"` | Primary is the accent fill. Ghost is a bordered surface button. |
| `type`      | `"button" \| "submit" \| "reset"` | `"button"`  | Defaults to `button` so a stray button never submits a form.    |
| `className` | `string`                          |             | Appended to the component classes.                              |

```tsx
<Button onClick={save}>Save</Button>
<Button variant="ghost" disabled>Cancel</Button>
```

**Accessibility**

- Use a button for actions and an `<a>` for navigation.
- Keep one primary button per view area; ghost for the rest.
- A button that only shows an icon needs an `aria-label` (see [Icon](Icon.md)).
- The ghost edge uses `--border-strong` (at least 3:1 against the surface).
