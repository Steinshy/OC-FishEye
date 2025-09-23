import { renderMediaGallery } from './mediaHandler.js';
import { sortFunctions, appConfig, getSortOptionsElements } from '../../../constants.js';

// Stateless helpers
const isArrayWithItems = medias => Array.isArray(medias) && medias.length > 0;
const getDefaultCriteria = () => {
  const elements = getSortOptionsElements();
  return elements.popularOption?.textContent?.trim() || 'Popularité';
};
const isValidCriteria = criteria => Object.prototype.hasOwnProperty.call(sortFunctions, criteria);

// Pure sort function
export const sortMediasBy = (medias, criteria) => {
  if (!isArrayWithItems(medias)) return [];
  const key = isValidCriteria(criteria) ? criteria : getDefaultCriteria();
  const sorter = sortFunctions[key];
  return sorter ? [...medias].sort(sorter) : [...medias];
};

export const mediaSorter = {
  sort(medias, criteria) {
    return sortMediasBy(medias, criteria);
  },

  sortAndRender(medias, criteria, mediaPath = appConfig.mediaPath) {
    const sorted = sortMediasBy(medias, criteria);
    renderMediaGallery(sorted, mediaPath);
    return sorted;
  },
};
