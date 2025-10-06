import { sortButtonConfig } from '../../constants.js';
import { accessibilityManager } from '../../utils/accessibility.js';
import { updateMediasOrder } from '../../utils/helpers/managers/mediasManager.js';
import { sortMedias } from '../../utils/helpers/managers/sorterManager.js';

const { elements, attributes } = sortButtonConfig;
const getButton = () => elements.button;
const getOptionsContainer = () => elements.sortOptions;
const getSortOptions = () => {
  const container = getOptionsContainer();
  return container ? Array.from(container.querySelectorAll(`[${attributes.role}='${attributes.option}']`)) : [];
};

const sortButtonState = {
  get currentSelection() {
    return getButton()?.textContent?.trim() || '';
  },

  get selectedOption() {
    return getSortOptions().find(option => option?.textContent?.trim() === sortButtonState.currentSelection);
  },

  get userSelected() {
    return sortButtonState.selectedOption?.textContent?.trim() || 'Popularité';
  },
};

const triggerMediaSorting = (medias, userSelected) => {
  if (!Array.isArray(medias) || medias.length === 0) {
    return;
  }
  const result = sortMedias(medias, userSelected);
  return result;
};

export const sortButton = {
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

    button.disabled = false;
    button.removeAttribute('aria-disabled');
    button.setAttribute('tabindex', '0');

    const accessibility = accessibilityManager();
    this.controller = accessibility.dropdownController({
      button,
      optionsContainer,
      options,
      onSelect: option => this.selectSortOption(option),
      orientation: 'vertical',
    });

    this.setupVisualState();

    const sorted = triggerMediaSorting(medias, sortButtonState.userSelected);
    return sorted;
  },

  selectSortOption(option) {
    const userSelected = option.textContent.trim();
    const button = getButton();

    if (button) button.textContent = userSelected;
    const { ariaManager } = accessibilityManager();
    ariaManager.setSelected(getSortOptions(), option);
    const sortedMedias = triggerMediaSorting(this.medias, userSelected);
    updateMediasOrder(sortedMedias);

    return sortedMedias;
  },

  setupVisualState() {
    const optionsContainer = getOptionsContainer();
    const button = getButton();
    const { ariaManager } = accessibilityManager();
    ariaManager.setExpanded(button, false);
    ariaManager.setHidden(optionsContainer, true);
    ariaManager.setSelected(getSortOptions(), sortButtonState.selectedOption);
    if (optionsContainer) {
      optionsContainer.classList.remove('show');
    }
  },

  destroy() {
    if (this.controller) {
      this.controller.destroy();
      this.controller = null;
    }
  },
};
