import { interactive, media } from '../../selectors.js';

import { aria } from './aria.js';
import { events } from './keyboard.js';

export const setupCardAccessibility = (card, mediaData, onMediaClick, onLikeClick) => {
  const likesButton = card.querySelector(interactive.likesButton);
  const mediaContent = card.querySelector(media.content);
  const video = card.querySelector(media.videoElement);

  if (mediaContent && onMediaClick && !video) {
    events.attachClickAndKeyboard(mediaContent, () => onMediaClick(mediaData));
    aria.makeInteractive(mediaContent, {
      role: 'button',
      label: `Ouvrir ${mediaData.mediaType}: ${mediaData.title || ''}`,
      tabindex: 0,
    });
  }

  if (likesButton && onLikeClick) {
    events.attachClickAndKeyboard(likesButton, () => onLikeClick(mediaData, likesButton), { preventDefault: false });
  }
};
