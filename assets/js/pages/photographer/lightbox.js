import { lightboxElements, lightboxClasses } from '../../constants.js';
import { aria } from '../../utils/accessibility/aria.js';
import { setupFocusTrap, cleanupFocusTrap, toggleBackgroundContent, handleFocusEscape, blurActive } from '../../utils/accessibility/focus.js';
import { handlers, media, events } from '../../utils/accessibility/keyboard.js';
import { toggleScroll } from '../../utils/helpers/helper.js';
import { getSafeDuration } from '../../utils/helpers/managers/animationManager.js';
import { mediaCache } from '../../utils/helpers/managers/cacheManager.js';
import { generateMedias } from '../../utils/helpers/managers/generateMediasManager.js';
import { createSwipeHandlers } from '../../utils/helpers/managers/gestureManager.js';

const generateMediaForLightbox = media => generateMedias(media, false, true);
const getCachedElement = media => mediaCache.getOrCreate('mediaElements', media.id, () => generateMediaForLightbox(media));

export const lightboxState = () => lightboxElements.mainModal?.classList.contains('show');

const setupMediaElement = (element, container) => {
  // Add click handler only once
  if (!element.dataset.hasClickHandler) {
    element.addEventListener('click', e => e.stopPropagation());
    element.dataset.hasClickHandler = 'true';
  }

  // Clear container and add element
  const currentChild = container.firstChild;
  if (currentChild && currentChild !== element) {
    // Reset state of element being removed
    currentChild.style.opacity = '';
    container.removeChild(currentChild);
  }
  if (element.parentNode !== container) {
    container.appendChild(element);
  }
};

const updateUI = media => {
  if (!media) return;
  const { title, likes, counter, medias, currentIndex } = lightboxElements;
  if (title) title.textContent = media.title || '';
  if (likes) likes.textContent = media.likes || 0;
  if (counter) counter.textContent = `${currentIndex + 1} / ${medias.length}`;
};

const updateContent = (animate = false) => {
  const { medias, container } = lightboxElements;
  if (!medias?.length || !container) return;

  const media = medias[lightboxElements.currentIndex];
  const element = getCachedElement(media);
  const currentChild = container.firstChild;

  mediaCache.preloadAdjacent('mediaElements', medias, lightboxElements.currentIndex, generateMediaForLightbox);
  updateUI(media);

  if (currentChild === element) return;

  // Reset element state
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

const pauseActiveVideo = () => {
  const video = lightboxElements.container?.querySelector('video');
  media.pauseVideo(video);
};

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

const markAsInteracted = () => {
  lightboxElements.mainModal?.classList.add('interacted');
};

const nextSlide = () => {
  markAsInteracted();
  const { currentIndex, medias } = lightboxElements;
  const nextIndex = currentIndex + 1 >= medias.length ? 0 : currentIndex + 1;
  navigate(nextIndex);
};

const previousSlide = () => {
  markAsInteracted();
  const { currentIndex, medias } = lightboxElements;
  const prevIndex = currentIndex <= 0 ? medias.length - 1 : currentIndex - 1;
  navigate(prevIndex);
};

const toggleLightboxUI = show => {
  const { mainModal } = lightboxElements;
  if (!mainModal) return;

  aria.toggleVisibility(mainModal, show, lightboxClasses.visible);
  toggleScroll(show);
  toggleBackgroundContent(show);
};

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
  setupFocusTrap(mainModal, close, setupDelay);
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
    cleanupFocusTrap(mainModal);
  }, closingDuration);
};

const handleKeyboardNavigation = handlers.createKeyMapHandler({
  condition: lightboxState,
  keyMap: {
    Escape: closeLightbox,
    ArrowLeft: previousSlide,
    ArrowRight: nextSlide,
    Home: () => navigate(0, false),
    End: () => navigate(lightboxElements.medias.length - 1, false),
    ' ': media.createVideoToggleHandler(() => lightboxElements.mainModal?.querySelector('video')),
  },
});

const swipeHandlers = createSwipeHandlers({ left: nextSlide, right: previousSlide }, lightboxElements.minDistance);

const handleTouchSwipeStart = e => {
  if (!lightboxState()) return;
  swipeHandlers.handleStart(e);
};

const handleTouchSwipeEnd = e => {
  if (!lightboxState()) return;
  swipeHandlers.handleEnd(e);
};

const handleMouseWheelNavigation = e => {
  if (!lightboxState()) return;
  e.preventDefault();
  e.deltaY > 0 ? nextSlide() : previousSlide();
};

const handleFocus = e => handleFocusEscape(lightboxElements.mainModal, e);

export const initializeLightbox = () => {
  const { mainModal, prev, next, close } = lightboxElements;
  if (lightboxElements.isInitialized || !mainModal) return;

  const eventManager = events.createEventManager([
    { element: prev, event: 'click', handler: events.createClickHandler(previousSlide, { preventDefault: false }) },
    { element: next, event: 'click', handler: events.createClickHandler(nextSlide, { preventDefault: false }) },
    { element: close, event: 'click', handler: events.createClickHandler(closeLightbox, { preventDefault: false }) },
    { element: document, event: 'keydown', handler: handleKeyboardNavigation },
    { element: mainModal, event: 'touchstart', handler: handleTouchSwipeStart, options: { passive: true } },
    { element: mainModal, event: 'touchend', handler: handleTouchSwipeEnd, options: { passive: true } },
    { element: mainModal, event: 'wheel', handler: handleMouseWheelNavigation, options: { passive: false } },
    { element: mainModal, event: 'focusin', handler: handleFocus },
  ]);

  eventManager.attach();
  lightboxElements.isInitialized = true;
};
