import { createMediaCard } from './renderer.js';

export const createMediaCardWithEvents = (media, folderName) => {
  const { card, loadingElement, mediaElement } = createMediaCard(media, folderName);

  const handleMediaLoad = () => {
    loadingElement.style.display = 'none';
    mediaElement.style.display = 'block';
    mediaElement.removeEventListener('load', handleMediaLoad);
    mediaElement.removeEventListener('canplaythrough', handleMediaLoad);
  };

  if (media.image) {
    mediaElement.addEventListener('load', handleMediaLoad);
  } else {
    mediaElement.addEventListener('canplaythrough', handleMediaLoad);
  }

  return card;
};

const preloadImages = (medias, folderName) => {
  const imagePromises = medias
    .filter(media => media.image)
    .map(media => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = `assets/photographers/${folderName}/jpg/${media.image.media_jpg}`;
      });
    });

  return Promise.allSettled(imagePromises);
};

export const renderMediaGallery = async (medias, folderName) => {
  const container = document.getElementById('media-cards');
  if (!container) return;

  try {
    await preloadImages(medias, folderName);
  } catch (error) {
    console.error('Error preloading images:', error);
  }

  container.innerHTML = '';
  medias.forEach(media => {
    const card = createMediaCardWithEvents(media, folderName);
    container.appendChild(card);
  });
};
