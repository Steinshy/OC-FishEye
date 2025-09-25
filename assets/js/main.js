import { photographerPage } from './pages/photographer/page.js';

const initializeApp = async () => {
  try {
    const currentPath = window.location.pathname;
    const isPhotographerPage = currentPath.includes('photographer.html') || currentPath.includes('/photographer');

    if (isPhotographerPage) {
      await photographerPage();
    }
  } catch (error) {
    console.error(error);
  }
};

document.addEventListener('DOMContentLoaded', initializeApp);
