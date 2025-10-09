import { lightboxElements, selectorTypes } from '../../constants.js';
import { accessibilityManager } from '../../utils/accessibility.js';
import { LightboxEventListeners } from '../../utils/helpers/events/lightboxEventListeners.js';
import { toggleScroll } from '../../utils/helpers/helper.js';
import { mediaCache } from '../../utils/helpers/managers/cacheManager.js';
import { generateMedias } from '../../utils/helpers/managers/generateMediasManager.js';

const { focusManager } = accessibilityManager();

const getCachedElement = media => mediaCache.getOrCreate('mediaElements', media.id, () => generateMedias(media));

export const lightboxState = () => {
  return lightboxElements.modal()?.classList.contains('show');
};

const getValidIndex = (index, length) => {
  if (index < 0) return length - 1;
  if (index >= length) return 0;
  return index;
};

const getTouchCoordinates = touchEvent => ({
  x: touchEvent.clientX,
  y: touchEvent.clientY,
});

const calculateSwipeDistance = (startCoords, endCoords) => ({
  x: endCoords.x - startCoords.x,
  y: endCoords.y - startCoords.y,
});

const isValidSwipe = (distanceX, distanceY, minDistance) => {
  return Math.abs(distanceX) > Math.abs(distanceY) && Math.abs(distanceX) > minDistance;
};

const setupMediaElement = (element, container) => {
  element.addEventListener('click', e => e.stopPropagation());
  container.firstChild ? container.replaceChild(element, container.firstChild) : container.appendChild(element);
};

const updateUI = media => {
  const title = lightboxElements.title();
  const likes = lightboxElements.likes();
  const counter = lightboxElements.counter();
  if (title) title.textContent = media.title;
  if (likes) likes.textContent = media.likes;
  if (counter) counter.textContent = `${lightboxElements.currentIndex + 1} / ${lightboxElements.medias.length}`;
};

const applyTransition = (element, opacity, scale) => {
  element.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
  element.style.opacity = opacity;
  element.style.transform = `scale(${scale})`;
};

const preloadAdjacentMedia = currentIndex => {
  const { medias } = lightboxElements;
  if (!medias?.length) return;

  [getValidIndex(currentIndex - 1, medias.length), getValidIndex(currentIndex + 1, medias.length)].forEach(
    index => medias[index] && getCachedElement(medias[index])
  );
};

const updateContent = (animate = false) => {
  const container = lightboxElements.container();
  if (!lightboxElements.medias?.length || !container) return;

  const media = lightboxElements.medias[lightboxElements.currentIndex];
  const element = getCachedElement(media);
  preloadAdjacentMedia(lightboxElements.currentIndex);

  if (!animate) {
    updateUI(media);
    requestAnimationFrame(() => {
      if (element) {
        setupMediaElement(element, container);
        element.style.cssText = 'opacity: 1; transform: scale(1)';
      }
    });
    return;
  }

  const currentChild = container.firstChild;
  if (currentChild) applyTransition(currentChild, '0', '0.85');

  setTimeout(() => {
    updateUI(media);
    if (element) {
      setupMediaElement(element, container);
      applyTransition(element, '0', '0.85');
      requestAnimationFrame(() => setTimeout(() => applyTransition(element, '1', '1'), 10));
    }
  }, 250);
};

const navigate = (index, animate = true) => {
  if (!lightboxElements.medias?.length || lightboxElements.isNavigating) return;
  lightboxElements.container()?.querySelector('video:not([paused])')?.pause();
  lightboxElements.isNavigating = true;
  lightboxElements.currentIndex = index;
  updateContent(animate);
  lightboxElements.isNavigating = false;
};

const nextSlide = () => navigate(getValidIndex(lightboxElements.currentIndex + 1, lightboxElements.medias.length));
const previousSlide = () => navigate(getValidIndex(lightboxElements.currentIndex - 1, lightboxElements.medias.length));

