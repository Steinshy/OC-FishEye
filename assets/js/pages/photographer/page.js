import { initializeModalElements } from '../../constants.js';
import { getPhotographer, getPhotographerMedias } from '../../dataManager.js';

import { createHeader } from './createHeader.js';
import { dropdownListeners } from './dropdown.js';
import { initializeLightbox } from './medias/lightbox.js';
import { createMediasCards } from './medias/mediasManager.js';
import { formValidationListeners, characterCountListeners, submitFormListeners, modalListeners } from './modal/eventListener.js';
export const photographerPage = async () => {
  const mainMedia = document.getElementById('main-medias');
  const urlParams = new URLSearchParams(window.location.search);
  const urlIdParam = urlParams.get('id');
  const urlId = parseInt(urlIdParam, 10);
  const photographer = await getPhotographer(urlId);
  const photographerMedias = await getPhotographerMedias(urlId);

  // Store current photographer medias globally for lightbox access
  window.currentPhotographerMedias = photographerMedias;

  const sortedMedias = dropdownListeners(photographerMedias);
  mainMedia.innerHTML = '';
  createHeader(photographer);
  mainMedia.appendChild(createMediasCards(sortedMedias));

  // Initialize lightbox
  initializeLightbox();

  initializeModalElements();
  modalListeners();
  formValidationListeners();
  characterCountListeners();
  submitFormListeners();
};
