# Changelog

All notable changes to this project. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versions follow [SemVer](https://semver.org/) (0.x: minor versions may change things).

## [Unreleased]

### Added

- A footer with the brand, links to GitHub, the docs, the changelog and a contact page (GitHub issues), and the license line. External links open in a new tab with `rel="noopener noreferrer"` and say so to screen readers. `src/demo/links.ts` holds the URLs.
- Icons: github, mail, book.

## [0.4.0] - 2026-10-24

### Added

- A full settings page (replaces the small dialog): a grouped section list (General, Account, Notifications, About) and titled blocks with picture cards for color scheme, font, gray base, corners and navigation layout.
- Customize: ten accent colors (Ink, Blue, Azure, Teal, Green, Indigo, Violet, Rose, Amber, Slate), five gray bases (Zinc, Slate, Gray, Neutral, Stone), four font families (Inter, IBM Plex, Sarabun, System; all read Thai). Saved v0.2 values `clay` and `pine` migrate to `amber` and `green`.
- New navigation bar: underlined tabs, an Apps menu, a notifications popover with a count, a language switch and a user menu (settings, sign out).
- `OptionCards` component (radiogroup of picture cards); `Menu` and `Popover` accept a custom trigger (`triggerClassName`, `triggerLabel`) and `Menu` a `current` flag.
- Icons: user, bell.
- Tests: contrast for every accent on every gray base in light and dark (100 combinations), settings and navbar behavior, axe over every settings section.

### Changed

- The default look is unchanged (ink on zinc, Inter); everything above is opt-in.
- Fonts IBM Plex and Sarabun are bundled alongside Inter and Noto Sans Thai; the browser downloads only the family in use.
- The clay and pine accents were replaced by amber and green.
- The demo's "sign in" link moved into the user menu as "Sign out".

### Fixed

- The green accent's text on the active-row wash was 4.46:1; it now passes 4.5:1 (found by the new contrast matrix).

## [0.3.0] - 2026-10-24

### Added

- Components: Menu, Tooltip, Popover, Drawer, Breadcrumb, Card, EmptyState.
- Toasts: close button, success and failure tones with icons, pause on hover and focus, failures stay longer and are announced assertively.
- Skip link in the shell.
- Vitest suite: keyboard behavior (Modal, Tabs, Menu, Popover, Tooltip, Drawer, palette, sidebar, skip link), contrast of every token pair for every accent in both modes, house-rule guards (no stray hex, no inline style, no font size under 14px), and an axe pass over every demo page in Thai and English.
- ESLint (react-hooks, jsx-a11y, no inline styles), Prettier, `.editorconfig`, `.nvmrc`, `npm run check`.
- Documentation: a page per component (props, keyboard, accessibility), token and hooks guides, a rewritten README with screenshots and a make-it-yours checklist.
- Community files: CONTRIBUTING, SECURITY, CODE_OF_CONDUCT, issue and pull request templates, Dependabot, CI workflow, optional Pages workflow.
- Favicon, meta description and social tags; package metadata.
- Hooks: `useDismiss`, `usePlacement`.

### Changed

- Fonts (Inter, Noto Sans Thai) are bundled and self-hosted; the Google Fonts links are gone.
- Dictionary keys are a checked union: `t("typo")` fails to compile.
- Section headings in the demo are `h2` (the outline was skipping a level, found by axe).
- No literal font size under 14px; the 12px floor is `--fs-micro`.
- KPI cards reserve a header row for the icon chip, and four fit beside the sidebar.

### Fixed

- The sidebar brand mark was squeezed in icon-rail mode.

## [0.2.0] - 2026-10-24

### Added

- Customize: five accent colors (Ink, Clay, Pine, Blue, Indigo), three corner styles, two densities, mono or colored icons, one reduced-motion switch; sectioned settings dialog.
- Three navigation layouts (top bar, sidebar, icon rail) with a collapse button, and a Ctrl K command palette.
- One stroke SVG icon set replaces unicode glyphs; icon chips on the dashboard cards.
- `Segmented` control, `useFocusTrap` and `useMediaQuery` hooks.

## [0.1.0] - 2026-10-24

### Added

- First public release: Riab Minimal theme (tokens, light and dark, three-layer accent at 4.5:1), Inter + Noto Sans Thai, Thai/English with one formatter per language, form fields, modal, toast, tabs, alert, badge, stamp, pager, and six demo pages with a hash router.

[0.4.0]: https://github.com/Littihai/riab/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/Littihai/riab/compare/v0.2...v0.3.0
[0.2.0]: https://github.com/Littihai/riab/compare/v0.1...v0.2
[0.1.0]: https://github.com/Littihai/riab/releases/tag/v0.1
