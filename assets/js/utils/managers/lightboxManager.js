import { lightboxElements, lightboxClasses } from '../../constants.js';
import { mediaCache } from '../../helpers/cache.js';
import { toggleScroll } from '../../helpers/helper.js';
import { generateMedia } from '../../photographer/generate/generateMedia.js';
import { media } from '../../selectors.js';
import { aria } from '../accessibility/aria.js';
import { setupFocusCycle, cleanupFocusCycle, toggleBackgroundContent, blurActive } from '../accessibility/focus.js';
import { media as mediaPlayer } from '../accessibility/keyboard.js';
import {
  createLightboxKeyboardHandler,
  createLightboxSwipeHandlers,
  createLightboxWheelHandler,
  createLightboxFocusHandler,
  initializeLightboxEvents,
} from '../accessibility/lightbox.js';

import { getSafeDuration } from './animationManager.js';

// Generate high-quality media for lightbox display
const generateMediaForLightbox = currentMedia => generateMedia(currentMedia, true);
const getCachedElement = currentMedia => mediaCache.getOrCreate('mediaElements', currentMedia.id, () => generateMediaForLightbox(currentMedia));

const preloadAdjacentMedia = () => {
  const { medias, currentIndex } = lightboxElements;
  mediaCache.preloadAdjacent('mediaElements', medias, currentIndex, generateMediaForLightbox);
};

const getCurrentMedia = () => {
  const { medias, currentIndex } = lightboxElements;
  return medias?.[currentIndex];
};

// State management
export const lightboxState = () => lightboxElements.mainModal?.classList.contains('show');

// UI Update Functions
const setupMediaElement = (element, container) => {
  // Add click handler only once
  if (!element.dataset.hasClickHandler) {
    element.addEventListener('click', e => e.stopPropagation());
    element.dataset.hasClickHandler = 'true';
  }

  // Clear container and add element
  const currentChild = container.firstChild;
  if (currentChild && currentChild !== element) {
    currentChild.style.opacity = '';
    container.removeChild(currentChild);
  }
  if (element.parentNode !== container) {
    container.appendChild(element);
  }
};

const updateUI = currentMedia => {
  if (!currentMedia) return;
  const { title, likes, counter, medias, currentIndex } = lightboxElements;
  if (title) title.textContent = currentMedia.title || '';
  if (likes) likes.textContent = currentMedia.likes || 0;
  if (counter) counter.textContent = `${currentIndex + 1} / ${medias.length}`;
};

const updateContent = (animate = false) => {
  const { medias, container } = lightboxElements;
  if (!medias?.length || !container) return;

  const currentMedia = getCurrentMedia();
  const element = getCachedElement(currentMedia);
  const currentChild = container.firstChild;

  preloadAdjacentMedia();
  updateUI(currentMedia);

  if (currentChild === element) return;

  element.classList.remove(lightboxClasses.visible, lightboxClasses.showing, lightboxClasses.hidden, lightboxClasses.transition);
  element.style.opacity = '';

  if (!animate) {
    setupMediaElement(element, container);
    element.classList.add(lightboxClasses.visible);
    return;
  }

  if (currentChild) currentChild.style.opacity = '0';
  element.classList.add(lightboxClasses.hidden, lightboxClasses.transition);

  const transitionDelay = getSafeDuration(100);
  setTimeout(() => {
    setupMediaElement(element, container);
    requestAnimationFrame(() => {
      element.classList.remove(lightboxClasses.hidden);
      element.classList.add(lightboxClasses.showing);
    });
  }, transitionDelay);
};

// Video Controls
const pauseActiveVideo = () => {
  const video = lightboxElements.container?.querySelector(media.videoElement);
  mediaPlayer.pauseVideo(video);
};

const markAsInteracted = () => {
  lightboxElements.mainModal?.classList.add('interacted');
};

// Navigation
const navigate = (index, animate = true) => {
  if (!lightboxElements.medias?.length || lightboxElements.isNavigating) return;

  pauseActiveVideo();
  lightboxElements.isNavigating = true;
  lightboxElements.currentIndex = index;
  updateContent(animate);

  setTimeout(
    () => {
      lightboxElements.isNavigating = false;
    },
    animate ? 200 : 0
  );
};

const handleNext = () => {
  markAsInteracted();
  pauseActiveVideo();
  const { currentIndex, medias } = lightboxElements;
  const nextIndex = currentIndex + 1 >= medias.length ? 0 : currentIndex + 1;
  navigate(nextIndex);
};

const handlePrevious = () => {
  markAsInteracted();
  pauseActiveVideo();
  const { currentIndex, medias } = lightboxElements;
  const prevIndex = currentIndex <= 0 ? medias.length - 1 : currentIndex - 1;
  navigate(prevIndex);
};

// UI Toggle
const toggleLightboxUI = show => {
  const { mainModal } = lightboxElements;
  if (!mainModal) return;

  aria.toggleVisibility(mainModal, show, lightboxClasses.visible);
  toggleScroll(show);
  toggleBackgroundContent(show);
};

// Open/Close
export const openLightbox = (mediaId, medias) => {
  if (!medias?.length) return;

  lightboxElements.medias = medias;
  lightboxElements.currentIndex = Math.max(
    0,
    medias.findIndex(m => m.id === mediaId)
  );

  toggleLightboxUI(true);
  updateContent(false);

  const { mainModal, close } = lightboxElements;
  const setupDelay = getSafeDuration(200);
  setupFocusCycle(mainModal, close, setupDelay);
};

export const closeLightbox = () => {
  if (!lightboxState()) return;

  pauseActiveVideo();
  lightboxElements.mainModal?.classList.add(lightboxClasses.closing);
  blurActive();

  const closingDuration = getSafeDuration(100);
  setTimeout(() => {
    const { mainModal } = lightboxElements;
    toggleLightboxUI(false);
    mainModal?.classList.remove(lightboxClasses.closing, 'interacted');
    cleanupFocusCycle(mainModal);
  }, closingDuration);
};

// Initialization
export const initializeLightbox = () => {
  const { mainModal, prev, next, close } = lightboxElements;
  if (lightboxElements.isInitialized || !mainModal) return;

  // Create accessibility handlers
  const keyboardHandler = createLightboxKeyboardHandler({
    lightboxState,
    onClose: closeLightbox,
    onPrevious: handlePrevious,
    onNext: handleNext,
    onNavigate: (index, animate) => navigate(index, animate),
  });

  const swipeHandlers = createLightboxSwipeHandlers({
    onNext: handleNext,
    onPrevious: handlePrevious,
    minDistance: lightboxElements.minDistance,
  });

  const handleTouchStart = e => {
    if (!lightboxState()) return;
    swipeHandlers.handleStart(e);
  };

  const handleTouchEnd = e => {
    if (!lightboxState()) return;
    swipeHandlers.handleEnd(e);
  };

  const wheelHandler = createLightboxWheelHandler({
    lightboxState,
    onNext: handleNext,
    onPrevious: handlePrevious,
  });

  const focusHandler = createLightboxFocusHandler();

  // Initialize all events
  initializeLightboxEvents({
    mainModal,
    prev,
    next,
    close,
    handlers: {
      onPrevious: handlePrevious,
      onNext: handleNext,
      onClose: closeLightbox,
      onKeyboard: keyboardHandler,
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
      onWheel: wheelHandler,
      onFocus: focusHandler,
    },
  });

  lightboxElements.isInitialized = true;
};
