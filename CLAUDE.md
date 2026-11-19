# FishEye

OpenClassrooms project: photographer portfolio site in vanilla JS ES modules; no framework, bundler or test framework. The course focus is accessibility (WCAG 2.1 AA).

## Commands

- `pnpm run dev`: http-server on :8080.
- `pnpm run lint`: ESLint + Stylelint + html-validate + markdownlint; `pnpm run format`: Prettier.
- `pnpm run minify`: CSS only, writes `assets/css/*.min.css` (lightningcss). There is no `build` script; JS ships as written.
- `pnpm run optimize:images`: Sharp WebP plus `.mobile` variants; `scripts/` also holds `generateFavicons.cjs` and `generateVideoThumbnails.sh`.

## Layout

- `index.html` (photographer directory) and `photographer.html?id=123` (portfolio, sorting, lightbox, contact modal, likes).
- `assets/js/main.js` is the entry; `helpers/` (cache, data builders, `sorterMedias`, responsive images), `photographer/` (detail page), `utils/managers/` (modal, lightbox, data, validation, stats, sorterButton, submission, mediaCards, loading), `utils/accessibility/` (keyboard, focus, aria, inert, gesture).
- Data: `assets/api/data.json` is `{ photographers, media }`; a media item has exactly one of `image` or `video`. Images live in `assets/api/<NameWithoutSpaces>/` with `media/`; each has `.webp` and `.mobile.jpg` / `.mobile.webp` variants.
- CSS in `assets/css/`: `style`, `photographer`, `medias`, `modal`, `lightbox`, `animations`; variables for colors and spacing.

## Rules

- Each manager is a module of plain named-export functions (no classes or instances).
- Keep the accessibility behavior: focus trap and focus restore in the modal and lightbox, Escape closes, arrow keys move in the lightbox, form errors tied to fields, `:focus-visible` styles.
- Sort options are `Popularité` (default), `Date`, `Titre`: edit both `helpers/sorterMedias.js` and `managers/sorterButton.js`.
- Images use JPG fallback plus WebP; run `optimize:images` after adding media.
- Imports need a `./` prefix and the `.js` extension.
