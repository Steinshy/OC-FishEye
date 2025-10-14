import { sanitizeName, getMediaType, toWebpFilename } from './helper.js';

const mediaPath = 'assets/api/';

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
