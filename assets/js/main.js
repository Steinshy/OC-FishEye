import { photographerPage } from './pages/photographer/page.js';
import { safeAsync } from './utils/errorHandler.js';

const initializeApp = () => {
  if (window.location.pathname.includes('photographer')) {
    safeAsync(photographerPage, null, 'App Initialization');
  }
};

document.addEventListener('DOMContentLoaded', initializeApp);
