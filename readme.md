# FishEye

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=flat&logo=pwa&logoColor=white)
![Lighthouse](https://img.shields.io/badge/Lighthouse-F44B21?style=flat&logo=lighthouse&logoColor=white)
![Accessibility](https://img.shields.io/badge/AChecker-00A699?style=flat&logo=accessibilityicon&logoColor=white)
![W3C](https://img.shields.io/badge/W3C-005A9C?style=flat&logo=w3c&logoColor=white)

**FishEye** est une plateforme web permettant de découvrir des
photographes indépendants et de parcourir leurs portfolios.
L'application offre un système de galerie interactif avec lightbox,
filtres de tri, et formulaire de contact accessible.

---

## Aperçu rapide

- **6 photographes** avec portfolios complets
- **Lightbox interactive** avec navigation clavier et tactile
- **Système de likes** et statistiques en temps réel
- **Tri dynamique** par popularité, date ou titre
- **100% accessible** avec navigation clavier complète
- **Responsive** mobile, tablette et desktop

---

## Dépôt GitHub

- [Branche principale](https://github.com/Steinshy/FishEye/tree/main)
- [GitHub Pages](https://steinshy.github.io/FishEye/)

---

## Structure du projet

```text
FishEye/
├── assets/
│   ├── css/                           # Styles CSS
│   │   ├── style.css                  # Styles principaux
│   │   ├── animations.css             # Animations
│   │   ├── lightbox.css               # Lightbox
│   │   ├── loading.css                # Écran de chargement
│   │   ├── medias.css                 # Galerie médias
│   │   ├── modal.css                  # Modales
│   │   ├── photographer.css           # Page photographe
│   │   ├── photographer-stats.css     # Statistiques
│   │   ├── scroll-to-top.css          # Bouton scroll
│   │   └── sort-dropdown.css          # Menu de tri
│   ├── js/
│   │   ├── main.js                    # Point d'entrée
│   │   ├── config.js                  # Configuration
│   │   ├── helpers/                   # Utilitaires
│   │   │   ├── cache.js               # Cache
│   │   │   ├── dataBuilders.js        # Construction données
│   │   │   ├── helper.js              # Fonctions utilitaires
│   │   │   ├── logData.js             # Logs
│   │   │   ├── responsiveImages.js    # Images responsives
│   │   │   └── sorterMedias.js        # Tri médias
│   │   ├── photographer/              # Page photographe
│   │   │   ├── page.js                # Contrôleur page
│   │   │   ├── scrollToTop.js         # Bouton scroll
│   │   │   ├── sortButton.js          # Menu tri
│   │   │   └── generate/              # Générateurs DOM
│   │   │       ├── generateCard.js            # Cartes médias
│   │   │       ├── generateMedia.js           # Médias lightbox
│   │   │       └── generatePhotographerHeader.js  # Header photographe
│   │   └── utils/
│   │       ├── errorHandler.js        # Gestion erreurs
│   │       ├── accessibility/         # Accessibilité
│   │       │   ├── aria.js            # Attributs ARIA
│   │       │   ├── focus.js           # Gestion focus
│   │       │   ├── gesture.js         # Gestes tactiles
│   │       │   ├── inert.js           # Désactivation éléments
│   │       │   ├── keyboard.js        # Navigation clavier
│   │       │   ├── lightbox.js        # Accessibilité lightbox
│   │       │   ├── mediaCard.js       # Accessibilité cartes
│   │       │   ├── mobile.js          # Accessibilité mobile
│   │       │   └── modal.js           # Accessibilité modales
│   │       └── managers/              # Gestionnaires
│   │           ├── animation.js       # Animations
│   │           ├── characterCount.js  # Compteur caractères
│   │           ├── data.js            # Données
│   │           ├── lightbox.js        # Lightbox
│   │           ├── loading.js         # Chargement
│   │           ├── mediaCards.js      # Cartes médias
│   │           ├── modal.js           # Modales
│   │           ├── sorterButton.js    # Bouton tri
│   │           ├── stats.js           # Statistiques
│   │           ├── submission.js      # Soumission formulaire
│   │           ├── submitButtonState.js  # État bouton
│   │           └── validation.js      # Validation
│   ├── api/                           # Données
│   │   ├── data.json                  # Base de données
│   │   └── [Photographes]/            # Dossiers photographes
│   │       ├── [nom].jpg              # Portrait desktop
│   │       ├── [nom].webp             # Portrait desktop WebP
│   │       ├── [nom].mobile.jpg       # Portrait mobile
│   │       ├── [nom].mobile.webp      # Portrait mobile WebP
│   │       └── media/                 # Médias photographe
│   └── favicons/
│       ├── standard/                  # Favicons 16-512px
│       ├── apple/                     # Apple Touch Icons
│       ├── microsoft/                 # MS Tiles
│       ├── browserconfig.xml          # Configuration MS
│       ├── favicon.png                # Favicon principal
│       ├── logo.png                   # Logo
│       └── close.svg                  # Icône fermeture
├── scripts/
│   ├── minify.cjs                     # Minification CSS/JS/HTML
│   ├── optimizeImages.cjs             # Optimisation images
│   ├── generateFavicons.cjs           # Génération favicons
│   └── generateVideoThumbnails.sh     # Thumbnails vidéos
├── index.html                         # Page d'accueil
├── photographer.html                  # Template photographe
├── sitemap.xml                        # Sitemap SEO
├── robots.txt                         # Directives crawlers
├── manifest.json                      # Configuration PWA
├── package.json                       # Dépendances npm
└── eslint.config.js                   # Configuration ESLint
```

---

## Technologies

- **JavaScript ES6+** (modules, async/await, destructuring)
- **Factory Pattern** pour génération DOM
- **CSS3** (variables, Grid, Flexbox)
- **HTML5 sémantique** (ARIA, accessibilité)
- **Font Awesome 6** (icônes)
- **Lightning CSS** (minification ultra-rapide)
- **Sharp** (génération favicons)
- **ImageMagick** (thumbnails vidéos)
- **PWA Ready** (manifest, favicons organisés)

---

## Responsive Design

| Appareil | Point de rupture | Disposition |
| -------- | ---------------- | ----------- |
| Mobile   | < 768px          | 1 colonne   |
| Tablette | 768px–1024px     | 2 colonnes  |
| Desktop  | > 1024px         | 3 colonnes  |

---

## Fonctionnalités principales

### Navigation

- Liste des photographes avec profils
- Accès direct au portfolio
- Retour en haut de page fluide

### Page Photographe

- Header dynamique avec informations
- Galerie média (photos et vidéos)
- Tri par popularité, date ou titre
- Système de likes interactif
- Statistiques totales (likes, tarif)

### Lightbox

- Navigation clavier (flèches, Escape, Home/End, Space)
- Navigation tactile (swipe gauche/droite)
- Navigation souris (molette, clics)
- Contrôle vidéo (click play/pause, auto-pause)
- Compteur et informations média
- Préchargement des médias adjacents
- Thumbnails vidéos comme posters

### Formulaire Contact

- Validation en temps réel
- Sanitization des entrées
- Messages d'erreur accessibles
- Focus automatique
- Compteur de caractères
- Gestion des erreurs

---

## Accessibilité

- Structure HTML sémantique (`<nav>`, `<main>`, `<article>`)
- Attributs ARIA complets (roles, labels, états)
- Navigation clavier intégrale
- Focus trap dans modales et lightbox
- Lecteurs d'écran compatibles
- Indicateurs de focus visibles
- Alternatives textuelles pour médias
- Support haute contrastes
- Respect préférence mouvement réduit

---

## SEO & Performance

- Sitemap XML complet
- Fichier robots.txt
- URLs canoniques
- Meta tags Open Graph et Twitter Card
- Favicons multi-plateformes (30+ variants)
- Lazy loading des images
- Préchargement ressources critiques
- Minification CSS/JS/HTML (Lightning CSS)
- Lighthouse CI automatisé
- Favicons organisés (standard/apple/microsoft)
- Validation HTML5 W3C compatible

---

## Démarrage

### Installation

```bash
git clone https://github.com/Steinshy/FishEye.git
cd FishEye
npm install
```

### Développement

```bash
npm run dev  # Démarre serveur local sur port 8080
```

### Scripts utilitaires

```bash
node scripts/generateFavicons.cjs      # Génère favicons (Sharp)
bash scripts/generateVideoThumbnails.sh  # Génère thumbnails vidéos (ImageMagick requis)
node scripts/optimizeImages.cjs desktop  # Optimise images desktop
node scripts/optimizeImages.cjs mobile   # Optimise images mobile
```

## Pattern de conception

### Factory Pattern

Utilisé pour générer dynamiquement les éléments DOM en fonction du
type de média (photo ou vidéo).

### Module Pattern

Séparation claire des responsabilités :

- `data.js` - Gestion données (fetch, cache)
- `mediaCards.js` - Gestion galerie
- `modal.js` - Gestion modales
- `stats.js` - Gestion statistiques
- `sorterButton.js` - Tri médias
- `validation.js` - Validation formulaire
- `lightbox.js` - Gestion lightbox
- `loading.js` - Écran chargement
- `animation.js` - Animations
- `characterCount.js` - Compteur caractères
- `submission.js` - Soumission formulaire
- `submitButtonState.js` - État bouton

---

## Scripts disponibles

| Commande                  | Description               |
| ------------------------- | ------------------------- |
| `npm run dev`             | Serveur local (port 8080) |
| `npm run lint`            | Lint JS, CSS, HTML, MD    |
| `npm run lint:js`         | Lint JavaScript           |
| `npm run lint:css`        | Lint CSS                  |
| `npm run lint:html`       | Lint HTML                 |
| `npm run lint:md`         | Lint Markdown             |
| `npm run format`          | Vérifie formatage         |
| `npm run minify`          | Minifie CSS, JS, HTML     |
| `npm run minify:css`      | Minifie CSS uniquement    |
| `npm run minify:js`       | Minifie JS uniquement     |
| `npm run minify:html`     | Minifie HTML uniquement   |
| `npm run optimize:images` | Optimise images (Sharp)   |

---

## Configuration

### Linting

- ESLint 9.x (JavaScript)
- Stylelint (CSS)
- html-validate (HTML)
- markdownlint (Markdown)
- Prettier (formatage)
- Commitlint (messages de commit)

### Minification

- Lightning CSS (CSS - 100x plus rapide)
- Minify package (JS/HTML)
- Automatisé via scripts

### CI/CD

- Lint et format (GitHub Actions)
- Lighthouse audits local + production
- Déploiement automatique GitHub Pages
- Cleanup automatique des anciennes runs
- 4 workflows (main+cleanup, deploy, lighthouse, release)

---

## Compatibilité

### Navigateurs supportés

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

### Node.js

- Version >= 22.0.0
- npm >= 10.0.0

---

## Dépendances requises

### Pour développement

- Node.js >= 22.0.0
- npm >= 10.0.0

### Pour génération assets

- **Sharp** (optimisation images et favicons) - Installé via npm
- **ImageMagick** (thumbnails vidéos) - `brew install imagemagick`

---

## Liens utiles

- [Validateur W3C](https://validator.w3.org/)
- [AChecker (Accessibilité)](https://achecker.achecks.ca/checker/index.php)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

---

## Licence

Projet réalisé dans le cadre du parcours Développeur Web d'OpenClassrooms.

Copyright 2025 - FishEye
