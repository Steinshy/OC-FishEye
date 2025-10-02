import { EventManager } from '../eventManager.js';

export const setupLightboxEventListeners = (modal, callbacks) => {
  const { previousSlide, nextSlide, close, handleKeyDown, handleTouchStart, handleTouchEnd, handleWheel, handleFocusIn } = callbacks;

  const controls = [
    {
      id: 'lightbox-prev',
      handler: e => {
        e.preventDefault();
        e.stopPropagation();
        previousSlide();
      },
    },
    {
      id: 'lightbox-next',
      handler: e => {
        e.preventDefault();
        e.stopPropagation();
        nextSlide();
      },
    },
    {
      id: 'lightbox-close',
      handler: e => {
        e.stopPropagation();
        close();
      },
    },
  ];

  controls.forEach(({ id, handler }) => {
    const btn = document.getElementById(id);
    if (btn) EventManager.add(btn, 'click', handler, id);
  });

  const events = [
    [document, 'keydown', handleKeyDown, 'lightbox-keyboard', {}],
    [modal, 'touchstart', handleTouchStart, 'lightbox-touchstart', { passive: true }],
    [modal, 'touchend', handleTouchEnd, 'lightbox-touchend', { passive: true }],
    [modal, 'wheel', handleWheel, 'lightbox-wheel', { passive: false }],
    [modal, 'focusin', handleFocusIn, 'lightbox-focus', {}],
  ];

  events.forEach(([element, event, handler, key, options]) => {
    EventManager.add(element, event, handler, key, options);
  });
};
