import { lightboxElements, lightboxClasses } from '../../constants.js';
import { aria } from '../../utils/accessibility/aria.js';
import { setupFocusTrap, cleanupFocusTrap, toggleBackgroundContent, handleFocusEscape, blurActive } from '../../utils/accessibility/focus.js';
import { handlers, media, events } from '../../utils/accessibility/keyboard.js';
import { toggleScroll } from '../../utils/helpers/helper.js';
import { mediaCache } from '../../utils/helpers/managers/cacheManager.js';
import { generateMedias } from '../../utils/helpers/managers/generateMediasManager.js';
import { createSwipeHandlers } from '../../utils/helpers/managers/gestureManager.js';

const getCachedElement = media => mediaCache.getOrCreate('mediaElements', media.id, () => generateMedias(media));

export const lightboxState = () => lightboxElements.mainModal?.classList.contains('show');

const setupMediaElement = (element, container) => {
  element.addEventListener('click', e => e.stopPropagation());
  container.firstChild ? container.replaceChild(element, container.firstChild) : container.appendChild(element);
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

  mediaCache.preloadAdjacent('mediaElements', medias, lightboxElements.currentIndex, generateMedias);
  updateUI(media);

  if (!animate) {
    setupMediaElement(element, container);
    element.classList.add(lightboxClasses.visible);
    return;
  }

  const currentChild = container.firstChild;
  if (currentChild) {
    currentChild.classList.remove(lightboxClasses.visible, lightboxClasses.showing);
    currentChild.classList.add(lightboxClasses.transition, lightboxClasses.hidden);
  }

  setTimeout(() => {
    setupMediaElement(element, container);
    element.classList.add(lightboxClasses.transition, lightboxClasses.hidden);
    requestAnimationFrame(() => {
      element.classList.remove(lightboxClasses.hidden);
      element.classList.add(lightboxClasses.showing);
    });
  }, 150);
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
  lightboxElements.isNavigating = false;
};

const nextSlide = () => {
  const { currentIndex, medias } = lightboxElements;
  const nextIndex = currentIndex + 1 >= medias.length ? 0 : currentIndex + 1;
  navigate(nextIndex);
};

const previousSlide = () => {
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
  setupFocusTrap(mainModal, close, 350);
};

export const closeLightbox = () => {
  if (!lightboxState()) return;

  pauseActiveVideo();
  lightboxElements.mainModal?.classList.add(lightboxClasses.closing);
  blurActive();

  setTimeout(() => {
    const { mainModal } = lightboxElements;
    toggleLightboxUI(false);
    mainModal?.classList.remove(lightboxClasses.closing);
    cleanupFocusTrap(mainModal);
  }, 150);
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
