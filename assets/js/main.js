import { photographerPage } from './pages/photographer/page.js';

const initializeApp = async () => {
  try {
    const currentPath = window.location.pathname;
    const isPhotographerPage = currentPath.includes('photographer.html') || currentPath.includes('/photographer');

    if (isPhotographerPage) {
      console.log('Loading photographer page...');
      await photographerPage();
    } else {
      console.warn('Unknown page route:', currentPath);
    }
  } catch (error) {
    console.error('Error initializing app:', error);
  }
};

document.addEventListener('DOMContentLoaded', initializeApp);
