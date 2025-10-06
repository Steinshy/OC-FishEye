import { accessibilityManager } from '../../../../utils/accessibility.js';
import { videoEventListeners } from '../../../../utils/helpers/events/mediasEventsListeners.js';

export const createVideo = media => {
  if (!media) return;

  const container = document.createElement('div');
  container.className = 'media-video';
  container.setAttribute('data-media-type', 'video');
  container.setAttribute('data-media-id', media.id);

  container.innerHTML = `
    <video
      data-media-type="video"
      data-media-id="${media.id}"
      muted
      loop
      playsinline
      preload="metadata"
      controls
      class="media-video-player"
      aria-label="${media.title || 'Vidéo'}"
      aria-describedby="media-info-${media.id}"
      tabindex="0"
    >
      <source src="${media.medias.mp4Url}" type="video/mp4">
    </video>
  `;

  const video = container.querySelector('video');

  videoEventListeners(video, accessibilityManager().keyboardHandler.createVideoInteractionHandler(video));

  return container;
};
