import { selectorTypes } from '../constants.js';

import { EventManager } from './eventManager.js';
import { dropdownEventListeners, setupCardAccessibility } from './helpers/eventListeners.js';

const focus = {
  focusFirst(container, selector = selectorTypes.focusable) {
    const element = container.querySelector(selector);
    element?.focus();
    return element;
  },

  focusLast(container, selector = selectorTypes.focusable) {
    const elements = container.querySelectorAll(selector);
    const element = elements[elements.length - 1];
    element?.focus();
    return element;
  },

  focusNext(elements, current, wrap = true) {
    const currentIndex = elements.findIndex(element => element === current);
    const nextIndex = wrap ? (currentIndex + 1) % elements.length : Math.min(currentIndex + 1, elements.length - 1);
    const element = elements[nextIndex];
    element?.focus();
    return element;
  },

  focusPrevious(elements, current, wrap = true) {
    const currentIndex = elements.findIndex(element => element === current);
    const previousIndex = wrap ? (currentIndex <= 0 ? elements.length - 1 : currentIndex - 1) : Math.max(currentIndex - 1, 0);
    const element = elements[previousIndex];
    element?.focus();
    return element;
  },

  trapFocus(container, selector = selectorTypes.focusable) {
    if (!container) return () => {};
    const handleTab = e => {
      if (e.key !== 'Tab') return;
      e.preventDefault();
      const elements = Array.from(container.querySelectorAll(selector)).filter(
        element => !element.hasAttribute('disabled') && !element.hasAttribute('inert') && element.offsetParent !== null
      );

      if (!elements.length) return;

      const { activeElement } = document;
      const currentIndex = elements.findIndex(el => el === activeElement);

      if (e.shiftKey) {
        const prevIndex = currentIndex <= 0 ? elements.length - 1 : currentIndex - 1;
        elements[prevIndex]?.focus();
      } else {
        const nextIndex = currentIndex === -1 || currentIndex >= elements.length - 1 ? 0 : currentIndex + 1;
        elements[nextIndex]?.focus();
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  },
};

const aria = {
  updateAttributes(element, attributes) {
    if (!element) return;
    Object.entries(attributes).forEach(([attribute, value]) => {
      value != null ? element.setAttribute(attribute, value) : element.removeAttribute(attribute);
    });
  },

  setExpanded(element, expanded) {
    aria.updateAttributes(element, { 'aria-expanded': expanded });
  },
  setHidden(element, hidden) {
    aria.updateAttributes(element, { 'aria-hidden': hidden });
  },
  setSelected(options, selected) {
    options.forEach(option => aria.updateAttributes(option, { 'aria-selected': option === selected }));
  },
  setActiveDescendant(container, active) {
    aria.updateAttributes(container, { 'aria-activedescendant': active?.id || null });
  },
};

const handlers = {
  createArrowNavigation({ elements, orientation = 'vertical', onNavigate, onActivate }) {
    return e => {
      const isVertical = orientation === 'vertical';
      const downKey = isVertical ? 'ArrowDown' : 'ArrowRight';
      const upKey = isVertical ? 'ArrowUp' : 'ArrowLeft';

      if (e.key === downKey || e.key === upKey) {
        e.preventDefault();
        e.stopPropagation();
        const currentElement = document.activeElement;
        const nextElement = e.key === downKey ? focus.focusNext(elements, currentElement) : focus.focusPrevious(elements, currentElement);
        onNavigate?.(nextElement, currentElement);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        onActivate?.(document.activeElement);
      }
    };
  },

  createEscapeHandler(onEscape) {
    return e => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onEscape();
      }
    };
  },

  createActivationHandler(onActivate) {
    return e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        onActivate?.(document.activeElement);
      }
    };
  },

  updateVisualState(optionsContainer, isOpen) {
    if (!optionsContainer) return;
    optionsContainer.classList.toggle('show', isOpen);
    optionsContainer.classList.toggle('hidden', !isOpen);
  },
};

const dropdownController = ({ button, optionsContainer, options, onSelect, onClose, orientation = 'vertical' }) => {
  const controller = {
    isOpen: false,
    currentIndex: 0,
    focusTrap: null,

    open() {
      this.isOpen = true;
      aria.setExpanded(button, true);
      aria.setHidden(optionsContainer, false);
      handlers.updateVisualState(optionsContainer, true);
      const selectedOption = options.find(option => option.getAttribute('aria-selected') === 'true');
      const targetOption =
        selectedOption || options.find(option => !option.hasAttribute('disabled')) || focus.focusFirst(optionsContainer, selectorTypes.dropdownOptions);
      targetOption?.focus();
      this.focusTrap = focus.trapFocus(optionsContainer, selectorTypes.dropdownOptions);
    },

    close() {
      this.isOpen = false;
      aria.setExpanded(button, false);
      aria.setHidden(optionsContainer, true);
      handlers.updateVisualState(optionsContainer, false);
      if (this.focusTrap) {
        this.focusTrap();
        this.focusTrap = null;
      }
      button?.focus();
      onClose?.();
    },

    toggle() {
      this.isOpen ? this.close() : this.open();
    },

    navigate(direction) {
      if (!this.isOpen) return;
      const currentElement = document.activeElement;
      const nextElement = direction === 'next' ? focus.focusNext(options, currentElement) : focus.focusPrevious(options, currentElement);
      this.currentIndex = options.findIndex(option => option === nextElement);
    },

    select(option) {
      onSelect?.(option);
      this.close();
    },

    destroy() {
      const buttonKey = `${button.id || 'dropdown'}-button`;
      const keyboardKey = `${button.id || 'dropdown'}-keyboard`;
      const escapeKey = `${button.id || 'dropdown'}-escape`;

      EventManager.remove(buttonKey);
      EventManager.remove(keyboardKey);
      EventManager.remove(escapeKey);

      for (let i = 0; i < options.length; i++) {
        EventManager.remove(`${button.id || 'dropdown'}-option-${i}`);
      }
      if (this.focusTrap) {
        this.focusTrap();
        this.focusTrap = null;
      }
    },
  };

  dropdownEventListeners({ button, optionsContainer, options, controller, orientation, handlers });
  return controller;
};

const accessibilityManager = () => ({
  focusManager: focus,
  ariaManager: aria,
  keyboardHandler: {
    createArrowNavigation: handlers.createArrowNavigation,
    createEscapeHandler: handlers.createEscapeHandler,
    createActivationHandler: handlers.createActivationHandler,
  },
  eventManager: EventManager,
  dropdownController,
  setupMediaCardAccessibility: (card, media, onMediaClick, onLikeClick) => setupCardAccessibility(card, media, onMediaClick, onLikeClick, handlers),
});

export { accessibilityManager, EventManager };
