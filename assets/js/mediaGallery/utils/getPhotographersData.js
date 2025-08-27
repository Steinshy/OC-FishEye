const BASE_ASSETS_URL = "assets/photographers/";
const DATA_URL = BASE_ASSETS_URL + "data.json";

let photographersCache = null;

async function getPhotographersData() {
  if (photographersCache) {
    return photographersCache;
  }

  try {
    const response = await fetch(DATA_URL);
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

async function getPhotographerInformation(photographerId) {
  try {
    const photographers = await getPhotographersData();

    const photographer = photographers.find(
      (photographer) => photographer.id === photographerId
    );

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
