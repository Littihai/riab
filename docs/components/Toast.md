# Toast

`import { toast, ToastHost } from "@/components/ui/Toast"`

One toast channel for the whole app. Mount `ToastHost` once (the demo does it in `App.tsx`) and call `toast()` from anywhere.

```tsx
<ToastHost closeLabel={t("toast.close")} />; // once, near the root

toast("Saved"); // neutral
toast("Saved", "ok"); // success
toast("Could not save", "stop"); // failure
```

| API                        | Notes                                                |
| -------------------------- | ---------------------------------------------------- |
| `toast(text, tone?)`       | `tone` is `"neutral"` (default), `"ok"` or `"stop"`. |
| `<ToastHost closeLabel />` | `closeLabel` names the close button on every toast.  |

**Behavior**

- Every toast has an icon for its tone and a close button.
- Neutral and success toasts stay about 5 seconds, failures about 9.
- The timer pauses while the pointer or keyboard focus is on a toast, then continues with the time that was left.

**Accessibility**

- The region is `aria-live="polite"`; a `stop` toast also has `role="alert"` so a failure is announced at once.
- A toast is not the only place for an important result: errors that need action also belong inline (see [Field](Field.md), [Alert](Alert.md)).
