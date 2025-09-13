/*
 * Data Manager - Core data fetching and caching
 * - Fetch photographer data from JSON
 * - Cache data for performance
 * - Handle data validation
 * - Provide data access methods
 */

import { photographersDataUrl } from './constants.js';

let photographersCache = null;
/* Fetch photographers data from JSON file */
export const getPhotographersData = async () => {
  if (photographersCache) return photographersCache;

  try {
    const response = await fetch(photographersDataUrl);
    const data = await response.json();
    const { photographers } = data;

    // Return all photographers data
    photographersCache = { photographers };
    return { photographers };
  }

  catch (error) {
    console.error('Error loading photographers data:', error);
    throw error;
  }
};

/* Get specific photographer data by ID */
export const getPhotographerById = async (photographerId) => {
  try {
    const { photographers } = await getPhotographersData();
    const photographer = photographers.find(p => p.id === parseInt(photographerId));

    if (!photographer) {
      throw new Error(`Photographer with ID ${photographerId} not found`);
    }

    return {
      photographer: {
        id: photographer.id,
        name: photographer.name,
        lastname: photographer.lastname,
        tagline: photographer.tagline,
        price: photographer.price,
        folder_name: photographer.folder_name,
        location: {
          city: photographer.location.city,
          country: photographer.location.country
        },
      },
    };
  } catch (error) {
    console.error('Error loading photographer data:', error);
    throw error;
  }
};