// Media sort button initialization and control

import { getSortButtonElements } from '../config.js';
import { sortMedias } from '../helpers/sorterMedias.js';
import { aria } from '../utils/accessibility/aria.js';
import { updateMediasOrder } from '../utils/managers/mediaCards.js';
import { createSorterButton } from '../utils/managers/sorterButton.js';

// Store medias and dropdown instance
let medias = null;
let dropdown = null;

// Initialize media sort dropdown button
export const initSortButton = photographerMedias => {
  if (!photographerMedias?.length) return [];

  const { button, sortOptions, optionsContainer } = getSortButtonElements();
  if (!button || !optionsContainer || !sortOptions.length) return sortMedias(photographerMedias, 'Popularité');

  medias = photographerMedias;
  aria.setDisabled(button, false);
  aria.setTabindex(button, 0);

  dropdown = createSorterButton({
    button,
    optionsContainer,
    options: Array.from(sortOptions),
    onSelect: option => {
      button.textContent = option.textContent.trim();
      updateMediasOrder(sortMedias(medias, option.textContent.trim()));
    },
  });

  return sortMedias(photographerMedias, button.textContent.trim() || 'Popularité');
};

// Clean up sort button event listeners
export const destroySortButton = () => {
  dropdown?.destroy();
  dropdown = null;
};
