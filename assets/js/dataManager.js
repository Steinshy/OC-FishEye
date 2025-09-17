import { photographersDataUrl } from './constants.js';

let photographersCache = null;
export const getCachedData = () => photographersCache;
export const setCachedData = data => {
  photographersCache = data;
};

export const getPhotographersData = async () => {
  const cachedData = getCachedData();
  if (cachedData) return cachedData;

  const response = await fetch(photographersDataUrl);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  const data = await response.json();
  if (!data?.photographers?.length) throw new Error('Invalid data structure');

  const result = { photographers: data.photographers };
  setCachedData(result);
  return result;
};

const buildPhotographerResponse = photographer => ({
  photographer: {
    ...photographer,
    tagline: photographer.tagline || '',
    price: photographer.price || 0,
    location: {
      city: photographer.location?.city || '',
      country: photographer.location?.country || '',
    },
    medias: photographer.medias || [],
  },
});

export const getPhotographerById = async photographerId => {
  const id = parseInt(photographerId);
  if (!id || isNaN(id)) throw new Error('Valid photographer ID required');

  const { photographers } = await getPhotographersData();
  const photographer = photographers.find(p => p.id === id);
  if (!photographer) throw new Error(`Photographer ${id} not found`);

  return buildPhotographerResponse(photographer);
};
