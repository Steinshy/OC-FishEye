import { initializeModalElements, timeoutConfig } from '../../constants.js';
import { getPhotographer, getPhotographerMedias } from '../../dataManager.js';

import { createHeader } from './createHeader.js';
import { dropdownListeners } from './dropdown.js';
import { initialize as initializeLightbox } from './lightbox/lightbox.js';
import { createMediasCards } from './medias/mediasManager.js';
import { modalListeners } from './modal/modalEvents.js';
export const photographerPage = async () => {
  const mainMedia = document.getElementById('main-medias');
  const urlParams = new URLSearchParams(window.location.search);
  const urlIdParam = urlParams.get('id');
  const urlId = parseInt(urlIdParam, 10);
  const photographerPromise = getPhotographer(urlId);
  const mediasPromise = getPhotographerMedias(urlId);
  const photographer = await photographerPromise;
  const photographerHeader = createHeader(photographer);

  const mainElement = document.querySelector('main');
  mainElement.prepend(photographerHeader);

  initializeLightbox();
  initializeModalElements();
  modalListeners();

  await new Promise(resolve => setTimeout(resolve, timeoutConfig.promise));
  const photographerMedias = await mediasPromise;
  const sortedMedias = dropdownListeners(photographerMedias);
  window.currentPhotographerMedias = sortedMedias;
  mainMedia.innerHTML = '';
  mainMedia.appendChild(createMediasCards(sortedMedias));
};
