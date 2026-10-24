# EmptyState

`import { EmptyState } from "@/components/ui/EmptyState"`

Say that there is nothing here, why or what to do, and offer the one action that fixes it.

| Prop          | Type        | Notes                                                             |
| ------------- | ----------- | ----------------------------------------------------------------- |
| `title`       | `string`    | An `h2`.                                                          |
| `description` | `string`    | One short sentence.                                               |
| `icon`        | `ReactNode` | Shown in a soft ring: an [Icon](Icon.md) or a small illustration. |
| `action`      | `ReactNode` | Usually a primary [Button](Button.md).                            |

```tsx
<EmptyState
  icon={<Icon name="doc" size={36} />}
  title="No requests yet"
  description="Create one to see it here."
  action={<Button>Create request</Button>}
/>
```

**Accessibility**

- Use it for a list or table with no rows; the table page shows the filtered-to-nothing case, the dashboard the first-use case.
- Do not use color alone to say "empty": the title says it.
