# Tooltip

`import { Tooltip } from "@/components/ui/Tooltip"`

A short text hint for a control that is not fully described by its own label (an icon button, a truncated value).

| Prop       | Type        | Notes                                        |
| ---------- | ----------- | -------------------------------------------- |
| `label`    | `string`    | The hint. Keep it to a short phrase.         |
| `children` | one element | The control. It receives `aria-describedby`. |

```tsx
<Tooltip label="Includes 7% VAT">
  <Button variant="ghost">Net price</Button>
</Tooltip>
```

**Behavior and accessibility (WCAG 1.4.13)**

- Shows on hover after a short delay and at once on keyboard focus.
- Hoverable: the pointer can move onto the hint without it vanishing. Dismissible: Esc hides it. Persistent: it stays until the pointer or focus leaves.
- The hint is exposed as the control's description, so screen readers read it after the name.
- Only repeat or clarify. Never put the only copy of important information, or anything clickable, in a tooltip. Touch users have no hover, so treat it as a bonus.
- The hint sits above the control and does not flip; keep tooltips off the very top edge of the page.
