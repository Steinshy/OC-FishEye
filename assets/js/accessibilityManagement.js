const focus = {
  focusFirst(container, selector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') {
    const element = container.querySelector(selector);
    element?.focus();
    return element;
  },

  focusLast(container, selector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') {
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

  trapFocus(container, selector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') {
    const elements = Array.from(container.querySelectorAll(selector)).filter(element => !element.hasAttribute('disabled'));
    if (!elements.length) {
      return () => {};
    }
    const [firstElement, lastElement] = [elements[0], elements[elements.length - 1]];

    const handleTab = ({ key, shiftKey, preventDefault }) => {
      if (key !== 'Tab') return;
      const { activeElement } = document;
      if (shiftKey && activeElement === firstElement) {
        preventDefault();
        lastElement?.focus();
      } else if (!shiftKey && activeElement === lastElement) {
        preventDefault();
        firstElement?.focus();
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
    this.updateAttributes(element, { 'aria-expanded': expanded });
  },

  setHidden(element, hidden) {
    this.updateAttributes(element, { 'aria-hidden': hidden });
  },

  setSelected(options, selected) {
    options.forEach(option => {
      this.updateAttributes(option, { 'aria-selected': option === selected });
    });
  },

  setActiveDescendant(container, active) {
    this.updateAttributes(container, { 'aria-activedescendant': active?.id || null });
  },
};

const HandlerManager = {
  dropdown: {
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

    createOutsideClick(container, trigger, onOutsideClick) {
      return e => {
        const isOutside = container ? !container.contains(e.target) && e.target !== trigger : e.target !== trigger;
        if (isOutside) onOutsideClick(e);
      };
    },

    updateVisualState(optionsContainer, isOpen) {
      if (!optionsContainer) return;
      if (isOpen) {
        optionsContainer.classList.add('show');
        optionsContainer.classList.remove('hidden');
      } else {
        optionsContainer.classList.remove('show');
        optionsContainer.classList.add('hidden');
      }
    },

    setupEventListeners({ button, optionsContainer, options, controller, orientation }) {
      const arrowHandler = HandlerManager.dropdown.createArrowNavigation({
        elements: options,
        orientation,
        onNavigate: nextElement => (controller.currentIndex = options.findIndex(option => option === nextElement)),
        onActivate: element => controller.select(element),
      });

      const escapeHandler = HandlerManager.dropdown.createEscapeHandler(() => controller.close());
      const outsideClickHandler = HandlerManager.dropdown.createOutsideClick(optionsContainer, button, () => controller.close());

      if (button) {
        events.add(
          button,
          'click',
          e => {
            e.preventDefault();
            e.stopPropagation();
            controller.toggle();
          },
          'dropdown-button'
        );
      }

      options.forEach((option, index) => {
        events.add(
          option,
          'click',
          e => {
            e.preventDefault();
            e.stopPropagation();
            controller.select(option);
          },
          `dropdown-option-${index}`
        );
      });

      events.add(optionsContainer, 'keydown', arrowHandler, 'dropdown-keyboard');
      events.add(document, 'keydown', escapeHandler, 'dropdown-escape');
      events.add(document, 'click', outsideClickHandler, 'dropdown-outside');
    },
  },

  medias: {
    createActivationHandler(onActivate) {
      return e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          onActivate?.(document.activeElement);
        }
      };
    },

    setupCardAccessibility(card, media, onMediaClick, onLikeClick) {
      const eyeIcon = card.querySelector('.eye-icon');
      const likesButton = card.querySelector('.likes');

      if (eyeIcon && onMediaClick) {
        eyeIcon.addEventListener('click', e => {
          e.preventDefault();
          e.stopPropagation();
          onMediaClick(media);
        });
        const mediaHandler = HandlerManager.medias.createActivationHandler(() => onMediaClick(media));
        eyeIcon.addEventListener('keydown', mediaHandler);
      }

      if (likesButton && onLikeClick) {
        likesButton.addEventListener('click', e => {
          e.stopPropagation();
          onLikeClick(media, likesButton);
        });
        const likesHandler = HandlerManager.medias.createActivationHandler(() => onLikeClick(media, likesButton));
        likesButton.addEventListener('keydown', likesHandler);
      }
    },
  },

  general: {
    createHomeEndNavigation(elements, onNavigate) {
      return e => {
        if (e.key === 'Home') {
          e.preventDefault();
          e.stopPropagation();
          const firstElement = focus.focusFirst(document.body, elements);
          onNavigate?.(firstElement, document.activeElement);
        } else if (e.key === 'End') {
          e.preventDefault();
          e.stopPropagation();
          const lastElement = focus.focusLast(document.body, elements);
          onNavigate?.(lastElement, document.activeElement);
        }
      };
    },
  },
};

const events = {
  listeners: new Map(),
  add(element, event, handler, key) {
    element.addEventListener(event, handler);
    this.listeners.set(key, { element, event, handler });
  },
  remove(key) {
    const listener = this.listeners.get(key);
    if (listener) {
      listener.element.removeEventListener(listener.event, listener.handler);
      this.listeners.delete(key);
    }
  },
  removeAll() {
    this.listeners.forEach(({ element, event, handler }) => element.removeEventListener(event, handler));
    this.listeners.clear();
  },
};

function createDropdownController({ button, optionsContainer, options, onSelect, onClose, orientation = 'vertical' }) {
  const controller = createDropdownControllerMethods({ button, optionsContainer, options, onSelect, onClose });
  HandlerManager.dropdown.setupEventListeners({ button, optionsContainer, options, controller, orientation });
  return { ...controller, destroy: () => events.removeAll() };
}

function createDropdownControllerMethods({ button, optionsContainer, options, onSelect, onClose }) {
  return {
    isOpen: false,
    currentIndex: 0,

    open() {
      this.isOpen = true;
      aria.setExpanded(button, true);
      aria.setHidden(optionsContainer, false);
      HandlerManager.dropdown.updateVisualState(optionsContainer, true);
      const firstFocusable = options.find(option => !option.hasAttribute('disabled')) || focus.focusFirst(optionsContainer);
      firstFocusable?.focus();
    },

    close() {
      this.isOpen = false;
      aria.setExpanded(button, false);
      aria.setHidden(optionsContainer, true);
      HandlerManager.dropdown.updateVisualState(optionsContainer, false);
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
  };
}

function createAccessibilityManager() {
  return {
    focusManager: focus,
    ariaManager: aria,
    keyboardHandler: {
      createArrowNavigation: HandlerManager.dropdown.createArrowNavigation,
      createEscapeHandler: HandlerManager.dropdown.createEscapeHandler,
      createActivationHandler: HandlerManager.medias.createActivationHandler,
      createHomeEndNavigation: HandlerManager.general.createHomeEndNavigation,
    },
    clickOutsideHandler: {
      create: HandlerManager.dropdown.createOutsideClick,
    },
    eventManager: events,
    createDropdownController,
    setupMediaCardAccessibility: HandlerManager.medias.setupCardAccessibility,
  };
}

export { createAccessibilityManager };
