import { createAccessibilityManager } from '../../../accessibilityManagement.js';
import { errorConfig } from '../../../constants.js';
import { logError } from '../../../errorHandler.js';
import { openLightbox } from '../lightbox/lightbox.js';

import { createMediaElement } from './createMediaElement.js';
import { createCard } from './generate/createCard.js';

const accessibilityManager = createAccessibilityManager();

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
      accessibilityManager.setupMediaCardAccessibility(card, photographerMedia, openMediaLightbox, toggleLike);
      mediasCards.appendChild(card);
    }
  });
  return mediasCards;
};

const openMediaLightbox = (media, allMedias) => {
  const mediasArray = allMedias || window.currentPhotographerMedias || [];
  if (!mediasArray.length) {
    logError('No media data available for lightbox', null, errorConfig.contexts.LIGHTBOX);
    return;
  }
  openLightbox(media.id, mediasArray);
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
    setTimeout(() => likesButton.classList.remove('liked'), 1000);
  }
};

export const handleTypeCard = createMediaElement;
