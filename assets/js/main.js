import { photographerPage } from './pages/photographer/page.js';
import { safeAsync } from './utils/errorHandler.js';

const initializeApp = () => {
  if (document.location.pathname.includes('photographer')) {
    safeAsync(photographerPage, null, 'App Initialization');
  }
};

document.addEventListener('DOMContentLoaded', initializeApp);
