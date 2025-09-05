/**
 * Photographer Renderer
 * Handles photographer data display and rendering
 */

/**
 * Create photographer card for index page
 */
function createPhotographerCard(photographer) {
  const card = document.createElement("article");
  card.className = "content_item";
  card.setAttribute("role", "listitem");
  card.setAttribute("tabindex", "0");

  const location =
    photographer.location?.city && photographer.location?.country
      ? `${photographer.location.city}, ${photographer.location.country}`
      : photographer.location?.city || "";

  // Handle different name structures (some have name+lastname, others just name)
  const fullName = photographer.lastname
    ? `${photographer.name} ${photographer.lastname}`
    : photographer.name;

  card.innerHTML = `
    <a href="./photographer.html?id=${photographer.id}" aria-label="Voir le profil de ${fullName}">
      <img class="profile_picture"
      src="./assets/photographers/${photographer.folder_name}/jpg/${photographer.portrait.jpg}"
      alt="Portrait de ${fullName}, photographe basé à ${location}" 
      loading="lazy">
      <h3>${fullName}</h3>
      <p>${location}</p>
      <p>${photographer.tagline}</p>
      <span class="content_price" aria-label="Tarif: ${photographer.price}€ par jour">${photographer.price}€/jour</span>
    </a>
  `;

  return card;
}

/**
 * Load and display photographers on index page
 */
async function loadPhotographers() {
  try {
    const photographers = await getPhotographersData();
    const container = document.getElementById("photographers_container");
    const loadingMessage = document.getElementById("loading_message");

    if (loadingMessage) {
      loadingMessage.remove();
    }

    if (!photographers || photographers.length === 0) {
      container.innerHTML = "<p>Aucun photographe trouvé.</p>";
      return;
    }

    photographers.forEach((photographer) => {
      const card = createPhotographerCard(photographer);
      container.appendChild(card);
    });

    console.log(`Loaded ${photographers.length} photographers`);
  } catch (error) {
    console.error("Error loading photographers:", error);
    const container = document.getElementById("photographers_container");
    if (container) {
      container.innerHTML = "<p>Erreur lors du chargement des photographes.</p>";
    }
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
  const fullName = photographer.lastname
    ? `${photographer.name} ${photographer.lastname}`
    : photographer.name;
  updateElement("info_name", fullName);
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
    const pictureElement = picture.parentElement; // Get the <picture> element
    const newSrc = `assets/photographers/${photographer.folder_name}/jpg/${photographer.portrait.jpg}`;

    // Update the source element to use the photographer's image
    const sourceElement = pictureElement.querySelector('source');
    if (sourceElement) {
      sourceElement.srcset = newSrc;
    }

    // Also update the img element as fallback
    picture.src = newSrc;
    picture.alt = `Portrait de ${fullName}`;
  }

  // Update contact button
  updateElement(
    "contact_button",
    `Contactez ${fullName}`,
    "aria-label"
  );

  // Update page title
  document.title = `FishEye - ${fullName}`;

  return photographer;
}

// Global access for backward compatibility
window.createPhotographerCard = createPhotographerCard;
window.loadPhotographers = loadPhotographers;
window.renderPhotographerInfo = renderPhotographerInfo;
