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

  card.innerHTML = `
    <a href="./photographer.html?id=${photographer.id}" aria-label="Voir le profil de ${photographer.name}">
      <img class="profile_picture"
      src="./assets/photographers/${photographer.folder_name}/jpg/${photographer.portrait.jpg}"
      alt="Portrait de ${photographer.name}, photographe basé à ${location}" 
      loading="lazy">
      <h3>${photographer.name}</h3>
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
      container.innerHTML =
        "<p>Erreur lors du chargement des photographes.</p>";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Only load photographers if we're on the index page
  if (document.getElementById("photographers_container")) {
    loadPhotographers();
  }

  // Only initialize photographer page functions if we're on photographer.html
  if (document.getElementById("info_name")) {
    // We're on photographer.html, don't call createSortDropdown here
    // as it's already called in render.js init function
    handleContactModal();
    initCharacterCount();
    initializeRealTimeValidation();
    initializeSubmitHandler();
  }
});
