# OptionCards

`import { OptionCards, type CardOption } from "@/components/ui/OptionCards"`

A single choice shown as picture cards (color scheme, font, corners, navigation). Use [Segmented](Segmented.md) when a few words are enough; use cards when seeing the result helps the choice.

| Prop        | Type                                                     | Default | Notes                                       |
| ----------- | -------------------------------------------------------- | ------- | ------------------------------------------- |
| `options`   | `{ value: string; label: string; preview: ReactNode }[]` |         | `preview` is a small picture of the result. |
| `value`     | `string`                                                 |         | The selected value.                         |
| `onChange`  | `(value: string) => void`                                |         |                                             |
| `ariaLabel` | `string`                                                 |         | Names the group (required).                 |
| `size`      | `"sm" \| "md"`                                           | `"md"`  | Card picture size: 112x62 or 144x76.        |

```tsx
<OptionCards
  ariaLabel="Corners"
  value={radius}
  onChange={setRadius}
  options={[
    { value: "none", label: "Square", preview: <RadiusPreview radius="none" /> },
    { value: "soft", label: "Soft", preview: <RadiusPreview radius="soft" /> },
  ]}
/>
```

**Previews** are yours to draw. The demo's (`src/demo/SettingsPreviews.tsx`) build a miniature app from the real tokens and re-scope them with a data attribute on the preview itself (`data-theme`, `data-base`, `data-radius`), so each card shows what the choice would look like without changing the page.

**Accessibility**

- A `radiogroup` with one tab stop: Left/Right (and Up/Down) move and select, and wrap at the ends.
- The chosen card has a ring, a check mark and bold text: the selection never rests on color alone.
- The picture is `aria-hidden`; the label names the option, so make labels meaningful.
