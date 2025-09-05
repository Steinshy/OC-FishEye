/**
 * Photographer Data Management
 */

let photographersCache = null;

/**
 * Fetch photographers data from JSON file
 */
async function getPhotographersData() {
  if (photographersCache) {
    return photographersCache;
  }

  try {
    const response = await fetch(window.APP_CONFIG.PHOTOGRAPHERS_DATA_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const data = await response.json();
    const photographers = data.photographers;

    if (!photographers || !Array.isArray(photographers)) {
      throw new Error("Invalid data structure: photographers array not found");
    }

    photographersCache = photographers;
    return photographersCache;
  } catch (error) {
    console.error("Error loading photographers data:", error);
    throw error;
  }
}

/**
 * Get photographer information by ID
 */
async function getPhotographerInformation(photographerId) {
  try {
    const photographers = await getPhotographersData();
    const photographer = photographers.find((p) => p.id === photographerId);

    if (!photographer) {
      console.error(`Photographer with ID ${photographerId} not found`);
      return null;
    }

    return photographer;
  } catch (error) {
    console.error("Error getting photographer information:", error);
    return null;
  }
}

/**
 * Get photographer ID from URL and validate it exists
 */
async function getPhotographerIdFromData() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get("id");

    if (!photographerId) {
      return null;
    }

    const numericId = parseInt(photographerId, 10);
    if (isNaN(numericId)) {
      return null;
    }

    const photographers = await getPhotographersData();
    const photographer = photographers.find((p) => p.id === numericId);

    if (!photographer) {
      return null;
    }

    return numericId;
  } catch (error) {
    return null;
  }
}

// Global access for backward compatibility
window.getPhotographersData = getPhotographersData;
window.getPhotographerInformation = getPhotographerInformation;
window.getPhotographerIdFromData = getPhotographerIdFromData;
