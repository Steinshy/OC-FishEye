import { safeAsync } from '../../errorHandler.js';
import { sanitizeName, getMediaType, toWebpFilename } from '../helper.js';

import { mediaCache } from './cacheManager.js';

const dataUrl = 'assets/photographers/data.json';
const mediaPath = 'assets/photographers/';

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

    console.info('photographers & media loaded', { photographersCount: photographers.length, mediaCount: media.length });
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
    return buildPhotographer(photographer);
  });
};

export const buildPhotographer = photographerData => {
  if (!photographerData) return null;

  const portraitPath = mediaPath + sanitizeName(photographerData.name);
  const webpFilename = toWebpFilename(photographerData.portrait);

  return {
    id: photographerData.id || 0,
    name: photographerData.name,
    city: photographerData.city || '',
    country: photographerData.country || '',
    tagline: photographerData.tagline || '',
    price: photographerData.price || 0,
    portraits: {
      path: portraitPath,
      jpgUrl: `${portraitPath}/${photographerData.portrait}`,
      webpUrl: `${portraitPath}/${webpFilename}`,
    },
  };
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

      console.info(`Loaded ${photographerMedias.length} media items for photographer ${photographerId}`);
      return photographerMedias;
    });
  }, []);
};

export const buildPhotographerMedia = (photographerMedia, photographerData) => {
  if (!photographerMedia || !photographerData) return null;

  const urlPath = mediaPath + sanitizeName(photographerData.name);
  const webpFilename = toWebpFilename(photographerMedia.image);

  return {
    id: photographerMedia.id || 0,
    photographerId: photographerMedia.photographerId || 0,
    title: photographerMedia.title || '',
    mediaType: getMediaType(photographerMedia.video, photographerMedia.image),
    medias: {
      jpgUrl: `${urlPath}/media/${photographerMedia.image}`,
      webpUrl: `${urlPath}/media/${webpFilename}`,
      mp4Url: `${urlPath}/media/${photographerMedia.video}`,
      posterUrl: photographerMedia.video ? `${urlPath}/media/${photographerMedia.video.replace(/\.mp4$/i, '.jpg')}` : '',
      jpgTitle: photographerMedia.image || '',
      webpTitle: photographerMedia.image || '',
      mp4Title: photographerMedia.video || '',
    },
    likes: photographerMedia.likes || 0,
    date: photographerMedia.date || '',
    price: photographerMedia.price || 0,
  };
};
