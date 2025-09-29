// Update main.js
import { safeAsync } from './errorHandler.js';
import { photographerPage } from './pages/photographer/page.js';

const initializeApp = async () => {
  await safeAsync(
    async () => {
      const currentPath = window.location.pathname;
      const isPhotographerPage = currentPath.includes('photographer.html') || currentPath.includes('/photographer');

      if (isPhotographerPage) {
        await photographerPage();
      }
    },
    null,
    'App Initialization'
  );
};

document.addEventListener('DOMContentLoaded', initializeApp);
