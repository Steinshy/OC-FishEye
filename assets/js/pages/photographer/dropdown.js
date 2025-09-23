import { dropdownConfig, getSortOptionsElements, getFilterOptionsElements, mediaStore } from '../../constants.js';
import { mediaSorter } from './medias/sorter.js';

const sortOptionsElements = getSortOptionsElements();
const { button: sortDropdownButton, sortOptions: sortDropdownMenu } = sortOptionsElements;
const optionElements = getFilterOptionsElements();
const { attributes, events, keys } = dropdownConfig;

// To do: Move Accessibility code to a separate file - HOC approach
const dropdownState = {
  get currentSelection() {
    return sortDropdownButton?.textContent?.trim() || '';
  },

  get selectedOption() {
    return optionElements.find(option => option?.textContent?.trim() === this.currentSelection);
  },

  get currentIndex() {
    return optionElements.findIndex(option => option === document.activeElement) || 0;
  },

  get nextIndex() {
    return (this.currentIndex + 1) % optionElements.length || 0;
  },

  get previousIndex() {
    return this.currentIndex <= 0 ? optionElements.length - 1 : this.currentIndex - 1 || 0;
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
      const isOutside = !sortDropdownMenu?.contains(target) && target !== sortDropdownButton;
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
  const attributeUpdates = [
    { element: sortDropdownMenu, class: attributes.show, value: isOpen },
    { element: sortDropdownMenu, property: attributes.hidden, value: !isOpen },
    { element: sortDropdownMenu, attribute: attributes.ariaHidden, value: !isOpen },
    { element: sortDropdownButton, attribute: attributes.ariaExpanded, value: isOpen },
  ];

  attributeUpdates.forEach(({ element, class: className, property, attribute, value }) => {
    if (className) element.classList.toggle(className, value);
    if (property) element[property] = value;
    if (attribute) element.setAttribute(attribute, value);
  });
};

const triggerMediaSorting = userSelected => {
  if (!Array.isArray(mediaStore.medias) || mediaStore.medias.length === 0) return;
  mediaSorter.sortAndRender(mediaStore.medias, userSelected, mediaStore.mediaPath);
};

const focusCurrentSelection = () => {
  dropdownState.selectedOption?.focus();
  sortDropdownController.updateSelectedOptionAria(dropdownState.selectedOption);
};

const sortDropdownController = {
  navigateToOption(direction) {
    const targetIndex = direction === 'next' ? dropdownState.nextIndex : dropdownState.previousIndex;
    optionElements[targetIndex]?.focus();
  },

  focusNextSortOption() {
    this.navigateToOption('next');
  },

  focusPreviousSortOption() {
    this.navigateToOption('prev');
  },

  selectSortOption(option) {
    const userSelected = option.textContent.trim();
    sortDropdownButton.textContent = userSelected;
    this.updateSelectedOptionAria(option);
    triggerMediaSorting(userSelected);
    this.close();
  },

  handleSortOptionClick: e => {
    if (!e.target?.matches(`li[${attributes.role}='${attributes.option}']`)) return;
    sortDropdownController.selectSortOption(e.target);
  },

  toggleDropdownVisibility(isOpen) {
    if (!sortDropdownMenu || !sortDropdownButton) return;

    updateDropdownState(isOpen);
    isOpen ? setTimeout(focusCurrentSelection, 0) : sortDropdownButton.focus();
  },
  close() {
    this.toggleDropdownVisibility(false);
  },

  updateSelectedOptionAria(target) {
    optionElements.forEach(option => option?.setAttribute(attributes.ariaSelected, option === target));
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
      [events.click, sortDropdownButton, sortDropdownController.handleDropdownToggle],
      [events.click, sortDropdownMenu, sortDropdownController.handleSortOptionClick],
      [events.click, null, sortDropdownController.handleOutsideClick],
      [events.keydown, null, sortDropdownController.handleKeyboardNavigation],
    ];

    listeners.forEach(([event, element, handler]) => {
      (element || document).removeEventListener(event, handler);
    });
  },
};

export const dropdownListeners = () => {
  if (!sortDropdownButton || !sortDropdownMenu) return;

  sortDropdownButton.addEventListener(events.click, sortDropdownController.handleDropdownToggle);
  sortDropdownMenu.addEventListener(events.click, sortDropdownController.handleSortOptionClick);
  document.addEventListener(events.keydown, sortDropdownController.handleKeyboardNavigation);
  document.addEventListener(events.click, sortDropdownController.handleOutsideClick);
};
