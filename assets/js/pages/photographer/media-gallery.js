/**
 * Media Gallery - Handles rendering & functionality
 * - Render media cards (images/videos)
 * - Handle media loading states
 * - Manage gallery layout
 * - Handle media interactions
 */

/**
 * Create media card
 */
export const createMediaCard = (media, folderName) => {
  const card = document.createElement("div");
  card.className = "media_card";

  // Add loading state
  card.innerHTML = `
    <div class="media_content">
      <div class="media_loading">
        <div class="loading-spinner"></div>
        <p>Chargement...</p>
      </div>
      <div class="media_info">
        <h3>${media.title}</h3>
        <div class="media_stats">
          <span class="likes">${media.likes} <i class="fas fa-heart"></i></span>
          <span class="price">${media.price}€</span>
        </div>
      </div>
    </div>
  `;

  // Create and configure the media element
  const mediaContainer = card.querySelector('.media_content');
  const loadingElement = card.querySelector('.media_loading');

  let mediaElement;
  if (media.image) {
    mediaElement = document.createElement('img');
    mediaElement.src = `assets/photographers/${folderName}/jpg/${media.image.jpg}`;
    mediaElement.alt = media.title;
    mediaElement.loading = 'eager';
    mediaElement.style.display = 'none';
  } else {
    mediaElement = document.createElement('video');
    mediaElement.controls = true;
    mediaElement.style.display = 'none';
    const source = document.createElement('source');
    source.src = `assets/photographers/${folderName}/video/${media.video.mp4}`;
    source.type = 'video/mp4';
    mediaElement.appendChild(source);
  }

  // Handle image/video load events
  mediaElement.addEventListener('load', () => {
    loadingElement.style.display = 'none';
    mediaElement.style.display = 'block';
  });

  mediaElement.addEventListener('error', () => {
    loadingElement.innerHTML = '<div class="error-icon">⚠️</div><p>Erreur de chargement</p>';
  });

  // Insert media element before the media_info
  mediaContainer.insertBefore(mediaElement, mediaContainer.querySelector('.media_info'));

  return card;
};

/**
 * Preload images for faster loading
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
 */
export const renderMediaGallery = async (medias, folderName) => {
  const container = document.getElementById("media_cards");

  if (!container) {
    console.error("Media container not found");
    return;
  }

  container.innerHTML = "";

  // Show loading message
  container.innerHTML = '<div class="gallery-loading">Chargement de la galerie...</div>';

  try {
    // Preload images in the background
    await preloadImages(medias, folderName);

    // Clear loading message
    container.innerHTML = "";

    // Render all media cards
    medias.forEach((media) => {
      const card = createMediaCard(media, folderName);
      container.appendChild(card);
    });

    console.log(`Rendered ${medias.length} media items`);
  } catch (error) {
    console.error("Error preloading images:", error);
    // Still render the gallery even if preloading fails
    container.innerHTML = "";
    medias.forEach((media) => {
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
