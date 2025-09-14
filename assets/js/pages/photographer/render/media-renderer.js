/**
 * Media Renderer - Pure HTML rendering functions
 * - Create HTML structure for media cards
 * - Handle different media types (images/videos)
 * - Generate loading states and error states
 */

export const createMediaCardHTML = media => {
  return `
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
};

export const createImageElement = (media, folderName) => {
  const img = document.createElement('img');
  img.src = `assets/photographers/${folderName}/jpg/${media.image.jpg}`;
  img.alt = media.title;
  img.loading = 'eager';
  img.style.display = 'none';
  return img;
};

export const createVideoElement = (media, folderName) => {
  const video = document.createElement('video');
  video.controls = true;
  video.autoplay = false;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.style.display = 'none';

  const source = document.createElement('source');
  source.src = `assets/photographers/${folderName}/video/${media.video.mp4}`;
  source.type = 'video/mp4';
  video.appendChild(source);

  return video;
};

export const createMediaCard = (media, folderName) => {
  const card = document.createElement('div');
  card.className = 'media_card';

  // Set the HTML structure
  card.innerHTML = createMediaCardHTML(media);

  // Get references to elements
  const mediaContainer = card.querySelector('.media_content');
  const loadingElement = card.querySelector('.media_loading');

  // Create media element (image or video)
  let mediaElement;
  if (media.image) {
    mediaElement = createImageElement(media, folderName);
  } else {
    mediaElement = createVideoElement(media, folderName);
  }

  // Insert media element before the media_info
  mediaContainer.insertBefore(mediaElement, mediaContainer.querySelector('.media_info'));

  return {
    card,
    mediaContainer,
    loadingElement,
    mediaElement
  };
};

export const renderMediaCard = media => {
  const card = document.createElement('div');
  card.className = 'media_card';

  // Set the HTML structure
  card.innerHTML = createMediaCardHTML(media);

  return {
    card,
    mediaContainer: card.querySelector('.media_content'),
    loadingElement: card.querySelector('.media_loading'),
    infoElement: card.querySelector('.media_info')
  };
};

/**
 * Create error HTML content
 * @returns {string} HTML string for error display
 */
export const createErrorHTML = () => {
  return '<div class="error-icon">⚠️</div><p>Erreur de chargement</p>';
};

/**
 * Create gallery loading HTML
 * @returns {string} HTML string for loading display
 */
export const createGalleryLoadingHTML = () => {
  return '<div class="gallery-loading">Chargement de la galerie...</div>';
};
