import { aria } from './aria.js';
import { events } from './keyboard.js';

export const setupCardAccessibility = (card, media, onMediaClick, onLikeClick) => {
  const likesButton = card.querySelector('.likes');
  const mediaContent = card.querySelector('.media-content');
  const video = card.querySelector('video');

  if (mediaContent && onMediaClick && !video) {
    events.attachClickAndKeyboard(mediaContent, () => onMediaClick(media));
    aria.makeInteractive(mediaContent, {
      role: 'button',
      label: `Ouvrir ${media.mediaType}: ${media.title || ''}`,
      tabindex: 0,
    });
  }

  if (likesButton && onLikeClick) {
    events.attachClickAndKeyboard(likesButton, () => onLikeClick(media, likesButton), { preventDefault: false });
  }
};
