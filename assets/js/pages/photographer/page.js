import { initializeModalElements } from '../../constants.js';
import { getPhotographerById } from '../../dataManager.js';

import { dropdownListeners } from './dropdown.js';
import { generateHeaderHTML } from './headerInfo.js';
import { renderMediaGallery } from './medias/gallery.js';
import { mediaSorter } from './medias/utils/sorter.js';
import {
  formValidationListeners,
  characterCountListeners,
  submitFormListeners,
  modalListeners
} from './modal/eventListener.js';

export const photographerPage = async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get('id');
    const { photographer } = await getPhotographerById(photographerId);
    const { medias } = photographer;
    const folderName = photographer.folder_name;

    generateHeaderHTML(photographer);

    mediaSorter.currentMedia = medias;
    mediaSorter.setCurrentPhotographerFolder(folderName);

    await renderMediaGallery(medias, folderName);

    initializeModalElements();
    dropdownListeners();
    modalListeners();
    formValidationListeners();
    characterCountListeners();
    submitFormListeners();

    console.info('✅ Photographer page loaded successfully');
    return photographer;
  } catch (error) {
    console.error('Error loading photographer page:', error);
    throw error;
  }
};
