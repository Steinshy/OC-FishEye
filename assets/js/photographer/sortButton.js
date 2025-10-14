import { getSortButtonElements } from '../constants.js';
import { sortMedias } from '../helpers/sorterMedias.js';
import { aria } from '../utils/accessibility/aria.js';
import { updateMediasOrder } from '../utils/managers/mediaCardsManager.js';
import { createSorterButton } from '../utils/managers/sorterButtonManager.js';

const { button, sortOptions, optionsContainer } = getSortButtonElements();

let medias = null;
let dropdown = null;

export const initSortButton = photographerMedias => {
  if (!photographerMedias?.length) return [];
  if (!button || !optionsContainer || !sortOptions.length) return sortMedias(photographerMedias, 'Popularité');

  medias = photographerMedias;

  // Enable the sort button
  aria.setDisabled(button, false);
  aria.setTabindex(button, 0);

  dropdown = createSorterButton({
    button,
    optionsContainer,
    options: Array.from(sortOptions),
    onSelect: option => {
      button.textContent = option.textContent.trim();
      const sortedMedias = sortMedias(medias, option.textContent.trim());
      updateMediasOrder(sortedMedias);
    },
  });

  const currentSelection = button.textContent.trim() || 'Popularité';
  return sortMedias(photographerMedias, currentSelection);
};

export const destroySortButton = () => {
  dropdown?.destroy();
  dropdown = null;
};
