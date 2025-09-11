/**
 * Media Gallery - Handles media gallery functionality
 * - Manage gallery layout
 * - Handle media loading events
 * - Coordinate rendering with media-renderer
 */

import {
  createMediaCard as renderMediaCard,
  createErrorHTML,
  createGalleryLoadingHTML
} from './media-renderer.js';

/**
 * Create media card with event handling
 * @param media
 * @param folderName
 */
export const createMediaCard = (media, folderName) => {
  const { card, loadingElement, mediaElement } = renderMediaCard(media, folderName);

  // Handle image/video load events
  const handleMediaLoad = () => {
    loadingElement.style.display = 'none';
    mediaElement.style.display = 'block';
    mediaElement.removeEventListener('load', handleMediaLoad); // Remove for images
    mediaElement.removeEventListener('canplaythrough', handleMediaLoad); // Remove for videos
  };

  if (media.image) {
    mediaElement.addEventListener('load', handleMediaLoad);
  } else {
    mediaElement.addEventListener('canplaythrough', handleMediaLoad);
  }

  mediaElement.addEventListener('error', () => {
    loadingElement.innerHTML = createErrorHTML();
  });

  return card;
};

/**
 * Preload images for faster loading
 * @param medias
 * @param folderName
 */
export const preloadImages = (medias, folderName) => {
  const imagePromises = medias
    .filter(media => media.image)
    .map(media => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = `assets/photographers/${folderName}/jpg/${media.image.jpg}`;
      });
    });

  return Promise.allSettled(imagePromises);
};

/**
 * Render media gallery
 * @param medias
 * @param folderName
 */
export const renderMediaGallery = async (medias, folderName) => {
  const container = document.getElementById('media-cards');

  if (!container) {
    console.error('Media container not found');
    return;
  }

  container.innerHTML = '';

  // Show loading message
  container.innerHTML = createGalleryLoadingHTML();

  try {
    // Preload images in the background
    await preloadImages(medias, folderName);

    // Clear loading message
    container.innerHTML = '';

    // Render all media cards
    medias.forEach(media => {
      const card = createMediaCard(media, folderName);
      container.appendChild(card);
    });

    console.warn(`Rendered ${medias.length} media items`);
  } catch (error) {
    console.error('Error preloading images:', error);
    // Still render the gallery even if preloading fails
    container.innerHTML = '';
    medias.forEach(media => {
      const card = createMediaCard(media, folderName);
      container.appendChild(card);
    });
  }
};

export const MediaGallery = {
  createMediaCard,
  renderMediaGallery,
  preloadImages
};
