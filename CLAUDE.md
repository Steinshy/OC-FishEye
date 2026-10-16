# FishEye — Photographer Portfolio & Booking Platform

**Type:** Frontend Static Site (ES Modules)

---

## 🎯 Project Overview

FishEye is an OpenClassrooms project demonstrating:
- ES Modules for client-side JavaScript organization
- Event delegation & DOM manipulation
- Accessibility (WCAG 2.1 AA compliance)
- Modular architecture without frameworks
- Custom modal and lightbox implementations
- Image optimization and responsive design
- Photographer portfolio with media sorting

### Key Objectives
- Master vanilla JavaScript modules
- Implement accessible UI components
- Design complex features (modal, lightbox, sorting)
- Optimize images for different devices
- Follow modern JavaScript patterns

---

## 🏗️ Architecture Overview

```
FishEye/
├── index.html              # Home page (photographer directory)
├── photographer.html       # Detail page (URL param: ?id=123)
├── assets/
│   ├── api/               # Photographer data (images, JSON)
│   ├── js/                # ES Modules
│   │   ├── main.js        # Entry point
│   │   └── utils/
│   │       ├── managers/  # Feature managers
│   │       └── accessibility/
│   ├── css/               # Stylesheets
│   └── favicons/          # Icons & manifest
├── scripts/               # Image, favicon and video-thumbnail scripts
└── manifest.json          # PWA manifest
```

### Design Pattern: Modular Manager Architecture

No frameworks: each feature is an ES module that exports plain functions (no classes or manager instances).

Each module is self-contained and exposes its public API through named exports.

---

## 📱 Page Structure

### Home Page (index.html)
- **Purpose:** Photographer directory listing
- **Content:** Grid of photographer profiles
- **Interaction:** Click to navigate to detail page

### Detail Page (photographer.html?id=123)
- **Purpose:** Individual photographer portfolio
- **Content:** Photographer info + media gallery
- **Features:**
  - Media sorting (Popularité, Date, Titre)
  - Lightbox navigation
  - Contact form (modal dialog)
  - Like counter
  - Accessibility: keyboard nav, screen reader support

---

## 🎯 Key Features & Managers

- `assets/js/utils/managers/modal.js` – contact modal open/close and listeners – `openModal`, `closeModal`, `isModalOpen`, `setupModalEventListeners`
- `assets/js/utils/managers/lightbox.js` – fullscreen media lightbox – `openLightbox`, `closeLightbox`, `initializeLightbox`, `lightboxState`
- `assets/js/utils/managers/data.js` – fetch and cache photographer data – `getPhotographer`, `getPhotographerMedias`
- `assets/js/utils/managers/validation.js` – form field validation – `validateFields`, `submitValidation`, `setupFieldValidation`
- `assets/js/utils/managers/stats.js` – stats display and likes management – `initializeStats`, `addLikeToTotal`, `incrementLike`
- `assets/js/helpers/sorterMedias.js` – sort medias by option (`Popularité` default, `Date`, `Titre`) – `sortMedias`
- `assets/js/utils/managers/sorterButton.js` – accessible sort dropdown – `createSorterButton`
- Other modules in `assets/js/utils/managers/`: `submission.js` (contact form submit), `mediaCards.js` (render and reorder media cards), `loading.js` (loading screen), `animation.js` (reduced-motion-aware animations), `characterCount.js` (500-character message counter), `submitButtonState.js` (submit button text and state)

---

## 💾 Data Structure

### Photographer Object
```javascript
{
  id: number,
  name: string,
  city: string,
  country: string,
  tagline: string,
  price: number, // daily rate
  portrait: string // file name, e.g. "MimiKeel.jpg"
}
```

### Media Object
```javascript
{
  id: number,
  photographerId: number,
  title: string,
  image?: string, // exactly one of image / video is present
  video?: string,
  likes: number,
  date: string (YYYY-MM-DD),
  price: number
}
```

### API Format
`assets/api/data.json` – `{ "photographers": [...], "media": [...] }`, loaded by `managers/data.js`

---

## 📂 File Organization

```
assets/js/
├── main.js                   # Entry point
├── config.js
├── helpers/                  # cache, dataBuilders, sorterMedias, responsiveImages, ...
├── photographer/             # Detail page: page.js, sortButton.js, generate/
└── utils/
    ├── errorHandler.js
    ├── managers/             # modal, lightbox, data, validation, stats, sorterButton,
    │                         # submission, mediaCards, loading, animation, ...
    └── accessibility/        # keyboard, focus, aria, inert, gesture, modal, lightbox, ...
```

---

## ♿ Accessibility (WCAG 2.1 AA)

