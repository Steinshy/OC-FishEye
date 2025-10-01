import { dropdownConfig } from '../../constants.js';
import { accessibilityManager } from '../../utils/accessibility.js';

import { updateMediasOrder } from './medias/mediasManager.js';
import { sortMedias } from './medias/sorterManager.js';

const { elements, attributes } = dropdownConfig;
const getButton = () => elements.button;
const getOptionsContainer = () => elements.sortOptions;
const getSortOptions = () => {
  const container = getOptionsContainer();
  return container ? Array.from(container.querySelectorAll(`[${attributes.role}='${attributes.option}']`)) : [];
};

const accessibility = accessibilityManager();

const dropdownState = {
  get currentSelection() {
    return getButton()?.textContent?.trim() || '';
  },

  get selectedOption() {
    return getSortOptions().find(option => option?.textContent?.trim() === dropdownState.currentSelection);
  },

  get userSelected() {
    return dropdownState.selectedOption?.textContent?.trim() || 'Popularité';
  },
};

const triggerMediaSorting = (medias, userSelected) => {
  if (!Array.isArray(medias) || medias.length === 0) {
    return;
  }
  const result = sortMedias(medias, userSelected);
  return result;
};

const sortDropdownController = {
  controller: null,
  medias: null,

  init(medias) {
    this.medias = medias;
    const button = getButton();
    const optionsContainer = getOptionsContainer();
    const options = getSortOptions();

    if (!button || !optionsContainer || !options.length) {
      return triggerMediaSorting(medias, 'Popularité');
    }

    // Enable the dropdown button
    button.disabled = false;
    button.removeAttribute('aria-disabled');

    this.controller = accessibility.dropdownController({
      button,
      optionsContainer,
      options,
      onSelect: option => this.selectSortOption(option),
      orientation: 'vertical',
    });

    this.setupVisualState();

    const sorted = triggerMediaSorting(medias, dropdownState.userSelected);
    window.currentPhotographerMedias = sorted;
    return sorted;
  },

  selectSortOption(option) {
    const userSelected = option.textContent.trim();
    const button = getButton();

    if (button) button.textContent = userSelected;
    accessibility.ariaManager.setSelected(getSortOptions(), option);
    const sortedMedias = triggerMediaSorting(this.medias, userSelected);
    window.currentPhotographerMedias = sortedMedias;
    updateMediasOrder(sortedMedias);

    return sortedMedias;
  },

  setupVisualState() {
    const optionsContainer = getOptionsContainer();
    const button = getButton();
    accessibility.ariaManager.setExpanded(button, false);
    accessibility.ariaManager.setHidden(optionsContainer, true);
    accessibility.ariaManager.setSelected(getSortOptions(), dropdownState.selectedOption);
    if (optionsContainer) {
      optionsContainer.classList.remove('show');
      optionsContainer.classList.add('hidden');
    }
  },

  destroy() {
    if (this.controller) {
      this.controller.destroy();
      this.controller = null;
    }
  },
};

export const dropdownListeners = medias => {
  return sortDropdownController.init(medias);
};
