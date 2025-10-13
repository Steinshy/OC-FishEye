import { getResponsiveImageUrls } from '../../../utils/helpers/responsiveImages.js';

export const generatePicture = mediaElement => {
  const pictureMedia = document.createElement('div');
  pictureMedia.className = 'media-picture';
  pictureMedia.setAttribute('data-media-type', 'image');
  pictureMedia.setAttribute('data-media-id', mediaElement.id);

  const { webp, jpg, sizes } = getResponsiveImageUrls(mediaElement.medias.webpUrl, mediaElement.medias.jpgUrl);

  pictureMedia.innerHTML = `
    <picture>
      <source srcset="${webp.srcset}" type="image/webp" sizes="${sizes}" />
      <source srcset="${jpg.srcset}" type="image/jpeg" sizes="${sizes}" />
      <img
        class="media-image"
        src="${jpg.desktop}"
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
