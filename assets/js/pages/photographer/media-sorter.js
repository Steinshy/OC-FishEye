import { renderMediaGallery } from './media-gallery.js';

let currentSortCriteria = 'Popularité';
let currentMedia = [];

export const sortMedia = (medias, criteria) => {
  const sortedMedias = [...medias];
  switch (criteria) {
    case 'Popularité':
      return sortedMedias.sort((a, b) => b.likes - a.likes);
    case 'Date':
      return sortedMedias.sort((a, b) => new Date(b.date) - new Date(a.date));
    case 'Titre':
      return sortedMedias.sort((a, b) => a.title.localeCompare(b.title));
    case 'Likes':
      return sortedMedias.sort((a, b) => b.likes - a.likes);
    default:
      return sortedMedias;
  }
};

export const updateMediaGallery = (sortedMedias, folderName) => {
  renderMediaGallery(sortedMedias, folderName);
};

export const handleSortSelection = (criteria, medias, folderName) => {
  currentSortCriteria = criteria;
  currentMedia = medias;
  const sortedMedias = sortMedia(medias, criteria);
  updateMediaGallery(sortedMedias, folderName);
  console.warn(`Sorted by: ${criteria}`);
};

export const getCurrentSortCriteria = () => {
  return currentSortCriteria;
};

export const getCurrentMedia = () => {
  return currentMedia;
};

export const MediaSorter = {
  get currentMedia() {
    return currentMedia;
  },
  set currentMedia(value) {
    currentMedia = value;
  },
  sortMedia,
  updateMediaGallery,
  handleSortSelection,
  getCurrentSortCriteria,
  getCurrentMedia
};
