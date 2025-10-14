import { getMediaResponsiveUrls } from '../../../utils/helpers/responsiveImages.js';

export const generatePicture = (mediaElement, useHighQuality = false) => {
  const pictureMedia = document.createElement('div');
  pictureMedia.className = 'media-picture';
  pictureMedia.setAttribute('data-media-type', 'image');
  pictureMedia.setAttribute('data-media-id', mediaElement.id);

  const { webp, jpg } = getMediaResponsiveUrls(mediaElement, useHighQuality);

  pictureMedia.innerHTML = `
    <picture>
      <source srcset="${webp.url}" type="image/webp" />
      <source srcset="${jpg.url}" type="image/jpeg" />
      <img
        class="media-image"
        src="${jpg.url}"
        alt="${mediaElement.title || 'Média'}"
        loading="lazy"
        fetchpriority="low"
        decoding="async"
        data-media-id="${mediaElement.id}"
        aria-describedby="media-info-${mediaElement.id}"
      />
    </picture>
  `;

  return pictureMedia;
};
