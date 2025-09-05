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
    console.log("Getting photographer ID from URL...");
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get("id");
    console.log("URL params:", window.location.search);
    console.log("Photographer ID from URL:", photographerId);

    if (!photographerId) {
      console.error("No photographer ID found in URL");
      return null;
    }

    const numericId = parseInt(photographerId, 10);
    if (isNaN(numericId)) {
      console.error("Invalid photographer ID in URL:", photographerId);
      return null;
    }

    console.log("Looking for photographer with ID:", numericId);
    const photographers = await getPhotographersData();
    console.log("Available photographer IDs:", photographers.map(p => p.id));

    const photographer = photographers.find((p) => p.id === numericId);

    if (!photographer) {
      console.error(`Photographer with ID ${numericId} not found in data`);
      return null;
    }

    console.log("Found photographer:", photographer.name);
    return numericId;
  } catch (error) {
    console.error("Error getting photographer ID from data:", error);
    return null;
  }
}

// Global access for backward compatibility
window.getPhotographersData = getPhotographersData;
window.getPhotographerInformation = getPhotographerInformation;
window.getPhotographerIdFromData = getPhotographerIdFromData;
