# Security policy

riab is a front-end starter with no server, no accounts and no data collection. The sign-in page is a demonstration only: it checks nothing and sends nothing. Do not ship it as authentication.

## Report a vulnerability

Please report privately through GitHub: **Security > Report a vulnerability** on this repository (https://github.com/Littihai/riab/security/advisories/new). Do not open a public issue for a security problem.

Include what you found, where, and how to reproduce it. You can expect a first reply within a week. Fixes go out as a patch release with a note in `CHANGELOG.md`.

## Supported versions

Only the latest release receives fixes.

## Things worth knowing when you build on riab

- Values from `localStorage` (`riab.*`) are read defensively but come from the user's device: validate anything you add there.
- The inline script in `index.html` reads those values before first paint. If you add a Content-Security-Policy, allow that script with a hash or nonce.
- Fonts are bundled, so no request goes to a font CDN.
- `dangerouslySetInnerHTML` is not used anywhere; keep it that way, or sanitize.
