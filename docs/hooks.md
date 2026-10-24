# Hooks and providers

## Hooks (`src/hooks/`)

### `useFocusTrap(ref, active, onClose)`

Modal focus behavior shared by [Modal](components/Modal.md), [Drawer](components/Drawer.md), the settings dialog and the Ctrl K palette. While `active`: focus moves to the first focusable control in `ref` (or the container), Tab and Shift+Tab wrap, Esc calls `onClose`, and on close focus returns to the element that was focused before. `onClose` is kept in a ref, so parent re-renders do not restart the trap.

### `useDismiss(refs, active, onDismiss)`

Light dismissal for non-modal layers ([Menu](components/Menu.md), [Popover](components/Popover.md)). While `active`, a press outside every element in `refs` calls `onDismiss("outside")` and Escape calls `onDismiss("escape")`.

### `usePlacement(panelRef, open, preferred?)`

Keeps an anchored panel on screen. Returns `{ v: "bottom" | "top", h: "start" | "end" }` to apply as `data-v` and `data-h`; the `.popup` CSS positions the panel. It flips above the anchor when it would pass the bottom edge (and there is room above) and end-aligns when it would pass the side edge.

### `useMediaQuery(query)`

Returns whether a media query currently matches and updates when it changes. The shell uses it to force the top navigation on a phone.

## Providers (`src/providers/`)

Mount them in this order (see `App.tsx`): `ThemeProvider` > `AppearanceProvider` > `I18nProvider`.

| Provider             | Hook              | What it owns                                                                                                                                                                         |
| -------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ThemeProvider`      | `useTheme()`      | `pref` (`light`, `dark`, `system`), `resolved`, `setPref`. Sets `data-theme` on `<html>`; saved as `riab.theme`.                                                                     |
| `AppearanceProvider` | `useAppearance()` | `accent`, `radius`, `density`, `motion`, `nav`, `icons`, and `set(key, value)`. Each applies as a data attribute on `<html>` (the default removes it); saved together as `riab.app`. |
| `I18nProvider`       | `useI18n()`       | `lang`, `setLang`, `t(key)`, `fmtMoney`, `fmtDate`. Saved as `riab.lang`.                                                                                                            |

### Translations

Every user-visible string is an entry in `src/i18n/dict.ts` with a Thai and an English text. `t` accepts only keys that exist (`DictKey`), so a typo is a compile error. Dynamic keys also type-check when the parts are literal unions (a template string such as "set." plus a section name from a fixed list). `dict.test.ts` checks both languages are filled and use the same `%p`-style placeholders.

To add a language, widen `Lang`, add its text to every entry (the type forces you to), and extend the formatters in `I18nProvider.tsx`.

`fmtMoney` and `fmtDate` are the only formatters in the app and use the Gregorian calendar in both languages, so document numbers and years never drift.
