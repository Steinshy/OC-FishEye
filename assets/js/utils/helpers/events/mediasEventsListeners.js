import { EventManager } from './eventListeners.js';

export const videoEventListeners = (video, interactionHandler) => {
  if (!video || !interactionHandler) return;

  const videoKey = `video-${video.getAttribute('data-media-id') || 'unknown'}`;

  EventManager.add(video, 'click', interactionHandler, `${videoKey}-click`);
  EventManager.add(video, 'keydown', interactionHandler, `${videoKey}-keydown`);
};
