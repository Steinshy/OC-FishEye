import { getSortButtonElements } from '../../constants.js';
import { accessibilityManager } from '../../utils/accessibility.js';
import { updateMediasOrder } from '../../utils/helpers/managers/mediasManager.js';
import { sortMedias } from '../../utils/helpers/managers/sorterManager.js';

const { button, sortOptions, optionsContainer } = getSortButtonElements();
export const sortButton = {
  medias: null,
  button: null,
  sortOptions: null,
  optionsContainer: null,
  controller: null,

  init(medias) {
    if (!medias || medias.length === 0) {
      return [];
    }

    if (!button || !optionsContainer || !sortOptions.length) {
      return sortMedias(medias, 'Popularité');
    }

    this.medias = medias;
    this.button = button;
    this.sortOptions = Array.from(sortOptions);
    this.optionsContainer = optionsContainer;

    button.disabled = false;
    button.removeAttribute('aria-disabled');
    button.setAttribute('tabindex', '0');

    const accessibility = accessibilityManager();
    this.controller = accessibility.dropdownController({
      button,
      optionsContainer,
      options: this.sortOptions,
      onSelect: option => this.selectSortOption(option),
      orientation: 'vertical',
    });

    this.setupVisualState();
    const currentSelection = button?.textContent?.trim() || '';
    const selectedOption = this.sortOptions.find(option => option?.textContent?.trim() === currentSelection);
    const userSelected = selectedOption?.textContent?.trim() || 'Popularité';

    return sortMedias(medias, userSelected);
  },

  selectSortOption(option) {
    const userSelected = option.textContent.trim();

    if (this.button) {
      this.button.textContent = userSelected;
    }

    const { ariaManager } = accessibilityManager();
    ariaManager.setSelected(this.sortOptions, option);

    const sortedMedias = sortMedias(this.medias, userSelected);
    updateMediasOrder(sortedMedias);

    return sortedMedias;
  },

  setupVisualState() {
    const { ariaManager } = accessibilityManager();
    const currentSelection = this.button?.textContent?.trim() || '';
    const selectedOption = this.sortOptions.find(option => option?.textContent?.trim() === currentSelection);

    ariaManager.setExpanded(this.button, false);
    ariaManager.setHidden(this.optionsContainer, true);
    ariaManager.setSelected(this.sortOptions, selectedOption);

    if (this.optionsContainer) {
      this.optionsContainer.classList.remove('show');
    }
  },

  destroy() {
    if (this.controller) {
      this.controller.destroy();
      this.controller = null;
    }
  },
};
