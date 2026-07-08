# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

FishEye — an OpenClassrooms project: a static, vanilla-JavaScript photographer
portfolio site (no framework, no bundler). Two pages:

- `index.html` — photographer list (static HTML, French content)
- `photographer.html` — dynamic portfolio page driven by `?id=<photographerId>`

Deployed to GitHub Pages (`https://steinshy.github.io/OC-FishEye/`) straight
from the repository root — there is no build output directory; what is
committed is what is served.

## Commands

Package manager is **pnpm** (v10+, Node 22+).

| Command                    | Purpose                                           |
| -------------------------- | ------------------------------------------------- |
| `pnpm install`             | Install dependencies                              |
| `pnpm run dev`             | Local server on port 8080 (http-server)           |
| `pnpm run lint`            | Lint JS (ESLint), CSS (Stylelint), HTML, MD       |
| `pnpm run format`          | Prettier write + check                            |
| `pnpm run minify`          | Regenerate `assets/css/*.min.css` (Lightning CSS) |
| `pnpm run optimize:images` | Regenerate responsive images (Sharp)              |

There are no automated tests; verify changes by running the dev server and
exercising both pages (including `photographer.html?id=243`).

## Architecture

- `assets/js/main.js` — single module entry point for both HTML pages; routes
  by `location.pathname` (photographer page init vs. plain loading screen).
- `assets/js/config.js` — all DOM element lookups and shared constants/selectors.
  Add new element references here, not inline in features.
- `assets/js/helpers/` — pure-ish utilities: data builders from
  `assets/api/data.json`, caching (`cache.js`), responsive image URL helpers,
  sorting, validation helpers.
- `assets/js/photographer/` — photographer page controller (`page.js`) and DOM
  factories in `generate/` (header, media cards, media elements).
- `assets/js/utils/managers/` — feature modules: lightbox, contact modal, form
  validation/submission, likes/stats, sort dropdown, loading screen.
- `assets/js/utils/accessibility/` — ARIA helpers, focus trap, keyboard maps,
  touch gestures, inert management. Reuse these instead of raw
  `addEventListener`/`setAttribute` for interactive elements.
- `assets/api/data.json` — the "API": photographers + media records. Media
  files live in `assets/api/<PhotographerName>/media/` with desktop/mobile
  jpg/webp variants (`.mobile.` infix) and `.mp4` + poster `.jpg` + `.vtt`
  captions for videos.

## Important conventions

- **HTML files are committed minified** (single line, quotes stripped). Edit
  them carefully with targeted string replacements; do not reformat them.
- **CSS ships as `.min.css`**: the HTML links only `assets/css/*.min.css`.
  After editing any `assets/css/*.css`, run `pnpm run minify` and commit the
  regenerated `.min.css` alongside the source.
- **JavaScript ships unminified** as native ES modules — the HTML loads
  `assets/js/main.js` directly. Do not create `.min.js` files.
- All user-facing text is **French**; code identifiers and comments are English.
- ESLint enforces single quotes, semicolons, 2-space indent, no trailing
  comma, alphabetized import groups with blank lines between groups
  (`import/order`), and arrow functions. Run `pnpm run lint` before committing.
- Prettier config: 160 char width, single quotes (see `.prettierrc`).
- Commit messages follow Conventional Commits (commitlint).

## CI

- `.github/workflows/main.yml` — lint + format on push to `main`/`dev`
  (pnpm via `pnpm/action-setup`, uses the `packageManager` field).
- `.github/workflows/deploy.yml` — GitHub Pages deploy of the repo root on
  push to `main`.
