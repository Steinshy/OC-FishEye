// Data builder functions for photographer objects

import { sanitizeName, getMediaType, toWebpFilename } from './helper.js';

// Base path for media files
const mediaPath = 'assets/api/';

// Build photographer object from raw data
export const buildPhotographer = data => {
  if (!data) return null;

  const path = mediaPath + sanitizeName(data.name);
  const webp = toWebpFilename(data.portrait);

  return {
    id: data.id || 0,
    name: data.name,
    city: data.city || '',
    country: data.country || '',
    tagline: data.tagline || '',
    price: data.price || 0,
    portraits: {
      path,
      jpgUrl: `${path}/${data.portrait}`,
      webpUrl: `${path}/${webp}`,
    },
  };
};

// Build photographer media object from raw data
export const buildPhotographerMedia = (media, photographer) => {
  if (!media || !photographer) return null;

  const path = mediaPath + sanitizeName(photographer.name);
  const webp = toWebpFilename(media.image);

  return {
    id: media.id || 0,
    photographerId: media.photographerId || 0,
    title: media.title || '',
    mediaType: getMediaType(media.video, media.image),
    medias: {
      jpgUrl: `${path}/media/${media.image}`,
      webpUrl: `${path}/media/${webp}`,
      mp4Url: `${path}/media/${media.video}`,
      posterUrl: media.video ? `${path}/media/${media.video.replace(/\.mp4$/i, '.jpg')}` : '',
      jpgTitle: media.image || '',
      webpTitle: media.image || '',
      mp4Title: media.video || '',
    },
    likes: media.likes || 0,
    date: media.date || '',
    price: media.price || 0,
  };
};
