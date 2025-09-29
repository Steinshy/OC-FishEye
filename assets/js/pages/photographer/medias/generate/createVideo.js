import { createAccessibilityManager } from '../../../../accessibilityManagement.js';

const accessibilityManager = createAccessibilityManager();

export const createVideo = media => {
  if (!media) return;

  const container = document.createElement('div');
  container.className = 'media-video';
  container.setAttribute('data-media-type', 'video');
  container.setAttribute('data-media-id', media.id);

  const captionPath = media.medias.mp4Url.replace(/\/media\//, '/media/captions/').replace('.mp4', '.vtt');

  container.innerHTML = `
    <video
      data-media-type="video"
      data-media-id="${media.id}"
      controls
      muted
      loop
      playsinline
      preload="metadata"
      class="media-video-player"
      aria-label="${media.title || 'Vidéo'} - ${media.mediaType}"
      aria-describedby="media-info-${media.id}"
    >
      <source src="${media.medias.mp4Url}" type="video/mp4">
      <track kind="captions" src="${captionPath}" srclang="fr" label="Français" default>
    </video>
  `;

  const video = container.querySelector('video');

  accessibilityManager.ariaManager.updateAttributes(video, {
    'aria-label': `${media.title || 'Vidéo'} - ${media.mediaType}`,
    'aria-describedby': `media-info-${media.id}`,
  });

  return container;
};
