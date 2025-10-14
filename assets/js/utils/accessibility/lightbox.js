// Lightbox keyboard and touch event handlers

import { lightboxElements, media } from '../../config.js';

import { handleFocusEscape } from './focus.js';
import { createSwipeHandlers } from './gesture.js';
import { handlers, media as mediaPlayer, events } from './keyboard.js';

// Create keyboard handler for lightbox navigation
export const createLightboxKeyboardHandler = ({ lightboxState, onClose, onPrevious, onNext, onNavigate }) =>
  handlers.createKeyMapHandler({
    condition: lightboxState,
    keyMap: {
      Escape: onClose,
      ArrowLeft: onPrevious,
      ArrowRight: onNext,
      Home: () => onNavigate(0, false),
      End: () => onNavigate(lightboxElements.medias.length - 1, false),
      ' ': mediaPlayer.createVideoToggleHandler(() => lightboxElements.mainModal?.querySelector(media.videoElement)),
    },
  });

// Create swipe handlers for lightbox
export const createLightboxSwipeHandlers = ({ onNext, onPrevious, minDistance }) => {
  const handlers = createSwipeHandlers({ left: onNext, right: onPrevious }, minDistance);
  return {
    handleStart: e => handlers.handleStart(e),
    handleEnd: e => handlers.handleEnd(e),
  };
};

// Create mouse wheel handler for lightbox
export const createLightboxWheelHandler =
  ({ lightboxState, onNext, onPrevious }) =>
  e => {
    if (!lightboxState()) return;
    e.preventDefault();
    e.deltaY > 0 ? onNext() : onPrevious();
  };

// Create focus handler for lightbox
export const createLightboxFocusHandler = () => e => handleFocusEscape(lightboxElements.mainModal, e);

// Attach all lightbox event listeners
export const initializeLightboxEvents = ({ mainModal, prev, next, close, handlers: h }) => {
  events
    .createEventManager([
      { element: prev, event: 'click', handler: events.createClickHandler(h.onPrevious, { preventDefault: false }) },
      { element: next, event: 'click', handler: events.createClickHandler(h.onNext, { preventDefault: false }) },
      { element: close, event: 'click', handler: events.createClickHandler(h.onClose, { preventDefault: false }) },
      { element: document, event: 'keydown', handler: h.onKeyboard },
      { element: mainModal, event: 'touchstart', handler: h.onTouchStart, options: { passive: true } },
      { element: mainModal, event: 'touchend', handler: h.onTouchEnd, options: { passive: true } },
      { element: mainModal, event: 'wheel', handler: h.onWheel, options: { passive: false } },
      { element: mainModal, event: 'focusin', handler: h.onFocus },
    ])
    .attach();
};
