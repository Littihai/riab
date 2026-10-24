# Card

`import { Card } from "@/components/ui/Card"`

The paper sheet with an optional heading row.

| Prop        | Type        | Notes                                                        |
| ----------- | ----------- | ------------------------------------------------------------ |
| `title`     | `string`    | Rendered as an `h2`, sized like a card title.                |
| `actions`   | `ReactNode` | Sits at the end of the heading row (a ghost button, a menu). |
| `children`  | `ReactNode` | Card body.                                                   |
| `className` | `string`    | Appended to the component classes.                           |

```tsx
<Card title="This month" actions={<Button variant="ghost">View all</Button>}>
  <p>...</p>
</Card>
```

**Accessibility**

- It is a `<section>`. Give each card a `title` so the outline stays `h1` then `h2`; skipping a level fails the axe check in the test suite.
- The `.card` class alone (without `Card`) is the bare surface when you need your own structure.
