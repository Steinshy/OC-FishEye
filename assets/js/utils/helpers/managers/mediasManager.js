import { generateCard } from '../../../pages/photographer/generate/generateCard.js';
import { openLightbox } from '../../../pages/photographer/lightbox.js';
import { setupCardAccessibility } from '../../accessibility/card.js';

import { generateMedias } from './generateMediasManager.js';
import { incrementLike } from './statsManager.js';

export const updateMediasOrder = sortedMedias => {
  const mainMedia = document.getElementById('main-medias');
  if (!mainMedia || !Array.isArray(sortedMedias)) return;

  const existingCards = mainMedia.querySelectorAll('.media-card');
  existingCards.forEach(card => card.classList.add('sorting'));

  setTimeout(() => {
    generateMediasCards(mainMedia, sortedMedias);
  }, 200);
};

export const generateMediasCards = (mainMedia, sortedMedias) => {
  mainMedia.innerHTML = '';
  sortedMedias.forEach((media, index) => {
    const mediaElement = generateMedias(media);
    if (mediaElement) {
      const card = generateCard(media, mediaElement);
      const img = card.querySelector('img');
      const video = card.querySelector('video');

      if (img) {
        img.loading = index < 3 ? 'eager' : 'lazy';
        img.fetchpriority = index < 3 ? 'high' : 'low';
      }
      if (video) video.preload = 'metadata';

      setupCardAccessibility(card, media, clickedMedia => openLightbox(clickedMedia.id, sortedMedias), incrementLike);
      mainMedia.appendChild(card);
    }
  });
};
