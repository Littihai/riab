# Changelog

All notable changes to this project. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versions follow [SemVer](https://semver.org/) (0.x: minor versions may change things).

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

[0.3.0]: https://github.com/Littihai/riab/compare/v0.2...v0.3.0
[0.2.0]: https://github.com/Littihai/riab/compare/v0.1...v0.2
[0.1.0]: https://github.com/Littihai/riab/releases/tag/v0.1
