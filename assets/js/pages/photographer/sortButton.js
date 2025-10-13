import { getSortButtonElements } from '../../constants.js';
import { aria } from '../../utils/accessibility/aria.js';
import { updateMediasOrder } from '../../utils/helpers/managers/mediasManager.js';
import { createSorterButton } from '../../utils/helpers/managers/sorterButtonManager.js';
import { sortMedias } from '../../utils/helpers/sorterMedias.js';

const { button, sortOptions, optionsContainer } = getSortButtonElements();

export const sortButton = {
  medias: null,
  dropdown: null,

  init(medias) {
    if (!medias?.length) return [];
    if (!button || !optionsContainer || !sortOptions.length) return sortMedias(medias, 'Popularité');

    this.medias = medias;

    // Enable the sort button
    aria.setDisabled(button, false);
    aria.setTabindex(button, 0);

    this.dropdown = createSorterButton({
      button,
      optionsContainer,
      options: Array.from(sortOptions),
      onSelect: option => {
        button.textContent = option.textContent.trim();
        const sortedMedias = sortMedias(this.medias, option.textContent.trim());
        updateMediasOrder(sortedMedias);
      },
    });

    const currentSelection = button.textContent.trim() || 'Popularité';
    return sortMedias(medias, currentSelection);
  },

  destroy() {
    this.dropdown?.destroy();
    this.dropdown = null;
  },
};
