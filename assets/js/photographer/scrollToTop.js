// Scroll to top button functionality

import { getScrollToTopButton } from '../config.js';
import { lightboxState } from '../utils/managers/lightbox.js';
import { isModalOpen } from '../utils/managers/modal.js';

// Show or hide scroll button based on position
const handleScrollVisibility = () => {
  const button = getScrollToTopButton();
  if (!button) return;
  button.classList.toggle('show', window.scrollY > 300 && !isModalOpen() && !lightboxState());
};

// Scroll page to top smoothly
const scrollToTopAction = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  getScrollToTopButton()?.blur();
};

// Initialize scroll to top button
export const initScrollToTop = () => {
  const button = getScrollToTopButton();
  if (!button) return;

  window.addEventListener('scroll', handleScrollVisibility);
  button.addEventListener('click', scrollToTopAction);
  handleScrollVisibility();
};
