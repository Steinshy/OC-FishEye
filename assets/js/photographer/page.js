// Photographer page initialization and setup

import { getPageElements } from '../config.js';
import { getUrlParam } from '../helpers/helper.js';
import { getPhotographer, getPhotographerMedias } from '../utils/managers/data.js';
import { initializeLightbox } from '../utils/managers/lightbox.js';
import { hideLoadingScreen } from '../utils/managers/loading.js';
import { renderMediasCards } from '../utils/managers/mediaCards.js';
import { setupModalEventListeners } from '../utils/managers/modal.js';
import { initializeStats } from '../utils/managers/stats.js';

import { generatePhotographerHeader } from './generate/generatePhotographerHeader.js';
import { initScrollToTop } from './scrollToTop.js';
import { initSortButton } from './sortButton.js';

// Initialize photographer page with data and features
export const photographerPage = async () => {
  const [photographer, photographerMedias] = await Promise.all([getPhotographer(getUrlParam('id', true)), getPhotographerMedias(getUrlParam('id', true))]);
  if (!photographer || !Array.isArray(photographerMedias)) return;

  const header = generatePhotographerHeader(photographer);
  if (header) getPageElements().main.prepend(header);

  initializeStats(photographerMedias, photographer.price || 0);
  renderMediasCards(initSortButton(photographerMedias));
  initScrollToTop();
  initializeLightbox();
  setupModalEventListeners(photographer.name);
  hideLoadingScreen();
};
