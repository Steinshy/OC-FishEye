import { dropdownConfig } from '../../constants.js';

import { createMediasCards } from './medias/mediasManager.js';
import { sortMedias } from './medias/sorterManager.js';

const { elements, attributes, events, keys } = dropdownConfig;
const getButton = () => elements.button;
const getOptionsContainer = () => elements.sortOptions;
const getSortOptions = () => {
  const container = getOptionsContainer();
  return container ? Array.from(container.querySelectorAll(`[${attributes.role}='${attributes.option}']`)) : [];
};

// To do: Move Accessibility code to a separate file - HOC approach
const dropdownState = {
  get currentSelection() {
    return getButton()?.textContent?.trim() || '';
  },

  get selectedOption() {
    return getSortOptions().find(option => option?.textContent?.trim() === this.currentSelection);
  },

  get currentIndex() {
    return getSortOptions().findIndex(option => option === document.activeElement) || 0;
  },

  get nextIndex() {
    const options = getSortOptions();
    return (this.currentIndex + 1) % options.length || 0;
  },

  get previousIndex() {
    const options = getSortOptions();
    return this.currentIndex <= 0 ? options.length - 1 : this.currentIndex - 1 || 0;
  },

  get userSelected() {
    return this.selectedOption?.textContent?.trim() || 'Popularité';
  },
};

const keyboardEventHandlers = {
  keyboard: {
    [keys.escape]: () => sortDropdownController.close(),
    [keys.arrowDown]: e => handleNavigationKey(e, 'next'),
    [keys.arrowUp]: e => handleNavigationKey(e, 'prev'),
    [keys.enter]: e => handleOptionActivation(e),
  },
  click: {
    outside: target => {
      const button = getButton();
      const sortOptions = getOptionsContainer();
      const isOutside = sortOptions ? !sortOptions.contains(target) && target !== button : target !== button;
      if (isOutside) sortDropdownController.close();
    },
    button: e => {
      e.stopPropagation();
      const isOpen = e.currentTarget.getAttribute(attributes.ariaExpanded) === 'true';
      sortDropdownController.toggleDropdownVisibility(!isOpen);
    },
  },
};

const handleNavigationKey = (e, direction) => {
  e.preventDefault();
  e.stopPropagation();
  sortDropdownController.navigateToOption(direction);
};

const handleOptionActivation = e => {
  if (e.target.getAttribute(attributes.role) === attributes.option) {
    e.preventDefault();
    e.stopPropagation();
    sortDropdownController.selectSortOption(e.target);
  }
};

const updateDropdownState = isOpen => {
  const button = getButton();
  const sortOptionsContainer = getOptionsContainer();
  const attributeUpdates = [
    { element: sortOptionsContainer, class: attributes.show, value: isOpen },
    { element: sortOptionsContainer, property: attributes.hidden, value: !isOpen },
    { element: sortOptionsContainer, attribute: attributes.ariaHidden, value: !isOpen },
    { element: button, attribute: attributes.ariaExpanded, value: isOpen },
  ];

  attributeUpdates.forEach(({ element, class: className, property, attribute, value }) => {
    if (className) element.classList.toggle(className, value);
    if (property) element[property] = value;
    if (attribute) element.setAttribute(attribute, value);
  });
};

const triggerMediaSorting = (medias, userSelected) => {
  if (!Array.isArray(medias) || medias.length === 0) return;
  return sortMedias(medias, userSelected);
};

const focusCurrentSelection = () => {
  const button = getButton();
  dropdownState.selectedOption?.focus();
  if (button) sortDropdownController.updateSelectedOptionAria(dropdownState.selectedOption);
};

const sortDropdownController = {
  navigateToOption(direction) {
    const options = getSortOptions();
    const targetIndex = direction === 'next' ? dropdownState.nextIndex : dropdownState.previousIndex;
    options[targetIndex]?.focus();
  },

  focusNextSortOption() {
    this.navigateToOption('next');
  },

  focusPreviousSortOption() {
    this.navigateToOption('prev');
  },

  selectSortOption(option, medias) {
    const userSelected = option.textContent.trim();
    const button = getButton();
    if (button) button.textContent = userSelected;
    this.updateSelectedOptionAria(option);
    const sortedMedias = triggerMediaSorting(medias, userSelected);
    const mainMedia = document.getElementById('main-medias');
    if (mainMedia && Array.isArray(sortedMedias)) {
      mainMedia.innerHTML = '';
      mainMedia.appendChild(createMediasCards(sortedMedias));
    }

    this.close();
    return sortedMedias;
  },

  toggleDropdownVisibility(isOpen) {
    const button = getButton();
    if (!getOptionsContainer() || !button) return;

    updateDropdownState(isOpen);
    isOpen ? setTimeout(focusCurrentSelection, 0) : button.focus();
  },
  close() {
    this.toggleDropdownVisibility(false);
  },

  updateSelectedOptionAria(target) {
    getSortOptions().forEach(option => option?.setAttribute(attributes.ariaSelected, option === target));
  },

  handleKeyboardNavigation(e) {
    keyboardEventHandlers.keyboard[e.key]?.(e);
  },

  handleOutsideClick(e) {
    keyboardEventHandlers.click.outside(e.target);
  },

  handleDropdownToggle(e) {
    keyboardEventHandlers.click.button(e);
  },

  removeEventListeners() {
    const listeners = [
      [events.click, getButton(), sortDropdownController.handleDropdownToggle],
      [events.click, null, sortDropdownController.handleOutsideClick],
      [events.keydown, null, sortDropdownController.handleKeyboardNavigation],
    ];

    listeners.forEach(([event, element, handler]) => {
      (element || document).removeEventListener(event, handler);
    });
  },
};

export const dropdownListeners = medias => {
  const button = getButton();
  const sortOptions = getOptionsContainer();
  if (!button || !sortOptions) return triggerMediaSorting(medias, 'Popularité');

  const initialSortedMedias = triggerMediaSorting(medias, dropdownState.userSelected);

  const handleSortOptionClick = e => {
    const option = e.target.closest(`li[${attributes.role}='${attributes.option}']`);
    if (!option) return;
    const sortedMedias = sortDropdownController.selectSortOption(option, medias);
    return sortedMedias;
  };

  button.addEventListener(events.click, sortDropdownController.handleDropdownToggle);
  sortOptions.addEventListener(events.click, handleSortOptionClick);
  document.addEventListener(events.keydown, sortDropdownController.handleKeyboardNavigation);
  document.addEventListener(events.click, sortDropdownController.handleOutsideClick);

  return initialSortedMedias;
};
