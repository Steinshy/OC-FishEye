// Setup accessibility for media cards

import { interactive, media } from '../../config.js';

import { aria } from './aria.js';
import { events } from './keyboard.js';

// Setup keyboard and click handlers for media card
export const setupCardAccessibility = (card, mediaData, onMediaClick, onLikeClick) => {
  const likes = card.querySelector(interactive.likesButton);
  const content = card.querySelector(media.content);
  const video = card.querySelector(media.videoElement);

  if (content && onMediaClick && !video) {
    events.attachClickAndKeyboard(content, () => onMediaClick(mediaData));
    aria.makeInteractive(content, {
      role: 'button',
      label: `Ouvrir ${mediaData.mediaType}: ${mediaData.title || ''}`,
      tabindex: 0,
    });
  }

  if (likes && onLikeClick) {
    events.attachClickAndKeyboard(likes, () => onLikeClick(mediaData, likes), { preventDefault: false });
  }
};
