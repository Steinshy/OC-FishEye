/*
 * Data Manager - Core data fetching and caching
 * - Fetch photographer data from JSON
 * - Cache data for performance
 * - Handle data validation
 * - Provide data access methods
 */

import { appConfig } from './constants.js';

let photographersCache = null;

/*
 * Fetch photographers data from JSON file
 */
export const getPhotographersData = async () => {
  if (photographersCache) return photographersCache;
  const path = appConfig.photographersDataUrl;
  try {
    console.warn(`Trying to fetch data from: ${path}`);
    const response = await fetch(path);
    const data =
      response && response.ok
        ? await response.json()
        : (() => {
            throw new Error(`Failed to fetch data from ${path}`);
          })();
    const photographers = data.photographers;
    if (!Array.isArray(photographers))
      throw new Error('Invalid data structure: photographers array not found');
    photographersCache = photographers;
    console.warn(`Successfully loaded ${photographers.length} photographers`);
    return photographersCache;
  } catch (error) {
    console.error('Error loading photographers data:', error);
    throw error;
  }
};

/*
 * Get photographer information by ID
 */
export const getPhotographerInformation = async photographerId => {
  try {
    const photographers = await getPhotographersData();
    const photographer = photographers.find(p => p.id === photographerId);

    if (!photographer) {
      console.error(`Photographer with ID ${photographerId} not found`);
      return null;
    }

    return photographer;
  } catch (error) {
    console.error('Error getting photographer information:', error);
    return null;
  }
};

/*
 * Get photographer ID from URL and validate it exists
 */
export const getPhotographerIdFromData = async () => {
  try {
    const urlParams = new URLSearchParams(location.search);
    const photographerId = urlParams.get('id');

    console.warn('URL search params:', location.search);
    console.warn('Photographer ID from URL:', photographerId);

    if (!photographerId) {
      console.warn('No photographer ID found in URL');
      return null;
    }

    const numericId = parseInt(photographerId, 10);
    if (isNaN(numericId)) {
      console.warn('Invalid photographer ID:', photographerId);
      return null;
    }

    console.warn('Looking for photographer with ID:', numericId);
    const photographers = await getPhotographersData();
    const photographer = photographers.find(p => p.id === numericId);

    if (!photographer) {
      console.warn(`Photographer with ID ${numericId} not found`);
      return null;
    }

    console.warn('Found photographer:', photographer.name);
    return numericId;
  } catch (error) {
    console.error('Error getting photographer ID:', error);
    return null;
  }
};
