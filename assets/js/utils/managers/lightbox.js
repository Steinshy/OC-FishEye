// Lightbox modal for viewing media fullscreen

import { lightboxElements, lightboxClasses, media } from '../../config.js';
import { mediaCache } from '../../helpers/cache.js';
import { toggleScroll } from '../../helpers/helper.js';
import { generateMedia } from '../../photographer/generate/generateMedia.js';
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

import { getSafeDuration } from './animation.js';

// Check if lightbox is open
export const lightboxState = () => lightboxElements.mainModal?.classList.contains('show');

// Setup media element in container
const setupMediaElement = (element, container) => {
  if (!element.dataset.hasClickHandler) {
    element.addEventListener('click', e => e.stopPropagation());
    element.dataset.hasClickHandler = 'true';
  }

  const currentChild = container.firstChild;
  if (currentChild && currentChild !== element) {
    currentChild.style.opacity = '';
    container.removeChild(currentChild);
  }
  if (element.parentNode !== container) container.appendChild(element);
};

// Update lightbox content with current media
const updateContent = (animate = false) => {
  const { medias, container, currentIndex, title, likes, counter } = lightboxElements;
  if (!medias?.length || !container) return;

  const currentMedia = medias[currentIndex];
  // Generate high-quality media for lightbox display (true = useHighQuality)
  const element = mediaCache.getOrCreate('mediaElements', currentMedia.id, () => generateMedia(currentMedia, true));
  const currentChild = container.firstChild;

  mediaCache.preloadAdjacent('mediaElements', medias, currentIndex, media => generateMedia(media, true));

  if (title) title.textContent = currentMedia.title || '';
  if (likes) likes.textContent = currentMedia.likes || 0;
  if (counter) counter.textContent = `${currentIndex + 1} / ${medias.length}`;

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

  setTimeout(() => {
    setupMediaElement(element, container);
    requestAnimationFrame(() => {
      element.classList.remove(lightboxClasses.hidden);
      element.classList.add(lightboxClasses.showing);
    });
  }, getSafeDuration(100));
};

// Navigate to media at index
const navigate = (index, animate = true) => {
  if (!lightboxElements.medias?.length || lightboxElements.isNavigating) return;

  mediaPlayer.pauseVideo(lightboxElements.container?.querySelector(media.videoElement));
  lightboxElements.isNavigating = true;
  lightboxElements.currentIndex = index;
  updateContent(animate);

  setTimeout(() => (lightboxElements.isNavigating = false), animate ? 200 : 0);
};

// Navigate to next media
const handleNext = () => {
  lightboxElements.mainModal?.classList.add('interacted');
  mediaPlayer.pauseVideo(lightboxElements.container?.querySelector(media.videoElement));
  navigate(lightboxElements.currentIndex + 1 >= lightboxElements.medias.length ? 0 : lightboxElements.currentIndex + 1);
};

// Navigate to previous media
const handlePrevious = () => {
  lightboxElements.mainModal?.classList.add('interacted');
  mediaPlayer.pauseVideo(lightboxElements.container?.querySelector(media.videoElement));
  navigate(lightboxElements.currentIndex <= 0 ? lightboxElements.medias.length - 1 : lightboxElements.currentIndex - 1);
};

// Show or hide lightbox UI
const toggleLightboxUI = show => {
  if (!lightboxElements.mainModal) return;
  aria.toggleVisibility(lightboxElements.mainModal, show, lightboxClasses.visible);
  toggleScroll(show);
  toggleBackgroundContent(show);
};

// Open lightbox with specific media
export const openLightbox = (mediaId, medias) => {
  if (!medias?.length) return;

  lightboxElements.medias = medias;
  lightboxElements.currentIndex = Math.max(
    0,
    medias.findIndex(m => m.id === mediaId)
  );

  toggleLightboxUI(true);
  updateContent(false);

  setupFocusCycle(lightboxElements.mainModal, lightboxElements.close, getSafeDuration(200));
};

// Close lightbox modal
export const closeLightbox = () => {
  if (!lightboxState()) return;

  mediaPlayer.pauseVideo(lightboxElements.container?.querySelector(media.videoElement));
  lightboxElements.mainModal?.classList.add(lightboxClasses.closing);
  blurActive();

  setTimeout(() => {
    toggleLightboxUI(false);
    lightboxElements.mainModal?.classList.remove(lightboxClasses.closing, 'interacted');
    cleanupFocusCycle(lightboxElements.mainModal);
  }, getSafeDuration(100));
};

// Initialize lightbox event listeners
export const initializeLightbox = () => {
  if (lightboxElements.isInitialized || !lightboxElements.mainModal) return;

  const swipeHandlers = createLightboxSwipeHandlers({
    onNext: handleNext,
    onPrevious: handlePrevious,
    minDistance: lightboxElements.minDistance,
  });

  initializeLightboxEvents({
    mainModal: lightboxElements.mainModal,
    prev: lightboxElements.prev,
    next: lightboxElements.next,
    close: lightboxElements.close,
    handlers: {
      onPrevious: handlePrevious,
      onNext: handleNext,
      onClose: closeLightbox,
      onKeyboard: createLightboxKeyboardHandler({
        lightboxState,
        onClose: closeLightbox,
        onPrevious: handlePrevious,
        onNext: handleNext,
        onNavigate: navigate,
      }),
      onTouchStart: e => lightboxState() && swipeHandlers.handleStart(e),
      onTouchEnd: e => lightboxState() && swipeHandlers.handleEnd(e),
      onWheel: createLightboxWheelHandler({ lightboxState, onNext: handleNext, onPrevious: handlePrevious }),
      onFocus: createLightboxFocusHandler(),
    },
  });

  lightboxElements.isInitialized = true;
};
