import { selectorTypes } from '../../constants.js';
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

export const dropdownEventListeners = ({ button, optionsContainer, options, controller, orientation, handlers }) => {
  const buttonKey = `${button.id || 'dropdown'}-button`;
  const keyboardKey = `${button.id || 'dropdown'}-keyboard`;
  const escapeKey = `${button.id || 'dropdown'}-escape`;

  const arrowHandler = handlers.createArrowNavigation({
    elements: options,
    orientation,
    onNavigate: nextElement => (controller.currentIndex = options.findIndex(option => option === nextElement)),
    onActivate: element => controller.select(element),
  });

  const escapeHandler = handlers.createEscapeHandler(() => controller.close());

  if (button) {
    EventManager.add(
      button,
      'click',
      e => {
        e.preventDefault();
        e.stopPropagation();
        controller.toggle();
      },
      buttonKey
    );
  }

  options.forEach((option, index) => {
    EventManager.add(
      option,
      'click',
      e => {
        e.preventDefault();
        e.stopPropagation();
        controller.select(option);
      },
      `${button.id || 'dropdown'}-option-${index}`
    );
  });

  EventManager.add(optionsContainer, 'keydown', arrowHandler, keyboardKey);
  EventManager.add(document, 'keydown', escapeHandler, escapeKey);
};

export const setupCardAccessibility = (card, media, onMediaClick, onLikeClick, handlers) => {
  const eyeIcon = card.querySelector(selectorTypes.eyeIcon);
  const likesButton = card.querySelector(selectorTypes.likesButton);
  const mediaContent = card.querySelector(selectorTypes.mediaContent);

  if (eyeIcon && onMediaClick) {
    eyeIcon.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      onMediaClick(media);
    });
    eyeIcon.addEventListener(
      'keydown',
      handlers.createActivationHandler(() => onMediaClick(media))
    );
  }

  if (mediaContent && onMediaClick) {
    mediaContent.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      onMediaClick(media);
    });
    mediaContent.addEventListener(
      'keydown',
      handlers.createActivationHandler(() => onMediaClick(media))
    );
    mediaContent.setAttribute('tabindex', '0');
    mediaContent.setAttribute('role', 'button');
    mediaContent.setAttribute('aria-label', `Ouvrir ${media.mediaType}: ${media.title || ''}`);
  }

  if (likesButton && onLikeClick) {
    likesButton.addEventListener('click', e => {
      e.stopPropagation();
      onLikeClick(media, likesButton);
    });
    likesButton.addEventListener(
      'keydown',
      handlers.createActivationHandler(() => onLikeClick(media, likesButton))
    );
  }
};
