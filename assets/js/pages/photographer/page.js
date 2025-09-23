import { initializeModalElements, appConfig, setMediaStore, getDefaultSortLabel } from '../../constants.js';
import { getPhotographer, getMedias } from '../../dataManager.js';

import { dropdownListeners } from './dropdown.js';
import { generateHeaderHTML } from './headerInfo.js';
import { mediaSorter } from './medias/sorter.js';
import { formValidationListeners, characterCountListeners, submitFormListeners, modalListeners } from './modal/eventListener.js';

export const photographerPage = async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const urlId = parseInt(urlParams.get('id'));

    const photographerData = await getPhotographer(urlId);
    const mediaData = await getMedias(urlId);

    const photographer = photographerData?.photographerData;
    const medias = mediaData?.mediaData || [];
    const folderName = photographer?.name?.replace(/[\s-]+/g, '') || '';

    generateHeaderHTML(photographer);

    if (medias.length > 0) {
      const mediaPath = `${appConfig.mediaPath}${folderName}`;
      setMediaStore(medias, mediaPath);
      mediaSorter.sortAndRender(medias, getDefaultSortLabel(), mediaPath);
    }

    initializeModalElements();
    dropdownListeners();
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
