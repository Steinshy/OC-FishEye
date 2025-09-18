import { photographerPage } from './pages/photographer/page.js';

const initializeApp = async () => {
  try {
    const currentPath = window.location.pathname;
    const t0 = performance.now();
    currentPath.includes('photographer.html') ? await photographerPage() : console.warn('Unknown page route:', currentPath);
    const t1 = performance.now();
    console.log('Page initialized successfully');
    console.info(`✅ App initialized in ${(t1 - t0).toFixed(2)}ms`);
  } catch (error) {
    console.error('❌ Critical error during page initialization:', error);
  }
};

document.addEventListener('DOMContentLoaded', initializeApp);
