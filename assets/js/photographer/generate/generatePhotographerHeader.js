// Generate photographer profile header section

import { picture } from '../../config.js';
import { getResponsiveImageUrls } from '../../helpers/responsiveImages.js';
import { aria } from '../../utils/accessibility/aria.js';

// Load profile picture with responsive sources
const loadPictureImages = (container, jpg, webp) => {
  const img = container.querySelector(picture.profile);
  const webpSrc = container.querySelector(picture.webpSource);
  const jpgSrc = container.querySelector(picture.jpegSource);

  if (!img) return;

  const updateState = () => container.classList.replace('loading', 'loaded');

  webpSrc && (webpSrc.srcset = webpSrc.dataset.srcset || webp);
  jpgSrc && (jpgSrc.srcset = jpgSrc.dataset.srcset || jpg);
  Object.assign(img, { src: jpg, fetchpriority: 'high', decoding: 'sync' });

  img.addEventListener('load', updateState, { once: true });
  img.addEventListener('error', updateState, { once: true });

  if (img.complete) updateState();
};

// Generate contact button element
const generateContactButton = name => {
  const contact = document.createElement('div');
  contact.className = 'contact-container';
  contact.innerHTML = `<button id="contact-button" aria-label="Contacter ${name}" disabled aria-disabled="true">Contactez-moi</button>`;
  return contact;
};

// Generate photographer info section
const generateInfoSection = ({ name, tagline, city, country, price }) => {
  const info = document.createElement('div');
  info.className = 'section-info';
  info.id = 'bio-info';
  info.innerHTML = `
    <h1 data-label="Nom du photographe">${name}</h1>
    <p data-label="Ville, Pays">${city}, ${country}</p>
    <p data-label="Tagline">${tagline}</p>
    <p data-label="Prix">${price}€ / jour</p>
  `;
  return info;
};

// Generate profile picture section
const generatePictureSection = ({ name, jpgUrl, webpUrl }) => {
  const container = document.createElement('div');
  container.className = 'container-picture loading';

  const { webp, jpg } = getResponsiveImageUrls(webpUrl, jpgUrl);

  container.innerHTML = `
    <picture>
      <source data-srcset="${webp.url}" type="image/webp">
      <source data-srcset="${jpg.url}" type="image/jpeg">
      <img
        class="profile-picture"
        alt="Portrait de ${name}"
        loading="eager"
        fetchpriority="high"
        decoding="async"
        width="900"
        height="900"
      >
    </picture>
  `;

  loadPictureImages(container, jpg.url, webp.url);
  return container;
};

// Generate complete photographer header
export const generatePhotographerHeader = photographer => {
  const section = document.createElement('section');
  section.id = 'photographer-section';
  section.className = 'photographer-section';
  aria.setLabel(section, 'Section du photographe');

  const container = document.createElement('div');
  container.className = 'section-container';

  const info = generateInfoSection(photographer);
  const contact = generateContactButton(photographer.name);
  const pictureSection = generatePictureSection({ name: photographer.name, ...photographer.portraits });

  container.append(info, contact, pictureSection);
  section.appendChild(container);

  return section;
};
