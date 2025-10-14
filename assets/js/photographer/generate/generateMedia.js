// Generate media HTML elements for images and videos

import { isMobileOrTablet } from '../../helpers/helper.js';
import { getMediaResponsiveUrls, getResponsivePosterUrl } from '../../helpers/responsiveImages.js';

// Generate picture element with responsive sources
const generatePicture = (media, useHighQuality = false) => {
  const picture = document.createElement('div');
  picture.className = 'media-picture';
  picture.setAttribute('data-media-type', 'image');
  picture.setAttribute('data-media-id', media.id);

  const { webp, jpg } = getMediaResponsiveUrls(media, useHighQuality);

  picture.innerHTML = `
    <picture>
      <source srcset="${webp.url}" type="image/webp" />
      <source srcset="${jpg.url}" type="image/jpeg" />
      <img
        class="media-image"
        src="${jpg.url}"
        alt="${media.title || 'Média'}"
        loading="lazy"
        fetchpriority="low"
        decoding="async"
        data-media-id="${media.id}"
        aria-describedby="media-info-${media.id}"
      />
    </picture>
  `;

  return picture;
};

// Generate video element with controls
const generateVideo = (media, useHighQuality = false) => {
  const video = document.createElement('div');
  video.className = 'media-video';
  video.setAttribute('data-media-type', 'video');
  video.setAttribute('data-media-id', media.id);

  const isMobile = useHighQuality ? false : isMobileOrTablet();
  const poster = getResponsivePosterUrl(media.medias.posterUrl, isMobile);
  const caption = media.medias.mp4Url.replace('.mp4', '.vtt');

  video.innerHTML = `
    <video
      data-media-type="video"
      data-media-id="${media.id}"
      poster="${poster}"
      preload="none"
      fetchpriority="auto"
      controls
      controlsList="nodownload"
      playsinline
      class="media-video-player"
      aria-label="${media.title || 'Vidéo'}"
      aria-describedby="media-info-${media.id}"
      tabindex="0"
    >
      <source src="${media.medias.mp4Url}" type="video/mp4">
      <track
        kind="captions"
        src="${caption}"
        srclang="fr"
        label="Français"
      >
      Votre navigateur ne supporte pas la lecture de vidéos.
    </video>
  `;

  return video;
};

// Generate media element based on type
export const generateMedia = (media, useHighQuality = false) => {
  if (!media) return null;

  switch (media.mediaType) {
    case 'image':
      return generatePicture(media, useHighQuality);
    case 'video':
      return generateVideo(media, useHighQuality);
    default:
      return null;
  }
};
