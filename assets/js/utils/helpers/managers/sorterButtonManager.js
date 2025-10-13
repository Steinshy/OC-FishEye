import { selectorTypes } from '../../../constants.js';
import { aria } from '../../accessibility/aria.js';
import { focusFirst, trapFocus } from '../../accessibility/focus.js';
import { handlers, events } from '../../accessibility/keyboard.js';

const findTargetOption = (options, container) => {
  return (
    options.find(option => aria.isSelected(option)) || options.find(option => !aria.isDisabled(option)) || focusFirst(container, selectorTypes.sortOptions)
  );
};

export const createSorterButton = ({ button, optionsContainer, options, onSelect, onClose, orientation = 'vertical' }) => {
  let isOpen = false;
  let focusTrapCleanup = null;

  const dropdown = {
    currentIndex: 0,

    open() {
      isOpen = true;
      aria.setExpanded(button, true);
      aria.toggleVisibility(optionsContainer, true);

      const targetOption = findTargetOption(options, optionsContainer);
      targetOption?.focus();
      focusTrapCleanup = trapFocus(optionsContainer, selectorTypes.sortOptions);
    },

    close() {
      isOpen = false;
      aria.setExpanded(button, false);
      aria.toggleVisibility(optionsContainer, false);

      focusTrapCleanup?.();
      focusTrapCleanup = null;
      button?.focus();
      onClose?.();
    },

    toggle() {
      isOpen ? dropdown.close() : dropdown.open();
    },

    select(option) {
      if (!option) return;
      aria.setSelected(options, option);
      onSelect?.(option);
      dropdown.close();
    },

    destroy() {
      focusTrapCleanup?.();
      focusTrapCleanup = null;
      optionsContainer.removeEventListener('keydown', arrowHandler);
      document.removeEventListener('keydown', escapeHandler);
    },
  };

  // Event handlers
  const arrowHandler = handlers.createArrowNavigation({
    elements: options,
    orientation,
    onNavigate: nextElement => (dropdown.currentIndex = options.findIndex(option => option === nextElement)),
    onActivate: element => dropdown.select(element),
  });
  const escapeHandler = handlers.createEscapeHandler(() => dropdown.close());

  // Attach event listeners
  button.addEventListener(
    'click',
    events.createClickHandler(() => dropdown.toggle())
  );
  optionsContainer.addEventListener('keydown', arrowHandler);
  document.addEventListener('keydown', escapeHandler);

  options.forEach(option => {
    option.addEventListener(
      'click',
      events.createClickHandler(() => dropdown.select(option))
    );
  });

  return dropdown;
};
