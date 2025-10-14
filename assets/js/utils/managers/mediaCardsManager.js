import { getPageElements } from '../../constants.js';
import { generateCard } from '../../photographer/generate/generateCard.js';
import { generateMedia } from '../../photographer/generate/generateMedia.js';
import { media } from '../../selectors.js';
import { setupCardAccessibility } from '../accessibility/mediaCard.js';

import { getSafeDuration } from './animationManager.js';
import { openLightbox } from './lightboxManager.js';
import { incrementLike } from './statsManager.js';

export const updateMediasOrder = async sortedMedias => {
  const { mainMedias } = getPageElements();
  if (!mainMedias || !Array.isArray(sortedMedias)) return;

  const existingCards = mainMedias.querySelectorAll(media.card);
  if (!existingCards.length) return;

  existingCards.forEach(card => card.classList.add('sorting'));
  await new Promise(resolve => setTimeout(resolve, getSafeDuration(200)));

  const cardsMap = new Map();
  existingCards.forEach(card => {
    const mediaId = card.getAttribute('data-media-id');
    if (mediaId) cardsMap.set(mediaId, card);
  });

  sortedMedias.forEach(media => {
    const card = cardsMap.get(String(media.id));
    if (card) {
      card.classList.remove('sorting');
      mainMedias.appendChild(card);
    }
  });
};

export const renderMediasCards = sortedMedias => {
  const { mainMedias } = getPageElements();
  if (!mainMedias || !Array.isArray(sortedMedias)) return;

  mainMedias.innerHTML = '';
  sortedMedias.forEach(media => {
    const mediaElement = generateMedia(media);
    if (mediaElement) {
      const card = generateCard(media, mediaElement);
      setupCardAccessibility(card, media, clickedMedia => openLightbox(clickedMedia.id, sortedMedias), incrementLike);
      mainMedias.appendChild(card);
    }
  });
};
