/*
 * Photographer Page Controller
 * Main controller that orchestrates everything
 * - Initialize photographer page
 * - Load photographer data by ID
 * - Initialize sorting
 * - Initialize media gallery
 * - Handle page state management
 */

import { createSortDropdown } from '../../components/dropdown/sort-dropdown.js';
import { renderPhotographerInfo } from './photographer-info.js';
import { MediaSorter } from './media-sorter.js';
import { renderMediaGallery } from './media-gallery.js';

// Add this at the top
let currentPhotographer = null;
export { currentPhotographer };

/* Main initialization function for photographer page */
export const initPhotographerPage = async () => {
  try {
    // Initialize sort dropdown for photographer page
    createSortDropdown();

    const photographer = await renderPhotographerInfo();

    if (!photographer || !photographer.medias) {
      console.warn('Photographer not found or no media available, redirecting to index');
      window.location.href = 'index.html';
      return;
    }

    // Store current photographer and media for sorting
    currentPhotographer = photographer;

    // Store media in sorter
    if (MediaSorter) {
      MediaSorter.currentMedia = photographer.medias;
    }

    // Render media gallery
    renderMediaGallery(photographer.medias, photographer.folder_name);
  } catch (error) {
    console.error('Error loading photographer page:', error);
    // Redirect to index page on any error
    window.location.href = 'index.html';
  }
};
