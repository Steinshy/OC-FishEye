import { isMobileOrTablet } from '../../../utils/helpers/helper.js';
import { getResponsivePosterUrl } from '../../../utils/helpers/responsiveImages.js';

export const generateVideo = (media, useHighQuality = false) => {
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
