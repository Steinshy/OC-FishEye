import { sortDropdownElements } from '../../constants.js';

import { mediaSorter } from './medias/utils/sorter.js';

const eventHandlers = {
  keyboard: {
    Escape: () => dropdownController.close(),
  },

  click: {
    outside: target => {
      const isOutside = !sortDropdownElements.options?.contains(target) && target !== sortDropdownElements.button;
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
  toggle(isOpen) {
    if (!sortDropdownElements.options || !sortDropdownElements.button) return;

    sortDropdownElements.options.classList.toggle('show', isOpen);
    sortDropdownElements.options.hidden = !isOpen;
    sortDropdownElements.options.setAttribute('aria-hidden', !isOpen);
    sortDropdownElements.button.setAttribute('aria-expanded', isOpen);
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
    const options = Object.values(sortDropdownElements).filter(element => element?.matches?.("li[role='option']"));
    options.forEach(option => option?.setAttribute('aria-selected', option === target));
  },

  handleButtonClick(e) {
    eventHandlers.click.button(e);
  },

  handleOptionSelection(e) {
    if (!e.target?.matches("li[role='option']")) return;
    const { button } = sortDropdownElements;
    const userSelected = (button.textContent = e.target.textContent.trim());

    this.updateAriaSelected(e.target);

    if (mediaSorter?.handleSortSelection && mediaSorter.getCurrentMedia().length > 0) {
      const folderName = mediaSorter.getCurrentPhotographerFolder?.() || 'default';
      mediaSorter.handleSortSelection(userSelected, mediaSorter.getCurrentMedia(), folderName);
    }

    this.close();
  },
};

export const dropdownListeners = () => {
  if (!sortDropdownElements.button || !sortDropdownElements.options) return;
  const { button, options } = sortDropdownElements;

  button.addEventListener('click', dropdownController.handleButtonClick.bind(dropdownController));
  options.addEventListener('click', dropdownController.handleOptionSelection.bind(dropdownController));
  document.addEventListener('keydown', dropdownController.handleGlobalKeydown.bind(dropdownController));
  document.addEventListener('click', dropdownController.handleGlobalClick.bind(dropdownController));
};
