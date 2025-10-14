import { getLoadingScreen } from '../../../constants.js';
import { aria } from '../../accessibility/aria.js';

const loadingScreen = getLoadingScreen();
let loadingHidden = false;

export const initLoadingManager = (maxTimeout = 3000) => {
  if (!loadingScreen) return;

  setTimeout(() => hideLoadingScreen(), maxTimeout);
};

export const hideLoadingScreen = () => {
  if (loadingHidden || !loadingScreen) return;
  loadingHidden = true;

  loadingScreen.classList.add('loaded');
  aria.setHidden(loadingScreen, true);

  setTimeout(() => loadingScreen?.remove(), 300);
};

export const showLoadingScreen = () => {
  if (!loadingScreen) return;

  loadingHidden = false;
  loadingScreen.classList.remove('loaded');
  loadingScreen.style.display = 'flex';
  aria.setHidden(loadingScreen, false);
};
