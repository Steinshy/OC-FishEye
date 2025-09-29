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
    if (!elements.length) return () => {};

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

  createOutsideClick(container, trigger, onOutsideClick) {
    return e => {
      // Early return if no container
      if (!container) {
        if (e.target !== trigger) onOutsideClick(e);
        return;
      }

      // Check if target is outside container and not the trigger
      const isOutside = !container.contains(e.target) && e.target !== trigger;
      if (isOutside) onOutsideClick(e);
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

  updateVisualState(optionsContainer, isOpen) {
    if (!optionsContainer) return;
    optionsContainer.classList.toggle('show', isOpen);
    optionsContainer.classList.toggle('hidden', !isOpen);
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
      eyeIcon.addEventListener(
        'keydown',
        handlers.createActivationHandler(() => onMediaClick(media))
      );
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
  },

  setupDropdownEventListeners({ button, optionsContainer, options, controller, orientation }) {
    const arrowHandler = handlers.createArrowNavigation({
      elements: options,
      orientation,
      onNavigate: nextElement => (controller.currentIndex = options.findIndex(option => option === nextElement)),
      onActivate: element => controller.select(element),
    });

    const escapeHandler = handlers.createEscapeHandler(() => controller.close());
    const outsideClickHandler = handlers.createOutsideClick(optionsContainer, button, () => controller.close());

    if (button) {
      EventManager.add(
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
      EventManager.add(
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

    EventManager.add(optionsContainer, 'keydown', arrowHandler, 'dropdown-keyboard');
    EventManager.add(document, 'keydown', escapeHandler, 'dropdown-escape');
    EventManager.add(document, 'click', outsideClickHandler, 'dropdown-outside');
  },
};

export const EventManager = {
  listeners: new Map(),

  add(element, event, handler, key, options = {}) {
    this.remove(key);
    element.addEventListener(event, handler, options);
    this.listeners.set(key, { element, event, handler, options });
  },

  remove(key) {
    if (!key) return; // Don't remove all listeners if no key provided
    const listener = this.listeners.get(key);
    if (listener) {
      listener.element.removeEventListener(listener.event, listener.handler, listener.options);
      this.listeners.delete(key);
    }
  },
};

function createDropdownController({ button, optionsContainer, options, onSelect, onClose, orientation = 'vertical' }) {
  const controller = {
    isOpen: false,
    currentIndex: 0,

    open() {
      this.isOpen = true;
      aria.setExpanded(button, true);
      aria.setHidden(optionsContainer, false);
      handlers.updateVisualState(optionsContainer, true);
      const firstFocusable = options.find(option => !option.hasAttribute('disabled')) || focus.focusFirst(optionsContainer);
      firstFocusable?.focus();
    },

    close() {
      this.isOpen = false;
      aria.setExpanded(button, false);
      aria.setHidden(optionsContainer, true);
      handlers.updateVisualState(optionsContainer, false);
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
      // Remove specific dropdown listeners
      EventManager.remove('dropdown-button');
      EventManager.remove('dropdown-keyboard');
      EventManager.remove('dropdown-escape');
      EventManager.remove('dropdown-outside');
      // Remove option listeners
      for (let i = 0; i < options.length; i++) {
        EventManager.remove(`dropdown-option-${i}`);
      }
    },
  };

  handlers.setupDropdownEventListeners({ button, optionsContainer, options, controller, orientation });
  return controller;
}

function createAccessibilityManager() {
  return {
    focusManager: focus,
    ariaManager: aria,
    keyboardHandler: {
      createArrowNavigation: handlers.createArrowNavigation,
      createEscapeHandler: handlers.createEscapeHandler,
      createActivationHandler: handlers.createActivationHandler,
      createHomeEndNavigation: handlers.createHomeEndNavigation,
    },
    clickOutsideHandler: { create: handlers.createOutsideClick },
    eventManager: EventManager,
    createDropdownController,
    setupMediaCardAccessibility: handlers.setupCardAccessibility,
  };
}

// Lightbox Event Management
export const setupLightboxEventListeners = (lightboxModal, callbacks) => {
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
    [lightboxModal, 'touchstart', handleTouchStart, 'lightbox-touchstart', { passive: true }],
    [lightboxModal, 'touchend', handleTouchEnd, 'lightbox-touchend', { passive: true }],
    [lightboxModal, 'wheel', handleWheel, 'lightbox-wheel', { passive: false }],
    [document, 'click', handlers.createOutsideClick(lightboxModal, null, close), 'lightbox-outside', {}],
    [lightboxModal, 'focusin', handleFocusIn, 'lightbox-focus', {}],
  ];

  events.forEach(([element, event, handler, key, options]) => {
    EventManager.add(element, event, handler, key, options);
  });
};

export const cleanupLightboxEventListeners = () => {
  const keys = [
    'lightbox-prev',
    'lightbox-next',
    'lightbox-close',
    'lightbox-keyboard',
    'lightbox-touchstart',
    'lightbox-touchend',
    'lightbox-wheel',
    'lightbox-outside',
    'lightbox-focus',
  ];
  keys.forEach(key => EventManager.remove(key));
};

export { createAccessibilityManager };
