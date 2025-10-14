import { getPageElements } from '../../constants.js';
import { setupModalEventListeners } from '../../utils/helpers/events/modalEventListeners.js';
import { getUrlParam } from '../../utils/helpers/helper.js';
import { getPhotographer, getPhotographerMedias } from '../../utils/helpers/managers/dataManager.js';
import { hideLoadingScreen } from '../../utils/helpers/managers/loadingManager.js';
import { generateMediasCards } from '../../utils/helpers/managers/mediasManager.js';
import { initializeStats } from '../../utils/helpers/managers/statsManager.js';
import { initScrollToTop } from '../../utils/scrollToTop.js';

import { generatePhotographerHeader } from './generate/generatePhotographerHeader.js';
import { initializeLightbox } from './lightbox.js';
import { initSortButton } from './sortButton.js';

export const photographerPage = async () => {
  const { main } = getPageElements();
  const urlId = getUrlParam('id', true);
  const [photographer, photographerMedias] = await Promise.all([getPhotographer(urlId), getPhotographerMedias(urlId)]);
  if (!photographer || !Array.isArray(photographerMedias)) return;

  const header = generatePhotographerHeader(photographer);
  if (header) main.prepend(header);

  initializeStats(photographerMedias, photographer.price || 0);

  const sortedMedias = initSortButton(photographerMedias);
  generateMediasCards(sortedMedias);

  initScrollToTop();
  initializeLightbox();
  setupModalEventListeners(photographer.name);
  hideLoadingScreen();
};
