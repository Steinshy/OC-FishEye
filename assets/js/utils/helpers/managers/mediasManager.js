import { timeoutConfig } from '../../../constants.js';
import { openLightbox } from '../../../pages/photographer/lightbox.js';
import { createCard } from '../../../pages/photographer/medias/generate/createCard.js';
import { accessibilityManager } from '../../accessibility.js';

import { createMediaElement } from './generateMediasManager.js';
import { incrementTotalLikes } from './statsManager.js';

export const createMediasCards = (mainMedia, photographerMedias) => {
  if (!photographerMedias) return;
  renderMedias(mainMedia, photographerMedias);
};

export const updateMediasOrder = sortedMedias => {
  const mainMedia = document.getElementById('main-medias');
  if (!mainMedia || !Array.isArray(sortedMedias)) return;

  createMediasCards(mainMedia, sortedMedias);
};

const renderMedias = (mainMedia, sortedMedias) => {
  mainMedia.innerHTML = '';
  sortedMedias.forEach((media, index) => {
    const mediaElement = createMediaElement(media);
    if (mediaElement) {
      const card = createCard(media, mediaElement);
      const img = card.querySelector('img');
      const video = card.querySelector('video');

      if (img) {
        img.loading = index < 3 ? 'eager' : 'lazy';
        img.fetchpriority = index < 3 ? 'high' : 'low';
      }
      if (video) video.preload = 'metadata';

      const accessibility = accessibilityManager();
      accessibility.setupMediaCardAccessibility(card, media, media => openLightbox(media.id, sortedMedias), toggleLike);
      mainMedia.appendChild(card);
    }
  });
};

const toggleLike = (media, likesButton) => {
  const likesCount = likesButton.querySelector('span');
  if (likesCount) {
    const newLikes = (parseInt(likesCount.textContent, 10) || 0) + 1;
    likesCount.textContent = newLikes;
    likesCount.setAttribute('aria-live', 'polite');
    media.likes = newLikes;
    likesButton.classList.add('liked');
    setTimeout(() => likesButton.classList.remove('liked'), timeoutConfig.like);

    // Update total likes in stats bar
    incrementTotalLikes();
  }
};
