export const helper = {
  dataSource: 'assets/photographers/data.json',
  mediaPath: 'assets/photographers/',

  sanitizeName: name => (name ? name.replace(/[^a-zA-Z0-9]/g, '') : ''),
  buildwebpUrl: url => (url ? url.replace(/\.jpg$/i, '.webp') : ''),
  mediaType: (video, image) => (video ? 'video' : image ? 'image' : ''),

  mediaImageUrl: (mediaPath, filename) => `${mediaPath  }/media/${  filename}`,
  mediaWebpUrl: (mediaPath, filename) => `${mediaPath  }/media/${  helper.buildwebpUrl(filename)}`,
  mediaVideoUrl: (mediaPath, filename) => `${mediaPath  }/media/${  filename}`,
  portraitImageUrl: (photographerPath, filename) => `${photographerPath  }/${  filename}`,
  portraitWebpUrl: (photographerPath, filename) => `${photographerPath  }/${  helper.buildwebpUrl(filename)}`,
};

const getPhotographers = async () => {
  const res = await fetch(helper.dataSource);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

  const { photographers, media } = await res.json();
  if (!Array.isArray(photographers)) throw new Error('Invalid data structure: photographers');
  if (!Array.isArray(media)) throw new Error('Invalid data structure: media');

  return { photographers, media };
};

export const getPhotographer = async photographerId => {
  const { photographers } = await getPhotographers();
  const single = photographers.find(p => p.id === photographerId);
  const photographerData = buildPhotographer(single);

  if (!photographerData) throw new Error(`Photographer with ID ${photographerId} not found`);
  return photographerData;
};

export const buildPhotographer = photographerData => {
  if (!photographerData) return null;

  const getPortraitPath = helper.mediaPath + helper.sanitizeName(photographerData.name);
  const getPortraitUrl = helper.portraitImageUrl(getPortraitPath, photographerData.portrait);
  const getPortraitWebpUrl = helper.portraitWebpUrl(getPortraitPath, photographerData.portrait);

  return {
    id: photographerData.id,
    name: photographerData.name,
    city: photographerData.city || '',
    country: photographerData.country || '',
    tagline: photographerData.tagline || '',
    price: photographerData.price || 0,
    portraits: {
      path: getPortraitPath,
      jpgUrl: getPortraitUrl,
      webpUrl: getPortraitWebpUrl,
    },
  };
};

export const getPhotographerMedias = async photographerId => {
  const { photographers, media } = await getPhotographers();
  const photographerData = photographers.find(p => p.id === photographerId);

  const photographerMedias = media
    .filter(item => item.photographerId === photographerId)
    .map(item => buildPhotographerMedia(item, photographerData))
    .filter(Boolean);

  if (!photographerMedias.length) throw new Error(`Media list is empty for photographer ${photographerId}`);
  return photographerMedias;
};

export const buildPhotographerMedia = (photographerMedia, photographerData) => {
  if (!photographerMedia) return null;

  const getMediaPath = helper.mediaPath + helper.sanitizeName(photographerData.name);
  const getMediaImageUrl = helper.mediaImageUrl(getMediaPath, photographerMedia.image);
  const getMediaWebpUrl = helper.mediaWebpUrl(getMediaPath, photographerMedia.image);
  const getMediaVideoUrl = helper.mediaVideoUrl(getMediaPath, photographerMedia.video);

  return {
    id: photographerMedia.id || 0,
    photographerId: photographerMedia.photographerId || 0,
    title: photographerMedia.title || '',
    mediaType: helper.mediaType(photographerMedia.video, photographerMedia.image),
    medias: {
      jpgUrl: getMediaImageUrl,
      webpUrl: getMediaWebpUrl,
      mp4Url: getMediaVideoUrl,
      jpgTitle: photographerMedia.image || '',
      webpTitle: photographerMedia.image || '',
      mp4Title: photographerMedia.video || '',
    },
    likes: photographerMedia.likes || 0,
    date: photographerMedia.date || '',
    price: photographerMedia.price || 0,
  };
};
