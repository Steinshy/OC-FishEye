import { createAccessibilityManager } from '../../accessibilityManagement.js';
import { dropdownConfig } from '../../constants.js';

import { createMediasCards } from './medias/mediasManager.js';
import { sortMedias } from './medias/sorterManager.js';

const { elements, attributes } = dropdownConfig;
const getButton = () => elements.button;
const getOptionsContainer = () => elements.sortOptions;
const getSortOptions = () => {
  const container = getOptionsContainer();
  return container ? Array.from(container.querySelectorAll(`[${attributes.role}='${attributes.option}']`)) : [];
};

// Create accessibility manager for dropdown
const accessibilityManager = createAccessibilityManager();

// Simplified dropdown state management
const dropdownState = {
  get currentSelection() {
    return getButton()?.textContent?.trim() || '';
  },

  get selectedOption() {
    return getSortOptions().find(option => option?.textContent?.trim() === this.currentSelection);
  },

  get userSelected() {
    return this.selectedOption?.textContent?.trim() || 'Popularité';
  },
};

const triggerMediaSorting = (medias, userSelected) => {
  if (!Array.isArray(medias) || medias.length === 0) {
    return;
  }
  const result = sortMedias(medias, userSelected);
  return result;
};

// Simplified dropdown controller using accessibility manager
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

    // Create dropdown controller using accessibility manager
    this.controller = accessibilityManager.createDropdownController({
      button,
      optionsContainer,
      options,
      onSelect: option => this.selectSortOption(option),
      onClose: () => this.onClose(),
      orientation: 'vertical',
    });

    // Set up additional visual state management
    this.setupVisualState();

    // Accessibility manager handles click events

    return triggerMediaSorting(medias, dropdownState.userSelected);
  },

  selectSortOption(option) {
    const userSelected = option.textContent.trim();

    const button = getButton();
    if (button) button.textContent = userSelected;

    // Update ARIA selected state
    accessibilityManager.ariaManager.setSelected(getSortOptions(), option);

    const sortedMedias = triggerMediaSorting(this.medias, userSelected);

    this.updateMediaDisplay(sortedMedias);

    return sortedMedias;
  },

  onClose() {
    // Additional cleanup if needed
  },

  setupVisualState() {
    const optionsContainer = getOptionsContainer();
    const button = getButton();

    // Set initial ARIA states
    accessibilityManager.ariaManager.setExpanded(button, false);
    accessibilityManager.ariaManager.setHidden(optionsContainer, true);
    accessibilityManager.ariaManager.setSelected(getSortOptions(), dropdownState.selectedOption);

    // Also set CSS classes for visual state
    if (optionsContainer) {
      optionsContainer.classList.remove('show');
      optionsContainer.classList.add('hidden');
    }
  },

  updateMediaDisplay(sortedMedias) {
    const mainMedia = document.getElementById('main-medias');

    if (mainMedia && Array.isArray(sortedMedias)) {
      mainMedia.innerHTML = '';
      const newCards = createMediasCards(sortedMedias);
      mainMedia.appendChild(newCards);
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
