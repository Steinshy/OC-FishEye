import { timeoutConfig, selectorTypes } from '../../../constants.js';
import { accessibilityManager } from '../../../utils/accessibility.js';
import { open } from '../lightbox/lightbox.js';

import { createMediaElement } from './createMediaElement.js';
import { createCard } from './generate/createCard.js';

const accessibility = accessibilityManager();

export const createMediasCards = photographerMedias => {
  if (!photographerMedias) return;
  const mediasCards = document.createElement('div');
  mediasCards.className = 'medias-cards';
  mediasCards.setAttribute('role', 'list');
  mediasCards.setAttribute('aria-label', 'Galerie de médias');

  photographerMedias.forEach(photographerMedia => {
    const mediaElement = createMediaElement(photographerMedia);
    if (mediaElement) {
      const card = createCard(photographerMedia, mediaElement);
      accessibility.setupMediaCardAccessibility(card, photographerMedia, openMediaLightbox, toggleLike);
      mediasCards.appendChild(card);
    }
  });
  return mediasCards;
};

export const updateMediasOrder = sortedMedias => {
  const mainMedia = document.getElementById('main-medias');
  if (!mainMedia || !Array.isArray(sortedMedias)) return;

  let container = mainMedia.querySelector(selectorTypes.mediaCardsContainer);
  if (!container) {
    mainMedia.innerHTML = '';
    container = createMediasCards(sortedMedias);
    if (container) mainMedia.appendChild(container);
    return;
  }

  const fragment = document.createDocumentFragment();
  const existingById = new Map(Array.from(container.querySelectorAll(selectorTypes.mediaCards)).map(card => [card.getAttribute('data-media-id'), card]));

  sortedMedias.forEach(media => {
    const id = String(media.id);
    const existing = existingById.get(id);
    if (existing) {
      fragment.appendChild(existing);
    } else {
      const mediaElement = createMediaElement(media);
      if (mediaElement) {
        const card = createCard(media, mediaElement);
        accessibility.setupMediaCardAccessibility(card, media, openMediaLightbox, toggleLike);
        fragment.appendChild(card);
      }
    }
  });

  container.replaceChildren(fragment);
};

const openMediaLightbox = (media, allMedias) => {
  const mediasArray = allMedias || window.currentPhotographerMedias || [];
  if (!mediasArray.length) {
    return;
  }
  open(media.id, mediasArray);
};

const toggleLike = (media, likesButton) => {
  const likesCount = likesButton.querySelector('span');
  if (likesCount) {
    const currentLikes = parseInt(likesCount.textContent, 10) || 0;
    const newLikes = currentLikes + 1;
    likesCount.textContent = newLikes;
    likesCount.setAttribute('aria-live', 'polite');
    media.likes = newLikes;
    likesButton.classList.add('liked');
    setTimeout(() => likesButton.classList.remove('liked'), timeoutConfig.like);
  }
};
