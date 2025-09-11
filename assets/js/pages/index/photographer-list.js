/**
 * Index Page - Photographer List
 * Handles photographer list display and functionality
 */
import { getPhotographersData } from "../../core/data-manager.js";
/*
 * Create photographer card for index page
 */
export const createPhotographerCard = (photographer) => {
  const card = document.createElement("article");
  card.className = "photographer";
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
    <a href="./photographer.html?id=${photographer.id}" aria-label="Voir le profil de ${fullName}"></a>
    <div class="container-picture">
      <picture>
        <source srcset="./assets/photographers/${photographer.folder_name}/jpg/${photographer.portrait.jpg}" type="image/jpg">
        <img class="profile-picture" src="./assets/photographers/${photographer.folder_name}/jpg/${photographer.portrait.jpg}"
          alt="Portrait de ${fullName}, photographe basé à ${location}" 
          loading="lazy">
      </picture>
    </div>
    <h1>${fullName}</h1>
    <p>${location}</p>
    <p>${photographer.tagline}</p>
    <span aria-label="Tarif: ${photographer.price}€ par jour">${photographer.price}€/jour</span>
  `;

  return card;
};

/*
 * Load and display photographers on index page
 */
export const loadPhotographers = async () => {
  try {
    const photographers = await getPhotographersData();
    const container = document.querySelector(".photographers");

    if (!container) {
      console.error("Photographers container not found");
      return;
    }

    if (!photographers || photographers.length === 0) {
      container.innerHTML = "<p>Aucun photographe trouvé.</p>";
      return;
    }

    // Clear existing content
    container.innerHTML = "";

    photographers.forEach((photographer) => {
      const card = createPhotographerCard(photographer);
      container.appendChild(card);
    });

    console.log(`Loaded ${photographers.length} photographers`);
  } catch (error) {
    console.error("Error loading photographers:", error);
    const container = document.querySelector(".photographers");
    if (container) {
      container.innerHTML = "<p>Erreur lors du chargement des photographes.</p>";
    }
  }
};