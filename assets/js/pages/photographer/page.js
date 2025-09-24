import { initializeModalElements } from '../../constants.js';
import { getPhotographer, getPhotographerMedias } from '../../dataManager.js';

import { createHeader } from './createHeader.js';
import { dropdownListeners } from './dropdown.js';
import { createMediasCards } from './medias/mediasManager.js';
import { formValidationListeners, characterCountListeners, submitFormListeners, modalListeners } from './modal/eventListener.js';
export const photographerPage = async () => {
  try {
    const mainMedia = document.getElementById('main-medias');
    mainMedia.innerHTML = '';
    const urlParams = new URLSearchParams(window.location.search);
    const urlIdParam = urlParams.get('id');
    const urlId = parseInt(urlIdParam, 10);

    const photographer = await getPhotographer(urlId);
    const photographerMedias = await getPhotographerMedias(urlId);
    const sortedMedias = dropdownListeners(photographerMedias);
    createHeader(photographer);
    mainMedia.appendChild(createMediasCards(sortedMedias));
    initializeModalElements();
    modalListeners();
    formValidationListeners();
    characterCountListeners();
    submitFormListeners();
    console.info('Photographer page loaded successfully');
  } catch (error) {
    console.error('Error loading photographer page:', error);
    throw error;
  }
};
