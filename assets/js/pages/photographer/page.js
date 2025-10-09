import { getModalRefs } from '../../constants.js';
import { setupModalEventListeners } from '../../utils/helpers/events/modalEventListeners.js';
import { getPhotographer, getPhotographerMedias } from '../../utils/helpers/managers/dataManager.js';
import { generateMediasCards } from '../../utils/helpers/managers/mediasManager.js';
import { initializeStats } from '../../utils/helpers/managers/statsManager.js';
import { scrollToTop } from '../../utils/scrollToTop.js';

import { generatePhotographerHeader } from './generate/generatePhotographerHeader.js';
import { initializeLightbox } from './lightbox.js';
import { sortButton } from './sortButton.js';

// Move this part to helper later
export const photographerPage = async () => {
  const mainElement = document.querySelector('main');
  const mainMedia = document.getElementById('main-medias');
  const urlParams = new URLSearchParams(window.location.search);
  const urlIdParam = urlParams.get('id');
  const urlId = parseInt(urlIdParam, 10);
  const [photographer, photographerMedias] = await Promise.all([getPhotographer(urlId), getPhotographerMedias(urlId)]);

  mainElement.prepend(generatePhotographerHeader(photographer));
  initializeLightbox();
  setupModalEventListeners();

  const modalRefs = getModalRefs();
  if (modalRefs.photographerName) {
    modalRefs.photographerName.textContent = photographer.name;
  }

  scrollToTop.init();
  initializeStats(photographerMedias, photographer.price);

  const sortedMedias = sortButton.init(photographerMedias);
  generateMediasCards(mainMedia, sortedMedias || photographerMedias);
};
