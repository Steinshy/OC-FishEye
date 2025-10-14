// Main application entry point

import { photographerPage } from './photographer/page.js';
import { safeAsync } from './utils/errorHandler.js';
import { initLoadingManager, hideLoadingScreen } from './utils/managers/loading.js';

// Initialize application on page load
const initializeApp = () => {
  initLoadingManager(3000);

  if (document.location.pathname.includes('photographer')) {
    safeAsync(photographerPage, null, 'App Initialization');
  } else {
    setTimeout(hideLoadingScreen, 500);
  }
};

document.addEventListener('DOMContentLoaded', initializeApp);
