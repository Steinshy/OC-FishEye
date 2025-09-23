import { createMediaCard } from './card.js';

let renderTimeout = null;
let isRendering = false;

export const renderMediaGallery = async (medias, media_path) => {
  if (renderTimeout) {
    clearTimeout(renderTimeout);
  }

  if (isRendering) {
    return new Promise(resolve => {
      renderTimeout = setTimeout(() => {
        renderMediaGallery(medias, media_path).then(resolve);
      }, 100);
    });
  }

  isRendering = true;

  try {
    const galleryContainer = document.getElementById('gallery-container');

    galleryContainer.innerHTML = '';

    const loader = createMediaLoader();
    const cardContainer = document.createElement('div');
    cardContainer.className = 'media-cards';

    galleryContainer.appendChild(loader);

    await new Promise(resolve => setTimeout(resolve, 800));

    galleryContainer.innerHTML = '';

    cardContainer.innerHTML = `
        ${medias.map((media, index) => createMediaCard(media, media_path, index)).join('')}
    `;

    galleryContainer.appendChild(cardContainer);
  } finally {
    isRendering = false;
  }
};
export const createMediaLoader = () => {
  const loader = document.createElement('div');
  loader.innerHTML = `
    <div class="media-loading" id="media-loader">
      <div class="loading-spinner"></div>
      <p>Chargement...</p>
    </div>
  `;

  return loader;
};
