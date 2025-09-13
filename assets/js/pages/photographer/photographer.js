/*
 * Photographer Page Controller
 * Main controller that orchestrates everything
 * - Initialize photographer page
 * - Load photographer data by ID
 * - Initialize sorting
 * - Initialize media gallery
 * - Handle page state management
 */

import { getPhotographerById } from '../../core/data-manager.js';
import { createHeaderInfos } from './render/header-infos.js';

export const photographerPage = async (photographerId) => {
  try {
    const { photographer } = await getPhotographerById(photographerId);
    // Create and insert the header info
    const headerElement = createHeaderInfos(photographer);
    const photographerSection = document.querySelector('.photographer-section');
    photographerSection.innerHTML = '';
    photographerSection.appendChild(headerElement);

    return photographer;
  } catch (error) {
    console.error('Error loading photographer page:', error);
    window.location.href = 'index.html';
    throw error;
  }
};

// Extract photographer ID from URL and initialize page
export const initializePhotographerPage = () => {
  // Get photographer ID from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = urlParams.get('id');

  if (!photographerId) {
    console.warn('No photographer ID found in URL, redirecting to index');
    window.location.href = 'index.html';
    return;
  }

  // Initialize the photographer page with the extracted ID
  photographerPage(photographerId);
};