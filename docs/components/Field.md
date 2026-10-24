# Field, Input, Textarea, Select

`import { Field, Input, Textarea, Select } from "@/components/ui/Field"`

`Field` is the label, hint and error wrapper. It gives its single child an `id`, links the description with `aria-describedby`, marks the control invalid when there is an error, and announces the error (`role="alert"`).

**Field**

| Prop       | Type        | Notes                                                                  |
| ---------- | ----------- | ---------------------------------------------------------------------- |
| `label`    | `string`    | Visible label, bound to the control with `htmlFor`.                    |
| `hint`     | `string`    | Helper text below the control. Replaced by `error` while there is one. |
| `error`    | `string`    | Error text. Sets `aria-invalid` on the control and is announced.       |
| `required` | `boolean`   | Adds a `*` (hidden from screen readers) and `aria-required`.           |
| `children` | one element | `Input`, `Textarea` or `Select`.                                       |

**Input / Textarea / Select** are native controls with the house style. Every native attribute passes through; `invalid?: boolean` sets `aria-invalid` (Field sets it for you).

```tsx
<Field label="Email" hint="We never share it" error={bad ? "Enter a valid email" : undefined} required>
  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
</Field>
```

**Accessibility**

- Always wrap controls in `Field` (or give them your own label). A placeholder is not a label.
- Show the error text, not only a red border: color alone is never the signal.
- The control border uses `--border-strong` (at least 3:1).
