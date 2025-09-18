export class DataManagerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DataManagerError';
  }
}

// Fetch all photographers data from the JSON file
export const getPhotographersData = async () => {
  const res = await fetch('assets/photographers/data.json');
  if (!res.ok) throw new DataManagerError(`HTTP error! status: ${res.status}`);
  const { photographers } = await res.json();
  if (!photographers?.length) throw new DataManagerError('Invalid data structure');
  return { photographers };
};

// Normalize a photographer object
export const buildPhotographerResponse = photographer => ({
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

// Get a photographer by ID
const checkId = async id => {
  id = parseInt(id);
  if (!id || isNaN(id)) throw new DataManagerError('Valid photographer ID required');
  return id;
};

export const getPhotographerById = async id => {
  const pid = await checkId(id);
  const { photographers } = await getPhotographersData();
  const photographer = photographers.find(p => p.id === pid);
  if (!photographer) throw new DataManagerError(`Photographer ${pid} not found`);
  return buildPhotographerResponse(photographer);
};
