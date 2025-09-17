import { photographerPage } from './pages/photographer/page.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const currentPath = window.location.pathname;
    if (currentPath.includes('photographer.html')) {
      await photographerPage();
    }
  } catch (error) {
    console.error('❌ Critical error during page initialization:', error);
  }
});
