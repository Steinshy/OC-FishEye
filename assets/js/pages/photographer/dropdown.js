import { sortDropdownElements } from '../../constants.js';

import { mediaSorter } from './medias/utils/sorter.js';

const { options: dropdownOptions, button: dropdownButton } = sortDropdownElements;

const eventHandlers = {
  keyboard: {
    Escape: () => dropdownController.close(),
  },

  click: {
    outside: target => {
      const isOutside = !dropdownOptions?.contains(target) && target !== dropdownButton;
      if (isOutside) dropdownController.close();
    },

    button: e => {
      e.stopPropagation();
      const isOpen = e.currentTarget.getAttribute('aria-expanded') === 'true';
      dropdownController.toggle(!isOpen);
    },
  },
};

const dropdownController = {
  // Store event handlers for proper cleanup
  eventHandlers: {
    buttonClick: null,
    optionSelection: null,
    globalKeydown: null,
    globalClick: null
  },

  toggle(isOpen) {
    if (!dropdownOptions || !dropdownButton) return;

    const attributes = [
      { element: dropdownOptions, class: 'show', value: isOpen },
      { element: dropdownOptions, property: 'hidden', value: !isOpen },
      { element: dropdownOptions, attribute: 'aria-hidden', value: !isOpen },
      { element: dropdownButton, attribute: 'aria-expanded', value: isOpen }
    ];

    attributes.forEach(({ element, class: className, property, attribute, value }) => {
      if (className) element.classList.toggle(className, value);
      if (property) element[property] = value;
      if (attribute) element.setAttribute(attribute, value);
    });
  },

  close() {
    this.toggle(false);
  },

  handleGlobalKeydown(e) {
    const handler = eventHandlers.keyboard[e.key];
    if (handler) handler();
  },

  handleGlobalClick(e) {
    eventHandlers.click.outside(e.target);
  },

  updateAriaSelected(target) {
    const optionElements = Object.values(sortDropdownElements)
      .filter(element => element?.matches?.("li[role='option']"));

    optionElements.forEach(option =>
      option?.setAttribute('aria-selected', option === target)
    );
  },

  handleButtonClick(e) {
    eventHandlers.click.button(e);
  },

  handleOptionSelection(e) {
    if (!e.target?.matches("li[role='option']")) return;
    const userSelected = e.target.textContent.trim();
    dropdownButton.textContent = userSelected;

    this.updateAriaSelected(e.target);

    const shouldSort = mediaSorter?.handleSortSelection &&
                      mediaSorter.getCurrentMedia().length > 0;

    if (shouldSort) {
      const folderName = mediaSorter.getCurrentPhotographerFolder?.() || 'default';
      const media_path = `assets/photographers/${folderName}`;
      console.log('Sorting by:', userSelected, 'with path:', media_path);
      mediaSorter.handleSortSelection(userSelected, mediaSorter.getCurrentMedia(), media_path);
    }

    this.close();
  },

  cleanup() {
    const { eventHandlers } = this;

    // Remove element listeners
    const elementListeners = [
      { element: dropdownButton, event: 'click', handler: eventHandlers.buttonClick },
      { element: dropdownOptions, event: 'click', handler: eventHandlers.optionSelection }
    ];

    // Remove document listeners
    const documentListeners = [
      { event: 'keydown', handler: eventHandlers.globalKeydown },
      { event: 'click', handler: eventHandlers.globalClick }
    ];

    // Remove all listeners
    elementListeners.forEach(({ element, event, handler }) => {
      if (element && handler) {
        element.removeEventListener(event, handler);
      }
    });

    documentListeners.forEach(({ event, handler }) => {
      if (handler) {
        document.removeEventListener(event, handler);
      }
    });
  },
};

export const dropdownListeners = () => {
  if (!dropdownButton || !dropdownOptions) return;
  const { eventHandlers } = dropdownController;

  // Create and store event handlers
  const handlers = {
    buttonClick: (e) => dropdownController.handleButtonClick(e),
    optionSelection: (e) => dropdownController.handleOptionSelection(e),
    globalKeydown: (e) => dropdownController.handleGlobalKeydown(e),
    globalClick: (e) => dropdownController.handleGlobalClick(e)
  };

  // Store handlers for cleanup
  Object.assign(eventHandlers, handlers);

  // Add event listeners
  dropdownButton.addEventListener('click', handlers.buttonClick);
  dropdownOptions.addEventListener('click', handlers.optionSelection);
  document.addEventListener('keydown', handlers.globalKeydown);
  document.addEventListener('click', handlers.globalClick);
};

// Export cleanup function
export const cleanupDropdownListeners = () => dropdownController.cleanup();
