# riab

A free, themeable UI starter — **white, quiet, neat** ("riab" is Thai for *neat*).
Ink-on-white minimal identity, design tokens, light/dark mode, Thai-first typography
rules, and a th/en i18n skeleton. Vite + React + TypeScript, no runtime dependencies
beyond React. MIT licensed.

**Live demo:** https://littihai.github.io/riab/

## Use it

Click **Use this template** on GitHub (or clone), then:

```bash
npm ci
npm run dev        # http://localhost:5280
npm run typecheck
npm run build      # production build to dist/
```

Start deleting: `src/demo/` is the demo site (pages + shell); your app replaces it.
`src/components/ui/` and `src/styles/` are the parts you keep.

## What is inside

| Area | Files | Notes |
|---|---|---|
| Design tokens | `src/styles/tokens.css` | colors (3-tier accent: `--accent-fill` / `--on-accent` / `--accent-text`), type scale, radius, shadows, motion (`--dur-*`), density (`data-density`), `color-scheme` |
| Base rules | `src/styles/base.css` | reset, typography, the Thai rules, `.rise` entrance |
| Components | `src/components/ui/` | Button, Field (Input/Select/Textarea), Switch, Badge, Stamp, Alert, Tabs, Modal, Toast, Pager |
| Providers | `src/providers/` | ThemeProvider (light/dark/system), I18nProvider (th/en + one money/date formatter per locale) |
| Demo pages | `src/demo/` | dashboard, component gallery, form, table, sign-in, 404 — a dependency-free hash router in `App.tsx` |

## House rules (what keeps it neat)

- **Tokens only.** No inline styles, no hex values outside `tokens.css`. Retheming is
  a one-file change — this repo did it once already (the first direction was a warm
  paper theme, kept in `mockup/dashboard.html`).
- **One of each.** One toast channel (`aria-live`), one dialog style, one date and
  money formatter per language.
- **Thai typography.** Body ≥ 14px, body line-height ≥ 1.55, no letter-spacing or
  uppercasing on Thai text; fonts are Inter + Noto Sans Thai (Google Fonts, OFL).
- **Both modes always.** Every color pair used as text passes WCAG 4.5:1 in light and
  dark; status is never color alone (icon + text).
- **Motion with an off switch.** Every duration reads `--dur-*`; the OS
  reduced-motion flag (or `data-motion="reduce"`) zeroes them all at once.

## Change the theme

Edit `src/styles/tokens.css`:

1. Pick your surfaces (`--bg`, `--surface`, `--surface-2`, `--border`) and ink
   (`--text`, `--muted`) for both modes.
2. Set the accent **three times**: `--accent-fill` (button background), `--on-accent`
   (text on that background), `--accent-text` (links/text on surfaces). Check 4.5:1.
3. Adjust `--r-*` (corners), the shadows, and `--dur-*` (motion feel).

Nothing else to touch — components and pages read tokens only.

## Deploying the demo (GitHub Pages)

```bash
npm run build:pages    # builds with --base=/riab/
```

Push `dist/` to the `gh-pages` branch (or wire the same command into a GitHub
Actions workflow) and point Pages at that branch.

## License

MIT — see [LICENSE](LICENSE). Fonts are loaded from Google Fonts (OFL); self-host
them if you need the demo to work offline.