### Features Implemented
- **Semantic HTML:** `<header>`, `<main>`, `<section>`, `<article>`
- **ARIA Labels:** `aria-label`, `aria-labelledby`, `aria-hidden`
- **Keyboard Navigation:**
  - Tab through all interactive elements
  - Enter to activate buttons/links
  - Arrow keys for lightbox navigation
  - Escape to close modal
- **Focus Management:** Focus trap in modal, focus restore on close
- **Screen Reader Support:** Alt text for images, announcements for state changes
- **Color Contrast:** WCAG AA compliance (4.5:1 for text)
- **Form Validation:** Error messages tied to form fields

### Keyboard Shortcuts
| Key | Action |
|-----|--------|
| Tab | Navigate interactive elements |
| Enter | Activate button/link |
| Escape | Close modal/lightbox |
| Arrow Left | Previous image (lightbox) |
| Arrow Right | Next image (lightbox) |

---

## 🎨 CSS Architecture

**Files:**
- `style.css` – Global styles, layout
- `photographer.css` – Detail page specific
- `medias.css` – Media grid & cards
- `modal.css` – Dialog styling
- `lightbox.css` – Lightbox styling
- `animations.css` – Transitions, animations
- `.min.css` versions – Minified production files

**CSS Approach:**
- No CSS framework (custom CSS)
- CSS Variables for colors, spacing
- Flexbox & Grid for layouts
- Animations for lightbox/modal transitions

---

## 🖼️ Image Management

### Responsive Image Strategy
```
assets/api/
├── data.json
└── MimiKeel/          # Per-photographer folder: name without spaces or punctuation
    ├── MimiKeel.jpg           # Portrait; also .webp and .mobile.jpg / .mobile.webp
    └── media/
        ├── Animals_Rainbow.jpg    # Each media also has .webp and .mobile.jpg / .mobile.webp
        └── ...
```

### Image Optimization
- **Format:** JPG (fallback) + WebP (modern)
- **Sizes:** desktop and `.mobile` variants of each image (`getMobileUrl` in `helpers/helper.js`)
- **Tool:** Sharp (Node.js) for processing

**Build Script:**
```bash
pnpm run optimize:images  # Generate WebP variants
```

---

## 🔧 Development & Build

### Development Workflow
```bash
pnpm install
pnpm run dev         # Start http-server on port 8080
pnpm run lint        # ESLint + Stylelint + html-validate + markdownlint
pnpm run format      # Prettier
```

### Build for Production
There is no bundler or `build` script; JS ships as written.
```bash
pnpm run minify           # CSS only: writes assets/css/*.min.css (lightningcss)
pnpm run optimize:images  # WebP and mobile variants of the images
```

### Scripts (`scripts/`)
- `optimizeImages.cjs` – WebP conversion and resizing (Sharp), run through `pnpm run optimize:images`
- `generateFavicons.cjs` – Favicon variants
- `generateVideoThumbnails.sh` – Video thumbnails

---

## 🧪 Testing Strategy

**No test framework** – manual testing areas:
- ✅ Modal open/close functionality
- ✅ Form validation (all fields)
- ✅ Lightbox navigation (arrows, Escape)
- ✅ Sorting (all 3 options)
- ✅ Keyboard navigation (Tab, Enter, Arrow keys)
- ✅ Screen reader (VoiceOver/NVDA testing)
- ✅ Responsive design (all breakpoints)

---

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| ES Module import errors | Check relative paths, use `./` prefix |
| Lightbox not working | Verify DOM structure matches manager expectations |
| Focus not visible | Add `:focus-visible` CSS, check outline properties |
| Form not validating | Check `setupFieldValidation` in `managers/validation.js` and `setupModalEventListeners` in `managers/modal.js` |
| Images not loading | Verify `assets/api/` path structure matches data |
| Keyboard nav broken | Check focus management in managers |

---

## 📖 Key Files

- `index.html` – Home page
- `photographer.html` – Detail page template
- `assets/js/main.js` – JavaScript entry point
- `assets/js/utils/managers/` – Feature modules
- `assets/css/` – All stylesheets
- `assets/api/` – Photographer data (JSON)

---

## 💡 Quick Reference

| What | Where |
|------|-------|
| Change sort options | Edit `assets/js/helpers/sorterMedias.js` and `assets/js/utils/managers/sorterButton.js` |
| Modify modal styling | `assets/css/modal.css` |
| Add keyboard shortcut | `assets/js/utils/accessibility/keyboard.js` |
| Update ARIA labels | Check `index.html` and `photographer.html` |
| Optimize images | Run `pnpm run optimize:images` |
