let loadingHidden = false;
let loadingScreen = null;

export const initLoadingManager = (maxTimeout = 3000) => {
  loadingScreen = document.getElementById('loading-screen');
  if (!loadingScreen) return;

  setTimeout(() => hideLoadingScreen(), maxTimeout);
};

export const hideLoadingScreen = () => {
  if (loadingHidden || !loadingScreen) return;
  loadingHidden = true;

  loadingScreen.classList.add('loaded');

  setTimeout(() => {
    loadingScreen?.remove();
    loadingScreen = null;
  }, 300);
};

export const showLoadingScreen = () => {
  if (!loadingScreen) {
    loadingScreen = document.getElementById('loading-screen');
  }

  if (loadingScreen) {
    loadingHidden = false;
    loadingScreen.classList.remove('loaded');
    loadingScreen.style.display = 'flex';
  }
};
