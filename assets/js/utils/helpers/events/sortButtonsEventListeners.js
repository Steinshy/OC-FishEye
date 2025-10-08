import { EventManager } from './eventListeners.js';

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
