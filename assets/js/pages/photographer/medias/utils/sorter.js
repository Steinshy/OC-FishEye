import { renderMediaGallery } from '../mediaHandler.js';

const sortFunctions = {
  Popularité: (mediaA, mediaB) => mediaB.likes - mediaA.likes,
  Date: (mediaA, mediaB) => new Date(mediaB.date) - new Date(mediaA.date),
  Titre: (mediaA, mediaB) => mediaA.title.localeCompare(mediaB.title),
  Likes: (mediaA, mediaB) => mediaB.likes - mediaA.likes,
};

export const mediaSorter = {
  currentSortCriteria: 'Popularité',
  currentMedia: [],
  currentPhotographerFolder: '',

  sortMedia: (medias, criteria) => [...medias].sort(sortFunctions[criteria] || (() => 0)),

  handleSortSelection(criteria, medias, folderName) {
    this.currentSortCriteria = criteria;
    this.currentMedia = medias;
    const sortedMedias = this.sortMedia(medias, criteria);
    renderMediaGallery(sortedMedias, folderName);
  },

  getCurrentSortCriteria: () => mediaSorter.currentSortCriteria,
  getCurrentMedia: () => mediaSorter.currentMedia,
  getCurrentPhotographerFolder: () => mediaSorter.currentPhotographerFolder,
  setCurrentPhotographerFolder: folderName => {
    mediaSorter.currentPhotographerFolder = folderName;
  },
};
