// Render and update media card grid

import { getPageElements, media } from '../../config.js';
import { generateCard } from '../../photographer/generate/generateCard.js';
import { generateMedia } from '../../photographer/generate/generateMedia.js';
import { setupCardAccessibility } from '../accessibility/mediaCard.js';

import { getSafeDuration } from './animation.js';
import { openLightbox } from './lightbox.js';
import { incrementLike } from './stats.js';

// Reorder media cards with animation
export const updateMediasOrder = async sortedMedias => {
  const { mainMedias } = getPageElements();
  if (!mainMedias || !Array.isArray(sortedMedias)) return;

  const cards = mainMedias.querySelectorAll(media.card);
  if (!cards.length) return;

  cards.forEach(card => card.classList.add('sorting'));
  await new Promise(resolve => setTimeout(resolve, getSafeDuration(200)));

  const map = new Map();
  cards.forEach(card => {
    const id = card.getAttribute('data-media-id');
    if (id) map.set(id, card);
  });

  sortedMedias.forEach(media => {
    const card = map.get(String(media.id));
    if (card) {
      card.classList.remove('sorting');
      mainMedias.appendChild(card);
    }
  });
};

// Render all media cards to page
export const renderMediasCards = sortedMedias => {
  const { mainMedias } = getPageElements();
  if (!mainMedias || !Array.isArray(sortedMedias)) return;

  mainMedias.innerHTML = '';
  sortedMedias.forEach(media => {
    const element = generateMedia(media);
    if (element) {
      const card = generateCard(media, element);
      setupCardAccessibility(card, media, clicked => openLightbox(clicked.id, sortedMedias), incrementLike);
      mainMedias.appendChild(card);
    }
  });
};
