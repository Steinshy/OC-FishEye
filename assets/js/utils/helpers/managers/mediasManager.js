import { timeoutConfig } from '../../../constants.js';
import { generateCard } from '../../../pages/photographer/generate/generateCard.js';
import { openLightbox } from '../../../pages/photographer/lightbox.js';
import { accessibilityManager } from '../../accessibility.js';

import { generateMedias } from './generateMediasManager.js';
import { incrementTotalLikes } from './statsManager.js';

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

      const accessibility = accessibilityManager();
      accessibility.setupMediaCardAccessibility(card, media, media => openLightbox(media.id, sortedMedias), toggleLike);
      mainMedia.appendChild(card);
    }
  });
};

const toggleLike = (media, likesButton) => {
  const likesCount = likesButton.querySelector('span');
  const heartIcon = likesButton.querySelector('.fa-heart');

  if (likesCount) {
    const newLikes = (parseInt(likesCount.textContent, 10) || 0) + 1;
    likesCount.textContent = newLikes;
    likesCount.setAttribute('aria-live', 'polite');
    media.likes = newLikes;

    if (heartIcon) {
      heartIcon.classList.add('pulse');
      setTimeout(() => heartIcon.classList.remove('pulse'), timeoutConfig.like);
    }

    incrementTotalLikes();
  }
};
