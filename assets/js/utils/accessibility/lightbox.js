import { lightboxElements } from '../../constants.js';
import { media } from '../../selectors.js';
import { createSwipeHandlers } from '../managers/gestureManager.js';

import { handleFocusEscape } from './focus.js';
import { handlers, media as mediaPlayer, events } from './keyboard.js';

// Keyboard Navigation
export const createLightboxKeyboardHandler = ({ lightboxState, onClose, onPrevious, onNext, onNavigate }) => {
  return handlers.createKeyMapHandler({
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
};

// Touch Swipe Handlers
export const createLightboxSwipeHandlers = ({ onNext, onPrevious, minDistance }) => {
  const swipeHandlers = createSwipeHandlers({ left: onNext, right: onPrevious }, minDistance);

  return {
    handleStart: e => swipeHandlers.handleStart(e),
    handleEnd: e => swipeHandlers.handleEnd(e),
  };
};

// Mouse Wheel Navigation
export const createLightboxWheelHandler = ({ lightboxState, onNext, onPrevious }) => {
  return e => {
    if (!lightboxState()) return;
    e.preventDefault();
    e.deltaY > 0 ? onNext() : onPrevious();
  };
};

// Focus Handler
export const createLightboxFocusHandler = () => {
  return e => handleFocusEscape(lightboxElements.mainModal, e);
};

// Initialize all lightbox event listeners
export const initializeLightboxEvents = ({ mainModal, prev, next, close, handlers }) => {
  const { onPrevious, onNext, onClose, onKeyboard, onTouchStart, onTouchEnd, onWheel, onFocus } = handlers;

  const eventManager = events.createEventManager([
    { element: prev, event: 'click', handler: events.createClickHandler(onPrevious, { preventDefault: false }) },
    { element: next, event: 'click', handler: events.createClickHandler(onNext, { preventDefault: false }) },
    { element: close, event: 'click', handler: events.createClickHandler(onClose, { preventDefault: false }) },
    { element: document, event: 'keydown', handler: onKeyboard },
    { element: mainModal, event: 'touchstart', handler: onTouchStart, options: { passive: true } },
    { element: mainModal, event: 'touchend', handler: onTouchEnd, options: { passive: true } },
    { element: mainModal, event: 'wheel', handler: onWheel, options: { passive: false } },
    { element: mainModal, event: 'focusin', handler: onFocus },
  ]);

  eventManager.attach();
};
