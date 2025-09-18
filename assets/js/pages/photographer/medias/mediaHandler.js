import { createMediaCard } from './card.js';

export const renderMediaGallery = async (medias, media_path) => {
  const loader = createMediaLoader();
  const galleryContainer = document.getElementById('gallery-container');
  const cardContainer = document.createElement('div');
  cardContainer.className = 'media-cards';

  galleryContainer.innerHTML = '';
  galleryContainer.appendChild(loader);

  await new Promise(resolve => setTimeout(resolve, 800));

  cardContainer.innerHTML = `
      ${medias.map((media, index) => createMediaCard(media, media_path, index)).join('')}
  `;

  galleryContainer.removeChild(loader);
  galleryContainer.appendChild(cardContainer);
};

export const createMediaPicture = (media, media_path) => {
  const { wepb_src, wepb_type, jpg_src, jpg_type, alt, loading } = {
    wepb_src: `${media_path}/webp/${media.image.media_webp}`,
    wepb_type: 'image/webp',
    jpg_src: `${media_path}/jpg/${media.image.media_jpg}`,
    jpg_type: 'image/jpeg',
    alt: media.title,
    loading: 'lazy',
  };
  const picture = document.createElement('picture');
  picture.innerHTML = `
  <source srcset="${wepb_src}" type="${wepb_type}" alt="${alt}" loading="${loading}">
  <source srcset="${jpg_src}" type="${jpg_type}" alt="${alt}" loading="${loading}">
  <img src="${jpg_src}" alt="${alt}" loading="${loading}">
  `;

  return picture;
};

export const createVideoElement = (media, media_path) => {
  const mp4_src = `${media_path}/video/${media.video.media_mp4}`;
  const video = document.createElement('video');

  video.controls = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = 'metadata';
  video.style.width = '100%';
  video.style.height = '100%';

  video.innerHTML = `
    <source src="${mp4_src}" type="video/mp4">
    <span>Your browser does not support the video tag.</span>
  `;

  return video;
};

export const createMediaLoader = () => {
  const loader = document.createElement('div');
  loader.innerHTML = `
    <div class="media-loading" id="media-loader">
      <div class="loading-spinner"></div>
      <p>Chargement...</p>
    </div>
  `;

  return loader;
};
