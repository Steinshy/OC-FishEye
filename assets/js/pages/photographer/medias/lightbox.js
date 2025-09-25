import { createAccessibilityManager } from '../../../accessibilityManagement.js';

import { handleTypeCard } from './mediasManager.js';

const accessibilityManager = createAccessibilityManager();

// Lightbox state
let currentMediaIndex = 0;
let photographerMedias = [];
let lightboxModal = null;
let focusTrapCleanup = null;
let previouslyFocusedElement = null;

// Create media element using existing function
const createMediaElement = media => handleTypeCard(media);

// Get cached media data
const getCachedMedias = () => {
  return window.currentPhotographerMedias || [];
};

// Update lightbox content
const updateLightboxContent = () => {
  if (!photographerMedias.length) return;

  const currentMedia = photographerMedias[currentMediaIndex];
  const mediaContainer = document.getElementById('lightbox-media-container');
  const titleElement = document.getElementById('lightbox-title');
  const likesElement = document.getElementById('lightbox-likes');

  if (!mediaContainer || !titleElement || !likesElement) {
    console.error('Lightbox elements not found');
    return;
  }

  // Update main media
  mediaContainer.innerHTML = '';
  const mediaElement = createMediaElement(currentMedia);
  if (!mediaElement) {
    console.error('Unable to render media in lightbox');
    return;
  }

  const mediaType = mediaElement.getAttribute('data-media-type') || currentMedia.mediaType;

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
    }
  }

  mediaElement.addEventListener('click', e => {
    e.stopPropagation();
  });

  mediaContainer.appendChild(mediaElement);

  // Update info
  titleElement.textContent = currentMedia.title;
  likesElement.textContent = currentMedia.likes;
};

// Navigation functions
const goToSlide = index => {
  if (!photographerMedias.length) return;

  currentMediaIndex = index;
  updateLightboxContent();
};

const nextSlide = () => goToSlide((currentMediaIndex + 1) % photographerMedias.length);
const previousSlide = () => goToSlide(currentMediaIndex <= 0 ? photographerMedias.length - 1 : currentMediaIndex - 1);

// Close lightbox
const closeLightbox = () => {
  if (!lightboxModal || lightboxModal.getAttribute('aria-hidden') === 'true') return;

  // Remove focus trap
  if (focusTrapCleanup) {
    focusTrapCleanup();
    focusTrapCleanup = null;
  }

  lightboxModal.classList.remove('show');
  lightboxModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  // Return focus to previously focused element
  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus();
    previouslyFocusedElement = null;
  }
};

// Open lightbox
export const openLightbox = (mediaId, medias) => {
  // Use provided medias or get from cache
  photographerMedias = medias || getCachedMedias();

  if (!photographerMedias.length) {
    console.error('No media data available for lightbox');
    return;
  }

  currentMediaIndex = photographerMedias.findIndex(media => media.id === mediaId);

  if (currentMediaIndex === -1) {
    console.warn(`Media with ID ${mediaId} not found, showing first media`);
    currentMediaIndex = 0;
  }

  lightboxModal = document.getElementById('lightbox-modal');
  if (!lightboxModal) {
    console.error('Lightbox modal not found');
    return;
  }

  // Store currently focused element
  previouslyFocusedElement = document.activeElement;

  // Update content
  updateLightboxContent();

  // Show modal
  lightboxModal.classList.add('show');
  lightboxModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Set up focus trap
  focusTrapCleanup = accessibilityManager.focusManager.trapFocus(lightboxModal);

  // Focus close button
  const closeBtn = document.getElementById('lightbox-close');
  if (closeBtn) {
    closeBtn.focus();
  }
};

// Track if lightbox is already initialized
let lightboxInitialized = false;

// Initialize lightbox with proper accessibility
export const initializeLightbox = () => {
  if (lightboxInitialized) return;

  const modalElement = document.getElementById('lightbox-modal');
  if (!modalElement) return;

  // Set up navigation controls
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const closeBtn = document.getElementById('lightbox-close');

  if (prevBtn) {
    prevBtn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      previousSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      nextSlide();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', e => {
      e.stopPropagation();
      closeLightbox();
    });
  }

  // Set up keyboard navigation
  const escapeHandler = accessibilityManager.keyboardHandler.createEscapeHandler(closeLightbox);
  document.addEventListener('keydown', escapeHandler);

  // Add arrow key navigation
  const arrowKeyHandler = e => {
    if (modalElement.getAttribute('aria-hidden') === 'true') return;

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      e.stopPropagation();
      previousSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      e.stopPropagation();
      nextSlide();
    }
  };
  document.addEventListener('keydown', arrowKeyHandler);

  modalElement.addEventListener('click', e => {
    if (e.target === modalElement) {
      closeLightbox();
    }
  });

  lightboxInitialized = true;

  // Clean up on page unload
  window.addEventListener('beforeunload', () => {
    if (focusTrapCleanup) {
      focusTrapCleanup();
    }
  });
};

// Legacy function for carousel (keeping for compatibility)
export const initializeCarrouselControl = () => {
  const radios = [
    document.getElementById('radio1'),
    document.getElementById('radio2'),
    document.getElementById('radio3'),
    document.getElementById('radio4'),
    document.getElementById('radio5'),
  ];

  const validRadios = radios.filter(radio => radio !== null);
  if (validRadios.length === 0) {
    return;
  }

  let currentSlide = radios.findIndex(radio => radio && radio.checked);

  if (currentSlide === -1) {
    currentSlide = 0;
    if (radios[0]) {
      radios[0].checked = true;
    }
  }

  const goToSlideCarousel = index => {
    let validIndex = Number.parseInt(index, 10);
    if (Number.isNaN(validIndex) || validIndex < 0) validIndex = validRadios.length - 1;
    else if (validIndex >= validRadios.length) validIndex = 0;

    if (radios[validIndex] && radios[validIndex] !== null) {
      radios[validIndex].checked = true;
      currentSlide = validIndex;
    }
  };

  const nextSlideCarousel = () => goToSlideCarousel(currentSlide + 1);
  const previousSlideCarousel = () => goToSlideCarousel(currentSlide - 1);

  // Setup carousel-specific controls
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');

  if (prev) {
    prev.addEventListener('click', previousSlideCarousel);
  }

  if (next) {
    next.addEventListener('click', nextSlideCarousel);
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      previousSlideCarousel();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlideCarousel();
    }
  });
};
