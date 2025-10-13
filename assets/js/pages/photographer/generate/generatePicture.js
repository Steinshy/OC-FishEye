import { getResponsiveImageUrls } from '../../../utils/helpers/responsiveImages.js';

export const generatePicture = (mediaElement, isLCP = false) => {
  const pictureMedia = document.createElement('div');
  pictureMedia.className = 'media-picture';
  pictureMedia.setAttribute('data-media-type', 'image');
  pictureMedia.setAttribute('data-media-id', mediaElement.id);

  const { webp, jpg, sizes } = getResponsiveImageUrls(mediaElement.medias.webpUrl, mediaElement.medias.jpgUrl);

  const loading = isLCP ? 'eager' : 'lazy';
  const fetchpriority = isLCP ? 'high' : 'low';

  pictureMedia.innerHTML = `
    <picture>
      <source srcset="${webp.srcset}" type="image/webp" sizes="${sizes}" />
      <source srcset="${jpg.srcset}" type="image/jpeg" sizes="${sizes}" />
      <img
        class="media-image"
        src="${jpg.desktop}"
        alt="${mediaElement.title || 'Média'}"
        loading="${loading}"
        fetchpriority="${fetchpriority}"
        decoding="async"
        data-media-id="${mediaElement.id}"
        aria-describedby="media-info-${mediaElement.id}"
      />
    </picture>
  `;

  return pictureMedia;
};
