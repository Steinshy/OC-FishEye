// Fetch and cache photographer data from API

import { mediaCache } from '../../helpers/cache.js';
import { buildPhotographer, buildPhotographerMedia } from '../../helpers/dataBuilders.js';
import { logData } from '../../helpers/logData.js';
import { safeAsync } from '../errorHandler.js';

// API data file path
const dataUrl = 'assets/api/data.json';

// Fetch all photographers and media data
const getPhotographers = async () => {
  return mediaCache.getOrCreate('photographersData', 'all', async () => {
    const response = await fetch(dataUrl, {
      cache: 'force-cache',
      headers: {
        Accept: 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Network error: ${response.status}`);
    }

    const { photographers, media } = await response.json();
    if (!Array.isArray(photographers) || !Array.isArray(media)) {
      throw new Error('Invalid data structure: photographers');
    }
    return { photographers, media };
  });
};

// Get single photographer by ID
export const getPhotographer = async photographerId => {
  return await safeAsync(async () => {
    const photographer = (await getPhotographers()).photographers.find(p => p.id === photographerId);
    if (!photographer) {
      throw new Error(`Photographer not found: ${photographerId}`);
    }
    const built = buildPhotographer(photographer);
    logData.photographer(built);
    return built;
  });
};

// Get all media for photographer
export const getPhotographerMedias = async photographerId => {
  return await safeAsync(async () => {
    return mediaCache.getOrCreate('photographerMedias', `media_${photographerId}`, async () => {
      const { photographers, media } = await getPhotographers();
      const photographer = photographers.find(p => p.id === photographerId);
      if (!photographer) {
        throw new Error(`Photographer not found: ${photographerId}`);
      }

      const medias = media
        .filter(item => item.photographerId === photographerId)
        .map(item => buildPhotographerMedia(item, photographer))
        .filter(Boolean);

      if (!medias.length) {
        throw new Error(`No media found for photographer: ${photographerId}`);
      }

      logData.photographerMedias(medias, photographerId, photographer.name);
      return medias;
    });
  }, []);
};
