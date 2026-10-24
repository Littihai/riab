# Checkbox, Radio

`import { Checkbox, Radio } from "@/components/ui/Choice"`

Native `<input>` inside a `<label>`, so the whole row is clickable and the label is the accessible name.

**Checkbox**

| Prop       | Type                         |
| ---------- | ---------------------------- |
| `label`    | `ReactNode`                  |
| `checked`  | `boolean`                    |
| `onChange` | `(checked: boolean) => void` |
| `disabled` | `boolean` (optional)         |

**Radio**

| Prop       | Type                      | Notes                            |
| ---------- | ------------------------- | -------------------------------- |
| `label`    | `ReactNode`               |                                  |
| `name`     | `string`                  | Shared by the group.             |
| `value`    | `string`                  | This option's value.             |
| `current`  | `string`                  | The selected value of the group. |
| `onChange` | `(value: string) => void` |                                  |
| `disabled` | `boolean`                 | Optional.                        |

```tsx
<Radio label="Weekly" name="cadence" value="week" current={cadence} onChange={setCadence} />
```

**Accessibility**

- Native inputs: arrow keys move inside a radio group, Space toggles a checkbox.
- A group of radios needs a visible group label (a heading or `fieldset` with `legend`) from your layout.
