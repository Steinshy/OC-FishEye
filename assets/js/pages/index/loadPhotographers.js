import { initializePhotographerPage } from '../photographer/photographer.js';
export const loadPhotographers = async () => {
  try {
    const container = document.querySelector('.photographers');

    if (!container) {
      console.error('Photographers container not found');
      return;
    }

    // Set up event delegation directly here
    container.addEventListener('click', (event) => {
      const link = event.target.closest('a[href*="photographer.html"]');
      if (link) {
        const url = new URL(link.href);
        const photographerId = url.searchParams.get('id');
        initializePhotographerPage(photographerId);
      }
    });

  } catch (error) {
    console.error('Error loading photographers:', error);
  }
};