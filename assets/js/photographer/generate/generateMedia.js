import { isMobileOrTablet } from '../../helpers/helper.js';
import { getMediaResponsiveUrls, getResponsivePosterUrl } from '../../helpers/responsiveImages.js';

const generatePicture = (mediaElement, useHighQuality = false) => {
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

const generateVideo = (media, useHighQuality = false) => {
  const videoMedia = document.createElement('div');
  videoMedia.className = 'media-video';
  videoMedia.setAttribute('data-media-type', 'video');
  videoMedia.setAttribute('data-media-id', media.id);

  const isMobile = useHighQuality ? false : isMobileOrTablet();
  const posterUrl = getResponsivePosterUrl(media.medias.posterUrl, isMobile);
  const captionPath = media.medias.mp4Url.replace('.mp4', '.vtt');

  videoMedia.innerHTML = `
    <video
      data-media-type="video"
      data-media-id="${media.id}"
      poster="${posterUrl}"
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
        src="${captionPath}"
        srclang="fr"
        label="Français"
      >
      Votre navigateur ne supporte pas la lecture de vidéos.
    </video>
  `;

  return videoMedia;
};

export const generateMedia = (photographerMedia, useHighQuality = false) => {
  if (!photographerMedia) return null;

  switch (photographerMedia.mediaType) {
    case 'image':
      return generatePicture(photographerMedia, useHighQuality);
    case 'video':
      return generateVideo(photographerMedia, useHighQuality);
    default:
      return null;
  }
};
