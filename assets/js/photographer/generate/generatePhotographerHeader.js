import { getResponsiveImageUrls } from '../../helpers/responsiveImages.js';
import { picture } from '../../selectors.js';
import { aria } from '../../utils/accessibility/aria.js';

const loadPictureImages = (pictureContainer, jpgUrl, webpUrl) => {
  const img = pictureContainer.querySelector(picture.profile);
  const webpSource = pictureContainer.querySelector(picture.webpSource);
  const jpgSource = pictureContainer.querySelector(picture.jpegSource);

  if (!img) return;

  const updateLoadingState = () => pictureContainer.classList.replace('loading', 'loaded');

  webpSource && (webpSource.srcset = webpSource.dataset.srcset || webpUrl);
  jpgSource && (jpgSource.srcset = jpgSource.dataset.srcset || jpgUrl);
  Object.assign(img, { src: jpgUrl, fetchpriority: 'high', decoding: 'sync' });

  img.addEventListener('load', updateLoadingState, { once: true });
  img.addEventListener('error', updateLoadingState, { once: true });

  if (img.complete) updateLoadingState();
};

const generateContactButton = name => {
  const contactContainer = document.createElement('div');
  contactContainer.className = 'contact-container';
  contactContainer.innerHTML = `<button id="contact-button" aria-label="Contacter ${name}" disabled aria-disabled="true">Contactez-moi</button>`;
  return contactContainer;
};

const generateInfoSection = ({ name, tagline, city, country, price }) => {
  const infoSection = document.createElement('div');
  infoSection.className = 'section-info';
  infoSection.id = 'bio-info';
  infoSection.innerHTML = `
    <h1 data-label="Nom du photographe">${name}</h1>
    <p data-label="Ville, Pays">${city}, ${country}</p>
    <p data-label="Tagline">${tagline}</p>
    <p data-label="Prix">${price}€ / jour</p>
  `;
  return infoSection;
};

const generatePictureSection = ({ name, jpgUrl, webpUrl }) => {
  const pictureContainer = document.createElement('div');
  pictureContainer.className = 'container-picture loading';

  const { webp, jpg } = getResponsiveImageUrls(webpUrl, jpgUrl);

  pictureContainer.innerHTML = `
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

  loadPictureImages(pictureContainer, jpg.url, webp.url);
  return pictureContainer;
};

export const generatePhotographerHeader = photographer => {
  const section = document.createElement('section');
  section.id = 'photographer-section';
  section.className = 'photographer-section';
  aria.setLabel(section, 'Section du photographe');

  const container = document.createElement('div');
  container.className = 'section-container';

  const infoSection = generateInfoSection(photographer);
  const contactButton = generateContactButton(photographer.name);
  const pictureSection = generatePictureSection({ name: photographer.name, ...photographer.portraits });

  container.append(infoSection, contactButton, pictureSection);
  section.appendChild(container);

  return section;
};
