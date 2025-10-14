import { generateCard } from '../../../pages/photographer/generate/generateCard.js';
import { openLightbox } from '../../../pages/photographer/lightbox.js';
import { setupCardAccessibility } from '../../accessibility/card.js';

import { getSafeDuration } from './animationManager.js';
import { generateMedias } from './generateMediasManager.js';
import { incrementLike } from './statsManager.js';

export const loadPictureImages = (pictureContainer, jpgUrl, webpUrl) => {
  const img = pictureContainer.querySelector('.profile-picture');
  const webpSource = pictureContainer.querySelector('source[type="image/webp"]');
  const jpgSource = pictureContainer.querySelector('source[type="image/jpeg"]');

  if (!img) return;

  const updateLoadingState = () => pictureContainer.classList.replace('loading', 'loaded');

  webpSource && (webpSource.srcset = webpSource.dataset.srcset || webpUrl);
  jpgSource && (jpgSource.srcset = jpgSource.dataset.srcset || jpgUrl);
  Object.assign(img, { src: jpgUrl, fetchpriority: 'high', decoding: 'sync' });

  img.addEventListener('load', updateLoadingState, { once: true });
  img.addEventListener('error', updateLoadingState, { once: true });

  if (img.complete) updateLoadingState();
};

const handleImageLoading = card => {
  const mediaContent = card.querySelector('.media-content');
  const mediaElement = mediaContent?.querySelector('img, video');
  if (!mediaElement) return;

  const updateLoadingState = () => mediaContent.classList.replace('loading', 'loaded');

  const isVideo = mediaElement.tagName === 'VIDEO';
  const loadEvent = isVideo ? 'loadeddata' : 'load';
  const isAlreadyLoaded = isVideo ? mediaElement.readyState >= 2 : mediaElement.complete;

  mediaElement.addEventListener(loadEvent, updateLoadingState, { once: true });
  mediaElement.addEventListener('error', updateLoadingState, { once: true });

  if (isAlreadyLoaded) updateLoadingState();
};

export const updateMediasOrder = async sortedMedias => {
  const mainMedia = document.getElementById('main-medias');
  if (!mainMedia || !Array.isArray(sortedMedias)) return;

  const existingCards = mainMedia.querySelectorAll('.media-card');
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
      mainMedia.appendChild(card);
    }
  });
};

export const generateMediasCards = (mainMedia, sortedMedias) => {
  mainMedia.innerHTML = '';
  sortedMedias.forEach((media, index) => {
    const isLCP = index < 3;
    const mediaElement = generateMedias(media, isLCP);
    if (mediaElement) {
      const card = generateCard(media, mediaElement);
      handleImageLoading(card);
      setupCardAccessibility(card, media, clickedMedia => openLightbox(clickedMedia.id, sortedMedias), incrementLike);
      mainMedia.appendChild(card);
    }
  });
};
