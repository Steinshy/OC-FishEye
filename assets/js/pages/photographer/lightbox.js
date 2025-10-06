import { lightboxElements, timeoutConfig, selectorTypes } from '../../constants.js';
import { accessibilityManager } from '../../utils/accessibility.js';
import { setupLightboxEventListeners } from '../../utils/helpers/events/lightboxEventListeners.js';
import { mediaCache } from '../../utils/helpers/managers/cacheManager.js';
import { createMediaElement } from '../../utils/helpers/managers/generateMediasManager.js';
import { toggleScroll } from '../../utils/helpers/utils.js';

const { focusManager } = accessibilityManager();

const getCachedElement = media => {
  return mediaCache.getOrCreate('mediaElements', media.id, () => createMediaElement(media));
};

const getValidIndex = (index, length) => {
  if (index < 0) return length - 1;
  if (index >= length) return 0;
  return index;
};

const setupMediaElement = (element, container) => {
  element.addEventListener('click', e => e.stopPropagation());

  if (container.firstChild) {
    container.replaceChild(element, container.firstChild);
  } else {
    container.appendChild(element);
  }
};

// TODO: Weird bug where the lightbox-info-content have ghosting jump effect when the media is changed
const updateUI = media => {
  const { title, likes, counter } = lightboxElements;
  title.textContent = media.title;
  likes.textContent = media.likes;
  counter.textContent = `${lightboxElements.currentIndex + 1} / ${lightboxElements.medias.length}`;
};

const toggleUI = show => {
  toggleLightboxAria(!show);
  toggleLightboxDisplay(show);
  toggleScroll(show);
  toggleBackgroundContent(show);
};

const updateContent = () => {
  const { container } = lightboxElements;
  if (!lightboxElements.medias?.length || !container) return;

  const media = lightboxElements.medias[lightboxElements.currentIndex];
  const element = getCachedElement(media);

  updateUI(media);

  requestAnimationFrame(() => {
    if (element) {
      setupMediaElement(element, container);
    }
  });
};

const navigate = index => {
  if (!lightboxElements.medias?.length || lightboxElements.isNavigating) return;
  lightboxElements.isNavigating = true;
  lightboxElements.currentIndex = index;
  updateContent();
  setTimeout(() => (lightboxElements.isNavigating = false), timeoutConfig.focus);
};

const next = () => {
  const nextIndex = getValidIndex(lightboxElements.currentIndex + 1, lightboxElements.medias.length);
  navigate(nextIndex);
};

const previous = () => {
  const prevIndex = getValidIndex(lightboxElements.currentIndex - 1, lightboxElements.medias.length);
  navigate(prevIndex);
};

const toggleBackgroundContent = hide => {
  const main = document.querySelector(selectorTypes.main);
  const header = document.querySelector(selectorTypes.header);
  if (main) main.inert = hide;
  if (header) header.inert = hide;
};

const toggleLightboxDisplay = show => {
  lightboxElements.modal?.classList.toggle('show', show);
};

const toggleLightboxAria = hidden => {
  lightboxElements.modal?.setAttribute('aria-hidden', hidden);
};

const handleKeyboard = e => {
  if (!isLightboxOpen()) return;

  const actions = {
    Escape: close,
    ArrowLeft: previous,
    ArrowRight: next,
    Home: () => navigate(0),
    End: () => navigate(lightboxElements.medias?.length - 1),
    ' ': () => {
      const video = lightboxElements.modal.querySelector('video');
      video?.paused ? video.play() : video?.pause();
    },
  };

  if (actions[e.key]) {
    e.preventDefault();
    actions[e.key]();
  }
};

const handleTouchStart = e => {
  if (!isLightboxOpen()) return;
  lightboxElements.touch.startX = e.touches[0].clientX;
  lightboxElements.touch.startY = e.touches[0].clientY;
};

const handleTouchEnd = e => {
  if (!isLightboxOpen()) return;
  const deltaX = e.changedTouches[0].clientX - lightboxElements.touch.startX;
  const deltaY = e.changedTouches[0].clientY - lightboxElements.touch.startY;
  const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
  const isLongEnough = Math.abs(deltaX) > lightboxElements.touch.minDistance;

  if (isHorizontalSwipe && isLongEnough) {
    deltaX > 0 ? previous() : next();
  }
};

const handleWheel = e => {
  if (!isLightboxOpen()) return;
  e.preventDefault();
  e.deltaY > 0 ? next() : previous();
};

const handleFocus = e => {
  if (!lightboxElements.modal.contains(e.target)) focusManager.focusFirst(lightboxElements.modal);
};

export const openLightbox = (mediaId, medias) => {
  lightboxElements.medias = medias || [];
  if (!lightboxElements.medias.length) return;

  lightboxElements.currentIndex = Math.max(
    0,
    lightboxElements.medias.findIndex(m => m.id === mediaId)
  );
  lightboxElements.previousFocus = document.activeElement;

  toggleUI(true);
  updateContent();
  lightboxElements.focusTrap = focusManager.trapFocus(lightboxElements.modal);
  requestAnimationFrame(() => document.getElementById('lightbox-close')?.focus());
};

export const closeLightbox = () => {
  if (!isLightboxOpen()) return;

  document.activeElement?.blur();
  toggleUI(false);

  lightboxElements.focusTrap?.();
  lightboxElements.focusTrap = null;

  if (lightboxElements.previousFocus) {
    requestAnimationFrame(() => {
      lightboxElements.previousFocus?.focus();
      lightboxElements.previousFocus = null;
    });
  }
};

const isLightboxOpen = () => lightboxElements.modal?.classList?.contains('show');

export const close = closeLightbox;
export const open = openLightbox;

export const initializeLightbox = () => {
  if (lightboxElements.isInitialized) return;

  if (!lightboxElements.modal) {
    return;
  }

  setupLightboxEventListeners(lightboxElements.modal, {
    previousSlide: previous,
    nextSlide: next,
    close,
    handleKeyDown: handleKeyboard,
    handleTouchStart,
    handleTouchEnd,
    handleWheel,
    handleFocusIn: handleFocus,
  });

  lightboxElements.isInitialized = true;
};
