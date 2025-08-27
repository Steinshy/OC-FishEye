// get photographer ID from getphotographersData and place it on the url

/**
 * Get photographer ID from URL and validate it exists in data.json
 */
async function getPhotographerIdFromData() {
  try {
    // First, get the ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get("id");

    if (!photographerId) {
      console.error("No photographer ID found in URL");
      return null;
    }

    // Convert to number since photographer IDs are stored as numbers in data.json
    const numericId = parseInt(photographerId, 10);

    if (isNaN(numericId)) {
      console.error("Invalid photographer ID in URL:", photographerId);
      return null;
    }

    // Then, validate that this ID exists in the data
    const photographers = await getPhotographersData();
    const photographer = photographers.find((p) => p.id === numericId);

    if (!photographer) {
      console.error(`Photographer with ID ${numericId} not found in data`);
      return null;
    }

    return numericId;
  } catch (error) {
    console.error("Error getting photographer ID from data:", error);
    return null;
  }
}

/**
 * Update DOM element if it exists
 */
function updateElement(id, value, attribute = "textContent") {
  const element = document.getElementById(id) || document.querySelector(id);
  if (element) {
    if (attribute === "textContent") {
      element.textContent = value;
    } else {
      element.setAttribute(attribute, value);
    }
  }
}

/**
 * Render photographer information
 */
async function renderPhotographerInfo() {
  const photographerId = await getPhotographerIdFromData();

  if (!photographerId) {
    console.error("No photographer ID found");
    return null;
  }

  const photographer = await getPhotographerInformation(photographerId);

  if (!photographer) {
    console.error("Photographer not found");
    return null;
  }

  // Update basic info
  updateElement("info_name", photographer.name);
  updateElement("info_tagline", photographer.tagline);

  // Update location
  const location =
    photographer.location?.city && photographer.location?.country
      ? `${photographer.location.city}, ${photographer.location.country}`
      : photographer.location?.city || "";
  updateElement("info_location", location);

  // Update picture
  const picture = document.getElementById("info_picture");
  if (picture && photographer.portrait) {
    picture.src = `assets/photographers/${photographer.folder_name}/jpg/${photographer.portrait.jpg}`;
    picture.alt = `Portrait de ${photographer.name}`;
  }

  // Update contact button
  updateElement(
    "contact_button",
    `Contactez ${photographer.name}`,
    "aria-label"
  );

  // Update page title
  document.title = `FishEye - ${photographer.name}`;

  return photographer;
}

/**
 * Create media card
 */
function createMediaCard(media, folderName) {
  const card = document.createElement("div");
  card.className = "media_card";

  const mediaElement = media.image
    ? `<img src="assets/photographers/${folderName}/jpg/${media.image.jpg}" alt="${media.title}" loading="lazy">`
    : `<video controls><source src="assets/photographers/${folderName}/video/${media.video}" type="video/mp4"></video>`;

  card.innerHTML = `
    <div class="media_content">
      ${mediaElement}
      <div class="media_info">
        <h3>${media.title}</h3>
        <div class="media_stats">
          <span class="likes">${media.likes} <i class="fas fa-heart"></i></span>
          <span class="price">${media.price}€</span>
        </div>
      </div>
    </div>
  `;

  return card;
}

/**
 * Render media gallery
 */
function renderMediaGallery(medias, folderName) {
  const container = document.querySelector(".media_cards");

  if (!container) {
    console.error("Media container not found");
    return;
  }

  container.innerHTML = "";

  medias.forEach((media) => {
    const card = createMediaCard(media, folderName);
    container.appendChild(card);
  });

  console.log(`Rendered ${medias.length} media items`);
}

/**
 * Main initialization function
 */
async function init() {
  try {
    // Initialize sort dropdown for photographer page
    if (typeof createSortDropdown === "function") {
      createSortDropdown();
    }

    const photographer = await renderPhotographerInfo();

    if (photographer && photographer.medias) {
      renderMediaGallery(photographer.medias, photographer.folder_name);
    }

    console.log("Page loaded successfully");
  } catch (error) {
    console.error("Error loading page:", error);
  }
}

// Start when DOM is ready
document.addEventListener("DOMContentLoaded", init);
