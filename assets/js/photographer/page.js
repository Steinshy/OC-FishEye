import { getPageElements } from '../constants.js';
import { getUrlParam } from '../helpers/helper.js';
import { getPhotographer, getPhotographerMedias } from '../utils/managers/dataManager.js';
import { initializeLightbox } from '../utils/managers/lightboxManager.js';
import { hideLoadingScreen } from '../utils/managers/loadingManager.js';
import { renderMediasCards } from '../utils/managers/mediaCardsManager.js';
import { setupModalEventListeners } from '../utils/managers/modalManager.js';
import { initializeStats } from '../utils/managers/statsManager.js';

import { generatePhotographerHeader } from './generate/generatePhotographerHeader.js';
import { initScrollToTop } from './scrollToTop.js';
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
  renderMediasCards(sortedMedias);

  initScrollToTop();
  initializeLightbox();
  setupModalEventListeners(photographer.name);
  hideLoadingScreen();
};
