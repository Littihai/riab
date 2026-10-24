# Alert

`import { Alert } from "@/components/ui/Alert"`

A bordered note inside the page for something the reader should see: saved, due soon, failed.

| Prop       | Type                                    | Default     | Notes                         |
| ---------- | --------------------------------------- | ----------- | ----------------------------- |
| `tone`     | `"neutral" \| "ok" \| "warn" \| "stop"` | `"neutral"` | Sets the edge bar and icon.   |
| `title`    | `string`                                |             | Bold lead-in before the body. |
| `children` | `ReactNode`                             |             | The message.                  |

```tsx
<Alert tone="stop" title="Could not save.">
  Check the connection and try again.
</Alert>
```

**Accessibility**

- Every tone has an icon and text, never color alone.
- Only `stop` is announced at once (`role="alert"`); other tones are plain content. For a message that appears after an action, prefer a [Toast](Toast.md).
