import { getScrollToTopElements } from '../constants.js';
import { lightboxState } from '../pages/photographer/lightbox.js';

import { isModalOpen } from './helpers/managers/modalManager.js';

const { button } = getScrollToTopElements();

export const scrollToTop = {
  button: null,

  init() {
    this.button = button;
    if (!this.button) return;

    this.setupEventListeners();
    this.handleScroll();
  },

  setupEventListeners() {
    document.addEventListener('scroll', this.handleScroll.bind(this));
    button.addEventListener('click', this.scrollToTop.bind(this));
  },

  handleScroll() {
    if (!button) return;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const shouldShow = scrollTop > 300 && !isModalOpen() && !lightboxState();
    button.classList.toggle('show', shouldShow);
  },

  scrollToTop() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  },
};
