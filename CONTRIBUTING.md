# Contributing to riab

Thanks for helping. riab is small on purpose: a quiet, accessible, Thai-friendly starter. A change fits when it keeps that.

## Set up

```bash
npm ci
npm run dev        # http://localhost:5280
npm run check      # typecheck + lint + format check + tests; run before you push
```

Node 20 or newer (`.nvmrc`).

## Before you open a pull request

Open an issue first for anything bigger than a fix: a new component, a new dependency, a change to a token or house rule.

One change per pull request. The template has the checklist; the short version:

1. **Tokens only.** No hex colors outside `src/styles/tokens.css`, no inline styles, no literal `font-size` under 14px (12px only through `--fs-micro`). Lint and `tokens.test.ts` enforce this.
2. **Accent in three layers** (`--accent-fill`, `--on-accent`, `--accent-text`), every text pair at 4.5:1 in light and dark. Add or change a color and run `npm test`: it measures every pair for every accent.
3. **Words live in `src/i18n/dict.ts`**, Thai and English, no text in components. Components in `src/components/ui/` take their labels as props and do not import i18n.
4. **Keyboard first.** A new interactive component works with a keyboard alone (follow the matching WAI-ARIA Authoring Practices pattern), has a test for the keys, and has a page in `docs/components/` with props, keyboard and accessibility notes.
5. **Motion reads `--dur-*`,** so the one reduced-motion switch stops it. Status is never color alone: icon plus text.
6. **No new runtime dependency** without a discussion. React is the only one on purpose (fonts are bundled assets).

## Thai text

If you touch typography, check it in Thai: content 14px or more, line-height 1.55 or more for body text, no letter-spacing or uppercase on Thai, and tone marks must not collide at heading sizes.

## Commits

Short English subject in the imperative, one topic per commit (`menu: skip disabled items`).

## Tests

`npm test` runs Vitest with jsdom and an axe pass over every demo page. jsdom cannot judge layout or real color, so also look at your change in the browser (light, dark, narrow phone width, reduced motion) and, for anything interactive, try it with the keyboard.

## Releases

Maintainers update `CHANGELOG.md`, bump `package.json`, tag `vX.Y.Z` and publish a GitHub Release. The demo is built with `npm run build:pages` and published to the `gh-pages` branch.