const toggleBackgroundContent = hide => {
  [selectorTypes.main, selectorTypes.header].forEach(selector => {
    const element = document.querySelector(selector);
    if (element) element.inert = hide;
  });
};

const toggleLightboxUI = show => {
  const modal = lightboxElements.modal();
  if (!modal) return;

  modal.classList.toggle('show', show);
  modal.setAttribute('aria-hidden', !show);
  toggleScroll(show);
  toggleBackgroundContent(show);
};

const handleKeyboardNavigation = e => {
  if (!lightboxState()) return;
  const video = lightboxElements.modal()?.querySelector('video');
  const keyboardActions = {
    Escape: closeLightbox,
    ArrowLeft: previousSlide,
    ArrowRight: nextSlide,
    Home: () => navigate(0, false),
    End: () => navigate(lightboxElements.medias?.length - 1, false),
    ' ': () => video && (video.paused ? video.play() : video.pause()),
  };
  if (keyboardActions[e.key]) {
    e.preventDefault();
    keyboardActions[e.key]();
  }
};
const handleTouchSwipeStart = e => {
  if (!lightboxState()) return;
  const coords = getTouchCoordinates(e.touches[0]);
  lightboxElements.touch.startX = coords.x;
  lightboxElements.touch.startY = coords.y;
};

const handleTouchSwipeEnd = e => {
  if (!lightboxState()) return;

  const startCoords = { x: lightboxElements.touch.startX, y: lightboxElements.touch.startY };
  const endCoords = getTouchCoordinates(e.changedTouches[0]);
  const swipeDistance = calculateSwipeDistance(startCoords, endCoords);

  if (isValidSwipe(swipeDistance.x, swipeDistance.y, lightboxElements.touch.minDistance)) {
    swipeDistance.x > 0 ? previousSlide() : nextSlide();
  }
};

const handleMouseWheelNavigation = e => {
  if (!lightboxState()) return;
  e.preventDefault();
  e.deltaY > 0 ? nextSlide() : previousSlide();
};

const handleFocus = e => {
  const modal = lightboxElements.modal();
  if (modal && !modal.contains(e.target)) focusManager.focusFirst(modal);
};

export const openLightbox = (mediaId, medias) => {
  lightboxElements.medias = medias || [];
  if (!lightboxElements.medias.length) return;

  lightboxElements.currentIndex = Math.max(
    0,
    lightboxElements.medias.findIndex(m => m.id === mediaId)
  );
  lightboxElements.previousFocus = document.activeElement;

  toggleLightboxUI(true);
  updateContent(false);
  const modal = lightboxElements.modal();
  if (modal) lightboxElements.focusTrap = focusManager.trapFocus(modal);
  requestAnimationFrame(() => document.getElementById('lightbox-close')?.focus());
};

export const closeLightbox = () => {
  if (!lightboxState()) return;
  lightboxElements.container()?.querySelector('video:not([paused])')?.pause();
  lightboxElements.modal()?.classList.add('closing');
  document.activeElement?.blur();

  setTimeout(() => {
    toggleLightboxUI(false);
    lightboxElements.modal()?.classList.remove('closing');
    lightboxElements.focusTrap?.();
    lightboxElements.focusTrap = null;

    if (lightboxElements.previousFocus) {
      requestAnimationFrame(() => {
        lightboxElements.previousFocus?.focus();
        lightboxElements.previousFocus = null;
      });
    }
  }, 200);
};

export const initializeLightbox = () => {
  const modal = lightboxElements.modal();
  if (lightboxElements.isInitialized || !modal) return;

  LightboxEventListeners(modal, {
    previousSlide,
    nextSlide,
    closeLightbox,
    handleKeyboardNavigation,
    handleTouchSwipeStart,
    handleTouchSwipeEnd,
    handleMouseWheelNavigation,
    handleFocus,
  });

  lightboxElements.isInitialized = true;
};
