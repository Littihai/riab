# riab

A themeable UI starter — **white, quiet, neat** ("riab" is Thai for *neat*): an
ink-on-white minimal identity, design tokens, light/dark mode, Thai-first
typography rules, and a th/en i18n skeleton. Built with Vite + React + TypeScript.

## Run

```bash
npm ci
npm run dev        # http://localhost:5280
npm run typecheck
npm run build
```

## What is locked in

- **Tokens** (`src/styles/tokens.css`): color (3-tier accent: `--accent-fill` /
  `--on-accent` / `--accent-text`), typography scale, radius, shadows, motion
  (`--dur-*` / `--ease`), density (`data-density="comfortable|compact"`).
  Every color pair used as text passes WCAG 4.5:1 in both modes.
- **Thai typography rules** (`src/styles/base.css`): no letter-spacing or
  uppercase on Thai text, body ≥ 14px, body line-height ≥ 1.55.
- **No inline styles, no hardcoded colors** in components — everything reads tokens.
- One toast channel, one dialog style (to be added), one date/number formatter per locale.

`mockup/dashboard.html` is the first static mockup (the earlier warm "Kraft Ledger"
exploration), kept for reference.

## License

MIT — see [LICENSE](LICENSE).
