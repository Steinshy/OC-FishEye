import { EventManager } from '../eventManager.js';

export const videoEventListeners = (video, interactionHandler) => {
  if (!video || !interactionHandler) return;

  const videoKey = `video-${video.getAttribute('data-media-id') || 'unknown'}`;

  EventManager.add(video, 'click', interactionHandler, `${videoKey}-click`);
  EventManager.add(video, 'keydown', interactionHandler, `${videoKey}-keydown`);
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
