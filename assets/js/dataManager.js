import { safeAsync } from './utils/errorHandler.js';

const dataUrl = 'assets/photographers/data.json';
const mediaPath = 'assets/photographers/';

const sanitizeName = name => (name ? name.replace(/[^a-zA-Z0-9]/g, '') : '');
const getMediaType = (video, image) => (video ? 'video' : image ? 'image' : '');
const toWebpFilename = filename => (filename ? filename.replace(/\.jpg$/i, '.webp') : '');

const getPhotographers = async () => {
  const response = await fetch(dataUrl);
  if (!response.ok) {
    throw new Error(`Network error: ${response.status}`);
  }

  const { photographers, media } = await response.json();
  if (!Array.isArray(photographers)) {
    throw new Error('Invalid data structure: photographers');
  }
  if (!Array.isArray(media)) {
    throw new Error('Invalid data structure: media');
  }

  return { photographers, media };
};

export const getPhotographer = async photographerId => {
  return await safeAsync(
    async () => {
      const { photographers } = await getPhotographers();
      const photographer = photographers.find(p => p.id === photographerId);
      if (!photographer) {
        throw new Error(`Photographer not found: ${photographerId}`);
      }
      return buildPhotographer(photographer);
    },
    null,
    'Data Loading'
  );
};

export const buildPhotographer = photographerData => {
  if (!photographerData) return null;

  const portraitPath = mediaPath + sanitizeName(photographerData.name);
  const webpFilename = toWebpFilename(photographerData.portrait);

  return {
    id: photographerData.id,
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
  return await safeAsync(
    async () => {
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
      return photographerMedias;
    },
    [],
    'Data Loading'
  );
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
      jpgTitle: photographerMedia.image || '',
      webpTitle: photographerMedia.image || '',
      mp4Title: photographerMedia.video || '',
      width: photographerMedia.width || 1200,
      height: photographerMedia.height || 800,
    },
    likes: photographerMedia.likes || 0,
    date: photographerMedia.date || '',
    price: photographerMedia.price || 0,
  };
};
