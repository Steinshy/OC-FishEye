import { getModalRefs } from '../../constants.js';
import { setupModalEventListeners } from '../../utils/helpers/events/modalEventListeners.js';
import { getPhotographer, getPhotographerMedias } from '../../utils/helpers/managers/dataManager.js';
import { createMediasCards } from '../../utils/helpers/managers/mediasManager.js';
import { initializeStats } from '../../utils/helpers/managers/statsManager.js';
import { scrollToTop } from '../../utils/scrollToTop.js';

import { photographerHeader } from './createPhotographerHeader.js';
import { initializeLightbox } from './lightbox.js';
import { sortButton } from './sortButton.js';

export const photographerPage = async () => {
  const mainElement = document.querySelector('main');
  const mainMedia = document.getElementById('main-medias');
  const urlParams = new URLSearchParams(window.location.search);
  const urlIdParam = urlParams.get('id');
  const urlId = parseInt(urlIdParam, 10);
  const [photographer, photographerMedias] = await Promise.all([getPhotographer(urlId), getPhotographerMedias(urlId)]);

  mainElement.prepend(photographerHeader(photographer));
  initializeLightbox();
  setupModalEventListeners();

  const modalRefs = getModalRefs();
  if (modalRefs.photographerName) {
    modalRefs.photographerName.textContent = photographer.name;
  }

  scrollToTop.init();
  initializeStats(photographerMedias, photographer.price);

  const sortedMedias = sortButton.init(photographerMedias);
  createMediasCards(mainMedia, sortedMedias || photographerMedias);
};
