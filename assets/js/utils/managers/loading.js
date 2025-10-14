// Loading screen display manager

import { getLoadingScreen } from '../../config.js';
import { aria } from '../accessibility/aria.js';

// Track loading screen state
let loadingHidden = false;

// Initialize loading screen with timeout
export const initLoadingManager = (maxTimeout = 3000) => {
  const loadingScreen = getLoadingScreen();
  if (loadingScreen) setTimeout(() => hideLoadingScreen(), maxTimeout);
};

// Hide loading screen with animation
export const hideLoadingScreen = () => {
  const loadingScreen = getLoadingScreen();
  if (loadingHidden || !loadingScreen) return;
  loadingHidden = true;

  loadingScreen.classList.add('loaded');
  aria.setHidden(loadingScreen, true);

  setTimeout(() => loadingScreen?.remove(), 300);
};

// Show loading screen
export const showLoadingScreen = () => {
  const loadingScreen = getLoadingScreen();
  if (!loadingScreen) return;

  loadingHidden = false;
  loadingScreen.classList.remove('loaded');
  loadingScreen.style.display = 'flex';
  aria.setHidden(loadingScreen, false);
};
