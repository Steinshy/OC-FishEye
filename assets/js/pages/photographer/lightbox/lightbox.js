import { createAccessibilityManager, setupLightboxEventListeners, cleanupLightboxEventListeners } from '../../../accessibilityManagement.js';
import { errorConfig } from '../../../constants.js';
import { logError, logWarning } from '../../../errorHandler.js';
import { createMediaElement } from '../medias/createMediaElement.js';

const accessibilityManager = createAccessibilityManager();

// Lightbox state
let currentMediaIndex = 0;
let photographerMedias = [];
let lightboxModal = null;
let focusTrapCleanup = null;
let previouslyFocusedElement = null;
let isInitialized = false;
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
const minSwipeDistance = 50;
let isNavigating = false; // Prevent rapid navigation

const initialize = () => {
  if (isInitialized) return;
  lightboxModal = document.getElementById('lightbox-modal');
  if (!lightboxModal) {
    logError('Lightbox modal not found', null, errorConfig.contexts.LIGHTBOX);
    return;
  }
  setupEventListeners();
  isInitialized = true;
};

const setupEventListeners = () => {
  setupLightboxEventListeners(lightboxModal, {
    previousSlide,
    nextSlide,
    close,
    handleKeyDown,
    handleTouchStart,
    handleTouchEnd,
    handleWheel,
    handleFocusIn,
  });
};

const handleKeyDown = e => {
  if (!lightboxModal.classList.contains('show')) return;
  accessibilityManager.keyboardHandler.createEscapeHandler(close)(e);

  switch (e.key) {
    case 'ArrowLeft':
      e.preventDefault();
      previousSlide();
      break;
    case 'ArrowRight':
      e.preventDefault();
      nextSlide();
      break;
    case 'Home':
      e.preventDefault();
      goToSlide(0);
      break;
    case 'End':
      e.preventDefault();
      goToSlide(photographerMedias.length - 1);
      break;
    case ' ':
      e.preventDefault();
      togglePlayPause();
      break;
  }
};

const handleTouchStart = e => {
  if (!lightboxModal.classList.contains('show')) return;
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
};

const handleTouchEnd = e => {
  if (!lightboxModal.classList.contains('show')) return;
  touchEndX = e.changedTouches[0].clientX;
  touchEndY = e.changedTouches[0].clientY;

  if (Math.abs(touchEndX - touchStartX) > Math.abs(touchEndY - touchStartY) && Math.abs(touchEndX - touchStartX) > minSwipeDistance) {
    touchEndX - touchStartX > 0 ? previousSlide() : nextSlide();
  }
};

const handleWheel = e => {
  if (!lightboxModal.classList.contains('show')) return;
  e.preventDefault();
  e.deltaY > 0 ? nextSlide() : e.deltaY < 0 ? previousSlide() : null;
};

const handleFocusIn = e => {
  if (!lightboxModal.contains(e.target)) {
    accessibilityManager.focusManager.focusFirst(lightboxModal);
  }
};

const open = (mediaId, medias) => {
  photographerMedias = medias || window.currentPhotographerMedias || [];
  if (!photographerMedias.length) {
    logError('No media data available for lightbox', null, errorConfig.contexts.LIGHTBOX);
    return;
  }

  currentMediaIndex = photographerMedias.findIndex(media => media.id === mediaId);
  if (currentMediaIndex === -1) {
    logWarning(`Media with ID ${mediaId} not found, showing first media`, null, errorConfig.contexts.LIGHTBOX);
    currentMediaIndex = 0;
  }

  previouslyFocusedElement = document.activeElement;
  updateContent();
  lightboxModal.classList.add('show');
  lightboxModal.setAttribute('aria-hidden', 'false');
  document.documentElement.classList.add('no-scroll');
  document.body.classList.add('no-scroll');
  focusTrapCleanup = accessibilityManager.focusManager.trapFocus(lightboxModal);
  document.getElementById('lightbox-close')?.focus();
};

const close = () => {
  if (!lightboxModal || !lightboxModal.classList.contains('show')) return;

  // Instant close - no animations
  lightboxModal.classList.remove('show');
  lightboxModal.setAttribute('aria-hidden', 'true');

  // Clean up immediately
  if (focusTrapCleanup) {
    focusTrapCleanup();
    focusTrapCleanup = null;
  }
  document.documentElement.classList.remove('no-scroll');
  document.body.classList.remove('no-scroll');
  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus();
    previouslyFocusedElement = null;
  }
};

const goToSlide = index => {
  if (!photographerMedias.length || isNavigating) return;
  isNavigating = true;
  currentMediaIndex = Math.max(0, Math.min(index, photographerMedias.length - 1));
  updateContent();

  // Reset navigation flag after a short delay
  setTimeout(() => {
    isNavigating = false;
  }, 100);
};

const nextSlide = () => goToSlide((currentMediaIndex + 1) % photographerMedias.length);
const previousSlide = () => goToSlide(currentMediaIndex <= 0 ? photographerMedias.length - 1 : currentMediaIndex - 1);

const updateContent = () => {
  if (!photographerMedias.length) return;
  const elements = getLightboxElements();
  if (!elements) return;

  // Use requestAnimationFrame for smoother updates
  requestAnimationFrame(() => {
    elements.mediaContainer.innerHTML = '';
    const mediaElement = createMediaElement(photographerMedias[currentMediaIndex]);
    if (!mediaElement) {
      logError('Unable to render media in lightbox', null, errorConfig.contexts.LIGHTBOX);
      return;
    }

    const mediaType = mediaElement.getAttribute('data-media-type') || photographerMedias[currentMediaIndex].mediaType;
    if (mediaType === 'image') {
      const img = mediaElement.querySelector('img') || mediaElement;
      if (img && img.tagName === 'IMG') {
        img.loading = 'eager';
        img.decoding = 'async';
        img.classList.add('lightbox-media-image');
      }
    } else if (mediaType === 'video') {
      const video = mediaElement.querySelector('video') || mediaElement;
      if (video && video.tagName === 'VIDEO') {
        video.classList.add('lightbox-media-video');
        video.setAttribute('controls', 'true');
        video.setAttribute('playsinline', 'true');
        video.setAttribute('preload', 'metadata');
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'contain';
      }
    }

    mediaElement.addEventListener('click', e => e.stopPropagation());
    elements.mediaContainer.appendChild(mediaElement);
    elements.titleElement.textContent = photographerMedias[currentMediaIndex].title;
    elements.likesElement.textContent = photographerMedias[currentMediaIndex].likes;
    elements.counterElement.textContent = `${currentMediaIndex + 1} / ${photographerMedias.length}`;
  });
};

const getLightboxElements = () => {
  const mediaContainer = document.getElementById('lightbox-media-container');
  const titleElement = document.getElementById('lightbox-title');
  const likesElement = document.getElementById('lightbox-likes-count');
  const counterElement = document.getElementById('lightbox-counter');
  if (!mediaContainer || !titleElement || !likesElement || !counterElement) {
    logError('Lightbox elements not found', null, errorConfig.contexts.LIGHTBOX);
    return null;
  }
  return { mediaContainer, titleElement, likesElement, counterElement };
};

const togglePlayPause = () => {
  const video = lightboxModal.querySelector('video');
  if (video) video.paused ? video.play() : video.pause();
};

const _destroy = () => {
  if (focusTrapCleanup) focusTrapCleanup();
  cleanupLightboxEventListeners();
  isInitialized = false;
};

// Export functions for backward compatibility
export const openLightbox = open;
export const initializeLightbox = initialize;

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}
