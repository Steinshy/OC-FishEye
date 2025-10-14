import { getScrollToTopButton } from '../constants.js';
import { lightboxState } from '../pages/photographer/lightbox.js';

import { isModalOpen } from './helpers/managers/modalManager.js';

const button = getScrollToTopButton();

const handleScrollVisibility = () => {
  if (!button) return;
  const shouldShow = window.scrollY > 300 && !isModalOpen() && !lightboxState();
  button.classList.toggle('show', shouldShow);
};

const scrollToTopAction = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  button?.blur();
};

const setupScrollToTopListeners = () => {
  window.addEventListener('scroll', handleScrollVisibility);
  button.addEventListener('click', scrollToTopAction);
};

export const initScrollToTop = () => {
  if (!button) return;

  setupScrollToTopListeners();
  handleScrollVisibility();
};
