import { mediaCache } from '../../helpers/cache.js';
import { buildPhotographer, buildPhotographerMedia } from '../../helpers/dataBuilders.js';
import { logData } from '../../helpers/logData.js';
import { safeAsync } from '../errorHandler.js';

const dataUrl = 'assets/api/data.json';

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

export const getPhotographer = async photographerId => {
  return await safeAsync(async () => {
    const { photographers } = await getPhotographers();
    const photographer = photographers.find(p => p.id === photographerId);
    if (!photographer) {
      throw new Error(`Photographer not found: ${photographerId}`);
    }
    const builtPhotographer = buildPhotographer(photographer);
    logData.photographer(builtPhotographer);
    return builtPhotographer;
  });
};

export const getPhotographerMedias = async photographerId => {
  return await safeAsync(async () => {
    const cacheKey = `media_${photographerId}`;

    return mediaCache.getOrCreate('photographerMedias', cacheKey, async () => {
      const { photographers, media } = await getPhotographers();
      const photographer = photographers.find(p => p.id === photographerId);
      if (!photographer) {
        throw new Error(`Photographer not found: ${photographerId}`);
      }

      const photographerMedias = media
        .filter(item => item.photographerId === photographerId)
        .map(item => buildPhotographerMedia(item, photographer))
        .filter(Boolean);

      if (!photographerMedias.length) {
        throw new Error(`No media found for photographer: ${photographerId}`);
      }

      logData.photographerMedias(photographerMedias, photographerId, photographer.name);
      return photographerMedias;
    });
  }, []);
};
