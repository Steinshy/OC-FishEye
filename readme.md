# FishEye

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
│   ├── css/                    # Styles (incl. mobile responsive)
│   ├── js/
│   │   ├── main.js             # Point d'entrée
│   │   ├── constants.js        # Constantes et sélecteurs
│   │   ├── pages/photographer/ # Page photographe
│   │   └── utils/
│   │       ├── accessibility.js      # Accessibilité
│   │       ├── errorHandler.js       # Gestion erreurs
│   │       ├── scrollToTop.js        # Scroll to top
│   │       └── helpers/
│   │           ├── helper.js         # Utilitaires (sanitize, validate)
│   │           ├── events/           # Event listeners
│   │           └── managers/         # Data, modal, stats, etc.
│   ├── api/                    # Données et médias
│   │   ├── data.json           # Base de données
│   │   └── [Photographes]/media/    # Photos, vidéos, thumbnails
│   └── favicons/
│       ├── standard/           # Favicons 16-512px
│       ├── apple/              # Apple Touch Icons
│       ├── microsoft/          # MS Tiles
│       └── browserconfig.xml   # Configuration MS
├── scripts/
│   ├── minify.cjs                  # Minification JS/HTML
│   ├── generateFavicons.cjs        # Génération favicons
│   └── generateVideoThumbnails.sh  # Thumbnails vidéos
├── index.html                  # Page d'accueil
├── photographer.html           # Template photographe
├── sitemap.xml                 # Sitemap SEO
├── robots.txt                  # Directives crawlers
└── manifest.json               # Configuration PWA
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

### Utilitaires

```bash
npm run favicons      # Génère tous les favicons
npm run video-thumbs  # Génère thumbnails vidéos (ImageMagick requis)
```

## Pattern de conception

### Factory Pattern

Utilisé pour générer dynamiquement les éléments DOM en fonction du
type de média (photo ou vidéo).

### Module Pattern

Séparation claire des responsabilités :

- `dataManager` - Gestion des données (fetch, cache)
- `mediasManager` - Gestion de la galerie
- `modalManager` - Gestion des modales
- `statsManager` - Gestion des statistiques
- `sorterManager` - Algorithmes de tri
- `validationManager` - Validation formulaire

---

## Scripts disponibles

| Commande               | Description                     |
| ---------------------- | ------------------------------- |
| `npm run dev`          | Serveur local (port 8080)       |
| `npm run lint`         | Lint JS, CSS, HTML              |
| `npm run lint:js`      | Lint JavaScript                 |
| `npm run lint:css`     | Lint CSS                        |
| `npm run lint:html`    | Lint HTML                       |
| `npm run lint:md`      | Lint Markdown                   |
| `npm run format`       | Vérifie formatage               |
| `npm run minify`       | Minifie CSS, JS, HTML           |
| `npm run favicons`     | Génère favicons (Sharp)         |
| `npm run video-thumbs` | Génère thumbnails (ImageMagick) |

---

## Configuration

### Linting

- ESLint 9.x (JavaScript)
- Stylelint (CSS)
- html-validate (HTML)
- Markdownlint (Markdown)
- Prettier (formatage)

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

- **Sharp** (favicons) - Installé via npm
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
