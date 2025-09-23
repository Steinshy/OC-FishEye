export const getPhotographers = async () => {
  const res = await fetch('assets/photographers/data.json');
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const { photographers } = await res.json();
  if (!photographers) throw new Error('Invalid data structure');
  console.info('Photographers loaded:', photographers);
  return { photographers };
};

export const getPhotographer = async photographerId => {
  const photographers = await getPhotographers();
  const photographerList = photographers.photographers || photographers;
  const photographer = photographerList.find(p => p.id === photographerId);
  const photographerData = buildPhotographer(photographer);
  if (!photographerData) throw new Error(`Photographer with ID ${photographerId} not found`);
  console.info('Photographer loaded:', photographerData);
  return { photographerData };
};

export const getMedias = async photographerId => {
  const res = await fetch('assets/photographers/data.json');
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const { media } = await res.json();
  const mediaList = media.filter(m => m.photographerId === photographerId);
  const mediaData = mediaList.map(buildMedia);
  return { mediaData };
};

export const buildPhotographer = photographer => {
  if (!photographer) return null;

  return {
    name: photographer.name,
    id: photographer.id,
    city: photographer.city,
    country: photographer.country,
    tagline: photographer.tagline,
    price: photographer.price,
    city: photographer.city,
    country: photographer.country,
    portraits: {
      profile_jpg: photographer.portrait,
      profile_webp: photographer.portrait ? photographer.portrait.replace('jpg', 'webp') : '',
    },
  };
};

export const buildMedia = media => {
  if (!media) return null;

  return {
    id: media.id,
    photographerId: media.photographerId,
    title: media.title,
    media: {
      imageJpg: media.image || null,
      imageWebp: media.image ? media.image.replace('jpg', 'webp') : null,
      video: media.video || null,
    },
    likes: media.likes,
    date: media.date,
    price: media.price,
    media_id: media.id,
  };
};
