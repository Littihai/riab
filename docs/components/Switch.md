# Switch

`import { Switch } from "@/components/ui/Switch"`

An on/off setting that applies at once (use a checkbox for a choice that waits for a Save button). The real control is a checkbox with `role="switch"`.

| Prop        | Type                         | Notes                                                          |
| ----------- | ---------------------------- | -------------------------------------------------------------- |
| `checked`   | `boolean`                    |                                                                |
| `onChange`  | `(checked: boolean) => void` |                                                                |
| `disabled`  | `boolean`                    | Optional.                                                      |
| `ariaLabel` | `string`                     | Accessible name. Required unless a `<label>` wraps the switch. |

```tsx
<div className="row-wrap">
  <Switch ariaLabel="Email me a daily digest" checked={digest} onChange={setDigest} />
  <span>Email me a daily digest</span>
</div>
```

**Accessibility**

- Space toggles it. State is exposed as `checked`; the track also shows the state by position, not only color.
- Give it a name: `ariaLabel`, or wrap it in a label.
