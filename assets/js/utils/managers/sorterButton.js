// Custom dropdown button for sorting medias

import { selectorTypes } from '../../config.js';
import { aria } from '../accessibility/aria.js';
import { focusFirst, createFocusCycle } from '../accessibility/focus.js';
import { handlers, events } from '../accessibility/keyboard.js';

// Find target option to focus
const findTarget = (options, container) =>
  options.find(option => aria.isSelected(option)) || options.find(option => !aria.isDisabled(option)) || focusFirst(container, selectorTypes.sortOptions);

// Create accessible dropdown sorter button
export const createSorterButton = ({ button, optionsContainer, options, onSelect, onClose, orientation = 'vertical' }) => {
  let isOpen = false;
  let focusCycleCleanup = null;

  const dropdown = {
    currentIndex: 0,

    open() {
      isOpen = true;
      aria.setExpanded(button, true);
      aria.toggleVisibility(optionsContainer, true);

      findTarget(options, optionsContainer)?.focus();
      focusCycleCleanup = createFocusCycle(optionsContainer, selectorTypes.sortOptions);
    },

    close() {
      isOpen = false;
      aria.setExpanded(button, false);
      aria.toggleVisibility(optionsContainer, false);

      focusCycleCleanup?.();
      focusCycleCleanup = null;
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
      focusCycleCleanup?.();
      focusCycleCleanup = null;
      optionsContainer.removeEventListener('keydown', arrowNav);
      document.removeEventListener('keydown', escapeNav);
    },
  };

  const arrowNav = handlers.createArrowNavigation({
    elements: options,
    orientation,
    onNavigate: next => (dropdown.currentIndex = options.findIndex(opt => opt === next)),
    onActivate: element => dropdown.select(element),
  });
  const escapeNav = handlers.createEscapeHandler(() => dropdown.close());

  button.addEventListener(
    'click',
    events.createClickHandler(() => dropdown.toggle())
  );
  optionsContainer.addEventListener('keydown', arrowNav);
  document.addEventListener('keydown', escapeNav);

  options.forEach(opt =>
    opt.addEventListener(
      'click',
      events.createClickHandler(() => dropdown.select(opt))
    )
  );

  return dropdown;
};
