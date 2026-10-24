# Design tokens

Everything visual reads a token from `src/styles/tokens.css`. No component, page or stylesheet outside that file may contain a hex color or an inline style (a test and ESLint enforce both). Retheming is a one-file change.

## Surfaces and ink

| Token                | Use                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------ |
| `--bg`               | Page background.                                                                     |
| `--surface`          | Cards, dialogs, menus.                                                               |
| `--surface-2`        | Table heads, hover rows, soft fills.                                                 |
| `--border`           | Hairlines and card edges (decorative).                                               |
| `--border-strong`    | Edges that must be perceivable: inputs, ghost buttons, switch tracks (at least 3:1). |
| `--text` / `--muted` | Body text / secondary text. Both pass 4.5:1 on every surface.                        |
| `--scrim`            | Overlay behind dialogs and drawers.                                                  |

## The accent has three layers

Never one color for everything:

| Token           | Use                                                      |
| --------------- | -------------------------------------------------------- |
| `--accent-fill` | Background of primary buttons, active chips, indicators. |
| `--on-accent`   | Text and icons drawn on `--accent-fill`.                 |
| `--accent-text` | Links and accent-colored text on surfaces.               |

`--accent-hover` is the hover fill and `--accent-tint` (derived) is the faint wash for active rows. The default accent is ink itself. The Customize presets (`data-accent="blue | azure | teal | green | indigo | violet | rose | amber | slate"`) override the three layers for both modes. `src/styles/tokens.test.ts` measures every pair, for every preset, in light and dark: add a preset and the test tells you whether it passes.

## Theme base: the gray palette

`data-base="zinc | slate | gray | neutral | stone"` swaps `--bg`, `--surface`, `--surface-2`, `--border`, `--border-strong`, `--text` and `--muted` for both modes (zinc is the default and is written out too, so a preview can pin it). Each base keeps `--muted` at 4.5:1 and `--border-strong` at 3:1 on its own surfaces; the tests check every base with every accent.

## Font family

`data-font="inter | plex | sarabun | system"` sets `--font-head` and `--font-body` from `--font-inter`, `--font-plex`, `--font-sarabun` or `--font-system`. All four read Thai (Inter pairs with Noto Sans Thai, IBM Plex with IBM Plex Sans Thai, Sarabun carries both scripts, System uses the platform fonts). The three web families are bundled; the browser downloads only the files for the family in use.

## Status and data colors

`--ok`, `--warn`, `--stop` are text colors (4.5:1) and are always paired with an icon and words. `--hue-blue/teal/amber/violet` color icon chips when the user turns on "Icon color: Color". `--chart-1` and `--chart-2` draw sparklines.

## Shape, depth, motion

| Token                          | Notes                                                                                                                                                           |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--r-sm / --r-md / --r-lg`     | Corner radii. `data-radius="none"` zeroes them, `"round"` enlarges them.                                                                                        |
| `--shadow-sm / -md / -lg`      | Cards, popups, dialogs.                                                                                                                                         |
| `--dur-1`, `--dur-2`, `--ease` | Every transition and animation reads these. Reduced motion (the OS setting or `data-motion="reduce"`) sets both durations to 0, so one switch stops all motion. |

## Type and space

| Token                                                                                            | Notes                                                       |
| ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| `--font-head`, `--font-body`                                                                     | Inter Variable plus Noto Sans Thai Variable, both bundled.  |
| `--fs-micro` (12px)                                                                              | The floor for any text. Only table heads and stamps use it. |
| `--fs-small` (14px)                                                                              | The smallest size for ordinary content.                     |
| `--fs-body` 15 / `--fs-lead` 18 / `--fs-h3` 21 / `--fs-h2` 26 / `--fs-h1` 32 / `--fs-display` 44 | Scale of about 1.2.                                         |
| `--space-1..4`, `--row-h`, `--page-pad`, `--page-max`                                            | Density-aware: `data-density="compact"` tightens them.      |

Thai typography rules (kept by tests and review): content at 14px or more, body line-height 1.55 or more, no letter-spacing or uppercase on Thai text, no literal `font-size` under 14px in CSS.

## Change the theme

1. Pick surfaces and ink for both modes (`:root` and `[data-theme="dark"]`).
2. Set the accent three times per mode, then run `npm test`: the contrast tests tell you which pair fails.
3. Adjust radii, shadows and durations to taste.
4. If you add an accent preset, add its swatch (`--swatch-*`), the `Accent` type in `AppearanceProvider.tsx`, the `ACCENTS` list in `SettingsDialog.tsx`, its name in `dict.ts`, the `.accent-dot` rule in `demo.css`, and its name in `src/test/contrast.ts`. A new gray base or font family follows the same path (`ThemeBase`, `FontFamily`, the settings list, `dict.ts`, `contrast.ts`).

The saved user choices (`riab.theme`, `riab.lang`, `riab.app`) are applied before first paint by the inline script in `index.html`; if you add a Customize option, teach that script about it too.
