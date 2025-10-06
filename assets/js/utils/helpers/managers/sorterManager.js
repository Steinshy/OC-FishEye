const sortComparators = {
  Popularité: (mediaA, mediaB) => {
    if (mediaB.likes !== mediaA.likes) {
      return mediaB.likes - mediaA.likes;
    }
    return new Date(mediaB.date || '1970-01-01').getTime() - new Date(mediaA.date || '1970-01-01').getTime();
  },

  Date: (mediaA, mediaB) => new Date(mediaB.date || '1970-01-01').getTime() - new Date(mediaA.date || '1970-01-01').getTime(),
  Titre: (mediaA, mediaB) => mediaA.title.localeCompare(mediaB.title, 'fr', { sensitivity: 'base' }),
};

const isValidArray = value => Array.isArray(value) && value.length > 0;
const isValidOption = option => Object.prototype.hasOwnProperty.call(sortComparators, option);
const getComparator = option => sortComparators[option] || sortComparators.Popularité;

export const sortMedias = (medias, option) => {
  if (!isValidArray(medias)) return [];
  const comparator = getComparator(isValidOption(option) ? option : 'Popularité');
  return [...medias].sort(comparator);
};
