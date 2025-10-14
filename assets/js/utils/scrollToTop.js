import { lightboxState } from '../pages/photographer/lightbox.js';

import { isModalOpen } from './helpers/managers/modalManager.js';

export const scrollToTop = {
  button: document.getElementById('scroll-to-top'),

  init() {
    if (!this.button) return;

    this.setupEventListeners();
    this.handleScroll();
  },

  setupEventListeners() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
    this.button.addEventListener('click', this.scrollToTop.bind(this));
  },

  handleScroll() {
    if (!this.button) return;
    const shouldShow = window.scrollY > 300 && !isModalOpen() && !lightboxState();
    this.button.classList.toggle('show', shouldShow);
  },

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.button.blur();
  },
};
