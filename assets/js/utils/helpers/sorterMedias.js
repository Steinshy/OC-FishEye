const sortComparators = {
  Popularité: (a, b) => b.likes - a.likes || new Date(b.date).getTime() - new Date(a.date).getTime(),
  Date: (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  Titre: (a, b) => a.title.localeCompare(b.title, 'fr', { sensitivity: 'base' }),
};

export const sortMedias = (medias, option) => {
  if (!Array.isArray(medias) || !medias.length) return [];
  return [...medias].sort(sortComparators[option] ?? sortComparators.Popularité);
};
