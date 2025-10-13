import { getPageElements } from '../../constants.js';
import { setupModalEventListeners } from '../../utils/helpers/events/modalEventListeners.js';
import { getUrlParam } from '../../utils/helpers/helper.js';
import { getPhotographer, getPhotographerMedias } from '../../utils/helpers/managers/dataManager.js';
import { generateMediasCards } from '../../utils/helpers/managers/mediasManager.js';
import { initializeStats } from '../../utils/helpers/managers/statsManager.js';
import { scrollToTop } from '../../utils/scrollToTop.js';

import { generatePhotographerHeader } from './generate/generatePhotographerHeader.js';
import { initializeLightbox } from './lightbox.js';
import { sortButton } from './sortButton.js';

// Move this part to helper later
export const photographerPage = async () => {
  const { main, mainMedias } = getPageElements();
  const urlId = getUrlParam('id', true);
  const [photographer, photographerMedias] = await Promise.all([getPhotographer(urlId), getPhotographerMedias(urlId)]);
  if (!photographer || !Array.isArray(photographerMedias)) return;

  const header = generatePhotographerHeader(photographer);
  if (header) main.prepend(header);
  initializeLightbox();
  setTimeout(() => {
    if (photographer?.name) setupModalEventListeners(photographer.name);
  }, 0);

  scrollToTop.init();
  initializeStats(photographerMedias, photographer.price || 0);

  const sorted = sortButton.init(photographerMedias);
  if (mainMedias && Array.isArray(sorted)) generateMediasCards(mainMedias, sorted);
};
