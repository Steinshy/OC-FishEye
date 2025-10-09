import { EventManager } from './eventListeners.js';

// Need to rename callbacks to something more descriptive
export const LightboxEventListeners = (modal, callbacks) => {
  const {
    previousSlide,
    nextSlide,
    closeLightbox,
    handleKeyboardNavigation,
    handleTouchSwipeStart,
    handleTouchSwipeEnd,
    handleMouseWheelNavigation,
    handleFocus,
  } = callbacks;

  const createControlHandler =
    (callback, preventDefaults = true) =>
    e => {
      if (preventDefaults) e.preventDefault();
      e.stopPropagation();
      callback();
    };

  const controls = [
    { id: 'lightbox-prev', handler: createControlHandler(previousSlide) },
    { id: 'lightbox-next', handler: createControlHandler(nextSlide) },
    { id: 'lightbox-close', handler: createControlHandler(closeLightbox, false) },
  ];

  controls.forEach(({ id, handler }) => {
    const btn = document.getElementById(id);
    if (btn) EventManager.add(btn, 'click', handler, id);
  });

  const events = [
    [document, 'keydown', handleKeyboardNavigation, 'lightbox-keyboard', {}],
    [modal, 'touchstart', handleTouchSwipeStart, 'lightbox-touchstart', { passive: true }],
    [modal, 'touchend', handleTouchSwipeEnd, 'lightbox-touchend', { passive: true }],
    [modal, 'wheel', handleMouseWheelNavigation, 'lightbox-wheel', { passive: false }],
    [modal, 'focusin', handleFocus, 'lightbox-focus', {}],
  ];

  events.forEach(([element, event, handler, key, options]) => {
    EventManager.add(element, event, handler, key, options);
  });
};
