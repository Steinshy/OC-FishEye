import { createAccessibilityManager } from '../../../accessibilityManagement.js';

import { createCard } from './generate/createCard.js';
import { createPicture } from './generate/createPicture.js';
import { createVideo } from './generate/createVideo.js';
import { openLightbox } from './lightbox.js';

const accessibilityManager = createAccessibilityManager();

export const createMediasCards = photographerMedias => {
  if (!photographerMedias) return;
  const mediasCards = document.createElement('div');
  mediasCards.className = 'medias-cards';
  mediasCards.setAttribute('role', 'grid');
  mediasCards.setAttribute('aria-label', 'Galerie de médias');

  photographerMedias.forEach(photographerMedia => {
    const mediaElement = handleTypeCard(photographerMedia);
    if (mediaElement) {
      const card = createCard(photographerMedia, mediaElement);
      accessibilityManager.setupMediaCardAccessibility(card, photographerMedia, openMediaLightbox, toggleLike);

      mediasCards.appendChild(card);
    }
  });
  return mediasCards;
};

const openMediaLightbox = (media, allMedias) => {
  // Use provided medias or get from global cache
  const mediasArray = allMedias || window.currentPhotographerMedias || [];

  if (!mediasArray.length) {
    console.error('No media data available for lightbox');
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
    setTimeout(() => {
      likesButton.classList.remove('liked');
    }, 1000);
  }
};

export const handleTypeCard = photographerMedia => {
  if (!photographerMedia) return null;

  switch (photographerMedia.mediaType) {
    case 'image':
      return createPicture(photographerMedia);
    case 'video':
      return createVideo(photographerMedia);
    default:
      return null;
  }
};
