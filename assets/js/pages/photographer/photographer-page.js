/*
 * Photographer Page Controller
 * Main controller that orchestrates everything
 * - Initialize photographer page
 * - Load photographer data by ID
 * - Initialize sorting
 * - Initialize media gallery
 * - Handle page state management
 */

import { createSortDropdown } from "../../components/dropdown/sort-dropdown.js";
import { renderPhotographerInfo } from "./render.js";
import { MediaSorter } from "./media-sorter.js";
import { renderMediaGallery } from "./media-gallery.js";

// Add this at the top
let currentPhotographer = null;
export { currentPhotographer };

/* Main initialization function for photographer page */
export const initPhotographerPage = async () => {
  try {
    // Initialize sort dropdown for photographer page
    createSortDropdown();

    const photographer = await renderPhotographerInfo();

    if (photographer && photographer.medias) {
      // Store current photographer and media for sorting
      currentPhotographer = photographer;

      // Store media in sorter
      if (MediaSorter) {
        MediaSorter.currentMedia = photographer.medias;
      }

      // Render media gallery
      renderMediaGallery(photographer.medias, photographer.folder_name);
    } else {
      console.error("No photographer data or media found");
      // Show error message to user
      const mediaContainer = document.getElementById("media_cards");
      if (mediaContainer) {
        mediaContainer.innerHTML = `
          <div style="text-align: center; padding: 2rem; color: #901c1c;">
            <h3>Erreur de chargement</h3>
            <p>Impossible de charger les données du photographe.</p>
            <p>Veuillez vérifier votre connexion internet et réessayer.</p>
            <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #901c1c; color: white; border: none; border-radius: 4px; cursor: pointer;">
              Recharger la page
            </button>
          </div>
        `;
      }
    }
  } catch (error) {
    console.error("Error loading photographer page:", error);
    // Show error message to user
    const mediaContainer = document.getElementById("media_cards");
    if (mediaContainer) {
      mediaContainer.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: #901c1c;">
          <h3>Erreur de chargement</h3>
          <p>Une erreur s'est produite lors du chargement de la page.</p>
          <p>Veuillez réessayer plus tard.</p>
          <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #901c1c; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Recharger la page
          </button>
        </div>
      `;
    }
  }
};